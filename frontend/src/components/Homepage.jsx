import React, { useState, useMemo } from 'react';
import { diseases } from '../data/diseases';
import { useFavorites } from '../hooks/useFavorites';
import Navbar from './Navbar';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import DiseaseCard from './DiseaseCard';
import DiseaseModal from './DiseaseModal';
import '../styles/Homepage.css';

const Homepage = ({ user, onLogout, onOpenAIChat }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Filter diseases based on category and search
  const filteredDiseases = useMemo(() => {
    let filtered = diseases;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(disease => disease.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(disease =>
        disease.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disease.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disease.symptoms.some(symptom =>
          symptom.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleCardClick = (disease) => {
    setSelectedDisease(disease);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDisease(null), 300);
  };

  return (
    <div className="homepage">
      <Navbar 
        user={user}
        onLogout={onLogout}
        favoritesCount={favorites.length}
        onOpenAIChat={onOpenAIChat}
      />

      <div className="homepage-hero">
        <div className="homepage-hero-background">
          <div className="homepage-gradient-orb orb-1"></div>
          <div className="homepage-gradient-orb orb-2"></div>
        </div>
        <div className="homepage-hero-content">
          <h1 className="homepage-hero-title">
            Welcome back, <span className="user-name">{user?.displayName || user?.name || 'Healer'}</span>! 🌿
          </h1>
          <p className="homepage-hero-subtitle">
            Explore natural remedies and holistic healing solutions for common health conditions
          </p>
        </div>
      </div>

      <div className="homepage-content">
        <div className="homepage-filters">
          <CategoryFilter
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            resultsCount={filteredDiseases.length}
          />
        </div>

        <div className="homepage-stats">
          <div className="stat-card">
            <div className="stat-icon">🌿</div>
            <div className="stat-content">
              <div className="stat-number">{diseases.length}</div>
              <div className="stat-label">Total Conditions</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💚</div>
            <div className="stat-content">
              <div className="stat-number">{favorites.length}</div>
              <div className="stat-label">Your Favorites</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔍</div>
            <div className="stat-content">
              <div className="stat-number">{filteredDiseases.length}</div>
              <div className="stat-label">Search Results</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <div className="stat-number">500+</div>
              <div className="stat-label">Natural Remedies</div>
            </div>
          </div>
        </div>

        {filteredDiseases.length === 0 ? (
          <div className="homepage-empty">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">No results found</h3>
            <p className="empty-text">
              Try adjusting your search or filter to find what you're looking for
            </p>
            <button 
              className="empty-button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="homepage-section-header">
              <h2 className="section-title">
                {selectedCategory === 'All' 
                  ? 'All Natural Healing Solutions' 
                  : `${selectedCategory} Solutions`}
              </h2>
              <p className="section-subtitle">
                Discover evidence-based Ayurvedic remedies for holistic wellness
              </p>
            </div>

            <div className="homepage-diseases-grid">
              {filteredDiseases.map((disease) => (
                <DiseaseCard
                  key={disease.id}
                  disease={disease}
                  isFavorite={isFavorite(disease.id)}
                  onToggleFavorite={toggleFavorite}
                  onSelect={handleCardClick}
                />
              ))}
            </div>
          </>
        )}

        <div className="homepage-cta">
          <div className="cta-card">
            <div className="cta-icon">🤖</div>
            <div className="cta-content">
              <h3 className="cta-title">Need Personalized Guidance?</h3>
              <p className="cta-text">
                Chat with our AI assistant to get customized remedy recommendations based on your specific symptoms
              </p>
              <button className="cta-button">
                Ask AI Assistant
                <span className="cta-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedDisease && (
        <DiseaseModal
          disease={selectedDisease}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isFavorite={isFavorite(selectedDisease.id)}
          onToggleFavorite={() => toggleFavorite(selectedDisease.id)}
        />
      )}
    </div>
  );
};

export default Homepage;
