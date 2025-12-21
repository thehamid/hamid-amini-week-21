import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Card = ({ product }) => {
  const randomId = Math.floor(Math.random() * 100);
  return (
    <Link href={`/products/${product.id}`}>
    <div className="border border-gray-300 rounded-2xl p-3 flex flex-col justify-center items-center">
      <Image
        src={`https://picsum.photos/id/${randomId}/200/300`}
        alt="product-img"
        className="rounded-2xl"
        width={200}
        height={300}
      />
      <h2 className="text-2xl font-bold p-2">{product.name}</h2>
      <p className="text-primary"> {product.price} تومان</p>
      <small>موجودی انبار: {product.quantity} عدد </small>
    </div>
    </Link>
  );
};
