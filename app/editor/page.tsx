import SyriacEditor from "@/components/SyriacEditor";

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Syriac Rich Text Editor
          </h1>
        </div>
        <SyriacEditor />
      </div>
    </div>
  );
}
