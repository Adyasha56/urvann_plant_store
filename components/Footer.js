import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-xl">
                <Leaf className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Urvann</h3>
                <p className="text-green-400 text-sm">Plant Store</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Transform your space with our curated collection of beautiful, healthy plants. 
              Expert care tips and premium quality guaranteed.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 cursor-pointer transition-colors">
                <span className="text-sm">📧</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 cursor-pointer transition-colors">
                <span className="text-sm">📱</span>
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 cursor-pointer transition-colors">
                <span className="text-sm">🌐</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">All Plants</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Indoor Plants</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Outdoor Plants</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Succulents</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Air Purifying</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Plant Care Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Return Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Track Your Order</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">📍</span>
                <span className="text-gray-400">123 Green Street, Plant City, PC 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">📞</span>
                <span className="text-gray-400">+1 (555) 123-PLANT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✉️</span>
                <span className="text-gray-400">hello@urvann.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">⏰</span>
                <span className="text-gray-400">Mon-Fri 9AM-6PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span className="text-sm text-gray-400">
                © 2025 Urvann Plant Store. All rights reserved.
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-400">🚚 Free Shipping Above ₹499</span>
              <span className="text-gray-400">🌱 30-Day Plant Guarantee</span>
              <span className="text-gray-400">💚 Expert Plant Care Tips</span>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex justify-center items-center space-x-8 mt-6 pt-6 border-t border-gray-800">
            <div className="text-center">
              <div className="text-2xl mb-1">🏆</div>
              <div className="text-xs text-gray-500">Best Quality</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🌿</div>
              <div className="text-xs text-gray-500">Organic</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">📦</div>
              <div className="text-xs text-gray-500">Safe Packaging</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">💯</div>
              <div className="text-xs text-gray-500">100% Authentic</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🏠</div>
              <div className="text-xs text-gray-500">Home Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;