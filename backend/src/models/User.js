import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email must be unique'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      maxlength: [256, 'Password cannot exceed 256 characters'],
      select: false
    },
    bio: {
      type: String,
      trim: true
    },
    preferences: {
      favoriteCategory: {
        type: String,
        enum: {
          values: ['digestive', 'immunity', 'skin-care', 'general'],
          message: '{VALUE} is not a valid category'
        },
        default: 'general'
      },
      notifications: {
        type: Boolean,
        default: true
      }
    },
    favorites: [
      {
        resourceId: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, 'Resource ID is required']
        },
        resourceType: {
          type: String,
          enum: {
            values: ['plant', 'video', 'encyclopedia', 'model3d', 'tour', 'quiz'],
            message: '{VALUE} is not a valid resource type'
          },
          required: [true, 'Resource type is required']
        },
        resourceName: {
          type: String,
          trim: true,
          maxlength: [150, 'Resource name cannot exceed 150 characters']
        },
        addedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Indexes for search and performance
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Remove password from output by default
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);

export default User;
