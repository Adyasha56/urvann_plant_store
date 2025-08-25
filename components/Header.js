import { Leaf } from 'lucide-react';

const Header = () => {
  return (
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
  );
};

export default Header;