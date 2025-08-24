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
        { categories: { $regex: search, $options: 'i' } }
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
    const { name, price, categories, availability } = body;
    
    // Validation
    if (!name || !price || !categories || categories.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Name, price, and categories are required' },
        { status: 400 }
      );
    }
    
    const plant = new Plant({
      name,
      price: parseFloat(price),
      categories: Array.isArray(categories) ? categories : [categories],
      availability: availability !== undefined ? availability : true
    });
    
    await plant.save();
    
    return NextResponse.json({ success: true, data: plant }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}