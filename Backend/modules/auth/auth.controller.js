import dotenv from "dotenv"
import { body, validationResult } from 'express-validator';
import adminDetails from "../../config/firebase.js";
import { authenticate } from "../../middleware/auth.js";
import axios from 'axios';


dotenv.config()


export const createUser = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain a number')
    .matches(/[!@#$%^&*]/).withMessage('Password must contain a special character'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const userRecord = await adminDetails.auth().createUser({
        email,
        password,
      });
      res.status(201).json({ success: true, data: userRecord });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
  }
];

export const loginUser = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    console.log('Login request body:', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    
    const { email, password } = req.body;
    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
        { email, password, returnSecureToken: true });
      const userEmail = response.data.email;
      res.status(200).json({ success: true, message: "Login succesful", email: userEmail, data: response.data });
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      const firebaseError = error.response?.data?.error;
      if (firebaseError) {
        return res.status(400).json({  
          success: false, 
          message: firebaseError.message || "Authentication failed",
          code: firebaseError.code
        });
      }
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
]

export const updateUserProfile = [
  authenticate,
  async (req, res) => {
    const { displayName, email } = req.body;
    try {
      const userRecord = await adminDetails.auth().updateUser(req.user.uid, {
        displayName,
        email,
        // photoURL,
      });
      res.status(200).json({success: true, 
        message: "updated successfully",
        uid: userRecord.uid, 
        displayName: userRecord.displayName,
        email: userRecord.email 
      }); 
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(400).json({ success: false, message: "Internal Server Error" });
    }
  }
];

export const deleteUserAccount = [
     authenticate, async (req,res) => {
      try {
        await adminDetails.auth().deleteUser(req.user.uid);
        res.status(200).json({ success: true, message: "User account deleted successfully" });
      } catch (error) {
        console.error("Error deleting user account:", error);
        res.status(400).json({ success: false, message: "Internal Server Error" });
      }
    }
]