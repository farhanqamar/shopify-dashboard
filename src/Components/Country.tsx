import {useState} from 'react'
import { countryCodes } from './CountryCodeInput';


const Country = () => {
    const [selectedCode, setSelectedCode] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
  
    const handleSelectCode = (code: string) => {
      setSelectedCode(code);
      setShowDropdown(false);
    };
  return (
    <div className=' w-full relative space-y-4'>

      {/* Input Field */}
      <input
        type="text"
        value={selectedCode}
        onClick={() => setShowDropdown(!showDropdown)}
        readOnly
        placeholder="Pakistan"
        className='w-full p-2 border border-black rounded-lg'
      />
      
      <div className='flex flex-col w-full py-2'>
          <label htmlFor="">Harmonized System (HS) Code</label>
          <input type="text" placeholder='Search By Product KeyWord Or Code' className='w-full p-2 border border-black rounded-lg'/>
      </div>

      {/* Dropdown List */}
      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            zIndex: 1,
          }}
        >
          {countryCodes.map((country, index) => (
            <div
              key={index}
              onClick={() => handleSelectCode(country.code)}
              style={{ width: '100%', padding: '8px', cursor: 'pointer', borderBottom: '1px solid #ddd' }}
            >
              {country.name}
               {/* ({country.code}) */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
};

export default Country
