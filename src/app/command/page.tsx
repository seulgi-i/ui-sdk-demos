import { CommandPalette } from "@/components/CommandPalette";
import { DemoNav } from "@/components/DemoNav";

export default function CommandPage() {
  return (
    <main className="page">
      <div className="page-stack">
        <DemoNav current="/command" />
        <CommandPalette />
      </div>
    </main>
  );
}
