import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    auth.protect();
  const { userId, sessionClaims } =await auth();
  
  if (!userId || !sessionClaims?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  const { room } = await req.json();
  const email = sessionClaims.email as string;

  const session = liveblocks.prepareSession(email, {
    userInfo: {
      name: sessionClaims?.fullName as string,
      email: email,
      avatar: sessionClaims?.image as string,
    }
  });

  try {
    // Look in the correct location where rooms are stored
    const roomDoc = await adminDb
      .collection('users')
      .doc(email)
      .collection('rooms')
      .doc(room)
      .get();
    
    if (roomDoc.exists) {
      session.allow(room, session.FULL_ACCESS);
      const { body, status } = await session.authorize();
      return new Response(body, { status });
    } else {
      return NextResponse.json(
        { message: "You are not in this room" },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Error checking room access:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}