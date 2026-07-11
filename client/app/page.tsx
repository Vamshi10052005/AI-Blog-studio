import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white">
        <h1 className="text-6xl font-bold">
          AI Blog Studio
        </h1>

        <p className="mt-6 text-xl text-gray-300">
          Build. Create. Inspire.
        </p>

        <p className="mt-2 text-gray-400">
          An AI-powered blogging platform for creators.
        </p>

        <button className="mt-10 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700">
          Get Started
        </button>
      </main>
    </>
  );
}