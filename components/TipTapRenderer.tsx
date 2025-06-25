"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontSize from "@tiptap/extension-font-size";
import { Extension } from "@tiptap/core";

// Custom extension to add line height and direction to paragraphs
const ParagraphExtension = Extension.create({
  name: "paragraphExtension",

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph"],
        attributes: {
          lineHeight: {
            default: "1.4",
            parseHTML: (element) => element.style.lineHeight || "1.4",
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
          dir: {
            default: "rtl",
            parseHTML: (element) => element.getAttribute("dir") || "rtl",
            renderHTML: (attributes) => {
              if (!attributes.dir) {
                return {};
              }
              return {
                dir: attributes.dir,
              };
            },
          },
        },
      },
    ];
  },
});

interface TipTapRendererProps {
  content: JSONContent;
  showLineNumbers?: boolean;
}

export default function TipTapRenderer({
  content,
  showLineNumbers = true,
}: TipTapRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [linePositions, setLinePositions] = useState<number[]>([]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
        strike: false,
        code: false,
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        heading: false,
        horizontalRule: false,
      }),
      TextStyle,
      Color,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      FontSize.configure({
        types: ["textStyle"],
      }),
      TextAlign.configure({
        types: ["paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "right",
      }),
      ParagraphExtension,
    ],
    content: content,
    editable: false,
    immediatelyRender: false,
  });

  // Function to measure paragraph positions
  const measureParagraphPositions = useCallback(() => {
    if (!containerRef.current || !editor) return;

    const proseMirrorElement =
      containerRef.current.querySelector(".ProseMirror");
    if (!proseMirrorElement) return;

    const paragraphs = proseMirrorElement.querySelectorAll("p");
    const containerRect = containerRef.current.getBoundingClientRect();
    const positions: number[] = [];

    paragraphs.forEach((paragraph) => {
      const rect = paragraph.getBoundingClientRect();
      const relativeCenter = rect.top + rect.height / 2 - containerRect.top;
      positions.push(relativeCenter);
    });

    setLinePositions(positions);
  }, [editor]);

  // Measure positions when editor content changes or loads
  useEffect(() => {
    if (editor) {
      // Wait for editor to fully render
      const timer = setTimeout(measureParagraphPositions, 100);

      // Also measure on window resize
      const handleResize = () => {
        measureParagraphPositions();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [editor, measureParagraphPositions, content]);

  // Remeasure when editor updates
  useEffect(() => {
    if (editor) {
      const handleUpdate = () => {
        setTimeout(measureParagraphPositions, 50);
      };

      editor.on("update", handleUpdate);
      return () => {
        editor.off("update", handleUpdate);
        return;
      };
    }
  }, [editor, measureParagraphPositions]);

  if (!editor) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="mt-8 sm:mt-16 lg:mt-24 flex"
      style={{
        fontFamily: 'Karshon, "East Syriac Malankara", serif',
        fontSize: "24pt",
        marginTop: "70px",
      }}
    >
      {/* Text content */}
      <div ref={containerRef} className="flex-1">
        <EditorContent editor={editor} />
      </div>

      {/* Line numbers container - normal flow on the right */}
      <div
        className="select-none pointer-events-none"
        style={{
          width: "16px",
          color: "gray", // Light gray color
          fontSize: "14px",
          fontFamily: "monospace",
          position: "relative",
          visibility: showLineNumbers ? "visible" : "hidden",
        }}
      >
        {linePositions.map((position, index) => (
          <div
            key={index + 1}
            style={{
              position: "absolute",
              top: `${position}px`,
              left: "8px",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              whiteSpace: "nowrap",
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <style jsx global>{`
        .ProseMirror {
          line-height: 1.4 !important;
        }

        .ProseMirror p {
          line-height: 1.4 !important;
          margin: 0.25em 0 !important;
        }

        .ProseMirror ::selection {
          background-color: #e5e7eb !important; /* Light gray */
        }

        .ProseMirror ::-moz-selection {
          background-color: #e5e7eb !important; /* Light gray for Firefox */
        }
      `}</style>
    </div>
  );
}
