import { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";


const CreateBlog = () => {
    const [editor, setEditor] = useState(false)
    const [editWebsite, setEditWebsite] = useState(false)
    return (
        <section className='flex lg:flex-row flex-col justify-center lg:space-x-3 lg:space-y-0 space-y-3'>
            <div className='lg:w-2/5 space-y-3'>
                <div className='flex items-center space-x-2 py-4'>
                    <Link to={'/blog-post'}><MdArrowBack className='text-xl' /></Link>
                    <h1 className='text-xl font-bold'>Create Blog Post</h1>
                </div>

                <div className='bg-white px-3 py-4 rounded-lg space-y-4 border'>
                    <div className='flex flex-col space-y-1 '>
                        <label htmlFor="" className='text-sm '>Title</label>
                        <input type="text" className='p-2 border border-black rounded-lg' />
                    </div>
                    <div className='text-sm space-y-1'>
                        <h1>Content</h1>
                        <Editor />
                    </div>

                </div>

                <div className='bg-white p-4 rounded-lg space-y-4 border'>
                    <div className='flex justify-between'>
                        <h1 className='text-base font-semibold'>Excerpt</h1>
                        <button onClick={() => setEditor(!editor)} className='text-blue-500 text-sm font-semibold'>Add Excerpt</button>
                    </div>
                    <p className='text-sm'>Add a summary of the post to appear on your home page or blog.</p>
                    <div>
                        {editor && (<Editor />)}
                    </div>
                </div>

                <div className='bg-white p-4 rounded-lg space-y-4 border'>
                    <div className='flex justify-between'>
                        <h1 className='text-base font-semibold'>Search engine listing preview</h1>
                        <button onClick={() => setEditWebsite(!editWebsite)} className='text-blue-500 text-sm font-semibold'>Edit Website SEO</button>
                    </div>
                    <p className='text-sm border-b py-2'>Add a title and description to see how this Blog post might appear in a search engine listing.</p>
                    <div>
                        {editWebsite && (
                            <div className='space-y-4 text-sm'>
                                <div className='flex flex-col space-y-1'>
                                    <label htmlFor="">Title</label>
                                    <input type="text" className='p-2 border border-black rounded-lg' />
                                    <p>0 of 70 characters used</p>
                                </div>

                                <div className='flex flex-col space-y-1'>
                                    <label htmlFor="">Description</label>
                                    <textarea rows={4} className='p-2 border border-black rounded-lg' />
                                    <p>0 of 320 characters used</p>
                                </div>

                                <div className='flex flex-col space-y-1'>
                                    <label htmlFor="">URL and Handle</label>
                                    <input type="text" className='p-2 border border-black rounded-lg' />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='lg:py-16 space-y-3'>
                <div className='bg-white p-2 rounded-lg border space-y-1'>
                    <h1 className='text-sm font-semibold'>Featured Image</h1>
                    <div className="py-2 px-0 rounded-lg border border-dashed border-black">
                        <input type="file" className="py-6 px-5" />
                    </div>
                </div>

                <div className='bg-[#F7F7F7] p-2 py-6 rounded-lg border space-y-3'>
                    <h1 className='text-sm font-semibold'>Organization</h1>
                    <div >
                        <BlogOrganization />
                    </div>

                    <div >
                        <BlogOrganizationBlog />
                    </div>
                </div>

                <div className='bg-white rounded-lg border px-2 py-4 space-y-4'>
                    <h1 className='text-sm font-semibold'>Online Store</h1>
                    <div>
                        <OnlineStore />

                    </div>
                </div>

                <div className='flex justify-end'>
                    <Link to='/blogtable'><button className='flex m-auto bg-black/75 hover:bg-black text-xs font-bold rounded-lg px-3 py-2 text-white'>Save</button>
                    </Link>
                </div>

            </div>

        </section>
    )
}

export default CreateBlog;

const Editor = () => {
    const editorRef = useRef(null);
    const toolbarRef = useRef(null);
    const quillInstance = useRef<Quill | null>(null); // Properly type the ref

    useEffect(() => {
        if (editorRef.current && toolbarRef.current && !quillInstance.current) {
            // const toolbarOptions = [
            //   [{ 'header': [1, 2, 3, false] }],
            //   ['bold', 'italic', 'underline'],        // Bold, italic, underline
            //   [{ 'color': [] }, { 'background': [] }], // Color options
            //   [{ 'align': [] }],                      // Text alignment
            //   ['blockquote', 'code-block'],           // Blockquote, code block
            //   [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Ordered, unordered list
            //   [{ 'indent': '-1'}, { 'indent': '+1' }], // Indent, outdent
            //   ['image', 'video'],                     // Insert image, video
            //   ['clean']                               // Remove formatting
            // ];

            quillInstance.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: { toolbar: toolbarRef.current },
            });
        }

        return () => {
            if (quillInstance.current) {
                quillInstance.current = null;
            }
        };
    }, []);

    return (
        <section>
            {/* <h1 className='font-semibold'>Description</h1> */}
            <div className="h-auto rounded-lg shadow-md">
                <div ref={toolbarRef} id="toolbar" className='rounded-t-lg'>
                    <span className="ql-formats">
                        <select className="ql-header">
                            <option value="1"></option>
                            <option value="2"></option>
                            <option selected></option>
                        </select>
                        <button className="ql-bold"></button>
                        <button className="ql-italic"></button>
                        <button className="ql-underline"></button>
                    </span>
                    <span className="ql-formats">
                        <select className="ql-color"></select>
                        <select className="ql-background"></select>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-list" value="ordered"></button>
                        <button className="ql-list" value="bullet"></button>
                        <button className="ql-indent" value="-1"></button>
                        <button className="ql-indent" value="+1"></button>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-blockquote"></button>
                        <button className="ql-code-block"></button>
                    </span>
                    <span className="ql-formats">
                        <button className="ql-image"></button>
                        <button className="ql-video"></button>
                        <button className="ql-clean"></button>
                    </span>
                </div>
                <div ref={editorRef} className="h-auto rounded-b-lg"></div>
            </div>
        </section>
    );
};

interface DropdownItem {
    id: number;
    label: string;
    subItems?: DropdownItem[]; // Ensure subItems is optional in all declarations
}

const BlogOrganization = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const dropdownItems: DropdownItem[] = [
        { id: 1, label: "My Store Admin" },
    ];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setIsDropdownOpen(true);
    };

    const handleDropdownClick = (item: DropdownItem) => {
        setInputValue(item.label);
        setSelectedItem(item.id);
        setIsDropdownOpen(false);
    };
    return (
        <div className="relative">
            <label className="text-sm" htmlFor="">Auther</label>
            <input
                type="text"
                className="w-full p-1 border border-black rounded-lg"
                value={inputValue}
                onChange={handleInputChange}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                placeholder="Select an option"
            />
            {isDropdownOpen && (
                <ul
                    className="absolute top-full left-0 right-0 border bg-white z-[1000] p-0 m-0 list-none rounded-lg">
                    {dropdownItems.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => handleDropdownClick(item)}
                            className={`p-2 cursor-pointer flex justify-between font-semibold hover:bg-[#EBEBEB] ${selectedItem === item.id ? "#f0f0f0" : "#fff"}`} >
                            {item.label}
                            {selectedItem === item.id && <FaCheck />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
};

interface SubItem {
    id: number;
    label: string;
}

const BlogOrganizationBlog = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [selectedSubItem, setSelectedSubItem] = useState<number | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [expandedItemId, setExpandedItemId] = useState<number | null>(null);

    const dropdownItems: DropdownItem[] = [
        { id: 1, label: "Blog", subItems: [{ id: 101, label: "News" }] },
        { id: 2, label: "Action", subItems: [{ id: 102, label: "Create new Blog" }] },
        //   { id: 3, label: "Option 3", subItems: [{ id: 103, label: "Sub Option 3.1" }] },
    ];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setIsDropdownOpen(true);
    };

    const handleDropdownClick = (item: DropdownItem) => {
        setExpandedItemId(expandedItemId === item.id ? null : item.id); // Toggle sub-items
        setSelectedItem(item.id);
    };

    const handleSubItemClick = (subItem: SubItem) => {
        setInputValue(subItem.label);
        setSelectedSubItem(subItem.id);
        setIsDropdownOpen(false);
    };
    return (
        <section className="">
            <div className="relative w-[200px] px-2">
                <label className="text-base p-2" htmlFor="">Blog</label>
                <input
                    type="text"
                    className="w-full p-2 border border-black rounded-lg"
                    value={inputValue}
                    onChange={handleInputChange}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    placeholder="Select an option"
                />
                {isDropdownOpen && (
                    <ul
                        className="absolute top-full left-0 right-0 border bg-white z-[1000] p-0 m-0 list-none rounded-lg"
                    >
                        {dropdownItems.map((item) => (
                            <li key={item.id} style={{ padding: "8px" }}>
                                <div
                                    onClick={() => handleDropdownClick(item)}
                                    className={`p-2 font-semibold cursor-pointer flex justify-between hover:rounded-lg hover:bg-gray-200 ${selectedItem === item.id ? "bg-gray-200" : "bg-white"}`}
                                >
                                    {item.label}
                                    {selectedItem === item.id && <FaCheck />}
                                </div>
                                {expandedItemId === item.id && item.subItems && item.subItems.length > 0 && (
                                    <ul className="list-none p-0 m-0 mt-2 border-l rounded-lg border">
                                        {item.subItems.map((subItem) => (
                                            <li
                                                key={subItem.id}
                                                onClick={() => handleSubItemClick(subItem)}
                                                className={`p-2 pl-6 cursor-pointer flex justify-between hover:rounded-lg hover:bg-gray-200 ${selectedSubItem === subItem.id ? "bg-gray-200" : "bg-white"}`}
                                            >
                                                {subItem.label}
                                                {selectedSubItem === subItem.id && <FaCheck />}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}

                    </ul>
                )}
            </div>
        </section>
    )
};

interface DropdownItem {
    id: number;
    label: string;
}

const OnlineStore = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const dropdownItems: DropdownItem[] = [
        { id: 1, label: "Default Blog Posts" },
        // { id: 2, label: "Option 2" },
        // { id: 3, label: "Option 3" },
    ];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setIsDropdownOpen(true);
    };

    const handleDropdownClick = (item: DropdownItem) => {
        setInputValue(item.label);
        setSelectedItem(item.id);
        setIsDropdownOpen(false);
    };
    return (
        <div className="relative">
            <label className="text-sm" htmlFor="">Theme template</label>
            <input
                type="text"
                className="w-full p-1 border border-black rounded-lg"
                value={inputValue}
                onChange={handleInputChange}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                placeholder="Select an option"
            />
            {isDropdownOpen && (
                <ul
                    className="absolute top-full left-0 right-0 border bg-white z-[1000] p-0 m-0 list-none rounded-lg">
                    {dropdownItems.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => handleDropdownClick(item)}
                            className={`p-2 cursor-pointer flex justify-between font-semibold hover:bg-[#EBEBEB] ${selectedItem === item.id ? "#f0f0f0" : "#fff"}`} >
                            {item.label}
                            {selectedItem === item.id && <FaCheck />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
};
