'use client'
import { useState, useMemo, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { Card } from "./ui/Card";
import Loading from "./ui/Loading";

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const {
    data: allProducts,
    isLoading,
    error,
  } = useProducts(currentPage, searchTerm, itemsPerPage);

  const { filteredProducts, totalPages } = useMemo(() => {
    const productsArray = Array.isArray(allProducts)
      ? allProducts
      : allProducts?.data || [];
    const filtered =
      productsArray.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

    const totalPageCount = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

    return {
      filteredProducts: paginated,
      totalPages: totalPageCount,
    };
  }, [allProducts, searchTerm, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        خطا در دریافت اطلاعات
      </div>
    );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <p className="mt-2 text-lg text-gray-600">
          جدیدترین محصولات را کشف کنید
        </p>
      </div>

      {/* جستجو */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="جستجوی محصول..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </div>

      {/* صفحه‌بندی */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3.5 py-1.5 pt-2 rounded-full cursor-pointer ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "border-2 border-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
};
