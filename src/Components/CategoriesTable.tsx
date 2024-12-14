import { useState, useRef, useEffect } from "react";
// import { IoFilterSharp } from "react-icons/io5";
import order_main from '../assets/order_main.png';
import ProductAnalyticBar from './ProductAnalyticBar';
import { IoFilterSharp, IoAdd } from "react-icons/io5";


const apiurl = import.meta.env.VITE_API_URL;

const columnsData = [
  "id", "title", "description", "meta_title", "meta_description", "meta_keywords", "url_handle", "template"
];

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Define the types for categories
interface Category {
  id: number;
  title: string;
  description: string;
  meta_title: string | null;
  meta_description: string;
  meta_keywords: string | null;
  url_handle: string | null;
  template: string | null;
}

const CategoryTable = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [visibleColumns, setVisibleColumns] = useState(columnsData.map((_, index) => index < 6));
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [newCategory, setNewCategory] = useState({
    title: "",
    description: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    url_handle: "",
    template: "",
  }); // State for the new category form

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiurl}store/categories/`, {
          headers: {
            "Authorization": "Basic " + btoa("jeni:jeni@123"),
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        const data = JSON.parse(text);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: { target: any; }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleCheckboxChange = (index: number) => {
    const newVisibleColumns = [...visibleColumns];

    if (newVisibleColumns[index]) {
      newVisibleColumns[index] = false;
    } else {
      const visibleCount = newVisibleColumns.filter(Boolean).length;
      if (visibleCount >= 5) {
        const firstVisibleIndex = newVisibleColumns.findIndex((col) => col);
        newVisibleColumns[firstVisibleIndex] = false;
      }
      newVisibleColumns[index] = true;
    }

    setVisibleColumns(newVisibleColumns);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewCategory({
      title: "",
      description: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      url_handle: "",
      template: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiurl}store/categories/`, {
        method: "POST",
        headers: {
          "Authorization": "Basic " + btoa("jeni:jeni@123"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setCategories((prevCategories) => [...prevCategories, data]);
      handleModalClose();
  
      window.location.reload();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <section className="p-4">
      <div className="mb-6 relative">
        <p className="text-2xl font-bold text-[#303030] z-10">Category List</p>

        <div className="absolute top-0 right-4 z-20">
          <button
            className="bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition duration-200 focus:outline-none h-10 flex items-center"
            onClick={() => setModalOpen(true)}
          >
            <div className="bg-white rounded-full p-1">
              <IoAdd className="text-black text-lg w-2 h-2" />
            </div>
            <span className="ml-2">Category</span>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <ProductAnalyticBar />
      </div>

      <div className="bg-white p-4 rounded shadow mt-4">
        {categories.length === 0 ? (
          <div className="bg-white py-3 rounded-xl text-center mb-6">
            <img src={order_main} className="m-auto" alt="Order Placeholder" />
            <div className="text-center">
              <p className="text-base font-semibold">Your Categories Will Show Here</p>
              <p className="text-sm w-full md:w-1/3 m-auto py-4">
                To add categories, you need to manage them in your store setup.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-end mb-4 relative" ref={dropdownRef}>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                <span><IoFilterSharp /></span>
              </button>

              {isDropdownOpen && (
                <div className="absolute top-6 right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10 h-[300px] overflow-y-auto">
                  {columnsData.map((column, index) => (
                    <div key={column} className="px-4 py-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-600"
                          checked={visibleColumns[index]}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <span className="ml-2">{capitalizeFirstLetter(column.replace(/_/g, ' '))}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    {columnsData.map((column, index) =>
                      visibleColumns[index] && (
                        <th key={column} className="border px-6 py-4 bg-[#D9D9D9]">
                          {capitalizeFirstLetter(column.replace(/_/g, ' '))}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => {
                    return (
                      <tr key={index} className="hover:bg-gray-100 transition-colors">
                        {columnsData.map((column, index) =>
                          visibleColumns[index] && (
                            <td key={`${category.id}-${column}`} className="border px-6 py-4">
                              {category[column as keyof Category] != null && category[column as keyof Category] !== undefined
                                ? String(category[column as keyof Category])
                                : "N/A"}
                            </td>
                          )
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal for adding category */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-2/4 relative">
            {/* Close button */}
            <button
              onClick={handleModalClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4">Add New Category</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newCategory.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    value={newCategory.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium">Meta Title</label>
                  <input
                    type="text"
                    name="meta_title"
                    value={newCategory.meta_title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Meta Description</label>
                  <textarea
                    name="meta_description"
                    value={newCategory.meta_description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium">Meta Keywords</label>
                  <input
                    type="text"
                    name="meta_keywords"
                    value={newCategory.meta_keywords}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">URL Handle</label>
                  <input
                    type="text"
                    name="url_handle"
                    value={newCategory.url_handle}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Template</label>
                <input
                  type="text"
                  name="template"
                  value={newCategory.template}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoryTable;
