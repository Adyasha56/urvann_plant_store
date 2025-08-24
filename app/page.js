'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Leaf, ShoppingCart, Heart, Star } from 'lucide-react';

const categories = ['all', 'Indoor', 'Outdoor', 'Succulent', 'Air Purifying', 'Home Decor', 'Flowering', 'Herb', 'Medicinal'];

// Mock data for demonstration
const mockPlants = [
  { 
    _id: '1', 
    name: "Money Plant", 
    price: 299, 
    categories: ["Indoor", "Air Purifying", "Home Decor"], 
    availability: true,
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400",
    rating: 4.5,
    description: "Beautiful indoor plant that brings prosperity"
  },
  { 
    _id: '2', 
    name: "Snake Plant", 
    price: 499, 
    categories: ["Indoor", "Air Purifying", "Succulent"], 
    availability: true,
    image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400",
    rating: 4.8,
    description: "Low maintenance air purifying plant"
  },
  { 
    _id: '3', 
    name: "Peace Lily", 
    price: 399, 
    categories: ["Indoor", "Air Purifying", "Flowering"], 
    availability: true,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    rating: 4.6,
    description: "Elegant flowering plant for indoor spaces"
  },
  { 
    _id: '4', 
    name: "Aloe Vera", 
    price: 249, 
    categories: ["Indoor", "Succulent", "Medicinal"], 
    availability: false,
    image: "https://images.unsplash.com/photo-1509423350716-97f2360af34e?w=400",
    rating: 4.7,
    description: "Medicinal plant with healing properties"
  },
  { 
    _id: '5', 
    name: "Monstera Deliciosa", 
    price: 899, 
    categories: ["Indoor", "Home Decor"], 
    availability: true,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    rating: 4.9,
    description: "Instagram-famous Swiss cheese plant"
  },
  { 
    _id: '6', 
    name: "Fiddle Leaf Fig", 
    price: 1299, 
    categories: ["Indoor", "Home Decor"], 
    availability: true,
    image: "https://images.unsplash.com/photo-1463154545680-d59320fd685d?w=400",
    rating: 4.4,
    description: "Statement plant for modern homes"
  }
];

export default function Home() {
  const [plants, setPlants] = useState(mockPlants);
  const [filteredPlants, setFilteredPlants] = useState(mockPlants);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Filter plants based on search and category
  useEffect(() => {
    let filtered = plants;
    
    if (search) {
      filtered = filtered.filter(plant => 
        plant.name.toLowerCase().includes(search.toLowerCase()) ||
        plant.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category !== 'all') {
      filtered = filtered.filter(plant => 
        plant.categories.includes(category)
      );
    }
    
    setFilteredPlants(filtered);
  }, [search, category, plants]);

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

  const PlantCard = ({ plant }) => (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img 
          src={plant.image} 
          alt={plant.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
        />
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
          {!plant.availability && (
            <div className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              Out of Stock
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Star size={12} className="text-yellow-400 fill-current" />
            <span className="text-xs font-medium">{plant.rating}</span>
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

  const AddPlantForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      categories: '',
      description: '',
      availability: true
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Mock adding plant
      const newPlant = {
        _id: Date.now().toString(),
        ...formData,
        price: parseInt(formData.price),
        categories: formData.categories.split(',').map(c => c.trim()),
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
        rating: 4.0
      };
      
      setPlants(prev => [newPlant, ...prev]);
      setShowAddForm(false);
      setFormData({ name: '', price: '', categories: '', description: '', availability: true });
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-full">
              <Leaf className="text-green-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Add New Plant</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plant Name</label>
              <input
                type="text"
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Money Plant"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
              <input
                type="number"
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="299"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of the plant..."
                rows="3"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
              <input
                type="text"
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                value={formData.categories}
                onChange={(e) => setFormData({...formData, categories: e.target.value})}
                placeholder="Indoor, Air Purifying, Home Decor"
                required
              />
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="availability"
                checked={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.checked})}
                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              />
              <label htmlFor="availability" className="text-sm font-medium text-gray-700">
                Available in Stock
              </label>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button 
                type="button" 
                onClick={handleSubmit}
                className="flex-1 bg-green-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                Add Plant
              </button>
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-600 rounded-2xl">
                <Leaf className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Urvann</h1>
                <p className="text-green-600 font-medium">Plant Store</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <span>🚚 Free delivery above ₹499</span>
              <span>🌱 30-day guarantee</span>
              <span>💚 Expert care tips</span>
            </div>
          </div>
        </div>
      </header>

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
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                className="pl-12 pr-8 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white min-w-48"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
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
            <div className="text-3xl font-bold text-green-600">{filteredPlants.length}</div>
            <div className="text-gray-600 font-medium">Plants Available</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border">
            <div className="text-3xl font-bold text-blue-600">{categories.length - 1}</div>
            <div className="text-gray-600 font-medium">Categories</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border">
            <div className="text-3xl font-bold text-purple-600">{filteredPlants.filter(p => p.availability).length}</div>
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
            <p className="mt-4 text-gray-600 font-medium">Loading beautiful plants...</p>
          </div>
        ) : filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPlants.map((plant) => (
              <PlantCard key={plant._id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <Leaf size={64} className="text-gray-300 mx-auto" />
            </div>
            <p className="text-gray-500 text-lg font-medium">No plants found</p>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      {/* Add Plant Form */}
      {showAddForm && <AddPlantForm />}
    </div>
  );
}