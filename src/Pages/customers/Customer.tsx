import { IoMdAdd } from "react-icons/io";
import customer_main from '../../assets/customer_main.svg';
import { Link } from "react-router-dom";

const Customer = () => {


    
    return (

        <section className="overflow-x-hidden px-10">
            <div className='p-5'>
                <p className='text-2xl font-bold text-[#303030]'>Customer</p>
            </div>
            <div className="shadow-lg border rounded-lg">
                <div className="bg-white py-2 rounded-t-lg">
                    <div className="flex justify-evenly py-10 px-2">
                        <div className="space-y-4 md:mt-10 mt-5 md:text-start text-center">
                            <p className="text-xl font-bold">Everything customers-related in one place</p>
                            <p className="w-auto text-sm">Manage customer details, see customer order history, and group customers into segments.</p>
                            <div className="flex md:space-x-2">
                                <Link to={"/customer/newCustomer"}>
                                    <button className="bg-gradient-to-b from-black/80 to-black/60 hover:bg-black text-white rounded-lg flex items-center justify-center px-3 py-[6px] w-full max-w-[200px] text-sm">
                                        <IoMdAdd className="mr-2" /> Add Customer
                                    </button>
                                </Link>
                                <Link to={{ pathname: '/customer/allCustomer' }}>
                                    <button className="rounded-lg border flex items-center justify-center p-3 w-full max-w-[200px] hover:bg-[#f1f1f1] px-3 py-[6px] text-sm">
                                        All Customers
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <img src={customer_main} alt="" />
                        </div>
                    </div>
                </div>
                <div className="bg-gray-400/10 flex">
                    <div className="p-5 space-y-6 flex ml-[18%] flex-col text-center md:text-left rounded-b-lg">
                        <div>
                            <p className="text-xl font-bold">Get customers with apps</p>
                            <p className="text-sm">Grow your customer list by adding a lead capture form to your store and marketing.</p>
                        </div>
                        <button className="bg-white rounded-md px-4 py-2 w-1/3 hover:bg-white/70">
                            See App Recommendation
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Customer;