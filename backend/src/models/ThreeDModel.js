import mongoose from 'mongoose';

const threeDModelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '3D model title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [150, 'Title cannot exceed 150 characters']
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: [true, 'Slug must be unique'],
      trim: true,
      lowercase: true,
      maxlength: [150, 'Slug cannot exceed 150 characters']
    },
    description: {
      type: String,
      trim: true
    },
    modelPath: {
      type: String,
      required: [true, 'Model file path is required'],
      trim: true,
      maxlength: [500, 'Model path cannot exceed 500 characters']
    },
    thumbnail: {
      type: String,
      trim: true,
      maxlength: [500, 'Thumbnail URL cannot exceed 500 characters']
    },
    order: {
      type: Number,
      default: 0,
      min: [0, 'Order cannot be negative']
    }
  },
  { 
    timestamps: true 
  }
);

// Indexes for search and performance
threeDModelSchema.index({ slug: 1 });
threeDModelSchema.index({ title: 'text', description: 'text' });
threeDModelSchema.index({ order: 1 });

const ThreeDModel = mongoose.model('ThreeDModel', threeDModelSchema);

export default ThreeDModel;
