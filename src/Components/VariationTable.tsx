import { useState, useRef, useEffect } from "react"; 
import { IoFilterSharp, IoAdd } from "react-icons/io5";
import order_main from '../assets/order_main.png';
import ProductAnalyticBar from './ProductAnalyticBar';

const apiurl = import.meta.env.VITE_API_URL;

const columnsData = [
  "id", "product_name", "name", "price", "sku", "location", "product"
];

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Define the types for variation
interface Variation {
  id: string;
  product_name: string;
  name: string;
  price: string | null;
  sku: string | null;
  location: string | null;
  product: string;
}

const VariationTable = () => {
  const [variations, setVariations] = useState<Variation[]>([]);
  const [visibleColumns, setVisibleColumns] = useState(columnsData.map((_, index) => index < 6));
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // state to control modal visibility
  const [newVariation, setNewVariation] = useState<Variation>({
    id: '',
    product_name: '',
    name: '',
    price: null,
    sku: null,
    location: null,
    product: ''
  });

  const [products, setProducts] = useState<any[]>([]); // state to store fetched products

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Fetch variations and products
  useEffect(() => {
    const fetchVariations = async () => {
      try {
        const response = await fetch(`${apiurl}store/variations/`, {
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
        setVariations(data);
      } catch (error) {
        console.error("Error fetching variations:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiurl}store/products/`, {
          headers: {
            "Authorization": "Basic " + btoa("jeni:jeni@123"),
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          }
        });

        const data = await response.json();
        setProducts(data); // store products data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchVariations();
    fetchProducts();
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

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVariation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = e.target.value;
    setNewVariation(prev => ({
      ...prev,
      product: selectedProduct
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiurl}store/variations/`, {
        method: 'POST',
        headers: {
          "Authorization": "Basic " + btoa("jeni:jeni@123"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVariation)
      });
      if (!response.ok) {
        throw new Error('Failed to add variation');
      }
      setVariations([...variations, newVariation]);
      setIsModalOpen(false); // Close the modal after submission
      window.location.reload();
    } catch (error) {
      console.error("Error adding variation:", error);
    }
  };

  return (
    <section className="p-4">

      <div className="mb-6 relative">
        <p className="text-2xl font-bold text-[#303030] z-10">Product Variations</p>

        <div className="absolute top-0 right-4 z-20">
          <button
            className="bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition duration-200 focus:outline-none h-10 flex items-center"
            onClick={handleModalToggle}
          >
            <div className="bg-white rounded-full p-1">
              <IoAdd className="text-black text-lg w-2 h-2" />
            </div>
            <span className="ml-2">Variation</span>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <ProductAnalyticBar />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/4 relative">
            <button
              onClick={handleModalToggle}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times; {/* Close button */}
            </button>
            <h3 className="text-xl font-bold mb-4">Add New Variation</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4"> {/* 2 columns grid */}
                {["name", "price", "sku", "location"].map((field, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-semibold">{capitalizeFirstLetter(field)}</label>
                    <input
                      type="text"
                      name={field}
                      value={newVariation[field as keyof Variation] || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Product</label>
                <select
                  name="product"
                  value={newVariation.product}
                  onChange={handleProductChange}
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>{product.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Add Variation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow mt-4">
        {variations.length === 0 ? (
          <div className="bg-white py-3 rounded-xl text-center mb-6">
            <img src={order_main} className="m-auto" alt="Order Placeholder" />
            <p className="text-base font-semibold">Your Variations Will Show Here</p>
            <p className="text-sm w-full md:w-1/3 m-auto py-4">
              To add variations, you need to manage them in your product setup.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex justify-end mb-4 relative" ref={dropdownRef}>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                <IoFilterSharp />
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
                  {variations.map((variation, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition-colors">
                      {columnsData.map((column, index) =>
                        visibleColumns[index] && (
                          <td key={`${variation.id}-${column}`} className="border px-6 py-4">
                            {variation[column as keyof Variation] != null && variation[column as keyof Variation] !== undefined
                              ? String(variation[column as keyof Variation])
                              : "N/A"}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VariationTable;
