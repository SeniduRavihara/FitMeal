/**
 * Utility functions for consistent spacing with floating navigation bar
 */

// Height of the floating navigation bar + safe area
export const FLOATING_NAV_HEIGHT = 64; // Navigation bar height
export const FLOATING_NAV_BOTTOM_MARGIN = 34; // Safe area bottom margin
export const FLOATING_NAV_TOTAL_HEIGHT =
  FLOATING_NAV_HEIGHT + FLOATING_NAV_BOTTOM_MARGIN + 16; // Total space needed

/**
 * Get the bottom padding needed to prevent content from being covered by floating navigation
 */
export const getFloatingNavPadding = (): number => {
  return FLOATING_NAV_TOTAL_HEIGHT;
};

/**
 * Get content container style with proper bottom padding
 */
export const getScrollViewContentStyle = () => ({
  paddingBottom: getFloatingNavPadding(),
});

/**
 * Get bottom section style with proper padding
 */
export const getBottomSectionStyle = () => ({
  paddingBottom: getFloatingNavPadding(),
});
