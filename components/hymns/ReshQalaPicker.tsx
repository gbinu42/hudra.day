"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { reshQalaService } from "@/lib/reshqala-services";
import {
  ReshQala,
  HymnReshQalaRef,
  getReshQalaDisplayName,
  getReshQalaDisplaySyriac,
} from "@/lib/types/reshQala";
import { getGenreLabel } from "@/lib/types/hymn";
import { normalizeSyriacForSearch } from "@/lib/utils/syriacText";

interface ReshQalaPickerProps {
  value: HymnReshQalaRef[];
  onChange: (refs: HymnReshQalaRef[]) => void;
}

// One selectable entry per *name* of a resh qala, so you can label a hymn by
// the exact name its text uses while still linking to the single identity.
interface ReshQalaNameOption {
  id: string; // reshQalaId (the identity)
  displayName: string; // canonical name of the identity
  displaySyriac?: string; // Syriac of the canonical/display name
  nameText: string; // this specific attested name
  syriac?: string; // Syriac form of this name, if any
  isCanonical: boolean;
  type?: string;
  haystack: string; // normalized (this name, both scripts), for matching
}

function newAssignmentId() {
  return `rq_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function refKey(ref: HymnReshQalaRef, index: number) {
  return ref.id || `${ref.reshQalaId}-${index}`;
}

export default function ReshQalaPicker({ value, onChange }: ReshQalaPickerProps) {
  const [reshQale, setReshQale] = useState<ReshQala[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = reshQalaService.onReshQaleSnapshot(
      (snapshot) => {
        const data = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as ReshQala
        );
        setReshQale(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading resh qale:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const options = useMemo<ReshQalaNameOption[]>(() => {
    const out: ReshQalaNameOption[] = [];
    for (const rq of reshQale) {
      if (rq.mergedInto) continue; // hide identities folded into another
      const displayName = getReshQalaDisplayName(rq);
      const displaySyriac = getReshQalaDisplaySyriac(rq);
      const names = rq.names?.length
        ? rq.names
        : [{ name: displayName, isCanonical: true }];
      for (const n of names) {
        if (!n.name) continue;
        out.push({
          id: rq.id,
          displayName,
          displaySyriac,
          nameText: n.name,
          syriac: n.syriac,
          isCanonical: !!n.isCanonical || n.name === displayName,
          type: rq.type,
          haystack: normalizeSyriacForSearch(
            [n.name, n.syriac].filter(Boolean).join(" ")
          ).toLowerCase(),
        });
      }
    }
    return out;
  }, [reshQale]);

  const filteredOptions = useMemo(() => {
    const term = normalizeSyriacForSearch(search).toLowerCase().trim();
    // Allow the same identity more than once (e.g. different parts of a hymn).
    return term
      ? options.filter((o) => o.haystack.includes(term))
      : options.filter((o) => o.isCanonical);
  }, [options, search]);

  const addRef = (option: ReshQalaNameOption) => {
    const ref: HymnReshQalaRef = {
      id: newAssignmentId(),
      reshQalaId: option.id,
      displayName: option.displayName,
      ...(option.displaySyriac ? { displaySyriac: option.displaySyriac } : {}),
    };
    // Record which name the source used when it isn't the canonical one.
    if (option.nameText && option.nameText !== option.displayName) {
      ref.nameAsGiven = option.nameText;
    }
    onChange([...value, ref]);
    setSearch("");
    // Keep the popover open so additional qale can be added for other parts.
  };

  const removeRef = (key: string) => {
    onChange(
      value.filter((v, i) => refKey(v, i) !== key)
    );
  };

  const updateRef = (
    key: string,
    field: keyof HymnReshQalaRef,
    fieldValue: string
  ) => {
    onChange(
      value.map((v, i) =>
        refKey(v, i) === key
          ? { ...v, [field]: fieldValue || undefined }
          : v
      )
    );
  };

  const updateRefSource = (
    key: string,
    field: "book" | "page",
    fieldValue: string
  ) => {
    onChange(
      value.map((v, i) => {
        if (refKey(v, i) !== key) return v;
        const source = { ...(v.source || { book: "" }) };
        source[field] = fieldValue;
        // Drop the source entirely if the book is empty
        if (!source.book && !source.page) {
          const { source: _drop, ...rest } = v;
          void _drop;
          return rest;
        }
        return { ...v, source };
      })
    );
  };

  return (
    <div className="space-y-3">
      {/* Selected resh qale */}
      {value.length > 0 && (
        <div className="space-y-3">
          {value.map((ref, index) => {
            const key = refKey(ref, index);
            const chosenName =
              ref.nameAsGiven || ref.displayName || ref.reshQalaId;
            const showCanonical =
              !!(
                ref.nameAsGiven &&
                ref.displayName &&
                ref.nameAsGiven !== ref.displayName
              );
            const syriac = ref.nameAsGiven
              ? reshQale
                  .find((rq) => rq.id === ref.reshQalaId)
                  ?.names?.find((n) => n.name === ref.nameAsGiven)?.syriac
              : ref.displaySyriac;
            return (
              <div key={key} className="rounded-md border p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="text-sm gap-1.5">
                    {chosenName}
                    {syriac && (
                      <span
                        className="font-east-syriac-adiabene text-base font-normal"
                        dir="rtl"
                      >
                        {syriac}
                      </span>
                    )}
                    {showCanonical && (
                      <span className="ml-0.5 font-normal text-muted-foreground">
                        ({ref.displayName})
                      </span>
                    )}
                  </Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRef(key)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                  <Input
                    value={ref.part || ""}
                    onChange={(e) => updateRef(key, "part", e.target.value)}
                    placeholder="Part / section (optional)"
                    className="text-sm"
                  />
                  <Input
                    value={ref.nameAsGiven || ""}
                    onChange={(e) =>
                      updateRef(key, "nameAsGiven", e.target.value)
                    }
                    placeholder="Name as given in source (optional)"
                    className="text-sm"
                  />
                  <Input
                    value={ref.source?.book || ""}
                    onChange={(e) =>
                      updateRefSource(key, "book", e.target.value)
                    }
                    placeholder="Source book (optional)"
                    className="text-sm"
                  />
                  <Input
                    value={ref.source?.page || ""}
                    onChange={(e) =>
                      updateRefSource(key, "page", e.target.value)
                    }
                    placeholder="Page (optional)"
                    className="text-sm"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add resh qala combobox */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            {loading
              ? "Loading resh qale..."
              : value.length > 0
                ? "Add another resh qala..."
                : "Add a resh qala..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[320px] p-0">
          <div className="p-2">
            <Input
              placeholder="Search by any name (Syriac or Latin)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-2"
              dir="auto"
            />
            <div className="max-h-[220px] overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {options.length === 0
                    ? "No resh qale defined yet. Add them in Admin > Resh Qale."
                    : "No match found."}
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredOptions.map((option) => (
                    <button
                      key={`${option.id}::${option.nameText}`}
                      type="button"
                      className="w-full text-left flex flex-col rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                      onClick={() => addRef(option)}
                    >
                      <span className="flex items-center gap-2">
                        <Check className="h-4 w-4 opacity-0" />
                        <span className="font-medium">{option.nameText}</span>
                        {option.syriac && (
                          <span
                            className="font-east-syriac-adiabene text-muted-foreground"
                            dir="rtl"
                          >
                            {option.syriac}
                          </span>
                        )}
                        {option.type && (
                          <span className="text-xs text-muted-foreground">
                            {getGenreLabel(option.type)}
                          </span>
                        )}
                      </span>
                      {!option.isCanonical && (
                        <span className="pl-6 text-xs text-muted-foreground">
                          another name for {option.displayName}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
