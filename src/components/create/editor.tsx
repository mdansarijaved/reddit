import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
function Tiptap({
  body,
  onChange,
}: {
  body: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: body,
    editorProps: {
      attributes: {
        class: "  min-h-[150px] p-2 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });
  return (
    <div className="w-full  border  border-gray-700 rounded">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default Tiptap;
