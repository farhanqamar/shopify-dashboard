import React, { useState, useRef, useEffect } from "react";
import { IoFilterSharp } from "react-icons/io5";

const apiurl = import.meta.env.VITE_API_URL;

const columnsData = [
  "id",
  "fulfillment_status",
  "payment_status",
  "order_number",
  "email",
  "billing_address",
  "shipping_address",
  "tracking_number",
  "total_price",
  "subtotal_price",
  "shipping_price",
  "tax_price",
  "discount_price",
  "created_at",
  "updated_at",
  "note",
  "tags",
  "customer",
  "shipping_method",
];

const DynamicTable = () => {
  const [orders, setOrders] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(
    columnsData.map((_, index) => index < 10) // Show first 10 columns initially
  );

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${apiurl}store/orders/`, {
          headers: {
            "Authorization": "Basic " + btoa("jeni:jeni@123"),
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          }
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setOrders(data); // Set the fetched orders data
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
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

  const handleCheckboxChange = (index:number) => {
    const newVisibleColumns = [...visibleColumns];

    if (newVisibleColumns[index]) {
      newVisibleColumns[index] = false;
    } else {
      const visibleCount = newVisibleColumns.filter(Boolean).length;
      if (visibleCount >= 10) {
        const firstVisibleIndex = newVisibleColumns.findIndex((col) => col);
        newVisibleColumns[firstVisibleIndex] = false;
      }
      newVisibleColumns[index] = true;
    }

    setVisibleColumns(newVisibleColumns);
  };

  return (
    <>
     <section className="p-5">
      <h1 className="text-2xl font-bold text-[#303030]">Orders</h1>
     <div className="bg-white p-4 rounded shadow mt-4 relative">
        {orders.length === 0 ?
          <div className="bg-white py-3 rounded-xl text-center mb-6">
            <p className="text-base font-semibold">Your Customers Will Show Here </p>
            <p className="text-sm w-full md:w-1/3 m-auto py-4">
              To add customers and manage data, you need to select a plan.
            </p>
          </div> 
          :
          (
            <div className="p-4">
              {/* Dropdown button */}
              <div className="flex justify-end">
                <div className="relative inline-block" ref={dropdownRef}>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
                    onClick={() => setDropdownOpen(!isDropdownOpen)}>
                    <span><IoFilterSharp /></span>
                  </button>

                  {/* Dropdown content */}
                  {isDropdownOpen && (
                    <div className="absolute  right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10 h-[300px] overflow-y-auto">
                      {columnsData.map((column, index) => (
                        <div key={index} className="px-4 py-2">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox text-blue-600"
                              checked={visibleColumns[index]}
                              onChange={() => handleCheckboxChange(index)}
                            />
                            <span className="ml-2">{column.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</span>
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
                            {column.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index}> {/* Ensure each row has a unique key */}
                        {columnsData.map((column, index) =>
                          visibleColumns[index] && (
                            <td key={index} className="border px-4 py-2">
                              {order[column] !== null ? (order[column] as string).toString() : "N/A"}
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        }
      </div>
     </section>
    </>
  );
};

export default DynamicTable;
