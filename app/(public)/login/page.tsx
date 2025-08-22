"use client";
import MFAStep from "@/components/login/mfa";
import PasswordStep from "@/components/login/password";
import UsernameStep from "@/components/login/username";
import { LoginStep } from "@/constants/loginSteps";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginData = {
  username: string;
  secureWord: string;
  token: string;
};

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    secureWord: "",
    token: "",
  });
  const [step, setStep] = useState(LoginStep.USERNAME);
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  switch (step) {
    case LoginStep.USERNAME:
      return (
        <UsernameStep
          onNext={(username, secureWord) => {
            setLoginData({ ...loginData, username, secureWord });
            setStep(LoginStep.PASSWORD);
          }}
        />
      );
    case LoginStep.PASSWORD:
      return (
        <PasswordStep
          username={loginData.username}
          secureWord={loginData.secureWord}
          onNext={(token) => {
            setLoginData({ ...loginData, token });
            setStep(LoginStep.MFA);
          }}
          onBack={() => setStep(LoginStep.USERNAME)}
        />
      );
    case LoginStep.MFA:
      return (
        <MFAStep
          onSuccess={handleRedirect}
          username={loginData.username}
          token={loginData.token}
        />
      );
  }
}
