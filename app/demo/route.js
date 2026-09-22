import { buretteRuntimeOrigin } from "../../lib/burette-runtime.mjs";

export const dynamic = "force-static";

export async function GET() {
  return Response.redirect(`${buretteRuntimeOrigin}/web-demo/index.html`, 307);
}
