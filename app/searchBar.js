import { useState, useEffect } from 'react';
import data from '../data'; // Assuming the data.js file is in the same directory
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    if (query === '?') {
      setResults([{ id: 'info', message: '<h1>Help with searching<h1/> <p>Use this tool to quickly search for users and projects across our entire platform. You can also use the search modifiers found in the footer below to limit the results to just users or projects.<p/>' }]);
    } else if (query.startsWith('#')) {
      const categoryId = parseInt(query.substring(1));
      const filteredResults = data.filter((post) => post.categoriesId.includes(categoryId));
      setResults(filteredResults);
    } else {
      const filteredResults = data.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    }
  };

  useEffect(() => {
    search();
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      search();
    }
  };

  const renderResults = () => {
    if (results.length === 0) {
      return <p className='text-black'>No results found.</p>;
    }

    const limitedResults = results.slice(0, 4);
    return limitedResults.map((post) => (
      <div key={post.id} className="result-item">
        <div className='flex flex row items-center'>
        <FontAwesomeIcon icon={faClock} className='flex mr-4 text-gray-800'/>
        <h3 className='m-1 text-gray-800 flex items-center'>{post.title}</h3>
        </div>
       
        {/* <p className='text-gray-600 border border-gray-400 rounded-xl p-2 ml-2 '>{post.desc}</p> */}
      </div>
    ));
  };
  
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className='text-black p-2 mt-0 w-full'
      />
      <hr className='mb-2'></hr>
      <p className='text-black text-sm'>Posts</p>
      {results.length > 0 && <div className="text-black search-results mb-2">{renderResults()}</div>}
      <p className='text-black text-sm mb-2'>Categories</p>
      <div className='flex flex row items-center'>
      <FontAwesomeIcon icon={faHashtag} className='flex mr-4 text-gray-600' />
      <div className="text-black search-results mb-2">Garden</div>
      </div>
      <div className='flex flex row items-center'>
      <FontAwesomeIcon icon={faHashtag} className='flex mr-4 text-gray-600' />
      <div className="text-black search-results mb-2">Industrial</div>
      </div>
      <div className='flex flex row items-center'>
      <FontAwesomeIcon icon={faHashtag} className='flex mr-4 text-gray-600' />
      <div className="text-black search-results mb-2">Automotive</div>
      </div>
      <div className='flex flex row items-center'>
      <FontAwesomeIcon icon={faHashtag} className='flex mr-4 text-gray-600' />
      <div className="text-black search-results mb-2">Health</div>
      </div>
    </div>
  );
};

export default SearchBar;
