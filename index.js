import fetch from "node-fetch";
import axios from "axios";
import * as cheerio from "cheerio";

export const handler = async (event) => {
  try {
    const json = await run();
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

async function run() {
  try {
    // do stuff
  } catch (error) {
    console.log("error at run", error.message);
  }
}
