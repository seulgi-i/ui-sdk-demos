import { CategoryPicker } from "@/components/CategoryPicker";
import { DemoNav } from "@/components/DemoNav";

export default function Home() {
  return (
    <main className="page">
      <div className="page-stack">
        <DemoNav current="/" />
        <CategoryPicker />
      </div>
    </main>
  );
}
