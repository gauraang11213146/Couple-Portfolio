import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Overlay />
        <ScrollyCanvas />
      </div>
      <Projects />
    </main>
  );
}
