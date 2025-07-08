import Link from "next/link";

const Agreement = () => {
  return (
    <div className="absolute bottom-0 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      By continuing, you agree to our <Link href="#">Terms of Service</Link> and{" "}
      <Link href="#">Privacy Policy</Link>.
    </div>
  );
};

export default Agreement;
