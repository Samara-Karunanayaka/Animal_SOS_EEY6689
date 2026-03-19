/**
 * Standardized Card Styles for Consistent UI
 * Apply these styles to all Card components across the application
 */

export const cardStyles = {
  // Stats Cards (120px height, consistent across all dashboards)
  stats: {
    sx: {
      height: '100%',
      minHeight: '120px',
      p: 2.5,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        transform: 'translateY(-4px)',
      },
    },
  },

  // Media Cards (Adoption, Landing, Success Stories - 240px height)
  media: {
    sx: {
      height: '100%',
      minHeight: '340px',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        transform: 'translateY(-6px)',
      },
    },
    mediaHeight: 240,
  },

  // List Item Cards (Reports, Cases - 80px height)
  listItem: {
    sx: {
      p: 2,
      mb: 1.5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '80px',
      transition: 'all 0.2s ease',
      '&:hover': {
        bgcolor: 'action.hover',
        boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
      },
    },
  },

  // Info Cards (Impact, Benefits - 160px height)
  info: {
    sx: {
      height: '100%',
      minHeight: '160px',
      p: 3,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        transform: 'translateY(-4px)',
      },
    },
  },

  // Detail Cards (Testimonials, Reviews - 200px min height)
  detail: {
    sx: {
      height: '100%',
      minHeight: '200px',
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      },
    },
  },

  // Full-width Section Cards (Dashboard sections)
  section: {
    sx: {
      p: 3,
      mb: 3,
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      },
    },
  },

  // Avatar sizes (standardized)
  avatarSizes: {
    stats: 50,
    listItem: 40,
    testimonial: 56,
    inline: 32,
  },

  // Standardized padding
  padding: {
    compact: 1.5,
    default: 2,
    comfortable: 2.5,
    spacious: 3,
  },

  // Standardized margins
  margin: {
    compact: 0.5,
    default: 1,
    comfortable: 1.5,
    spacious: 2,
  },
};

export default cardStyles;
