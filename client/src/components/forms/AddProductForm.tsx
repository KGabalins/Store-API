import { useState } from "react";
import { TCreateProduct } from "../items/ProductItem";
import axios from "axios";

const AddProductForm = () => {
  const [formAttributes, setFormAttributes] = useState<TCreateProduct>({
    name: "",
    price: 0,
    company: "Ikea",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormAttributes((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createProduct(formAttributes);
  };

  const createProduct = async (productData: TCreateProduct) => {
    try {
      await axios.post(`/api/v1/products`, productData);
      alert("Success ");
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  return (
    <form
      className="border w-[500px] p-4 flex flex-col bg-slate-400"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formAttributes.name}
        onChange={handleChange}
      />
      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        value={formAttributes.price}
        onChange={handleChange}
      />
      <label htmlFor="company">company</label>
      <select
        name="company"
        id="company"
        onChange={handleChange}
        value={formAttributes.company}
      >
        <option value="Ikea">Ikea</option>
        <option value="Liddy">Liddy</option>
        <option value="Caressa">Caressa</option>
        <option value="Marcos">Marcos</option>
      </select>
      <button className="bg-white mt-4">Submit</button>
    </form>
  );
};

export default AddProductForm;
