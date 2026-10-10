import { getAuth } from "../../../../../lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";

let handlers;

async function makeSessionCookieTransient(response) {
  const cookies = response.headers.getSetCookie();
  let changed = false;
  const headers = new Headers(response.headers);
  headers.delete("set-cookie");

  for (const cookie of cookies) {
    const name = cookie.split(";", 1)[0].split("=", 1)[0].trim();
    if (/session_token(?:\.\d+)?$/.test(name)) {
      headers.append(
        "set-cookie",
        cookie.replace(/;\s*(?:max-age|expires)=[^;]*/gi, "")
      );
      changed = true;
    } else {
      headers.append("set-cookie", cookie);
    }
  }

  if (!changed) {
    return response;
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function getHandlers() {
  if (!handlers) {
    handlers = toNextJsHandler(getAuth());
  }
  return handlers;
}

export async function GET(request) {
  return makeSessionCookieTransient(await getHandlers().GET(request));
}

export async function POST(request) {
  return makeSessionCookieTransient(await getHandlers().POST(request));
}