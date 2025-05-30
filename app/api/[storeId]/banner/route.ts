import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'

import prismadb from '@/lib/prismadb';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
const { userId } = await auth();

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const banner = await prismadb.banner.create({
      data: {
        label,
        imgUrl:imageUrl,
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(banner);
  } catch (error) {
    console.log('[BANNER_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const banner = await prismadb.banner.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(banner);
  } catch (error) {
    console.log('[BANNER_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};