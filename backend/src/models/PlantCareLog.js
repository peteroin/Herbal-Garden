import mongoose from 'mongoose';

const plantCareLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  virtualGardenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VirtualGarden',
    required: true
  },
  plotId: {
    type: String,
    required: true
  },
  plantName: String,
  careType: {
    type: String,
    enum: ['watered', 'fertilized', 'pruned', 'harvested', 'replanted', 'health-check'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: String,
  healthBefore: Number,
  healthAfter: Number,
  waterAmount: Number,
  fertilizerId: mongoose.Schema.Types.ObjectId
});

plantCareLogSchema.index({ userId: 1, date: -1 });
plantCareLogSchema.index({ virtualGardenId: 1, plotId: 1 });

const PlantCareLog = mongoose.model('PlantCareLog', plantCareLogSchema);

export default PlantCareLog;
