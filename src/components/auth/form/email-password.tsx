"use client";

import { EmailFormField, NameFormField } from "./fields";
import PasswordFormField from "./fields/password";
import Password2FormField from "./fields/password2";

type EmailPasswordFormProps = {
  isSignUp?: boolean;
};

const EmailPasswordForm = ({ isSignUp = false }: EmailPasswordFormProps) => {
  return (
    <>
      {isSignUp && <NameFormField />}
      <EmailFormField isSignUp={isSignUp} />
      <PasswordFormField isSignUp={isSignUp} />
      {isSignUp && <Password2FormField />}
    </>
  );
};

export default EmailPasswordForm;
