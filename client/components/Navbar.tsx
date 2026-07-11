export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-gray-900 text-white shadow-md">
      <h1 className="text-2xl font-bold text-blue-500">
        AI Blog Studio
      </h1>

      <div className="flex gap-8">
        <a href="#">Home</a>
        <a href="#">Explore</a>
        <a href="#">Categories</a>
        <a href="#">About</a>
      </div>

      <button className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700">
        Login
      </button>
    </nav>
  );
}