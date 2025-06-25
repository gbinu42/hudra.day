import React, { useRef, useState } from "react";
import { Upload, X, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  selectedFile?: File | null;
  disabled?: boolean;
}

export function FileUpload({
  onFileSelect,
  accept = "image/*",
  maxSize = 10,
  className,
  selectedFile,
  disabled = false,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file type
    if (accept && !file.type.match(accept.replace("*", ".*"))) {
      return "Invalid file type. Please select an image file.";
    }

    // Check file size
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return `File too large. Maximum size is ${maxSize}MB.`;
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setError("");
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer",
          {
            "border-primary bg-primary/5": isDragOver && !disabled,
            "border-gray-300 hover:border-gray-400":
              !isDragOver && !disabled && !selectedFile,
            "border-green-500 bg-green-50": selectedFile && !disabled,
            "border-gray-200 bg-gray-50 cursor-not-allowed": disabled,
            "border-red-500 bg-red-50": error,
          }
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />

        {selectedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileImage className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            {!disabled && (
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <Upload
              className={cn("mx-auto h-12 w-12 mb-4", {
                "text-gray-400": !disabled,
                "text-gray-300": disabled,
                "text-primary": isDragOver && !disabled,
              })}
            />
            <div className="space-y-2">
              <p
                className={cn("text-sm font-medium", {
                  "text-gray-900": !disabled,
                  "text-gray-500": disabled,
                })}
              >
                {isDragOver
                  ? "Drop file here"
                  : "Drop file here or click to browse"}
              </p>
              <p
                className={cn("text-xs", {
                  "text-gray-500": !disabled,
                  "text-gray-400": disabled,
                })}
              >
                Supports: Images up to {maxSize}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
