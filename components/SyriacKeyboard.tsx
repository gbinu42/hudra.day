"use client";

import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, Move, Minimize2, Maximize2, Keyboard } from "lucide-react";

interface SyriacKeyboardProps {
  isVisible: boolean;
  onToggle: () => void;
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onClear: () => void;
  onSpace: () => void;
}

const keyboardData = {
  basicLetters: [
    { char: "ܐ", title: "U+0710 - SYRIAC LETTER ALAPH" },
    { char: "ܒ", title: "U+0712 - SYRIAC LETTER BETH" },
    { char: "ܓ", title: "U+0713 - SYRIAC LETTER GAMAL" },
    { char: "ܕ", title: "U+0715 - SYRIAC LETTER DALATH" },
    { char: "ܗ", title: "U+0717 - SYRIAC LETTER HE" },
    { char: "ܘ", title: "U+0718 - SYRIAC LETTER WAW" },
    { char: "ܙ", title: "U+0719 - SYRIAC LETTER ZAIN" },
    { char: "ܚ", title: "U+071A - SYRIAC LETTER HETH" },
    { char: "ܛ", title: "U+071B - SYRIAC LETTER TETH" },
    { char: "ܝ", title: "U+071D - SYRIAC LETTER YUDH" },
    { char: "ܟ", title: "U+071F - SYRIAC LETTER KAPH" },
    { char: "ܠ", title: "U+0720 - SYRIAC LETTER LAMADH" },
    { char: "ܡ", title: "U+0721 - SYRIAC LETTER MIM" },
    { char: "ܢ", title: "U+0722 - SYRIAC LETTER NUN" },
    { char: "ܣ", title: "U+0723 - SYRIAC LETTER SEMKATH" },
    { char: "ܥ", title: "U+0725 - SYRIAC LETTER E" },
    { char: "ܦ", title: "U+0726 - SYRIAC LETTER PE" },
    { char: "ܨ", title: "U+0728 - SYRIAC LETTER SADHE" },
    { char: "ܩ", title: "U+0729 - SYRIAC LETTER QAPH" },
    { char: "ܪ", title: "U+072A - SYRIAC LETTER RISH" },
    { char: "ܫ", title: "U+072B - SYRIAC LETTER SHIN" },
    { char: "ܬ", title: "U+072C - SYRIAC LETTER TAW" },
    {
      char: "ܑ",
      title: "U+0711 - SYRIAC LETTER SUPERSCRIPT ALAPH",
      display: "ܑ◌",
    },
    { char: "ܞ", title: "U+071E - SYRIAC LETTER YUDH HE" },
  ],
  supplement: [
    { char: "ࡠ", title: "U+0860 - SYRIAC LETTER MALAYALAM NGA" },
    { char: "ࡡ", title: "U+0861 - SYRIAC LETTER MALAYALAM JA" },
    { char: "ࡢ", title: "U+0862 - SYRIAC LETTER MALAYALAM NYA" },
    { char: "ࡣ", title: "U+0863 - SYRIAC LETTER MALAYALAM TTA" },
    { char: "ࡤ", title: "U+0864 - SYRIAC LETTER MALAYALAM NNA" },
    { char: "ࡥ", title: "U+0865 - SYRIAC LETTER MALAYALAM NNNA" },
    { char: "ࡦ", title: "U+0866 - SYRIAC LETTER MALAYALAM BHA" },
    { char: "ࡧ", title: "U+0867 - SYRIAC LETTER MALAYALAM RA" },
    { char: "ࡨ", title: "U+0868 - SYRIAC LETTER MALAYALAM LLA" },
    { char: "ࡩ", title: "U+0869 - SYRIAC LETTER MALAYALAM LLLA" },
    { char: "ࡪ", title: "U+086A - SYRIAC LETTER MALAYALAM SSA" },
  ],
  vowels: [
    { char: "ܲ", title: "U+0732 - SYRIAC PTHAHA DOTTED", display: "◌ܲ" },
    { char: "ܵ", title: "U+0735 - SYRIAC ZQAPHA DOTTED", display: "◌ܵ" },
    {
      char: "ܸ",
      title: "U+0738 - SYRIAC DOTTED ZLAMA HORIZONTAL",
      display: "◌ܸ",
    },
    { char: "ܹ", title: "U+0739 - SYRIAC DOTTED ZLAMA ANGULAR", display: "◌ܹ" },
    { char: "ܼ", title: "U+073C - SYRIAC HBASA-ESASA DOTTED", display: "◌ܼ" },
    { char: "ܿ", title: "U+073F - SYRIAC RWAHA", display: "◌ܿ" },
    { char: "̈", title: "U+0308 - COMBINING DIAERESIS (SYAME)" },
    { char: "݀", title: "U+0740 - SYRIAC FEMININE DOT", display: "◌݀" },
    { char: "݁", title: "U+0741 - SYRIAC QUSHAYA", display: "◌݁" },
    { char: "݂", title: "U+0742 - SYRIAC RUKKAKHA", display: "◌݂" },
    { char: "݇", title: "U+0747 - SYRIAC OBLIQUE LINE ABOVE", display: "◌݇" },
    { char: "݈", title: "U+0748 - SYRIAC OBLIQUE LINE BELOW", display: "◌݈" },
    { char: "̄", title: "U+0304 - COMBINING MACRON" },
    { char: "̱", title: "U+0331 - COMBINING MACRON BELOW" },
    { char: "ـ", title: "U+0640 - ARABIC TATWEEL (EXTENSION)" },
  ],
  punctuation: [
    { char: "܀", title: "U+0700 - SYRIAC END OF PARAGRAPH" },
    { char: ".", title: "U+002E - FULL STOP" },
    { char: ":", title: "U+003A - COLON" },
    { char: "[", title: "U+005B - LEFT SQUARE BRACKET" },
    { char: "]", title: "U+005D - RIGHT SQUARE BRACKET" },
    { char: "!", title: "U+0021 - EXCLAMATION MARK" },
    { char: "(", title: "U+0028 - LEFT PARENTHESIS" },
    { char: ")", title: "U+0029 - RIGHT PARENTHESIS" },
    { char: "؟", title: "U+061F - ARABIC QUESTION MARK" },
    { char: "♱", title: "U+2671 - EAST SYRIAC CROSS" },
    { char: "̇", title: "U+0307 - COMBINING DOT ABOVE" },
    { char: "̣", title: "U+0323 - COMBINING DOT BELOW" },
    { char: "̮", title: "U+032E - COMBINING BREVE BELOW" },
    { char: "‌", title: "U+200C - ZERO WIDTH NON-JOINER", display: "ZWNJ" },
    { char: "‍", title: "U+200D - ZERO WIDTH JOINER", display: "ZWJ" },
  ],
  numbers: [
    { char: "1", title: "DIGIT ONE" },
    { char: "2", title: "DIGIT TWO" },
    { char: "3", title: "DIGIT THREE" },
    { char: "4", title: "DIGIT FOUR" },
    { char: "5", title: "DIGIT FIVE" },
    { char: "6", title: "DIGIT SIX" },
    { char: "7", title: "DIGIT SEVEN" },
    { char: "8", title: "DIGIT EIGHT" },
    { char: "9", title: "DIGIT NINE" },
    { char: "0", title: "DIGIT ZERO" },
  ],
};

export default function SyriacKeyboard({
  isVisible,
  onToggle,
  onKeyPress,
  onBackspace,
  onEnter,
  onClear,
  onSpace,
}: SyriacKeyboardProps) {
  const [position, setPosition] = useState({
    x: typeof window !== "undefined" ? window.innerWidth - 340 : 20,
    y: 20,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startPosX: number;
    startPosY: number;
  } | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosX: position.x,
        startPosY: position.y,
      };
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !dragRef.current) return;

      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      setPosition({
        x: Math.max(
          0,
          Math.min(window.innerWidth - 320, dragRef.current.startPosX + deltaX)
        ),
        y: Math.max(
          0,
          Math.min(window.innerHeight - 200, dragRef.current.startPosY + deltaY)
        ),
      });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragRef.current = null;
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Set initial position on the right side
  React.useEffect(() => {
    const updatePosition = () => {
      setPosition({
        x: window.innerWidth - 340,
        y: 20,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  if (!isVisible) {
    return null;
  }

  const KeyButton = ({
    char,
    title,
    display,
    isSpecial = false,
  }: {
    char: string;
    title: string;
    display?: string;
    isSpecial?: boolean;
  }) => (
    <Button
      variant="outline"
      size="sm"
      className={`h-8 min-w-8 text-lg p-1 ${isSpecial ? "bg-muted" : ""}`}
      onClick={() => onKeyPress(char)}
      title={title}
      style={{
        fontFamily: "Karshon, East Syriac Adiabene, East Syriac Malankara",
      }}
    >
      {display || char}
    </Button>
  );

  return (
    <div
      className="fixed z-50 bg-card border border-border rounded-lg shadow-lg max-w-80 select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "320px",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-2 bg-muted/30 rounded-t-lg cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <Move size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">Syriac Keyboard</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={onToggle}
            title="Hide Keyboard"
          >
            <X size={12} />
          </Button>
        </div>
      </div>

      {/* Keyboard Content */}
      {!isCollapsed && (
        <div className="p-3 max-h-96 overflow-y-auto" dir="rtl">
          {/* Number/Letter Toggle */}
          <div className="flex gap-1 mb-3" dir="ltr">
            <Button
              variant={showNumbers ? "outline" : "default"}
              size="sm"
              onClick={() => setShowNumbers(false)}
              className="flex-1 h-7 text-xs"
            >
              ABC
            </Button>
            <Button
              variant={showNumbers ? "default" : "outline"}
              size="sm"
              onClick={() => setShowNumbers(true)}
              className="flex-1 h-7 text-xs"
            >
              123
            </Button>
          </div>

          {showNumbers ? (
            /* Numbers and Punctuation */
            <div className="space-y-3">
              <div>
                <div
                  className="text-xs font-medium mb-1 text-muted-foreground"
                  dir="ltr"
                >
                  Numbers
                </div>
                <div className="grid grid-cols-5 gap-1" dir="rtl">
                  {keyboardData.numbers.map((key, idx) => (
                    <KeyButton key={idx} char={key.char} title={key.title} />
                  ))}
                </div>
              </div>
              <div>
                <div
                  className="text-xs font-medium mb-1 text-muted-foreground"
                  dir="ltr"
                >
                  Punctuation
                </div>
                <div className="grid grid-cols-5 gap-1" dir="rtl">
                  {keyboardData.punctuation.slice(0, 15).map((key, idx) => (
                    <KeyButton
                      key={idx}
                      char={key.char}
                      title={key.title}
                      display={key.display}
                      isSpecial={Boolean(
                        key.display &&
                          (key.display === "ZWNJ" || key.display === "ZWJ")
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Letters and Diacritics */
            <div className="space-y-3">
              <div>
                <div
                  className="text-xs font-medium mb-1 text-muted-foreground"
                  dir="ltr"
                >
                  Basic Letters
                </div>
                <div className="grid grid-cols-6 gap-1" dir="rtl">
                  {keyboardData.basicLetters.map((key, idx) => (
                    <KeyButton
                      key={idx}
                      char={key.char}
                      title={key.title}
                      display={key.display}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div
                  className="text-xs font-medium mb-1 text-muted-foreground"
                  dir="ltr"
                >
                  Supplement
                </div>
                <div className="grid grid-cols-6 gap-1" dir="rtl">
                  {keyboardData.supplement.map((key, idx) => (
                    <KeyButton key={idx} char={key.char} title={key.title} />
                  ))}
                </div>
              </div>

              <div>
                <div
                  className="text-xs font-medium mb-1 text-muted-foreground"
                  dir="ltr"
                >
                  Vowels & Diacritics
                </div>
                <div className="grid grid-cols-5 gap-1" dir="rtl">
                  {keyboardData.vowels.map((key, idx) => (
                    <KeyButton
                      key={idx}
                      char={key.char}
                      title={key.title}
                      display={key.display}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Special Keys */}
          <div className="mt-3 pt-3 border-t border-border">
            <div className="grid grid-cols-4 gap-1" dir="ltr">
              {/* Keep special keys LTR for clarity */}
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={onSpace}
                title="Space"
              >
                Space
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={onEnter}
                title="Enter"
              >
                ↵
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={onBackspace}
                title="Backspace"
              >
                ⌫
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="h-8 text-xs"
                onClick={onClear}
                title="Clear All"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
