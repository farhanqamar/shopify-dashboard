import { useState } from 'react';
import './AdminSideBar.scss';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingBag, MdHomeFilled, MdArrowForwardIos } from "react-icons/md";
import { AiFillReconciliation } from "react-icons/ai";
import { GrUserManager } from "react-icons/gr";
import { SiGoogleanalytics } from "react-icons/si";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoStorefront, } from "react-icons/io5";



const AdminSideBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  

  const checkDropdownOpen = (index: number) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className='sidebarListStyle md:pl-5 md:pr-3 h-[95.6vh] bg-[#EBEBEB] overflow-auto'>
      <ul>
      {menuItems.map((item) => (
  item.index === 8 ? (
    <div key={item.index} className='flex justify-between pr-1 my-2 relative md:right-[12px]'>
      <p>Sales channels</p>
      <span className='relative top-[6px] text-zinc-400'><MdArrowForwardIos /></span>
    </div>
  ) : item.index === 11 ? (
    <div key={item.index} className='flex justify-between pr-1 my-2 relative right-[12px]'>
      <p>Add apps</p>
      <span className='relative top-[6px] text-zinc-400'><MdArrowForwardIos /></span>
    </div>
  ) : (
    <div key={item.index} className='py-[4px] pl-2'>
      <Link to={`${item.route}`}>
        <li
          className={`flex gap-2 py-1 px-3 hover:bg-[#f3f3f3] text-[#212529] text-lg font-semibold rounded-lg ${activeIndex === item.activeIndex ? 'bg-active text-active' : ''}`}
          onClick={() => {
            if (item.activeIndex !== undefined) {
              handleClick(item.activeIndex);
            }
            checkDropdownOpen(item.index);
          }}
        >
          <span className='relative top-1 text-xg'>{item.IconBase}</span>
          <span>{item.title}</span>
        </li>
      </Link>
      {dropdownOpen === item.index && item.items && (
        <ul className='dropdown pl-4'>
          {item.items.map((subItem) => (
            <Link to={subItem.route} key={subItem.activeIndex}>
              <li
                className={`text-[#75777d] hover:text-black my-[4px] py-1 px-3 hover:bg-[#f3f3f3] text-lg font-semibold rounded-lg ${activeIndex === subItem.activeIndex ? 'bg-active text-active' : ''}`}
                onClick={() => handleClick(subItem.activeIndex)}
              >
                {subItem.label}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
))}


        {/* Settings */}
        {/* <div className='absolute bottom-1'>
          <Link to={'/discounts'}>
            <li
              className={`flex gap-2 ${activeIndex === 33 ? 'bg-active text-active' : ''}`}
              onClick={() => handleClick(33)}
            >
              <span className='relative top-1'><IoMdSettings /></span>
              <span>Settings</span>
            </li>
          </Link>
        </div> */}

      </ul>
    </section>
  );
};

export default AdminSideBar;

const menuItems = [
  {
    title: 'Home',
    route: '/',
    IconBase: <MdHomeFilled />,
    activeIndex: 0,
    index: 0
  },
  {
    title: 'Orders',
    route: '/order',
    IconBase: <AiFillReconciliation />,
    activeIndex: 1,
    index: 1,
    // items: [
    //   { label: 'Drafts', route: '/order/new', activeIndex: 2 },
    //   { label: "Abandoned" , route: '/order/all', activeIndex: 3 }
    // ]
  },
  {
    title: 'Products',
    route: '/product',
    IconBase: <MdOutlineShoppingBag />,
    activeIndex: 4,
    index: 2,
    items: [
      { label: 'Variations', route: '/product/variations', activeIndex: 5 },
      { label: 'Categories', route: '/product/categories', activeIndex: 6 },
      // { label: 'Collections', route: '/product/collection', activeIndex: 5 },
      // {  route: '/product/collection/new', activeIndex: 33 },
      // { label: 'Inventory', route: '/product/inventory', activeIndex: 6 },
      // { label: 'Purchase orders', route: '/product/purchase-orders', activeIndex: 7 },
      // { label: 'Transfers', route: '/product/transfers', activeIndex: 8 },
      // { label: 'Gift Cards', route: '/product/gift-cards', activeIndex: 9 }
    ]
  },
  {
    title: 'Customers',
    route: '/customer',
    IconBase: <GrUserManager />,
    activeIndex: 10,
    index: 3,
    items: [
      // { label: 'Segments', route: '/customers/segments', activeIndex: 11 },
      // { label: 'Segments', route: '/customers/segments', }
    ]
  },
  // {
  //   title: 'Content',
  //   route: '/content',
  //   IconBase: <TfiGallery />,
  //   activeIndex: 12,
  //   index: 4,
  //   items: [
  //     { label: 'Metaobjects', route: '/content/metaobjects', activeIndex: 13 },
  //     { label: 'Files', route: '/content/files', activeIndex: 14 }
  //   ]
  // },
  {
    title: 'Analytics',
    route: '/analytics',
    IconBase: <SiGoogleanalytics />,
    activeIndex: 15,
    index: 5,
    // items: [
    //   { label: 'Reports', route: '/analytics/reports', activeIndex: 16 },
    //   { label: 'Live View', route: '/analytics/live-view', activeIndex: 17 }
    // ]
  },
  // {
  //   title: 'Marketing',
  //   route: '/marketing',
  //   IconBase: <HiCursorArrowRipple />,
  //   activeIndex: 18,
  //   index: 6,
  //   items: [
  //     { label: 'Campaigns', route: '/marketing/campaigns', activeIndex: 19 },
  //     { label: 'Automations', route: '/marketing/automations', activeIndex: 20 }
  //   ]
  // },
  {
    title: 'Discounts',
    route: '/discount',
    IconBase: <RiDiscountPercentLine />,
    activeIndex: 21,
    index: 7
  },
  {
    index: 8,
    title: 'Add apps',
    IconBase: <MdArrowForwardIos />,
  },
  {
    title: 'Online Store',
    route: '/blog-post',
    IconBase: <IoStorefront />,
    activeIndex: 24,
    index: 9,
    items: [
      { label: 'Blog posts', route: '/blog-post', activeIndex: 24, index: 9, },
      // { label: 'Pages', route: '/online-store/pages', activeIndex: 25 },
      // { label: 'Navigation', route: '/online-store/navigation', activeIndex: 26 },
      // { label: 'Preferences', route: '/online-store/preferences', activeIndex: 27 }
    ]
  },

  // {
  //   title: 'Point of Sale',
  //   route: '/point-of-sale',
  //   IconBase: <FaFileInvoiceDollar />,
  //   activeIndex: 28,
  //   index: 10,
  //   items: [
  //     { label: 'Staff', route: '/point-of-sale/staff', activeIndex: 29 },
  //     { label: 'Locations', route: '/point-of-sale/locations', activeIndex: 30 },
  //     { label: 'Settings', route: '/point-of-sale/settings', activeIndex: 31 }
  //   ]
  // },
  // {
  //   index: 11,
  //   title: 'Add apps',
  //   IconBase: <MdArrowForwardIos />,
  // },
  // {
  //   title: 'Add Apps',
  //   route: '#',
  //   IconBase: <AiOutlinePlusCircle />,
  //   activeIndex: 32,
  //   index: 12,
  // },

];
