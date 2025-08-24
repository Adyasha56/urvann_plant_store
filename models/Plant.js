import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  categories: [{
    type: String,
    required: true
  }],
  availability: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'
  },
  description: {
    type: String,
    default: 'Beautiful plant for your home'
  }
}, {
  timestamps: true
});

// Index for search
plantSchema.index({ name: 'text', categories: 'text' });

export default mongoose.models.Plant || mongoose.model('Plant', plantSchema);