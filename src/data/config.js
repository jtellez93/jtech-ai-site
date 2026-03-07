export const routes = {
    HOME: '/',
    PRODUCTS: '/productos',
    PRODUCT_EMMA: '/productos/emma-serviceops',
    PRODUCT_MEDSHIFT: '/productos/medshift-optimizer',
    CONTACT: '/contacto',
    DIAGNOSTIC: '/habla-con-emma',
    TERMS: '/legal/terminos-condiciones',
    PRIVACY: '/legal/politica-privacidad',
    DATA_DELETION: '/legal/eliminacion-datos'
};

export const seoData = {
    [routes.HOME]: { title: 'JTECH AI SOLUTIONS | IA aplicada para operaciones', desc: 'Convertimos procesos manuales en flujos asistidos con IA.' },
    [routes.PRODUCTS]: { title: 'Nuestros Productos | JTECH AI SOLUTIONS', desc: 'Soluciones de IA para automatización y optimización operativa.' },
    [routes.PRODUCT_EMMA]: { title: 'EMMA ServiceOps | JTECH AI SOLUTIONS', desc: 'Agentes de IA para servicio al cliente y automatización con supervisión humana.' },
    [routes.PRODUCT_MEDSHIFT]: { title: 'MedShift Optimizer | JTECH AI SOLUTIONS', desc: 'Software SaaS para programación de turnos y optimización de agenda médica.' },
    [routes.CONTACT]: { title: 'Contacto | JTECH AI SOLUTIONS', desc: 'Comunícate con nosotros para agendar una conversación sobre nuestras soluciones.' },
    [routes.DIAGNOSTIC]: { title: 'Habla con EMMA | JTECH AI SOLUTIONS', desc: 'Descubre cómo nuestra Inteligencia Artificial puede optimizar tus procesos en segundos.' },
    [routes.TERMS]: { title: 'Términos y Condiciones | JTECH AI SOLUTIONS', desc: 'Términos y condiciones de uso de nuestros servicios.' },
    [routes.PRIVACY]: { title: 'Política de Privacidad | JTECH AI SOLUTIONS', desc: 'Cómo manejamos y protegemos tus datos personales.' },
    [routes.DATA_DELETION]: { title: 'Eliminación de Datos | JTECH AI SOLUTIONS', desc: 'Proceso para solicitar la eliminación de tus datos en nuestros sistemas.' },
};

export const companyData = {
    name: "JTECH AI SOLUTIONS",
    shortName: "JTECH AI",
    contactEmail: "ventas@jtsoluciones.com",
    privacyEmail: "privacidad@jtsoluciones.com",
    phone: "+57 (319) 496-1967",
    phoneNumeric: "+573194961967",
    schedule: "Lunes a Viernes\n09:00 - 16:00 (COT)",
    footerDescription: "Ayudamos a empresas a automatizar operaciones con IA, reducir fricción y lograr resultados medibles.",
    copyrightYear: new Date().getFullYear(),
    legalInfo: "[TODO_DATOS_LEGALES_EMPRESA]",
    legalFramework: "[TODO_MARCO_NORMATIVO_POR_PAIS]"
};
