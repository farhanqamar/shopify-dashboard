import { useState } from "react";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { IoRemoveOutline } from "react-icons/io5";


const ProductAnalyticBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Today');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown
  };

  return (
    <section className="overflow-hidden">
      <div>
        <div className="flex justify-evenly bg-white whitespace-nowrap p-4">
          <div className="w-auto border-r border-gray-700 pr-4">
            <button
              onClick={toggleDropdown}
              className="flex lg:text-base text-sm p-4 hover:bg-[#f1f1f1] hover:rounded-lg"
            >
              <SlCalender className='text-2xl mr-2' />
              {selectedOption}
            </button>
          </div>

          <div className="flex items-center px-4">
            <Link to={'/'} className="hover:bg-[#f1f1f1] hover:rounded-lg p-2 flex flex-col items-center">
              <p className="lg:text-base text-sm font-semibold">Total Products</p>
              <div className="flex items-center">
                <p className="font-semibold">0</p>
                <IoRemoveOutline className='text-xl ml-2' />
              </div>
            </Link>
          </div>

          <hr className="w-[1px] h-[70px] bg-gray-300" />

          <div className="flex items-center px-4">
            <Link to={'/'} className="hover:bg-[#f1f1f1] hover:rounded-lg p-2 flex flex-col items-center">
              <p className="lg:text-base text-sm font-semibold">Products Sold</p>
              <div className="flex items-center">
                <p className="font-semibold">0</p>
                <IoRemoveOutline className='text-xl ml-2' />
              </div>
            </Link>
          </div>

          <hr className="w-[1px] h-[70px] bg-gray-300" />

          <div className="flex items-center px-4">
            <Link to={'/'} className="hover:bg-[#f1f1f1] hover:rounded-lg p-2 flex flex-col items-center">
              <p className="lg:text-base text-sm font-semibold">Returns</p>
              <div className="flex items-center">
                <p className="font-semibold">0</p>
                <IoRemoveOutline className='text-xl ml-2' />
              </div>
            </Link>
          </div>

          <hr className="w-[1px] h-[70px] bg-gray-300" />

          <div className="flex items-center px-4">
            <Link to={'/'} className="hover:bg-[#f1f1f1] hover:rounded-lg p-2 flex flex-col items-center">
              <p className="lg:text-base text-sm font-semibold">Stock Levels</p>
              <div className="flex items-center">
                <p className="font-semibold">0</p>
                <IoRemoveOutline className='text-xl ml-2' />
              </div>
            </Link>
          </div>

          <hr className="w-[1px] h-[70px] bg-gray-300" />

          <div className="flex items-center px-4">
            <Link to={'/'} className="hover:bg-[#f1f1f1] hover:rounded-lg p-2 flex flex-col items-center">
              <p className="lg:text-base text-sm font-semibold">Pending Orders</p>
              <div className="flex items-center">
                <p className="font-semibold">0</p>
                <IoRemoveOutline className='text-xl ml-2' />
              </div>
            </Link>
          </div>

          <hr className="w-[1px] h-[70px] bg-gray-300" />

          <div className="flex items-center px-4">
            <Link to={'/'} className="hover:bg-[#f1f1f1] hover:rounded-lg p-2 flex flex-col items-center">
              <p className="lg:text-base text-sm font-semibold">Low Stock Alerts</p>
              <div className="flex items-center">
                <p className="font-semibold">0</p>
                <IoRemoveOutline className='text-xl ml-2' />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-3 inline-block">
        {isOpen && (
          <div className="bg-white rounded-lg shadow-lg">
            <div
              onClick={() => handleOptionClick('Today')}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              <p className="text-base font-semibold">Today</p>
              <p>Compared to yesterday up to current hour</p>
            </div>
            <div
              onClick={() => handleOptionClick('7 Days')}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              <p className="text-base font-semibold">Last 7 Days</p>
              <p>Compared to the previous 7 days</p>
            </div>
            <div
              onClick={() => handleOptionClick('30 Days')}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              <p className="text-base font-semibold">Last 30 Days</p>
              <p>Compared to the previous 30 days</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductAnalyticBar;
