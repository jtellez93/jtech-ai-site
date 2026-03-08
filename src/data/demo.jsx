import React from 'react';
import { FileText, MapPin, DollarSign, HelpCircle, User } from 'lucide-react';

export const TYPING_SPEED_PER_CHAR = 25;
export const BASE_DELAY = 600;

export const EMMA_SCENARIOS = [
    {
        id: 'portfolio',
        title: 'Descarga de Portafolio',
        icon: <FileText className="w-5 h-5" />,
        desc: 'Entrega automática de brochures o documentos en PDF según la intención del cliente.',
        script: [
            { sender: 'bot', text: '¡Hola! Bienvenido a la línea comercial de JTECH AI Solutions. Para darte un mejor servicio, ¿ya eres cliente nuestro o es primera vez?' },
            { sender: 'user', text: 'No, es la primera vez' },
            { sender: 'bot', text: '¡Excelente, bienvenido! Selecciona qué información buscas hoy:' },
            { sender: 'user', text: 'Ver Portafolio de Casos de Uso' },
            { sender: 'bot', text: 'Claro que sí. Aquí tienes nuestro Brochure Interactivo con todos los detalles de cómo EMMA ServiceOps ha reducido los tickets de soporte en un 60%:' },
            { sender: 'bot', type: 'document', title: 'Portafolio_JTECH_AI_2026.pdf', size: '2.4 MB' },
            { sender: 'bot', text: '¿Te gustaría que un asesor te contacte para revisar cómo aplicarlo a la logística de tu empresa?' },
        ]
    },
    {
        id: 'location',
        title: 'Ubicación y Horarios',
        icon: <MapPin className="w-5 h-5" />,
        desc: 'Entrega de ubicaciones geográficas, tarjetas de mapa y reglas de horario laboral.',
        script: [
            { sender: 'bot', text: 'Hola, ¿en qué te puedo ayudar hoy?' },
            { sender: 'user', text: '¿Dónde están ubicados?' },
            { sender: 'bot', text: 'Nuestras oficinas centrales de desarrollo están ubicadas aquí:' },
            { sender: 'bot', type: 'location' },
            { sender: 'bot', text: 'Nuestro horario de atención in-situ es de Lunes a Viernes de 09:00 a 16:00 (COT). Fuera de ese horario, nuestro Centro de Excelencia IA está activo 24/7.' }
        ]
    },
    {
        id: 'pricing',
        title: 'Cotizaciones y Agendamiento',
        icon: <DollarSign className="w-5 h-5" />,
        desc: 'Pre-calificación de leads, captura de variables y agendamiento automático de sesiones.',
        script: [
            { sender: 'bot', text: 'JTECH Virtual Assistant en línea. ¿Cómo puedo asistirte?' },
            { sender: 'user', text: 'Quiero saber cuánto cuesta implementar EMMA' },
            { sender: 'bot', text: 'EMMA ServiceOps tiene un modelo SaaS que escala según el volumen de conversaciones y automatizaciones conectadas de tu equipo. El paquete base corporativo comienza desde $500 USD mensuales.' },
            { sender: 'bot', text: 'Para darte una cotización exacta necesito saber: ¿Cuántos agentes humanos de llamadas o WhatsApp tienen actualmente respondiendo soporte?' },
            { sender: 'user', text: 'Tenemos 5 agentes' },
            { sender: 'bot', text: 'Perfecto. Con ese volumen, el despliegue técnico del Gemelo Digital tomaría apenas 2 semanas.' },
            { sender: 'user', text: 'Agendar cita con ingeniería' },
            { sender: 'bot', type: 'appointment' },
        ]
    },
    {
        id: 'faq',
        title: 'Respuestas Técnicas (FAQ)',
        icon: <HelpCircle className="w-5 h-5" />,
        desc: 'Análisis semántico para responder dudas técnicas puntuales sin flujo de árbol.',
        script: [
            { sender: 'user', text: '¿Ustedes usan ChatGPT estándar o algo propio?' },
            { sender: 'bot', text: 'En JTECH utilizamos una arquitectura agnóstica y enjaulada. Usamos modelos fundacionales avanzados (ej. GPT-4o o Claude 3.5 Sonnet) pero conectados exclusivamente a tus bases de conocimiento privadas bajo estricta seguridad (RAG).' },
            { sender: 'user', text: 'Me interesa. ¿Y cómo aseguran los datos de mis clientes entonces?' },
            { sender: 'bot', text: 'Todos los datos estructurados viajan por bases de datos cifradas y están respaldos por acuerdos SLA donde no se utilizan tus interacciones para entrenar los modelos base globales. Puedes consultar nuestra matriz de seguridad en este documento ejecutivo:' },
            { sender: 'bot', type: 'document', title: 'Matriz_Seguridad_JTECH.pdf', size: '1.1 MB' },
        ]
    },
    {
        id: 'human',
        title: 'Escalado y Transición Humana',
        icon: <User className="w-5 h-5" />,
        desc: 'Transferencia sin fricción a un agente humano cuando hay frustración o solicitud directa.',
        script: [
            { sender: 'bot', text: 'Soporte Comercial JTECH. Ingresa tu consulta:' },
            { sender: 'user', text: 'Tengo un problema muy específico con mi ERP actual y necesito hablar urgentemente con un humano, no quiero máquinas.' },
            { sender: 'bot', text: 'Entiendo perfectamente. Detecto que necesitas una consulta de alto nivel. Pausaré mi intervención y te transferiré inmediatamente con un Especialista humano en Arquitectura de Soluciones.' },
            { sender: 'bot', type: 'contact' },
            { sender: 'bot', text: 'Máximo u otro Especialista revisará el contexto de esta conversación para no hacerte repetir la información. ¡Un segundo!' },
        ]
    }
];

export const MEDSHIFT_DEMO_DATA = {
    header: {
        title: "Demo Medshift SaaS",
        backButton: "Volver a Medshift",
        mainHeading: "Accede a tu Entorno de Pruebas",
        description: "Medshift es un software Core logístico B2B. Para que experimentes el control total de los turnos médicos, prepararemos un **Portal Demo** único para tu institución."
    },
    form: {
        nameLabel: "Nombre del Administrador",
        namePlaceholder: "Ej. Dra. Emma Téllez",
        clinicLabel: "Institución Médica / Clínica",
        clinicPlaceholder: "Nombre del centro de salud",
        emailLabel: "Correo Corporativo",
        emailPlaceholder: "emma@clinicamilan.com",
        phoneLabel: "Teléfono de Contacto",
        phonePlaceholder: "+57 300 000 0000",
        submitButtonIdle: "Solicitar Portal Demo",
        submitButtonLoading: "Preparando Entorno...",
        securityBadge: "Protegido bajo nuestras políticas de privacidad de datos"
    },
    success: {
        title: "¡Solicitud Recibida!",
        bodyPart1: "Un Arquitecto de Soluciones JTECH está provisionando un Portal Demo exclusivo para",
        bodyPart2: "Recibirás tus credenciales de acceso y el enlace al portal SaaS en",
        bodyPart3: "a la brevedad.",
        backButton: "Volver al Inicio"
    }
};
