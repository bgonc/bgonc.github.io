import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { getPostBySlug, Post } from '../utils/markdown';
import 'highlight.js/styles/atom-one-dark.css'; // Import syntax highlighting styles

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            getPostBySlug(slug).then(p => {
                setPost(p);
                setLoading(false);
            });
        }
    }, [slug]);

    if (loading) return <div className="min-h-screen bg-primary flex items-center justify-center text-text-main">Loading...</div>;
    if (!post) return <div className="min-h-screen bg-primary flex items-center justify-center text-text-main">Post not found</div>;

    const { metadata, content } = post;

    return (
        <div className="min-h-screen bg-primary text-text-main selection:bg-accent selection:text-primary">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-40 bg-primary/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-6 py-4 flex items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors"
                    >
                        <i className="fa-solid fa-arrow-left"></i> Back to Home
                    </button>
                    <div className="ml-auto font-none font-bold text-accent whitespace-pre leading-none text-[8px] md:text-[10px]">
                        {`
 _                                  
| |__  _ __ _   _ _ __   ___    _ 
| '_ \\| '__| | | | '_ \\ / _ \\  (_)
| |_) | |  | |_| | | | | (_) |  _ 
|_.__/|_|   \\__,_|_| |_|\\___/  (_)
`}
                    </div>
                </div>
            </nav>

            {/* Content */}
            <article className="container mx-auto px-6 pt-32 pb-24 max-w-3xl font-mono">
                {/* Terminal Prompt Header */}
                <div className="mb-8 pb-4 border-b border-gray-800 text-sm md:text-base">
                    <span className="text-green-500">bruno@portfolio</span>
                    <span className="text-gray-400">:</span>
                    <span className="text-blue-500">~/posts</span>
                    <span className="text-gray-400">$</span>
                    <span className="text-text-main ml-2">cat {metadata.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md</span>
                </div>

                <div className="bg-[#1e1e1e]/50 p-1 md:p-0 rounded-lg">
                    <header className="mb-8 border-b border-gray-800 pb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
                            # {metadata.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-mono">
                            <span className="flex items-center gap-2">
                                <i className="far fa-calendar text-green-500"></i> {metadata.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <i className="far fa-clock text-yellow-500"></i> {metadata.readTime}
                            </span>
                        </div>
                        {metadata.coverImage && (
                            <div className="mt-8 rounded-lg overflow-hidden border border-gray-800 opacity-80 hover:opacity-100 transition-opacity">
                                <img src={metadata.coverImage} alt={metadata.title} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500" />
                            </div>
                        )}
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none font-mono prose-headings:text-green-500 prose-p:text-gray-300 prose-strong:text-white prose-a:text-blue-400 prose-code:text-yellow-500 prose-code:bg-gray-800/50 prose-code:px-1 prose-code:rounded prose-pre:bg-[#1a1b26] prose-pre:border prose-pre:border-gray-800">
                        <Markdown rehypePlugins={[rehypeHighlight]}>
                            {content}
                        </Markdown>
                    </div>

                    {/* Blinking Cursor at the end of content */}
                    <div className="mt-8 text-green-500 animate-pulse font-bold text-xl">
                        _
                    </div>
                </div>
            </article>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-12 text-center text-text-muted">
                <p>Thanks for reading!</p>
                <div className="mt-4">
                    <button
                        onClick={() => navigate('/')}
                        className="text-accent font-medium hover:underline"
                    >
                        Go back to Portfolio
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default BlogPost;
