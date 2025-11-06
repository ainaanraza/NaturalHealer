// Theme configuration and color system
export const theme = {
  colors: {
    // Background gradients
    bgPrimary: '#0a0e1a',
    bgSecondary: '#121827',
    bgTertiary: '#1a2234',
    
    // Accent colors
    primary: '#10b981',      // Emerald green
    secondary: '#8b5cf6',    // Purple
    accent: '#f59e0b',       // Amber
    
    // Text
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    
    // Disease category colors
    respiratory: {
      primary: '#06b6d4',    // Cyan
      secondary: '#22d3ee',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)'
    },
    digestive: {
      primary: '#f59e0b',    // Amber
      secondary: '#fbbf24',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
    },
    mental: {
      primary: '#8b5cf6',    // Purple
      secondary: '#a78bfa',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)'
    },
    skin: {
      primary: '#ec4899',    // Pink
      secondary: '#f472b6',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)'
    },
    musculoskeletal: {
      primary: '#6366f1',    // Indigo
      secondary: '#818cf8',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)'
    },
    wellness: {
      primary: '#10b981',    // Emerald
      secondary: '#34d399',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
    },
    chronic: {
      primary: '#ef4444',    // Red
      secondary: '#f87171',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)'
    }
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px'
  },
  
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
    md: '0 4px 16px rgba(0, 0, 0, 0.2)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.3)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.4)',
    glow: '0 0 32px rgba(16, 185, 129, 0.3)'
  },
  
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)'
  }
}
