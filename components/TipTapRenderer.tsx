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
import SedraDialog from "./SedraDialog";

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
  selectedFont?: string;
  selectedFontSize?: string;
  textDirection?: "rtl" | "ltr";
  language?: string; // Add language prop
}

export default function TipTapRenderer({
  content,
  showLineNumbers = true,
  selectedFont = "default",
  selectedFontSize = "default",
  textDirection = "rtl",
  language = "",
}: TipTapRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [linePositions, setLinePositions] = useState<number[]>([]);

  // Function to check if language is Syriac
  const isSyriacLanguage = (lang: string): boolean => {
    const syriacLanguages = ["syriac", "classical syriac"];
    const isMatch = syriacLanguages.includes(lang.toLowerCase());
    return isMatch;
  };

  // Get font family based on selected font
  const getFontFamily = (fontType: string): string => {
    // Return the font name directly as it should match the font family name
    // Add fallbacks for each Syriac font
    switch (fontType) {
      case "Karshon":
        return 'Karshon, "East Syriac Malankara", serif';
      case "East Syriac Adiabene":
        return '"East Syriac Adiabene", Karshon, serif';
      case "East Syriac Malankara":
        return '"East Syriac Malankara", Karshon, serif';
      case "East Syriac Malankara Classical":
        return '"East Syriac Malankara Classical", "East Syriac Malankara", Karshon, serif';
      case "East Syriac Ctesiphon":
        return '"East Syriac Ctesiphon", Karshon, serif';
      case "Estrangelo Edessa":
        return '"Estrangelo Edessa", Karshon, serif';
      case "Estrangelo Qenneshrin":
        return '"Estrangelo Qenneshrin", "Estrangelo Edessa", Karshon, serif';
      case "Noto Sans Malayalam":
        return '"Noto Sans Malayalam", Karshon, serif';
      default:
        return 'Karshon, "East Syriac Malankara", serif';
    }
  };

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
        defaultAlignment: textDirection === "rtl" ? "right" : "left",
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

  // Remeasure line positions when text size changes
  useEffect(() => {
    if (editor) {
      const timer = setTimeout(measureParagraphPositions, 150);
      return () => clearTimeout(timer);
    }
  }, [selectedFontSize, measureParagraphPositions, editor]);

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

  // Add word IDs to rendered content after TipTap renders
  useEffect(() => {
    if (editor && containerRef.current) {
      const addWordIds = () => {
        const proseMirrorElement =
          containerRef.current?.querySelector(".ProseMirror");
        if (!proseMirrorElement) return;

        const textNodes: Text[] = [];
        const walker = document.createTreeWalker(
          proseMirrorElement,
          NodeFilter.SHOW_TEXT,
          null
        );

        let node;
        while ((node = walker.nextNode())) {
          textNodes.push(node as Text);
        }

        textNodes.forEach((textNode, nodeIndex) => {
          const text = textNode.textContent || "";
          if (text.trim()) {
            const words = text.split(/(\s+)/);
            if (words.length > 1) {
              const fragment = document.createDocumentFragment();

              words.forEach((word, wordIndex) => {
                if (word.trim()) {
                  const span = document.createElement("span");
                  span.textContent = word;
                  span.setAttribute(
                    "data-word-id",
                    `word-${Date.now()}-${nodeIndex}-${wordIndex}`
                  );
                  span.style.display = "inline";
                  fragment.appendChild(span);
                } else {
                  // Keep whitespace as text nodes
                  fragment.appendChild(document.createTextNode(word));
                }
              });

              textNode.parentNode?.replaceChild(fragment, textNode);
            }
          }
        });
      };

      // Run after editor renders
      const timer = setTimeout(addWordIds, 100);

      return () => clearTimeout(timer);
    }
  }, [editor, content]);

  // Update font family and size dynamically
  useEffect(() => {
    // Remove existing style if present
    const existingStyle = document.getElementById("tiptap-font-override");
    if (existingStyle) {
      existingStyle.remove();
    }

    // Apply overrides if either font or font size is selected (not "default")
    if (
      (selectedFont && selectedFont !== "default") ||
      (selectedFontSize && selectedFontSize !== "default")
    ) {
      const styleElement = document.createElement("style");
      styleElement.id = "tiptap-font-override";

      let styles = "";

      if (selectedFont && selectedFont !== "default") {
        const fontFamily = getFontFamily(selectedFont);
        styles += `font-family: ${fontFamily} !important;\n`;
      }

      if (selectedFontSize && selectedFontSize !== "default") {
        styles += `font-size: ${selectedFontSize} !important;\n`;
      }

      styleElement.textContent = `
        .ProseMirror,
        .ProseMirror *,
        .ProseMirror p,
        .ProseMirror span,
        .ProseMirror div {
          ${styles}
        }
      `;

      document.head.appendChild(styleElement);
    }

    return () => {
      const styleToRemove = document.getElementById("tiptap-font-override");
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, [selectedFont, selectedFontSize]);

  if (!editor) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="mt-8 sm:mt-16 lg:mt-24 flex"
      style={{
        ...(selectedFont !== "default" && {
          fontFamily: getFontFamily(selectedFont),
        }),
        fontSize: selectedFontSize !== "default" ? selectedFontSize : "24pt",
        marginTop: "70px",
        overflow: "visible",
        flexDirection: textDirection === "ltr" ? "row" : "row-reverse",
      }}
    >
      {/* Line numbers container - positioned based on text direction */}
      <div
        className="select-none pointer-events-none"
        style={{
          width: "16px",
          color: "gray", // Light gray color
          fontSize: "14px",
          fontFamily: "monospace",
          position: "relative",
          visibility: showLineNumbers ? "visible" : "hidden",
          order: textDirection === "ltr" ? 1 : 2,
        }}
      >
        {linePositions.map((position, index) => (
          <div
            key={index + 1}
            style={{
              position: "absolute",
              top: `${position}px`,
              left: textDirection === "ltr" ? "0px" : "8px",
              right: textDirection === "ltr" ? "8px" : "auto",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent:
                textDirection === "ltr" ? "flex-end" : "flex-start",
              whiteSpace: "nowrap",
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Text content */}
      <div
        ref={containerRef}
        className="flex-1"
        data-testid="tiptap-text-content"
        style={{
          overflow: "visible",
          order: textDirection === "ltr" ? 2 : 1,
        }}
      >
        <EditorContent editor={editor} />
      </div>

      {/* Sedra Dialog */}
      <SedraDialog language={language} containerRef={containerRef} />

      <style jsx global>{`
        .ProseMirror {
          line-height: 1.4 !important;
          overflow: visible !important;
          font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "ccmp" 1,
            "locl" 1, "mark" 1, "mkmk" 1;
          font-variant-ligatures: common-ligatures contextual;
          text-rendering: optimizeLegibility;
          -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "ccmp" 1,
            "locl" 1, "mark" 1, "mkmk" 1;
          -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "ccmp" 1,
            "locl" 1, "mark" 1, "mkmk" 1;
        }

        .ProseMirror p {
          line-height: 1.4 !important;
          margin: 0.25em 0 !important;
          font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "ccmp" 1,
            "locl" 1, "mark" 1, "mkmk" 1;
          font-variant-ligatures: common-ligatures contextual;
          text-rendering: optimizeLegibility;
          -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "ccmp" 1,
            "locl" 1, "mark" 1, "mkmk" 1;
          -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "ccmp" 1,
            "locl" 1, "mark" 1, "mkmk" 1;
        }

        /* Add cursor pointer for clickable words in Syriac */
        ${isSyriacLanguage(language)
          ? `
        .ProseMirror {
          cursor: pointer !important;
        }
        .ProseMirror p {
          cursor: pointer !important;
        }
        .ProseMirror span {
          cursor: pointer !important;
        }
        .ProseMirror div {
          cursor: pointer !important;
        }
        .ProseMirror * {
          cursor: pointer !important;
        }
        `
          : ""}

        .ProseMirror ::selection {
          background-color: #e5e7eb !important; /* Light gray */
        }

        .ProseMirror ::-moz-selection {
          background-color: #e5e7eb !important; /* Light gray for Firefox */
        }

        /* Ensure word spans are visible and clickable */
        .ProseMirror [data-word-id] {
          display: inline !important;
          cursor: pointer !important;
          position: relative !important;
        }

        .ProseMirror [data-word-id]:hover {
          background-color: rgba(229, 231, 235, 0.5) !important;
        }
      `}</style>
    </div>
  );
}
