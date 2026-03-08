import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Sparkles, MapPin, Calendar, User, Phone, CheckCircle2, ShieldCheck, FileText, DollarSign, HelpCircle, ArrowRight, Play, Loader2, Send } from 'lucide-react';
import { routes } from '../data/config';
import { EMMA_SCENARIOS, TYPING_SPEED_PER_CHAR, BASE_DELAY } from '../data/demo';

// ---------------------------------------------
// 2. COMPONENTE PRINCIPAL
// ---------------------------------------------
export default function WhatsAppDemo({ navigate }) {
    const [activeScenarioId, setActiveScenarioId] = useState(EMMA_SCENARIOS[0].id);
    const [messages, setMessages] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeMsgIndex, setActiveMsgIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll inside the phone
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [messages, isTyping]);

    // Cleanup timers strictly
    const playbackTimerRef = useRef(null);
    useEffect(() => {
        return () => clearTimeout(playbackTimerRef.current);
    }, []);

    // ---------------------------------------------
    // MOTOR DE REPRODUCCIÓN (STATE MACHINE)
    // ---------------------------------------------
    const activeScenario = EMMA_SCENARIOS.find(s => s.id === activeScenarioId) || EMMA_SCENARIOS[0];

    // Starts the sequence when user clicks a scenario
    const playScenario = (scenarioId) => {
        clearTimeout(playbackTimerRef.current);
        setActiveScenarioId(scenarioId);
        setMessages([]);
        setActiveMsgIndex(0);
        setIsTyping(false);
        setIsPlaying(true);
    };

    // The Recursive Player Engine
    useEffect(() => {
        if (!isPlaying) return;

        const script = activeScenario.script;

        if (activeMsgIndex >= script.length) {
            // Reached the end
            setIsPlaying(false);
            setIsTyping(false);
            return;
        }

        const nextMessage = script[activeMsgIndex];
        const isUser = nextMessage.sender === 'user';

        // 1. Determine read/type delay based on previous message or base timing
        // If the bot is replying to user, add thinking time.
        // If it's a sequence of bot messages, slightly shorter.
        let thinkDelay = BASE_DELAY;
        if (nextMessage.text) {
            thinkDelay += nextMessage.text.length * TYPING_SPEED_PER_CHAR;
        } else {
            thinkDelay += 1000; // static cards take a standard time
        }

        // Limit maximum delay so it is not incredibly slow for long messages
        if (thinkDelay > 3000) thinkDelay = 3000;

        // Users "type" faster in simulations for better UX 
        if (isUser) thinkDelay = 800;

        // Start typing indicator
        setIsTyping(true);

        playbackTimerRef.current = setTimeout(() => {
            // Typing finished. Commit message.
            setIsTyping(false);
            setMessages(prev => [...prev, { ...nextMessage, id: Date.now() }]);

            // Advance to next index -> automatically triggers this useEffect again
            setActiveMsgIndex(prev => prev + 1);

        }, thinkDelay);

    }, [activeMsgIndex, isPlaying, activeScenario]);


    // ---------------------------------------------
    // RENDERIZADORES DE BURBUJAS 
    // ---------------------------------------------
    const renderMessageContent = (msg) => {
        if (msg.type === 'document') {
            return (
                <div className="space-y-2 cursor-pointer group">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flexItems-center transition-colors group-hover:bg-red-500/20">
                        <div className="flex items-center">
                            <div className="bg-red-500 text-white rounded p-2 mr-3 shrink-0">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-white text-sm font-medium truncate">{msg.title}</p>
                                <p className="text-slate-400 text-xs mt-0.5">{msg.size} • PDF Document</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (msg.type === 'appointment') {
            return (
                <div className="bg-black/40 border border-white/5 rounded-xl p-4 mt-1">
                    <div className="flex items-center text-blue-400 mb-2">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span className="font-medium">Sesión de Arquitectura IA</span>
                    </div>
                    <p className="text-slate-300 text-sm mb-1">Mañana, 10:00 AM (COT)</p>
                    <p className="text-slate-400 text-xs">Vía Microsoft Teams</p>
                    <button className="mt-3 w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 rounded-lg py-2 text-sm font-medium transition-colors flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Agendado Exitosamente
                    </button>
                </div>
            );
        }

        if (msg.type === 'contact') {
            return (
                <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex items-center mt-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4 shadow-lg shrink-0">
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h4 className="text-white font-medium">Especialista JTECH</h4>
                        <p className="text-slate-400 text-xs mt-0.5">Arquitectura & Negocios</p>
                        <div className="flex mt-2 gap-2">
                            <button className="bg-white/10 hover:bg-white/20 p-1.5 rounded-md transition-colors"><Phone className="w-4 h-4 text-blue-300" /></button>
                            <span className="text-xs text-blue-400 font-medium py-1.5 px-2 bg-blue-500/10 rounded-md">Guardar VCard</span>
                        </div>
                    </div>
                </div>
            );
        }

        if (msg.type === 'location') {
            return (
                <div className="bg-black/40 border border-white/5 rounded-xl p-3 mt-1 overflow-hidden relative group cursor-pointer">
                    <div className="h-24 bg-slate-800 flex items-center justify-center rounded-lg mb-2 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                        <MapPin className="w-8 h-8 text-red-500 relative z-10 animate-bounce" />
                    </div>
                    <h4 className="text-white text-sm font-medium">Sede Operativa JTECH</h4>
                    <p className="text-slate-400 text-xs">Ver en App de Mapas</p>
                </div>
            );
        }

        // Default Text Message
        return <p className="leading-relaxed">{msg.text}</p>;
    };

    // ---------------------------------------------
    // UI DEL LAYOUT PRINCIPAL
    // ---------------------------------------------
    return (
        <div className="min-h-screen bg-[#030712] flex flex-col pt-20 pb-0">
            {/* Título de Cabecera Móvil y Back */}
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2 md:pb-6 flex items-center justify-between">
                <div>
                    <button
                        onClick={() => navigate(routes.HOME)}
                        className="text-slate-400 hover:text-white flex items-center transition-colors text-sm font-medium mb-2"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Inicio
                    </button>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center">
                        <Sparkles className="w-6 h-6 mr-3 text-blue-400" /> Simulador EMMA ServiceOps
                    </h1>
                </div>
            </div>

            {/* Contenedor Split-Screen */}
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col lg:flex-row gap-8 pb-8">

                {/* 1. Panel Izquierdo: Menú de Escenarios */}
                <div className="w-full lg:w-1/3 flex flex-col gap-3 shrink-0">
                    <p className="text-slate-400 text-sm font-light mb-2">
                        Selecciona un flujo preconcebido para simular la experiencia que tendrían tus clientes al interactuar con el Gemelo Digital por canales como WhatsApp o Webchat.
                    </p>

                    {EMMA_SCENARIOS.map((scenario) => (
                        <button
                            key={scenario.id}
                            onClick={() => playScenario(scenario.id)}
                            className={`
                                flex items-start text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group
                                ${activeScenarioId === scenario.id
                                    ? 'bg-blue-600/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
                                }
                            `}
                        >
                            <div className={`
                                p-2 rounded-lg shrink-0 mr-4 transition-colors
                                ${activeScenarioId === scenario.id ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10'}
                            `}>
                                {scenario.icon}
                            </div>
                            <div>
                                <h3 className={`font-semibold mb-1 transition-colors ${activeScenarioId === scenario.id ? 'text-white' : 'text-slate-300'}`}>{scenario.title}</h3>
                                <p className="text-xs text-slate-500 font-light leading-relaxed">{scenario.desc}</p>
                            </div>

                            {activeScenarioId === scenario.id && isPlaying && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin opacity-50" />
                                </div>
                            )}
                            {activeScenarioId !== scenario.id && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                                    <Play className="w-4 h-4 text-slate-400 fill-slate-400" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* 2. Panel Derecho: Simulador (Cáscara del Teléfono) */}
                <div className="w-full lg:w-2/3 flex justify-center lg:justify-end">
                    <div className="w-full max-w-md h-[75vh] min-h-[600px] flex flex-col relative border border-white/10 rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] shadow-[0_0_50px_rgba(0,0,0,0.5)]">

                        {/* Header del Teléfono */}
                        <div className="bg-white/[0.03] backdrop-blur-xl border-b border-white/5 px-4 py-4 pt-6 flex items-center shrink-0 z-20">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mr-3 shrink-0">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <h2 className="text-white font-semibold text-base truncate">EMMA</h2>
                                <p className="text-green-400 text-xs font-medium">Verificada Corporativa</p>
                            </div>
                        </div>

                        {/* Área de Mensajes del Chat */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-5 scroll-smooth relative" style={{ background: 'radial-gradient(circle at 50% 120%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)' }}>
                            <div className="flex justify-center mb-4">
                                <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500/80 text-[10px] px-3 py-1 rounded-full flex items-center uppercase tracking-wider font-medium">
                                    <ShieldCheck className="w-3 h-3 mr-1" />
                                    Reproducción Simulación Base
                                </div>
                            </div>

                            {messages.length === 0 && !isTyping && !isPlaying && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/40 backdrop-blur-[2px] z-10 transition-opacity">
                                    <ArrowLeft className="w-8 h-8 text-blue-500/50 mb-4 lg:hidden" />
                                    <ArrowRight className="w-8 h-8 text-blue-500/50 mb-4 hidden lg:block" />
                                    <p className="text-slate-400 text-sm font-medium">Selecciona un escenario en el panel para iniciar la reproducción automatizada.</p>
                                </div>
                            )}

                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`
                                            max-w-[85%] rounded-2xl px-4 py-3 text-[14px] shadow-lg
                                            ${msg.sender === 'user'
                                                ? 'bg-blue-600 text-white rounded-tr-sm'
                                                : 'bg-white/5 border border-white/5 text-slate-200 rounded-tl-sm backdrop-blur-md'
                                            }
                                        `}
                                    >
                                        {/* Name Label specifically for User for clarity */}
                                        {msg.sender === 'user' && (
                                            <p className="text-[10px] text-blue-200/60 uppercase font-black tracking-widest mb-1 pb-1 border-b border-blue-400/20">Tu Cliente</p>
                                        )}
                                        {renderMessageContent(msg)}
                                        <div className={`text-[10px] mt-1.5 text-right ${msg.sender === 'user' ? 'text-blue-200 opacity-80' : 'text-slate-500'}`}>
                                            10:00 AM
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 backdrop-blur-md flex items-center space-x-1 shadow-lg">
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Footer Falso Bar */}
                        <div className="bg-[#0A0A0A] border-t border-white/5 p-4 shrink-0 relative z-20 pointer-events-none opacity-50">
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-white/5 border border-white/10 rounded-full h-10 flex items-center px-4 text-slate-500 text-xs">
                                    El flujo está en piloto automático...
                                </div>
                                <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                                    <Send className="w-4 h-4 ml-0.5" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
