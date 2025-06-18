"use client";

import { useState, useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontSize from "@tiptap/extension-font-size";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Type,
  Languages,
  Palette,
  Undo,
  Redo,
} from "lucide-react";

const fonts = [
  { name: "East Syriac Adiabene", value: "Karshon" },
  { name: "East Syriac Malankara", value: "East Syriac Malankara" },
  {
    name: "East Syriac Malankara Classical",
    value: "East Syriac Malankara Classical",
  },
];

const fontSizes = [
  { label: "12pt", value: "12pt" },
  { label: "14pt", value: "14pt" },
  { label: "16pt", value: "16pt" },
  { label: "18pt", value: "18pt" },
  { label: "20pt", value: "20pt" },
  { label: "24pt", value: "24pt" },
  { label: "28pt", value: "28pt" },
  { label: "32pt", value: "32pt" },
  { label: "36pt", value: "36pt" },
  { label: "48pt", value: "48pt" },
];

const mainColors = [
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#ff0000" },
];

interface SyriacEditorProps {
  content?: string;
  onUpdate?: (content: string) => void;
  editable?: boolean;
  className?: string;
}

export default function SyriacEditor({
  content = "",
  onUpdate,
  editable = true,
  className = "",
}: SyriacEditorProps) {
  const [selectedFont, setSelectedFont] = useState("Karshon");
  const [fontSize, setFontSize] = useState("24pt");
  const [fontColor, setFontColor] = useState("#000000");
  const isRTL = true;

  // Current selection attributes
  const [currentFont, setCurrentFont] = useState("Karshon");
  const [currentFontSize, setCurrentFontSize] = useState("24pt");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [currentAlign, setCurrentAlign] = useState(isRTL ? "right" : "left");

  // Mixed state indicators
  const [isFontMixed, setIsFontMixed] = useState(false);
  const [isSizeMixed, setIsSizeMixed] = useState(false);
  const [isColorMixed, setIsColorMixed] = useState(false);
  const [isAlignMixed, setIsAlignMixed] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable most formatting features but keep history (enabled by default)
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
        defaultAlignment: isRTL ? "right" : "left",
      }),
    ],
    content,
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        onUpdate(editor.getHTML());
      }
      updateCurrentAttributes();
    },
    onSelectionUpdate: () => {
      updateCurrentAttributes();
    },
    onCreate: ({ editor }) => {
      // Set initial styles
      editor.commands.setFontFamily(selectedFont);
      editor.commands.setColor(fontColor);
      editor.commands.setFontSize(fontSize);
      updateCurrentAttributes();
    },
  });

  const updateCurrentAttributes = useCallback(() => {
    if (!editor) return;

    const { from, to } = editor.state.selection;

    if (from === to) {
      // No selection, get attributes at cursor position
      const attrs = editor.getAttributes("textStyle");
      const alignAttrs = editor.getAttributes("paragraph");

      setCurrentFont(attrs.fontFamily || selectedFont);
      setCurrentFontSize(attrs.fontSize || fontSize);
      setCurrentColor(attrs.color || fontColor);
      setCurrentAlign(alignAttrs.textAlign || (isRTL ? "right" : "left"));

      setIsFontMixed(false);
      setIsSizeMixed(false);
      setIsColorMixed(false);
      setIsAlignMixed(false);
    } else {
      // Check for mixed formatting in selection
      const doc = editor.state.doc;
      const fonts = new Set();
      const sizes = new Set();
      const colors = new Set();
      const aligns = new Set();

      doc.nodesBetween(from, to, (node) => {
        if (node.isText && node.marks) {
          const textStyleMark = node.marks.find(
            (mark) => mark.type.name === "textStyle"
          );
          if (textStyleMark) {
            if (textStyleMark.attrs.fontFamily)
              fonts.add(textStyleMark.attrs.fontFamily);
            if (textStyleMark.attrs.fontSize)
              sizes.add(textStyleMark.attrs.fontSize);
            if (textStyleMark.attrs.color)
              colors.add(textStyleMark.attrs.color);
          }
        }
        if (node.type.name === "paragraph") {
          aligns.add(node.attrs.textAlign || (isRTL ? "right" : "left"));
        }
      });

      // Set current values or "Mixed"
      setIsFontMixed(fonts.size > 1);
      setIsSizeMixed(sizes.size > 1);
      setIsColorMixed(colors.size > 1);
      setIsAlignMixed(aligns.size > 1);

      if (fonts.size === 1) setCurrentFont(Array.from(fonts)[0] as string);
      if (sizes.size === 1) setCurrentFontSize(Array.from(sizes)[0] as string);
      if (colors.size === 1) setCurrentColor(Array.from(colors)[0] as string);
      if (aligns.size === 1) setCurrentAlign(Array.from(aligns)[0] as string);
    }
  }, [editor, selectedFont, fontSize, fontColor, isRTL]);

  useEffect(() => {
    updateCurrentAttributes();
  }, [updateCurrentAttributes]);

  const handleFontChange = useCallback(
    (value: string) => {
      setSelectedFont(value);
      setCurrentFont(value);
      setIsFontMixed(false);
      editor?.chain().focus().setFontFamily(value).run();
    },
    [editor]
  );

  const handleFontSizeChange = useCallback(
    (value: string) => {
      setFontSize(value);
      setCurrentFontSize(value);
      setIsSizeMixed(false);
      editor?.chain().focus().setFontSize(value).run();
    },
    [editor]
  );

  const handleColorChange = useCallback(
    (color: string) => {
      setFontColor(color);
      setCurrentColor(color);
      setIsColorMixed(false);
      editor?.chain().focus().setColor(color).run();
    },
    [editor]
  );

  const handleAlignChange = useCallback(
    (align: string) => {
      setCurrentAlign(align);
      setIsAlignMixed(false);
      editor?.chain().focus().setTextAlign(align).run();
    },
    [editor]
  );

  if (!editor) {
    return (
      <div
        className={`w-full max-w-4xl mx-auto border border-border rounded-lg bg-card ${className}`}
      >
        <div className="animate-pulse p-4">
          <div className="h-10 bg-muted rounded mb-4"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-4xl mx-auto border border-border rounded-lg overflow-hidden bg-card ${className}`}
    >
      {/* Toolbar */}
      <div className="border-b border-border bg-muted/30 p-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Font Selection */}
          <div className="flex items-center gap-2">
            <Languages size={16} />
            <Select
              value={isFontMixed ? "mixed" : currentFont}
              onValueChange={handleFontChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue
                  placeholder={isFontMixed ? "Mixed" : "Select font"}
                />
              </SelectTrigger>
              <SelectContent>
                {isFontMixed && (
                  <SelectItem value="mixed" disabled>
                    Mixed Fonts
                  </SelectItem>
                )}
                {fonts.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Font Size */}
          <div className="flex items-center gap-2">
            <Type size={16} />
            <Select
              value={isSizeMixed ? "mixed" : currentFontSize}
              onValueChange={handleFontSizeChange}
            >
              <SelectTrigger className="w-20">
                <SelectValue placeholder={isSizeMixed ? "Mixed" : "Size"} />
              </SelectTrigger>
              <SelectContent>
                {isSizeMixed && (
                  <SelectItem value="mixed" disabled>
                    Mixed
                  </SelectItem>
                )}
                {fontSizes.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Font Color */}
          <div className="flex items-center gap-2">
            <Palette size={16} />
            <div className="flex items-center gap-1">
              {/* Main Colors - Simple */}
              {mainColors.map((color) => (
                <button
                  key={color.value}
                  className={`w-5 h-5 rounded border cursor-pointer ${
                    !isColorMixed && currentColor === color.value
                      ? "ring-1 ring-gray-400"
                      : ""
                  } ${isColorMixed ? "opacity-50" : ""}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorChange(color.value)}
                  title={
                    isColorMixed
                      ? `${color.name} (Mixed colors selected)`
                      : color.name
                  }
                />
              ))}

              {/* Custom Color */}
              <Input
                type="color"
                value={isColorMixed ? "#808080" : currentColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-5 h-5 p-0 border rounded cursor-pointer"
                title={
                  isColorMixed ? "Custom (Mixed colors selected)" : "Custom"
                }
                disabled={isColorMixed}
              />
            </div>
            {isColorMixed && (
              <span className="text-xs text-muted-foreground">Mixed</span>
            )}
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Text Alignment */}
          <div className="flex items-center gap-1">
            <Button
              variant={
                !isAlignMixed && currentAlign === (isRTL ? "right" : "left")
                  ? "default"
                  : "ghost"
              }
              size="sm"
              onClick={() => handleAlignChange(isRTL ? "right" : "left")}
              className={isAlignMixed ? "opacity-50" : ""}
            >
              {isRTL ? <AlignRight size={16} /> : <AlignLeft size={16} />}
            </Button>
            <Button
              variant={
                !isAlignMixed && currentAlign === "center" ? "default" : "ghost"
              }
              size="sm"
              onClick={() => handleAlignChange("center")}
              className={isAlignMixed ? "opacity-50" : ""}
            >
              <AlignCenter size={16} />
            </Button>
            <Button
              variant={
                !isAlignMixed && currentAlign === (isRTL ? "left" : "right")
                  ? "default"
                  : "ghost"
              }
              size="sm"
              onClick={() => handleAlignChange(isRTL ? "left" : "right")}
              className={isAlignMixed ? "opacity-50" : ""}
            >
              {isRTL ? <AlignLeft size={16} /> : <AlignRight size={16} />}
            </Button>
            <Button
              variant={
                !isAlignMixed && currentAlign === "justify"
                  ? "default"
                  : "ghost"
              }
              size="sm"
              onClick={() => handleAlignChange("justify")}
              className={isAlignMixed ? "opacity-50" : ""}
            >
              <AlignJustify size={16} />
            </Button>
            {isAlignMixed && (
              <span className="text-xs text-muted-foreground ml-1">Mixed</span>
            )}
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              title="Undo"
            >
              <Undo size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              title="Redo"
            >
              <Redo size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div
        className="min-h-[400px] p-6 focus-within:outline-none"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <EditorContent editor={editor} className="focus:outline-none" />
        <style jsx global>{`
          .ProseMirror ::selection {
            background-color: #e5e7eb !important; /* Light gray */
          }

          .ProseMirror ::-moz-selection {
            background-color: #e5e7eb !important; /* Light gray for Firefox */
          }
        `}</style>
      </div>

      {/* Status Bar */}
      <div className="border-t border-border bg-muted/30 px-3 py-2">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Font: {isFontMixed ? "Mixed" : currentFont}</span>
            <span>Size: {isSizeMixed ? "Mixed" : currentFontSize}</span>
            <span>Color: {isColorMixed ? "Mixed" : currentColor}</span>
            <span>Align: {isAlignMixed ? "Mixed" : currentAlign}</span>
            <span>Direction: {isRTL ? "Right-to-Left" : "Left-to-Right"}</span>
          </div>
          <div className="flex items-center gap-2">
            {!editable && (
              <span className="text-orange-600 dark:text-orange-400">
                Read-only
              </span>
            )}
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                editor.isFocused ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
