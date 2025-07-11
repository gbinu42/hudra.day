import React, { useState, useCallback, useEffect } from "react";

interface TooltipState {
  isVisible: boolean;
  content: string;
  x: number;
  y: number;
  loading: boolean;
  word: string;
}

interface SedraDialogProps {
  language: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function SedraDialog({
  language,
  containerRef,
}: SedraDialogProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    isVisible: false,
    content: "",
    x: 0,
    y: 0,
    loading: false,
    word: "",
  });

  // Check if language is Syriac
  const isSyriacLanguage = (lang: string): boolean => {
    return lang.toLowerCase().trim().includes("syriac");
  };

  // Function to wrap Syriac characters with styling
  const wrapSyriacText = (html: string): string => {
    // Syriac Unicode ranges: U+0700-U+074F, U+0750-U+077F (Arabic Supplement with Syriac)
    const syriacRegex = /([\u0700-\u074F\u0750-\u077F]+)/g;

    return html.replace(syriacRegex, (match) => {
      return `<span class="syriac-text">${match}</span>`;
    });
  };

  // Function to convert URLs to clickable links and process existing links
  const convertUrlsToLinks = useCallback((html: string): string => {
    // First, process existing anchor tags to ensure they open in new tabs
    html = html.replace(/<a([^>]*?)>/gi, (_, attributes) => {
      // Add target="_blank" and rel="noopener noreferrer" if not already present
      const hasTarget = /target\s*=/i.test(attributes);
      const hasRel = /rel\s*=/i.test(attributes);

      let updatedAttributes = attributes;
      if (!hasTarget) {
        updatedAttributes += ' target="_blank"';
      }
      if (!hasRel) {
        updatedAttributes += ' rel="noopener noreferrer"';
      }

      return `<a${updatedAttributes}>`;
    });

    // Then convert bare URLs to links if no anchor tags exist
    if (!html.includes("<a") && !html.includes("</a>")) {
      const urlRegex = /(^|[^"'>])(https?:\/\/[^\s<>"']+)/gi;
      html = html.replace(urlRegex, (_, prefix, url) => {
        return `${prefix}<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline; font-weight: normal; word-break: break-all;">${url}</a>`;
      });
    }

    // Apply Syriac text wrapping
    html = wrapSyriacText(html);

    return html;
  }, []);

  // Function to query Sedra API
  const queryWordAPI = useCallback(
    async (word: string): Promise<string> => {
      try {
        // URL encode the word for the API
        const encodedWord = encodeURIComponent(word);
        const response = await fetch(
          `https://sedra.bethmardutho.org/api/word/${encodedWord}.html`
        );

        if (!response.ok) {
          if (response.status === 404) {
            return `<div style="color: red;">Word not found</div>`;
          }
          throw new Error(`API request failed: ${response.status}`);
        }

        const htmlContent = await response.text();
        return convertUrlsToLinks(htmlContent);
      } catch (error) {
        console.error("Error querying Sedra API:", error);
        return `<div style="color: red;">Error loading word information</div>`;
      }
    },
    [convertUrlsToLinks]
  );

  // Function to handle word click
  const handleWordClick = useCallback(
    async (event: Event) => {
      if (!isSyriacLanguage(language)) {
        return;
      }

      const mouseEvent = event as MouseEvent;
      const target = mouseEvent.target as HTMLElement;

      // Get the clicked word using a more precise method
      let clickedWord = "";

      // Method 1: Try to get selected text first
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        clickedWord = selection.toString().trim();
      } else {
        // Method 2: Get word at click position using range and text node
        const range = document.caretRangeFromPoint(
          mouseEvent.clientX,
          mouseEvent.clientY
        );
        if (range && range.startContainer.nodeType === Node.TEXT_NODE) {
          const textNode = range.startContainer;
          const text = textNode.textContent || "";
          const offset = range.startOffset;

          // Find word boundaries around the click position
          let start = offset;
          let end = offset;

          // Move start backwards to find word beginning
          while (start > 0 && !/\s/.test(text[start - 1])) {
            start--;
          }

          // Move end forwards to find word ending
          while (end < text.length && !/\s/.test(text[end])) {
            end++;
          }

          clickedWord = text.substring(start, end).trim();
        }

        // Method 3: Fallback - split text and find word near click
        if (!clickedWord && target.textContent) {
          const rect = target.getBoundingClientRect();
          const clickX = mouseEvent.clientX - rect.left;
          const elementWidth = rect.width;
          const text = target.textContent;
          const words = text.split(/\s+/).filter((word) => word.trim());

          if (words.length > 0) {
            // Estimate which word was clicked based on position
            const wordIndex = Math.floor(
              (clickX / elementWidth) * words.length
            );
            clickedWord =
              words[Math.min(wordIndex, words.length - 1)] || words[0];
          }
        }
      }

      if (!clickedWord) {
        return;
      }

      // Clean the word (remove punctuation, etc.)
      clickedWord = clickedWord
        .replace(/[^\u0700-\u074F\u0750-\u077F\u0780-\u07BF]/g, "")
        .trim();

      if (!clickedWord) {
        return;
      }

      // Show loading tooltip
      setTooltip({
        isVisible: true,
        content: "",
        x: mouseEvent.clientX,
        y: mouseEvent.clientY,
        loading: true,
        word: clickedWord,
      });

      // Query the API
      const apiResponse = await queryWordAPI(clickedWord);

      // Update tooltip with response
      setTooltip({
        isVisible: true,
        content: apiResponse,
        x: mouseEvent.clientX,
        y: mouseEvent.clientY,
        loading: false,
        word: clickedWord,
      });
    },
    [language, queryWordAPI]
  );

  // Function to hide tooltip
  const hideTooltip = () => {
    setTooltip((prev) => ({ ...prev, isVisible: false, word: "" }));
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".sedra-dropdown")) {
        hideTooltip();
      }
    };

    if (tooltip.isVisible) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [tooltip.isVisible]);

  // Add click event listener for word lookup
  useEffect(() => {
    if (!containerRef.current || !isSyriacLanguage(language)) {
      return;
    }

    const containerElement = containerRef.current;

    // Try both ProseMirror element and container
    const proseMirrorElement = containerElement.querySelector(".ProseMirror");

    if (proseMirrorElement) {
      proseMirrorElement.addEventListener("click", handleWordClick);
    }

    // Also add to container as fallback
    containerElement.addEventListener("click", handleWordClick);

    return () => {
      if (proseMirrorElement) {
        proseMirrorElement.removeEventListener("click", handleWordClick);
      }
      containerElement.removeEventListener("click", handleWordClick);
    };
  }, [language, handleWordClick, containerRef]);

  return (
    <>
      {/* SEDRA Dialog */}
      {tooltip.isVisible && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={hideTooltip}
            style={{ direction: "ltr", textAlign: "left" }}
          />

          {/* Dialog */}
          <div
            className="fixed z-50 sedra-dropdown bg-white shadow-lg rounded-lg overflow-hidden"
            style={{
              top: Math.min(tooltip.y, window.innerHeight - 450),
              left: Math.min(tooltip.x, window.innerWidth - 450),
              width: "400px",
              maxWidth: "90vw",
              maxHeight: "500px",
              direction: "ltr",
              textAlign: "left",
            }}
          >
            {/* Close button */}
            <button
              onClick={hideTooltip}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 p-2  z-20 bg-white "
              title="Close"
              aria-label="Close dialog"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Sticky Title */}
            <div
              className="bg-white border-b border-gray-200 px-4 py-1"
              style={{ direction: "ltr", textAlign: "left" }}
            >
              <div
                className="flex items-center justify-start gap-3"
                style={{ direction: "ltr", textAlign: "left" }}
              >
                <a
                  href="https://sedra.bethmardutho.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors no-underline flex-shrink-0"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-semibold text-sm">SEDRA IV</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="opacity-50"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
                {tooltip.word && (
                  <a
                    href={`https://sedra.bethmardutho.org/api/word/${encodeURIComponent(
                      tooltip.word
                    )}.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" flex items-center gap-2 text-lg text-gray-800 hover:text-blue-600 transition-colors no-underline flex-shrink-0"
                    style={{
                      fontFamily: '"East Syriac Adiabene", Karshon, serif',
                      fontSize: "24px",
                      fontFeatureSettings:
                        '"liga" 1, "clig" 1, "calt" 1, "ccmp" 1, "locl" 1, "mark" 1, "mkmk" 1',
                      fontVariantLigatures: "common-ligatures contextual",
                      textRendering: "optimizeLegibility",
                    }}
                  >
                    {tooltip.word}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="opacity-50"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Scrollable Content */}
            <div
              className=" overflow-y-auto p-2"
              style={{
                maxHeight: `${Math.min(420, window.innerHeight - 76)}px`,
                direction: "ltr",
                textAlign: "left",
              }}
            >
              {tooltip.loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-300 border-t-slate-600"></div>
                    <span>Loading word information...</span>
                  </div>
                </div>
              ) : (
                <div
                  className="sedra-content"
                  style={{
                    direction: "ltr",
                    textAlign: "left",
                    overflowWrap: "break-word",
                    wordWrap: "break-word",
                    maxWidth: "100%",
                  }}
                  dangerouslySetInnerHTML={{ __html: tooltip.content }}
                />
              )}
            </div>
          </div>
        </>
      )}

      {/* Styles */}
      <style jsx global>{`
        /* Sedra Dropdown styles */
        .sedra-dropdown {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        }

        .sedra-content {
          color: inherit;
          font-size: 14px;
          line-height: 1.5;
          direction: ltr;
          overflow-x: hidden;
        }

        .sedra-content h1,
        .sedra-content h2,
        .sedra-content h3,
        .sedra-content h4,
        .sedra-content h5,
        .sedra-content h6 {
          color: #1e293b;
          font-weight: 600;
        }

        .sedra-content pre {
          white-space: pre-wrap;
          font-family: monospace;
          font-size: 12px;
          background: #f1f5f9;
          padding: 12px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          overflow-x: auto;
          max-width: 100%;
        }

        .sedra-content ol {
          list-style-type: decimal;
          list-style-position: outside;
          margin-left: 1.5em;
          padding-left: 0;
        }

        .sedra-content ul {
          list-style-type: disc;
          list-style-position: outside;
          margin-left: 1.5em;
          padding-left: 0;
        }

        .sedra-content li {
          margin-left: 0;
          padding-left: 0.5em;
        }

        /* Preserve indentation for nested elements */
        .sedra-content blockquote,
        .sedra-content .indent,
        .sedra-content [style*="margin-left"],
        .sedra-content [style*="padding-left"] {
          /* Allow original margin/padding to be preserved */
        }

        /* Ensure proper spacing for paragraphs */
        .sedra-content p {
          margin: 0.5em 0;
        }

        /* Add indentation for definition descriptions */
        .sedra-content dd {
          margin-left: 2em;
          margin-bottom: 0.5em;
        }

        /* Ensure proper spacing for definition terms */
        .sedra-content dt {
          font-weight: 600;
          margin-top: 0.5em;
          margin-bottom: 0.25em;
        }

        /* Style for Syriac text only */
        .sedra-content .syriac-text {
          font-family: "East Syriac Adiabene", Karshon, serif;
          font-size: 24px;
          font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "ccmp" 1,
            "locl" 1, "mark" 1, "mkmk" 1;
          font-variant-ligatures: common-ligatures contextual;
          text-rendering: optimizeLegibility;
          -webkit-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "ccmp" 1,
            "locl" 1, "mark" 1, "mkmk" 1;
          -moz-font-feature-settings: "liga" 1, "clig" 1, "calt" 1, "ccmp" 1,
            "locl" 1, "mark" 1, "mkmk" 1;
        }

        .sedra-content a {
          color: #2563eb;
          text-decoration: underline;
          font-weight: normal;
          font-size: 14px;
        }

        .sedra-content a:hover {
          color: #1d4ed8;
          text-decoration: none;
        }

        .sedra-content strong,
        .sedra-content b {
          font-weight: 600;
          color: #1e293b;
        }

        .sedra-content em,
        .sedra-content i {
          font-style: italic;
        }

        .sedra-content table {
          border-collapse: collapse;
          max-width: 100%;
        }

        .sedra-content td,
        .sedra-content th {
          padding: 8px;
          border: 1px solid #e2e8f0;
        }
      `}</style>
    </>
  );
}
