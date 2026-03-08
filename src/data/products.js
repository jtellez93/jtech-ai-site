export const productsPageData = {
    header: {
        title: "Nuestros Productos",
        description: "Productos de IA diseñados para operar flujos críticos con control, integración limpia y una experiencia de alto nivel."
    },
    products: [
        {
            id: "emma",
            badge: "Servicio al Cliente",
            title: "EMMA ServiceOps",
            description: "Agente de servicio al cliente para WhatsApp y web, con automatización asistida y supervisión humana.",
            features: [
                "Atiende, informa y agenda con criterio operativo.",
                "Ejecuta acciones dentro de reglas claras.",
                "Escala al equipo cuando el caso lo exige."
            ],
            buttonText: "Ver arquitectura e implementación"
        },
        {
            id: "medshift",
            badge: "Sector Salud",
            title: "MedShift Optimizer",
            description: "SaaS para programación de turnos y agenda médica con reglas operativas y control recurrente.",
            features: [
                "Optimiza la programación de médicos activos.",
                "Ordena reglas, restricciones y cobertura clínica.",
                "Modelo de cobro simple y predecible."
            ],
            buttonText: "Ver características del SaaS"
        }
    ],
    upcoming: {
        title: "Nuevos modelos en entrenamiento",
        description: "Seguimos desarrollando nuevas capacidades para ampliar la operación asistida por IA con el mismo estándar de control, claridad y diseño."
    }
};

export const emmaProductData = {
    header: {
        badge: "EMMA ServiceOps",
        title: "El agente que opera tu servicio al cliente.",
        description: "Atiende en WhatsApp y web, entrega información, agenda y ejecuta acciones dentro de reglas claras y supervisión humana.",
        buttonText: "Ver Simulador ServiceOps"
    },
    scope: {
        title: "Alcance de la implementación base",
        items: [
            { title: 'Preparación inicial', desc: 'Configuración base del servicio y activación del canal principal.' },
            { title: 'Diseño del flujo de atención', desc: 'Definición de respuestas, acciones y criterios del servicio inicial.' },
            { title: 'Pruebas controladas', desc: 'Validación del funcionamiento antes de salir a operación.' },
            { title: 'Salida a operación', desc: 'Activación en entorno real con monitoreo cercano.' },
            { title: 'Guía para tu equipo', desc: 'Entrega de lineamientos para supervisar y operar el servicio con claridad.' }
        ]
    },
    outOfScope: {
        title: "Fuera del alcance base",
        items: [
            'Desarrollos ilimitados a medida o reentrenamiento de modelos base.',
            'Integraciones complejas con sistemas legados no documentados.',
            'Licencias o consumos de terceros no incluidos en el alcance acordado.'
        ]
    },
    pricing: {
        title: "Estructura de inversión",
        setup: {
            label: "Implementación base desde",
            price: "COP 2.500.000",
            description: "Referencia inicial para proyectos con alcance base. La inversión final se ajusta según complejidad, canales y necesidades específicas de la operación."
        },
        monthly: {
            label: "Mantenimiento y Suscripción",
            price: "USD 30",
            period: "/ mes",
            description: "Incluye mantenimiento evolutivo base, operación de la arquitectura y soporte estándar."
        },
        buttonText: "Ir al Simulador ServiceOps"
    }
};

export const medshiftProductData = {
    header: {
        badge: "MedShift Optimizer",
        title: "Programación médica con más control y menos fricción.",
        description: "SaaS especializado para organizar agenda y turnos médicos con lógica operativa clara.",
        buttonText: "Solicitar Acceso al Portal Demo"
    },
    details: {
        title: "Software de turnos médicos y optimización de agenda",
        description: "Una plataforma en la nube para programar médicos, ordenar restricciones y facilitar una operación más estable, clara y eficiente.",
        featuresTitle: "Funcionalidades core del SaaS",
        features: [
            'Acceso continuo a la plataforma SaaS.',
            'Gestión del directorio de profesionales médicos.',
            'Motor de programación y visualización de agenda.',
            'Configuración de reglas operativas y restricciones.',
            'Soporte técnico estándar y actualizaciones base.'
        ]
    },
    outOfScope: {
        title: "Exclusiones del servicio SaaS",
        items: [
            'Servicios de implementación consultiva in situ.',
            'Migración de históricos desde fuentes no estructuradas.',
            'Integraciones a medida con sistemas HIS o EHR legados.'
        ]
    },
    pricing: {
        title: "Licenciamiento elástico",
        description: "Pagas por médico activo programado en el sistema, con una estructura simple y transparente.",
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
        buttonText: "Solicitar Portal Demo"
    }
};