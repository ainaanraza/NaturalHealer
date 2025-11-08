import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/LandingPage.css'

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <Navbar />
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-background">
          <div className="landing-gradient-orb orb-1"></div>
          <div className="landing-gradient-orb orb-2"></div>
          <div className="landing-gradient-orb orb-3"></div>
        </div>
        
        <div className="landing-hero-content">
          <div className="landing-badge">
            <span className="landing-badge-icon">🌿</span>
            <span>Ancient Wisdom Meets Modern Technology</span>
          </div>
          
          <h1 className="landing-hero-title">
            Your Journey to
            <span className="landing-title-gradient"> Natural Wellness</span>
            <br />Starts Here
          </h1>
          
          <p className="landing-hero-description">
            Discover the power of Ayurveda combined with AI technology. Get personalized 
            natural remedies, expert guidance, and holistic health solutions - all in one platform.
          </p>
          
          <div className="landing-hero-actions">
            <button className="landing-cta-primary" onClick={() => navigate('/signup')}>
              <span>Get Started Free</span>
              <span className="landing-cta-icon">→</span>
            </button>
            <button className="landing-cta-secondary">
              <span className="landing-play-icon">▶</span>
              <span>Watch Demo</span>
            </button>
          </div>
          
          <div className="landing-hero-stats">
            <div className="landing-stat">
              <div className="landing-stat-number">10K+</div>
              <div className="landing-stat-label">Happy Users</div>
            </div>
            <div className="landing-stat-divider"></div>
            <div className="landing-stat">
              <div className="landing-stat-number">50+</div>
              <div className="landing-stat-label">Natural Remedies</div>
            </div>
            <div className="landing-stat-divider"></div>
            <div className="landing-stat">
              <div className="landing-stat-number">24/7</div>
              <div className="landing-stat-label">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="landing-container">
          <div className="landing-section-header">
            <span className="landing-section-badge">Features</span>
            <h2 className="landing-section-title">
              Everything You Need for
              <span className="landing-text-gradient"> Natural Healing</span>
            </h2>
            <p className="landing-section-desc">
              Comprehensive tools and resources to support your wellness journey
            </p>
          </div>
          
          <div className="landing-features-grid">
            <div className="landing-feature-card">
              <div className="landing-feature-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                🤖
              </div>
              <h3 className="landing-feature-title">AI Health Assistant</h3>
              <p className="landing-feature-desc">
                Get instant answers from our Ayurvedic AI expert. Available 24/7 to guide your wellness journey.
              </p>
              <ul className="landing-feature-list">
                <li>Personalized recommendations</li>
                <li>Natural remedy suggestions</li>
                <li>Diet & lifestyle guidance</li>
              </ul>
            </div>
            
            <div className="landing-feature-card">
              <div className="landing-feature-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
                📚
              </div>
              <h3 className="landing-feature-title">Remedy Library</h3>
              <p className="landing-feature-desc">
                Access 50+ natural remedies for common ailments. Detailed instructions and precautions included.
              </p>
              <ul className="landing-feature-list">
                <li>Evidence-based treatments</li>
                <li>Step-by-step guides</li>
                <li>Safety information</li>
              </ul>
            </div>
            
            <div className="landing-feature-card">
              <div className="landing-feature-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                🎯
              </div>
              <h3 className="landing-feature-title">Personalized Plans</h3>
              <p className="landing-feature-desc">
                Get customized wellness plans based on your dosha, health goals, and lifestyle.
              </p>
              <ul className="landing-feature-list">
                <li>Dosha assessment</li>
                <li>Custom routines</li>
                <li>Progress tracking</li>
              </ul>
            </div>
            
            <div className="landing-feature-card">
              <div className="landing-feature-icon" style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)' }}>
                🧘
              </div>
              <h3 className="landing-feature-title">Holistic Guidance</h3>
              <p className="landing-feature-desc">
                Yoga, meditation, and breathing exercises designed to complement your healing journey.
              </p>
              <ul className="landing-feature-list">
                <li>Guided practices</li>
                <li>Video tutorials</li>
                <li>Daily routines</li>
              </ul>
            </div>
            
            <div className="landing-feature-card">
              <div className="landing-feature-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                💊
              </div>
              <h3 className="landing-feature-title">Herbal Knowledge</h3>
              <p className="landing-feature-desc">
                Comprehensive database of medicinal herbs, their properties, and traditional uses.
              </p>
              <ul className="landing-feature-list">
                <li>Plant encyclopedia</li>
                <li>Usage guidelines</li>
                <li>Interaction warnings</li>
              </ul>
            </div>
            
            <div className="landing-feature-card">
              <div className="landing-feature-icon" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
                📊
              </div>
              <h3 className="landing-feature-title">Health Tracking</h3>
              <p className="landing-feature-desc">
                Monitor your symptoms, remedies, and progress over time with intuitive dashboards.
              </p>
              <ul className="landing-feature-list">
                <li>Symptom journal</li>
                <li>Treatment logs</li>
                <li>Visual insights</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="landing-how-it-works">
        <div className="landing-container">
          <div className="landing-section-header">
            <span className="landing-section-badge">Process</span>
            <h2 className="landing-section-title">
              How <span className="landing-text-gradient">Natural Healer</span> Works
            </h2>
            <p className="landing-section-desc">
              Simple steps to start your natural healing journey
            </p>
          </div>
          
          <div className="landing-steps">
            <div className="landing-step">
              <div className="landing-step-number">1</div>
              <div className="landing-step-content">
                <h3 className="landing-step-title">Create Your Profile</h3>
                <p className="landing-step-desc">
                  Sign up and complete your health assessment to determine your unique dosha type
                </p>
              </div>
              <div className="landing-step-icon">👤</div>
            </div>
            
            <div className="landing-step-connector"></div>
            
            <div className="landing-step">
              <div className="landing-step-number">2</div>
              <div className="landing-step-content">
                <h3 className="landing-step-title">Explore Remedies</h3>
                <p className="landing-step-desc">
                  Browse our extensive library of natural treatments or ask our AI assistant for recommendations
                </p>
              </div>
              <div className="landing-step-icon">🔍</div>
            </div>
            
            <div className="landing-step-connector"></div>
            
            <div className="landing-step">
              <div className="landing-step-number">3</div>
              <div className="landing-step-content">
                <h3 className="landing-step-title">Get Personalized Plan</h3>
                <p className="landing-step-desc">
                  Receive a customized wellness plan with remedies, diet, yoga, and lifestyle recommendations
                </p>
              </div>
              <div className="landing-step-icon">📋</div>
            </div>
            
            <div className="landing-step-connector"></div>
            
            <div className="landing-step">
              <div className="landing-step-number">4</div>
              <div className="landing-step-content">
                <h3 className="landing-step-title">Track Progress</h3>
                <p className="landing-step-desc">
                  Monitor your journey, adjust treatments, and achieve optimal health naturally
                </p>
              </div>
              <div className="landing-step-icon">📈</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="landing-benefits">
        <div className="landing-container">
          <div className="landing-benefits-layout">
            <div className="landing-benefits-content">
              <span className="landing-section-badge">Benefits</span>
              <h2 className="landing-section-title">
                Why Choose
                <span className="landing-text-gradient"> Natural Healing?</span>
              </h2>
              
              <div className="landing-benefits-list">
                <div className="landing-benefit-item">
                  <div className="landing-benefit-icon">✓</div>
                  <div className="landing-benefit-text">
                    <h4>No Side Effects</h4>
                    <p>Natural remedies work with your body, not against it</p>
                  </div>
                </div>
                
                <div className="landing-benefit-item">
                  <div className="landing-benefit-icon">✓</div>
                  <div className="landing-benefit-text">
                    <h4>Time-Tested Wisdom</h4>
                    <p>5000+ years of Ayurvedic knowledge and practice</p>
                  </div>
                </div>
                
                <div className="landing-benefit-item">
                  <div className="landing-benefit-icon">✓</div>
                  <div className="landing-benefit-text">
                    <h4>Holistic Approach</h4>
                    <p>Treats root causes, not just symptoms</p>
                  </div>
                </div>
                
                <div className="landing-benefit-item">
                  <div className="landing-benefit-icon">✓</div>
                  <div className="landing-benefit-text">
                    <h4>Cost-Effective</h4>
                    <p>Affordable natural solutions for everyone</p>
                  </div>
                </div>
                
                <div className="landing-benefit-item">
                  <div className="landing-benefit-icon">✓</div>
                  <div className="landing-benefit-text">
                    <h4>Sustainable Wellness</h4>
                    <p>Long-term health improvement and prevention</p>
                  </div>
                </div>
                
                <div className="landing-benefit-item">
                  <div className="landing-benefit-icon">✓</div>
                  <div className="landing-benefit-text">
                    <h4>AI-Powered Insights</h4>
                    <p>Modern technology meets ancient wisdom</p>
                  </div>
                </div>
              </div>
              
              <button className="landing-cta-primary" onClick={() => navigate('/signup')}>
                Start Your Journey
                <span className="landing-cta-icon">→</span>
              </button>
            </div>
            
            <div className="landing-benefits-visual">
              <div className="landing-visual-card card-1">
                <div className="landing-visual-icon">🌱</div>
                <div className="landing-visual-stat">95%</div>
                <div className="landing-visual-label">User Satisfaction</div>
              </div>
              <div className="landing-visual-card card-2">
                <div className="landing-visual-icon">⭐</div>
                <div className="landing-visual-stat">4.9/5</div>
                <div className="landing-visual-label">Average Rating</div>
              </div>
              <div className="landing-visual-card card-3">
                <div className="landing-visual-icon">💚</div>
                <div className="landing-visual-stat">10K+</div>
                <div className="landing-visual-label">Success Stories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Insights & Statistics */}
      <section className="landing-testimonials">
        <div className="landing-container">
          <div className="landing-section-header">
            <span className="landing-section-badge">Health Insights</span>
            <h2 className="landing-section-title">
              Proven <span className="landing-text-gradient">Health Benefits</span>
            </h2>
            <p className="landing-section-desc">
              Evidence-based natural remedies backed by traditional wisdom
            </p>
          </div>
          
          <div className="landing-testimonials-grid">
            <div className="landing-testimonial-card">
              <div className="landing-insight-icon">🌿</div>
              <h3 className="landing-insight-title">Natural Immunity</h3>
              <p className="landing-testimonial-text">
                Studies show that regular consumption of Ayurvedic herbs like Tulsi and Turmeric 
                can boost immunity by up to 40% and reduce inflammation naturally.
              </p>
              <div className="landing-insight-stats">
                <div className="landing-insight-stat">
                  <div className="landing-stat-number">40%</div>
                  <div className="landing-stat-label">Immunity Boost</div>
                </div>
                <div className="landing-insight-stat">
                  <div className="landing-stat-number">85%</div>
                  <div className="landing-stat-label">User Satisfaction</div>
                </div>
              </div>
            </div>
            
            <div className="landing-testimonial-card">
              <div className="landing-insight-icon">🧘</div>
              <h3 className="landing-insight-title">Stress Reduction</h3>
              <p className="landing-testimonial-text">
                Ashwagandha and meditation techniques have been clinically proven to reduce 
                cortisol levels by 28% and improve sleep quality significantly.
              </p>
              <div className="landing-insight-stats">
                <div className="landing-insight-stat">
                  <div className="landing-stat-number">28%</div>
                  <div className="landing-stat-label">Less Stress</div>
                </div>
                <div className="landing-insight-stat">
                  <div className="landing-stat-number">92%</div>
                  <div className="landing-stat-label">Better Sleep</div>
                </div>
              </div>
            </div>
            
            <div className="landing-testimonial-card">
              <div className="landing-insight-icon">💪</div>
              <h3 className="landing-insight-title">Digestive Health</h3>
              <p className="landing-testimonial-text">
                Traditional Ayurvedic remedies like Triphala and ginger have shown to improve 
                digestive health and gut microbiome balance in 70% of users.
              </p>
              <div className="landing-insight-stats">
                <div className="landing-insight-stat">
                  <div className="landing-stat-number">70%</div>
                  <div className="landing-stat-label">Improved Digestion</div>
                </div>
                <div className="landing-insight-stat">
                  <div className="landing-stat-number">95%</div>
                  <div className="landing-stat-label">Natural Solution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="landing-final-cta">
        <div className="landing-container">
          <div className="landing-cta-card">
            <div className="landing-cta-content">
              <h2 className="landing-cta-title">
                Ready to Transform Your Health Naturally?
              </h2>
              <p className="landing-cta-desc">
                Join thousands of users who have discovered the power of natural healing. 
                Start your journey today - it's free!
              </p>
              <div className="landing-cta-actions">
                <button className="landing-cta-primary large" onClick={() => navigate('/signup')}>
                  Get Started Free
                  <span className="landing-cta-icon">→</span>
                </button>
                <p className="landing-cta-note">No credit card required • 7-day free trial</p>
              </div>
            </div>
            <div className="landing-cta-features">
              <div className="landing-cta-feature">
                <span className="landing-cta-feature-icon">✓</span>
                <span>Access to all remedies</span>
              </div>
              <div className="landing-cta-feature">
                <span className="landing-cta-feature-icon">✓</span>
                <span>Unlimited AI consultations</span>
              </div>
              <div className="landing-cta-feature">
                <span className="landing-cta-feature-icon">✓</span>
                <span>Personalized wellness plans</span>
              </div>
              <div className="landing-cta-feature">
                <span className="landing-cta-feature-icon">✓</span>
                <span>Progress tracking tools</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="landing-footer-content">
            <div className="landing-footer-brand">
              <div className="landing-footer-logo">
                <span className="landing-footer-logo-icon">🌿</span>
                <span className="landing-footer-logo-text">Natural Healer</span>
              </div>
              <p className="landing-footer-desc">
                Empowering your wellness journey with ancient wisdom and modern technology.
              </p>
            </div>
          </div>
          
          <div className="landing-footer-bottom">
            <p>&copy; Made By: #AbdullahSlash</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
