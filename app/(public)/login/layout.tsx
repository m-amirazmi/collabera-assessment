export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full bg-base-200 flex items-center justify-center">
      {children}
    </main>
  );
}
