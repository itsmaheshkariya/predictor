// app/api/[coin]/route.ts

import { NextResponse } from 'next/server';

type Prediction = {
  symbol: string;
  prediction: string;
  stop_loss: string;
  take_profit: string;
  details: string;
};

// Dummy prediction data for demonstration
const predictions: Record<string, Prediction> = {
  xauusdt: {
    symbol: "XAUUSDT",
    prediction: "buy",
    stop_loss: "1900",
    take_profit: "1950",
    details: "Based on the candle data provided, it is recommended to buy with a stop loss at 1900 and a take profit at 1950."
  },
  btcusdt: {
    symbol: "BTCUSDT",
    prediction: "sell",
    stop_loss: "32000",
    take_profit: "30000",
    details: "Current market trends suggest a bearish movement for Bitcoin. It's advised to sell with a stop loss at 32000 and a take profit at 30000."
  },
  ethusdt: {
    symbol: "ETHUSDT",
    prediction: "buy",
    stop_loss: "1800",
    take_profit: "2000",
    details: "Ethereum shows bullish signals. Consider buying with a stop loss at 1800 and a take profit target of 2000."
  },
  // Add other coins as needed
};

export async function GET(request: Request, { params }: { params: { coin: string } }) {
  const { coin } = params;

  // Fetch prediction based on coin
  const prediction = predictions[coin.toLowerCase()];

  if (!prediction) {
    return NextResponse.json({ error: 'Coin not found' }, { status: 404 });
  }

  return NextResponse.json(prediction);
}
