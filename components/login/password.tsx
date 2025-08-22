import { clientHash } from "@/libs/clientHash";
import { Key } from "lucide-react";
import { useState } from "react";

type PasswordStepType = {
  username: string;
  secureWord: string;
  onNext: (token: string) => void;
  onBack: () => void;
};

export default function PasswordStep({
  secureWord,
  username,
  onNext,
  onBack,
}: PasswordStepType) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) return;
    const hashedPassword = await clientHash(password);

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, hashedPassword, secureWord }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    onNext(data.token);
  };

  return (
    <form
      className="card w-96 bg-base-100 card-md shadow-sm"
      onSubmit={handlePasswordSubmit}
    >
      <div className="card-body">
        <h2 className="card-title">Password</h2>
        <label className="input validator w-full">
          <Key className="opacity-50" strokeWidth={1.75} size={18} />
          <input
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            className="w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && (
          <div role="alert" className="alert alert-error alert-soft">
            <span>{error}</span>
          </div>
        )}

        <div className="justify-end card-actions mt-4">
          {error && (
            <button
              className="btn btn-outline btn-block rounded-sm"
              onClick={onBack}
            >
              Back
            </button>
          )}
          <button className="btn btn-neutral btn-block rounded-sm">Next</button>
        </div>
      </div>
    </form>
  );
}
