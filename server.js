export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*", "Access-Control-Allow-Headers": "*" } });
    }
    const target = request.headers.get("x-target-url");
    if (!target || !target.includes(".line-apps.com")) return new Response("Forbidden", { status: 403 });
    const headers = new Headers(request.headers);
    headers.delete("x-target-url"); headers.delete("origin"); headers.delete("referer");
    const res = await fetch(target, { method: request.method, headers, body: request.body });
    const outHeaders = new Headers(res.headers);
    outHeaders.set("Access-Control-Allow-Origin", "*");
    outHeaders.set("Access-Control-Expose-Headers", "*");
    return new Response(res.body, { status: res.status, headers: outHeaders });
  }
};