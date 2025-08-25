import connectDB from '../../../lib/mongodb';
import Plant from '../../../models/Plant';
import { NextResponse } from 'next/server';

// GET - Fetch all plants with search and filter
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    
    let query = {};
    
    // Search by name or category
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { categories: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by category
    if (category && category !== 'all') {
      query.categories = { $regex: category, $options: 'i' };
    }
    
    const plants = await Plant.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: plants });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Add new plant
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    console.log('Received plant data:', body); // Debug log
    
    const { name, price, categories, availability, image, description } = body;
    
    // Validation
    if (!name || !price || !categories || categories.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Name, price, and categories are required' },
        { status: 400 }
      );
    }
    
    // Create plant with proper image and description handling
    const plantData = {
      name: name.trim(),
      price: parseFloat(price),
      categories: Array.isArray(categories) ? categories : [categories],
      availability: availability !== undefined ? availability : true,
      image: image && image.trim() ? image.trim() : 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
      description: description && description.trim() ? description.trim() : 'Beautiful plant for your home'
    };
    
    console.log('Creating plant with data:', plantData); // Debug log
    
    const plant = new Plant(plantData);
    await plant.save();
    
    console.log('Plant saved successfully:', plant); // Debug log
    
    return NextResponse.json({ success: true, data: plant }, { status: 201 });
  } catch (error) {
    console.error('Error creating plant:', error); // Debug log
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}