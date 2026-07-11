import Link from "next/link";
import { FaPenNib } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-gray-800 bg-gray-950 px-10 py-5 text-white">
      <Link href="/" className="flex items-center gap-2">
        <FaPenNib className="text-2xl text-blue-500" />
        <span className="text-2xl font-bold">
          AI Blog Studio
        </span>
      </Link>

      <div className="flex gap-8">
        <Link href="/">Home</Link>
        <Link href="/">Explore</Link>
        <Link href="/">Categories</Link>
        <Link href="/">About</Link>
      </div>

      <button className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700">
        Login
      </button>
    </nav>
  );
}