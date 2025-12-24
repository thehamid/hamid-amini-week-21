import {HomePage}  from "@/components/HomePage";
import { Navbar } from "@/components/Navbar";
import { LucideShoppingCart } from "lucide-react";
import api from '@/api';

const fetchProduct = async () => {
    try {
        const { data } = await api.get(`/products`);
        return data;
    } catch (error) {
        console.error("Failed to fetch list data:", error);
        return null;
    }
};


export default async function Home() {

  const  initialProducts  = await fetchProduct();

  return (
    <div>
      <Navbar />
      <h1 className="flex justify-center items-center text-2xl font-black text-purple-500 m-4 p-4">
        <LucideShoppingCart className="text-lg text-purple-500 ml-2" /> به
        بوتوشاپ خوش آمدید
      </h1>

        {initialProducts && <HomePage initialProducts={initialProducts.data} /> }
      
    </div>
  );
}
