/**
 * Impact Narrative Media — Cloudflare Worker.
 *
 * The site is static; the only job here is to send www to the apex so there is
 * one canonical hostname. Everything else falls through to Workers Assets.
 */
interface Env { ASSETS: Fetcher }

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.hostname === "www.impactnarrativemedia.ca") {
      url.hostname = "impactnarrativemedia.ca";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
