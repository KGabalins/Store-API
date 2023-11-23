import { useEffect, useState } from "react";
import ProductList from "../lists/ProductList";
import axios from "axios";
import { TProduct } from "../items/ProductItem";

const defaultURL = "/api/v1/products";

type TFilter = {
  featured: boolean | null;
  company: string | null;
  name: string | null;
  sort: string | null;
  fields: string[];
  page: number;
};

const HomePage = () => {
  const [URL, setURL] = useState(defaultURL);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState<TFilter>({
    featured: null,
    company: null,
    name: null,
    sort: null,
    fields: [],
    page: 1,
  });

  useEffect(() => {
    let query = "";

    Object.keys(filter).map((key) => {
      if (filter[key]) {
        if (Array.isArray(filter[key]) && filter[key].length !== 0) {
          query += `${key}=${filter[key]}&`;
        } else if (!Array.isArray(filter[key])) {
          query += `${key}=${filter[key]}&`;
        }
      }
    });
    query = query.substring(0, query.length - 1);

    if (query) setURL(`/api/v1/products?${query}`);
    else setURL(defaultURL);
  }, [filter]);

  useEffect(() => {
    axios
      .get(URL)
      .then(({ data }) => {
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [URL]);

  const changeHandler = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilter((prevState) => {
      if (!e.target.value) {
        return { ...prevState, [e.target.name]: null };
      }
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setFilter((prevState) => {
        return { ...prevState, fields: [...prevState.fields, value] };
      });
    } else {
      setFilter((prevState) => {
        return {
          ...prevState,
          fields: prevState.fields.filter((name) => name !== value),
        };
      });
    }
  };

  const handlePageChange = (data: "+" | "-") => {
    if (data === "+") {
      if (filter.page < totalPages)
        setFilter((prevState) => {
          return { ...prevState, page: prevState.page + 1 };
        });
    } else if (data === "-") {
      if (filter.page > 1)
        setFilter((prevState) => {
          return { ...prevState, page: prevState.page - 1 };
        });
    }
  };

  return (
    <>
      <nav className="fixed w-[300px] h-[100%] overflow-auto bg-green-700 flex flex-col p-2 gap-4">
        <h2 className="text-center text-white font-bold  text-xl">
          Filter the store
        </h2>
        <div className="flex gap-2">
          <label htmlFor="featured" className=" text-white text-lg">
            Featured
          </label>
          <select
            onChange={changeHandler}
            name="featured"
            id="featured"
            value={`${filter.featured}`}
          >
            <option value=""></option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="flex gap-2">
          <label htmlFor="company" className=" text-white text-lg">
            Company
          </label>
          <input
            id="company"
            name="company"
            onChange={changeHandler}
            type="text"
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="name" className=" text-white text-lg">
            Name
          </label>
          <input id="name" name="name" onChange={changeHandler} type="text" />
        </div>
        <div className="flex gap-2">
          <label htmlFor="sort" className=" text-white text-lg">
            Sort by
          </label>
          <select
            onChange={changeHandler}
            name="sort"
            id="sort"
            value={`${filter.sort}`}
          >
            <option value=""></option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
            <option value="createdAt">CreatedAt</option>
            <option value="company">Company</option>
          </select>
        </div>
        <div className="flex gap-2">
          <label htmlFor="fields" className=" text-white text-lg">
            Fields:
          </label>
          <div id="fields" className="text-white flex flex-col">
            <div>
              <input
                id="fieldsName"
                name="name"
                type="checkbox"
                value="name"
                onChange={handleFieldChange}
              />
              <label htmlFor="fieldsName">Name</label>
            </div>
            <div>
              <input
                id="fieldsCompany"
                name="company"
                type="checkbox"
                value="company"
                onChange={handleFieldChange}
              />
              <label htmlFor="fieldsCompany">Company</label>
            </div>
            <div>
              <input
                id="fieldsPrice"
                name="price"
                type="checkbox"
                value="price"
                onChange={handleFieldChange}
              />
              <label htmlFor="fieldsPrice">Price</label>
            </div>
            <div>
              <input
                id="fieldsRating"
                name="rating"
                type="checkbox"
                value="rating"
                onChange={handleFieldChange}
              />
              <label htmlFor="fieldsRating">Rating</label>
            </div>
            <div>
              <input
                id="fieldsFeatured"
                name="featured"
                type="checkbox"
                value="featured"
                onChange={handleFieldChange}
              />
              <label htmlFor="fieldsFeatured">Featured</label>
            </div>
          </div>
        </div>
        <div className="text-white bg-green-900 flex">
          <span className="mr-2">
            Pages: {filter.page} of {totalPages}
          </span>
          <button onClick={() => handlePageChange("-")} className="border px-1">
            {"<"}
          </button>
          <button onClick={() => handlePageChange("+")} className="border px-1">
            {">"}
          </button>
        </div>
      </nav>
      <div className="ml-[300px] bg-green-200 h-screen">
        <ProductList products={products} />
      </div>
    </>
  );
};

export default HomePage;
