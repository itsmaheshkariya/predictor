// // // app/api/predict_future/route.ts

// // import { NextResponse } from 'next/server';
// // import axios from 'axios';

// // let currentDataBuffer: { timestamp: number, price: string }[] = [];

// // export async function GET() {
// //   try {
// //     // Fetch the current gold price data from the /temphack API
// //     const currentResponse = await axios.get('http://localhost:3000/api/temphack');
// //     const currentData = currentResponse.data;

// //     // Add current data to the buffer with a timestamp
// //     currentDataBuffer.push({ timestamp: Date.now(), price: currentData.goldPrice });

// //     // Filter buffer to keep only the last 15 minutes of data (15 * 60 * 1000 ms)
// //     currentDataBuffer = currentDataBuffer.filter(data => Date.now() - data.timestamp <= 15 * 60 * 1000);

// //     // Fetch past data from the /fetch_table API
// //     // const tableResponse = await axios.get('http://localhost:3000/api/fetch_table');
// //     // const tableData = tableResponse.data.tableData;
// //     const todayResponse = await axios.get('http://localhost:3000/api/fetch_today');
// //     const todayData = todayResponse.data.formattedData;
// // // console.log({
// // //     todayData: todayData
// // // })
// //     // Construct system prompt using buffered current data and past data
// // const prompt = {
// //   model: "llama3.2:3B",
// //   prompt: `As a professional Crypto trader, try to analyze past and current market data of XAUUSDT only to provide insights on future trends. Only provide actionable insights such as 'buy', 'sell', or 'hold', along with target prices and strategies of next 5 mins candle only for sclping which in 10 to 20 points direction predication enough . The output format should be JSON code not sinlt word of description needed aprt from thsi please just code output formate should be like .
// //   ex: {
// //     symbol: "XAUUSDT",
// //     prediction: "[buy/sell/hold]",
// //     stop_loss: "[predicted stop loss here in decimal]",
// //     take_profit: "[predicted take_profit here in decimal]",
// //     details: "[example formate of XAUUSDT only:  shows signals patterns. Consider buying with a stop loss at [predicted stop loss  decimal value here] and a take profit target of [predicted take profit  decimal value here].]"
// //   } I understand rest of things, Based on the current market data over the last few minutes:
// // ${JSON.stringify(currentDataBuffer, null, 2)}
// //  and Based on the following past market data:
// // ${JSON.stringify(todayData.slice(0, 5), null, 2)}
// // What is your prediction for the next market movement?`,
// //   stream: false
// // };

// // // Based on the following past market data:
// // // ${JSON.stringify(tableData.slice(0, 5), null, 2)}
// //     // Send the prompt to the external API for generating the prediction
// //     console.log("Prompt being sent to the model:", JSON.stringify(prompt, null, 2));


// //     const generateResponse = await fetch('http://localhost:11434/api/generate', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(prompt),
// //       });
// //     console.log({
// //         generateResponse
// //     })
// //     const generatedOutput = await generateResponse.json();
// //     console.log('Response:', generatedOutput);

// //     // Return the actual output from the /generate API
// //     return NextResponse.json(generatedOutput.response);
// //   } catch (error) {
// //     console.error('Error fetching or preparing prediction data:', error);
// //     return NextResponse.json({ error: 'Failed to prepare or generate prediction data' }, { status: 500 });
// //   }
// // }

// // app/api/predict_future/route.ts

// import { NextResponse } from 'next/server';
// import axios from 'axios';

// let currentDataBuffer: { timestamp: number, price: string }[] = [];

// export async function POST() {
//   try {
//     // Fetch the current gold price data from the /temphack API
//     const currentResponse = await axios.get('http://localhost:3000/api/temphack');
//     const currentData = currentResponse.data;

//     // Add current data to the buffer with a timestamp
//     currentDataBuffer.push({ timestamp: Date.now(), price: currentData.goldPrice });

//     // Filter buffer to keep only the last 15 minutes of data (15 * 60 * 1000 ms)
//     currentDataBuffer = currentDataBuffer.filter(data => Date.now() - data.timestamp <= 15 * 60 * 1000);

//     // Fetch past data from the /fetch_today API
//     const todayResponse = await axios.get('http://localhost:3000/api/fetch_today');
//     const todayData = todayResponse.data.formattedData;

//     // Construct system prompt using buffered current data and past data
//     const prompt = {
//       model: "llama3.2:3B",
//       prompt: `As a professional Crypto trader, try to analyze past and current market data of XAUUSDT only to provide insights on future trends. Only provide actionable insights such as 'buy', 'sell', or 'hold', along with target prices and strategies of next 5 mins candle only for scalping, with a 10 to 20 points directional prediction. The output format should be JSON, without extra descriptions. Format:
//       {
//         symbol: "XAUUSDT",
//         prediction: "[buy/sell/hold]",
//         stop_loss: "[predicted stop loss in decimal]",
//         take_profit: "[predicted take profit in decimal]",
//         details: "[example: shows signals patterns. Consider buying with a stop loss at [predicted stop loss] and a take profit target of [predicted take profit].]"
//       } Based on current data:
//       ${JSON.stringify(currentDataBuffer, null, 2)}
//        and past market data:
//       ${JSON.stringify(todayData.slice(0, 5), null, 2)}
//       What is your prediction for the next market movement?`,
//       stream: false
//     };

//     // Send the prompt to the external API for generating the prediction
//     console.log("Prompt being sent to the model:", JSON.stringify(prompt, null, 2));

//     const generateResponse = await fetch('https://lucky-salad-626c.itsmaheshkariya.workers.dev', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(prompt),
//     });
    
//     const generatedOutput = await generateResponse.json();
//     console.log('Response:', generatedOutput);

//     // Return the actual output from the /generate API
//     return NextResponse.json(generatedOutput.response);
//   } catch (error) {
//     console.error('Error fetching or preparing prediction data:', error);
//     return NextResponse.json({ error: 'Failed to prepare or generate prediction data' }, { status: 500 });
//   }
// }
// app/api/predict_future/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge'

let currentDataBuffer: { timestamp: number, price: string }[] = [];

export async function GET() {
  try {
    // Fetch the current gold price data from the /temphack API
    const currentResponse = await axios.get('http://localhost:3000/api/temphack');
    const currentData = currentResponse.data;

    // Add current data to the buffer with a timestamp
    currentDataBuffer.push({ timestamp: Date.now(), price: currentData.goldPrice });

    // Filter buffer to keep only the last 15 minutes of data (15 * 60 * 1000 ms)
    currentDataBuffer = currentDataBuffer.filter(data => Date.now() - data.timestamp <= 15 * 60 * 1000);

    // Fetch past data from the /fetch_today API
    const todayResponse = await axios.get('http://localhost:3000/api/fetch_today');
    const todayData = todayResponse.data.formattedData;

    // Construct system prompt using buffered current data and past data
    const prompt = {
      model: "@cf/meta/llama-3-8b-instruct",
      prompt: `As a professional Crypto trader, try to analyze past and current market data of XAUUSD only to provide insights on future trends. Only provide actionable insights such as 'buy', 'sell', or 'hold', along with target prices and strategies of next 5 mins candle only for scalping, with a 10 to 20 points directional prediction. The output format should be JSON, without extra descriptions. Format:
      {
        symbol: "XAUUSD",
        prediction: "[buy/sell/hold]",
        stop_loss: "[predicted stop loss]",
        take_profit: "[predicted take profit]",
        details: "[example: shows signals patterns. Consider buying with a stop loss at [predicted stop loss] and a take profit target of [predicted take profit].]"
      } Based on current data:
      ${JSON.stringify(currentDataBuffer, null, 2)}
       and past market data:
      ${JSON.stringify(todayData.slice(0, 5), null, 2)}
      What is your prediction for the next market movement? and dont show like words at all like 'Here is the prediction and all. just json as output code only`,
      stream: false
    };

    // Send the prompt to the external API for generating the prediction
    console.log("Prompt being sent to the model:", JSON.stringify(prompt, null, 2));

    const generateResponse = await fetch('https://lucky-salad-626c.itsmaheshkariya.workers.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prompt),
    });
    
    const generatedOutput: any = await generateResponse.json();
    console.log('Response:', generatedOutput[0].response.response);

    // Return the actual output from the /generate API
    return NextResponse.json(generatedOutput[0].response.response);
  } catch (error) {
    console.error('Error fetching or preparing prediction data:', error);
    return NextResponse.json({ error: 'Failed to prepare or generate prediction data' }, { status: 500 });
  }
}
