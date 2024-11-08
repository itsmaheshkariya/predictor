// app/page.tsx

import CryptoPredictor from './CryptoPredictor';
export const runtime = "edge";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <CryptoPredictor />
    </main>
  );
}
