"use client";

import Link from "next/link";
import { type Dispatch, type SetStateAction, useState } from "react";
import Affiliation from "./_steps/affiliation";
import Complete from "./_steps/complete";
import EmailVerificationForm from "./_steps/email-verification";
import SignUpForm from "./_steps/sign-up";

enum STEPS {
  SIGN_UP,
  EMAIL_VERIFICATION,
  AFFILIATION,
  COMPLETE,
}

export type UserData = {
  email: string;
  name: string;
};

export type FormProps = {
  step: STEPS;
  setStep: Dispatch<SetStateAction<STEPS>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
};

const forms = {
  [STEPS.SIGN_UP]: SignUpForm,
  [STEPS.EMAIL_VERIFICATION]: EmailVerificationForm,
  [STEPS.AFFILIATION]: Affiliation,
  [STEPS.COMPLETE]: Complete,
};

const messages = {
  [STEPS.SIGN_UP]: {
    title: "Welcome",
    subtitle: "Create your EmoryLife account",
  },
  [STEPS.EMAIL_VERIFICATION]: {
    title: "Verify your email",
    subtitle: "Verification code has been sent.",
  },
  [STEPS.AFFILIATION]: {
    title: "Are you an Emory affiliate?",
    subtitle: "We are excited to have you join the EmoryLife community!",
  },
  [STEPS.COMPLETE]: {
    title: "Welcome!",
    subtitle: "Your account has been created.",
  },
};

const SignUp = () => {
  const [step, setStep] = useState(STEPS.SIGN_UP);
  const [userData, setUserData] = useState<UserData>({
    email: "",
    name: "",
  });

  const CurrentForm = forms[step];

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{messages[step].title}</h1>
        <p className="text-muted-foreground text-balance">
          {messages[step].subtitle}
        </p>
      </div>

      {CurrentForm && (
        <CurrentForm
          step={step}
          setStep={setStep}
          userData={userData}
          setUserData={setUserData}
        />
      )}

      {step !== STEPS.COMPLETE && (
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="underline underline-offset-4 font-medium text-primary"
          >
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
};

export default SignUp;
