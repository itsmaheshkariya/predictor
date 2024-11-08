// app/api/temphack/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET() {
  try {
    // Fetch the HTML from the target URL
    const response = await axios.get('https://www.investing.com/currencies/xau-usd-historical-data');

    // Load the HTML into cheerio
    const $ = cheerio.load(response.data);

    // Select the element using the data-test attribute
    const goldPrice = $('[data-test="instrument-price-last"]').text().trim();

    console.log({
        goldPrice
    })

    // Return the extracted value
    return NextResponse.json({ goldPrice });
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
