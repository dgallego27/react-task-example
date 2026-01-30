import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { useState, useEffect } from "react";

function RichTextEditor({ value, onChange, placeholder = "Escribe algo..." }) {
  const [, forceUpdate] = useState({});

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Asegurarnos de no duplicar nada
        strike: true,
        bold: true,
      }),
      Underline,
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== value) {
        onChange(html);
      }
    },
    onSelectionUpdate: () => {
      forceUpdate({});
    },
    onTransaction: () => {
      forceUpdate({});
    },
  });

  useEffect(() => {
    if (!editor) return;
    
    const currentContent = editor.getHTML();
    
    if (value !== currentContent) {
      editor.commands.setContent(value || "", false);
    }
  }, [editor, value]);

  if (!editor) return null;

  const isMarkActive = (markName) => {
    return (
      editor.isActive(markName) ||
      editor.state.storedMarks?.some((mark) => mark.type.name === markName)
    );
  };

  return (
    <div className="border rounded bg-white text-black p-3 mb-3">
      <div className="mb-2 space-x-2 pb-2 border-b">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${
            isMarkActive("bold")
              ? "border-2 border-[#5B55A0] bg-[#5b55a03c] text-[#5B55A0]"
              : "bg-gray-200 text-black"
          }`}
        >
          <strong>N</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 py-1 rounded ${
            isMarkActive("underline")
              ? "border-2 border-[#5B55A0] bg-[#5b55a03c] text-[#5B55A0]"
              : "bg-gray-200 text-black"
          }`}
        >
          <u>S</u>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded ${
            isMarkActive("strike")
              ? "border-2 border-[#5B55A0] bg-[#5b55a03c] text-[#5B55A0]"
              : "bg-gray-200 text-black"
          }`}
        >
          <s>ab</s>
        </button>
      </div>

      <div className="min-h-24">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default RichTextEditor;