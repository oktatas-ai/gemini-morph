import Link from "next/link";

export function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="inline-flex flex-1 justify-center gap-1 leading-4 hover:underline"
    >
      {children}
    </Link>
  );
}
