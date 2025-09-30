import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const body = await request.json();
        const cookieStore = await cookies();
        const token = cookieStore.get("accesstoken")?.value || "";
        if (!token) {
            return NextResponse.json(
                { error: "Missing accesstoken cookie" },
                { status: 401 }
            );
        }

        const res = await fetch(
            "https://gokite-sit-b2c.convergentechnologies.com/api/cms/api/v2/list/custom/data/pages-sections",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body || {}),
            }
        );

        const text = await res.text();
        const contentType = res.headers.get("content-type") || "application/json";
        return new NextResponse(text, {
            status: res.status,
            headers: { "content-type": contentType },
        });
    } catch (err) {
        return NextResponse.json(
            { error: "Failed to proxy pages-sections", details: String(err) },
            { status: 500 }
        );
    }
}


