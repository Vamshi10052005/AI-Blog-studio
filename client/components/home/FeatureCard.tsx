type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl">
      <div className="text-5xl">{icon}</div>

      <h3 className="mt-6 text-2xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-4 text-gray-400">
        {description}
      </p>
    </div>
  );
}