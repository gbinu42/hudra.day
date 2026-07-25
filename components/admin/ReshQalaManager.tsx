"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { reshQalaService } from "@/lib/reshqala-services";
import {
  ReshQala,
  ReshQalaName,
  ReshQalaTune,
  ReshQalaRelation,
  ReshQalaRelationType,
  CreateReshQalaData,
  RESH_QALA_RELATION_LABELS,
  getReshQalaDisplayName,
} from "@/lib/types/reshQala";
import { HYMN_GENRES, CHURCH_TRADITIONS, getGenreLabel } from "@/lib/types/hymn";
import { normalizeSyriacForSearch } from "@/lib/utils/syriacText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, X, Search, Trash2, Star } from "lucide-react";

const generateSlug = (title: string): string =>
  normalizeSyriacForSearch(title)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

const emptyDraft = (): CreateReshQalaData => ({
  names: [{ name: "", isCanonical: true }],
  type: undefined,
  tunes: [],
  related: [],
  notes: "",
});

const RELATION_TYPES: ReshQalaRelationType[] = [
  "possibly-same",
  "tune-variant",
  "related",
];

export default function ReshQalaManager() {
  const { user } = useAuth();
  const [reshQale, setReshQale] = useState<ReshQala[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<CreateReshQalaData>(emptyDraft());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = reshQalaService.onReshQaleSnapshot(
      (snapshot) => {
        setReshQale(
          snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as ReshQala)
        );
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const filtered = useMemo(() => {
    const term = normalizeSyriacForSearch(search).toLowerCase().trim();
    if (!term) return reshQale;
    return reshQale.filter((rq) =>
      normalizeSyriacForSearch(
        (rq.names || []).flatMap((n) => [n.name, n.syriac]).join(" ")
      )
        .toLowerCase()
        .includes(term)
    );
  }, [reshQale, search]);

  const grouped = useMemo(() => {
    const sorted = [...filtered].sort((a, b) =>
      getReshQalaDisplayName(a).localeCompare(getReshQalaDisplayName(b), undefined, {
        sensitivity: "base",
      })
    );
    const groups = new Map<string, ReshQala[]>();
    for (const rq of sorted) {
      const name = getReshQalaDisplayName(rq);
      const letter = (name.match(/[A-Za-z]/)?.[0] || "#").toUpperCase();
      const list = groups.get(letter) || [];
      list.push(rq);
      groups.set(letter, list);
    }
    return [...groups.entries()];
  }, [filtered]);

  const isEditing = editingId !== null;

  const startNew = () => {
    setDraft(emptyDraft());
    setEditingId("");
  };

  const startEdit = (rq: ReshQala) => {
    setDraft({
      names: rq.names?.length ? rq.names : [{ name: "", isCanonical: true }],
      type: rq.type,
      hymnIds: rq.hymnIds,
      tunes: rq.tunes || [],
      related: rq.related || [],
      mergedInto: rq.mergedInto,
      notes: rq.notes || "",
    });
    setEditingId(rq.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(emptyDraft());
  };

  const handleDelete = async (rq: ReshQala) => {
    try {
      await reshQalaService.deleteReshQala(rq.id);
      toast.success("Resh qala deleted");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete");
    }
  };

  const updateName = (
    index: number,
    field: keyof ReshQalaName,
    value: string | boolean
  ) => {
    const names = [...(draft.names || [])];
    names[index] = { ...names[index], [field]: value };
    setDraft({ ...draft, names });
  };

  const setCanonical = (index: number) => {
    const names = (draft.names || []).map((n, i) => ({
      ...n,
      isCanonical: i === index,
    }));
    setDraft({ ...draft, names });
  };

  const addName = () => {
    setDraft({ ...draft, names: [...(draft.names || []), { name: "" }] });
  };

  const removeName = (index: number) => {
    setDraft({
      ...draft,
      names: (draft.names || []).filter((_, i) => i !== index),
    });
  };

  const addTune = () => {
    const tunes = [
      ...(draft.tunes || []),
      { id: `tune_${Date.now()}` } as ReshQalaTune,
    ];
    setDraft({ ...draft, tunes });
  };

  const updateTune = (
    index: number,
    field: keyof ReshQalaTune,
    value: string
  ) => {
    const tunes = [...(draft.tunes || [])];
    tunes[index] = { ...tunes[index], [field]: value || undefined };
    setDraft({ ...draft, tunes });
  };

  const removeTune = (index: number) => {
    setDraft({
      ...draft,
      tunes: (draft.tunes || []).filter((_, i) => i !== index),
    });
  };

  const addRelation = () => {
    const related = [
      ...(draft.related || []),
      { reshQalaId: "", relation: "related" } as ReshQalaRelation,
    ];
    setDraft({ ...draft, related });
  };

  const updateRelation = (
    index: number,
    field: keyof ReshQalaRelation,
    value: string
  ) => {
    const related = [...(draft.related || [])];
    related[index] = { ...related[index], [field]: value } as ReshQalaRelation;
    setDraft({ ...draft, related });
  };

  const removeRelation = (index: number) => {
    setDraft({
      ...draft,
      related: (draft.related || []).filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    const names = (draft.names || []).filter((n) => n.name.trim());
    if (names.length === 0) {
      toast.error("At least one name is required");
      return;
    }
    const hasCanonical = names.some((n) => n.isCanonical);
    if (!hasCanonical) names[0].isCanonical = true;

    const tunes = (draft.tunes || []).filter(
      (t) => t.tradition || t.pauseStructure || t.syllablePattern || t.notes
    );
    const related = (draft.related || []).filter((r) => r.reshQalaId);

    const data: CreateReshQalaData = {
      names,
      type: draft.type || undefined,
      tunes: tunes.length ? tunes : undefined,
      related: related.length ? related : undefined,
      mergedInto: draft.mergedInto || undefined,
      notes: draft.notes?.trim() || undefined,
    };

    setSaving(true);
    try {
      if (editingId) {
        await reshQalaService.updateReshQala(editingId, data);
        toast.success("Resh qala updated");
      } else {
        const slug = generateSlug(getReshQalaDisplayName({ names }));
        await reshQalaService.createReshQala(data, user?.uid || "unknown", slug);
        toast.success("Resh qala created");
      }
      cancelEdit();
    } catch (e) {
      console.error(e);
      toast.error("Failed to save resh qala");
    } finally {
      setSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="mx-auto max-w-xl rounded-md border p-4 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold">
            {editingId ? "Edit Resh Qala" : "New Resh Qala"}
          </h2>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={cancelEdit}>
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update" : "Create"}
            </Button>
          </div>
        </div>

        {/* Names */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Names (star = canonical)
          </Label>
          {(draft.names || []).map((name, index) => (
            <div key={index} className="flex gap-1.5 items-center">
              <Input
                value={name.name}
                onChange={(e) => updateName(index, "name", e.target.value)}
                placeholder="Name"
                className="h-9 text-sm flex-1"
                dir="auto"
              />
              <Input
                value={name.syriac || ""}
                onChange={(e) => updateName(index, "syriac", e.target.value)}
                placeholder="Syriac"
                className="h-auto min-h-9 flex-1 py-1 !text-3xl leading-tight font-east-syriac-adiabene md:!text-3xl"
                dir="rtl"
              />
              <Button
                type="button"
                variant={name.isCanonical ? "default" : "ghost"}
                size="sm"
                className="h-9 w-9 p-0 shrink-0"
                onClick={() => setCanonical(index)}
                title="Mark canonical"
              >
                <Star className="h-3.5 w-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 shrink-0"
                onClick={() => removeName(index)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={addName}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Name
          </Button>
        </div>

        {/* Type + merged */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs font-medium text-muted-foreground">
              Type
            </Label>
            <select
              value={draft.type || ""}
              onChange={(e) =>
                setDraft({ ...draft, type: e.target.value || undefined })
              }
              className="h-8 w-full rounded-md border bg-background px-2 text-sm"
            >
              <option value="">- none -</option>
              {HYMN_GENRES.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium text-muted-foreground">
              Merged into
            </Label>
            <select
              value={draft.mergedInto || ""}
              onChange={(e) =>
                setDraft({ ...draft, mergedInto: e.target.value || undefined })
              }
              className="h-8 w-full rounded-md border bg-background px-2 text-sm"
            >
              <option value="">- not merged -</option>
              {reshQale
                .filter((r) => r.id !== editingId)
                .map((r) => (
                  <option key={r.id} value={r.id}>
                    {getReshQalaDisplayName(r)}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Tunes */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Tunes
          </Label>
          {(draft.tunes || []).map((tune, index) => (
            <div key={tune.id} className="flex flex-wrap gap-1.5 items-center">
              <select
                value={tune.tradition || ""}
                onChange={(e) => updateTune(index, "tradition", e.target.value)}
                className="h-8 rounded-md border bg-background px-2 text-sm min-w-[10rem] flex-1"
              >
                <option value="">Tradition (shared)</option>
                {CHURCH_TRADITIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <Input
                value={tune.syllablePattern || ""}
                onChange={(e) =>
                  updateTune(index, "syllablePattern", e.target.value)
                }
                placeholder="Syllables"
                className="h-8 text-sm w-28"
              />
              <Input
                value={tune.pauseStructure || ""}
                onChange={(e) =>
                  updateTune(index, "pauseStructure", e.target.value)
                }
                placeholder="Pauses"
                className="h-8 text-sm flex-1 min-w-[8rem]"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => removeTune(index)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={addTune}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Tune
          </Button>
        </div>

        {/* Relations */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Related
          </Label>
          {(draft.related || []).map((rel, index) => (
            <div key={index} className="flex flex-wrap gap-1.5 items-center">
              <select
                value={rel.reshQalaId}
                onChange={(e) =>
                  updateRelation(index, "reshQalaId", e.target.value)
                }
                className="h-8 rounded-md border bg-background px-2 text-sm flex-1 min-w-[10rem]"
              >
                <option value="">Select...</option>
                {reshQale
                  .filter((r) => r.id !== editingId)
                  .map((r) => (
                    <option key={r.id} value={r.id}>
                      {getReshQalaDisplayName(r)}
                    </option>
                  ))}
              </select>
              <select
                value={rel.relation}
                onChange={(e) =>
                  updateRelation(index, "relation", e.target.value)
                }
                className="h-8 rounded-md border bg-background px-2 text-sm w-36"
              >
                {RELATION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {RESH_QALA_RELATION_LABELS[t]}
                  </option>
                ))}
              </select>
              <Input
                value={rel.note || ""}
                onChange={(e) => updateRelation(index, "note", e.target.value)}
                placeholder="Note"
                className="h-8 text-sm flex-1 min-w-[6rem]"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => removeRelation(index)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={addRelation}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Relation
          </Button>
        </div>

        {/* Notes */}
        <div className="space-y-1">
          <Label className="text-xs font-medium text-muted-foreground">
            Notes
          </Label>
          <Textarea
            value={draft.notes || ""}
            onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
            rows={2}
            className="text-sm"
            placeholder="Notes"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search by any name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-8 text-sm"
            dir="auto"
          />
        </div>
        <Button size="sm" className="h-8 shrink-0" onClick={startNew}>
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          New
        </Button>
      </div>

      {loading ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Loading...
        </p>
      ) : filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {reshQale.length === 0
            ? "No resh qale yet. Create one."
            : "No match."}
        </p>
      ) : (
        <div className="space-y-5">
          {grouped.map(([letter, items]) => (
            <div key={letter}>
              <div className="mb-2 text-xs font-semibold text-muted-foreground tracking-wide">
                {letter}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {items.map((rq) => {
                  const displayName = getReshQalaDisplayName(rq);
                  const displaySyriac = (rq.names || []).find(
                    (n) => n.name === displayName
                  )?.syriac;
                  const altCount = (rq.names || []).filter(
                    (n) => n.name && n.name !== displayName
                  ).length;
                  return (
                    <div
                      key={rq.id}
                      className="group relative rounded-md border bg-background p-2.5 hover:border-foreground/25 hover:bg-muted/30"
                    >
                      <button
                        type="button"
                        onClick={() => startEdit(rq)}
                        className="w-full text-left"
                        title={
                          altCount
                            ? `${displayName} (+${altCount} other name${altCount === 1 ? "" : "s"})`
                            : displayName
                        }
                      >
                        <div className="text-sm font-medium leading-snug">
                          {displayName}
                        </div>
                        {displaySyriac && (
                          <div
                            className="mt-1 font-east-syriac-adiabene text-2xl leading-tight text-muted-foreground"
                            dir="rtl"
                          >
                            {displaySyriac}
                          </div>
                        )}
                        {rq.type && (
                          <div className="mt-1 text-[10px] text-muted-foreground">
                            {getGenreLabel(rq.type)}
                          </div>
                        )}
                        {altCount > 0 && (
                          <div className="mt-1 text-[10px] text-muted-foreground">
                            +{altCount} other name{altCount === 1 ? "" : "s"}
                          </div>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(rq)}
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive p-0.5"
                        title="Delete"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
