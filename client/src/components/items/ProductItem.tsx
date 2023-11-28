export type TProduct = {
  _id: string;
  name: string;
  company: string;
  price: number;
  featured: boolean;
  rating: number;
  createdAt: string;
};

export type TCreateProduct = {
  name: string;
  price: number;
  company: string;
  featured?: boolean;
  rating?: boolean;
};

const ProductItem = (product: TProduct) => {
  const normalDate = new Date(product.createdAt).toLocaleString();

  return (
    <div className="flex flex-col bg-slate-500 rounded-xl p-3 ">
      <span className="ml-auto">
        <span className="font-bold">Published at: </span>
        {normalDate}
      </span>

      <div className="flex bg-slate-600 rounded-xl p-3 ">
        <div>
          <img
            src="https://d2rbyiw1vv51io.cloudfront.net/web/ikea4/images/910/0091074_PE163126_S4.jpg"
            className="w-[300px] rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-center ml-2 text-xl">
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
            } else if (key !== "_id" && key !== "__v" && key !== "createdAt") {
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
      </div>
    </div>
  );
};

export default ProductItem;
