import "./landing.css";

export default function Page() {
  return (
    <main className="landing bg-background text-foreground min-h-dvh">
      <div className="mx-auto max-w-[1200px] px-8 py-24">
        <h1 className="text-5xl font-semibold tracking-tight">shadcn shell alive</h1>
        <p className="text-muted-foreground mt-4 text-lg">Tailwind utilities and theme tokens resolve.</p>
        <div className="border-border bg-card mt-8 rounded-lg border p-6">
          <span className="font-mono text-mono text-xs">border-style must be solid here</span>
        </div>
      </div>
    </main>
  );
}
