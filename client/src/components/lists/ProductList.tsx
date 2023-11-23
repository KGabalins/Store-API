import ProductItem, { TProduct } from "../items/ProductItem";

const ProductList = ({ products }: { products: TProduct[] }) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-2 text-white">
      {products.map((product) => {
        return <ProductItem key={product._id} {...product} />;
      })}
    </div>
  );
};

export default ProductList;
