import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    resourceType: {
      type: String,
      enum: {
        values: ['plant', 'video', 'encyclopedia', 'model3d', 'tour', 'quiz'],
        message: '{VALUE} is not a valid resource type'
      },
      default: 'plant',
      required: [true, 'Resource type is required']
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Resource ID is required']
    },
    resourceName: {
      type: String,
      required: [true, 'Resource name is required'],
      trim: true,
      maxlength: [150, 'Resource name cannot exceed 150 characters']
    },
    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Compound index to prevent duplicate favorites for same user-resource pair
favoriteSchema.index({ userId: 1, resourceType: 1, resourceId: 1 }, { unique: true });
// Index for efficient querying
favoriteSchema.index({ userId: 1, resourceType: 1 });
favoriteSchema.index({ userId: 1, createdAt: -1 });

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
