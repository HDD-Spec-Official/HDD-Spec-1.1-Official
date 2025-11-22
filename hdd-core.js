/**
 * HDD — Human Digital DNA Core Kernel 1.1
 * THE IMMORTAL ENGINE • ZERO DEPENDENCIES • FUTURE-PROOF
 * Eternal Standard for Human Activity Data
 */

// === IMMUTABLE CONSTANTS ===
const SEPARATOR = '::';
const CURRENT_VERSION = '1.1';
const MAX_CONTEXT_DEPTH = 10;

// === MULTI-IMPACT QUANTUM ENCODING ENGINE ===
function encodeValue(value, depth = 0) {
    if (depth > MAX_CONTEXT_DEPTH) {
        console.warn('HDD Warning: Maximum context depth exceeded');
        return '';
    }

    if (value === null || value === undefined) return '';

    switch (typeof value) {
        case 'number':
        case 'boolean':
            return String(value);
        case 'string':
            return value.replace(new RegExp(SEPARATOR, 'g'), '\\:');
        case 'object':
            if (value instanceof Date) {
                return value.getTime().toString();
            }
            try {
                if (Array.isArray(value)) {
                    return JSON.stringify(value.map(item =>
                        typeof item === 'object' ? encodeValue(item, depth + 1) : item
                    ));
                }
                const sanitized = {};
                for (const [key, val] of Object.entries(value)) {
                    sanitized[key] = typeof val === 'object' ?
                        encodeValue(val, depth + 1) : val;
                }
                return JSON.stringify(sanitized);
            } catch (e) {
                console.error('HDD Encode Error: Complex object serialization failed', e);
                return '';
            }
        default:
            return String(value);
    }
}

// === ULTRA-LIGHT SECURITY LAYER ===
function generateIntegrityHash(data) {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

// === THE CORE TRIPLET+ ENCODING ENGINE ===
function encode(activity, value, context = null, version = CURRENT_VERSION) {
    if (!activity || typeof activity !== 'string') {
        console.error('HDD Critical: Activity must be non-empty string');
        return '';
    }

    const timestamp = Date.now();

    const encodedValue = encodeValue(value);
    if (encodedValue === '' && value !== null && value !== undefined) {
        console.error('HDD Critical: Value encoding failed');
        return '';
    }

    let encodedContext = '';
    if (context && typeof context === 'object') {
        try {
            encodedContext = encodeValue(context, 1);
            if (encodedContext.length > 1000) {
                const integrity = generateIntegrityHash(encodedContext);
                encodedContext = JSON.stringify({
                    data: JSON.parse(encodedContext),
                    _integrity: integrity,
                    _ts: timestamp
                });
            }
        } catch (e) {
            console.error('HDD Context Error: Future-proof encoding failed', e);
        }
    }

    const parts = [
        activity.replace(new RegExp(SEPARATOR, 'g'), '\\:'),
        timestamp,
        encodedValue,
        encodedContext,
        version
    ].filter(part => part !== null && part !== undefined && part !== '');

    const hddString = parts.join(SEPARATOR);

    if (hddString.split(SEPARATOR).length < 3) {
        console.error('HDD Integrity Error: Invalid triplet structure');
        return '';
    }

    return hddString;
}

// === DECODING ENGINE ===
function decode(hddString) {
    if (typeof hddString !== 'string' || hddString.length < 5) return null;

    const parts = hddString.split(SEPARATOR);

    if (parts.length < 3) {
        console.error('HDD Decode Error: Invalid Triplet structure detected.');
        return null;
    }

    const activity = parts[0].replace(/\\:/g, SEPARATOR);
    const timestamp = parseInt(parts[1], 10);
    let value = parts[2].replace(/\\:/g, SEPARATOR);

    try {
        if (value.startsWith('{') && value.endsWith('}')) {
            value = JSON.parse(value);
        } else if (value.startsWith('[') && value.endsWith(']')) {
            value = JSON.parse(value);
        } else if (!isNaN(Number(value)) && value.trim() !== '') {
            value = Number(value);
        }
    } catch (e) {
        // Keep as string if parsing fails
    }

    let context = null;
    let version = parts[4] || CURRENT_VERSION;

    if (parts[3]) {
        try {
            context = JSON.parse(parts[3]);
        } catch (e) {
            context = parts[3];
        }
    }

    return {
        activity,
        timestamp,
        value,
        context,
        version
    };
}

// === ETERNAL EXPORTS ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { encode, decode, SEPARATOR, CURRENT_VERSION };
} else if (typeof window !== 'undefined') {
    window.HDD = { encode, decode, SEPARATOR, CURRENT_VERSION };
}

// Universal module system for all environments
if (typeof exports !== 'undefined') {
    exports.encode = encode;
    exports.decode = decode;
    exports.SEPARATOR = SEPARATOR;
    exports.CURRENT_VERSION = CURRENT_VERSION;
}
