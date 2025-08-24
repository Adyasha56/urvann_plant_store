import connectDB from '../../../lib/mongodb';
import Plant from '../../../models/Plant';
import { NextResponse } from 'next/server';

const seedPlants = [
  { name: "Money Plant", price: 299, categories: ["Indoor", "Air Purifying", "Home Decor"], availability: true },
  { name: "Snake Plant", price: 499, categories: ["Indoor", "Air Purifying", "Succulent"], availability: true },
  { name: "Peace Lily", price: 399, categories: ["Indoor", "Air Purifying"], availability: true },
  { name: "Aloe Vera", price: 249, categories: ["Indoor", "Succulent", "Medicinal"], availability: true },
  { name: "Spider Plant", price: 199, categories: ["Indoor", "Air Purifying", "Home Decor"], availability: true },
  { name: "Rubber Plant", price: 699, categories: ["Indoor", "Home Decor"], availability: true },
  { name: "Fiddle Leaf Fig", price: 1299, categories: ["Indoor", "Home Decor"], availability: false },
  { name: "Monstera Deliciosa", price: 899, categories: ["Indoor", "Home Decor"], availability: true },
  { name: "ZZ Plant", price: 549, categories: ["Indoor", "Air Purifying"], availability: true },
  { name: "Pothos", price: 199, categories: ["Indoor", "Air Purifying", "Home Decor"], availability: true },
  { name: "Jade Plant", price: 299, categories: ["Indoor", "Succulent"], availability: true },
  { name: "Boston Fern", price: 449, categories: ["Indoor", "Air Purifying"], availability: true },
  { name: "Areca Palm", price: 799, categories: ["Indoor", "Air Purifying"], availability: true },
  { name: "Bamboo Palm", price: 649, categories: ["Indoor", "Air Purifying"], availability: true },
  { name: "English Ivy", price: 249, categories: ["Indoor", "Air Purifying"], availability: true },
  { name: "Philodendron", price: 399, categories: ["Indoor", "Home Decor"], availability: true },
  { name: "Dracaena", price: 599, categories: ["Indoor", "Air Purifying"], availability: true },
  { name: "Chinese Evergreen", price: 499, categories: ["Indoor", "Home Decor"], availability: true },
  { name: "Croton", price: 349, categories: ["Indoor", "Home Decor"], availability: true },
  { name: "Dieffenbachia", price: 429, categories: ["Indoor", "Home Decor"], availability: true },
  { name: "Rose Plant", price: 199, categories: ["Outdoor", "Flowering"], availability: true },
  { name: "Marigold", price: 49, categories: ["Outdoor", "Flowering"], availability: true },
  { name: "Tulsi Plant", price: 99, categories: ["Outdoor", "Medicinal"], availability: true },
  { name: "Neem Plant", price: 299, categories: ["Outdoor", "Medicinal"], availability: true },
  { name: "Curry Leaf Plant", price: 149, categories: ["Outdoor", "Herb"], availability: true },
  { name: "Mint Plant", price: 79, categories: ["Outdoor", "Herb"], availability: true },
  { name: "Coriander Plant", price: 59, categories: ["Outdoor", "Herb"], availability: true },
  { name: "Tomato Plant", price: 89, categories: ["Outdoor", "Vegetable"], availability: true },
  { name: "Chili Plant", price: 69, categories: ["Outdoor", "Vegetable"], availability: true },
  { name: "Lemon Plant", price: 399, categories: ["Outdoor", "Fruit"], availability: true },
  { name: "Bougainvillea", price: 249, categories: ["Outdoor", "Flowering"], availability: true },
  { name: "Hibiscus", price: 199, categories: ["Outdoor", "Flowering"], availability: true },
  { name: "Jasmine Plant", price: 179, categories: ["Outdoor", "Flowering"], availability: true },
  { name: "Mogra Plant", price: 199, categories: ["Outdoor", "Flowering"], availability: true },
  { name: "Canna Plant", price: 149, categories: ["Outdoor", "Flowering"], availability: true },
  { name: "Cactus Small", price: 99, categories: ["Indoor", "Succulent"], availability: true },
  { name: "Barrel Cactus", price: 299, categories: ["Indoor", "Succulent"], availability: true },
  { name: "Christmas Cactus", price: 249, categories: ["Indoor", "Succulent", "Flowering"], availability: true },
  { name: "Haworthia", price: 199, categories: ["Indoor", "Succulent"], availability: true },
  { name: "String of Pearls", price: 349, categories: ["Indoor", "Succulent"], availability: true },
  { name: "Echeveria", price: 179, categories: ["Indoor", "Succulent"], availability: true },
  { name: "Sedum", price: 149, categories: ["Indoor", "Succulent"], availability: true },
  { name: "Kalanchoe", price: 199, categories: ["Indoor", "Succulent", "Flowering"], availability: true },
  { name: "Air Plant", price: 99, categories: ["Indoor", "Air Purifying"], availability: true },
  { name: "Lavender", price: 299, categories: ["Outdoor", "Herb", "Flowering"], availability: true },
  { name: "Rosemary", price: 199, categories: ["Outdoor", "Herb"], availability: true },
  { name: "Thyme", price: 149, categories: ["Outdoor", "Herb"], availability: true },
  { name: "Oregano", price: 129, categories: ["Outdoor", "Herb"], availability: true },
  { name: "Basil Plant", price: 79, categories: ["Outdoor", "Herb"], availability: true },
  { name: "Ficus Bonsai", price: 1299, categories: ["Indoor", "Bonsai"], availability: false }
];

export async function POST() {
  try {
    await connectDB();
    
    // Clear existing data
    await Plant.deleteMany({});
    
    // Insert seed data
    await Plant.insertMany(seedPlants);
    
    return NextResponse.json({ 
      success: true, 
      message: `${seedPlants.length} plants added successfully` 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}