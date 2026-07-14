export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter Your Topic",
      description:
        "Provide a topic or idea, and let AI understand what you want to write.",
    },
    {
      number: "02",
      title: "AI Generates Content",
      description:
        "Our AI creates a complete, SEO-friendly draft in seconds.",
    },
    {
      number: "03",
      title: "Edit & Improve",
      description:
        "Customize the content, rewrite sections, and improve grammar.",
    },
    {
      number: "04",
      title: "Publish",
      description:
        "Publish your blog instantly and share it with the world.",
    },
  ];

  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="text-center text-5xl font-bold">
          How It Works
        </h2>

        <p className="mt-6 text-center text-xl text-gray-400">
          Create AI-powered blogs in just four simple steps.
        </p>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-gray-800 bg-gray-900 p-8 transition hover:-translate-y-2 hover:border-blue-500"
            >
              <div className="text-4xl font-bold text-blue-500">
                {step.number}
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-4 text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}