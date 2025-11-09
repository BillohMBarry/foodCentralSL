import express from  'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import vendorRoutes from './modules/vendor/vendor.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import menuRoutes from './modules/menu/menu.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
// import mongoose from 'mongoose';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// await mongoose.connect(process.env.MONGO_URI);

// const index =await mongoose.connection.db.collection('vendors').dropIndex('restaurantEmail_1');
// console.log("Dropped index restaurantEmail_1");
// console.log(index);


app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(compression());
app.use(express.json({limit: '1mb'}));

const authLimiter = rateLimit({windowMs: 15 * 60 * 1000, max: 100});
app.use('/api/vendors', vendorRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api',authLimiter, authRoutes);

app.use((req,res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  })
})
app.use(errorHandler)

const start = async () => {
  try {
    await connectDB(); // Connect to the database 
    // await mongoose.disconnect();
    app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
  } catch (err) {
    console.error('failed to start', err)
    process.exit(1)
  }
}
start()  
