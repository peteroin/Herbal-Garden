import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true
    },
    toursStarted: [
      {
        tourId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Tour',
          required: true
        },
        tourSlug: {
          type: String,
          required: true
        },
        tourTitle: {
          type: String,
          required: true
        },
        startedAt: {
          type: Date,
          default: Date.now
        },
        completedAt: {
          type: Date,
          default: null
        },
        isCompleted: {
          type: Boolean,
          default: false
        },
        progress: {
          type: Number,
          default: 0,
          min: 0,
          max: 100
        }
      }
    ],
    quizzesCompleted: [
      {
        quizId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Quiz',
          required: true
        },
        quizSlug: {
          type: String,
          required: true
        },
        quizTitle: {
          type: String,
          required: true
        },
        completedAt: {
          type: Date,
          default: Date.now
        },
        score: {
          type: Number,
          required: true,
          min: 0,
          max: 100
        },
        totalQuestions: {
          type: Number,
          required: true
        },
        correctAnswers: {
          type: Number,
          required: true
        },
        timeSpentSeconds: {
          type: Number,
          default: 0
        }
      }
    ],
    videosWatched: [
      {
        videoId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Video',
          required: true
        },
        videoSlug: {
          type: String,
          required: true
        },
        videoTitle: {
          type: String,
          required: true
        },
        watchedAt: {
          type: Date,
          default: Date.now
        },
        duration: {
          type: Number,
          default: 0
        },
        percentWatched: {
          type: Number,
          default: 0,
          min: 0,
          max: 100
        }
      }
    ],
    encyclopediaEntriesViewed: [
      {
        entryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Encyclopedia',
          required: true
        },
        entrySlug: {
          type: String,
          required: true
        },
        entryTitle: {
          type: String,
          required: true
        },
        viewedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    statistics: {
      totalToursStarted: {
        type: Number,
        default: 0
      },
      totalToursCompleted: {
        type: Number,
        default: 0
      },
      totalQuizzesCompleted: {
        type: Number,
        default: 0
      },
      totalQuizScore: {
        type: Number,
        default: 0
      },
      averageQuizScore: {
        type: Number,
        default: 0
      },
      totalVideosWatched: {
        type: Number,
        default: 0
      },
      totalEncyclopediaViewed: {
        type: Number,
        default: 0
      },
      totalLearningMinutes: {
        type: Number,
        default: 0
      }
    },
    lastActiveAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Indexes for efficient querying
progressSchema.index({ userId: 1 });
progressSchema.index({ userId: 1, lastActiveAt: -1 });
progressSchema.index({ 'toursStarted.tourId': 1 });
progressSchema.index({ 'quizzesCompleted.quizId': 1 });

// Pre-save hook to update statistics
progressSchema.pre('save', async function(next) {
  // Update tour statistics
  this.statistics.totalToursStarted = this.toursStarted.length;
  this.statistics.totalToursCompleted = this.toursStarted.filter(t => t.isCompleted).length;
  
  // Update quiz statistics
  this.statistics.totalQuizzesCompleted = this.quizzesCompleted.length;
  if (this.quizzesCompleted.length > 0) {
    this.statistics.totalQuizScore = this.quizzesCompleted.reduce((sum, q) => sum + q.score, 0);
    this.statistics.averageQuizScore = Math.round(this.statistics.totalQuizScore / this.quizzesCompleted.length);
  }
  
  // Update video statistics
  this.statistics.totalVideosWatched = this.videosWatched.length;
  
  // Update encyclopedia statistics
  this.statistics.totalEncyclopediaViewed = this.encyclopediaEntriesViewed.length;
  
  // Update last active time
  this.lastActiveAt = new Date();
  
  next();
});

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
