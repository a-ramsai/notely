"use client";
import {
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import LoadingSpinner from "./LoadingSpinner";
import LiveCursorProvider from "./LiveCursorProvider";

function Room_Provider({ roomId, children }: { roomId: string; children: React.ReactNode }) {
  return (
    <RoomProvider id={roomId} initialPresence={{
        cursor:null
    }} initialStorage={{
    }}>
      <ClientSideSuspense fallback={<LoadingSpinner/>}>
      <LiveCursorProvider>
        {children}
      </LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default Room_Provider