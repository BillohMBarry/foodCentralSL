import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  restaurantName: {
    type: String,
    required: true,
  },
  // restaurantEmail: {
  // type: String,
  // required: true,
  // unique: true,
  // match: /.+\@.+\..+/,
  //   lowercase: true,
  // },
  restaurantPhoneNum: {
    type: String,
    required: true,
    // optionally add match pattern for phone numbers
  },
  restaurantLogo: {
    type: String,
    required: true,
  },
  // restaurantLocation: {
  //   type: String,
  //   required: true,
  // },
  restaurantAddress: {
    type: String,
    required: true,
  },

  // qrColor: {
  //   type: String,
  //   default: "#0f172a"
  // },
  qrLogoUrl: {
    type: String,
    default: ""
  },

  // menuUrl: {
  //   type: String,
  //   default: ""
  // },
  // qrCodeUrl: {
  //   type: String,
  //   default: ""
  // },

  // businessHours: [{
  //   day: String,
  //   open: String,
  //   close: String,
  // }],

  paymentMethods: [{
    type: String,
    enum: ['cash', 'credit_card', 'mobile_money', 'paypal'],
  }],


  menuItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
  }],
}, {
  timestamps: true,
});

const vendorProfile = mongoose.model('Vendor', vendorSchema);

export default vendorProfile;


