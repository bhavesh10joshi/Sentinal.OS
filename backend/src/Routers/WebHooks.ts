import { Router } from "express";
import scanQueue from "../Queues/scanQueue";
import rateLimit from "express-rate-limit";

const WebhookRouter = Router();

//Keep this strictly for heavy actions (file uploads, raw pastes, git pushes)
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 50, // Strict ceiling for running heavy AI scans
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, error: "Too many scan execution requests. Try again in 15 minutes." }
});


// Catch inbound webhook payload trigger payloads from platforms like GitHub
WebhookRouter.post("/github", apiLimiter , async function(req: any, res: any) {
    // Verify this is a valid push event from GitHub, otherwise skip it
    const eventType = req.headers["x-github-event"];
    if (eventType !== "push") {
        return res.status(200).json({ 
            success: true, 
            message: `Event type '${eventType}' received. Sentinel ignores non-push triggers.` 
        });
    }

    try {
        const payload = req.body;
        
        // Extract repository identity and head commit details safely
        const repositoryName = payload.repository?.full_name || "Unknown Repository";
        const branch = payload.ref ? payload.ref.replace("refs/heads/", "") : "main";
        const commits = payload.commits || [];

        if (commits.length === 0) {
            return res.status(200).json({ success: true, message: "No active commits detected in push stream." });
        }

        console.log(`⚓ Webhook intercepted! Inbound push from ${repositoryName} on branch [${branch}]`);

        // Loop through changed or added files inside the push payload and queue jobs
        let queuedJobsCount = 0;
        
        // GitHub sends summaries of modified files. For security parsing, we track the modified payload.
        // For simplicity, we create a reference record. In a full system, you would fetch raw contents from GitHub API.
        const trackingUserId = payload.repository?.owner?.login || "github_webhook_system";

        for (const commit of commits) {
            // Aggregate all files impacted in this specific commit payload block
            const filesToScan = [...(commit.added || []), ...(commit.modified || [])];

            for (const file of filesToScan) {
                // Focus execution limits on code structures, skipping configuration clutter(For this application .ts should be only allowed)
                if (file.endsWith(".ts") || file.endsWith(".js") || file.endsWith(".cpp")) {
                    
                    // Push a pipeline instruction job directly onto the background processing engine
                    await scanQueue.add("processWebhookCode", {
                        userId: trackingUserId,
                        fileName: `${repositoryName}/${file}@${commit.id.substring(0, 7)}`,
                        // Simulation string: In production, you run a fast axios call to raw.githubusercontent.com
                        codeString: `// Webhook Source: ${file}\n// Commit Reference Hash: ${commit.id}\n// Trigger Message: ${commit.message}`
                    });
                    
                    queuedJobsCount++;
                }
            }
        }

        // Return a clean 202 status code acknowledging the ingestion delivery instantly
        return res.status(202).json({
            success: true,
            message: `Webhook received. Dispatched ${queuedJobsCount} files into background processing queue streams.`,
            repository: repositoryName,
            branch: branch
        });

    } catch (e: any) {
        console.error("Webhook processing crash: ", e);
        return res.status(500).json({
            success: false,
            error: "Internal Webhook Processing infrastructure failure encountered.",
            details: e instanceof Error ? e.message : e
        });
    }
});

export default WebhookRouter;