import Link from "next/link";

export default function NavBar() {
  return (
    <nav style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </nav>
  );
} 