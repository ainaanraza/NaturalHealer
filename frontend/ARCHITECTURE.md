# 🏗️ Application Architecture - Natural Healer

## Component Hierarchy

```
App (State Management)
│
├─ Navbar
│  ├─ Logo with animated icon
│  ├─ Navigation links (Home, Favorites, About)
│  ├─ CTA Button (Get Started)
│  └─ Mobile hamburger menu
│
├─ Hero Section
│  ├─ Animated gradient orbs (background)
│  ├─ Badge (Ancient Wisdom, Modern Wellness)
│  ├─ Title with gradient text
│  ├─ Description
│  └─ Stats (12+ conditions, 50+ remedies, 24/7 AI)
│
├─ Main Content Container
│  │
│  ├─ Favorites Banner (conditional)
│  │  ├─ Heart icon
│  │  ├─ Text
│  │  └─ Close button
│  │
│  ├─ CategoryFilter
│  │  └─ Scrollable category tabs (7 categories)
│  │
│  ├─ SearchBar
│  │  ├─ Search icon
│  │  ├─ Input field
│  │  ├─ Clear button (conditional)
│  │  └─ Results count (conditional)
│  │
│  ├─ Results Header
│  │  ├─ Title (dynamic based on filters)
│  │  └─ Count badge
│  │
│  └─ Content Area (conditional)
│     │
│     ├─ Diseases Grid (if results found)
│     │  └─ DiseaseCard × N
│     │     ├─ Icon
│     │     ├─ Favorite button
│     │     ├─ Title
│     │     ├─ Description
│     │     ├─ Severity badge
│     │     ├─ Remedy count badge
│     │     └─ Gradient accent bar
│     │
│     └─ Empty State (if no results)
│        ├─ Icon
│        ├─ Title
│        ├─ Description
│        └─ Clear filters button (conditional)
│
└─ DiseaseModal (conditional, when disease selected)
   │
   ├─ Modal Backdrop (blur effect)
   └─ Modal Container
      │
      ├─ Header
      │  ├─ Icon wrapper (gradient background)
      │  ├─ Title section (name + description)
      │  ├─ Favorite button
      │  └─ Close button
      │
      └─ Body (2-column on desktop, 1-column on mobile)
         │
         ├─ Content Column
         │  │
         │  ├─ Info Cards Grid
         │  │  ├─ Duration card
         │  │  ├─ Dosha card
         │  │  └─ Severity card
         │  │
         │  ├─ Remedies Section
         │  │  ├─ Section header with icon
         │  │  └─ Numbered remedy list
         │  │
         │  ├─ Prevention Section
         │  │  ├─ Section header with icon
         │  │  └─ Prevention cards grid
         │  │
         │  └─ Disclaimer
         │     ├─ Warning icon
         │     └─ Disclaimer text
         │
         └─ Sidebar Column (AI Assistant)
            │
            └─ AIAssistant
               │
               ├─ Header
               │  ├─ Avatar with status indicator
               │  └─ Title + subtitle
               │
               ├─ Messages Area (scrollable)
               │  ├─ Welcome message
               │  ├─ User messages (blue, right-aligned)
               │  ├─ Assistant messages (green, left-aligned)
               │  └─ Typing indicator (when AI is responding)
               │
               ├─ Quick Questions (if no messages sent)
               │  └─ 4 quick question buttons
               │
               └─ Input Area
                  ├─ Text input field
                  └─ Send button
```

## Data Flow

```
┌─────────────────────────────────────────────────┐
│                    App.jsx                       │
│                                                  │
│  State:                                         │
│  • selectedDisease (for modal)                  │
│  • searchQuery                                  │
│  • activeCategory                               │
│  • showFavoritesOnly                           │
│                                                  │
│  Custom Hook:                                   │
│  • useFavorites()                               │
│    - favorites array                            │
│    - toggleFavorite(id)                         │
│    - isFavorite(id)                             │
└─────────────────────────────────────────────────┘
           │
           ├─ Props to Children
           │
           ├─ searchQuery ────────► SearchBar
           ├─ activeCategory ─────► CategoryFilter
           ├─ filteredDiseases ───► DiseaseCard (map)
           ├─ selectedDisease ────► DiseaseModal
           └─ favorites methods ──► All components

┌─────────────────────────────────────────────────┐
│              useFavorites Hook                   │
│                                                  │
│  • Reads from localStorage on mount             │
│  • Writes to localStorage on change             │
│  • Returns: favorites, toggleFavorite, isFavorite│
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│            data/diseases.js                      │
│                                                  │
│  Exports:                                       │
│  • diseases array (12 conditions)               │
│  • categories array (7 categories)              │
│  • aiKnowledge object (knowledge base)          │
│  • generateAIResponse function                  │
└─────────────────────────────────────────────────┘
```

## Filtering Logic

```javascript
filteredDiseases = useMemo(() => {
  let filtered = diseases
  
  // Step 1: Filter by category
  if (activeCategory !== 'all') {
    filtered = filtered.filter(d => d.category === activeCategory)
  }
  
  // Step 2: Filter by search query
  if (searchQuery.trim()) {
    filtered = filtered.filter(d =>
      d.title.includes(query) ||
      d.desc.includes(query) ||
      d.remedies.some(r => r.includes(query)) ||
      d.prevention.some(p => p.includes(query))
    )
  }
  
  // Step 3: Filter by favorites
  if (showFavoritesOnly) {
    filtered = filtered.filter(d => isFavorite(d.id))
  }
  
  return filtered
}, [searchQuery, activeCategory, showFavoritesOnly, favorites])
```

## AI Response Generation

```javascript
generateAIResponse({ diseaseId, userQuestion })
  │
  ├─ Check question type (keyword-based)
  │  ├─ "how long" / "duration" → Duration info
  │  ├─ "diet" / "food" / "eat" → Dietary advice
  │  ├─ "herb" / "medicine" → Herb recommendations
  │  ├─ "prevent" / "avoid" → Prevention tips
  │  ├─ "yoga" / "exercise" → Exercise guidance
  │  └─ "serious" / "doctor" → Medical advice
  │
  ├─ Fetch from aiKnowledge[diseaseId]
  │  ├─ overview
  │  ├─ tips array
  │  └─ herbs array
  │
  └─ Return formatted response with disclaimer
```

## State Updates Flow

```
User Action → State Update → Re-render → UI Update

Examples:

1. Category Selection:
   Click category → setActiveCategory → useMemo recalculates 
   → filtered diseases update → Grid re-renders

2. Favorite Toggle:
   Click heart → toggleFavorite → localStorage update 
   → favorites state update → Card re-renders

3. Search:
   Type query → setSearchQuery → useMemo recalculates
   → filtered diseases update → Grid re-renders

4. Modal Open:
   Click card → setSelectedDisease → Modal renders
   → Prevent body scroll → Focus trap

5. AI Chat:
   Send message → Add to messages array → Scroll to bottom
   → Generate response → Add assistant message → Scroll again
```

## CSS Architecture

```
Global Styles (App.css)
├─ Reset and base styles
├─ Layout containers
├─ Utility classes
└─ Responsive breakpoints

Component Styles (modular)
├─ Navbar.css (navigation)
├─ Hero.css (hero section + animations)
├─ CategoryFilter.css (filter tabs)
├─ SearchBar.css (search component)
├─ DiseaseCard.css (card component + hover)
├─ DiseaseModal.css (modal layout)
└─ AIAssistant.css (chat interface)

Theme System (theme.js)
├─ Color palette
│  ├─ Primary colors
│  ├─ Background shades
│  ├─ Text colors
│  └─ Category colors (7 sets)
├─ Spacing scale
├─ Border radius scale
├─ Shadow scale
└─ Transition timings
```

## Performance Optimizations

```
1. Memoization
   • useMemo for filtered diseases
   • Prevents unnecessary recalculations

2. Conditional Rendering
   • Modal only renders when disease selected
   • Quick questions only show on first message
   • Empty state only when no results

3. Event Delegation
   • Click handlers on cards vs individual elements
   • Reduces listener count

4. CSS Animations
   • GPU-accelerated (transform, opacity)
   • Will-change hints where needed
   • Staggered animations for smooth appearance

5. Lazy Loading Ready
   • Component structure supports code splitting
   • Assets can be lazy loaded

6. LocalStorage Caching
   • Favorites persist without server calls
   • Instant load on page refresh
```

## Responsive Strategy

```
Mobile First Approach:

Base Styles (Mobile < 768px)
├─ Single column layouts
├─ Full-width elements
├─ Stacked components
├─ Hamburger menu
└─ Touch-friendly spacing

Tablet Styles (≥ 768px)
├─ 2-column grids start
├─ Horizontal navigation visible
├─ Increased spacing
└─ Hover states enabled

Desktop Styles (≥ 1024px)
├─ 3+ column grids
├─ Sidebar layouts
├─ Maximum widths applied
└─ Advanced interactions
```

## Accessibility Tree

```
Document
└─ Main Application
   ├─ Navigation [role="navigation"]
   │  ├─ Brand Link
   │  ├─ Navigation Links
   │  └─ CTA Button
   │
   ├─ Main Content [role="main"]
   │  ├─ Hero Section
   │  ├─ Search [role="search"]
   │  ├─ Categories [role="tablist"]
   │  └─ Disease Grid
   │     └─ Cards [role="button"]
   │
   └─ Modal [role="dialog", aria-modal="true"]
      ├─ Header
      ├─ Content [role="document"]
      └─ Assistant [role="complementary"]

Keyboard Navigation:
• Tab: Move focus
• Enter/Space: Activate buttons
• Escape: Close modals
• Arrow keys: Navigate categories
```

---

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Reusable components
- ✅ Efficient state management
- ✅ Scalable structure
- ✅ Maintainable codebase
- ✅ Performance optimized
- ✅ Accessibility compliant
- ✅ Mobile responsive
