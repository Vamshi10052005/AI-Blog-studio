export default function Stats() {
  const stats = [
    {
      number: "10K+",
      label: "Blogs Generated",
    },
    {
      number: "5K+",
      label: "Active Writers",
    },
    {
      number: "99%",
      label: "AI Accuracy",
    },
    {
      number: "24/7",
      label: "Support",
    },
  ];

  return (
    <section className="bg-gray-950 py-20">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center"
            >
              <h3 className="text-4xl font-bold text-blue-500">
                {stat.number}
              </h3>

              <p className="mt-3 text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}