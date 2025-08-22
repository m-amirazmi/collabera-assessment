import { AUTH_TOKEN } from "@/constants/auth";
import { UserRound } from "lucide-react";
import { useState } from "react";

type MFAStepType = {
  username: string;
  token: string;
  onSuccess: () => void;
};

export default function MFAStep({ username, token, onSuccess }: MFAStepType) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/verifyMfa", {
      method: "POST",
      body: JSON.stringify({ username, code }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setSuccess(true);

    localStorage.setItem(AUTH_TOKEN, token);

    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  return (
    <form
      className="card w-96 bg-base-100 card-md shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="card-body">
        <h2 className="card-title">MFA</h2>
        <label className="input validator w-full">
          <UserRound className="opacity-50" strokeWidth={1.75} size={18} />
          <input
            type="text"
            required
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (error) setError("");
            }}
            placeholder="Enter 6-digit MFA code"
            className="border p-2 w-full text-center tracking-widest"
            maxLength={6}
          />
        </label>
        {error && (
          <div role="alert" className="alert alert-error alert-soft">
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div role="alert" className="alert alert-success alert-soft">
            <span>Login successful 🎉</span>
          </div>
        )}
        <div className="justify-end card-actions mt-4">
          <button
            className="btn btn-neutral btn-block rounded-sm"
            disabled={success}
          >
            Verify MFA
          </button>
        </div>
      </div>
    </form>
  );
}
