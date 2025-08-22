"use client";

import { useAuth } from "@/hooks/useAuth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, user } = useAuth();

  console.log(user);

  if (loading)
    return (
      <div className="text-base bg-base-300 h-screen w-screen flex items-center justify-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );

  return (
    <div className="text-base bg-base-300 h-screen flex items-center">
      <div className="overflow-x-auto max-w-4xl mx-auto flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
