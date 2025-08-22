// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { AUTH_TOKEN } from "@/constants/auth";

type User = {
  username: string;
  role?: string;
  exp: number;
};

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const decoded: User = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem(AUTH_TOKEN);
        router.replace("/login");
      } else {
        setUser(decoded);
        setLoading(false);
      }
    } catch {
      localStorage.removeItem(AUTH_TOKEN);
      router.replace("/login");
    }
  }, [router]);

  return { user, loading };
}
