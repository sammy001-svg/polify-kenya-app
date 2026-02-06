"use server";

import { ingestFromSource, verifyResults } from "@/lib/ai-tally-agent";
import type { ProcessingLog, SourceData } from "@/lib/ai-tally-agent";

// Mock database for logs (in-memory for demo, effectively resets on server restart which is fine)
let operationalLogs: ProcessingLog[] = [];

export async function triggerAgentCycle(): Promise<ProcessingLog[]> {
    const cycleLogs: ProcessingLog[] = [];

    // 1. Ingest Phase
    const sources = ["CITIZEN TV", "NTV", "IEBC PORTAL"];
    const ingestedData: SourceData[] = [];

    for (const source of sources) {
        cycleLogs.push({
            id: crypto.randomUUID(),
            timestamp: new Date().toLocaleTimeString(),
            source: "AGENT_CORE",
            action: "INGEST",
            message: `Connecting to ${source} secure feed...`,
            status: "SUCCESS"
        });

        const data = await ingestFromSource(source);
        ingestedData.push(data);
        
        cycleLogs.push({
            id: crypto.randomUUID(),
            timestamp: new Date().toLocaleTimeString(),
            source: source,
            action: "INGEST",
            message: `Received packet: ${data.total_votes_processed.toLocaleString()} votes processed. Ruto: ${data.candidate_scores["William Ruto"].toFixed(2)}%`,
            status: "SUCCESS"
        });
    }

    // 2. Verification Phase
    cycleLogs.push({
        id: crypto.randomUUID(),
        timestamp: new Date().toLocaleTimeString(),
        source: "AI_VERIFIER",
        action: "VERIFY",
        message: "Initiating Cross-Reference Protocol...",
        status: "SUCCESS"
    });

    const verificationLogs = verifyResults(ingestedData);
    cycleLogs.push(...verificationLogs);

    // 3. Update DB Phase (Simulated)
    if (verificationLogs.every(l => l.status !== "ERROR")) {
        cycleLogs.push({
            id: crypto.randomUUID(),
            timestamp: new Date().toLocaleTimeString(),
            source: "DB_WRITER",
            action: "UPDATE",
            message: "Consensus reached. Committing verified tally to Main Database.",
            status: "SUCCESS"
        });
    }

    // Append to history
    operationalLogs = [...cycleLogs.reverse(), ...operationalLogs].slice(0, 50); // Keep last 50

    return cycleLogs;
}

export async function getAgentLogs(): Promise<ProcessingLog[]> {
    return operationalLogs;
}
