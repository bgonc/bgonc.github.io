import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPosts, PostMetadata } from '../utils/markdown';

const AllPosts: React.FC = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<PostMetadata[]>([]);

    useEffect(() => {
        getAllPosts().then(setPosts);
    }, []);

    return (
        <div className="min-h-screen bg-primary text-text-main py-24 px-6">
            <nav className="fixed top-0 left-0 w-full bg-primary/80 backdrop-blur-md border-b border-slate-800 z-50 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-text-muted hover:text-accent transition-colors flex items-center gap-2"
                    >
                        <i className="fa-solid fa-arrow-left"></i> Back to Home
                    </button>
                    <h1 className="font-bold text-lg">All Blog Posts</h1>
                </div>
            </nav>

            <div className="container mx-auto max-w-5xl mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <article
                            key={post.slug}
                            onClick={() => navigate(`/blog/${post.slug}`)}
                            className="group cursor-pointer relative bg-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-800 hover:border-accent/40 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-xs text-accent select-none pointer-events-none">
                                {"<md>"}
                            </div>

                            <div className="p-6 h-full flex flex-col">
                                <div className="flex gap-3 text-xs font-mono text-accent/80 mb-4">
                                    <span className="bg-accent/10 px-2 py-1 rounded">{post.date}</span>
                                    <span className="bg-primary px-2 py-1 rounded text-text-muted">{post.readTime}</span>
                                </div>

                                <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-accent transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center text-accent text-sm font-medium pt-4 border-t border-slate-800/50">
                                    <span className="group-hover:mr-2 transition-all duration-300">Read Post</span>
                                    <i className="fa-solid fa-arrow-right ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"></i>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllPosts;
