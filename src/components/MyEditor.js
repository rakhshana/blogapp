import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlock from "@tiptap/extension-code-block";

const MyEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, CodeBlock],
    content: "<p>Hello World!</p>",
  });

  if (!editor) return <div>Loading editor...</div>;

  const toggleCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };

  return (
    <div>
      {/* Toolbar */}
      <button onClick={toggleCodeBlock} style={{ marginBottom: 10 }}>
        Toggle Code Block
      </button>

      {/* Editor */}
      <div
        style={{
          border: "1px solid gray",
          borderRadius: "5px",
          minHeight: "200px",
          padding: "10px",
          backgroundColor: "white",
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default MyEditor;
