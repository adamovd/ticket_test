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
