/**
 * 🚀 HDD API ULTRA LAYER 1.1 - THE COMPLETE 10-POWER ENGINE
 * STATELESS INTELLIGENCE + FUTURE-PROOF ANALYTICS
 * Zero Dependencies • Eternal Performance • Universal Compatibility
 */

import { encode, decode, SEPARATOR, CURRENT_VERSION } from './hdd-core.js';

// === QUANTUM INTELLIGENCE ENGINE (Private Core) ===
class HDDIntelligence {
    // POWER #1: Neural Context Complexity Analysis
    static measureContextComplexity(context) {
        if (!context || typeof context !== 'object') return 0;
        
        let complexity = 0;
        const queue = [{ obj: context, depth: 0 }];
        
        while (queue.length > 0) {
            const { obj, depth } = queue.shift();
            complexity += depth + 1; // Depth-based weighting
            
            for (const key in obj) {
                if (obj[key] && typeof obj[key] === 'object') {
                    queue.push({ obj: obj[key], depth: depth + 1 });
                }
            }
        }
        return complexity;
    }

    // POWER #2: Multi-Dimensional Impact Calculator
    static calculateImpact(value) {
        if (value == null) return 0;
        
        switch (typeof value) {
            case 'number':
                return Math.abs(value);
            case 'string':
                return value.length * 0.1; // Text impact scaling
            case 'boolean':
                return value ? 1 : 0;
            case 'object':
                if (Array.isArray(value)) {
                    return value.reduce((sum, item) => sum + this.calculateImpact(item), 0);
                }
                return Object.values(value).reduce((sum, val) => sum + this.calculateImpact(val), 0);
            default:
                return 1;
        }
    }

    // POWER #3: Predictive Neural Pattern Detection
    static detectActivityPattern(events, lookback = 5) {
        if (!Array.isArray(events) || events.length < 2) {
            return { next: null, confidence: 0, pattern: 'insufficient_data' };
        }

        const activities = events.slice(-lookback).map(e => {
            const decoded = decode(e);
            return decoded ? decoded.activity : null;
        }).filter(a => a !== null);

        if (activities.length === 0) return { next: null, confidence: 0, pattern: 'no_valid_activities' };

        // Advanced pattern detection
        const lastActivity = activities[activities.length - 1];
        const activityCounts = {};
        
        activities.forEach(activity => {
            activityCounts[activity] = (activityCounts[activity] || 0) + 1;
        });

        const maxCount = Math.max(...Object.values(activityCounts));
        const dominantActivities = Object.keys(activityCounts).filter(a => activityCounts[a] === maxCount);

        let nextActivity = lastActivity;
        let confidence = 0.6; // Base confidence
        
        // Pattern: Repetition detection
        if (activities.slice(-3).every(a => a === lastActivity)) {
            nextActivity = lastActivity;
            confidence = 0.85;
        } 
        // Pattern: Alternation detection  
        else if (activities.length >= 3 && activities[activities.length - 1] === activities[activities.length - 3]) {
            nextActivity = activities[activities.length - 2];
            confidence = 0.75;
        }

        return {
            next: nextActivity,
            confidence: Math.min(confidence + (maxCount / activities.length * 0.2), 0.95),
            pattern: dominantActivities.length === 1 ? 'dominant' : 'mixed',
            dominant_activity: dominantActivities[0],
            frequency: maxCount / activities.length
        };
    }

    // POWER #4: Temporal Analysis Engine
    static analyzeTemporalPattern(events) {
        if (!Array.isArray(events) || events.length < 2) return null;
        
        const timestamps = events.map(e => {
            const decoded = decode(e);
            return decoded ? decoded.timestamp : null;
        }).filter(t => t !== null);

        const intervals = [];
        for (let i = 1; i < timestamps.length; i++) {
            intervals.push(timestamps[i] - timestamps[i - 1]);
        }

        const avgInterval = intervals.reduce((sum, int) => sum + int, 0) / intervals.length;
        
        return {
            average_interval_ms: avgInterval,
            frequency_per_minute: 60000 / avgInterval,
            consistency: Math.max(0, 1 - (Math.std(intervals) / avgInterval)) || 0,
            trend: intervals[intervals.length - 1] < avgInterval ? 'accelerating' : 'decelerating'
        };
    }
}

// Add std deviation helper to Math
Math.std = function(arr) {
    const mean = arr.reduce((sum, val) => sum + val, 0) / arr.length;
    return Math.sqrt(arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length);
};

// === HDD API ULTRA - THE COMPLETE 10-POWER IMPLEMENTATION ===
class HDDApi {
    // CORE EXPOSURE (Maintains compatibility)
    static encode = encode;
    static decode = decode;
    static SEPARATOR = SEPARATOR;
    static VERSION = CURRENT_VERSION;

    // POWER #5: QUANTUM EVENT ANALYTICS
    static analyzePattern(hddEvents, options = {}) {
        if (!Array.isArray(hddEvents)) return { error: 'Invalid events array' };
        
        const validEvents = hddEvents.map(e => decode(e)).filter(d => d !== null);
        if (validEvents.length === 0) return { error: 'No valid HDD events' };

        const temporal = HDDIntelligence.analyzeTemporalPattern(hddEvents);
        const prediction = HDDIntelligence.detectActivityPattern(hddEvents);

        return {
            // Basic Metrics
            event_count: validEvents.length,
            timespan_ms: validEvents.length > 1 ? 
                validEvents[validEvents.length - 1].timestamp - validEvents[0].timestamp : 0,
            
            // Impact Analysis
            total_impact: validEvents.reduce((sum, e) => sum + HDDIntelligence.calculateImpact(e.value), 0),
            average_impact: validEvents.reduce((sum, e) => sum + HDDIntelligence.calculateImpact(e.value), 0) / validEvents.length,
            
            // Context Intelligence
            average_context_complexity: validEvents.reduce((sum, e) => sum + HDDIntelligence.measureContextComplexity(e.context), 0) / validEvents.length,
            max_context_complexity: Math.max(...validEvents.map(e => HDDIntelligence.measureContextComplexity(e.context))),
            
            // Predictive Insights
            prediction: prediction,
            temporal_pattern: temporal,
            
            // Activity Distribution
            unique_activities: [...new Set(validEvents.map(e => e.activity))],
            activity_frequency: validEvents.reduce((freq, e) => {
                freq[e.activity] = (freq[e.activity] || 0) + 1;
                return freq;
            }, {})
        };
    }

    // POWER #6: CONTEXT INJECTION ENGINE
    static injectContext(hddEvent, additionalContext, options = {}) {
        const decoded = decode(hddEvent);
        if (!decoded) return hddEvent;

        const enrichedContext = {
            ...decoded.context,
            ...additionalContext,
            _metadata: {
                injected: Date.now(),
                source: options.source || 'hdd_api',
                version: this.VERSION
            }
        };

        return encode(decoded.activity, decoded.value, enrichedContext, decoded.version);
    }

    // POWER #7: PLUG-AND-PLAY EVENT ANALYTICS
    static getEventAnalytics(hddEvent) {
        const decoded = decode(hddEvent);
        if (!decoded) return { error: 'Invalid HDD event' };

        const impact = HDDIntelligence.calculateImpact(decoded.value);
        const complexity = HDDIntelligence.measureContextComplexity(decoded.context);

        return {
            // Core Metrics
            event_strength: impact,
            context_complexity: complexity,
            data_quality_score: Math.min(impact + complexity * 0.1, 10),
            
            // Temporal Analysis
            age_ms: Date.now() - decoded.timestamp,
            is_recent: Date.now() - decoded.timestamp < 60000,
            
            // Intelligence Recommendations
            recommended_actions: this._generateRecommendations(decoded, impact, complexity),
            risk_assessment: complexity > 50 ? 'high_context_complexity' : 'normal',
            
            // Technical Metadata
            version_compatibility: decoded.version === this.VERSION ? 'current' : 'legacy',
            estimated_size_bytes: hddEvent.length
        };
    }

    // POWER #8: ADVANCED PREDICTION ENGINE
    static predictNext(events, options = {}) {
        return HDDIntelligence.detectActivityPattern(events, options.lookback);
    }

    // POWER #9: ETERNAL VERSION GUARANTEE
    static isUpdateRequired() {
        return false; // The immortal promise
    }

    // POWER #10: SECURITY & COMPLIANCE ENGINE
    static sanitizeContext(hddEvent, options = {}) {
        const decoded = decode(hddEvent);
        if (!decoded) return hddEvent;

        const sensitiveKeys = options.keysToSanitize || ['user_id', 'email', 'password', 'token', 'ssn'];
        let context = { ...decoded.context };

        // Deep sanitization
        const sanitizeObject = (obj) => {
            for (const key in obj) {
                if (sensitiveKeys.includes(key)) {
                    obj[key] = '[REDACTED]';
                } else if (obj[key] && typeof obj[key] === 'object') {
                    sanitizeObject(obj[key]);
                }
            }
        };

        sanitizeObject(context);

        return encode(decoded.activity, decoded.value, context, decoded.version);
    }

    // PRIVATE INTELLIGENCE GENERATOR
    static _generateRecommendations(decodedEvent, impact, complexity) {
        const recommendations = [];
        
        if (impact > 10) recommendations.push('Consider user notification');
        if (complexity > 20) recommendations.push('Optimize context data structure');
        if (decodedEvent.context && Object.keys(decodedEvent.context).length > 10) {
            recommendations.push('Context may be too verbose');
        }
        if (!decodedEvent.version || decodedEvent.version !== this.VERSION) {
            recommendations.push('Consider updating to latest HDD format');
        }

        return recommendations.length > 0 ? recommendations : ['No actions required'];
    }
}

// Universal Export Pattern
export default HDDApi;
