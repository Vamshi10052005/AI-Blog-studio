export default function Hero() {
  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center bg-gray-950 px-6 text-center text-white">
      <h1 className="text-6xl font-extrabold leading-tight">
        Write Smarter with{" "}
        <span className="text-blue-500">Artificial Intelligence</span>
      </h1>

      <p className="mt-6 max-w-2xl text-xl text-gray-400">
        Create beautiful blogs in seconds using AI.
        Rewrite content, optimize SEO, generate tags,
        and publish with confidence.
      </p>

      <div className="mt-10 flex gap-6">
        <button className="rounded-lg bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700">
          Start Writing
        </button>

        <button className="rounded-lg border border-gray-600 px-8 py-4 hover:bg-gray-800">
          Explore Blogs
        </button>
      </div>
    </section>
  );
}