import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    const claims = {
      AUTHENTICATED: "true",
      org_id: "0631f265-d8de-4608-9622-6b4e148793c4",
      OTP_VERFICATION_REQD: "false",
      USER_ID: "0af402d1-98f0-18ae-8198-f493454d0001",
      refreshtoken: "false",
      client_ip: "14.99.174.62",
      USER_ID_LONG: "563",
      USER_NAME: "codetezteam@gmail.com",
      SESSION_ID: "88c31722-e2ef-4723-a2ce-20d797f7a1b8",
      "authorized-domains":
        "b603f35d-9242-11f0-b493-fea20be86931, b603edb7-9242-11f0-b493-fea20be86931, b603e748-9242-11f0-b493-fea20be86931, b603d5d9-9242-11f0-b493-fea20be86931",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    };

    const apiUrl =
      "http://gokite-sit-b2c.convergentechnologies.com:30839/api/cms/api/v2/list/custom/data/holiday-country-autocomplete";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        claims: JSON.stringify(claims),
      },
      body: JSON.stringify({
        q: query,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch country data: ${response.status}`);
    }

    const data = await response.json();

    // Filter results based on query if provided
    if (query && data.data) {
      const filteredData = data.data.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      );
      return NextResponse.json({
        ...data,
        data: filteredData,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching country autocomplete:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch countries",
        data: [],
        error: error.message,
      },
      { status: 500 }
    );
  }
}
