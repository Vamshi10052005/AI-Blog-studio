import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section className="bg-gray-950 py-24">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="text-center text-5xl font-bold text-white">
          Why Choose AI Blog Studio?
        </h2>

        <p className="mt-6 text-center text-xl text-gray-400">
          Everything you need to create amazing blogs with AI.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon="⚡"
            title="AI Writing"
            description="Generate high-quality blog posts within seconds."
          />

          <FeatureCard
            icon="🔍"
            title="SEO Optimized"
            description="Improve your Google rankings automatically."
          />

          <FeatureCard
            icon="🏷️"
            title="Smart Tags"
            description="Generate relevant tags for every article."
          />

          <FeatureCard
            icon="🤖"
            title="AI Images"
            description="Create beautiful images for every blog."
          />
        </div>
      </div>
    </section>
  );
}