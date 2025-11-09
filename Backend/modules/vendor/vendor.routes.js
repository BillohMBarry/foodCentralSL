import express from 'express';
import { authenticate } from '../../middleware/auth.js';
import { getVendors, createVendorProfile, getCurrentVendor, deleteVendorProfile, updateVendorProfile } from './vendor.controller.js';
import { createVendorValidator, updateVendorValidators } from '../vendor/vendor.validators.js';
import {handleValidation} from '../../middleware/validatorResult.js'

const router = express.Router();

// get all vendors (public route)
router.get('/', getVendors)

// create vendor profile
router.post('/', authenticate, createVendorValidator, handleValidation, createVendorProfile);
// getCurrentVendorProfile
router.get('/current', authenticate, getCurrentVendor)
// delete vendor profile
router.delete('/:id', authenticate, deleteVendorProfile)

// update vendor profile
router.put('/:id', authenticate, updateVendorValidators, handleValidation, updateVendorProfile) 

export default router;