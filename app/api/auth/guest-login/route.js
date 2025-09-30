import { NextResponse } from "next/server";
import https from "https";

const UPSTREAM_URL = "http://gokite-sit-b2c.convergentechnologies.com:30839/api/azp/api/auth/v1/guest-login?getTokenInCookie=true";

function extractCookieValue(setCookieHeader, name) {
    if (!setCookieHeader) return "";
    const match = setCookieHeader.match(new RegExp(`${name}=([^;]+)`));
    return match ? decodeURIComponent(match[1]) : "";
}

export async function POST(request) {
    try {
        const body = await request.json().catch(() => ({}));

        const upstream = await fetch(UPSTREAM_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text/plain, */*",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
            body: JSON.stringify(body || {}),
            cache: "no-store",
            // DEV ONLY: bypass self-signed/invalid certs for upstream
            agent: new https.Agent({ rejectUnauthorized: false }),
        });

        const text = await upstream.text();
        const contentType = upstream.headers.get("content-type") || "application/json";

        // Copy tokens into localhost cookies for dev
        const setCookie = upstream.headers.get("set-cookie") || "";
        const access = extractCookieValue(setCookie, "accesstoken");
        const refresh = extractCookieValue(setCookie, "refreshtoken");

        const response = new NextResponse(text, {
            status: upstream.status,
            headers: { "content-type": contentType },
        });

        if (access) {
            response.cookies.set("accesstoken", access, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
                path: "/",
            });
        }
        if (refresh) {
            response.cookies.set("refreshtoken", refresh, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
                path: "/",
            });
        }

        return response;
    } catch (err) {
        const details = {
            error: "Failed to proxy guest-login",
            message: String(err?.message || err),
            cause: String(err?.cause || ""),
        };
        return NextResponse.json(details, { status: 500 });
    }
}


