import React, { useState } from 'react';
import { ArrowLeft, Stethoscope, Mail, CheckCircle, Building, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { routes, companyData } from '../data/config';
import { MEDSHIFT_DEMO_DATA } from '../data/demo';

export default function MedshiftDemo({ navigate }) {
    const [formState, setFormState] = useState({
        name: '',
        clinic: '',
        email: '',
        phone: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simular un delay para la UX y luego disparar el cliente de correo ancla
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);

            const subject = encodeURIComponent(`Solicitud Acceso Portal Demo Medshift - ${formState.clinic}`);
            const body = encodeURIComponent(
                `Hola equipo JTECH,\n\n` +
                `Por favor provisionar un entorno en el Portal Demo de Medshift Optimizer.\n\n` +
                `-- Datos del Contacto --\n` +
                `Nombre: ${formState.name}\n` +
                `Institución: ${formState.clinic}\n` +
                `Correo: ${formState.email}\n` +
                `Teléfono: ${formState.phone}\n\n` +
                `Quedo atento a las credenciales.\n\n` +
                `Saludos.`
            );

            window.location.href = `mailto:${companyData.contactEmail}?subject=${subject}&body=${body}`;
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#030712] flex flex-col pt-20 pb-0">
            {/* Cabecera Móvil y Back */}
            <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2 md:pb-6 flex items-center justify-between">
                <div>
                    <button
                        onClick={() => navigate(routes.PRODUCT_MEDSHIFT)}
                        className="text-slate-400 hover:text-white flex items-center transition-colors text-sm font-medium mb-2"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> {MEDSHIFT_DEMO_DATA.header.backButton}
                    </button>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center">
                        <Stethoscope className="w-6 h-6 mr-3 text-cyan-400" /> {MEDSHIFT_DEMO_DATA.header.title}
                    </h1>
                </div>
            </div>

            {/* Contenedor Principal */}
            <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col pb-12">

                <div className="text-center mt-6 mb-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                        {MEDSHIFT_DEMO_DATA.header.mainHeading}
                    </h2>
                    <p className="text-slate-400 text-lg font-light leading-relaxed">
                        {MEDSHIFT_DEMO_DATA.header.description.split('**').map((part, index) =>
                            index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                        )}
                    </p>
                </div>

                {/* Formulario / Tarjeta de Éxito */}
                <div className="max-w-lg mx-auto w-full bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    {/* Elemento Decorativo */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">

                            {/* Input Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5 flex items-center">
                                    <User className="w-4 h-4 mr-2 text-slate-500" /> {MEDSHIFT_DEMO_DATA.form.nameLabel}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formState.name}
                                    onChange={handleChange}
                                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                    placeholder={MEDSHIFT_DEMO_DATA.form.namePlaceholder}
                                />
                            </div>

                            {/* Input Clinic */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5 flex items-center">
                                    <Building className="w-4 h-4 mr-2 text-slate-500" /> {MEDSHIFT_DEMO_DATA.form.clinicLabel}
                                </label>
                                <input
                                    type="text"
                                    name="clinic"
                                    required
                                    value={formState.clinic}
                                    onChange={handleChange}
                                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                    placeholder={MEDSHIFT_DEMO_DATA.form.clinicPlaceholder}
                                />
                            </div>

                            {/* Input Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5 flex items-center">
                                    <Mail className="w-4 h-4 mr-2 text-slate-500" /> {MEDSHIFT_DEMO_DATA.form.emailLabel}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formState.email}
                                    onChange={handleChange}
                                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                    placeholder={MEDSHIFT_DEMO_DATA.form.emailPlaceholder}
                                />
                            </div>

                            {/* Input Phone */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5 flex items-center">
                                    <Phone className="w-4 h-4 mr-2 text-slate-500" /> {MEDSHIFT_DEMO_DATA.form.phoneLabel}
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formState.phone}
                                    onChange={handleChange}
                                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                    placeholder={MEDSHIFT_DEMO_DATA.form.phonePlaceholder}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center transition-all mt-6 
                                    ${isSubmitting ? 'bg-cyan-600/50 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]'}`}
                            >
                                {isSubmitting ? (
                                    <>{MEDSHIFT_DEMO_DATA.form.submitButtonLoading}</>
                                ) : (
                                    <>
                                        {MEDSHIFT_DEMO_DATA.form.submitButtonIdle} <ArrowRight className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center">
                                <ShieldCheck className="w-3 h-3 mr-1" /> {MEDSHIFT_DEMO_DATA.form.securityBadge}
                            </p>
                        </form>
                    ) : (
                        <div className="py-10 flex flex-col items-center text-center relative z-10 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-10 h-10 text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{MEDSHIFT_DEMO_DATA.success.title}</h3>
                            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
                                {MEDSHIFT_DEMO_DATA.success.bodyPart1} <strong>{formState.clinic}</strong>.
                                <br /><br />
                                {MEDSHIFT_DEMO_DATA.success.bodyPart2} <strong>{formState.email}</strong> {MEDSHIFT_DEMO_DATA.success.bodyPart3}
                            </p>
                            <button
                                onClick={() => navigate(routes.HOME)}
                                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-colors"
                            >
                                {MEDSHIFT_DEMO_DATA.success.backButton}
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
