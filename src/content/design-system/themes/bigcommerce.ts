/**
 * BigCommerce Theme
 *
 * Extracted from 266 slides across 4 reference PPTX files.
 * DM Sans font family, BC purple (#6058FF) primary, 10" x 5.625" (16:9).
 */

import type { PresentationTheme } from '../theme-types.js';

export const bigcommerceTheme: PresentationTheme = {
  id: 'bigcommerce',
  name: 'BigCommerce',
  description: 'BigCommerce brand — DM Sans, BC purple, 10" x 5.625"',

  dimensions: { width: 10, height: 5.625 },

  colors: {
    primary: '6058FF',
    secondary: '3D3688',
    dark: '121118',
    light: 'F4F3F2',
    highlight: 'C7FD66',

    textPrimary: '121118',
    textSecondary: '3D3688',
    textBody: '2D2B36',
    textMuted: '6E6D76',
    textInverse: 'FFFFFF',

    backgroundWhite: 'FFFFFF',
    backgroundLight: 'F4F3F2',
    backgroundAccent: 'EEEDFC',
    backgroundDark: '121118',

    tableHeaderBg: '6058FF',
    tableHeaderText: 'FFFFFF',
    tableStripeBg: 'F4F3F2',
    tableBorderColor: 'D9D8D6',

    success: '00A87A',
    warning: 'F5A623',
    error: 'E23D3D',
  },

  typography: {
    fontPrimary: 'DM Sans',
    fontSecondary: 'DM Sans',
    fontBold: 'DM Sans SemiBold',
    sizes: {
      hero: 45,
      slideTitle: 28,
      sectionTitle: 36,
      subtitle: 16,
      body: 11,
      small: 9,
      footer: 8,
    },
  },

  spacing: {
    marginLeft: 0.375,
    marginRight: 0.375,
    marginTop: 0.375,
    marginBottom: 0.375,
    contentWidth: 9.25,
    contentGap: 0.28,
    columnGutter: 0.3,
  },

  shapes: {
    showAccentLine: false,
    accentLineHeight: 0,
    showTitleDivider: false,
    titleDividerHeight: 0,
    pillRadius: 0.15,
  },

  footer: {
    template: 'BigCommerce Confidential',
    showSlideNumbers: true,
    fontSize: 7,
    color: '6E6D76',
  },
};
