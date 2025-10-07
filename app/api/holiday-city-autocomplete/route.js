import { NextResponse } from "next/server";

// Simple in-memory cache (optional - can also use Redis for production)
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const country = searchParams.get("country") || "";

    // Check cache first
    const cacheKey = `city_${query.toLowerCase()}_${country.toLowerCase()}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json(cached.data);
    }

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
      "http://gokite-sit-b2c.convergentechnologies.com:30839/api/cms/api/v2/list/custom/data/holiday-city-autocomplete";

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        claims: JSON.stringify(claims),
      },
      body: JSON.stringify({
        q: query,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch city data: ${response.status}`);
    }

    const data = await response.json();

    // Filter results based on query and/or country if provided
    let result;
    if (data.data) {
      let filteredData = data.data;

      if (query) {
        filteredData = filteredData.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (country) {
        filteredData = filteredData.filter(
          (item) => item.country.toLowerCase() === country.toLowerCase()
        );
      }

      result = {
        ...data,
        data: filteredData,
      };
    } else {
      result = data;
    }

    // Store in cache
    cache.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching city autocomplete:", error);

    // Handle timeout errors
    if (error.name === "AbortError") {
      return NextResponse.json(
        {
          success: false,
          message: "Request timeout - please try again",
          data: [],
          error: "Timeout",
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch cities",
        data: [],
        error: error.message,
      },
      { status: 500 }
    );
  }
}
