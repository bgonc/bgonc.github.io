import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { getPostBySlug, Post } from '../utils/markdown';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            getPostBySlug(slug).then((p) => {
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
            <nav className="fixed top-0 w-full z-40 bg-primary/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors"
                    >
                        <i className="fa-solid fa-arrow-left"></i> Back to Home
                    </button>
                    <span className="text-accent font-semibold tracking-tight">bruno_</span>
                </div>
            </nav>

            <article className="container mx-auto px-6 pt-32 pb-24 max-w-3xl">
                <div className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-800 text-sm md:text-base font-mono">
                    <span className="text-green-500">bruno@portfolio</span>
                    <span className="text-gray-500">:</span>
                    <span className="text-blue-500">~/posts</span>
                    <span className="text-gray-500">$</span>
                    <span className="text-text-main ml-2">cat {metadata.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md</span>
                </div>

                <div className="bg-secondary/70 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 md:p-8">
                    <header className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-4">{metadata.title}</h1>
                        <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                            <span className="flex items-center gap-2">
                                <i className="far fa-calendar text-green-500"></i> {metadata.date}
                            </span>
                            <span className="flex items-center gap-2">
                                <i className="far fa-clock text-yellow-500"></i> {metadata.readTime}
                            </span>
                        </div>
                        {metadata.coverImage && (
                            <div className="mt-8 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                                <img src={metadata.coverImage} alt={metadata.title} className="w-full h-auto" />
                            </div>
                        )}
                    </header>

                    <div className="markdown-content">
                        <Markdown rehypePlugins={[rehypeHighlight]}>{content}</Markdown>
                    </div>
                </div>
            </article>

            <footer className="border-t border-slate-200 dark:border-slate-800 py-12 text-center text-text-muted">
                <p>Thanks for reading.</p>
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
