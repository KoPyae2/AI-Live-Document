import { Button } from "@/components/ui/button";
import {  ArrowLeftCircle } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-bounce">
      <ArrowLeftCircle className="w-10 h-10" />
      <h1 className="font-bold">Get start with creating a New Document</h1>
    </main>
  );
}
