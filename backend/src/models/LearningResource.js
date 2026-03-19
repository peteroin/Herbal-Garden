import mongoose from 'mongoose';

const learningResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Learning resource title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [150, 'Title cannot exceed 150 characters']
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: [true, 'Slug must be unique'],
      lowercase: true,
      trim: true,
      maxlength: [150, 'Slug cannot exceed 150 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
      trim: true
    },
    type: {
      type: String,
      enum: {
        values: ['encyclopedia', 'quiz', 'video', 'article'],
        message: '{VALUE} is not a valid resource type'
      },
      default: 'article'
    },
    href: {
      type: String,
      required: [true, 'Resource link is required'],
      trim: true,
      maxlength: [500, 'Link cannot exceed 500 characters']
    },
    icon: {
      type: String,
      trim: true,
      maxlength: [100, 'Icon cannot exceed 100 characters']
    },
    content: {
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
learningResourceSchema.index({ slug: 1 });
learningResourceSchema.index({ type: 1 });
learningResourceSchema.index({ title: 'text', description: 'text', content: 'text' });
learningResourceSchema.index({ order: 1 });

const LearningResource = mongoose.model('LearningResource', learningResourceSchema);

export default LearningResource;
