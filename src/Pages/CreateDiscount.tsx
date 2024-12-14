import React, { useState } from 'react'
import { MdArrowBack } from "react-icons/md";
import { Link } from 'react-router-dom';

const CreateDiscount = () => {
    const [selectedButton, setSelectedButton] = useState('discountCode');
   
  return (
    <section className='flex lg:flex-row flex-col justify-center lg:space-x-4 py-6 space-y-4'>
        <div className='w-full lg:w-2/5 space-y-3'>
            <div className='flex items-center space-x-2 py-4'>
            <Link to={'/discount'}><MdArrowBack className='text-xl'/></Link>
                <h1 className='text-xl font-bold'>Create Product Discount</h1>
            </div>
            <div className='hidden bg-white space-y-4 p-4 rounded-lg'>
                <div className='flex justify-between'>
                    <h1 className='text-base font-semibold'>Amount off products</h1>
                    <h1 className='text-base font-normal text-[#616161]'>Product discount</h1>
                </div>

                <div className='space-y-2 text-sm'>
                    <p>Method</p>
                    <button  onClick={() => setSelectedButton('discountCode')} className={`border ease-in rounded-s-lg p-2 text-black/80 font-semibold ${
                     selectedButton === 'discountCode' ? 'bg-[#cccccc]' : 'bg-white'}`}>Discount Code</button>
                    <button  onClick={() => setSelectedButton('automaticDiscount')} className={`border rounded-e-lg p-2 text-black/80 font-semibold ${
                    selectedButton === 'automaticDiscount' ? 'bg-[#cccccc]' : 'bg-white'}`}>Automatic Discount</button>
                </div>

                <div >
                    <div className='flex flex-col space-y-2 text-sm'>
                        <label htmlFor="">Title</label>
                        <input type="text" className='p-2 border border-black rounded-lg'/>
                    </div>
                    <p className='text-sm'>Customers will see this in their cart and at checkout.</p>
                </div>

            </div>
            
            <div className='hidden bg-white rounded-lg space-y-4 p-4 text-sm'>
                <h1 className='text-base font-semibold'>Discount Value</h1>
                <div className='flex flex-col space-y-2'>
                     <label htmlFor="">Code</label>
                    <input type="text" className='p-2 border border-black rounded-lg'/>
                </div>
                
                <div className='flex flex-col space-y-2'>
                     <label htmlFor="">Amount</label>
                    <input type="text" className='p-2 border border-black rounded-lg'/>
                </div>
                    
                <div className='flex flex-col space-y-2'>
                     <label htmlFor="">Expiry Date</label>
                    <input type="text" className='p-2 border border-black rounded-lg'/>
                </div>
                
                <div className='flex flex-col space-y-2'>
                     <label htmlFor="">Usage Count</label>
                    <input type="text" className='p-2 border border-black rounded-lg'/>
                </div>
            </div>
               
            <div className='bg-white rounded-lg space-y-4 p-4 text-sm'>
                <h1 className='text-base font-semibold'>Discount</h1>
                <div className='flex flex-col space-y-2'>
                     <label htmlFor="">Code</label>
                    <input type="text" className='p-2 border border-black rounded-lg'/>
                </div>

                <div className='flex flex-col space-y-2'>
                     <label htmlFor="">Amount</label>
                    <input type="text" className='p-2 border border-black rounded-lg'/>
                </div>
                
                <div className='flex flex-col space-y-2'>
                     <label htmlFor="">Discount Type</label>
                    <input type="text" className='p-2 border border-black rounded-lg'/>
                </div>

                <div className='flex flex-col space-y-2'>
                     <label htmlFor="">Start Date</label>
                    <input type="date" className='p-2 border border-black rounded-lg'/>
                </div>
                    
                <div className='flex flex-col space-y-2'>
                     <label htmlFor="">End Date</label>
                    <input type="date" className='p-2 border border-black rounded-lg'/>
                </div>
                
                <div className='flex flex-col space-y-2'>
                     <label htmlFor="">Applicable Product</label>
                    <input type="text" className='p-2 border border-black rounded-lg'/>
                </div>

                <div className='flex flex-col space-y-2'>
                     <label htmlFor="">Description</label>
                    <textarea rows={4} className='p-2 border border-black rounded-lg'/>
                </div>
            </div>

        </div>
        <div className='space-y-3 lg:pt-14'>
            <div className='bg-white rounded-lg p-4 space-y-4 text-sm'>
                <h1 className='font-semibold text-base'>Summary</h1>
                <div>
                    <h1 className='text-base'>Types and Methods</h1>
                    <li>Amount Off Products</li>
                    <li>Code</li>
                </div>
                <div >
                    <h1 className='text-base'>Details</h1>
                    <li>Can't combine with other discounts</li>
                </div>
            </div>
            <div className='bg-white rounded-lg p-4 space-y-4 items-center'>
                <div className='flex justify-between'>
                    <h1 className='font-bold text-sm'>Sale Channel</h1>
                    <h1>0 of 1 selected</h1>
                </div>
                <input type="checkbox" className='mx-2'/>
                <label htmlFor="">Point of sale</label>
            </div>
        </div>
    </section>
  )
}

export default CreateDiscount;
