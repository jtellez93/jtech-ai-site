import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle, BrainCircuit, ShieldCheck, ChevronRight } from 'lucide-react';
import { routes, companyData } from '../data/config';
import { emmaLandingData } from '../data/landing';

// Componente animado local
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

const chatSimulations = [
    {
        messages: [
            "Hola, me interesa agendar una cita para cotizar un plan corporativo.",
            "¿Hola? Necesitaba definir esto hoy mismo para la junta gerencial.",
            "Dejen así, acabo de cerrar contrato con la competencia."
        ],
        badge: "Venta de alto valor perdida (Lentitud en respuestas)",
        badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
        glow: "rgba(239, 68, 68, 0.05)" // Red glow
    },
    {
        messages: [
            "Hola, ¿dónde están ubicados?",
            "¿Tienen citas de valoración para mañana?",
            "¿Cuáles son sus métodos de pago?"
        ],
        badge: "Tiempo humano desperdiciado (Consultas repetitivas)",
        badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
        glow: "rgba(249, 115, 22, 0.05)" // Orange glow
    },
    {
        messages: [
            "Domingo 03:15 AM - Se cayó mi servidor, necesito soporte urgente.",
            "Domingo 03:45 AM - ¿Hola? ¡Estamos perdiendo ventas!",
            "Auto-respuesta: Nuestro horario de atención es de L-V."
        ],
        badge: "Cliente frustrado (Atención pausada por horario)",
        badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        glow: "rgba(168, 85, 247, 0.05)" // Purple glow
    }
];

export default function EmmaLanding({ navigate }) {

    const [activeSimIndex, setActiveSimIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSimIndex((prev) => (prev + 1) % chatSimulations.length);
        }, 5000); // Cycle every 5 seconds
        return () => clearInterval(interval);
    }, []);

    // Smooth scroll para el CTA de agendamiento (si decidimos bajarlo a contacto)
    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const mailtoSubject = encodeURIComponent("Agendar Consultoría para EMMA ServiceOps");
    const mailtoBody = encodeURIComponent(`Hola equipo de JTECH,

Me gustaría agendar una breve consultoría para conocer más sobre EMMA ServiceOps y cómo puede ayudar a automatizar nuestro servicio al cliente.

Mis datos de contacto son:
- Nombre: [Escribe tu Nombre]
- Empresa: [Escribe tu Empresa]
- Teléfono: [Escribe tu WhatsApp]

Quedo atento(a), gracias.`);

    return (
        <div className="min-h-screen bg-[#030712] font-sans text-slate-300 selection:bg-purple-500/30 selection:text-white relative overflow-hidden">

            {/* Minimal Header (No Navigation!) */}
            <header className="absolute top-0 w-full z-50 p-6 md:p-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center cursor-pointer group" onClick={() => navigate(routes.HOME)}>
                    <span className="font-extrabold text-2xl tracking-tighter text-white">
                        {companyData.name.split(' ')[0]}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-normal"> {companyData.name.split(' ').slice(1).join(' ')}</span>
                    </span>
                </div>
            </header>

            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[150px] pointer-events-none z-0"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[50%] rounded-full bg-blue-900/10 blur-[150px] pointer-events-none z-0"></div>

            {/* 1. HERO SECTION (Atención Inmediata) */}
            <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 flex flex-col items-center text-center">
                <Reveal>
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-8">
                        <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
                        <span className="text-purple-300 text-sm font-semibold tracking-wide uppercase">{emmaLandingData.hero.badge}</span>
                    </div>
                </Reveal>

                <Reveal delay={100}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-tight mb-8 max-w-5xl">
                        {emmaLandingData.hero.headline}
                    </h1>
                </Reveal>

                <Reveal delay={200}>
                    <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl mb-12">
                        {emmaLandingData.hero.subheadline}
                    </p>
                </Reveal>

                <Reveal delay={300} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button
                        onClick={() => navigate(routes.DEMO_CHAT)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center group"
                    >
                        {emmaLandingData.hero.primaryCta}
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                    {/* Secondary CTA goes to mailto for fast booking */}
                    <a
                        href={`mailto:${companyData.contactEmail}?subject=${mailtoSubject}&body=${mailtoBody}`}
                        className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium text-lg px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center"
                    >
                        {emmaLandingData.hero.secondaryCta}
                    </a>
                </Reveal>

                {/* Trust/Social Proof fast metrics */}
                <Reveal delay={400} className="mt-20 pt-10 border-t border-white/5 w-full">
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-8">{emmaLandingData.socialProof.title}</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-80">
                        {emmaLandingData.socialProof.stats.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">{stat.value}</span>
                                <span className="text-sm text-slate-400 mt-2 font-medium">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>

            {/* 2. AGITACIÓN DEL DOLOR (Problema) */}
            <section className="py-24 bg-black/40 relative z-10 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
                    <Reveal className="lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            {emmaLandingData.problem.title}
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed font-light mb-8">
                            {emmaLandingData.problem.description}
                        </p>
                        <ul className="space-y-4">
                            {emmaLandingData.problem.painPoints.map((point, i) => (
                                <li key={i} className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    </div>
                                    <span className="text-slate-300">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>

                    <Reveal className="lg:w-1/2 w-full" delay={200}>
                        <div className="bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-2xl relative overflow-hidden group h-[380px] flex items-center shadow-2xl">
                            {/* Glow estelar animado basado en la simulación activa */}
                            <div
                                className="absolute inset-0 transition-colors duration-1000"
                                style={{ backgroundColor: chatSimulations[activeSimIndex].glow }}
                            ></div>

                            <div className="relative z-10 w-full px-4 sm:px-8">
                                {chatSimulations.map((sim, index) => (
                                    <div
                                        key={index}
                                        className={`absolute w-full left-0 px-4 sm:px-8 top-1/2 transition-all duration-700 ease-in-out ${activeSimIndex === index ? 'opacity-100 translate-y-[-50%] z-10 scale-100' : 'opacity-0 translate-y-[-40%] pointer-events-none z-0 scale-95'
                                            }`}
                                    >
                                        <div className="space-y-4 opacity-90">
                                            {sim.messages.map((msg, mIdx) => (
                                                <div key={mIdx} className="clear-both">
                                                    <div className="bg-slate-800/80 backdrop-blur-sm shadow-xl rounded-2xl rounded-tl-none p-4 max-w-[90%] float-left border border-white/5">
                                                        <p className="text-sm text-slate-200">{msg}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="clear-both"></div>
                                            <div className={`text-xs font-semibold py-2 px-4 rounded-full mx-auto w-fit mt-6 border shadow-lg ${sim.badgeColor}`}>
                                                {sim.badge}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* 3. SOLUCIÓN (Características Clave) */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Reveal>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            {emmaLandingData.solution.title}
                        </h2>
                        <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto mb-16">
                            {emmaLandingData.solution.description}
                        </p>
                    </Reveal>

                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {emmaLandingData.solution.features.map((feature, i) => (
                            <Reveal key={i} delay={i * 150}>
                                <div className="bg-white/[0.03] border border-white/[0.08] p-8 rounded-3xl hover:bg-white/[0.06] transition-all hover:-translate-y-1 h-full">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                                        {i === 0 && <ShieldCheck className="w-6 h-6 text-purple-400" />}
                                        {i === 1 && <BrainCircuit className="w-6 h-6 text-purple-400" />}
                                        {i === 2 && <Sparkles className="w-6 h-6 text-purple-400" />}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-slate-400 font-light leading-relaxed">{feature.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CTA FINAL (Bottom of Funnel) */}
            <section className="py-24 bg-gradient-to-b from-transparent to-black relative z-10 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Reveal>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                            {emmaLandingData.cta.title}
                        </h2>
                        <p className="text-xl text-slate-400 font-light mb-10 max-w-2xl mx-auto">
                            {emmaLandingData.cta.description}
                        </p>
                        <button
                            onClick={() => navigate(routes.DEMO_CHAT)}
                            className="bg-white text-black hover:bg-slate-200 font-bold text-lg md:text-xl px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                        >
                            {emmaLandingData.cta.buttonText}
                        </button>
                        <p className="text-slate-500 text-sm mt-6 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 mr-2" /> {emmaLandingData.cta.disclaimer}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Minimal Footer for Squeeze Page */}
            <footer className="py-8 border-t border-white/5 bg-black text-center text-slate-600 text-sm relative z-10">
                <p>&copy; {new Date().getFullYear()} {companyData.name}. Todos los derechos reservados.</p>
                <div className="mt-2 flex justify-center space-x-4">
                    <button onClick={() => navigate(routes.PRIVACY)} className="hover:text-slate-400 transition-colors">Política de Privacidad</button>
                    <button onClick={() => navigate(routes.TERMS)} className="hover:text-slate-400 transition-colors">Términos de Servicio</button>
                </div>
            </footer>
        </div>
    );
}
