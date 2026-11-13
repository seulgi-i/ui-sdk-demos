import Link from "next/link";

const links = [
  { href: "/", label: "카테고리 Combobox" },
  { href: "/command", label: "커맨드 팔레트" },
] as const;

export function DemoNav({ current }: { current: "/" | "/command" }) {
  return (
    <nav className="demo-nav" aria-label="데모 전환">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={
            current === link.href ? "demo-nav-link is-active" : "demo-nav-link"
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
