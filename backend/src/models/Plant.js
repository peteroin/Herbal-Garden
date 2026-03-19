import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Plant name is required'],
      trim: true,
      unique: [true, 'Plant name must be unique'],
      minlength: [2, 'Plant name must be at least 2 characters'],
      maxlength: [100, 'Plant name cannot exceed 100 characters']
    },
    scientificName: {
      type: String,
      trim: true,
      maxlength: [150, 'Scientific name cannot exceed 150 characters']
    },
    commonNames: [
      {
        type: String,
        trim: true
      }
    ],
    description: {
      type: String,
      required: [true, 'Plant description is required'],
      minlength: [10, 'Description must be at least 10 characters']
    },
    uses: [
      {
        use: {
          type: String,
          trim: true
        },
        description: {
          type: String,
          trim: true
        }
      }
    ],
    region: {
      type: String,
      trim: true,
      maxlength: [100, 'Region cannot exceed 100 characters']
    },
    plantType: {
      type: String,
      trim: true,
      maxlength: [50, 'Plant type cannot exceed 50 characters']
    },
    ayushSystem: [
      {
        type: String,
        enum: {
          values: ['Ayurveda', 'Siddha', 'Unani', 'Homeopathy', 'Sowa-Rigpa'],
          message: '{VALUE} is not a valid AYUSH system'
        }
      }
    ],
    potentialBenefits: [
      {
        type: String,
        trim: true
      }
    ],
    cautions: [
      {
        type: String,
        trim: true
      }
    ],
    image: {
      type: String,
      trim: true,
      default: 'https://via.placeholder.com/400?text=Plant',
      maxlength: [500, 'Image URL cannot exceed 500 characters']
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true
      }
    ],
    season: {
      type: String,
      trim: true,
      maxlength: [50, 'Season cannot exceed 50 characters']
    },
    cultivationNotes: {
      type: String,
      trim: true
    },
    dosage: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Indexes for search and performance
plantSchema.index({ name: 'text', scientificName: 'text', commonNames: 'text', tags: 'text' });
plantSchema.index({ ayushSystem: 1 });
plantSchema.index({ region: 1 });
plantSchema.index({ createdAt: -1 });

const Plant = mongoose.model('Plant', plantSchema);

export default Plant;
