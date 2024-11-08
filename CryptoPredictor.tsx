// // app/CryptoPredictor.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { motion, AnimatePresence } from 'framer-motion';

// type Prediction = {
//   symbol: string;
//   prediction: string;
//   stop_loss: string;
//   take_profit: string;
//   details: string;
// };

// const coins = ['XAUUSDT', 'BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'DOGEUSDT'];

// const dummyResponses: Record<string, Prediction> = {
//   XAUUSDT: {
//     symbol: "XAUUSDT",
//     prediction: "buy",
//     stop_loss: "1900",
//     take_profit: "1950",
//     details: "Based on the candle data provided, it is recommended to buy with a stop loss at 1900 and a take profit at 1950."
//   },
//   BTCUSDT: {
//     symbol: "BTCUSDT",
//     prediction: "sell",
//     stop_loss: "32000",
//     take_profit: "30000",
//     details: "Current market trends suggest a bearish movement for Bitcoin. It's advised to sell with a stop loss at 32000 and a take profit at 30000."
//   },
//   ETHUSDT: {
//     symbol: "ETHUSDT",
//     prediction: "buy",
//     stop_loss: "1800",
//     take_profit: "2000",
//     details: "Ethereum shows bullish signals. Consider buying with a stop loss at 1800 and a take profit target of 2000."
//   },
//   ADAUSDT: {
//     symbol: "ADAUSDT",
//     prediction: "hold",
//     stop_loss: "0.45",
//     take_profit: "0.55",
//     details: "Cardano is showing mixed signals. It's recommended to hold your position with a stop loss at 0.45 and a take profit at 0.55."
//   },
//   DOGEUSDT: {
//     symbol: "DOGEUSDT",
//     prediction: "buy",
//     stop_loss: "0.065",
//     take_profit: "0.080",
//     details: "Dogecoin is showing potential for an upward movement. Consider buying with a stop loss at 0.065 and a take profit at 0.080."
//   }
// };

// export default function CryptoPredictor() {
//   const [selectedCoin, setSelectedCoin] = useState<string>('');
//   const [prediction, setPrediction] = useState<Prediction | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [useDummyData, setUseDummyData] = useState<boolean>(false);

//   const fetchPrediction = async (coin: string) => {
//     setLoading(true);
//     try {
//       if (useDummyData) {
//         // Simulate API delay
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         setPrediction(dummyResponses[coin]);
//       } else {
//         const response = await fetch(`/api/${coin.toLowerCase()}`);
//         const data = await response.json();
//         if (!response.ok) {
//           throw new Error(data.error || 'Error fetching prediction');
//         }
//         setPrediction(data);
//       }
//     } catch (error) {
//       console.error('Error fetching prediction:', error);
//       // Fallback to dummy data on error
//       setPrediction(dummyResponses[coin]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (selectedCoin) {
//       fetchPrediction(selectedCoin);
//       const interval = setInterval(() => fetchPrediction(selectedCoin), 120000); // 2 minutes
//       return () => clearInterval(interval);
//     }
//   }, [selectedCoin, useDummyData]);

//   return (
//     <div className="min-h-screen bg-black text-white p-4 flex items-center justify-center">
//       <Card className="w-full max-w-md bg-gray-900 text-white">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-center">Crypto Predictor</CardTitle>
//           <CardDescription className="text-center text-gray-400">Select a coin to see predictions</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center space-x-2 mb-4">
//             <Switch
//               id="use-dummy-data"
//               checked={useDummyData}
//               onCheckedChange={setUseDummyData}
//             />
//             <Label htmlFor="use-dummy-data">Use Dummy Data</Label>
//           </div>

//           <Select onValueChange={setSelectedCoin}>
//             <SelectTrigger className="w-full mb-4 bg-gray-800 border-gray-700">
//               <SelectValue placeholder="Select a coin" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700">
//               {coins.map((coin) => (
//                 <SelectItem key={coin} value={coin} className="text-white hover:bg-gray-700">
//                   {coin}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <AnimatePresence mode="wait">
//             {loading ? (
//               <motion.div
//                 key="loading"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="text-center text-lg font-semibold"
//               >
//                 Loading...
//               </motion.div>
//             ) : prediction ? (
//               <motion.div
//                 key="prediction"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-400">Symbol:</span>
//                     <span className="font-semibold">{prediction.symbol}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-400">Prediction:</span>
//                     <span className={`font-semibold ${
//                       prediction.prediction === 'buy' ? 'text-green-500' : 
//                       prediction.prediction === 'sell' ? 'text-red-500' : 'text-yellow-500'
//                     }`}>
//                       {prediction.prediction.toUpperCase()}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-400">Stop Loss:</span>
//                     <span className="font-semibold text-red-500">{prediction.stop_loss}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-400">Take Profit:</span>
//                     <span className="font-semibold text-green-500">{prediction.take_profit}</span>
//                   </div>
//                   <div className="mt-4">
//                     <p className="text-sm text-gray-400">{prediction.details}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ) : null}
//           </AnimatePresence>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
// app/CryptoPredictor.tsx

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';

type Prediction = {
  // symbol: string;
  prediction: string;
  stop_loss: number;  // Update to number
  take_profit: number;  // Update to number
  details: string;
};



export default function CryptoPredictor() {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const coin = 'XAUUSDT'; // Hardcoded to only use this coin

  // const fetchPrediction = async (coin: string) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch('/api/predict_future');
  //     let data = await response.json();
      
  //     // Check if the response is a string and try to parse it as JSON
  //     if (typeof data === 'string') {
  //       try {
  //         data = JSON.parse(data);
  //       } catch (parseError) {
  //         console.error('Error parsing response JSON:', parseError);
  //         throw new Error('Invalid JSON format in response');
  //       }
  //     }
  
  //     if (!response.ok) {
  //       throw new Error(data.error || 'Error fetching prediction');
  //     }
  
  //     setPrediction(data);
  //   } catch (error) {
  //     console.error('Error fetching prediction:', error);
  //     setPrediction(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchPrediction = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/predict_future');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error fetching prediction');
      }

      console.log({
        data: JSON.parse(data)
      })
      
      setPrediction(JSON.parse(data));
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    fetchPrediction();
    const interval = setInterval(fetchPrediction, 600000); // Refresh every 2 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 flex items-center justify-center">
      <Card className="w-full max-w-md bg-gray-900 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Crypto Predictor</CardTitle>
          <CardDescription className="text-center text-gray-400">Prediction for {coin}</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-lg font-semibold"
              >
                Loading...
              </motion.div>
            ) : prediction ? (
              <motion.div
                key="prediction"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  {/* <div className="flex justify-between items-center">
                    <span className="text-gray-400">Symbol:</span>
                    <span className="font-semibold">{prediction.symbol}</span>
                  </div> */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Prediction:</span>
                    <span className={`font-semibold ${
                      prediction.prediction === 'buy' ? 'text-green-500' : 
                      prediction.prediction === 'sell' ? 'text-red-500' : 'text-yellow-500'
                    }`}>
                      {prediction?.prediction}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Stop Loss:</span>
                    <span className="font-semibold text-red-500">{prediction.stop_loss}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Take Profit:</span>
                    <span className="font-semibold text-green-500">{prediction.take_profit}</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-400">{prediction.details}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <p className="text-center text-red-500">No data available</p>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
