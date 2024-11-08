import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge'

export async function GET() {
  try {
    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    // Create a new page
    const page = await browser.newPage();

    // Set user agent to mimic a real browser
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36');

    // Navigate to the target URL
    await page.goto('https://api.investing.com/api/financialdata/68/historical/chart/?interval=PT5M&period=P1D&pointscount=160', {
      waitUntil: 'networkidle2',
    });

    // Extract response data as JSON
    const content = await page.evaluate(() => {
      return document.body.innerText;
    });

    // Close browser
    await browser.close();

    // Parse and format the response
    const data = JSON.parse(content);
    const formattedData = data.data.map((entry: number[]) => ({
      timestamp: (new Date(entry[0]).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })),
      open: entry[1],
      close: entry[2],
      low: entry[3],
      high: entry[4],
      volume: entry[5],
    }));

    // Return the formatted data as JSON
    return NextResponse.json({ formattedData });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
