import mongoose from 'mongoose';

const gardenPlotSchema = new mongoose.Schema({
  plotId: {
    type: String,
    required: true
  },
  plantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  },
  plantName: String,
  plantImage: String,
  position: {
    x: Number,
    y: Number
  },
  plantedDate: {
    type: Date,
    default: Date.now
  },
  harvestDate: Date,
  healthStatus: {
    type: String,
    enum: ['seedling', 'growing', 'mature', 'ready-to-harvest'],
    default: 'seedling'
  },
  waterLevel: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  lastWaterDate: Date,
  sunlight: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
});

const virtualGardenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  gardenName: {
    type: String,
    default: 'My Herbal Garden'
  },
  gardenSize: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'medium'
  },
  theme: {
    type: String,
    default: 'classic'
  },
  plots: [gardenPlotSchema],
  totalPlantsGrown: {
    type: Number,
    default: 0
  },
  totalHarvests: {
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

virtualGardenSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const VirtualGarden = mongoose.model('VirtualGarden', virtualGardenSchema);

export default VirtualGarden;
