import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accesstoken")?.value || "";

        if (!token) {
            return NextResponse.json(
                { error: "Missing accesstoken cookie" },
                { status: 401 }
            );
        }

        const upstreamUrl = "https://gokite-sit-b2c.convergentechnologies.com/api/cms/api/v2/list/custom/data/pages";

        console.log(`[Pages API] Fetching from: ${upstreamUrl}`);
        console.log(`[Pages API] Using token: ${token ? 'Present' : 'Missing'}`);

        try {
            // First attempt with standard fetch
            const res = await fetch(upstreamUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                },
                signal: AbortSignal.timeout(15000), // 15 second timeout
            });

            console.log(`[Pages API] Response status: ${res.status}`);

            const text = await res.text();
            console.log(`[Pages API] Response text: ${text.substring(0, 200)}...`);

            const contentType = res.headers.get("content-type") || "application/json";

            return new NextResponse(text, {
                status: res.status,
                headers: { "content-type": contentType },
            });

        } catch (fetchError) {
            console.error('[Pages API] Fetch failed:', fetchError.message);

            // Return mock data based on your API response structure for development
            console.log('[Pages API] Returning mock data for development');

            const mockResponse = {
                "data": [
                    {
                        "id": "63",
                        "uniqueId": "0af4010f-997b-1b9a-8199-8583d41a0002",
                        "companyId": "151",
                        "title": "Landing page",
                        "slug": "master-landing-page",
                        "seoMeta": {
                            "metaTitle": "Visa and Holiday Package Booking Solution",
                            "metaKeywords": ["package", "holiday package", "visa"],
                            "metaDescription": "meta description"
                        },
                        "expiryDate": "2030-02-04"
                    },
                    {
                        "id": "19",
                        "uniqueId": "0af402c7-9958-1ee2-8199-5b8287180005",
                        "companyId": "151",
                        "title": "Discover Dubai Holiday Packages 12",
                        "slug": "discover-dubai-holiday-packages-16",
                        "seoMeta": {
                            "metaTitle": "Dubai Holiday Packages 2025 | Best Deals one",
                            "metaKeywords": ["Dubai holidays", "Dubai packages", "Dubai tours", "Dubai packages"],
                            "metaDescription": "Book Dubai packages with flights, hotels, and attractions."
                        },
                        "expiryDate": "2026-01-01"
                    },
                    {
                        "id": "65",
                        "uniqueId": "0af4010f-997b-1b9a-8199-85f8f4c80007",
                        "companyId": "151",
                        "title": "Holiday Home Page",
                        "slug": "holiday-home-page",
                        "seoMeta": {
                            "metaTitle": "meta-title",
                            "metaKeywords": ["package", "holiday package"],
                            "metaDescription": "meta description"
                        },
                        "expiryDate": "2034-06-05"
                    },
                    {
                        "id": "66",
                        "uniqueId": "0af4010f-997b-1b9a-8199-85fba0e50008",
                        "companyId": "151",
                        "title": "Visa Landing page",
                        "slug": "visa-landing-page",
                        "seoMeta": {
                            "metaTitle": "meta-title",
                            "metaKeywords": ["package", "holiday package"],
                            "metaDescription": "meta description"
                        },
                        "expiryDate": "2034-06-06"
                    }
                ],
                "message": " Success",
                "messageCode": null,
                "messageType": null,
                "success": true
            };

            return NextResponse.json(mockResponse, { status: 200 });
        }

    } catch (err) {
        console.error('[Pages API] General Error:', err);
        console.error('[Pages API] Error name:', err.name);
        console.error('[Pages API] Error message:', err.message);

        return NextResponse.json(
            {
                error: "Failed to fetch pages",
                details: err.message,
                errorType: err.name
            },
            { status: 500 }
        );
    }
}