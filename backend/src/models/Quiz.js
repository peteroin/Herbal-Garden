import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Quiz title is required'],
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
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    questions: [
      {
        id: {
          type: String,
          required: [true, 'Question ID is required']
        },
        question: {
          type: String,
          required: [true, 'Question text is required'],
          minlength: [5, 'Question must be at least 5 characters'],
          trim: true
        },
        options: [
          {
            type: String,
            required: [true, 'Option is required'],
            trim: true
          }
        ],
        correctAnswer: {
          type: String,
          required: [true, 'Correct answer is required'],
          trim: true
        },
        explanation: {
          type: String,
          trim: true
        }
      }
    ],
    difficulty: {
      type: String,
      enum: {
        values: ['beginner', 'intermediate', 'advanced'],
        message: '{VALUE} is not a valid difficulty level'
      },
      default: 'beginner'
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
quizSchema.index({ slug: 1 });
quizSchema.index({ difficulty: 1 });
quizSchema.index({ title: 'text', description: 'text' });
quizSchema.index({ order: 1 });

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
