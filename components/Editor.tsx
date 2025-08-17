"use client";

import { useRoom, useSelf } from "@liveblocks/react";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";

import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core"; // imperative editor factory

import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";

import stringToColor from "@/lib/stringToColor";
import TranslateDocument from "./TranslateDocument";
import ChatToDocument from "./ChatToDocument";

export default function Editor() {
  const room = useRoom();
  const userInfo = useSelf((me) => me.info);

  // Yjs + Liveblocks provider
  const [yDoc, setYDoc] = useState<Y.Doc | null>(null);
  const [yProvider, setYProvider] = useState<LiveblocksYjsProvider | null>(null);

  // BlockNote editor instance (imperative)
  const [editor, setEditor] = useState<BlockNoteEditor | null>(null);

  const [darkMode, setDarkMode] = useState(false);

  // 1) create Y.Doc + LiveblocksYjsProvider when room becomes available
  useEffect(() => {
    if (!room) return;

    const doc = new Y.Doc();
    const provider = new LiveblocksYjsProvider(room, doc);

    setYDoc(doc);
    setYProvider(provider);

    return () => {
      // cleanup provider and doc
      try {
        provider.destroy?.();
      } catch (e) {
        // ignore or log during dev
        // console.warn("provider.destroy error", e);
      }
      try {
        doc.destroy?.();
      } catch (e) {
        // console.warn("doc.destroy error", e);
      }
      setYProvider(null);
      setYDoc(null);
    };
  }, [room]);

  // 2) create BlockNote editor imperatively after doc/provider/userInfo ready
  useEffect(() => {
    // only create editor after we have everything we need
    if (!yDoc || !yProvider) return;

    // Safety: allow userInfo to be undefined initially; we'll supply fallback strings
    const name = userInfo?.name ?? "";
    const color = stringToColor(userInfo?.email ?? "");

    // Use BlockNoteEditor.create() to avoid hook-based side-effects during render.
    // The "collaboration" option integrates BlockNote with your Yjs provider & fragment.
    const ed = BlockNoteEditor.create({
      // You can add other editor options here (initialContent, schema, plugins, etc.)
      collaboration: {
        provider: yProvider,
        fragment: yDoc.getXmlFragment("document-store"),
        user: {
          name,
          color,
        },
      },
    });

    setEditor(ed);

    return () => {
      setEditor(null);
    };
    // we intentionally include name/color derived from userInfo so the editor recreates if the user changes
  }, [yDoc, yProvider, userInfo?.name, userInfo?.email]);

  // Safe guard while initialization is in progress
  if (!yDoc || !yProvider || !editor) {
    // you can render a spinner or placeholder here
    return null;
  }

  const btnStyle = `${
    darkMode
      ? "text-white bg-gray-700 hover:bg-gray-600"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300"
  } transition-colors duration-200 rounded-md px-3 py-2`;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-end mb-10 gap-2">
        <TranslateDocument doc={yDoc} />
        <ChatToDocument doc={yDoc} />
        <Button className={btnStyle} onClick={() => setDarkMode((s) => !s)}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <BlockNoteView
          editor={editor}
          theme={darkMode ? "dark" : "light"}
          className="editor min-h-screen"
        />
      </div>
    </div>
  );
}
