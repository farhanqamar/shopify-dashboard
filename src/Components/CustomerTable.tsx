import { useState, useRef, useEffect } from "react";
import { IoFilterSharp } from "react-icons/io5";
import CustomerAnalyticBar from './CustomerAnalyticBar';

const apiurl = import.meta.env.VITE_API_URL;
const columnsData = [
  "id", "first_name", "last_name", "email", "phone", "company",
  "address1", "address2", "city", "province", "country", "zip_code",
  "accepts_marketing", "tags", "note", "loyalty_points", "groups"
];

// Define the Customer interface
interface Customer {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip_code?: string;
  accepts_marketing?: boolean;
  tags?: string;
  note?: string;
  loyalty_points?: number;
  groups?: string[];
}

interface capitalizeFirstLetterProps {
  string: string;
}

const capitalizeFirstLetter = ({ string }: capitalizeFirstLetterProps) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const CustomerTable = () => {
  // Use Customer[] type for customers array
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [visibleColumns, setVisibleColumns] = useState(columnsData.map((_, index) => index < 12));
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${apiurl}store/customers/`, {
          headers: {
            "Authorization": "Basic " + btoa("jeni:jeni@123"),
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          }
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data: Customer[] = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
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
      if (visibleCount >= 12) {
        const firstVisibleIndex = newVisibleColumns.findIndex((col) => col);
        newVisibleColumns[firstVisibleIndex] = false;
      }
      newVisibleColumns[index] = true;
    }
    setVisibleColumns(newVisibleColumns);
  };

  return (
    <section className="p-4">
      <div className="mb-6">
        <p className='text-2xl font-bold text-[#303030]'>Customers</p>
      </div>
      <div className="mb-8">
        <CustomerAnalyticBar />
      </div>
      <div className="bg-white p-4 rounded shadow mt-4 relative">
        {customers.length === 0 ? (
          <div className="bg-white py-3 rounded-xl text-center mb-6">
            <p className="text-base font-semibold">Your Customers Will Show Here</p>
            <p className="text-sm w-full md:w-1/3 m-auto py-4">
              To add customers and manage data, you need to select a plan.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto mt-4">
            <div className="flex justify-end mb-4" ref={dropdownRef}>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                <IoFilterSharp />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-14 right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10 h-[300px] overflow-y-auto">
                  {columnsData.map((column, index) => (
                    <div key={index} className="px-4 py-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-600"
                          checked={visibleColumns[index]}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <span className="ml-2">{capitalizeFirstLetter({ string: column.replace(/_/g, ' ') })}</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  {columnsData.map((column, index) =>
                    visibleColumns[index] && (
                      <th key={index} className="border px-6 py-4 bg-[#D9D9D9]">
                        {capitalizeFirstLetter({ string: column.replace(/_/g, ' ') })}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-100 transition-colors">
                    {columnsData.map((column, index) =>
                      visibleColumns[index] && (
                        <td key={`${customer.id}-${column}`} className="border px-6 py-4">
                          {customer[column as keyof Customer] !== null && customer[column as keyof Customer] !== undefined
                            ? (customer[column as keyof Customer] as string).toString()
                            : "N/A"}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerTable;
