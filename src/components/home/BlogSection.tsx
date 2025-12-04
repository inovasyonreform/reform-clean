"use client";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image_url: string;
  slug: string;
  order?: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogSection() {
  const { data: posts = [] } = useSWR<BlogPost[]>("/api/blog/posts", fetcher);
  const sorted = [...posts].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const limited = sorted.slice(0, 3);

  return (
    <section id="blog" className="relative bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-24 overflow-hidden">
      <BackgroundBeams className="absolute inset-0 z-0" />
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-neutral-800/10 rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neutral-900/10 rounded-full blur-3xl -z-10 opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-6xl lg:text-7xl font-light tracking-wider text-white mb-6">
            Blog
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-red-600 to-red-500 mx-auto mb-3" />
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-light">
            İç mimarlık, tasarım ve yaşam alanları hakkında yazılarımız
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {limited.map((post, idx) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative bg-linear-to-br from-neutral-800/50 to-neutral-900/50 rounded-2xl overflow-hidden backdrop-blur-xl border border-neutral-700/50 hover:border-red-600/50 transition-all duration-500 h-full flex flex-col shadow-xl hover:shadow-2xl">
                
                {/* Image Container */}
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={post.image_url || "/placeholder.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-linear-to-r from-red-700 to-red-600 px-4 py-2 rounded-full text-white text-xs font-light backdrop-blur-md border border-red-700/30">
                    {post.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 flex flex-col grow">
                  <h3 className="text-xl lg:text-2xl font-light text-white mb-3 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <div className="w-8 h-1 bg-linear-to-r from-red-700 to-red-600 mb-4 group-hover:w-12 transition-all duration-300" />
                  
                  <p className="text-slate-300 text-sm lg:text-base font-light leading-relaxed line-clamp-3 grow">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-6 flex items-center text-red-600 font-light text-sm group-hover:gap-2 transition-all duration-300">
                    Devamını Oku
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Hover Light Effect */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-neutral-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-red-600 to-red-900 text-white font-light rounded-full hover:shadow-lg hover:shadow-white/50 transition-all duration-300 hover:scale-105"
          >
            Tüm Yazıları Görüntüle
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke=""
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}