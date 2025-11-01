import React from 'react';
import './ImageGrid.css';

const ImageGrid = ({ images, selectedImages, onImageSelect }) => {
  if (!images || images.length === 0) {
    return (
      <div className="no-results">
        <p>No images found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="image-grid">
      {images.map((image) => {
        const isSelected = selectedImages.has(image.id);
        return (
          <div
            key={image.id}
            className={`image-card ${isSelected ? 'selected' : ''}`}
          >
            <div className="image-wrapper">
              <img src={image.url} alt={image.alt} loading="lazy" />
              <div className="image-overlay">
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onImageSelect(image.id)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="image-info">
              <p className="image-author">
                Photo by{' '}
                <a
                  href={image.authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {image.author}
                </a>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;

