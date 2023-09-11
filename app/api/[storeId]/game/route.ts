import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name,categoryId,name_dev,imgUrl,desc } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!desc) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!imgUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!name_dev) {
      return new NextResponse("Name developer is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category is required", { status: 400 });
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

    const game = await prismadb.game.create({
      data: {
        name,
        name_dev,
        categoryId,
        imgUrl,
        desc,
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(game);
  } catch (error) {
    console.log('[GAME_POST]', error);
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

    const game = await prismadb.game.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(game);
  } catch (error) {
    console.log('[GAME_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};