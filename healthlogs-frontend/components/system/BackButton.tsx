"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Adjust this path based on where your button component is
import { ArrowLeft, ChevronLeft, MoveLeft } from "lucide-react";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <div
      className="flex items-center space-x-1 bg-none hover:underline cursor-pointer w-24"
      onClick={() => router.back()}
    >
      {" "}
      <ChevronLeft size={24} strokeWidth={2.1} /> Go Back
    </div>
  );
}
