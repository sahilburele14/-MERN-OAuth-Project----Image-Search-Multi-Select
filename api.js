const express = require('express');
const axios = require('axios');
const Search = require('../models/Search');
const router = express.Router();

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Authentication required' });
};

// Top searches across all users
router.get('/top-searches', async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: '$term',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          term: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json(topSearches);
  } catch (error) {
    console.error('Error fetching top searches:', error);
    res.status(500).json({ error: 'Failed to fetch top searches' });
  }
});

// Search images
router.post('/search', isAuthenticated, async (req, res) => {
  try {
    const { term } = req.body;
    const userId = req.user._id;

    if (!term || term.trim() === '') {
      return res.status(400).json({ error: 'Search term is required' });
    }

    // Save search to database
    await Search.create({
      userId,
      term: term.trim()
    });

    // Fetch images from Unsplash API
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!unsplashAccessKey) {
      return res.status(500).json({ error: 'Unsplash API key not configured' });
    }

    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: term.trim(),
        per_page: 20,
        client_id: unsplashAccessKey
      }
    });

    const images = response.data.results.map(img => ({
      id: img.id,
      url: img.urls.regular,
      thumb: img.urls.thumb,
      alt: img.alt_description || term,
      description: img.description,
      author: img.user.name,
      authorUrl: img.user.links.html
    }));

    res.json({
      term: term.trim(),
      total: response.data.total,
      results: images.length,
      images
    });
  } catch (error) {
    console.error('Search error:', error);
    if (error.response) {
      res.status(error.response.status).json({ 
        error: 'Unsplash API error', 
        message: error.response.data 
      });
    } else {
      res.status(500).json({ error: 'Failed to search images' });
    }
  }
});

// Get user's search history
router.get('/history', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const history = await Search.find({ userId })
      .sort({ timestamp: -1 })
      .limit(20)
      .select('term timestamp')
      .lean();

    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

module.exports = router;

