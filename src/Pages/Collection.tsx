import { BiSearch } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineAddHome } from "react-icons/md";
import { Link } from "react-router-dom";


const Collection = () => {
    

  return (
    <section className='space-y-2 p-4'>

            <div className='flex justify-between'>
                <p className='text-xl font-semibold'>Collections</p>
                {/* <button className='bg-gradient-to-b from-black/80 to-black/70 hover:bg-black text-white rounded-lg p-1 font-semibold'>Create collection</button> */}
                <a className='bg-gradient-to-b from-black/80 to-black/70 hover:bg-black text-white rounded-lg p-1 font-semibold' href={'/new'}>Create collection</a>
            </div>

            <div className="flex justify-between p-2 border-b-2 border-gray-400/10 bg-white rounded-t-lg ">
                <div className='flex px-2'>
                    <button className='hover:bg-gray-500/10 text-gray-500 rounded-lg text-lg px-3 font-semibold'>All</button>
                   
                    <IoMdAdd className='text-2xl mt-1.5 ml-3 font-semibold hover:bg-gray-500/10 text-gray-500 hover:rounded-lg'/>

                </div>
                <div className="text-gray-500 text-lg flex rounded-lg">
                        <button className='hover:bg-gray-500/10 text-gray-500 rounded-lg text-xl font-semibold p-2'><BiSearch /></button>
                        <button className='hover:bg-gray-500/10 text-gray-500 rounded-lg text-xl font-semibold p-2'> <IoFilterSharp /></button>
                </div>
            </div>

            <div className="">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead>
                        <tr className="bg-[#f1f1f1]">
                            <th className="py-4">Title</th>
                            <th className="py-4">Products</th>
                            <th className="py-4">Product Condition</th>
                          
                        </tr>
                    </thead>
                    <tr className="w-full bg-white border">
                    <Link className="" to={'/'}><td className="py-4 flex"><MdOutlineAddHome className="text-2xl mr-2" /> Home Page</td></Link>
                        <td className="py-4">0</td>
                        <td className="py-4">0</td>
                    </tr>
                </table>
            </div>
    </section>
  )
}

export default Collection;