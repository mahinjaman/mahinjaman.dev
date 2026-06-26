import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogApi, getApiErrorMessage } from "../../../lib/api";
import type { IBlog } from "../../../types";

const formatDate = (iso?: string): string =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

const BlogSection = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    blogApi
      .getAll()
      .then((data) => !cancelled && setBlogs(data.slice(0, 3)))
      .catch((err) => !cancelled && setError(getApiErrorMessage(err)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="blog"
      className="text-white py-24 px-6 relative overflow-hidden font-mono"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="h-[1px] w-[100px] bg-orange-500 mb-4" />
          <p className="text-orange-500 tracking-[0.4em] text-xs mb-2">
            FIELD_NOTES
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
            The <span className="text-orange-500">Blog</span>
          </h2>
        </div>

        {/* States */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {!loading && error && (
          <p className="text-center text-red-400 text-sm">
            Failed to load posts: {error}
          </p>
        )}
        {!loading && !error && blogs.length === 0 && (
          <p className="text-center text-gray-500 text-sm">
            No posts published yet.
          </p>
        )}

        {!loading && !error && blogs.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/blog/${blog.slug || blog._id}`}
                    className="group block h-full bg-[#0a0a0a]/80 border border-white/10 rounded-sm overflow-hidden backdrop-blur-xl hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-1.5"
                  >
                    {/* Cover */}
                    <div
                      className="h-40 bg-cover bg-center border-b border-white/10"
                      style={{
                        backgroundImage: blog.coverImage
                          ? `url(${blog.coverImage})`
                          : "linear-gradient(135deg, rgba(249,115,22,0.18), rgba(0,0,0,0.6))",
                      }}
                    />
                    <div className="p-6 flex flex-col h-[calc(100%-10rem)]">
                      <span className="text-[10px] text-gray-500 mb-2">
                        {formatDate(blog.createdAt)}
                      </span>
                      <h3 className="text-lg font-bold mb-2 leading-tight line-clamp-2 group-hover:text-orange-500 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
                        {blog.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[9px] border border-orange-500/20 text-orange-500/80 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span className="flex items-center gap-1.5 text-[11px] font-bold text-orange-500 tracking-widest group-hover:text-white transition-colors">
                        READ_MORE
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link
                to="/blog"
                className="px-8 py-3 border border-orange-500/40 text-orange-500 font-bold uppercase text-xs tracking-widest hover:bg-orange-500 hover:text-black transition-all duration-300 rounded-sm"
              >
                View All Posts →
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
