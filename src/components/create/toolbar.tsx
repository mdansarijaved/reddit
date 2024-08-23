"use client";
import React from "react";
import { type Editor } from "@tiptap/react";
import { Toggle } from "../ui/toggle";
import { Bold, Italic, Strikethrough } from "lucide-react";

type EditorType = {
  editor: Editor | null;
};
function Toolbar({ editor }: EditorType) {
  if (!editor) return null;

  return (
    <div className="border-b border-gray-700 bg-transparent ">
      <Toggle
        size={"sm"}
        pressed={editor.isActive("heading")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="w-4 h-4" />
      </Toggle>
    </div>
  );
}

export default Toolbar;
