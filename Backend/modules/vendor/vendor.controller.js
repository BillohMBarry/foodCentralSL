import vendorProfile from "./vendor.model.js";
import mongoose from "mongoose";


export const getVendors = async (req, res,next) => {
  try {
     const vendors = await vendorProfile.find();
     res.status(200).json({ success: true, data: vendors });
   } catch (error) {
    return next(error);
   }
}

export const createVendorProfile = async (req, res,next) => {
  
  try {
    const {uid} = req.user;
     const profile = req.body;

     const existingVendor = await vendorProfile.findOne({userId: uid})
     if(existingVendor) {
      return res.status(400).json({ success: false, message: "Vendor profile already exists" });
     }
     console.log(profile)
     const vendorInfo = new vendorProfile({...profile, userId: uid})
    await vendorInfo.save();
    res.status(201).json({ success: true, message: "vendor profile created successfully", data: vendorInfo});
   } catch (error) {
    return next(error);
   }
}
export const getCurrentVendor = async (req,res,next) => {
  try {
    const {uid} = req.user
    const vendor = await vendorProfile.findOne({userId: uid})
    if(!vendor) {
      return res.status(404).json({ success: false, message: "Vendor profile not found" });
    }
    res.status(200).json({ success: true, data: vendor });
  } catch (error) {
    return next(error);
  }
}
export const deleteVendorProfile =  async (req, res,next) => {
    try {
    const { vendorId } = req.params;
    if(!mongoose.Types.ObjectId.isValid(vendorId)) {
      return  res.status(400).json({success: false, message: 'Invalid vendor id'})
    }
    const vendor = await vendorProfile.findByIdAndDelete(vendorId);
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }
    res.status(200).json({ success: true, message: "Vendor deleted successfully", data: vendor });
  } catch (error) {
    return next(error);
  }
}

export const updateVendorProfile =  async (req,res,next) => {
  try {
    const  { vendorId } = req.params;
    const profile = req.body;
    if(!mongoose.Types.ObjectId.isValid(vendorId)) {
      return res.status(400).json({ success: false, message: "Invalid vendor ID" });
    }
    const updatedVendor = await vendorProfile.findByIdAndUpdate(vendorId, profile, { new: true , runValidators: true});
    res.status(200).json({ success: true, message: "Vendor profile updated successfully", data: updatedVendor });
  } catch (error) {
    return next(error);
  }
}