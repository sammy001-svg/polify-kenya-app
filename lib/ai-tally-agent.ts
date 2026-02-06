export interface ProcessingLog {
    id: string;
    timestamp: string;
    source: string;
    action: 'INGEST' | 'VERIFY' | 'UPDATE' | 'ALERT';
    message: string;
    status: 'SUCCESS' | 'WARNING' | 'ERROR';
    metadata?: Record<string, unknown>;
}

export interface SourceData {
    source: string;
    candidate_scores: Record<string, number>; // Candidate Name -> Percentage
    total_votes_processed: number;
}

// Mock simulation of fetching from a media house or IEBC portal
export async function ingestFromSource(sourceName: string): Promise<SourceData> {
    // Simulate network latency
    await new Promise(r => setTimeout(r, 800 + Math.random() * 1000));

    // Base "Real" result (hidden truth)
    const baseRuto = 50.45;
    const baseRaila = 48.80;
    
    // Add noise based on source bias/variance
    let noise = 0;
    if (sourceName === "CITIZEN TV") noise = 0.2; // Slightly higher variance
    if (sourceName === "NTV") noise = -0.1;
    if (sourceName === "IEBC PORTAL") noise = 0; // The authority

    // Random fluctuation per fetch
    const fluctuation = (Math.random() - 0.5) * 0.1;

    const rutoScore = baseRuto + noise + fluctuation;
    const railaScore = baseRaila - noise - fluctuation; // Inverse to keep ~100%

    return {
        source: sourceName,
        candidate_scores: {
            "William Ruto": rutoScore,
            "Raila Odinga": railaScore,
            "George Wajackoyah": 0.45,
            "David Mwaure": 0.30
        },
        total_votes_processed: 6500000 + Math.floor(Math.random() * 50000)
    };
}

export function verifyResults(sources: SourceData[]): ProcessingLog[] {
    const logs: ProcessingLog[] = [];
    const timestamp = new Date().toLocaleTimeString();

    // 1. Find IEBC Data (The Gold Standard)
    const iebcData = sources.find(s => s.source === "IEBC PORTAL");
    
    if (!iebcData) {
        logs.push({
            id: crypto.randomUUID(),
            timestamp,
            source: "AI_VERIFIER",
            action: "ALERT",
            message: "CRITICAL: IEBC Portal data missing. Cannot perform authoritative validation.",
            status: "ERROR"
        });
        return logs;
    }

    // 2. Compare others against IEBC
    sources.filter(s => s.source !== "IEBC PORTAL").forEach(media => {
        const discrepancy = Math.abs(media.candidate_scores["William Ruto"] - iebcData.candidate_scores["William Ruto"]);
        
        if (discrepancy < 0.2) {
            logs.push({
                id: crypto.randomUUID(),
                timestamp,
                source: "AI_VERIFIER",
                action: "VERIFY",
                message: `Validated ${media.source} against IEBC. Variance: ${discrepancy.toFixed(3)}% (WITHIN LIMITS).`,
                status: "SUCCESS"
            });
        } else {
            logs.push({
                id: crypto.randomUUID(),
                timestamp,
                source: "AI_VERIFIER",
                action: "ALERT",
                message: `DISCREPANCY DETECTED in ${media.source}. Variance: ${discrepancy.toFixed(3)}% (Exceeds 0.2% threshold).`,
                status: "WARNING",
                metadata: {
                    media_value: media.candidate_scores["William Ruto"],
                    iebc_value: iebcData.candidate_scores["William Ruto"]
                }
            });
        }
    });

    return logs;
}
