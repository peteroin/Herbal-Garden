import mongoose from 'mongoose';

const encyclopediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Encyclopedia entry title is required'],
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
    content: {
      type: String,
      trim: true
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true
      }
    ],
    relatedPlants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant'
      }
    ],
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
encyclopediaSchema.index({ slug: 1 });
encyclopediaSchema.index({ title: 'text', description: 'text', content: 'text' });
encyclopediaSchema.index({ tags: 1 });
encyclopediaSchema.index({ order: 1 });

const Encyclopedia = mongoose.model('Encyclopedia', encyclopediaSchema);

export default Encyclopedia;
