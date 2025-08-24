// app/api/plants/[id]/route.js

import connectDB from '../../../../lib/mongodb';
import Plant from '../../../../models/Plant';
import { NextResponse } from 'next/server';

// DELETE - Remove specific plant
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    // Validate ObjectId
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { success: false, error: 'Invalid plant ID' },
        { status: 400 }
      );
    }
    
    // Find and delete the plant
    const deletedPlant = await Plant.findByIdAndDelete(id);
    
    if (!deletedPlant) {
      return NextResponse.json(
        { success: false, error: 'Plant not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Plant deleted successfully',
      data: deletedPlant 
    });
    
  } catch (error) {
    console.error('Delete plant error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET - Get specific plant by ID (bonus feature)
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    // Validate ObjectId
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { success: false, error: 'Invalid plant ID' },
        { status: 400 }
      );
    }
    
    const plant = await Plant.findById(id);
    
    if (!plant) {
      return NextResponse.json(
        { success: false, error: 'Plant not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: plant });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update specific plant (bonus feature for edit functionality)
export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await request.json();
    
    // Validate ObjectId
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { success: false, error: 'Invalid plant ID' },
        { status: 400 }
      );
    }
    
    // Update the plant
    const updatedPlant = await Plant.findByIdAndUpdate(
      id,
      { 
        ...body,
        updatedAt: new Date()
      },
      { 
        new: true, // Return updated document
        runValidators: true // Run schema validation
      }
    );
    
    if (!updatedPlant) {
      return NextResponse.json(
        { success: false, error: 'Plant not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: updatedPlant });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}