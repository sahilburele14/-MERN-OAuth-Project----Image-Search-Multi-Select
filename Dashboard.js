import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import TopSearches from '../components/TopSearches';
import SearchBar from '../components/SearchBar';
import ImageGrid from '../components/ImageGrid';
import SearchHistory from '../components/SearchHistory';
import api from '../utils/api';

const Dashboard = ({ user, onLogout }) => {
  const [searchResults, setSearchResults] = useState(null);
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [topSearches, setTopSearches] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTopSearches();
    fetchSearchHistory();
  }, []);

  const fetchTopSearches = async () => {
    try {
      const response = await api.get('/api/top-searches');
      setTopSearches(response.data);
    } catch (error) {
      console.error('Error fetching top searches:', error);
    }
  };

  const fetchSearchHistory = async () => {
    try {
      const response = await api.get('/api/history');
      setSearchHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleSearch = async (term) => {
    setLoading(true);
    try {
      const response = await api.post('/api/search', { term });
      setSearchResults(response.data);
      setSelectedImages(new Set()); // Clear selections on new search
      fetchTopSearches(); // Refresh top searches
      fetchSearchHistory(); // Refresh search history
    } catch (error) {
      console.error('Search error:', error);
      alert('Failed to search images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (imageId) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setSelectedImages(newSelected);
  };

  const handleSelectAll = () => {
    if (searchResults && searchResults.images) {
      if (selectedImages.size === searchResults.images.length) {
        setSelectedImages(new Set());
      } else {
        setSelectedImages(new Set(searchResults.images.map(img => img.id)));
      }
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="app-title">Image Search</h1>
          <div className="user-info">
            {user.photo && (
              <img src={user.photo} alt={user.name} className="user-photo" />
            )}
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>
          </div>
        </div>
      </header>

      {/* Top Searches Banner */}
      <TopSearches searches={topSearches} onSearchClick={handleSearch} />

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Sidebar - Search History */}
        <aside className="sidebar">
          <SearchHistory history={searchHistory} onSearchClick={handleSearch} />
        </aside>

        {/* Main Area */}
        <main className="main-content">
          <SearchBar onSearch={handleSearch} loading={loading} />

          {searchResults && (
            <>
              <div className="search-info">
                <h2>You searched for "{searchResults.term}" - {searchResults.results} results.</h2>
                <div className="selection-controls">
                  <button 
                    onClick={handleSelectAll}
                    className="select-all-btn"
                  >
                    {selectedImages.size === searchResults.images.length 
                      ? 'Deselect All' 
                      : 'Select All'}
                  </button>
                  <span className="selected-counter">
                    Selected: {selectedImages.size} image{selectedImages.size !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <ImageGrid
                images={searchResults.images}
                selectedImages={selectedImages}
                onImageSelect={handleImageSelect}
              />
            </>
          )}

          {!searchResults && !loading && (
            <div className="welcome-message">
              <h2>Welcome, {user.name}!</h2>
              <p>Start searching for images above, or try one of the popular searches.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

