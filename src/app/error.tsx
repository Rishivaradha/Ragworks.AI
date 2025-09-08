"use client";
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <div className="text-sm text-red-600">{error.message}</div>
      <button onClick={() => reset()} className="bg-black text-white rounded-md px-3 py-1.5 text-sm">Try again</button>
    </div>
  );
}


