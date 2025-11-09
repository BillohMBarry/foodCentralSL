import express from 'express';
import { createUser, loginUser, updateUserProfile, deleteUserAccount } from './auth.controller.js';
const router = express.Router();

router.post('/signup', createUser);
// login - return ID token using firebase auth rest api
router.post('/login', loginUser)
// update user profile
router.put('/profile', updateUserProfile)
// delete account
router.delete('/account', deleteUserAccount)

export default router;