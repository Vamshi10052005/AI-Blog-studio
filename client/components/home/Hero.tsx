export default function Hero() {
  return (
    <section className="bg-gray-950 text-white">
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-between gap-16 px-8 py-20 lg:flex-row">

        {/* Left Side */}
        <div className="max-w-2xl">

          <p className="mb-4 font-semibold text-blue-500">
            🚀 AI Powered Blogging Platform
          </p>

          <h1 className="text-5xl font-extrabold leading-tight lg:text-6xl">
            Write Smarter with{" "}
            <span className="text-blue-500">
              Artificial Intelligence
            </span>
          </h1>

          <p className="mt-8 text-xl leading-8 text-gray-400">
            Create beautiful blogs in seconds using AI.
            Rewrite articles, optimize SEO, generate smart tags,
            and publish like a professional writer.
          </p>

          <div className="mt-10 flex gap-5">

            <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:scale-105 hover:bg-blue-700">
              Start Writing
            </button>

            <button className="rounded-xl border border-gray-700 px-8 py-4 transition hover:bg-gray-800">
              Watch Demo
            </button>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center">

          <div className="flex h-96 w-96 items-center justify-center rounded-full bg-blue-600/20 text-9xl shadow-2xl">
            🤖
          </div>

        </div>

      </div>
    </section>
  );
}