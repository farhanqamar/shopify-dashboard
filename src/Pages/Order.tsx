import '../index.scss';
import { Link } from 'react-router-dom';
import order_main from '../assets/order_main.png';
import { IoMdAdd } from "react-icons/io";

const Order = () => {


    return (
        <section className='p-10'>
            <div className='w-full flex justify-between p-5'>
                <div>
                    <p className='text-2xl font-bold text-[#303030]'>Orders</p>
                </div>
            </div>

            {/* {showAnalytic && <AnalyticBar />} */}
            <div className="bg-white p-3 rounded-xl">
                <div className='pb-16 pt-5 text-center'>
                    <img src={order_main} className="m-auto" alt="Order Placeholder" />
                    <p className="text-base font-semibold">Your Orders Will Show Here</p>
                    <p className="text-sm w-full md:w-1/3 m-auto py-4">To get orders and accept payments from customers, you need to select a plan. You’ll only be charged for your plan after your free trial ends.</p>
                    <div className="flex justify-center md:space-x-4">
                        <Link to={'/order/newOrder'}>
                            <button className="bg-gradient-to-b from-black/80 to-black/60 hover:bg-black text-white rounded-lg px-3 py-[6px] text-sm flex items-center">
                                <IoMdAdd className='mr-2' /> Add Order
                            </button>
                        </Link>
                        <Link to={"/order/orderTable"}>
                            <button className="rounded-lg border-2 bg-stone-200 hover:bg-white px-3 py-[5px] text-sm">Show All Products</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Order;
