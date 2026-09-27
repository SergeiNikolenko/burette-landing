import { legalPage } from "../legal-page";

export const dynamic = "force-static";

export function GET() {
  return new Response(
    legalPage({
      path: "/privacy",
      title: "Privacy Policy",
      description: "How Burette handles molecular files in the public plugin, local application data, website analytics, and network requests.",
      body: `
        <p>This policy covers the Burette website, public molecular plugin and MCP service, desktop application, Finder Quick Look extensions, and local Codex plugin.</p>

        <h2>Local data processing</h2>
        <p>The desktop app, Finder extensions, and local Codex workspace plugin are local-first. Molecular files selected for those surfaces are opened and processed on the user's device. They do not upload a file to the hosted Burette MCP service unless the user separately invokes the public hosted plugin.</p>

        <h2>Hosted molecular previews</h2>
        <p>When a user invokes the public plugin with an attachment, the OpenAI host provides Burette with a temporary HTTPS download URL, file identifier, filename, and MIME type authorized for that tool call. Burette fetches up to 3 MiB, parses the molecular structure in memory, returns bounded composition data to the model, and returns raw molecular text only in result metadata used by the sandboxed Burette workspace.</p>
        <p>The hosted service does not write attachment contents, signed download URLs, or PDB files to Burette application storage. File contents remain in server memory for the request and response lifecycle. The OpenAI host may retain the conversation, tool result, attachment, and associated metadata under the user's account, workspace, data-control, and retention settings.</p>
        <p>For a PDB lookup, Burette receives the requested four-character PDB ID and sends that ID to the RCSB Protein Data Bank. RCSB does not receive a user's attachment through this tool.</p>

        <h2>Service providers and technical metadata</h2>
        <p>OpenAI processes tool inputs and results so ChatGPT or Codex can run the plugin and display its workspace. Vercel hosts the Burette MCP service and website and may process network and request metadata such as IP address, request time, route, browser or client type, approximate region, performance, and security events under its policies. RCSB processes public PDB lookup requests. Burette does not sell personal information or molecular-file data.</p>
        <p>Burette does not intentionally configure application logs to record raw molecular content or temporary signed download URLs. Technical logs and security metadata are retained according to the applicable OpenAI and Vercel account settings and policies.</p>

        <h2>Website analytics</h2>
        <p>The Burette website uses Vercel Web Analytics to measure page views, download referrals, outbound-link activity, and feature-video starts. These services may process technical request data such as browser type, approximate region, referring page, and network information under Vercel's privacy terms. Burette does not use advertising trackers or sell website visitor data.</p>

        <h2>Network access</h2>
        <p>Burette may make network requests when the user asks it to retrieve an authorized attachment, fetch a public structure, check for software updates, or download an update. Those requests are sent to the selected service, such as OpenAI's attachment host, GitHub, or RCSB, and are governed by that service's privacy terms.</p>
        <p>The hosted attachment tool requires HTTPS, revalidates redirects, pins requests to validated public addresses, blocks localhost and non-public destinations, and bounds downloaded content. It does not provide a general-purpose network proxy.</p>

        <h2>Local storage</h2>
        <p>Burette may store local preferences, recent-file references, logs, preview caches, and short-lived agent session files on the user's device. Removing the application does not automatically remove every local preference or cache. Users can clear Burette caches and diagnostics from the application settings or remove the corresponding local application data manually.</p>

        <h2>Sharing and retention</h2>
        <p>The project maintainers do not receive local molecular files or local agent session content unless a user explicitly shares those materials, for example in a support request. Hosted attachments are processed as described above and are not retained in Burette application storage.</p>

        <h2>User controls and sensitive data</h2>
        <p>Users control whether to attach a molecular file, request a public PDB entry, keep or delete the host conversation, and use the local-only workspace plugin instead. Do not submit credentials, protected health information, export-controlled structures, or confidential molecular data unless the user's organization and OpenAI workspace policies explicitly permit that processing.</p>
        <p>Public issues and support requests must not contain confidential structures, temporary signed URLs, credentials, private paths, or proprietary logs.</p>

        <h2>Contact</h2>
        <p>For privacy or security questions, open a <a href="https://github.com/SergeiNikolenko/Burette/security/advisories/new">private security advisory</a>. Use the <a href="/support">support page</a> for non-sensitive questions.</p>
      `,
    }),
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
