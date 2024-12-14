import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useState } from "react";

const apiurl = import.meta.env.VITE_API_URL;

export const countryCodes = [
  { name: "Afghanistan", code: "+93" },
];

const NewCustomer = () => {
  const [selectedCod, setSelectedCod] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isCheckboxEnabled, setIsCheckboxEnabled] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsCheckboxEnabled(!isNaN(Number(value)) && value.trim() !== "");
  };

  const [customerData, setCustomerData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    country: "Pakistan",
    zip_code: "",
    accepts_marketing: false,
    tags: "",
    note: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Payload:", customerData);
    try {
      const response = await fetch(`${apiurl}store/customers/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Customer created:", data);
      } else {
        const errorData = await response.json();
        console.error("Error creating customer:", response.statusText, errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <section className="sm:px-5 pb-24">
      <div className="flex justify-center">
        <div className="py-8 w-2/4">
          <h1 className="flex text-lg font-bold items-center">
            <span className="p-[6px] hover:bg-[#D4D4D4] mr-2 rounded-lg cursor-pointer">
              <Link to={"/customer"}>
                <MdArrowBack />
              </Link>
            </span>
            Create Customer
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 ">
            <section>
              <div>
                <div className="font-medium bg-white flex flex-col sm:rounded-t-xl p-6 border space-y-4">
                  <div className="flex md:flex-row flex-col md:space-x-4 space-y-4 md:space-y-0">
                    <div className="flex flex-col w-full">
                      <label className="font-semibold" htmlFor="first-name">
                        First Name
                      </label>
                      <input
                        className="border border-black rounded-lg p-2"
                        type="text"
                        id="first-name"
                        name="first_name"
                        value={customerData.first_name}
                        onChange={handleChange}
                        placeholder=""
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-semibold" htmlFor="last-name">
                        Last Name
                      </label>
                      <input
                        className="border border-black rounded-lg p-2"
                        type="text"
                        id="last-name"
                        name="last_name"
                        value={customerData.last_name}
                        onChange={handleChange}
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col">
                    <label className="font-semibold" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="border border-black rounded-lg p-2"
                      type="email"
                      id="email"
                      name="email"
                      value={customerData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="font-semibold" htmlFor="phone">
                      Phone
                    </label>
                    <div className="flex space-x-2">
                      <div className="relative w-[80px]">
                        <input
                          type="text"
                          value={selectedCod}
                          onClick={() => setShowDropdown(!showDropdown)}
                          readOnly
                          placeholder="+00"
                          className="border border-black rounded-lg w-full p-2"
                        />
                        {showDropdown && (
                          <div className="absolute top-full left-0 w-full max-h-[200px] overflow-y-auto border border-gray-300 bg-white z-10">
                            {countryCodes.map((country, index) => (
                              <div
                                key={index}
                                onClick={() => setSelectedCod(country.code)}
                                style={{
                                  padding: "8px",
                                  cursor: "pointer",
                                  borderBottom: "1px solid #ddd",
                                }}
                              >
                                ({country.code})
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        className="w-full border border-black p-2 rounded-lg"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter a number"
                        name="phone"
                      />
                    </div>
                    <div className="py-4 flex items-center">
                      <input
                        type="checkbox"
                        disabled={!isCheckboxEnabled}
                        id="checkbox"
                      />
                      <label
                        htmlFor="checkbox"
                        className="ml-2 text-sm text-[#737373]"
                      >
                        Customer agreed to receive SMS marketing text messages.
                      </label>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-semibold" htmlFor="company">
                        Company
                      </label>
                      <input
                        className="border border-black rounded-lg p-2"
                        type="text"
                        id="company"
                        name="company"
                        value={customerData.company}
                        onChange={handleChange}
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-[#F7F7F7] p-5 sm:rounded-b-xl">
                  <p className="text-medium">
                    You should ask your customers for permission before you subscribe
                    them to your marketing emails or SMS.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="space-y-6 p-6 sm:rounded-xl bg-white text-sm">
                <div>
                  <h1 className="text-base font-semibold">Address Information</h1>
                  <p>The primary address of this customer</p>
                </div>

                <div className="w-full flex flex-col space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label className="font-semibold" htmlFor="address1">
                      Address 1
                    </label>
                    <input
                      className="border border-black rounded-lg p-2"
                      type="text"
                      id="address1"
                      name="address1"
                      value={customerData.address1}
                      onChange={handleChange}
                      placeholder="Enter Address 1"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="font-semibold" htmlFor="address2">
                      Address 2
                    </label>
                    <input
                      className="border border-black rounded-lg p-2"
                      type="text"
                      id="address2"
                      name="address2"
                      value={customerData.address2}
                      onChange={handleChange}
                      placeholder="Enter Address 2"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="font-semibold" htmlFor="province">
                      Province
                    </label>
                    <input
                      className="border border-black rounded-lg p-2"
                      type="text"
                      id="province"
                      name="province"
                      value={customerData.province}
                      onChange={handleChange}
                      placeholder="Enter Province"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="font-semibold" htmlFor="city">
                      City
                    </label>
                    <input
                      className="border border-black rounded-lg p-2"
                      type="text"
                      id="city"
                      name="city"
                      value={customerData.city}
                      onChange={handleChange}
                      placeholder="Enter City"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="font-semibold" htmlFor="country">
                      Country
                    </label>
                    <input
                      className="border border-black rounded-lg p-2"
                      type="text"
                      id="country"
                      name="country"
                      value={customerData.country}
                      onChange={handleChange}
                      placeholder="Enter Country"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="font-semibold" htmlFor="zip_code">
                      Zip Code
                    </label>
                    <input
                      className="border border-black rounded-lg p-2"
                      type="text"
                      id="zip_code"
                      name="zip_code"
                      value={customerData.zip_code}
                      onChange={handleChange}
                      placeholder="Enter Zip Code"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="space-y-4 p-6 sm:rounded-xl bg-white">
                <div>
                  <h1 className="text-base font-semibold">Additional Information</h1>
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label className="font-semibold" htmlFor="tags">
                      Tags
                    </label>
                    <input
                      className="border border-black rounded-lg p-2"
                      type="text"
                      id="tags"
                      name="tags"
                      value={customerData.tags} // mam you set the null value for rags in the payload
                      onChange={handleChange}
                      placeholder="Enter Tags"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="font-semibold" htmlFor="note">
                      Note
                    </label>
                    <input
                      className="border border-black rounded-lg p-2"
                      type="text"
                      id="note"
                      name="note"
                      value={customerData.note}
                      onChange={handleChange}
                      placeholder="Enter Note"
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
              >
                Create Customer
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewCustomer;
