import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-4">🍳</div>
        <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Recipe Not Found!</h2>
        <p className="text-slate-500 mb-8">Oops! This page got eaten by hungry developers.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};