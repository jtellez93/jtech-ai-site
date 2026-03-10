import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, CheckCircle, ArrowRight, ShieldCheck, Mail, Phone, Clock, FileText, Database, ChevronRight, Sparkles, Loader2, Cpu } from 'lucide-react';

// Importando los datos de configuración
import { routes, seoData, companyData } from './data/config';
import { homeData } from './data/home';
import { productsPageData, emmaProductData, medshiftProductData } from './data/products';
import { contactData } from './data/contact';
import { diagnosticData } from './data/diagnostic';
import { termsData, privacyData, dataDeletionData } from './data/legal';
import { runEmmaDiagnostic } from './services/emmaDiagnostic';
import WhatsAppDemo from './pages/WhatsAppDemo';
import MedshiftDemo from './pages/MedshiftDemo';
import EmmaLanding from './pages/EmmaLanding';

// Mapa de íconos para poder renderizarlos desde texto
const Icons = { Menu, X, CheckCircle, ArrowRight, ShieldCheck, Mail, Phone, Clock, FileText, Database, ChevronRight, Sparkles };

// --- COMPONENTES DE ANIMACIÓN Y UI (ESTILO APPLE / AI) ---
const Reveal = ({ children, delay = 0, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: "50px" }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const Button = ({ children, variant = 'primary', className = '', onClick, href, type = 'button', disabled = false }) => {
    const baseStyle = "inline-flex items-center justify-center px-6 py-3 font-medium rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-white text-black hover:bg-slate-200 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] disabled:hover:scale-100",
        secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-md hover:scale-[1.02] disabled:hover:scale-100",
        outline: "bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-white/40 backdrop-blur-sm",
        magic: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-[1.02] border border-white/10 disabled:hover:scale-100"
    };

    const classes = `${baseStyle} ${variants[variant]} ${className}`;

    if (href && !href.startsWith('http') && !href.startsWith('mailto')) {
        return <button type={type} onClick={onClick} disabled={disabled} className={classes}>{children}</button>;
    }

    if (href) {
        return (
            <a href={href} onClick={onClick} className={classes}>
                {children}
            </a>
        );
    }
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={classes}>
            {children}
        </button>
    );
};

const Section = ({ children, className = '', id }) => (
    <section id={id} className={`py-24 md:py-32 relative z-10 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    </section>
);

const GlassCard = ({ children, className = '' }) => (
    <div className={`bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-3xl p-8 hover:bg-white/[0.06] transition-colors duration-500 ${className}`}>
        {children}
    </div>
);

// --- VISTAS DE PÁGINA ---

const Home = ({ navigate }) => (
    <div className="animate-in fade-in duration-700">
        {/* Hero */}
        <Section className="min-h-screen flex items-center pt-32">
            <div className="max-w-5xl mx-auto text-center">
                <Reveal>
                    <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-8 cursor-pointer hover:bg-blue-500/20 transition-colors" onClick={() => navigate(routes.DIAGNOSTIC)}>
                        <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
                        <span className="text-sm font-medium text-blue-200">{homeData.hero.badge}</span>
                        <ChevronRight className="h-4 w-4 text-blue-400 ml-1" />
                    </div>
                </Reveal>

                <Reveal delay={100}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-500 mb-8 leading-[1.1]">
                        {homeData.hero.titlePrefix} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                            {homeData.hero.titleHighlight}
                        </span>
                    </h1>
                </Reveal>

                <Reveal delay={200}>
                    <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                        {homeData.hero.description}
                    </p>
                </Reveal>

                <Reveal delay={300}>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Button onClick={() => navigate(routes.CONTACT)} className="w-full sm:w-auto text-lg px-8 py-4">
                            {homeData.hero.primaryButton}
                        </Button>
                        <Button variant="secondary" onClick={() => navigate(routes.PRODUCTS)} className="w-full sm:w-auto text-lg px-8 py-4 group">
                            {homeData.hero.secondaryButton} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </Reveal>
            </div>
        </Section>

        {/* Qué hacemos */}
        <Section>
            <Reveal>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-16 text-center">{homeData.valueProposition.title}</h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8">
                {homeData.valueProposition.items.map((item, i) => {
                    const Icon = Icons[item.icon];
                    return (
                        <Reveal key={i} delay={i * 150}>
                            <GlassCard className="h-full">
                                {Icon && <Icon className="h-8 w-8 text-blue-400 mb-6" />}
                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed font-light">{item.desc}</p>
                            </GlassCard>
                        </Reveal>
                    );
                })}
            </div>
        </Section>

        {/* Productos Overview */}
        <Section>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <Reveal className="max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">{homeData.productsOverview.title}</h2>
                    <p className="text-xl text-slate-400 font-light">{homeData.productsOverview.description}</p>
                </Reveal>
                <Reveal delay={200} className="hidden md:block">
                    <Button variant="outline" onClick={() => navigate(routes.PRODUCTS)}>{homeData.productsOverview.buttonText}</Button>
                </Reveal>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {homeData.productsOverview.products.map((product, idx) => (
                    <Reveal delay={(idx + 1) * 100} key={product.id}>
                        <GlassCard className="flex flex-col h-full relative overflow-hidden group">
                            <div className={`absolute top-0 ${idx === 0 ? 'right-0 -mr-20' : 'left-0 -ml-20 bottom-0'} -mt-20 w-64 h-64 ${idx === 0 ? 'bg-blue-500/10' : 'bg-indigo-500/10'} rounded-full blur-3xl group-hover:${idx === 0 ? 'bg-blue-500/20' : 'bg-indigo-500/20'} transition-colors duration-700`}></div>

                            <div className="flex-grow relative z-10">
                                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{product.title}</h3>
                                <p className="text-slate-400 mb-8 font-light text-lg">{product.description}</p>
                            </div>
                            <Button variant="secondary" className="w-full sm:w-auto self-start mt-4 relative z-10" onClick={() => navigate(idx === 0 ? routes.PRODUCT_EMMA : routes.PRODUCT_MEDSHIFT)}>
                                {product.buttonText}
                            </Button>
                        </GlassCard>
                    </Reveal>
                ))}
            </div>
            <Reveal delay={300} className="mt-8 md:hidden">
                <Button variant="outline" className="w-full" onClick={() => navigate(routes.PRODUCTS)}>{homeData.productsOverview.buttonText}</Button>
            </Reveal>
        </Section>

        {/* Cómo trabajamos */}
        <Section>
            <Reveal>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-20 text-center">{homeData.methodology.title}</h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-12 relative">
                <div className="hidden md:block absolute top-12 left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10"></div>
                {homeData.methodology.steps.map((item, i) => (
                    <Reveal key={i} delay={i * 150} className="text-center">
                        <div className="w-24 h-24 mx-auto bg-black border border-white/10 text-white rounded-full flex items-center justify-center text-3xl font-light mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                            {item.step}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                        <p className="text-slate-400 font-light leading-relaxed">{item.desc}</p>
                    </Reveal>
                ))}
            </div>
        </Section>
    </div>
);

const Products = ({ navigate }) => (
    <div className="animate-in fade-in duration-700">
        <Section className="pt-32 pb-16">
            <Reveal className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">{productsPageData.header.title}</h1>
                <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
                    {productsPageData.header.description}
                </p>
            </Reveal>
        </Section>

        <Section className="pt-0">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {productsPageData.products.map((product, idx) => (
                    <Reveal delay={(idx + 1) * 100} key={product.id}>
                        <GlassCard className="flex flex-col h-full p-10 relative overflow-hidden group">
                            <div className={`absolute top-[-50%] right-[-50%] w-full h-full bg-gradient-to-br ${idx === 0 ? 'from-blue-500/10' : 'from-indigo-500/10'} to-transparent rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-110`}></div>

                            <div className="flex-grow relative z-10">
                                <div className={`inline-block px-4 py-1.5 ${idx === 0 ? 'bg-blue-500/10 border-blue-500/20 text-blue-300' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'} text-xs font-semibold tracking-widest uppercase rounded-full mb-8 border`}>
                                    {product.badge}
                                </div>
                                <h2 className="text-4xl font-bold tracking-tight text-white mb-6">{product.title}</h2>
                                <p className="text-slate-400 mb-8 text-xl font-light leading-relaxed">
                                    {product.description}
                                </p>
                                <ul className="space-y-4 mb-12">
                                    {product.features.map((text, i) => (
                                        <li key={i} className="flex items-start text-slate-300">
                                            <CheckCircle className={`h-6 w-6 ${idx === 0 ? 'text-blue-400' : 'text-indigo-400'} mr-3 shrink-0`} />
                                            <span className="font-light">{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Button variant="secondary" onClick={() => navigate(idx === 0 ? routes.PRODUCT_EMMA : routes.PRODUCT_MEDSHIFT)} className="w-full mt-auto relative z-10">
                                {product.buttonText}
                            </Button>
                        </GlassCard>
                    </Reveal>
                ))}

                <Reveal delay={300} className="md:col-span-2">
                    <div className="border border-dashed border-white/20 bg-white/[0.01] rounded-3xl p-12 flex flex-col items-center justify-center text-center backdrop-blur-sm">
                        <Sparkles className="h-12 w-12 text-slate-500 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{productsPageData.upcoming.title}</h3>
                        <p className="text-slate-400 font-light text-lg max-w-2xl">{productsPageData.upcoming.description}</p>
                    </div>
                </Reveal>
            </div>
        </Section>
    </div>
);

const ProductEmma = ({ navigate }) => (
    <div className="animate-in fade-in duration-700">
        <Section className="pt-32 pb-16">
            <Reveal className="max-w-4xl">
                <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold tracking-widest uppercase rounded-full mb-8">{emmaProductData.header.badge}</div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">{emmaProductData.header.title}</h1>
                <p className="text-2xl text-slate-400 font-light leading-relaxed mb-10">
                    {emmaProductData.header.description}
                </p>
                <Button onClick={() => navigate(routes.DEMO_CHAT)}>{emmaProductData.header.buttonText}</Button>
            </Reveal>
        </Section>

        <Section className="pt-0">
            <div className="grid lg:grid-cols-5 gap-16">
                <div className="lg:col-span-3 space-y-16">
                    <Reveal>
                        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">{emmaProductData.scope.title}</h2>
                        <div className="space-y-6">
                            {emmaProductData.scope.items.map((item, i) => (
                                <div key={i} className="flex items-start">
                                    <div className="mt-1 bg-white/10 p-2 rounded-full mr-6">
                                        <CheckCircle className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                                        <p className="text-slate-400 font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal>
                        <h3 className="text-2xl font-bold text-white mb-8 tracking-tight pt-8 border-t border-white/10">{emmaProductData.outOfScope.title}</h3>
                        <ul className="space-y-4">
                            {emmaProductData.outOfScope.items.map((item, i) => (
                                <li key={i} className="flex items-start text-slate-400 font-light">
                                    <X className="h-6 w-6 text-slate-600 mr-4 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>

                <div className="lg:col-span-2">
                    <Reveal delay={200}>
                        <GlassCard className="sticky top-32">
                            <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">{emmaProductData.pricing.title}</h3>

                            <div className="mb-10 pb-8 border-b border-white/10">
                                <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-4">{emmaProductData.pricing.setup.label}</p>
                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-4xl font-bold text-white">{emmaProductData.pricing.setup.price}</span>
                                </div>
                                <p className="text-slate-400 text-sm font-light">{emmaProductData.pricing.setup.description}</p>
                            </div>

                            <div className="mb-10">
                                <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-4">{emmaProductData.pricing.monthly.label}</p>
                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-5xl font-bold text-white">{emmaProductData.pricing.monthly.price}</span>
                                    <span className="text-slate-400 font-light text-xl">{emmaProductData.pricing.monthly.period}</span>
                                </div>
                                <p className="text-slate-400 text-sm font-light">{emmaProductData.pricing.monthly.description}</p>
                            </div>

                            <Button variant="primary" className="w-full" onClick={() => navigate(routes.DEMO_CHAT)}>{emmaProductData.pricing.buttonText}</Button>
                        </GlassCard>
                    </Reveal>
                </div>
            </div>
        </Section>
    </div>
);

const ProductMedshift = ({ navigate }) => (
    <div className="animate-in fade-in duration-700">
        <Section className="pt-32 pb-16">
            <Reveal className="max-w-4xl">
                <div className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-widest uppercase rounded-full mb-8">{medshiftProductData.header.badge}</div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">{medshiftProductData.header.title}</h1>
                <p className="text-2xl text-slate-400 font-light leading-relaxed mb-10">
                    {medshiftProductData.header.description}
                </p>
                <Button onClick={() => navigate(routes.DEMO_MEDSHIFT)}>{medshiftProductData.header.buttonText}</Button>
            </Reveal>
        </Section>

        <Section className="pt-0">
            <div className="grid lg:grid-cols-5 gap-16">
                <div className="lg:col-span-3 space-y-16">
                    <Reveal>
                        <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">{medshiftProductData.details.title}</h2>
                        <p className="text-slate-400 font-light text-lg mb-10 leading-relaxed">
                            {medshiftProductData.details.description}
                        </p>

                        <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">{medshiftProductData.details.featuresTitle}</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {medshiftProductData.details.features.map((item, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                    <CheckCircle className="h-6 w-6 text-indigo-400 mb-4" />
                                    <span className="text-slate-300 font-light">{item}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal>
                        <h3 className="text-2xl font-bold text-white mb-8 tracking-tight pt-8 border-t border-white/10">{medshiftProductData.outOfScope.title}</h3>
                        <ul className="space-y-4">
                            {medshiftProductData.outOfScope.items.map((item, i) => (
                                <li key={i} className="flex items-start text-slate-400 font-light">
                                    <X className="h-6 w-6 text-slate-600 mr-4 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>

                <div className="lg:col-span-2">
                    <Reveal delay={200}>
                        <GlassCard className="sticky top-32">
                            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{medshiftProductData.pricing.title}</h3>
                            <p className="text-slate-400 font-light mb-8">{medshiftProductData.pricing.description}</p>

                            <div className="mb-8 pb-8 border-b border-white/10">
                                <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-4">{medshiftProductData.pricing.perUser.label}</p>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-5xl font-bold text-white">{medshiftProductData.pricing.perUser.price}</span>
                                    <span className="text-slate-400 font-light text-xl">{medshiftProductData.pricing.perUser.period}</span>
                                </div>
                            </div>

                            <div className="mb-10">
                                <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-4">{medshiftProductData.pricing.minimum.label}</p>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-3xl font-bold text-white">{medshiftProductData.pricing.minimum.price}</span>
                                </div>
                                <p className="text-slate-500 text-sm font-light">{medshiftProductData.pricing.minimum.description}</p>
                            </div>

                            <Button variant="primary" className="w-full" onClick={() => navigate(routes.DEMO_MEDSHIFT)}>{medshiftProductData.pricing.buttonText}</Button>
                        </GlassCard>
                    </Reveal>
                </div>
            </div>
        </Section>
    </div>
);

// --- PLATAFORMA DE DIAGNÓSTICO IA ---
const Diagnostic = ({ navigate, setGlobalDemoConfig, globalDemoConfig }) => {
    const [problemDesc, setProblemDesc] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [leadCopied, setLeadCopied] = useState(false);
    const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '' });
    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const [honeypot, setHoneypot] = useState('');

    const handleAnalyze = async () => {
        if (!problemDesc.trim()) return;

        // 1. Honeypot check (Bot Protection)
        if (honeypot) {
            setError("Actividad inusual detectada. Por favor, intenta más tarde.");
            return;
        }

        // 2. Local Rate Limiting Check (Frontend-side Bot Protection)
        const history = JSON.parse(localStorage.getItem('emma_usage_history') || '[]');
        const now = Date.now();
        const maxRequests = parseInt(import.meta.env.VITE_MAX_HOURLY_DIAGNOSTICS) || 2;
        const recentRequests = history.filter(time => now - time < 3600000); // 1 hour window

        if (recentRequests.length >= maxRequests) {
            setError(`Has superado el límite de ${maxRequests} diagnósticos gratuitos por hora. Déjanos tus datos en la sección de contacto para agendar una sesión.`);
            return;
        }

        // Registrar nuevo intento exitoso en historial local
        recentRequests.push(now);
        localStorage.setItem('emma_usage_history', JSON.stringify(recentRequests));

        setIsAnalyzing(true);
        setResult(null);
        setError(null);
        setLeadSubmitted(false);

        const payload = {
            problemDesc: problemDesc
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

        try {
            const data = await runEmmaDiagnostic(payload, controller.signal);
            setResult(data.result);
            if (data.demoConfig) {
                setGlobalDemoConfig(data.demoConfig);
            } else {
                setGlobalDemoConfig(null);
            }
        } catch (err) {
            console.error("Error calling EMMA Backend:", err);
            if (err.name === 'AbortError') {
                setError("La solicitud tardó demasiado tiempo en responder. Por favor intenta de nuevo.");
            } else {
                setError(err.message || diagnosticData.errorMessage);
            }
        } finally {
            clearTimeout(timeoutId);
            setIsAnalyzing(false);
        }
    };

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setLeadCopied(true);
            setTimeout(() => setLeadCopied(false), 2000);
        }
    };

    const handleLeadSubmit = (e) => {
        e.preventDefault();

        const subjectName = leadForm.name ? ` - ${leadForm.name}` : '';
        const subject = encodeURIComponent(`Recomendación de EMMA - Diagnóstico Operativo${subjectName}`);

        const body = encodeURIComponent(
            `¡Hola equipo JTECH!\n\n` +
            `Acabo de usar a EMMA, su consultora de IA, y me interesa agendar una reunión.\n\n` +
            `Mis datos de contacto son:\n` +
            `Nombre: ${leadForm.name}\n` +
            `Correo: ${leadForm.email}\n` +
            `Teléfono: ${leadForm.phone}\n\n` +
            `=== MI DESAFÍO OPERATIVO ===\n` +
            `${problemDesc}\n\n` +
            `=== DIAGNÓSTICO DE EMMA ===\n` +
            `${result}\n\n` +
            `Quedo atento a su contacto.`
        );

        window.location.href = `mailto:${companyData.contactEmail}?subject=${subject}&body=${body}`;

        setLeadSubmitted(true);
        setLeadForm({ name: '', email: '', phone: '' });
    };

    return (
        <div className="animate-in fade-in duration-700">
            <Section className="pt-32 pb-16">
                <Reveal className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-8">
                        <Cpu className="h-4 w-4 text-purple-400 mr-2" />
                        <span className="text-sm font-medium text-purple-200">{diagnosticData.badge}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">
                        {diagnosticData.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{diagnosticData.titleHighlight}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-12">
                        {diagnosticData.description}
                    </p>
                </Reveal>

                <Reveal delay={200} className="max-w-3xl mx-auto">
                    <GlassCard className="relative overflow-hidden">
                        {isAnalyzing && (
                            <div className="absolute inset-0 bg-blue-500/5 animate-pulse rounded-3xl z-0 pointer-events-none"></div>
                        )}

                        <div className="relative z-10 space-y-6">
                            <label htmlFor="problem" className="block text-lg font-medium text-white">{diagnosticData.inputLabel}</label>

                            {/* Hidden Honeypot Input */}
                            <input
                                type="text"
                                name="company_website_url"
                                tabIndex="-1"
                                autoComplete="off"
                                style={{ position: 'absolute', opacity: 0, height: 0, width: 0, zIndex: -1 }}
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                            />

                            <textarea
                                id="problem"
                                rows="4"
                                value={problemDesc}
                                onChange={(e) => setProblemDesc(e.target.value)}
                                disabled={isAnalyzing}
                                className="w-full px-6 py-5 bg-black/60 border border-white/10 rounded-2xl text-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all placeholder:text-slate-600 resize-y text-lg"
                                placeholder={diagnosticData.inputPlaceholder}
                            />

                            <div className="flex justify-end pt-2">
                                <Button variant="magic" onClick={handleAnalyze} disabled={isAnalyzing || !problemDesc.trim()} className="px-8 py-4">
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                                            {diagnosticData.buttonProcessing}
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-3 h-5 w-5" />
                                            {diagnosticData.buttonAnalyze}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </GlassCard>
                </Reveal>

                {error && (
                    <Reveal className="max-w-3xl mx-auto mt-8">
                        <div className="bg-red-500/10 border border-red-500/30 text-red-200 rounded-2xl p-6 text-center">
                            {error}
                        </div>
                    </Reveal>
                )}

                {result && !isAnalyzing && (
                    <Reveal className="max-w-3xl mx-auto mt-12 space-y-8">
                        {/* Tarjeta de Resultados */}
                        <GlassCard className="border-purple-500/30 bg-purple-900/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>

                            <div className="flex items-center mb-6">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-4 shadow-lg shadow-purple-500/20">
                                    <Sparkles className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">{diagnosticData.resultTitle}</h3>
                            </div>

                            <div className="space-y-6 text-slate-300 font-light text-lg leading-relaxed relative z-10">
                                {result.split('\n\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>

                            {/* Botones de Acción Posterior (Idea 3 y Demo) */}
                            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center text-sm text-slate-400 hover:text-white transition-colors py-2"
                                >
                                    {leadCopied ? (
                                        <><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Copiado al portapapeles</>
                                    ) : (
                                        <><FileText className="w-4 h-4 mr-2" /> Copiar Resumen Ejecutivo</>
                                    )}
                                </button>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button variant="primary" onClick={() => navigate(routes.CONTACT)}>{diagnosticData.ctaButton}</Button>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Módulo de Lead Gen Integrado (Idea 1) */}
                        {!leadSubmitted ? (
                            <GlassCard className="border-blue-500/20 bg-blue-900/5 max-w-2xl mx-auto">
                                <div className="text-center mb-6">
                                    <h4 className="text-xl font-semibold text-white mb-2">¿Te hace sentido esta recomendación?</h4>
                                    <p className="text-slate-400 font-light text-sm">Déjanos tus datos y un especialista te contactará con los detalles técnicos y tiempos de implementación.</p>
                                </div>
                                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Tu nombre completo"
                                            className="flex-grow px-5 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:ring-1 focus:ring-blue-500 outline-none placeholder:text-slate-600 text-sm"
                                            value={leadForm.name}
                                            onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <input
                                            type="email"
                                            required
                                            placeholder="Tu correo corporativo"
                                            className="flex-grow px-5 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:ring-1 focus:ring-blue-500 outline-none placeholder:text-slate-600 text-sm"
                                            value={leadForm.email}
                                            onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                                        />
                                        <input
                                            type="tel"
                                            required
                                            placeholder="Tu teléfono corporativo"
                                            className="flex-grow px-5 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:ring-1 focus:ring-blue-500 outline-none placeholder:text-slate-600 text-sm"
                                            value={leadForm.phone}
                                            onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                                        />
                                        <Button type="submit" variant="secondary" className="px-6">Contactarme</Button>
                                    </div>
                                </form>
                            </GlassCard>
                        ) : (
                            <div className="max-w-2xl mx-auto bg-green-500/10 border border-green-500/30 text-green-200 rounded-2xl p-6 flex items-center justify-center backdrop-blur-md">
                                <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                                <span>Información recibida. Un consultor se comunicará pronto.</span>
                            </div>
                        )}
                    </Reveal>
                )}
            </Section>
        </div>
    );
};

const Contact = ({ navigate }) => {
    const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', message: '' });
    const [formSuccess, setFormSuccess] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construir el cuerpo del correo con los datos del formulario
        const subject = encodeURIComponent(`Nuevo contacto desde sitio web: ${formData.name}`);
        const body = encodeURIComponent(
            `Nombre: ${formData.name}\n` +
            `Empresa: ${formData.company}\n` +
            `Correo: ${formData.email}\n` +
            `Teléfono: ${formData.phone}\n\n` +
            `Mensaje/Contexto:\n${formData.message}`
        );

        // Abrir el cliente de correo predeterminado
        window.location.href = `mailto:${companyData.contactEmail}?subject=${subject}&body=${body}`;

        // Mostrar éxito en la UI
        setFormSuccess(true);
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });

        setTimeout(() => {
            setFormSuccess(false);
        }, 5000);
    };

    return (
        <div className="animate-in fade-in duration-700">
            <Section className="pt-32 pb-16">
                <Reveal className="max-w-4xl text-center mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">{contactData.header.title}</h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
                        {contactData.header.description}
                    </p>
                </Reveal>
            </Section>

            <Section className="pt-0">
                <div className="grid md:grid-cols-5 gap-12 lg:gap-24">
                    <div className="md:col-span-3">
                        <Reveal>
                            {formSuccess && (
                                <div className="mb-8 bg-white/5 border border-green-500/30 text-white rounded-2xl p-6 flex items-start backdrop-blur-md">
                                    <CheckCircle className="h-6 w-6 mr-4 mt-0.5 shrink-0 text-green-400" />
                                    <div>
                                        <h4 className="font-semibold text-lg">{contactData.form.successTitle}</h4>
                                        <p className="text-slate-400 font-light mt-1">{contactData.form.successMessage}</p>
                                    </div>
                                </div>
                            )}

                            <GlassCard>
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">{contactData.form.labels.name}</label>
                                            <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-xl text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600" placeholder={contactData.form.labels.namePlaceholder} />
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">{contactData.form.labels.company}</label>
                                            <input required type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-xl text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600" placeholder={contactData.form.labels.companyPlaceholder} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">{contactData.form.labels.email}</label>
                                            <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-xl text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600" placeholder={contactData.form.labels.emailPlaceholder} />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">{contactData.form.labels.phone}</label>
                                            <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-xl text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600" placeholder={contactData.form.labels.phonePlaceholder} />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">{contactData.form.labels.message}</label>
                                        <textarea required id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-xl text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 resize-y" placeholder={contactData.form.labels.messagePlaceholder}></textarea>
                                    </div>

                                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <p className="text-xs text-slate-500 font-light max-w-sm">
                                            {contactData.form.disclaimerPref} <button type="button" onClick={() => navigate(routes.PRIVACY)} className="text-slate-300 underline underline-offset-4 hover:text-white">{contactData.form.disclaimerLinkText}</button>{contactData.form.disclaimerPost}
                                        </p>
                                        <Button type="submit" className="w-full sm:w-auto px-10">{contactData.form.submitButton}</Button>
                                    </div>
                                </form>
                            </GlassCard>
                        </Reveal>
                    </div>

                    <div className="md:col-span-2">
                        <Reveal delay={200}>
                            <div className="space-y-12">
                                <div>
                                    <h3 className="text-sm font-semibold tracking-widest uppercase text-slate-500 mb-6">{contactData.contactInfo.channelsTitle}</h3>
                                    <div className="space-y-6">
                                        {/* Este mapping se podría hacer dinámico, por ahora lo dejamos semi estático usando los datos de config y contactData para mantener íconos */}
                                        <div className="flex items-start group">
                                            <div className="p-3 bg-white/5 rounded-xl border border-white/10 mr-4 group-hover:bg-white/10 transition-colors">
                                                <Mail className="h-6 w-6 text-slate-300" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-400 mb-1">Email Comercial</p>
                                                <a href={`mailto:${companyData.contactEmail}`} className="text-white hover:text-blue-400 transition-colors">{companyData.contactEmail}</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start group">
                                            <div className="p-3 bg-white/5 rounded-xl border border-white/10 mr-4 group-hover:bg-white/10 transition-colors">
                                                <Phone className="h-6 w-6 text-slate-300" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-400 mb-1">Línea Directa / WhatsApp</p>
                                                <span className="text-white">{companyData.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold tracking-widest uppercase text-slate-500 mb-6">{contactData.contactInfo.operationsTitle}</h3>
                                    <div className="flex items-start">
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 mr-4">
                                            <Clock className="h-6 w-6 text-slate-300" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-400 mb-1">Horarios</p>
                                            <p className="text-white font-light whitespace-pre-line">{companyData.schedule}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Section>
        </div>
    );
};

// Vistas Legales
const LegalLayout = ({ title, children, lastUpdated }) => (
    <div className="animate-in fade-in duration-700">
        <Section className="pt-32 pb-8 border-b border-white/10">
            <Reveal className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">{title}</h1>
                <p className="text-sm text-slate-500 tracking-wider uppercase">Última actualización: {lastUpdated}</p>
            </Reveal>
        </Section>
        <Section className="py-16">
            <Reveal>
                <div className="max-w-3xl mx-auto prose prose-invert prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-16 prose-h2:text-white prose-h3:text-xl prose-p:text-slate-300 prose-p:font-light prose-p:leading-relaxed prose-li:text-slate-300 prose-li:font-light prose-a:text-blue-400 hover:prose-a:text-blue-300">
                    {children}
                </div>
            </Reveal>
        </Section>
    </div>
);

const Terms = () => (
    <LegalLayout title={termsData.title} lastUpdated={termsData.lastUpdated}>
        <div className="bg-white/5 border border-white/10 p-6 mb-12 rounded-2xl flex items-start">
            <Sparkles className="h-6 w-6 text-yellow-500 mr-4 shrink-0 mt-1" />
            <p className="text-sm text-slate-300 font-light m-0">
                <strong>{termsData.legalNote.split(':')[0]}:</strong> {termsData.legalNote.split(':').slice(1).join(':')}
            </p>
        </div>

        {termsData.sections.map((section, index) => (
            <React.Fragment key={index}>
                <h2>{section.title}</h2>
                {section.content.map((p, i) => <p key={i}>{p}</p>)}
                {section.list && (
                    <ul>
                        {section.list.map((li, i) => <li key={i}>{li}</li>)}
                    </ul>
                )}
            </React.Fragment>
        ))}
    </LegalLayout>
);

const Privacy = () => (
    <LegalLayout title={privacyData.title} lastUpdated={privacyData.lastUpdated}>
        {privacyData.sections.map((section, index) => (
            <React.Fragment key={index}>
                <h2>{section.title}</h2>
                {section.content && section.content.map((p, i) => <p key={i}>{p}</p>)}
                {section.list && (
                    <ul>
                        {section.list.map((li, i) => <li key={i}>{li}</li>)}
                    </ul>
                )}
                {section.subtitle && <h3>{section.subtitle}</h3>}
                {section.subcontent && section.subcontent.map((p, i) => <p key={i}>{p}</p>)}
                {section.postContent && <p>{section.postContent}</p>}
            </React.Fragment>
        ))}
    </LegalLayout>
);

const DataDeletion = () => (
    <LegalLayout title={dataDeletionData.title} lastUpdated={dataDeletionData.lastUpdated}>
        {dataDeletionData.intro.map((p, i) => <p key={i}>{p}</p>)}

        {dataDeletionData.sections.map((section, index) => (
            <React.Fragment key={index}>
                <h2>{section.title}</h2>
                {section.content && section.content.map((p, i) => <p key={i}><strong>{p.split(':')[0]}:</strong> {p.split(':').slice(1).join(':') || p}</p>)}
                {section.orderedList && (
                    <ol>
                        {section.orderedList.map((li, i) => <li key={i}>{li}</li>)}
                    </ol>
                )}
            </React.Fragment>
        ))}

        <div className="mt-16 text-center">
            <Reveal delay={200}>
                <Button href={`mailto:${companyData.privacyEmail}?subject=Solicitud%20Formal%20de%20Eliminacion%20de%20Datos`} variant="primary" className="py-4 px-8 text-lg">
                    <Mail className="w-5 h-5 mr-3" />
                    {dataDeletionData.buttonText}
                </Button>
            </Reveal>
        </div>
    </LegalLayout>
);

// --- ESTRUCTURA PRINCIPAL (LAYOUT & ROUTER) ---
export default function App() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname || routes.HOME);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [globalDemoConfig, setGlobalDemoConfig] = useState(null);

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Helper to safely compare paths, stripping trailing slashes and handling potential base paths 
    // like /jtech-ai-site/ in GitHub Pages or dev environments.
    const isPathMatch = (routePath, exact = true) => {
        // Normalize the current path
        let normalizedCurrent = currentPath.endsWith('/') && currentPath.length > 1 ? currentPath.slice(0, -1) : currentPath;
        // Normalize the route path
        let normalizedRoute = routePath.endsWith('/') && routePath.length > 1 ? routePath.slice(0, -1) : routePath;

        // If we are on GitHub pages or a subpath (/jtech-ai-site), the current path might look like /jtech-ai-site/demo-chat
        // We check if the current path ends with the route path, which works for both root and subdirectories.
        if (normalizedRoute === routes.HOME) {
            return normalizedCurrent === '/' || normalizedCurrent === '/jtech-ai-site' || normalizedCurrent === '/jtech-ai-site/';
        }

        if (exact) {
            return normalizedCurrent === normalizedRoute || normalizedCurrent.endsWith(normalizedRoute);
        } else {
            return normalizedCurrent.includes(normalizedRoute);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        // Find the matching SEO data
        const currentSeoKey = Object.keys(routes).find(key => isPathMatch(routes[key]));
        const currentSeo = currentSeoKey ? seoData[routes[currentSeoKey]] : seoData[routes.HOME];

        document.title = currentSeo?.title || "JTECH AI SOLUTIONS";

        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = currentSeo?.desc || "";

        setIsMobileMenuOpen(false);
    }, [currentPath]);

    const navigate = (path) => {
        window.history.pushState({}, '', path);
        setCurrentPath(path);
    };

    const NavLink = ({ href, children, isSpecial = false }) => (
        <button
            onClick={() => navigate(href)}
            className={`text-sm font-medium transition-colors duration-300 flex items-center ${isPathMatch(href) ? 'text-white' : 'text-slate-400 hover:text-white'} ${isSpecial ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300' : ''}`}
        >
            {isSpecial && <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-400" />}
            {children}
        </button>
    );

    const isSqueezePage = isPathMatch(routes.LANDING_EMMA);

    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-300 bg-[#030712] selection:bg-blue-500/30 selection:text-white relative overflow-hidden">

            {/* ORBES DE FONDO FUTURISTAS (GLOBALES) */}
            {!isSqueezePage && (
                <>
                    <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none z-0"></div>
                    <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none z-0"></div>
                </>
            )}

            {/* HEADER FIJO (GLASS) */}
            {!isSqueezePage && (
                <header className="fixed top-0 w-full bg-[#030712]/60 backdrop-blur-xl border-b border-white/5 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => navigate(routes.HOME)}>
                                <span className="font-extrabold text-2xl tracking-tighter text-white">
                                    {companyData.shortName.split(' ')[0]}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-normal"> {companyData.shortName.split(' ')[1]}</span>
                                </span>
                            </div>

                            {/* Desktop Nav */}
                            <nav className="hidden md:flex space-x-10 items-center">
                                <NavLink href={routes.HOME}>Inicio</NavLink>
                                <NavLink href={routes.PRODUCTS}>Tecnología</NavLink>
                                <NavLink href={routes.DIAGNOSTIC} isSpecial={true}>Hablar con EMMA</NavLink>
                                <NavLink href={routes.CONTACT}>Contacto</NavLink>
                                <Button onClick={() => navigate(routes.DEMO_CHAT)} variant="secondary" className="px-5 py-2 text-sm flex items-center bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 border-blue-500/30 font-semibold shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                    <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
                                    Ver Demo
                                </Button>
                            </nav>

                            {/* Mobile Menu Button */}
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="text-slate-400 hover:text-white focus:outline-none transition-colors p-2"
                                    aria-label="Toggle menu"
                                >
                                    {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Nav */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-white/5 absolute w-full left-0 animate-in slide-in-from-top-4 duration-300 shadow-2xl">
                            <div className="px-6 pt-4 pb-8 space-y-6 flex flex-col">
                                <button onClick={() => navigate(routes.HOME)} className={`text-left text-2xl font-bold tracking-tight ${currentPath === routes.HOME ? 'text-white' : 'text-slate-500'}`}>Inicio</button>
                                <button onClick={() => navigate(routes.PRODUCTS)} className={`text-left text-2xl font-bold tracking-tight ${currentPath.startsWith(routes.PRODUCTS) ? 'text-white' : 'text-slate-500'}`}>Tecnología</button>
                                <button onClick={() => navigate(routes.DEMO_CHAT)} className={`text-left text-2xl font-bold tracking-tight flex items-center ${currentPath === routes.DEMO_CHAT ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500' : 'text-blue-400'}`}>
                                    <Sparkles className={`w-5 h-5 mr-3 ${currentPath === routes.DEMO_CHAT ? 'text-blue-400' : 'text-blue-500'}`} /> Ver Demo
                                </button>
                                <button onClick={() => navigate(routes.DIAGNOSTIC)} className={`text-left text-2xl font-bold tracking-tight ${currentPath === routes.DIAGNOSTIC ? 'text-white' : 'text-slate-500'}`}>Hablar con EMMA</button>
                                <button onClick={() => navigate(routes.CONTACT)} className={`text-left text-2xl font-bold tracking-tight ${currentPath === routes.CONTACT ? 'text-white' : 'text-slate-500'}`}>Contacto</button>
                            </div>
                        </div>
                    )}
                </header>
            )}

            {/* CONTENIDO PRINCIPAL (ROUTER VIEW) */}
            <main className="flex-grow">
                {isPathMatch(routes.HOME) && <Home navigate={navigate} />}
                {isPathMatch(routes.PRODUCTS) && <Products navigate={navigate} />}
                {isPathMatch(routes.PRODUCT_EMMA) && <ProductEmma navigate={navigate} />}
                {isPathMatch(routes.PRODUCT_MEDSHIFT) && <ProductMedshift navigate={navigate} />}
                {isPathMatch(routes.CONTACT) && <Contact navigate={navigate} />}
                {isPathMatch(routes.DIAGNOSTIC) && <Diagnostic navigate={navigate} globalDemoConfig={globalDemoConfig} setGlobalDemoConfig={setGlobalDemoConfig} />}
                {isPathMatch(routes.DEMO_CHAT) && <WhatsAppDemo navigate={navigate} demoConfig={globalDemoConfig} />}
                {isPathMatch(routes.DEMO_MEDSHIFT) && <MedshiftDemo navigate={navigate} />}
                {isPathMatch(routes.LANDING_EMMA) && <EmmaLanding navigate={navigate} />}
                {isPathMatch(routes.TERMS) && <Terms />}
                {isPathMatch(routes.PRIVACY) && <Privacy />}
                {isPathMatch(routes.DATA_DELETION) && <DataDeletion />}

                {/* 404 Fallback - Only show if NO routes matched */}
                {!Object.values(routes).some(r => isPathMatch(r)) && (
                    <Section className="pt-40 text-center min-h-[70vh] flex flex-col justify-center items-center">
                        <div className="text-9xl font-black text-white/5 mb-8 tracking-tighter">404</div>
                        <p className="text-2xl text-slate-400 mb-12 font-light">Señal perdida. Sector no encontrado.</p>
                        <Button onClick={() => navigate(routes.HOME)}>Regresar a base</Button>
                    </Section>
                )}
            </main>

            {/* FOOTER GLOBAL */}
            {!isSqueezePage && (
                <footer className="border-t border-white/5 bg-black/40 backdrop-blur-md pt-16 pb-8 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                            <div className="col-span-1 md:col-span-2">
                                <span className="font-extrabold text-2xl tracking-tighter text-white block mb-6">
                                    {companyData.name.split(' ')[0]}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-normal"> {companyData.name.split(' ').slice(1).join(' ')}</span>
                                </span>
                                <p className="text-slate-400 font-light max-w-sm leading-relaxed">
                                    {companyData.footerDescription}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white tracking-widest uppercase text-xs mb-6">Navegación</h4>
                                <ul className="space-y-4 text-sm font-light text-slate-400">
                                    <li><button onClick={() => navigate(routes.HOME)} className="hover:text-white transition-colors">Inicio</button></li>
                                    <li><button onClick={() => navigate(routes.PRODUCTS)} className="hover:text-white transition-colors">Portafolio Tecnológico</button></li>
                                    <li><button onClick={() => navigate(routes.DIAGNOSTIC)} className="hover:text-white transition-colors flex items-center"><Sparkles className="w-3 h-3 mr-1.5 text-blue-400" /> Hablar con EMMA</button></li>
                                    <li><button onClick={() => navigate(routes.CONTACT)} className="hover:text-white transition-colors">Ventas y Contacto</button></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white tracking-widest uppercase text-xs mb-6">Seguridad Legal</h4>
                                <ul className="space-y-4 text-sm font-light text-slate-400">
                                    <li><button onClick={() => navigate(routes.TERMS)} className="hover:text-white transition-colors flex items-center"><FileText className="h-4 w-4 mr-2 opacity-50" /> Términos de Servicio</button></li>
                                    <li><button onClick={() => navigate(routes.PRIVACY)} className="hover:text-white transition-colors flex items-center"><ShieldCheck className="h-4 w-4 mr-2 opacity-50" /> Privacidad y Datos</button></li>
                                    <li><button onClick={() => navigate(routes.DATA_DELETION)} className="hover:text-white transition-colors flex items-center text-white font-medium"><Database className="h-4 w-4 mr-2 text-blue-400" /> Eliminación de Datos</button></li>
                                </ul>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-xs text-slate-600 font-light uppercase tracking-wider">
                                &copy; {companyData.copyrightYear} {companyData.name}. Todos los derechos reservados.
                            </p>
                        </div>
                    </div>
                </footer>
            )}

        </div>
    );
}