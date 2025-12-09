import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Polyfill buffer for gray-matter
if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
}

export interface PostMetadata {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    coverImage?: string;
    readTime?: string;
}

export interface Post {
    metadata: PostMetadata;
    content: string;
}

export async function getAllPosts(): Promise<PostMetadata[]> {
    // Import all markdown files from the content directory
    const modules = import.meta.glob('../content/posts/*.md', { as: 'raw' });

    const posts: PostMetadata[] = [];

    for (const path in modules) {
        const rawContent = await modules[path]();
        const { data } = matter(rawContent);

        // precise slug from filename: ../content/posts/my-post.md -> my-post
        const slug = path.split('/').pop()?.replace('.md', '') || '';

        posts.push({
            slug,
            title: data.title || 'Untitled',
            date: data.date || '',
            excerpt: data.excerpt || '',
            coverImage: data.coverImage,
            readTime: data.readTime || '5 min read'
        });
    }

    // Sort by date descending
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const modules = import.meta.glob('../content/posts/*.md', { as: 'raw' });
    const path = `../content/posts/${slug}.md`;

    if (!modules[path]) {
        return null;
    }

    const rawContent = await modules[path]();
    const { data, content } = matter(rawContent);

    return {
        metadata: {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            coverImage: data.coverImage,
            readTime: data.readTime
        },
        content
    };
}
