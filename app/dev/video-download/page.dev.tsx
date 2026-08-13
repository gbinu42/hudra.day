import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VideoDownloadTool } from "@/components/dev/VideoDownloadTool";

export const metadata = {
  title: "Video download - dev tools",
};

export default function VideoDownloadPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-3">
          <Link
            href="/dev"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Dev tools
          </Link>
          <span className="text-muted-foreground">/</span>
          <h1 className="text-sm font-semibold">Video download</h1>
          <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">
            local only
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-6">
        <VideoDownloadTool />
      </main>
    </div>
  );
}
