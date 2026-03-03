import { WorksHero, WorksGallery } from "@/features/projects/components";

export default function WorksPage() {
  return (
    <>
      <div className="relative z-10 w-full bg-transparent overflow-hidden selection:bg-red-900">
        <WorksHero />
        <WorksGallery />
      </div>
    </>
  );
}
