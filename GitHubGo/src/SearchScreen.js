import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchScreen.css';

export const SearchScreen = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleSearch = async () => {
    try {
      const repoResponse = await fetch(`https://api.github.com/search/repositories?q=${searchText}`);
      const repoData = await repoResponse.json();

      setSearchResults(repoData.items || []);
    } catch (error) {
      console.error('Failed to retrieve data from GitHub API:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="app-container">
      <div className="container">
        <h1 className="title">Search Screen</h1>
        <input
          type="text"
          placeholder="Enter search text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="input"
        />
        <button onClick={handleSearch} className="button">
          Search
        </button>
      </div>

      <div className="results-container">
        <h2 className="results-title">Search Results:</h2>
        {searchResults.map((result) => (
          <div key={result.id} className="repository-card">
            <h3 className="repository-name">{result.name}</h3>
            <p className="repository-description">
              {result.description || 'No description available'}
            </p>
            {/* <a href={result.html_url} target="_blank" rel="noopener noreferrer" className="view-button"> */}
            <Link to="/RepoScreen">View Repository</Link>
            {/* </a> */}
          </div>
        ))}
      </div>
    </div>
  );
};
