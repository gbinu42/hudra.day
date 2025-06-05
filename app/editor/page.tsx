"use client";

import React, { useState, useRef, useEffect } from "react";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

interface KeyboardKey {
  syriac: string;
  title: string;
  unicode?: string;
}

interface KeyboardSection {
  title: string;
  keys: KeyboardKey[];
}

// Keyboard data
const keyboardSections: KeyboardSection[] = [
  {
    title: "Main Letters",
    keys: [
      { syriac: "ܐ", title: "U+0710 - SYRIAC LETTER ALAPH" },
      { syriac: "ܒ", title: "U+0712 - SYRIAC LETTER BETH" },
      { syriac: "ܓ", title: "U+0713 - SYRIAC LETTER GAMAL" },
      { syriac: "ܕ", title: "U+0715 - SYRIAC LETTER DALATH" },
      { syriac: "ܗ", title: "U+0717 - SYRIAC LETTER HE" },
      { syriac: "ܘ", title: "U+0718 - SYRIAC LETTER WAW" },
      { syriac: "ܙ", title: "U+0719 - SYRIAC LETTER ZAIN" },
      { syriac: "ܚ", title: "U+071A - SYRIAC LETTER HETH" },
      { syriac: "ܛ", title: "U+071B - SYRIAC LETTER TETH" },
      { syriac: "ܝ", title: "U+071D - SYRIAC LETTER YUDH" },
      { syriac: "ܟ", title: "U+071F - SYRIAC LETTER KAPH" },
      { syriac: "ܠ", title: "U+0720 - SYRIAC LETTER LAMADH" },
      { syriac: "ܡ", title: "U+0721 - SYRIAC LETTER MIM" },
      { syriac: "ܢ", title: "U+0722 - SYRIAC LETTER NUN" },
      { syriac: "ܣ", title: "U+0723 - SYRIAC LETTER SEMKATH" },
      { syriac: "ܥ", title: "U+0725 - SYRIAC LETTER E" },
      { syriac: "ܦ", title: "U+0726 - SYRIAC LETTER PE" },
      { syriac: "ܨ", title: "U+0728 - SYRIAC LETTER SADHE" },
      { syriac: "ܩ", title: "U+0729 - SYRIAC LETTER QAPH" },
      { syriac: "ܪ", title: "U+072A - SYRIAC LETTER RISH" },
      { syriac: "ܫ", title: "U+072B - SYRIAC LETTER SHIN" },
      { syriac: "ܬ", title: "U+072C - SYRIAC LETTER TAW" },
      { syriac: "ܑ", title: "U+0711 - SYRIAC LETTER SUPERSCRIPT ALAPH" },
      { syriac: "ܞ", title: "U+071E - SYRIAC LETTER YUDH HE" },
    ],
  },
  {
    title: "Syriac Supplement",
    keys: [
      { syriac: "ࡠ", title: "U+0860 - SYRIAC LETTER MALAYALAM NGA" },
      { syriac: "ࡡ", title: "U+0861 - SYRIAC LETTER MALAYALAM JA" },
      { syriac: "ࡢ", title: "U+0862 - SYRIAC LETTER MALAYALAM NYA" },
      { syriac: "ࡣ", title: "U+0863 - SYRIAC LETTER MALAYALAM TTA" },
      { syriac: "ࡤ", title: "U+0864 - SYRIAC LETTER MALAYALAM NNA" },
      { syriac: "ࡥ", title: "U+0865 - SYRIAC LETTER MALAYALAM NNNA" },
      { syriac: "ࡦ", title: "U+0866 - SYRIAC LETTER MALAYALAM BHA" },
      { syriac: "ࡧ", title: "U+0867 - SYRIAC LETTER MALAYALAM RA" },
      { syriac: "ࡨ", title: "U+0868 - SYRIAC LETTER MALAYALAM LLA" },
      { syriac: "ࡩ", title: "U+0869 - SYRIAC LETTER MALAYALAM LLLA" },
      { syriac: "ࡪ", title: "U+086A - SYRIAC LETTER MALAYALAM SSA" },
    ],
  },
  {
    title: "Vowels and Diacritics",
    keys: [
      { syriac: "ܲ", title: "U+0732 - SYRIAC PTHAHA DOTTED" },
      { syriac: "ܵ", title: "U+0735 - SYRIAC ZQAPHA DOTTED" },
      { syriac: "ܸ", title: "U+0738 - SYRIAC DOTTED ZLAMA HORIZONTAL" },
      { syriac: "ܹ", title: "U+0739 - SYRIAC DOTTED ZLAMA ANGULAR" },
      { syriac: "ܼ", title: "U+073C - SYRIAC HBASA-ESASA DOTTED" },
      { syriac: "ܿ", title: "U+073F - SYRIAC RWAHA" },
      { syriac: "̈", title: "U+0308 - COMBINING DIAERESIS (SYAME)" },
      { syriac: "݀", title: "U+0740 - SYRIAC FEMININE DOT" },
      { syriac: "݁", title: "U+0741 - SYRIAC QUSHAYA" },
      { syriac: "݂", title: "U+0742 - SYRIAC RUKKAKHA" },
      { syriac: "݇", title: "U+0747 - SYRIAC OBLIQUE LINE ABOVE" },
      { syriac: "݈", title: "U+0748 - SYRIAC OBLIQUE LINE BELOW" },
      { syriac: "̄", title: "U+0304 - COMBINING MACRON" },
      { syriac: "̱", title: "U+0331 - COMBINING MACRON BELOW" },
      { syriac: "ـ", title: "U+0640 - ARABIC TATWEEL (EXTENSION)" },
      { syriac: "̇", title: "U+0307 - COMBINING DOT ABOVE" },
      { syriac: "̣", title: "U+0323 - COMBINING DOT BELOW" },
      { syriac: "̮", title: "U+032E - COMBINING BREVE BELOW" },
    ],
  },
  {
    title: "Punctuation and Marks",
    keys: [
      { syriac: "؟", title: "U+061F - ARABIC QUESTION MARK" },
      { syriac: "؛", title: "U+061B - ARABIC SEMICOLON" },
      { syriac: "،", title: "U+060C - ARABIC COMMA" },
      { syriac: "܀", title: "U+0700 - SYRIAC END OF PARAGRAPH" },
      { syriac: "܁", title: "U+0701 - SYRIAC SUPRALINEAR FULL STOP" },
      { syriac: "܂", title: "U+0702 - SYRIAC SUBLINEAR FULL STOP" },
      { syriac: "܃", title: "U+0703 - SYRIAC SUPRALINEAR COLON" },
      { syriac: "܄", title: "U+0704 - SYRIAC SUBLINEAR COLON" },
      { syriac: ".", title: "U+002E - FULL STOP" },
      { syriac: ":", title: "U+003A - COLON" },
      { syriac: "[", title: "U+005B - LEFT SQUARE BRACKET" },
      { syriac: "]", title: "U+005D - RIGHT SQUARE BRACKET" },
      { syriac: "!", title: "U+0021 - EXCLAMATION MARK" },
      { syriac: "(", title: "U+0028 - LEFT PARENTHESIS" },
      { syriac: ")", title: "U+0029 - RIGHT PARENTHESIS" },
      { syriac: "♱", title: "U+2671 - EAST SYRIAC CROSS" },
      { syriac: "‌", title: "U+200C - ZERO WIDTH NON-JOINER" },
      { syriac: "‍", title: "U+200D - ZERO WIDTH JOINER" },
    ],
  },
  {
    title: "Numbers",
    keys: [
      { syriac: "0", title: "Number 0" },
      { syriac: "1", title: "Number 1" },
      { syriac: "2", title: "Number 2" },
      { syriac: "3", title: "Number 3" },
      { syriac: "4", title: "Number 4" },
      { syriac: "5", title: "Number 5" },
      { syriac: "6", title: "Number 6" },
      { syriac: "7", title: "Number 7" },
      { syriac: "8", title: "Number 8" },
      { syriac: "9", title: "Number 9" },
    ],
  },
];

const fontOptions = [
  { value: "Karshon", label: "East Syriac Adiabene" },
  { value: "EastSyriacMalankara", label: "East Syriac Malankara" },
  {
    value: "EastSyriacMalankaraClassical",
    label: "East Syriac Malankara Classical",
  },
];

const SyriacEditor: React.FC = () => {
  // State management
  const [text, setText] = useState("");
  const [currentFont, setCurrentFont] = useState("Karshon");
  const [lineHeight, setLineHeight] = useState(1.5);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [keyboardCollapsed, setKeyboardCollapsed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Touch device detection
  useEffect(() => {
    const detectTouchDevice = () => {
      // Check for mobile user agents
      if (
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      }

      // Additional touch detection
      if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
        return true;
      }

      // Media query checks
      if (
        window.matchMedia &&
        (window.matchMedia("(hover: none)").matches ||
          window.matchMedia("(pointer: coarse)").matches)
      ) {
        return true;
      }

      // For smaller screens, default to touch mode
      if (window.innerWidth < 768) {
        return true;
      }

      return false;
    };

    const isTouch = detectTouchDevice();
    setIsTouchDevice(isTouch);

    // Auto-show keyboard on mobile
    if (isTouch) {
      setShowKeyboard(true);
    }
  }, []);

  // Handle keyboard key press
  const handleKeyPress = (key: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = text.substring(0, start) + key + text.substring(end);

    setText(newText);

    // Set cursor position after the inserted character
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + key.length;
      textarea.focus();
    }, 0);
  };

  // Handle backspace
  const handleBackspace = () => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end && start > 0) {
      // Delete one character before cursor
      const newText = text.substring(0, start - 1) + text.substring(start);
      setText(newText);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start - 1;
        textarea.focus();
      }, 0);
    } else if (start !== end) {
      // Delete selected text
      const newText = text.substring(0, start) + text.substring(end);
      setText(newText);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start;
        textarea.focus();
      }, 0);
    }
  };

  // Handle clear
  const handleClear = () => {
    setText("");
    textareaRef.current?.focus();
  };

  // Handle enter
  const handleEnter = () => {
    handleKeyPress("\n");
  };

  // Handle space
  const handleSpace = () => {
    handleKeyPress(" ");
  };

  return (
    <div
      className={`${
        isTouchDevice
          ? "p-0 m-0 bg-white min-h-screen"
          : "min-h-screen bg-gray-50 p-4"
      }`}
    >
      <div
        className={`${
          isTouchDevice ? "h-screen flex flex-col" : "max-w-4xl mx-auto"
        }`}
      >
        {/* Main Editor */}
        <div
          className={`${
            isTouchDevice
              ? "flex-1 relative"
              : "bg-white rounded-lg shadow-md mb-6 relative"
          }`}
        >
          <div className="relative h-full">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your East Syriac text here..."
              className={`w-full p-4 border-2 border-gray-300 focus:outline-none focus:border-red-600 ${
                isTouchDevice
                  ? "h-full border-0 border-b border-gray-300 rounded-none resize-none"
                  : "min-h-[300px] rounded-lg resize-y"
              }`}
              style={{
                fontSize: "36px",
                color: "#000000",
                fontFamily: currentFont,
                lineHeight: lineHeight,
                direction: "rtl",
                textAlign: "right",
                textRendering: "optimizeLegibility",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
              spellCheck={false}
            />

            {/* Action Buttons - Only show on desktop */}
            {!isTouchDevice && (
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button
                  onClick={() => setShowKeyboard(!showKeyboard)}
                  className={`p-2 rounded-lg transition-colors ${
                    showKeyboard
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-gray-600 text-white hover:bg-gray-700"
                  }`}
                  title="Toggle Keyboard"
                >
                  ⌨️
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  title="Settings"
                >
                  <Settings size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* On-Screen Keyboard */}
        {showKeyboard && (
          <div
            className={`${
              isTouchDevice
                ? `fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-50 ${
                    keyboardCollapsed
                      ? "transform translate-y-[calc(100%-40px)]"
                      : ""
                  }`
                : "bg-white rounded-lg shadow-md mb-6"
            } transition-transform duration-300`}
          >
            {/* Mobile Collapse Button */}
            {isTouchDevice && (
              <button
                onClick={() => setKeyboardCollapsed(!keyboardCollapsed)}
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gradient-to-b from-white to-gray-100 border border-gray-300 rounded-t-full text-sm font-bold text-gray-700 shadow-md z-10"
              >
                {keyboardCollapsed ? "▲" : "▼"}
              </button>
            )}

            <div className="p-2">
              {/* Desktop Keyboard Header */}
              {!isTouchDevice && (
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Syriac Keyboard</h3>
                  <button
                    onClick={() => setKeyboardCollapsed(!keyboardCollapsed)}
                    className="p-1 text-gray-600 hover:text-gray-800"
                  >
                    {keyboardCollapsed ? "▲" : "▼"}
                  </button>
                </div>
              )}

              {!keyboardCollapsed && (
                <div className="space-y-4">
                  {keyboardSections.map((section, sectionIndex) => {
                    // Hide punctuation section on mobile (like original)
                    if (
                      isTouchDevice &&
                      section.title === "Punctuation and Marks"
                    ) {
                      return null;
                    }

                    return (
                      <div
                        key={sectionIndex}
                        className="keyboard-section -mb-3"
                      >
                        {/* Hide section titles on mobile */}
                        {!isTouchDevice && (
                          <div className="text-xs text-gray-600 mb-1">
                            {section.title}
                          </div>
                        )}
                        <div
                          className={`grid grid-cols-10 gap-0.5 mb-0.5 ${
                            isTouchDevice ? "gap-0.5" : "gap-0.5"
                          }`}
                          style={{ direction: "rtl" }}
                        >
                          {section.keys.map((key, keyIndex) => (
                            <button
                              key={keyIndex}
                              onClick={() => handleKeyPress(key.syriac)}
                              className={`border border-gray-300 rounded bg-white hover:bg-gray-100 text-center flex items-center justify-center transition-colors ${
                                isTouchDevice
                                  ? "px-1 py-1 min-h-[24px]"
                                  : "px-0.5 py-1 min-h-[28px]"
                              }`}
                              style={{
                                fontFamily: currentFont,
                                fontSize: isTouchDevice ? "1.6rem" : "1.5rem",
                                direction: "ltr",
                              }}
                              title={key.title}
                            >
                              {key.syriac}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Special Keys */}
                  <div className="flex justify-between gap-1 mt-6">
                    <button
                      onClick={handleClear}
                      className={`bg-red-100 text-red-800 border border-red-300 rounded hover:bg-red-200 transition-colors text-sm ${
                        isTouchDevice ? "px-2 py-2" : "px-3 py-2"
                      }`}
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleSpace}
                      className={`flex-1 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors text-sm ${
                        isTouchDevice ? "px-2 py-2" : "px-3 py-2"
                      }`}
                    >
                      Space
                    </button>
                    <button
                      onClick={handleBackspace}
                      className={`bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors text-sm ${
                        isTouchDevice ? "px-2 py-2" : "px-3 py-2"
                      }`}
                    >
                      ⌫
                    </button>
                    <button
                      onClick={handleEnter}
                      className={`bg-green-100 text-green-800 border border-green-300 rounded hover:bg-green-200 transition-colors text-sm ${
                        isTouchDevice ? "px-2 py-2" : "px-3 py-2"
                      }`}
                    >
                      Enter
                    </button>
                    {/* Settings button for mobile */}
                    {isTouchDevice && (
                      <button
                        onClick={() => setShowSettings(true)}
                        className="px-2 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors"
                        title="Settings"
                      >
                        <Settings size={16} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Modal */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-red-600">Settings</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Font Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Syriac Font:
                </label>
                <Select value={currentFont} onValueChange={setCurrentFont}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Line Height */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Line Height:
                </label>
                <Select
                  value={lineHeight.toString()}
                  onValueChange={(value) => setLineHeight(parseFloat(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select line height" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Single (1.0)</SelectItem>
                    <SelectItem value="1.15">1.15</SelectItem>
                    <SelectItem value="1.5">1.5</SelectItem>
                    <SelectItem value="2">Double (2.0)</SelectItem>
                    <SelectItem value="2.5">2.5</SelectItem>
                    <SelectItem value="3">Triple (3.0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowSettings(false)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Footer - Only show on desktop */}
      {!isTouchDevice && <Footer />}

      {/* Font face definitions */}
      <style jsx>{`
        @font-face {
          font-family: "Karshon";
          src: url("/fonts/Karshon.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "EastSyriacMalankara";
          src: url("/fonts/EastSyriacMalankara.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "EastSyriacMalankaraClassical";
          src: url("/fonts/EastSyriacMalankaraClassical.ttf") format("truetype");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
    </div>
  );
};

export default SyriacEditor;
