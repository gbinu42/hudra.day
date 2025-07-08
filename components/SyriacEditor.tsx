"use client";

import { useState, useCallback, useEffect } from "react";
import {
  useEditor,
  EditorContent,
  JSONContent,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontSize from "@tiptap/extension-font-size";
import { Extension } from "@tiptap/core";
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
  Undo,
  Redo,
  Keyboard,
} from "lucide-react";
import SyriacKeyboard from "./SyriacKeyboard";

const fonts = [
  { name: "East Syriac Adiabene", value: "East Syriac Adiabene" },
  { name: "East Syriac Malankara", value: "East Syriac Malankara" },
  {
    name: "East Syriac Malankara Classical",
    value: "East Syriac Malankara Classical",
  },
  { name: "Karshon", value: "Karshon" },
  { name: "East Syriac Ctesiphon", value: "East Syriac Ctesiphon" },
  { name: "Estrangela Edessa", value: "Estrangelo Edessa" },
  { name: "Estrangela Qenneshrin", value: "Estrangelo Qenneshrin" },
  { name: "Noto Sans Malayalam", value: "Noto Sans Malayalam" },
];

const fontSizes = [
  { label: "12pt", value: "12pt" },
  { label: "14pt", value: "14pt" },
  { label: "16pt", value: "16pt" },
  { label: "18pt", value: "18pt" },
  { label: "20pt", value: "20pt" },
  { label: "22pt", value: "22pt" },
  { label: "24pt", value: "24pt" },
  { label: "28pt", value: "28pt" },
  { label: "32pt", value: "32pt" },
  { label: "36pt", value: "36pt" },
  { label: "48pt", value: "48pt" },
];

const alignmentOptions = [
  {
    label: "Left",
    value: "left",
    icon: AlignLeft,
    rtlValue: "right", // In RTL, "left" visually appears on the right
  },
  {
    label: "Center",
    value: "center",
    icon: AlignCenter,
    rtlValue: "center",
  },
  {
    label: "Right",
    value: "right",
    icon: AlignRight,
    rtlValue: "left", // In RTL, "right" visually appears on the left
  },
  {
    label: "Justify",
    value: "justify",
    icon: AlignJustify,
    rtlValue: "justify",
  },
];

const mainColors = [
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#ff0000" },
  { name: "Blue", value: "#0000ff" },
];

interface SyriacEditorProps {
  content?: string | JSONContent;
  onUpdate?: (content: string, json?: JSONContent) => void;
  editable?: boolean;
  className?: string;
  textDirection?: "rtl" | "ltr";
  bookLanguage?: string;
}

// This will be set from props in the component

// Custom extension factory to add line height and direction to paragraphs
const createParagraphExtension = (defaultDirection: "rtl" | "ltr") =>
  Extension.create({
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
              default: defaultDirection,
              parseHTML: (element) =>
                element.getAttribute("dir") || defaultDirection,
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

export default function SyriacEditor({
  content = "",
  onUpdate,
  editable = true,
  className = "",
  textDirection = "rtl",
  bookLanguage = "",
}: SyriacEditorProps) {
  const isRTL = textDirection === "rtl";
  const [selectedFont, setSelectedFont] = useState("Karshon");
  const [fontSize, setFontSize] = useState("");
  const [fontSizeInput, setFontSizeInput] = useState("");
  const [fontColor, setFontColor] = useState("#000000");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardCollapsed, setKeyboardCollapsed] = useState(false);

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
      createParagraphExtension(textDirection),
    ],
    content,
    editable,
    immediatelyRender: false,
    editorProps: {
      handlePaste: (view, event) => {
        const clipboardData = event.clipboardData;
        if (clipboardData && clipboardData.getData) {
          let pastedText = clipboardData.getData("text/plain");
          if (pastedText) {
            event.preventDefault();

            // Process Malayalam text if applicable
            if (bookLanguage === "Malayalam") {
              pastedText = pastedText
                .replace(/\n|\r\n|\r/g, "") // Remove all newlines
                .replace(/ൻറെ/g, "ന്റെ") // Replace ൻറെ with ന്റെ
                .replace(/ണ്ടു(?=\s|$)/g, "ണ്ട്") // Replace ണ്ടു with ണ്ട് at end of word
                .replace(/നു(?=\s|$)/g, "ന്") // Replace നു with ന് at end of word
                .replace(/ത്തു(?=\s|$)/g, "ത്ത്") // Replace ത്തു with ത്ത് at end of word
                .replace(/ക്കു(?=\s|$)/g, "ക്ക്")
                .replace(/ട്ടു(?=\s|$)/g, "ട്ട്")
                .replace(/തു(?=\s|$)/g, "ത്");
            }

            // Apply Syriac transformations to all languages
            const processedText = pastedText
              .replace(/ܬܼܵ/g, "ܬ݂ܵ") // Replace ܬܼܵ with ܬ݂ܵ
              .replace(/ܡܼܢ/g, "ܡ̣ܢ") // Replace ܡܼܢ with ܡ̣ܢ
              .replace(/ܕܿ/g, "ܕ݁") // Replace ܕܿ with ܕ݁
              .replace(/ܡ݂ܢ/g, "ܡ̣ܢ") // Replace ܡ݂ܢ with ܡ̣ܢ
              .replace(/ܕܼ/g, "ܕ݂") // Replace ܕܼ with ܕ݂
              .replace(/ܒܹܿ/g, "ܒܹ݁") // Replace ܒܹܿ with ܒܹ݁
              .replace(/ܐ݇ܡܹܝܢ/g, "ܐܵܡܹܝܢ")
              .replace(/ܡܳܪܶ/g, "ܡܵܪܵ")
              .replace(/ܐܿ/g, "ܐܵ")
              .replace(/\*/g, "܀")
              .replace(/ܟܷ/g, "ܟ݂")
              .replace(/ܥܵܢܲܝܢ/g, "ܥܵܢܹܝܢ")
              .replace(/ܐܲܡܹܝܢ/g, "ܐܵܡܹܝܢ")
              .replace(/ܙܲܒ݂ܢܲܐ/g, "ܙܲܒ݂ܢܹ̈ܐ")
              .replace(/ܙܲܒ݂ܪܹܐ/g, "ܙܲܒ݂ܢܹ̈ܐ")
              .replace(/ܥܸܕܵܪܹܐ/g, "ܥܸܕܵܢܹܐ")
              .replace(/ܕܒܲܬܲܪ/g, "ܕܒ݂ܵܬܲܪ")
              .replace(/ܡܸܢ/g, "ܡ̣ܢ")
              .replace(/ܒ̇/g, "ܒ݁") // Replace ܒ̇ with ܒ݁
              .replace(/ܒ̣/g, "ܒ݂") // Replace ܒ̣ with ܒ݂
              .replace(/ܬ̇/g, "ܬ݁") // Replace ܬ̇ with ܬ݁
              .replace(/ܬ̣/g, "ܬ݂") // Replace ܬ̣ with ܬ݂
              .replace(/ܟ̇/g, "ܟ݁") // Replace ܟ̇ with ܟ݁
              .replace(/ܟ̣/g, "ܟ݂") // Replace ܟ̣ with ܟ݂
              .replace(/ܓ̣/g, "ܓ݁") // Replace ܓ̣ with ܓ݁
              .replace(/ܓ̇/g, "ܓ݁") // Replace ܓ̇ with ܓ݁
              .replace(/ܟܼ/g, "ܟ݂") // Replace ܟܼ with ܟ݂
              .replace(/ܬܿ/g, "ܬ݁") // Replace ܬܿ with ܬ݁
              .replace(/ܬܼ/g, "ܬ݂") // Replace ܬܼ with ܬ݂
              .replace(/ܒܿ/g, "ܒ݁") // Replace ܒܿ with ܒ݁
              .replace(/ܒܼ/g, "ܒ݂") // Replace ܒܼ with ܒ݂
              .replace(/ܓܼ/g, "ܓ݂") // Replace ܓܼ with ܓ݂
              .replace(/ܓܿ/g, "ܓ݁") // Replace ܓܿ with ܓ݁
              .replace(/ܐ̄/g, "ܐ݇")
              .replace(/ܗ̄/g, "ܗ݇")
              .replace(/ܠ̄/g, "ܠ݇")
              .replace(/ܢ̄/g, "ܢ݇");

            // Insert the processed text
            view.dispatch(
              view.state.tr.insertText(
                processedText,
                view.state.selection.from,
                view.state.selection.to
              )
            );

            return true; // Prevent default paste behavior
          }
        }
        return false; // Allow default paste behavior if no text data
      },
    },
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        onUpdate(editor.getHTML(), editor.getJSON());
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

      // Set line height and direction for all paragraphs
      editor.commands.selectAll();
      editor.commands.updateAttributes("paragraph", {
        lineHeight: "1.4",
        dir: textDirection,
      });
      editor.commands.setTextSelection(0);

      updateCurrentAttributes();
    },
    onFocus: () => {
      // Show keyboard on mobile when editor is focused
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setKeyboardVisible(true);
      }
    },
    onBlur: () => {
      // Hide keyboard on mobile when editor loses focus
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setKeyboardVisible(false);
      }
    },
  });

  // Cleanup editor on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  const updateCurrentAttributes = useCallback(() => {
    if (!editor) return;

    const { from, to } = editor.state.selection;

    if (from === to) {
      // No selection, get attributes at cursor position
      const attrs = editor.getAttributes("textStyle");
      const alignAttrs = editor.getAttributes("paragraph");

      setCurrentFont(attrs.fontFamily || selectedFont);
      const currentSize = attrs.fontSize || fontSize;
      setCurrentFontSize(currentSize);
      // Update input field with numeric value
      const numericValue = currentSize.replace(/[^\d.]/g, "");
      setFontSizeInput(numericValue);
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
      if (sizes.size === 1) {
        const size = Array.from(sizes)[0] as string;
        setCurrentFontSize(size);
        // Update input field with numeric value
        const numericValue = size.replace(/[^\d.]/g, "");
        setFontSizeInput(numericValue);
      }
      if (colors.size === 1) setCurrentColor(Array.from(colors)[0] as string);
      if (aligns.size === 1) setCurrentAlign(Array.from(aligns)[0] as string);
    }
  }, [editor, selectedFont, fontSize, fontColor, isRTL]);

  useEffect(() => {
    updateCurrentAttributes();
  }, [updateCurrentAttributes]);

  // Handle mobile keyboard visibility based on clicks outside editor
  useEffect(() => {
    const handleClickOutside = () => {
      // Remove mobile auto-dismiss logic - keyboard stays visible on mobile
      // Only handle desktop behavior if needed
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        // Desktop behavior can stay the same if needed
        return;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [keyboardVisible]);

  // Control hardware keyboard on mobile based on Syriac keyboard state
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const proseMirrorElement = document.querySelector(
        ".ProseMirror"
      ) as HTMLElement;
      if (proseMirrorElement) {
        // Prevent hardware keyboard when Syriac keyboard is visible and not collapsed
        if (keyboardVisible && !keyboardCollapsed) {
          proseMirrorElement.setAttribute("inputmode", "none");
        } else {
          proseMirrorElement.setAttribute("inputmode", "text");
        }
      }
    }
  }, [keyboardVisible, keyboardCollapsed]);

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
      // Extract numeric value for input field
      const numericValue = value.replace(/[^\d.]/g, "");
      setFontSizeInput(numericValue);
      editor?.chain().focus().setFontSize(value).run();
    },
    [editor]
  );

  const handleFontSizeInputSubmit = useCallback(() => {
    const numValue = parseFloat(fontSizeInput);
    if (numValue >= 8 && numValue <= 72) {
      const sizeValue = `${numValue}pt`;
      setFontSize(sizeValue);
      setCurrentFontSize(sizeValue);
      setIsSizeMixed(false);
      editor?.chain().focus().setFontSize(sizeValue).run();
    } else {
      // Reset to current size if invalid
      const currentNumeric = currentFontSize.replace(/[^\d.]/g, "") || "24";
      setFontSizeInput(currentNumeric);
    }
  }, [editor, fontSizeInput, currentFontSize]);

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

  // Keyboard handlers
  const handleKeyboardToggle = useCallback(() => {
    setKeyboardVisible(!keyboardVisible);
  }, [keyboardVisible]);

  const handleKeyboardCollapseChange = useCallback((isCollapsed: boolean) => {
    setKeyboardCollapsed(isCollapsed);
  }, []);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (!editor) return;
      editor.chain().focus().insertContent(key).run();
    },
    [editor]
  );

  const handleKeyboardBackspace = useCallback(() => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    if (from === to && from > 0) {
      // Delete character before cursor
      editor
        .chain()
        .focus()
        .deleteRange({ from: from - 1, to: from })
        .run();
    } else if (from !== to) {
      // Delete selection
      editor.chain().focus().deleteSelection().run();
    }
  }, [editor]);

  const handleKeyboardEnter = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().enter().run();
  }, [editor]);

  const handleKeyboardClear = useCallback(() => {
    if (!editor) return;
    if (
      confirm("Are you sure you want to clear all text? This cannot be undone.")
    ) {
      editor.chain().focus().clearContent().run();
    }
  }, [editor]);

  const handleKeyboardSpace = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().insertContent(" ").run();
  }, [editor]);

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
    <>
      <div
        className={`w-full max-w-4xl mx-auto border border-border rounded-lg overflow-hidden bg-card flex flex-col ${className}`}
      >
        {/* Toolbar */}
        <div className="border-b border-border bg-muted/30 p-3 lg:px-6 xl:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {/* Font Selection */}
            <div className="flex items-center gap-2">
              <Select
                value={isFontMixed ? "mixed" : currentFont}
                onValueChange={handleFontChange}
              >
                <SelectTrigger className="w-44">
                  <SelectValue
                    placeholder={isFontMixed ? "Mixed Fonts" : "Select font"}
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
                      {font.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Font Size */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Input
                  type="text"
                  value={isSizeMixed ? "Mixed" : fontSizeInput + "pt"}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^\d.]/g, "");
                    setFontSizeInput(value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleFontSizeInputSubmit();
                      (e.target as HTMLInputElement).blur();
                    }
                  }}
                  onBlur={handleFontSizeInputSubmit}
                  placeholder={isSizeMixed ? "Mixed" : "Size"}
                  className="w-18 h-9 text-center text-sm pr-6"
                  disabled={isSizeMixed}
                />
                <Select
                  value={isSizeMixed ? "mixed" : currentFontSize}
                  onValueChange={handleFontSizeChange}
                >
                  <SelectTrigger className="absolute right-0 top-0 w-6 h-9 border-0 bg-transparent p-0 hover:bg-slate-100"></SelectTrigger>
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
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Font Color */}
            <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-2">
              <Select
                value={isAlignMixed ? "mixed" : currentAlign}
                onValueChange={handleAlignChange}
              >
                <SelectTrigger className="w-16 h-10 [&>[data-radix-select-icon]]:hidden">
                  {isAlignMixed ? (
                    <span className="text-xs">Mix</span>
                  ) : (
                    (() => {
                      const option = alignmentOptions.find((opt) =>
                        isRTL
                          ? opt.rtlValue === currentAlign
                          : opt.value === currentAlign
                      );
                      const IconComponent = option?.icon || AlignLeft;
                      return <IconComponent size={16} />;
                    })()
                  )}
                </SelectTrigger>
                <SelectContent>
                  {isAlignMixed && (
                    <SelectItem value="mixed" disabled>
                      Mixed Alignment
                    </SelectItem>
                  )}
                  {alignmentOptions.map((option) => {
                    const IconComponent = option.icon;
                    const value = isRTL ? option.rtlValue : option.value;
                    return (
                      <SelectItem key={option.value} value={value}>
                        <div className="flex items-center gap-2">
                          <IconComponent size={16} />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
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

            <Separator orientation="vertical" className="h-6" />

            {/* Keyboard Toggle - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant={keyboardVisible ? "default" : "outline"}
                size="sm"
                onClick={handleKeyboardToggle}
                title={keyboardVisible ? "Hide Keyboard" : "Show Keyboard"}
                className={
                  keyboardVisible ? "bg-blue-600 hover:bg-blue-700" : ""
                }
              >
                <Keyboard size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div
          className="flex-1 p-6 lg:px-8 xl:px-12 focus-within:outline-none cursor-text overflow-y-auto"
          dir={isRTL ? "rtl" : "ltr"}
          onClick={() => {
            editor?.chain().focus().run();
            // Show keyboard on mobile when clicking editor area
            if (typeof window !== "undefined" && window.innerWidth < 768) {
              setKeyboardVisible(true);
            }
          }}
        >
          <EditorContent editor={editor} className="focus:outline-none" />

          {/* Bubble Menu */}
          {editor && (
            <BubbleMenu
              editor={editor}
              className="bg-background border border-border rounded-lg shadow-lg p-2 flex items-center gap-2 z-50"
            >
              {/* Font Color */}
              <div className="flex items-center gap-1">
                {mainColors.map((color) => (
                  <button
                    key={color.value}
                    className={`w-4 h-4 rounded border cursor-pointer hover:scale-110 transition-transform ${
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
                <Input
                  type="color"
                  value={isColorMixed ? "#808080" : currentColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-4 h-4 p-0 border rounded cursor-pointer"
                  title={
                    isColorMixed ? "Custom (Mixed colors selected)" : "Custom"
                  }
                  disabled={isColorMixed}
                />
              </div>
            </BubbleMenu>
          )}

          <style jsx global>{`
            .ProseMirror {
              line-height: 1.4 !important;
              font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "ccmp" 1,
                "locl" 1, "mark" 1, "mkmk" 1;
              font-variant-ligatures: common-ligatures contextual;
              text-rendering: optimizeLegibility;
              -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1,
                "ccmp" 1, "locl" 1, "mark" 1, "mkmk" 1;
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
              -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1,
                "ccmp" 1, "locl" 1, "mark" 1, "mkmk" 1;
              -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "ccmp" 1,
                "locl" 1, "mark" 1, "mkmk" 1;
            }

            .ProseMirror ::selection {
              background-color: #e5e7eb !important; /* Light gray */
            }

            .ProseMirror ::-moz-selection {
              background-color: #e5e7eb !important; /* Light gray for Firefox */
            }

            /* Ensure ligatures work for all Syriac fonts */
            [style*="font-family"] {
              font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "ccmp" 1,
                "locl" 1, "mark" 1, "mkmk" 1 !important;
              font-variant-ligatures: common-ligatures contextual !important;
              text-rendering: optimizeLegibility !important;
              -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1,
                "ccmp" 1, "locl" 1, "mark" 1, "mkmk" 1 !important;
              -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "ccmp" 1,
                "locl" 1, "mark" 1, "mkmk" 1 !important;
            }
          `}</style>
        </div>

        {/* Status Bar */}
        <div className="border-t border-border bg-muted/30 px-3 lg:px-6 xl:px-8 py-2">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>
                Built with ❤️ by{" "}
                <a
                  href="https://www.hendoacademy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:text-blue-800 dark:hover:text-blue-300 underline"
                >
                  Hendo Academy
                </a>
              </span>
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

      {/* Syriac Keyboard - Outside main container for proper floating */}
      <SyriacKeyboard
        isVisible={keyboardVisible}
        onToggle={handleKeyboardToggle}
        onCollapseChange={handleKeyboardCollapseChange}
        onKeyPress={handleKeyPress}
        onBackspace={handleKeyboardBackspace}
        onEnter={handleKeyboardEnter}
        onClear={handleKeyboardClear}
        onSpace={handleKeyboardSpace}
      />

      {/* Mobile keyboard spacer - prevents content from being hidden */}
      {keyboardVisible && <div className="h-80 md:hidden" aria-hidden="true" />}
    </>
  );
}
