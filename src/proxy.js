import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "../lib/auth";

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session) {
        return NextResponse.redirect(new URL("/Sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/pages/profile"], // Specify the routes the middleware applies to
};