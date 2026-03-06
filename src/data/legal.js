export const termsData = {
    title: "Términos y Condiciones",
    lastUpdated: "06 de Marzo, 2026",
    legalNote: "Nota legal: Este documento digital es meramente informativo. Para acuerdos comerciales B2B y despliegues técnicos formales, rigen única y exclusivamente las estipulaciones del Contrato de Servicios o Propuesta Comercial debidamente firmada entre las partes.",
    sections: [
        {
            title: "1. Alcance de la Arquitectura y Servicios",
            content: [
                "El perímetro tecnológico y alcance de los servicios proporcionados por JTECH AI SOLUTIONS (\"JTECH\") será estrictamente el documentado en la propuesta técnica comercial aprobada por el Cliente. Cualquier integración de sistemas, reentrenamiento de modelos o alteración funcional fuera del alcance base constituirá un requerimiento evolutivo sujeto a cotización independiente.",
                "Las proyecciones técnicas y comerciales contenidas en nuestras propuestas ostentan una vigencia máxima de 15 días calendario contados a partir de su emisión."
            ]
        },
        {
            title: "2. Derechos y Propiedad Intelectual (Modelo SaaS)",
            content: [
                "JTECH retiene todos los derechos de propiedad intelectual, derechos patrimoniales y titularidad exclusiva sobre la infraestructura subyacente, algoritmos, código fuente original, modelos de datos pre-entrenados y cualquier artefacto reutilizable diseñado durante el ciclo de vida del servicio. El Cliente recibe una licencia de uso limitada, no exclusiva e intransferible, condicionada al mantenimiento de su suscripción activa y al cumplimiento de sus obligaciones financieras."
            ]
        },
        {
            title: "3. Limitación Estricta de Responsabilidad",
            content: [
                "La responsabilidad agregada máxima de JTECH frente a cualquier contingencia originada en la prestación del servicio se circunscribirá al monto efectivamente pagado por el Cliente en los 3 meses inmediatos anteriores al evento (para arquitecturas bajo modelo de suscripción) o al valor nominal del hito de proyecto afectado.",
                "Bajo ninguna circunstancia JTECH responderá por daños consecuenciales, lucro cesante, interrupción de la operación de negocio, ni pérdida de información del Cliente originada en fallas ajenas a la infraestructura administrada por JTECH."
            ]
        },
        {
            title: "4. Causales de Terminación Anticipada",
            content: [
                "La provisión de servicios e infraestructura tecnológica podrá ser suspendida o finalizada de manera unilateral por las siguientes causales:"
            ],
            list: [
                "Mora en el cumplimiento de obligaciones de pago superior a 10 días calendario.",
                "Incumplimiento sustancial o reiterado de las directrices técnicas u obligaciones contractuales.",
                "Uso indebido de la plataforma, ingeniería inversa, o acciones que comprometan la seguridad perimetral de nuestros sistemas.",
                "Detección automatizada de anomalías críticas de seguridad.",
                "Terminación de mutuo acuerdo notificada fehacientemente."
            ]
        }
    ]
};

export const privacyData = {
    title: "Política de Privacidad",
    lastUpdated: "06 de Marzo, 2026",
    sections: [
        {
            title: "1. Identidad del Responsable",
            content: [
                "JTECH AI SOLUTIONS ejerce la función de Responsable del tratamiento de los datos de carácter personal recolectados en este entorno digital y durante el ciclo de vida de nuestra relación comercial.",
                "Información societaria: [TODO_DATOS_LEGALES_EMPRESA]"
            ]
        },
        {
            title: "2. Categorías de Datos Procesados",
            content: [
                "En el entorno exclusivo de nuestras operaciones B2B (Business to Business), tratamos limitadamente:"
            ],
            list: [
                "Identificadores corporativos: Nombres, cargos, correos electrónicos empresariales y números de contacto B2B.",
                "Trazabilidad de soporte: Historial de incidencias, solicitudes técnicas y consultas operativas.",
                "Telemetría: Metadata de uso, logs de red y analítica de la infraestructura para optimización.",
                "Tokens y credenciales de API (estrictamente encriptados y cifrados en tránsito/reposo)."
            ],
            subtitle: "Directiva de Datos Sensibles (Zero-Trust)",
            subcontent: [
                "La arquitectura de JTECH AI SOLUTIONS opera bajo el principio de minimización de datos. No requerimos, procesamos ni almacenamos información personal sensible, datos de salud, datos biométricos ni secretos comerciales de los usuarios finales de nuestros Clientes en nuestros modelos base. Cuando operamos como Encargados (ej. MedShift), el procesamiento se rige por instrucciones tecnológicas estrictas de encriptación dictadas por el Cliente."
            ]
        },
        {
            title: "3. Finalidades y Legitimación",
            content: [
                "El procesamiento de información tiene como propósitos fundamentales:"
            ],
            list: [
                "El aprovisionamiento técnico, despliegue y mantenimiento de los sistemas de IA contratados.",
                "Gestión integral del nivel de servicio (SLA) y resolución técnica de incidencias.",
                "Comunicaciones inherentes a la continuidad del negocio (actualizaciones de seguridad, parches, facturación).",
                "Entrenamiento y evolución anónima/agregada de nuestros modelos algorítmicos propios."
            ],
            postContent: "Marco normativo referencial: [TODO_MARCO_NORMATIVO_POR_PAIS]."
        },
        {
            title: "4. Ciclo de Vida y Retención",
            content: [
                "Aplicamos políticas estrictas de ciclo de vida de los datos:"
            ],
            list: [
                "Leads y telemetría comercial: Purga automática tras 12 meses de inactividad.",
                "Artefactos de soporte (Tickets): Retención por 12 meses pos-cierre para auditoría.",
                "Logs operacionales del sistema: Rotación y destrucción automatizada entre 30 y 90 días.",
                "Despliegue de Borrado Operativo: Al finalizar la suscripción de un entorno SaaS, los datos almacenados en los clústeres del cliente son destruidos criptográficamente en un plazo perentorio de 30 días, salvo reserva por mandato judicial."
            ]
        },
        {
            title: "5. Ejercicio de Derechos (ARCO)",
            content: [
                "Para solicitudes de acceso, rectificación, cancelación u oposición relativas a sus datos procesados en nuestra infraestructura, dirija su petición formal a nuestro Oficial de Privacidad y Seguridad de la Información:",
                "Canal criptográfico: privacidad@jtech.ai"
            ]
        }
    ]
};

export const dataDeletionData = {
    title: "Eliminación de Datos",
    lastUpdated: "06 de Marzo, 2026",
    intro: [
        "De conformidad con las normativas internacionales de protección de datos (ej. GDPR, leyes locales aplicables), JTECH AI SOLUTIONS garantiza su derecho al \"Olvido Digital\" facilitando un protocolo seguro para la purga de su información personal de nuestra infraestructura."
    ],
    sections: [
        {
            title: "Protocolo de Solicitud de Borrado",
            content: [
                "Para ejecutar una orden de eliminación en nuestros sistemas centrales, ejecute las siguientes instrucciones:"
            ],
            orderedList: [
                "Remita un correo electrónico a nuestro Centro de Seguridad y Privacidad: privacidad@jtech.ai",
                "Utilice obligatoriamente el siguiente asunto de mensaje: \"Solicitud Formal de Eliminación de Datos\"",
                "En la carga útil (cuerpo) del mensaje, incluya la matriz de validación mínima: Nombre legal completo, Entidad organizativa o dominio corporativo asociado a la interacción, Correo electrónico principal, Vector de interacción (ej. \"Demostración de EMMA en Q3\")."
            ]
        },
        {
            title: "Acuerdos de Nivel de Servicio (SLA) para Retención",
            content: [
                "Una vez que el sistema verifica la autenticidad criptográfica o por origen del solicitante, nuestros ingenieros procederán a expurgar la información de las bases de datos transaccionales. El tiempo máximo de confirmación técnica es de 15 días hábiles.",
                "Nota de Arquitectura: Existen excepciones técnicas ineludibles dictadas por legislaciones fiscales y de auditoría informática. Ciertos logs transaccionales inmutables o registros de facturación no podrán ser eliminados prematuramente. En caso de aplicar una restricción de esta naturaleza, el usuario recibirá un reporte de excepción documentando la base legal y el cronograma de purga diferida."
            ]
        }
    ],
    buttonText: "Solicitar eliminación por correo"
};
