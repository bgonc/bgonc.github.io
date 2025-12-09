import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { getAllPosts, PostMetadata } from '../utils/markdown';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [blogPosts, setBlogPosts] = useState<PostMetadata[]>([]);

    const { data, language, setLanguage, theme, toggleTheme, labels } = usePortfolio();
    const { name, title, bio, experience, projects, skills, socials, email } = data;

    useEffect(() => {
        getAllPosts().then(posts => {
            // Take top 2 for homepage
            setBlogPosts(posts.slice(0, 2));
        });
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    const handlePostClick = (slug: string) => {
        navigate(`/blog/${slug}`);
    };

    return (
        <div className="min-h-screen bg-primary text-text-main selection:bg-accent selection:text-primary transition-colors duration-300">

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-40 bg-primary/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="font-mono font-bold text-accent tracking-tighter cursor-pointer whitespace-pre leading-none text-[10px]" onClick={() => scrollToSection('home')}>
                        {`   _
  (o)
  /v\\
 /( )\
 ^^ ^^`}
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
                        {[labels.home, labels.about, labels.experience, labels.projects, 'Blog', labels.contact].map((item, idx) => {
                            const ids = ['home', 'about', 'experience', 'projects', 'blog', 'contact'];
                            return (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(ids[idx])}
                                    className="hover:text-accent transition-colors"
                                >
                                    {item}
                                </button>
                            );
                        })}

                        {/* Toggles */}
                        <div className="flex items-center gap-4 pl-4 border-l border-slate-300 dark:border-slate-700">
                            <button
                                onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
                                className="text-xl hover:scale-110 transition-transform grayscale opacity-70 hover:grayscale-0 hover:opacity-100"
                                title="Switch Language"
                            >
                                {language === 'en' ? '🇬🇧' : '🇵🇹'}
                            </button>
                            <button
                                onClick={toggleTheme}
                                className="text-lg text-text-muted hover:text-accent transition-colors"
                                title="Toggle Theme"
                            >
                                <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-text-main text-xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden bg-secondary border-b border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-4">
                        {[labels.home, labels.about, labels.experience, labels.projects, labels.contact].map((item, idx) => {
                            const ids = ['home', 'about', 'experience', 'projects', 'contact'];
                            return (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(ids[idx])}
                                    className="text-left text-text-muted hover:text-accent py-2"
                                >
                                    {item}
                                </button>
                            );
                        })}
                        <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                            <button
                                onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
                                className="text-2xl grayscale opacity-70 hover:grayscale-0 hover:opacity-100"
                            >
                                {language === 'en' ? '🇬🇧' : '🇵🇹'}
                            </button>
                            <button
                                onClick={toggleTheme}
                                className="text-xl text-text-main"
                            >
                                <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
                <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-primary to-primary"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-text-main mb-6 tracking-tight font-mono">
                        {language === 'pt' ? 'olá, sou o ' : "hello, i'm "} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-indigo-500">{name}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto mb-10">
                        {title}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-accent/20"
                        >
                            {labels.viewWork}
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="px-8 py-4 bg-transparent border border-slate-400 dark:border-slate-600 hover:border-accent text-text-main font-bold rounded-full transition-all"
                        >
                            {labels.contactMe}
                        </button>
                    </div>

                    {/* Social Icons */}
                    <div className="mt-12 flex gap-6 justify-center">
                        {socials.map((social) => (
                            <a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-muted hover:text-accent text-2xl transition-colors"
                            >
                                <i className={social.iconClass}></i>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section with Chart */}
            <section id="about" className="py-24 bg-secondary/50 transition-colors duration-300">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-8 flex items-center gap-3">
                                <span className="w-12 h-1 bg-accent block"></span>
                                {labels.about}
                            </h2>
                            <p className="text-lg text-text-muted leading-relaxed mb-6 whitespace-pre-wrap">
                                {bio}
                            </p>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="p-4 bg-primary rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="text-3xl font-bold text-accent mb-1">5+</div>
                                    <div className="text-sm text-text-muted">{labels.yearsExp}</div>
                                </div>
                                <div className="p-4 bg-primary rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="text-3xl font-bold text-purple-400 mb-1">{projects.length}+</div>
                                    <div className="text-sm text-text-muted">{labels.projectsComp}</div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Chart */}
                        <div className="bg-primary p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
                            <h3 className="text-xl font-semibold text-text-main mb-6">{labels.techProf}</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        layout="vertical"
                                        data={skills}
                                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                                    >
                                        <XAxis type="number" domain={[0, 100]} hide />
                                        <YAxis
                                            dataKey="name"
                                            type="category"
                                            tick={{ fill: theme === 'dark' ? '#94a3b8' : '#475569', fontSize: 12 }}
                                            width={100}
                                            interval={0}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'transparent' }}
                                            contentStyle={{
                                                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                                                borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
                                                color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
                                            }}
                                        />
                                        <Bar dataKey="level" barSize={20} radius={[0, 4, 4, 0]}>
                                            {skills.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#38bdf8' : '#818cf8'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-24">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-16 text-center">
                        {labels.experience}
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-12">
                        {experience.map((job, idx) => (
                            <div key={job.id} className="relative pl-8 md:pl-0">
                                {/* Timeline line */}
                                <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-slate-300 dark:bg-slate-800 ml-2"></div>

                                <div className="md:flex gap-10 items-start group">
                                    {/* Date - Left side on desktop */}
                                    <div className="md:w-1/4 text-right hidden md:block pt-2">
                                        <span className="text-accent font-mono text-sm">{job.period}</span>
                                    </div>

                                    {/* Dot */}
                                    <div className="hidden md:block w-4 h-4 bg-primary rounded-full border-2 border-accent mt-2.5 z-10 group-hover:scale-125 transition-transform"></div>

                                    {/* Content */}
                                    <div className="md:w-3/4 relative">
                                        {/* Mobile Date */}
                                        <div className="md:hidden text-accent font-mono text-sm mb-2">{job.period}</div>

                                        <h3 className="text-2xl font-bold text-text-main mb-1 group-hover:text-accent transition-colors">
                                            {job.role}
                                        </h3>
                                        <div className="text-text-muted font-semibold mb-4">{job.company}</div>
                                        <p className="text-text-muted leading-relaxed whitespace-pre-wrap">
                                            {job.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 bg-secondary/50 transition-colors duration-300">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-16 text-center">
                        {labels.featuredProjects}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div key={project.id} className="group bg-primary rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10">
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-text-main mb-2">{project.title}</h3>
                                    <p className="text-text-muted text-sm mb-4 line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map((tech) => (
                                            <span key={tech} className="text-xs font-medium px-2.5 py-0.5 rounded bg-secondary text-text-muted border border-slate-200 dark:border-slate-700">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm font-semibold text-text-main hover:text-accent transition-colors"
                                        >
                                            <i className="fab fa-github"></i> {labels.code}
                                        </a>
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm font-semibold text-text-main hover:text-accent transition-colors"
                                            >
                                                <i className="fas fa-external-link-alt"></i> {labels.liveDemo}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Section (Dynamic) */}
            <section id="blog" className="py-24">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-16 text-center">
                        Latest from Blog
                    </h2>
                    {blogPosts.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {blogPosts.map((post) => (
                                <article key={post.slug} onClick={() => handlePostClick(post.slug)} className="group cursor-pointer bg-secondary rounded-2xl border border-slate-700 overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-xl">
                                    {post.coverImage && (
                                        <div className="h-48 overflow-hidden">
                                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="flex gap-4 text-xs text-text-muted mb-3">
                                            <span>{post.date}</span>
                                            <span>•</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-text-main mb-2 group-hover:text-accent transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-text-muted leading-relaxed mb-4">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center text-accent text-sm font-medium">
                                            Read Article <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-text-muted">
                            No posts found. Add .md files to src/content/posts!
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <button className="px-8 py-3 border border-slate-600 text-text-muted rounded-full hover:bg-secondary hover:text-white transition-colors">
                            View All Posts
                        </button>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-8">
                        {labels.letsWork}
                    </h2>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10">
                        {language === 'en'
                            ? "I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!"
                            : "Estou à procura de novas oportunidades. Se tiver alguma questão ou apenas quiser dizer olá, tentarei responder o mais breve possível!"
                        }
                    </p>
                    <a
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-full transition-all shadow-lg shadow-indigo-500/25"
                    >
                        <i className="far fa-envelope"></i>
                        {labels.sayHello}
                    </a>

                    <footer className="mt-24 pt-8 border-t border-slate-200 dark:border-slate-800 text-text-muted text-sm flex flex-col items-center gap-4">
                        <p>© {new Date().getFullYear()} {name}. {labels.footer}</p>
                    </footer>
                </div>
            </section>

        </div>
    );
}

export default Home;
```
