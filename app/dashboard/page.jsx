import React, { useState, useEffect, useMemo } from "react";
import ProductModal from "../components/ProductModal";
import DeleteModal from "../components/DeleteModal";
import Button from "../components/ui/Button";
import {
  LucideSearch,
  LucideCombine,
  LucidePenBox,
  LucideTrash,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  useProducts,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
  useBulkDeleteProducts,
} from "../hooks/useProducts";
import Loading from "../components/ui/Loading";

const ProductListPage = () => {
  const { user, logout } = useAuth();

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  // State برای جستجو و صفحه‌بندی
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // استفاده از هوک‌های React Query
  const {
    data: allProducts,
    isLoading,
    error,
  } = useProducts(currentPage, searchTerm, itemsPerPage);
  const addProductMutation = useAddProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  const bulkDeleteMutation = useBulkDeleteProducts();

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

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleOpenDeleteModal = (product) => {
    setDeletingProduct(product);
  };

  const handleProductSubmit = (productData) => {
    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, ...productData });
    } else {
      addProductMutation.mutate(productData);
    }
    setIsProductModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteProductMutation.mutate(deletingProduct.id);
  };

  const handleBulkDelete = () => {
    setIsBulkDeleteModalOpen(true);
  };

  const handleBulkDeleteConfirm = () => {
    bulkDeleteMutation.mutate(selectedIds, {
      onSuccess: () => {
        setSelectedIds([]);
        setIsBulkDeleteModalOpen(false);
      },
      onError: () => {
        setIsBulkDeleteModalOpen(false);
      },
    });
  };

  useEffect(() => {
    if (deleteProductMutation.isSuccess) {
      setDeletingProduct(null); // بستن مودال حذف تکی
    }
  }, [deleteProductMutation.isSuccess]);

  const handleSelectProduct = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLogout = () => {
    logout();
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border rounded-2xl max-w-7xl mx-auto my-4">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex gap-3 items-center flex-1">
            <LucideSearch />
            <input
              type="text"
              placeholder="جستجوی کالا..."
              className="w-full md:w-96 px-4 py-2 rounded-lg focus:outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>

          <div className="relative group">
            <div className="flex items-center space-x-5 cursor-pointer">
              <img
                className="h-12 w-12 rounded-full"
                src={user.avatar}
                alt="User Avatar"
              />
              <div className="flex flex-col justify-start items-start">
                <span className="text-gray-700 text-lg">{user.name}</span>
                <span className="text-gray-700 text-sm">{user.role}</span>
              </div>
            </div>

            <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg py-2 w-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <button
                onClick={() => handleLogout()}
                className="w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 items-center flex-1">
            <LucideCombine />
            <h1 className="text-2xl font-light text-gray-900">مدیریت کالا</h1>
          </div>

          <div className="max-w-64 flex space-x-4">
            {selectedIds.length > 0 && (
              <Button
                onClick={handleBulkDelete}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl w-full h-14 cursor-pointer"
              >
                حذف گروهی ({selectedIds.length})
              </Button>
            )}
            <Button onClick={handleOpenAddModal}>افزودن محصول</Button>
          </div>
        </div>

        {/* جدول محصولات */}
        <div className="bg-white overflow-hidden sm:rounded-2xl border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-right">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-4 sm:px-6 lg:px-8 py-5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نام کالا
                </th>
                <th className="px-4 sm:px-6 lg:px-8 py-5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  قیمت
                </th>
                <th className="px-4 sm:px-6 lg:px-8py-5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  موجودی
                </th>
                <th className="hidden md:table-cell px-4 sm:px-6 lg:px-8py-5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  شناسه کالا
                </th>
                <th className="px-4 sm:px-6 lg:px-8 py-5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-4 sm:px-6 lg:px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-4 sm:px-6 lg:px-8 py-5 whitespace-nowrap text-sm text-gray-500">
                      {product.price}
                    </td>
                    <td className="px-4 sm:px-6 lg:px-8 py-5 whitespace-nowrap text-sm text-gray-500">
                      {product.quantity}
                    </td>
                    <td className="hidden md:block px-4 sm:px-6 lg:px-8 py-5 whitespace-nowrap text-sm text-gray-500">
                      {product.id}
                    </td>
                    <td className="px-4 sm:px-6 lg:px-8 py-5 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleOpenEditModal(product)}
                        className="text-green-600 hover:text-green-900 ml-3 cursor-pointer"
                      >
                        <LucidePenBox />
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(product)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                      >
                        <LucideTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 sm:px-6 lg:px-8 py-5 text-center text-gray-500"
                  >
                    محصولی یافت نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

      {/* مودال‌ها */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSubmit={handleProductSubmit}
        initialData={editingProduct}
        isLoading={
          addProductMutation.isPending || updateProductMutation.isPending
        }
      />
      {/* مودال حذف تکی */}
      <DeleteModal
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteConfirm}
        productName={deletingProduct?.name}
      />

      {/* مودال حذف گروهی */}
      <DeleteModal
        isOpen={isBulkDeleteModalOpen}
        onClose={() => setIsBulkDeleteModalOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        message={`آیا از حذف <b>${selectedIds.length}</b> محصول انتخابی مطمئن هستید؟`}
      />
    </div>
  );
};

export default ProductListPage;
