import AddProductForm from "../forms/AddProductForm";

const AddFurniturePage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold my-4">Add product to the catalog</h2>
      <AddProductForm />
    </div>
  );
};

export default AddFurniturePage;
