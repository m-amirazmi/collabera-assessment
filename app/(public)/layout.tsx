import Navbar from "@/components/ui/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-base-200 h-screen flex flex-col">
      <Navbar title="Collabera" />
      {children}
    </div>
  );
}
