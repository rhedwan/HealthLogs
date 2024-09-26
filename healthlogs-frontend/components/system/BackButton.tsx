"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
  initialReferer,
}: {
  initialReferer: string | null;
}) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleBack = () => {
    if (canGoBack) {
      router.back();
    } else {
      router.push(initialReferer || "/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </button>
  );
}
