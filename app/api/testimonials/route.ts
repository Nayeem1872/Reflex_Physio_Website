import { NextRequest } from 'next/server';
import connectDB from '@/lib/config/database';
import Testimonial from '@/lib/models/Testimonial';
import { verifyAuth, unauthorizedResponse } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const showAll = searchParams.get("all") === "true";

        // Public requests only get published testimonials; ?all=true requires auth
        if (showAll) {
            const authUser = verifyAuth(request);
            if (!authUser) return unauthorizedResponse();
        }

        const filter = showAll ? {} : { published: true };
        const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
        return Response.json({ count: testimonials.length, testimonials });
    } catch (error: any) {
        return Response.json({ message: 'Error fetching testimonials', error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const authUser = verifyAuth(request);
        if (!authUser) return unauthorizedResponse();

        const body = await request.json();
        const testimonial = new Testimonial(body);
        await testimonial.save();
        return Response.json({ message: 'Testimonial created successfully', testimonial }, { status: 201 });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return Response.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
        }
        return Response.json({ message: 'Error creating testimonial', error: error.message }, { status: 500 });
    }
}
