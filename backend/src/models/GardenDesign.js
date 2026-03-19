import mongoose from 'mongoose';

const gardenDesignSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  designName: {
    type: String,
    required: true
  },
  description: String,
  gardenSize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true
  },
  location: String,
  sunlight: {
    type: String,
    enum: ['full-sun', 'partial-shade', 'full-shade'],
    default: 'partial-shade'
  },
  soilType: {
    type: String,
    enum: ['loamy', 'sandy', 'clay', 'mixed'],
    default: 'loamy'
  },
  plants: [
    {
      plantId: mongoose.Schema.Types.ObjectId,
      plantName: String,
      position: {
        x: Number,
        y: Number
      },
      quantity: {
        type: Number,
        default: 1
      },
      spacing: Number,
      hardinessZone: String
    }
  ],
  layout: {
    width: Number,
    height: Number,
    gridSize: Number
  },
  features: {
    hasBench: Boolean,
    hasWaterSource: Boolean,
    hasPath: Boolean,
    hasCompost: Boolean
  },
  season: {
    type: String,
    enum: ['spring', 'summer', 'fall', 'winter'],
    default: 'spring'
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

gardenDesignSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const GardenDesign = mongoose.model('GardenDesign', gardenDesignSchema);

export default GardenDesign;
