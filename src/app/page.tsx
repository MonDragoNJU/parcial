"use client";

import { toast, Toaster } from "sonner";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => toast("Hello, world!")}
        >
          Show Toast
        </button>
      </div>
      <Toaster />
    </>
  );
}
