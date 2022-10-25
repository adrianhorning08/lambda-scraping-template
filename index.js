import fetch from "node-fetch";
import axios from "axios";
import * as cheerio from "cheerio";

export const handler = async (event) => {
  try {
    //'{"page":1,"sort":"ranking","positiveWords":[],"negativeWords":[],"expertise":[],"location":[]}'
    // get body from event and parse it
    const body = JSON.parse(event.body);
    const json = await run({
      page: body?.page || 1,
      sort: body?.sort || "ranking",
      positiveWords: body?.positiveWords || [],
      negativeWords: body?.negativeWords || [],
      expertise: body?.expertise || [],
      location: body?.location || [],
    });
    return {
      statusCode: 200,
      body: JSON.stringify(json),
    };
  } catch (error) {
    console.log("error at handler", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

async function search(params) {
  try {
    const res = await fetch(
      "https://mijn.freelance.nl/api/frontend/project-search",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en-CA;q=0.9,en-AU;q=0.8,en;q=0.7",
          "content-type": "application/json",
          "sec-ch-ua":
            '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          Referer: "https://www.freelance.nl/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: JSON.stringify(params),
        method: "POST",
      }
    );
    if (res.status === 200) {
      const json = await res.json();
      return json;
    }
    console.log("error at search", res);
  } catch (error) {
    console.log("error at search", error.message);
  }
}

async function run(body) {
  try {
    const searchJson = await search(body);
    return searchJson;
  } catch (error) {
    console.log("error at run", error.message);
  }
}
