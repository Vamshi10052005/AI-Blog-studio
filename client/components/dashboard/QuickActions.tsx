export default function QuickActions() {
  const actions = [
    {
      icon: "⚡",
      title: "Generate Blog",
      description: "Create a complete blog using AI.",
    },
    {
      icon: "✍️",
      title: "Rewrite Article",
      description: "Rewrite existing content professionally.",
    },
    {
      icon: "📈",
      title: "SEO Optimizer",
      description: "Improve search engine rankings.",
    },
    {
      icon: "🖼️",
      title: "AI Image Generator",
      description: "Generate beautiful blog images.",
    },
  ];

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <div
            key={action.title}
            className="rounded-2xl border border-gray-800 bg-gray-900 p-8 transition hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl"
          >
            <div className="text-5xl">
              {action.icon}
            </div>

            <h3 className="mt-6 text-2xl font-bold text-white">
              {action.title}
            </h3>

            <p className="mt-4 text-gray-400">
              {action.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}