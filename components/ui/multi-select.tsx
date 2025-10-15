"use client";

import * as React from "react";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SimpleCombobox } from "@/components/ui/simple-combobox";

export interface MultiSelectOption {
  id?: string;
  name: string;
}

interface MultiSelectProps {
  options: Array<{ value: string; label: string }>;
  selected: MultiSelectOption[];
  onSelectionChange: (selected: MultiSelectOption[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  allowCustom?: boolean;
  customPlaceholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onSelectionChange,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  emptyMessage = "No items found.",
  allowCustom = false,
  customPlaceholder = "Add custom item...",
  className,
}: MultiSelectProps) {
  const [customInput, setCustomInput] = React.useState("");
  const [showCustomInput, setShowCustomInput] = React.useState(false);

  const handleSelect = (value: string) => {
    const option = options.find((opt) => opt.value === value);
    if (option && !selected.find((item) => item.id === value)) {
      const newSelection = [...selected, { id: value, name: option.label }];
      onSelectionChange(newSelection);
    }
  };

  const handleAddCustom = () => {
    if (
      customInput.trim() &&
      !selected.find((item) => item.name === customInput.trim())
    ) {
      onSelectionChange([...selected, { name: customInput.trim() }]);
      setCustomInput("");
      setShowCustomInput(false);
    }
  };

  const handleRemove = (index: number) => {
    const newSelected = selected.filter((_, i) => i !== index);
    onSelectionChange(newSelected);
  };

  const availableOptions = options.filter(
    (option) => !selected.find((item) => item.id === option.value)
  );

  return (
    <div className={className}>
      <div className="space-y-2">
        {/* Selected items */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selected.map((item, index) => (
              <Badge
                key={`${item.id || "custom"}-${index}`}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {item.name}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleRemove(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {/* Selection controls */}
        <div className="flex gap-2">
          {availableOptions.length > 0 && (
            <div className="flex-1">
              <SimpleCombobox
                options={availableOptions}
                value=""
                onValueChange={handleSelect}
                placeholder={placeholder}
                searchPlaceholder={searchPlaceholder}
                emptyMessage={emptyMessage}
              />
            </div>
          )}

          {allowCustom && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowCustomInput(!showCustomInput)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Custom input */}
        {allowCustom && showCustomInput && (
          <div className="flex gap-2">
            <Input
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder={customPlaceholder}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddCustom();
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddCustom}
              disabled={!customInput.trim()}
            >
              Add
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
