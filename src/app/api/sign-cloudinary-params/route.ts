import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { createResponse } from '@/helper/responseHelper';
import { HttpStatusCode } from 'axios';

const cloudinarySecret = process.env.CLOUDINARY_API_SECRET || '';
const cloudinaryAPIKey = process.env.CLOUDINARY_API_KEY || '';

if (!cloudinarySecret) {
  throw new Error('Missing CLOUDINARY_API_SECRET in environment variables');
}

if (!cloudinaryAPIKey) {
  throw new Error('Missing CLOUDINARY_API_KEY in environment variables');
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: cloudinaryAPIKey,
  api_secret: cloudinarySecret,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { folder } = body;
    const timestamp = Math.floor(Date.now() / 1000);

    const paramsToSign: Record<string, string | number> = {
      timestamp,
      folder,
    };

    const signature = cloudinary.utils.api_sign_request(paramsToSign, cloudinarySecret);

    return NextResponse.json({
      signature,
      api_key: cloudinaryAPIKey,
      timestamp,
      folder,
    });
  } catch (error) {
    console.error(error);
    return createResponse(HttpStatusCode.InternalServerError, 'server_error');
  }
}
