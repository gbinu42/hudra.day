"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Move, Minimize2, Maximize2, Trash2 } from "lucide-react";

interface SyriacKeyboardProps {
  isVisible: boolean;
  onToggle: () => void;
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onClear: () => void;
  onSpace: () => void;
  onCollapseChange?: (isCollapsed: boolean) => void;
}

// Helper function to detect touch devices
const isTouchDevice = () => {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error - msMaxTouchPoints exists in older browsers
    navigator.msMaxTouchPoints > 0
  );
};

// Helper function to create and play tap sound using Web Audio API
// This is fire-and-forget - it never blocks execution
const playTapSound = (() => {
  let audioContext: AudioContext | null = null;
  
  return () => {
    // Use requestAnimationFrame to defer audio to next frame (truly non-blocking)
    requestAnimationFrame(() => {
      try {
        if (!audioContext) {
          const AudioContextConstructor = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioContext = new AudioContextConstructor();
        }
        
        // Resume context if suspended (don't await - let it happen async)
        if (audioContext.state === "suspended") {
          audioContext.resume().catch(() => {/* ignore errors */});
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Create a short, pleasant tap sound
        oscillator.frequency.value = 800;
        oscillator.type = "sine";
        
        // Quick fade out
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
      } catch {
        // Silently fail
      }
    });
  };
})();

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
      display: "ܑ",
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
    { char: "ܲ", title: "U+0732 - SYRIAC PTHAHA DOTTED", display: "ܘܲ" },
    { char: "ܵ", title: "U+0735 - SYRIAC ZQAPHA DOTTED", display: "ܘܵ" },
    {
      char: "ܸ",
      title: "U+0738 - SYRIAC DOTTED ZLAMA HORIZONTAL",
      display: "ܘܸ",
    },
    { char: "ܹ", title: "U+0739 - SYRIAC DOTTED ZLAMA ANGULAR", display: "ܘܹ" },
    { char: "ܼ", title: "U+073C - SYRIAC HBASA-ESASA DOTTED", display: "ܘܼ" },
    { char: "ܿ", title: "U+073F - SYRIAC RWAHA", display: "ܘܿ" },
    { char: "̈", title: "U+0308 - COMBINING DIAERESIS (SYAME)", display: "ܘ̈" },
    { char: "̤", title: "U+0308 - COMBINING DIAERESIS BELOW", display: "ܘ̤" },
    { char: "݀", title: "U+0740 - SYRIAC FEMININE DOT", display: "ܘ݀" },
    { char: "݁", title: "U+0741 - SYRIAC QUSHAYA", display: "ܘ݁" },
    { char: "݂", title: "U+0742 - SYRIAC RUKKAKHA", display: "ܘ݂" },
    { char: "݇", title: "U+0747 - SYRIAC OBLIQUE LINE ABOVE", display: "ܘ݇" },
    { char: "݈", title: "U+0748 - SYRIAC OBLIQUE LINE BELOW", display: "ܘ݈" },
    { char: "̄", title: "U+0304 - COMBINING MACRON", display: "ܘ̄" },
    { char: "̱", title: "U+0331 - COMBINING MACRON BELOW", display: "ܘ̱" },
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
  onCollapseChange,
}: SyriacKeyboardProps) {
  const [isTouchScreen, setIsTouchScreen] = useState(false);
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

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchScreen(isTouchDevice());
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Only allow dragging on non-touch devices
      if (isTouchScreen) return;

      e.preventDefault();
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosX: position.x,
        startPosY: position.y,
      };
    },
    [position, isTouchScreen]
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

  // Set initial position on the right side for non-touch devices
  useEffect(() => {
    const updatePosition = () => {
      // Only set position for non-touch desktop devices
      if (!isTouchScreen) {
        setPosition({
          x: window.innerWidth - 340,
          y: 20,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => window.removeEventListener("resize", updatePosition);
  }, [isTouchScreen]);

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
  }) => {
    const handlePress = (e: React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // Insert character FIRST (synchronous)
      onKeyPress(char);
      // Play sound in background (fire-and-forget)
      playTapSound();
    };

    const handleMousePress = (e: React.MouseEvent) => {
      e.preventDefault();
      onKeyPress(char);
    };

    // Use plain button for touch devices to avoid extra styling
    if (isTouchScreen) {
      return (
        <button
          onTouchStart={handlePress}
          title={title}
          className={`
            h-8 text-2xl border border-gray-200 rounded-sm bg-white cursor-pointer
            flex items-center justify-center
            active:bg-gray-100
            ${isSpecial ? "text-sm bg-gray-100" : ""}
          `}
          style={{
            fontFamily: "Karshon, East Syriac Adiabene, East Syriac Malankara",
            padding: "1px 0",
            margin: 0,
            minWidth: 0,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {display || char}
        </button>
      );
    }

    return (
      <Button
        variant="outline"
        size="sm"
        className="h-8 min-w-6 p-1 text-lg"
        onMouseDown={handleMousePress}
        title={title}
        style={{
          fontFamily: "Karshon, East Syriac Adiabene, East Syriac Malankara",
        }}
      >
        {display || char}
      </Button>
    );
  };

  return (
    <div
      data-keyboard="syriac"
      className={`
        fixed z-[9999] bg-card border border-border shadow-lg select-none
        ${!isTouchScreen ? "rounded-lg max-w-80" : "bottom-0 left-0 right-0 w-full rounded-t-lg rounded-b-none border-b-0"}
      `}
      style={{
        // Desktop positioning for non-touch devices
        ...(!isTouchScreen && {
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "320px",
        }),
        ...(isTouchScreen && {
          maxWidth: "100vw",
          overflow: "visible", // Changed from hidden to visible
          boxSizing: "border-box",
        }),
      }}
    >
      {/* Header - Hidden on touch devices */}
      {!isTouchScreen && (
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
              onMouseDown={(e) => {
                e.stopPropagation(); // Prevent drag on collapse button
                e.preventDefault();
                const newCollapsed = !isCollapsed;
                setIsCollapsed(newCollapsed);
                onCollapseChange?.(newCollapsed);
              }}
              title={isCollapsed ? "Expand" : "Collapse"}
            >
              {isCollapsed ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onMouseDown={(e) => {
                e.stopPropagation(); // Prevent drag on close button
                e.preventDefault();
                onToggle();
              }}
              title="Hide Keyboard"
            >
              <X size={12} />
            </Button>
          </div>
        </div>
      )}

      {/* Touch Device Collapse Button - Positioned above keyboard on the left */}
      {isTouchScreen && (
        <button
          className="absolute -top-7 left-4 w-12 h-7 text-lg font-bold bg-gradient-to-b from-white to-gray-100 border border-gray-400 rounded-t-full shadow-lg z-[10000] flex items-center justify-center"
          onTouchStart={(e) => {
            e.preventDefault();
            const newCollapsed = !isCollapsed;
            setIsCollapsed(newCollapsed);
            onCollapseChange?.(newCollapsed);
            playTapSound();
          }}
          style={{ lineHeight: "20px", pointerEvents: "auto" }}
        >
          {isCollapsed ? "▲" : "▼"}
        </button>
      )}

      {/* Keyboard Content */}
      {!isCollapsed && (
        <div
          className={`
            ${isTouchScreen ? "px-0.5 py-1 pb-1 max-h-none" : "p-3 max-h-[500px] overflow-y-auto"}
          `}
          dir="rtl"
          style={isTouchScreen ? { boxSizing: "border-box" } : undefined}
        >
          {showNumbers ? (
            /* Numbers and Punctuation */
            <div className={isTouchScreen ? "space-y-1" : "space-y-3"}>
              <div>
                {!isTouchScreen && (
                  <div
                    className="text-xs font-medium mb-1 text-muted-foreground"
                    dir="ltr"
                  >
                    Numbers
                  </div>
                )}
                <div
                  className={`grid grid-cols-5 ${isTouchScreen ? "gap-[1px] mb-1" : "gap-1"}`}
                  dir="rtl"
                >
                  {keyboardData.numbers.map((key, idx) => (
                    <KeyButton key={idx} char={key.char} title={key.title} />
                  ))}
                </div>
              </div>
              <div>
                {!isTouchScreen && (
                  <div
                    className="text-xs font-medium mb-1 text-muted-foreground"
                    dir="ltr"
                  >
                    Punctuation and Marks
                  </div>
                )}
                <div
                  className={`grid ${isTouchScreen ? "grid-cols-5 gap-px mb-1" : "grid-cols-6 gap-1"}`}
                  dir="rtl"
                >
                  {keyboardData.punctuation.map((key, idx) => (
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
            <div className={isTouchScreen ? "space-y-1" : "space-y-3"}>
              <div>
                {!isTouchScreen && (
                  <div
                    className="text-xs font-medium mb-1 text-muted-foreground"
                    dir="ltr"
                  >
                    Basic Letters
                  </div>
                )}
                <div
                  className={`grid grid-cols-8 ${isTouchScreen ? "gap-[1px] mb-1" : "gap-1"}`}
                  dir="rtl"
                >
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
                {!isTouchScreen && (
                  <div
                    className="text-xs font-medium mb-1 text-muted-foreground"
                    dir="ltr"
                  >
                    Supplement
                  </div>
                )}
                <div
                  className={`grid grid-cols-8 ${isTouchScreen ? "gap-[1px] mb-1" : "gap-1"}`}
                  dir="rtl"
                >
                  {keyboardData.supplement.map((key, idx) => (
                    <KeyButton key={idx} char={key.char} title={key.title} />
                  ))}
                </div>
              </div>

              <div>
                {!isTouchScreen && (
                  <div
                    className="text-xs font-medium mb-1 text-muted-foreground"
                    dir="ltr"
                  >
                    Vowels & Diacritics
                  </div>
                )}
                <div
                  className={`grid grid-cols-6 ${isTouchScreen ? "gap-[1px] mb-1" : "gap-1"}`}
                  dir="rtl"
                >
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
          <div className={`border-t border-border ${isTouchScreen ? "mt-1 pt-1" : "mt-3 pt-3"}`}>
            <div
              className={`${isTouchScreen ? "flex justify-between gap-[1px]" : "grid grid-cols-5 gap-1"}`}
              dir="ltr"
            >
              {/* Keep special keys LTR for clarity */}
              {isTouchScreen ? (
                <>
                  {/* ABC/123 Toggle */}
                  <button
                    onTouchStart={(e) => {
                      e.preventDefault();
                      setShowNumbers(!showNumbers);
                      playTapSound();
                    }}
                    className="h-8 w-10 text-xs border border-gray-200 rounded-sm bg-white flex items-center justify-center active:bg-gray-100"
                    style={{ padding: 0, margin: 0, minWidth: 0, boxSizing: "border-box" }}
                  >
                    {showNumbers ? "ABC" : "123"}
                  </button>

                  <button
                    onTouchStart={(e) => {
                      e.preventDefault();
                      onSpace();
                      playTapSound();
                    }}
                    className="h-8 flex-1 text-xs border border-gray-200 rounded-sm bg-white flex items-center justify-center active:bg-gray-100"
                    style={{ padding: 0, margin: 0, minWidth: 0, boxSizing: "border-box" }}
                    title="Space"
                  >
                    Space
                  </button>

                  <button
                    onTouchStart={(e) => {
                      e.preventDefault();
                      onEnter();
                      playTapSound();
                    }}
                    className="h-8 w-10 text-sm border border-gray-200 rounded-sm bg-white flex items-center justify-center active:bg-gray-100"
                    style={{ padding: 0, margin: 0, minWidth: 0, boxSizing: "border-box" }}
                    title="Enter"
                  >
                    ↵
                  </button>

                  <button
                    onTouchStart={(e) => {
                      e.preventDefault();
                      onBackspace();
                      playTapSound();
                    }}
                    className="h-8 w-10 text-sm border border-gray-200 rounded-sm bg-white flex items-center justify-center active:bg-gray-100"
                    style={{ padding: 0, margin: 0, minWidth: 0, boxSizing: "border-box" }}
                    title="Backspace"
                  >
                    ⌫
                  </button>

                  <button
                    onTouchStart={(e) => {
                      e.preventDefault();
                      onClear();
                      playTapSound();
                    }}
                    className="h-8 w-10 text-xs border border-red-200 rounded-sm bg-red-50 flex items-center justify-center active:bg-red-100"
                    style={{ padding: 0, margin: 0, minWidth: 0, boxSizing: "border-box" }}
                    title="Clear All"
                  >
                    <Trash2 size={14} />
                  </button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setShowNumbers(!showNumbers);
                    }}
                    className="h-8 text-xs px-2"
                  >
                    {showNumbers ? "ABC" : "123"}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs px-2"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onSpace();
                    }}
                    title="Space"
                  >
                    Space
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs px-2"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onEnter();
                    }}
                    title="Enter"
                  >
                    ↵
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs px-2"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onBackspace();
                    }}
                    title="Backspace"
                  >
                    ⌫
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8 text-xs px-2"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onClear();
                    }}
                    title="Clear All"
                  >
                    <Trash2 size={16} />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
