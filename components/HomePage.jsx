import { Card } from "./ui/Card";

export const HomePage = ({initialProducts}) => {

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {initialProducts.map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </div>

    </main>
  );
};
