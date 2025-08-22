export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-base-300 h-screen flex items-center justify-center">
      {children}
    </main>
  );
}
