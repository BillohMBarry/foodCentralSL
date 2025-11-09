
// centralized error handler
export const errorHandler = (err,req,res,next) => {
    console.error("Error:", err);

    // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors || {}).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: details,
    });
  }

  // Mongoose cast errors (invalid ObjectId, etc.)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  // Mongo duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Duplicate key error',
      fields: err.keyValue,
    });
  }

  const status = err.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
}
