import { useState, useRef, useEffect } from "react";
import { IoFilterSharp } from "react-icons/io5";

const apiurl = import.meta.env.VITE_API_URL;

const columnsData = [
  "id",
  "code",
  "description",
  "discount_type",
  "amount",
  "start_date",
  "end_date",
  "applicable_products",
];


const DiscountTable = () => {
  const [discounts, setDiscounts] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(
    columnsData.map((_, index) => index < 8) // Show first 4 columns initially
  );

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await fetch(`${apiurl}store/discounts/`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setDiscounts(data); // Set the fetched discounts data
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };

    fetchDiscounts();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
      if (visibleCount >= 4) {
        const firstVisibleIndex = newVisibleColumns.findIndex((col) => col);
        newVisibleColumns[firstVisibleIndex] = false;
      }
      newVisibleColumns[index] = true;
    }

    setVisibleColumns(newVisibleColumns);
  };

  return (
    <div className="p-4">
      <div>
        <p className='text-2xl font-bold text-[#303030]'>Discounts</p>
      </div>

      {/* Combined Filter and Table Container */}
      <div className="bg-white rounded-lg shadow-md p-4 mt-4"> {/* Added background and padding */}
        {/* Dropdown button */}
        <div className="flex justify-end">
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <span><IoFilterSharp /></span>
            </button>

            {/* Dropdown content */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white border rounded shadow-lg z-10 h-[300px] overflow-y-auto">
                {columnsData.map((column, index) => (
                  <div key={index} className="px-4 py-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-600"
                        checked={visibleColumns[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <span className="ml-2">{column.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                {columnsData.map((column, index) =>
                  visibleColumns[index] && (
                    <th key={index} className="border px-4 py-2 bg-[#D9D9D9]">
                      {column.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount, index) => (
                <tr key={index}>
                  {columnsData.map((column, index) =>
                    visibleColumns[index] && (
                      <td key={index} className="border px-4 py-2">
                        {discount[column] !== null ? (discount[column] as string).toString() : "N/A"}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DiscountTable;