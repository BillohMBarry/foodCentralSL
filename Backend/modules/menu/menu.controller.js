import { parsePagination } from '../../utils/pagination.js';
import vendorProfile from '../vendor/vendor.model.js';
import menuDetails from '../menu/menu.model.js';
import mongoose from 'mongoose';

// middleware to fetch vendor based on authenticated user ID
export const getVendorFromUser = async (req,res,next) => {
    try {
        const userId = req.user.userId ;
        const vendor = await vendorProfile.findOne({ userId });
        if (!vendor) {
            return res.status(404).json({ message: `Vendor not found for user ${userId}`});
        }
        req.vendor = vendor;
        next();
    } catch (error) {

        next(error);
    }
}
// create menuItem
export const createMenu = async (req,res,next) => {
    try {
        const {name,description,price,image} = req.body;
        const newMenu = await menuDetails.create({
            name,
            description,
            price,
            image,
            vendorId: req.vendor._id,
        });
        res.status(201).json({ success: true, message: 'Menu item created successfully', data: newMenu });
    } catch (error) {
        next(error);
    }
}

// get all created menuItem from a vendor
export const getCreateMenu = async (req,res,next) => {
   try {
        const {page, limit, skip} = parsePagination(req.query);
        const filter = { vendorId: req.vendor._id };
        if (req.query.category) {
            filter.category = String(req.query.category).toLowerCase();
        }
        const [items, total] = await Promise.all([ menuDetails
            .find(filter)
            .sort({createdAt: - 1})
            .skip(skip)
            .limit(limit)
            .lean(),
            menuDetails.countDocuments(filter)
        ])
          res.status(200).json({
            success: true,
            data: items,
            meta:{
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
          }) 
    } catch (error) {
        next(error);
    }
} 
// get a single menu item by id
export const getSingleMenu = async (req,res,next) => {
   try {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({success: false, message: 'Invalid menu item id'})
    }
        const item = await menuDetails.findOne({
            _id: req.params.id,
            vendorId: req.vendor._id
        })
        if(!item) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        next(error);
    }
}

// update a single menu item
export const updateMenu = async (req,res,next) => {
        try {
            const {id} = req.params
            if(!mongoose.Types.ObjectId.isValid(id)) {
              return  res.status(400).json({success: false, message: 'Invalid menu item id'})
            }
            const allowedFields = ['name', 'description', 'price', 'image'];
            const update = Object.fromEntries(
                Object.entries(req.body || {}).filter(([key]) => allowedFields.includes(key))
            )
            if(update.category) {
                update.category = String(update.category).toLowerCase().trim()
            }
        if( Object.keys(update).length === 0) {
            return res.status(400).json({ success: false, message: 'No valid fields to update' });
        }
        const updatedItem = await menuDetails.findOneAndUpdate(
            { _id: id, vendorId: req.vendor._id },
            {$set: update},
            { new: true, runValidators: true }
        );
        if(!updatedItem) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        res.status(200).json({ success: true, message: 'Menu item updated successfully', data: updatedItem });
    } catch (error) {
        next(error);
    }
}
// delete a single menu item
export const deleteMenu = async (req,res,next) => {
    try {
         const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return  res.status(400).json({success: false, message: 'Invalid menu item id'})
    }
        const deletedItem = await menuDetails.findOneAndDelete({
        _id: id,
        vendorId: req.vendor._id
        })
        if(!deletedItem) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        res.status(200).json({ success: true, message: 'Menu item deleted successfully', data: deletedItem });
      } catch (error) {
        next(error);
    }
}

// This is the new public route controller to get all menu items from all vendors
export const getAllPublicMenus = async (req, res, next) => {
    try {
        const { page, limit, skip } = parsePagination(req.query);
        const filter = { 
            // you can add filters here in the future, e.g. isAvailable: true 
        };
        if (req.query.category) {
            filter.category = String(req.query.category).toLowerCase();
        }
        const [items, total] = await Promise.all([
            menuDetails.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            menuDetails.countDocuments(filter)
        ]);
        res.status(200).json({
            success: true,
            message: 'All menu items fetched successfully',
            data: items,
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) }
        });
    } catch (error) {
        console.error('Error in getAllPublicMenus:', error);
        next(error);
    }
};
export const getAllVendors = async (req,res,next) => {
    try {
        const vendors = await vendorProfile.find({}, 'restaurantName profileImage description').sort({createdAt: -1})
        res.status(200).json({ success: true, message: 'Vendors fetched successfully', data: vendors });
    } catch (error) {
        console.error('Error in getAllVendors:', error);
        next(error);
    }
}
// public get menu for a specific vendor by vendor ID
export const getMenuByVendorId = async (req,res,next) => {
    try {
        const {vendorId} = req.params
        if(!mongoose.Types.ObjectId.isValid(vendorId)) {
          return  res.status(400).json({success: false, message: 'Invalid vendor id'})
        }
        const {page,limit,skip} = parsePagination(req.query)
        const filter = {
        vendorId,
        // isAvailable: true
        }
     if(req.query.category) {
        filter.category = String(req.query.category).toLowerCase();
      }
      const [items, total] = await Promise.all([
        menuDetails.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
        menuDetails.countDocuments(filter)
      ])
     res.status(200).json({ success: true, message: 'Menu items fetched successfully',
        data: items,
        meta: {page, limit, total, totalPages: Math.ceil(total/limit)} });
    } catch (error) {
        console.error('Error in getMenuByVendorId:', error);
        next(error);
    }
}