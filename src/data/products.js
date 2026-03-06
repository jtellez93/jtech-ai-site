export const productsPageData = {
    header: {
        title: "Nuestros Productos",
        description: "Soluciones modulares impulsadas por IA, diseñadas para integrarse sin fricción y resolver desafíos específicos en operaciones de servicio y salud."
    },
    products: [
        {
            id: "emma",
            badge: "Servicio al Cliente",
            title: "EMMA ServiceOps",
            description: "Agentes de IA para servicio al cliente y automatización con supervisión humana.",
            features: [
                "Respuestas consistentes y resolutivas.",
                "Escalado inteligente a agentes humanos.",
                "Rápida puesta en marcha en semanas."
            ],
            buttonText: "Ver arquitectura e implementación"
        },
        {
            id: "medshift",
            badge: "Sector Salud",
            title: "MedShift Optimizer",
            description: "SaaS inteligente para gestión de agenda y turnos por médico activo.",
            features: [
                "Optimización matemática de agenda médica.",
                "Gestión avanzada de reglas de programación.",
                "Facturación predecible y transparente."
            ],
            buttonText: "Ver características del SaaS"
        }
    ],
    upcoming: {
        title: "Nuevos modelos en entrenamiento",
        description: "Nuestro equipo de ingeniería trabaja continuamente desarrollando nuevas soluciones para expandir las capacidades operativas mediante IA generativa."
    }
};

export const emmaProductData = {
    header: {
        badge: "EMMA ServiceOps",
        title: "Automatización híbrida para servicio al cliente.",
        description: "Agentes de IA capaces de resolver interacciones complejas, diseñados para trabajar con supervisión humana.",
        buttonText: "Solicitar demostración técnica"
    },
    scope: {
        title: "Alcance de la implementación base",
        items: [
            { title: 'Configuración arquitectónica', desc: 'Setup inicial del entorno y conexión de canales base.' },
            { title: 'Diseño de flujos cognitivos', desc: 'Configuración del comportamiento de la IA y reglas de negocio iniciales.' },
            { title: 'Fase de pruebas (Sandbox)', desc: 'Validación controlada de respuestas y mitigación de alucinaciones.' },
            { title: 'Puesta en marcha (Go-live)', desc: 'Despliegue a producción con monitoreo activo.' },
            { title: 'Transferencia de conocimiento', desc: 'Entrega de guía operativa para el equipo de supervisión humana.' }
        ]
    },
    outOfScope: {
        title: "Fuera del alcance base",
        items: [
            'Desarrollos ilimitados a medida o reentrenamiento de LLMs base.',
            'Integraciones complejas con sistemas legados no documentados.',
            'Costos de licencias de APIs de terceros (OpenAI, Anthropic, etc. si aplica distinto al core).'
        ]
    },
    pricing: {
        title: "Estructura de inversión",
        setup: {
            label: "Setup Arquitectónico Único",
            price: "COP 2.500.000",
            description: "Facturación: 50% al inicio de la configuración, 50% en el hito de Go-live."
        },
        monthly: {
            label: "Mantenimiento y Suscripción",
            price: "USD 30",
            period: "/ mes",
            description: "Cubre mantenimiento evolutivo base, hosting de la arquitectura y soporte estándar."
        },
        buttonText: "Iniciar evaluación"
    }
};

export const medshiftProductData = {
    header: {
        badge: "MedShift Optimizer",
        title: "Inteligencia en la gestión hospitalaria.",
        description: "SaaS especializado para la optimización de agenda médica y programación de turnos asistida por algoritmos.",
        buttonText: "Solicitar información comercial"
    },
    details: {
        title: "Software de turnos médicos y optimización de agenda",
        description: "Nuestra plataforma en la nube procesa variables complejas para facilitar la programación de turnos de manera eficiente, reduciendo drásticamente los conflictos y asegurando una cobertura clínica óptima en tu centro de salud.",
        featuresTitle: "Funcionalidades core del SaaS",
        features: [
            'Acceso continuo a plataforma SaaS en alta disponibilidad.',
            'Gestión integral del directorio de profesionales médicos.',
            'Motor de programación y visualización de agenda.',
            'Configuración de reglas de negocio y restricciones de turno.',
            'Soporte técnico estándar y actualizaciones automáticas.'
        ]
    },
    outOfScope: {
        title: "Exclusiones del servicio SaaS",
        items: [
            'Servicios de implementación consultiva in situ.',
            'Migración de datos históricos desde sistemas no estructurados.',
            'Integraciones a medida con sistemas HIS/EHR legados.'
        ]
    },
    pricing: {
        title: "Licenciamiento elástico",
        description: "Paga exclusivamente por los profesionales activos programados en el sistema. Optimización sin costos fijos prohibitivos.",
        perUser: {
            label: "Costo por Médico Activo",
            price: "COP 29.900",
            period: "/ mes"
        },
        minimum: {
            label: "Piso de facturación mensual",
            price: "COP 149.500",
            description: "Mínimo operativo equivalente a 5 licencias activas."
        },
        buttonText: "Contactar a ventas"
    }
};
