export default function RecentBlogs() {
  const blogs = [
    "AI vs Human Writing",
    "Top 10 React Tips",
    "Future of Generative AI",
  ];

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-3xl font-bold text-white">
        Recent Blogs
      </h2>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog}
            className="rounded-xl border border-gray-800 bg-gray-900 p-6 hover:border-blue-500 transition"
          >
            <h3 className="text-xl font-semibold">
              📄 {blog}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}