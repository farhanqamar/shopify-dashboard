import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";


const Product: React.FC = () => {


    return (
        <section className="overflow-x-hidden p-10">
            <div className='p-5'>
                <p className='text-2xl font-bold text-[#303030]'>Products</p>
            </div>
            <div className="shadow-lg rounded-2xl">
                <div className="bg-white py-2">
                    <div className="flex justify-evenly py-10">
                        <div className="space-y-4 md:mt-10 mt-5 md:text-start text-center">
                            <p className="text-xl font-bold">Add Your Products</p>
                            <p className="w-auto text-sm">Start by stocking your store with products your customer will love</p>
                            <div className="flex md:space-x-4">
                                <Link to={'/product/newproduct'}>
                                    <button className="bg-black text-white rounded-lg py-1.5 px-3 text-sm flex items-center">
                                        <IoMdAdd className="mr-1 text-lg" /> Add Product
                                    </button>
                                </Link>
                                <Link to={"/product/allProducts"}><button className="rounded-lg  py-1.5 px-3 text-sm border-2 m-auto md:m-0">Show All Products</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}




export default Product
