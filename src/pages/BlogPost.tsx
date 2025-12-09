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
                    <div className="ml-auto font-mono font-bold text-accent whitespace-pre leading-none text-[10px]">
                        {`   _
  (o)
  /v\\
 /( )\
 ^^ ^^`}
                    </div>
                </div>
            </nav>

            {/* Content */}
            <article className="container mx-auto px-6 pt-32 pb-24 max-w-3xl">
                <header className="mb-12 text-center">
                    <div className="flex justify-center gap-4 text-sm text-text-muted mb-4">
                        <span>{metadata.date}</span>
                        <span>•</span>
                        <span>{metadata.readTime}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-500 mb-6">
                        {metadata.title}
                    </h1>
                    {metadata.coverImage && (
                        <div className="mt-8 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                            <img src={metadata.coverImage} alt={metadata.title} className="w-full h-auto" />
                        </div>
                    )}
                </header>

                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-text-main prose-p:text-text-muted prose-strong:text-text-main prose-a:text-accent prose-code:text-accent prose-pre:bg-secondary prose-pre:border prose-pre:border-slate-700">
                    <Markdown rehypePlugins={[rehypeHighlight]}>
                        {content}
                    </Markdown>
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
