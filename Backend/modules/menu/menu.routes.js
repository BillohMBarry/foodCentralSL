import express from 'express';
import { authenticate } from '../../middleware/auth.js';
import { createMenu,getCreateMenu,getSingleMenu,updateMenu,getMenuByVendorId,getVendorFromUser, deleteMenu } from './menu.controller.js';
import { createMenuValidator, updateMenuValidators } from './menu.validators.js';
import { handleValidation } from '../../middleware/validatorResult.js';

const router = express.Router();

router.post('/addMenu', authenticate, getVendorFromUser, createMenuValidator, handleValidation, createMenu)

// This route is now public and fetches all menu items for the general menu page.

router.get('/vendor/:vendorId',getMenuByVendorId )
// This new route is for the vendor's dashboard to get their own menu items.
router.get('/addMenu', authenticate, getVendorFromUser, getCreateMenu)


router.get('/:id', authenticate,getVendorFromUser,getSingleMenu)
router.put('/:id', authenticate,getVendorFromUser,updateMenuValidators, handleValidation, updateMenu)
router.delete('/:id',authenticate,getVendorFromUser,deleteMenu)


export default router 