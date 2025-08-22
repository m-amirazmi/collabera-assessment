"use client";

import { UserRound } from "lucide-react";
import { useState } from "react";

type UsernameStepProps = {
  onNext: (username: string, secureWord: string) => void;
};

export default function UsernameStep({ onNext }: UsernameStepProps) {
  const [error, setError] = useState<string>();
  const [username, setUsername] = useState<string>("");
  const [disable, setDisable] = useState(false);
  const [secureWord, setSecureWord] = useState("");
  const [count, setCount] = useState(0);

  const handleNext = async () => {
    onNext(username, secureWord);
  };

  const handleSubmitUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) return;
    if (secureWord) return handleNext();

    const res = await fetch("/api/getSecureWord", {
      method: "POST",
      body: JSON.stringify({ username }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setSecureWord(data.secureWord);
    setCount(data.expiresIn);
    setDisable(true);
  };

  return (
    <form
      onSubmit={handleSubmitUsername}
      className="card w-96 bg-base-100 card-md shadow-sm"
    >
      <div className="card-body">
        <h2 className="card-title">Login</h2>
        <label className="input validator w-full">
          <UserRound className="opacity-50" strokeWidth={1.75} size={18} />
          <input
            name="username"
            type="text"
            required
            placeholder="Username"
            className="w-full"
            value={username}
            disabled={disable}
            onChange={(e) => {
              setUsername(e.target.value);
              if (error) setError("");
            }}
          />
        </label>
        {error && (
          <div role="alert" className="alert alert-error alert-soft">
            <span>{error}</span>
          </div>
        )}

        {secureWord && (
          <>
            <div className="mt-2 w-full py-2 bg-base-300 flex items-center justify-center rounded-sm">
              <span className="text-lg font-bold">{secureWord}</span>
            </div>
            <p>Secure word will expire in {count} seconds</p>
          </>
        )}

        <div className="justify-end card-actions mt-4">
          <button className="btn btn-neutral btn-block rounded-sm">
            {secureWord ? "Next" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
