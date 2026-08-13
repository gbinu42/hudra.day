import Link from "next/link";
import { AudioWaveform, FolderDown } from "lucide-react";

export const metadata = {
  title: "Dev tools",
};

const TOOLS = [
  {
    href: "/dev/audio-sections",
    title: "Audio sections",
    description:
      "Pull audio from YouTube, Facebook and friends, mark sections on a wrapped waveform, and export the marked pieces.",
    icon: AudioWaveform,
  },
  {
    href: "/dev/video-download",
    title: "Video download",
    description:
      "Save a Facebook (or any yt-dlp supported) video at the highest available quality straight into your Downloads folder.",
    icon: FolderDown,
  },
];

export default function DevIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Dev tools</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          These pages exist only while running <code>npm run dev</code>. They are
          excluded from the static production build.
        </p>

        <div className="mt-8 grid gap-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex gap-4 rounded-lg border bg-white p-4 transition-colors hover:border-primary"
            >
              <tool.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <h2 className="font-medium">{tool.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
