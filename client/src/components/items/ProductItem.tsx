export type TProduct = {
  _id: string;
  name: string;
  company: string;
  price: number;
  featured: boolean;
  rating: number;
  createdAt: string;
};

const ProductItem = (product: TProduct) => {
  const normalDate = new Date(product.createdAt).toLocaleString();

  return (
    <div className="flex flex-col bg-green-500 rounded-xl p-4 ">
      <span className="ml-auto">{normalDate}</span>
      <div className="flex bg-green-700 rounded-xl p-2 ">
        <div className="flex flex-col ">
          {Object.keys(product).map((key, index) => {
            if (key === "featured") {
              return (
                <span key={product._id + index}>
                  <span className="font-bold">
                    {key.charAt(0).toUpperCase() + key.substring(1)}:{" "}
                  </span>
                  {product[key] ? "Yes" : "No"}
                </span>
              );
            } else if (key === "createdAt") {
            } else if (key !== "_id" && key !== "__v") {
              return (
                <span key={product._id + index}>
                  <span className="font-bold">
                    {key.charAt(0).toUpperCase() + key.substring(1)}:{" "}
                  </span>
                  {product[key]}
                </span>
              );
            }
          })}
        </div>
        <div className=" self-center ">Image</div>
      </div>
    </div>
  );
};

export default ProductItem;
