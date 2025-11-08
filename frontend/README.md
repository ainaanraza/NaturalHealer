# 🌿 Natural Healer - Ayurvedic Wellness Platform

A modern, beautifully designed React application for discovering natural Ayurvedic remedies and wellness guidance. Features an intelligent AI assistant, comprehensive remedy database, and intuitive user experience.

![Version](https://img.shields.io/badge/version-2.0.0-green)
![React](https://img.shields.io/badge/react-18.3.1-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

### 🎨 Modern Design
- **Gradient-based UI** with smooth animations and transitions
- **Dark theme** optimized for comfortable viewing
- **Responsive design** that works beautifully on all devices
- **Glassmorphism effects** for a premium look
- **Micro-interactions** throughout the interface

### 🔍 Smart Discovery
- **Category filtering** by health condition type (Respiratory, Digestive, Mental Wellness, etc.)
- **Advanced search** across conditions, symptoms, and remedies
- **Favorites system** to save your preferred remedies
- **12+ conditions** with 50+ natural remedies

### 🤖 AI Wellness Assistant
- **Intelligent chatbot** powered by Ayurvedic knowledge base
- **Context-aware responses** tailored to specific conditions
- **Quick question buttons** for common queries
- **Real-time conversation** with typing indicators
- **Educational guidance** on herbs, diet, prevention, and lifestyle

### 📱 User Experience
- **Smooth animations** using CSS transitions and keyframes
- **Loading states** and feedback throughout
- **Accessibility features** including ARIA labels and keyboard navigation
- **Local storage** for persistent favorites
- **Modal dialogs** with detailed condition information

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm installed
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd NaturalHealer/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.jsx       # Navigation bar with mobile menu
│   │   ├── Hero.jsx         # Hero section with animated gradients
│   │   ├── CategoryFilter.jsx  # Category selection tabs
│   │   ├── SearchBar.jsx    # Search input with clear button
│   │   ├── DiseaseCard.jsx  # Condition card with hover effects
│   │   ├── DiseaseModal.jsx # Detailed condition modal
│   │   └── AIAssistant.jsx  # AI chat interface
│   ├── data/
│   │   └── diseases.js      # Health conditions and AI knowledge base
│   ├── hooks/
│   │   └── useFavorites.js  # Custom hook for favorites management
│   ├── styles/              # Component-specific CSS modules
│   │   ├── App.css
│   │   ├── Navbar.css
│   │   ├── Hero.css
│   │   ├── CategoryFilter.css
│   │   ├── SearchBar.css
│   │   ├── DiseaseCard.css
│   │   ├── DiseaseModal.css
│   │   └── AIAssistant.css
│   ├── theme.js             # Design system and color palette
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🎨 Design System

### Color Palette

The application uses a carefully crafted color system:

- **Primary**: Emerald Green (#10b981) - Represents nature and healing
- **Backgrounds**: Deep navy blues for comfortable viewing
- **Category Colors**:
  - 🌬️ Respiratory: Cyan (#06b6d4)
  - 🍃 Digestive: Amber (#f59e0b)
  - 🧘 Mental: Purple (#8b5cf6)
  - ✨ Skin: Pink (#ec4899)
  - 🦴 Musculoskeletal: Indigo (#6366f1)
  - 💊 Chronic: Red (#ef4444)

### Typography
- **System fonts** for optimal performance and native look
- **Font weights**: 400 (normal), 600 (semibold), 700 (bold), 800 (extrabold), 900 (black)
- **Responsive sizing** using clamp() for fluid typography

### Animations
- Smooth transitions (300ms cubic-bezier)
- Fade-in and slide-up effects on mount
- Hover effects with transform and shadow changes
- Pulsing indicators for active states

## 🧩 Key Components

### Navbar
- Sticky navigation with blur backdrop
- Mobile-responsive hamburger menu
- Quick access to favorites and actions

### Hero
- Animated gradient orbs in background
- Statistics showcase (12+ conditions, 50+ remedies, 24/7 AI)
- Eye-catching title with gradient text

### Category Filter
- Horizontal scrollable tabs
- Icon + text for each category
- Active state with glow effect

### Disease Card
- Hover effects with elevation and glow
- Favorite button with heart animation
- Severity and remedy count badges
- Color-coded gradient accent

### Disease Modal
- Full-screen overlay with backdrop blur
- Detailed information sections:
  - Duration, Dosha, Severity info cards
  - Numbered remedy list
  - Prevention tips grid
  - Important disclaimer
- Integrated AI assistant sidebar

### AI Assistant
- Real-time chat interface
- Typing indicators
- Quick question buttons
- Message history with timestamps
- Context-aware responses

## 💡 Usage Examples

### Browsing Remedies
1. Browse all conditions on the homepage
2. Use category filters to narrow down by condition type
3. Search for specific symptoms or remedies
4. Click any card to view detailed information

### Adding Favorites
1. Click the heart icon on any disease card
2. Access favorites from the navbar
3. Favorites persist across sessions

### Using AI Assistant
1. Open any condition modal
2. Find the AI Assistant in the right sidebar
3. Type questions or use quick question buttons
4. Get personalized Ayurvedic guidance

## 🔒 Disclaimer

**Important**: This application provides educational information about Ayurvedic remedies and should not be considered medical advice. Always consult with qualified healthcare practitioners before:
- Starting any new treatment
- Making significant dietary changes
- Using herbal supplements
- Managing serious or chronic conditions

## 🛠️ Technologies Used

- **React 18.3.1** - UI library
- **Vite 5.4.0** - Build tool and dev server
- **CSS3** - Styling with modern features (Grid, Flexbox, Custom Properties)
- **LocalStorage API** - Favorites persistence
- **ES6+** - Modern JavaScript features

## 📈 Future Enhancements

- [ ] User authentication and profiles
- [ ] Personalized remedy recommendations
- [ ] Integration with real AI/ML models
- [ ] Community features (reviews, ratings)
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Remedy preparation videos
- [ ] Practitioner directory
- [ ] Health tracking features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created with ❤️ for natural wellness enthusiasts

## 🙏 Acknowledgments

- Ayurvedic wisdom and traditional knowledge
- React and Vite communities
- All contributors to natural healing practices

---

**Remember**: Prevention is better than cure. Maintain balance through proper diet, sleep, exercise, and stress management. 🌿✨
