'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Plus, Leaf, ShoppingCart, Heart, Star, X, Trash2 } from 'lucide-react';
import Image from 'next/image';

// Import separate components
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const categories = ['all', 'Indoor', 'Outdoor', 'Succulent', 'Air Purifying', 'Home Decor', 'Flowering', 'Herb', 'Medicinal'];

export default function Home() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // REAL API CALL - Fetch plants from database
  const fetchPlants = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/plants?search=${search}&category=${category}`);
      const result = await response.json();
      
      if (result.success) {
        setPlants(result.data);
        setFilteredPlants(result.data);
      } else {
        console.error('Failed to fetch plants:', result.error);
      }
    } catch (error) {
      console.error('Error fetching plants:', error);
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  // Load plants on component mount and when search/category changes
  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  // 🗑️ DELETE PLANT FUNCTION
  const deletePlant = async (plantId) => {
    if (!confirm('Are you sure you want to delete this plant? 🌱💔')) {
      return;
    }

    try {
      const response = await fetch(`/api/plants/${plantId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        // Remove from local state immediately for better UX
        setPlants(prev => prev.filter(plant => plant._id !== plantId));
        alert('🗑️ Plant deleted successfully!');
      } else {
        alert('❌ Failed to delete plant: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting plant:', error);
      alert('❌ Error deleting plant. Please try again.');
    }
  };

  const toggleFavorite = (plantId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(plantId)) {
        newFavorites.delete(plantId);
      } else {
        newFavorites.add(plantId);
      }
      return newFavorites;
    });
  };

  const PlantCard = ({ plant }) => {
    const [imageError, setImageError] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    // Multiple fallback images
    const fallbackImages = [
      plant.image,
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400&h=400&fit=crop"
    ];

    const handleImageError = () => {
      if (currentImageIndex < fallbackImages.length - 1) {
        setCurrentImageIndex(prev => prev + 1);
      } else {
        setImageError(true);
      }
    };

    return (
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2">
        <div className="relative overflow-hidden">
          {!imageError ? (
            <Image
              src={fallbackImages[currentImageIndex]}
              alt={plant.name}
              width={400}
              height={224}
              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
              onError={handleImageError}
              onLoad={() => setImageError(false)}
              priority={false}
            />
          ) : (
            // Fallback when all images fail
            <div className="w-full h-56 bg-gradient-to-br from-green-100 to-emerald-200 flex flex-col items-center justify-center">
              <div className="text-6xl mb-2">🌱</div>
              <div className="text-gray-600 font-medium">{plant.name}</div>
            </div>
          )}
          
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => toggleFavorite(plant._id)}
              className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                favorites.has(plant._id) 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart size={16} className={favorites.has(plant._id) ? 'fill-current' : ''} />
            </button>
            
            {/* 🗑️ DELETE BUTTON */}
            <button
              onClick={() => deletePlant(plant._id)}
              className="p-2 rounded-full backdrop-blur-sm bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white transition-all"
              title="Delete Plant"
            >
              <Trash2 size={16} />
            </button>

            {!plant.availability && (
              <div className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                Out of Stock
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
              <Star size={12} className="text-yellow-400 fill-current" />
              <span className="text-xs font-medium">4.5</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors">
              {plant.name}
            </h3>
            <span className="text-2xl font-bold text-green-600">₹{plant.price}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{plant.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {plant.categories.slice(0, 2).map((cat, index) => (
              <span key={index} className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                {cat}
              </span>
            ))}
            {plant.categories.length > 2 && (
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                +{plant.categories.length - 2}
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <button 
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                plant.availability 
                  ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!plant.availability}
            >
              <div className="flex items-center justify-center gap-2">
                <ShoppingCart size={16} />
                {plant.availability ? 'Add to Cart' : 'Out of Stock'}
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AddPlantForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      categories: '',
      description: '',
      image: '',
      availability: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 🔥 URL CONVERTER FUNCTION
    const convertImageUrl = (url) => {
      if (!url) return '';
      
      // Remove any spaces
      url = url.trim();
      
      // If already a direct image URL, return as is
      if (url.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) {
        return url;
      }
      
      // Convert different URL types to direct image URLs
      try {
        // Unsplash page URL to direct image
        if (url.includes('unsplash.com/photos/')) {
          const photoId = url.split('/photos/')[1].split('?')[0].split('/')[0];
          return `https://images.unsplash.com/photo-${photoId}?w=400&h=400&fit=crop`;
        }
        
        // iStock - extract image info and use a placeholder
        if (url.includes('istockphoto.com')) {
          // For iStock, we'll use a generic plant image since we can't access their direct URLs
          return 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop';
        }
        
        // Google Images - try to extract direct URL
        if (url.includes('google.com') && url.includes('imgurl=')) {
          const match = url.match(/imgurl=([^&]+)/);
          if (match) {
            return decodeURIComponent(match[1]);
          }
        }
        
        // Pinterest - convert to direct image
        if (url.includes('pinterest.com')) {
          // Use generic plant image for Pinterest
          return 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400&h=400&fit=crop';
        }
        
        // Wikipedia/Wikimedia
        if (url.includes('wikipedia.org') || url.includes('wikimedia.org')) {
          return 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop';
        }
        
        // If nothing matches, try the original URL anyway
        return url;
        
      } catch (error) {
        console.log('URL conversion error:', error);
        return url;
      }
    };

    // Handle image URL change with conversion
    const handleImageUrlChange = (url) => {
      const convertedUrl = convertImageUrl(url);
      setFormData({...formData, image: convertedUrl});
    };

    // REAL API CALL - Add plant to database
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      try {
        const plantData = {
          name: formData.name,
          price: parseFloat(formData.price),
          categories: formData.categories.split(',').map(c => c.trim()).filter(c => c),
          description: formData.description.trim() || 'Beautiful plant for your home',
          image: formData.image.trim() || "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
          availability: formData.availability
        };
        
        console.log('Submitting plant data:', plantData); // Debug log
        
        const response = await fetch('/api/plants', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(plantData)
        });
        
        const result = await response.json();
        
        if (result.success) {
          // ✅ Success - refresh plants and close form
          setShowAddForm(false);
          setFormData({ 
            name: '', 
            price: '', 
            categories: '', 
            description: '', 
            image: '', 
            availability: true 
          });
          
          // Refresh plants from database
          await fetchPlants();
          
          alert('🌱 Plant added successfully!');
        } else {
          alert('❌ Failed to add plant: ' + result.error);
        }
      } catch (error) {
        console.error('Error adding plant:', error);
        alert('❌ Error adding plant. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowAddForm(false);
          }
        }}
      >
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => setShowAddForm(false)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close form"
          >
            <X size={20} className="text-gray-500 hover:text-gray-700" />
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-full">
              <Leaf className="text-green-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Add New Plant</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-800 mb-1">Plant Name *</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-800 text-sm"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Money Plant"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-800 mb-1">Price (₹) *</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-800 text-sm"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="299"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-800 mb-1">Categories *</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-800 text-sm"
                value={formData.categories}
                onChange={(e) => setFormData({...formData, categories: e.target.value})}
                placeholder="Indoor, Air Purifying, Home Decor"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Enter multiple categories separated by commas</p>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-800 mb-1">Plant Image</label>
              
              {/* Image Preview */}
              {formData.image && (
                <div className="mb-2">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div style={{display: 'none'}} className="w-20 h-20 bg-red-100 rounded-lg border flex items-center justify-center text-red-500 text-xs">
                    ❌ Invalid URL
                  </div>
                </div>
              )}
              
              <input
                type="url"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-800 text-sm"
                value={formData.image}
                onChange={(e) => handleImageUrlChange(e.target.value)}
                placeholder="Paste any image URL here - I'll make it work! 🌱"
              />
              
              {/* Quick Select Buttons */}
              <div className="mt-2 space-y-1">
                <p className="text-xs font-medium text-gray-700">Quick Select:</p>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-2 py-1 rounded border"
                    onClick={() => setFormData({...formData, image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=400&fit=crop"})}
                  >
                    🌿 Money Plant
                  </button>
                  <button
                    type="button"
                    className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-2 py-1 rounded border"
                    onClick={() => setFormData({...formData, image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=400&fit=crop"})}
                  >
                    🐍 Snake Plant
                  </button>
                  <button
                    type="button"
                    className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-2 py-1 rounded border"
                    onClick={() => setFormData({...formData, image: "https://images.unsplash.com/photo-1509423350716-97f2360af34e?w=400&h=400&fit=crop"})}
                  >
                    🌵 Succulent
                  </button>
                  <button
                    type="button"
                    className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-2 py-1 rounded border"
                    onClick={() => setFormData({...formData, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop"})}
                  >
                    🕊️ Peace Lily
                  </button>
                  <button
                    type="button"
                    className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-2 py-1 rounded border"
                    onClick={() => setFormData({...formData, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"})}
                  >
                    🌱 Monstera
                  </button>
                  <button
                    type="button"
                    className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-2 py-1 rounded border"
                    onClick={() => setFormData({...formData, image: "https://images.unsplash.com/photo-1463154545680-d59320fd685d?w=400&h=400&fit=crop"})}
                  >
                    🌳 Fiddle Leaf
                  </button>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-xs text-green-600 font-medium">
                    🎯 <strong>Smart URL Converter:</strong> Paste ANY image URL and I&apos;ll make it work!
                </p>

                <div className="text-xs text-gray-500 mt-1">
                  ✅ Supports: Unsplash, Google Images, Pinterest, iStock, Wikipedia<br/>
                  ✅ Just paste the page URL - no need to find direct image links!
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-800 mb-1">Description</label>
              <textarea
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none text-gray-800 text-sm"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of the plant..."
                rows="2"
              />
              <p className="text-xs text-gray-500 mt-1">Optional: Leave empty for default description</p>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="availability"
                checked={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.checked})}
                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              />
              <label htmlFor="availability" className="text-sm font-medium text-gray-800">
                Available in Stock
              </label>
            </div>
            
            <div className="flex gap-2 pt-2">
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors text-sm ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {isSubmitting ? '🔄 Adding...' : '✅ Add Plant'}
              </button>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                disabled={isSubmitting}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Use Header Component */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Find Your Perfect
            <span className="text-green-600"> Green Companion</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your space with our curated collection of beautiful, healthy plants. 
            From air-purifying heroes to stunning decorative pieces.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for plants, categories..."
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-800 placeholder-gray-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                className="pl-12 pr-8 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white min-w-48 text-gray-800 font-medium"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ color: '#1f2937' }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="text-gray-800 bg-white py-2">
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              Add Plant
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border">
            <div className="text-3xl font-bold text-green-600">{plants.length}</div>
            <div className="text-gray-600 font-medium">Total Plants</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border">
            <div className="text-3xl font-bold text-blue-600">{categories.length - 1}</div>
            <div className="text-gray-600 font-medium">Categories</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border">
            <div className="text-3xl font-bold text-purple-600">{plants.filter(p => p.availability).length}</div>
            <div className="text-gray-600 font-medium">In Stock</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border">
            <div className="text-3xl font-bold text-orange-600">4.7</div>
            <div className="text-gray-600 font-medium">Avg Rating</div>
          </div>
        </div>

        {/* Plants Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading plants from database...</p>
          </div>
        ) : plants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {plants.map((plant) => (
              <PlantCard key={plant._id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <Leaf size={64} className="text-gray-300 mx-auto" />
            </div>
            <p className="text-gray-500 text-lg font-medium">No plants found in database</p>
            <p className="text-gray-400">Add your first plant or try different filters</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
            >
              Add First Plant 🌱
            </button>
          </div>
        )}
      </main>

      {/* Add Plant Form */}
      {showAddForm && <AddPlantForm />}

      {/* Use Footer Component */}
      <Footer />
    </div>
  );
}