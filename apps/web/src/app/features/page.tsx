import Link from "next/link";

export default function Features() {
  return (
    <div className="min-h-screen p-24 text-center">
      <h1 className="text-4xl font-bold mb-4">Features</h1>
      <p className="text-muted-foreground text-lg">Discover the powerful tools that drive Acadia.</p>
      <Link href="/" className="text-primary mt-8 inline-block hover:underline">Return Home</Link>
    </div>
  );
}