import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Video title is required'],
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
    url: {
      type: String,
      required: [true, 'Video URL is required'],
      trim: true,
      maxlength: [500, 'Video URL cannot exceed 500 characters']
    },
    duration: {
      type: String,
      trim: true,
      maxlength: [50, 'Duration cannot exceed 50 characters']
    },
    category: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [50, 'Category cannot exceed 50 characters']
    },
    learning_objectives: [
      {
        type: String,
        trim: true
      }
    ],
    target_audience: {
      type: String,
      trim: true
    },
    techniques_covered: {
      type: String,
      trim: true
    },
    related_plants: {
      type: String,
      trim: true
    },
    keywords_tags: {
      type: String,
      trim: true
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
videoSchema.index({ slug: 1 });
videoSchema.index({ category: 1 });
videoSchema.index({ title: 'text', description: 'text' });
videoSchema.index({ order: 1 });

const Video = mongoose.model('Video', videoSchema);

export default Video;
