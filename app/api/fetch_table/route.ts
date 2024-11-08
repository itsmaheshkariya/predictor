// app/api/fetch_table/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET() {
  try {
    // Fetch the HTML from the target URL
    const response = await axios.get('https://www.investing.com/currencies/xau-usd-historical-data');

    // Load the HTML into cheerio
    const $ = cheerio.load(response.data);

    // Extract table data
    const tableData: { date: string; price: string; open: string; high: string; low: string; volume: string; change: string; }[] = [];
    $('table tbody tr').each((index, element) => {
        // Check if the row contains valid data (e.g., not a header)
        const date = $(element).find('td').eq(0).text().trim();
        if (date && date !== 'Date') { // Ensure date exists and isn't a header
          const row = {
            date,
            price: $(element).find('td').eq(1).text().trim(),
            open: $(element).find('td').eq(2).text().trim(),
            high: $(element).find('td').eq(3).text().trim(),
            low: $(element).find('td').eq(4).text().trim(),
            volume: $(element).find('td').eq(5).text().trim(),
            change: $(element).find('td').eq(6).text().trim(),
          };
          // Skip rows with mostly empty fields
          if (row.price && row.high) {
            tableData.push(row);
          }
        }
      });
      

    // console.log({
    //   tableData,
    // });

    // Return the extracted table data as JSON
    return NextResponse.json({ tableData });
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
