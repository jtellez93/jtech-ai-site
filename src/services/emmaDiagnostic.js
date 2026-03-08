const EMMA_API_BASE =
    import.meta.env.VITE_EMMA_API_BASE_URL ||
    "https://labour-mixing-orleans-zones.trycloudflare.com";

export async function runEmmaDiagnostic(payload, signal) {
    const res = await fetch(`${EMMA_API_BASE}/api/v1/public/diagnostic`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal,
    });

    let data = null;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) {
        const messageByStatus = {
            400: "Lo siento, no pude procesar la solicitud. ¿Podrías intentar describirlo de otra forma?",
            401: "Mi conexión segura necesita ser verificada. Por favor, intenta de nuevo más tarde.",
            404: "EMMA se encuentra en mantenimiento temporal. ¡Vuelve en unos minutos!",
            429: "¡Vaya! He recibido muchas consultas seguidas. Dame unos minutos para respirar y vuelve a intentarlo.",
            500: "Tuve un pequeño contratiempo interno analizando tu caso. Déjame revisar y vuelve a intentar.",
            503: "Estoy teniendo dificultades para conectarme. Por favor, intenta de nuevo en un momento.",
        };

        throw new Error(
            messageByStatus[res.status] ||
            data?.result ||
            `Error inesperado del backend EMMA (${res.status})`
        );
    }

    if (!data?.result) {
        throw new Error("El backend EMMA no devolvió un resultado válido.");
    }

    return data;
}
