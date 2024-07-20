import Blog from '@/components/shop/Blog/Blogs';
import { fetchPosts } from '@/components/shop/Blog/FetchApi';
import { Post } from '@/components/shop/Blog/BlogComponent';

const BlogPage = async () => {
  const posts: Post[] = await fetchPosts();
  return <Blog posts={posts} />;
};

export default BlogPage;
