import React from 'react';
import './SearchHistory.css';

const SearchHistory = ({ history, onSearchClick }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  if (!history || history.length === 0) {
    return (
      <div className="search-history">
        <h3 className="history-title">Search History</h3>
        <p className="no-history">No search history yet.</p>
      </div>
    );
  }

  return (
    <div className="search-history">
      <h3 className="history-title">Search History</h3>
      <ul className="history-list">
        {history.map((item, index) => (
          <li key={index} className="history-item">
            <button
              className="history-link"
              onClick={() => onSearchClick(item.term)}
            >
              <span className="history-term">{item.term}</span>
              <span className="history-time">{formatDate(item.timestamp)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;

