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
    default: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    validate: {
      validator: function(v) {
        // Allow empty string or valid URL
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Image must be a valid URL'
    }
  },
  description: {
    type: String,
    default: 'Beautiful plant for your home',
    trim: true
  }
}, {
  timestamps: true
});

// Index for search
plantSchema.index({ name: 'text', categories: 'text', description: 'text' });

export default mongoose.models.Plant || mongoose.model('Plant', plantSchema);