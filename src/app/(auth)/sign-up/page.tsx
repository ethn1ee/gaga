"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useState } from "react";
import Affiliation from "./_steps/affiliation";
import BasicInformationForm from "./_steps/basic-information";
import Complete from "./_steps/complete";
import EmailVerificationForm from "./_steps/email-verification";

enum STEPS {
  BASIC_INFORMATION,
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
  [STEPS.BASIC_INFORMATION]: BasicInformationForm,
  [STEPS.EMAIL_VERIFICATION]: EmailVerificationForm,
  [STEPS.AFFILIATION]: Affiliation,
  [STEPS.COMPLETE]: Complete,
};

const SignUp = () => {
  const t = useTranslations("auth.sign-up");

  const [step, setStep] = useState(STEPS.BASIC_INFORMATION);
  const [userData, setUserData] = useState<UserData>({
    email: "",
    name: "",
  });

  const messages = {
    [STEPS.BASIC_INFORMATION]: {
      title: t("basic-information.title"),
      subtitle: t("basic-information.subtitle"),
    },
    [STEPS.EMAIL_VERIFICATION]: {
      title: t("email-verification.title"),
      subtitle: t("email-verification.subtitle"),
    },
    [STEPS.AFFILIATION]: {
      title: t("affiliation.title"),
      subtitle: t("affiliation.subtitle"),
    },
    [STEPS.COMPLETE]: {
      title: t("complete.title"),
      subtitle: t("complete.subtitle"),
    },
  };

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
          {t("sign-in-instead.message")}{" "}
          <Link
            href="/sign-in"
            className="underline underline-offset-4 font-medium text-primary"
          >
            {t("sign-in-instead.button")}
          </Link>
        </div>
      )}
    </div>
  );
};

export default SignUp;
