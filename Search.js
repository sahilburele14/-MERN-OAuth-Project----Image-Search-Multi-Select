const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  term: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
SearchSchema.index({ userId: 1, timestamp: -1 });
SearchSchema.index({ term: 1 });

module.exports = mongoose.model('Search', SearchSchema);

