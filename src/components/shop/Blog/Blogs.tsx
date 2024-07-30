import React from 'react';
import Link from 'next/link';

export interface Post {
  id: number;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
}

interface BlogProps {
  posts: Post[];
}

const Blog: React.FC<BlogProps> = ({ posts }) => {
  return (
    <div className="container mx-auto p-5 max-w-2xl">
      <h1 className="text-2xl font-bold text-center mb-5">Blogs</h1>
      <ul className="space-y-5">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-5">
            <h2 className="text-xl font-semibold mb-2">
              {post.title.rendered}
            </h2>
            <div
              className="mb-3 text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <Link
              href={`${post.link}`}
              className="text-blue-500 hover:underline"
            >
              Read more
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
