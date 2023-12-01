import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  const {
    name,
    description,
    population,
    lat,
    lng,
    imageUrl,
    playlistUrl,
    recipes,
  } = await request.json();

  const user = await prisma.country.create({
    data: {
      name,
      description,
      population,
      lat,
      lng,
      imageUrl,
      playlistUrl,
      recipes,
    },
  });

  return NextResponse.json({ message: "Country created succesfully", user });
};

export const GET = async () => {
  try {
    const countries = await prisma.country.findMany();
    return NextResponse.json(countries.reverse());
  } catch {
    return NextResponse.json("error", {
      status: 500,
    });
  }
};

export async function DELETE(req: Request) {
  const query = new URL(req.url).searchParams;
  const id = query.get("id") as string;
  try {
    const deletedPost = await prisma.country.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedPost);
  } catch {
    return NextResponse.json(
      {
        error: "Failed to remove country",
      },
      {
        status: 500,
      }
    );
  }
}
