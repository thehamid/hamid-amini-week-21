import { HomePage } from "@/components/HomePage";
import { Navbar } from "@/components/Navbar";
import { LucideShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1 className="flex justify-center items-center text-2xl font-black text-purple-500 m-4 p-4">
        <LucideShoppingCart className="text-lg text-purple-500 ml-2" /> به
        بوتوشاپ خوش آمدید
      </h1>

      <HomePage />
    </div>
  );
}
