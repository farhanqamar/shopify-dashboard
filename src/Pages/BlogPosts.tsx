import '../index.scss'
import Blog_img from '../assets/blog_img.svg'
import { Link } from 'react-router-dom';

const BlogPosts = () => {
  return (
    <section className='md:w-[70%] m-auto'>
        <div>
            <div className='flex p-2 py-5'>
                    <p className='text-2xl font-bold text-[#303030]'>Blog Posts</p>
            </div>
            <div className="bg-white py-10 rounded-xl border">
                <div>
                    <img src={Blog_img} className="m-auto" />
                </div>
                <div className="text-center">
                    <p className="text-base font-semibold">Write a blog post</p>
                    <p className="text-sm m-auto py-4">Blog posts are a great way to build a community around your products and your brand.</p>
                </div>
                <div>
                <Link to='/blog-post/createBlog'><button className='flex m-auto bg-black/75 hover:bg-black text-xs font-bold rounded-lg px-3 py-2 text-white'>Create Blog Post </button>
                </Link></div>
            </div>
        </div>
   </section>
  )
}

export default BlogPosts
