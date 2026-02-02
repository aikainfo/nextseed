/**
 * NextSeed Design System
 * Enterprise-grade design tokens and guidelines
 * 
 * This file serves as the single source of truth for all design decisions.
 * All components MUST use these tokens to ensure visual consistency.
 */

export const designSystem = {
    /**
     * Color Palette - Emerald & Slate
     * Primary: Emerald (brand color)
     * Surfaces: Slate (neutral backgrounds)
     * Accents: Amber, Sky, Rose (for specific use cases)
     */
    colors: {
        brand: {
            50: '#ecfdf5',
            100: '#d1fae5',
            400: '#34d399',
            500: '#10b981', // Primary brand color
            600: '#059669',
            700: '#047857',
        },
        surface: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            600: '#475569',
            700: '#334155',
            900: '#0f172a',
        },
        accent: {
            amber: '#f59e0b',
            sky: '#0ea5e9',
            rose: '#f43f5e',
        },
        semantic: {
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#3b82f6',
        },
    },

    /**
     * Typography
     * Font: Inter (loaded via next/font)
     * Scale: Modular scale with clear hierarchy
     */
    typography: {
        fontFamily: {
            sans: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
        },
        fontSize: {
            xs: '0.75rem',    // 12px
            sm: '0.875rem',   // 14px
            base: '1rem',     // 16px
            lg: '1.125rem',   // 18px
            xl: '1.25rem',    // 20px
            '2xl': '1.5rem',  // 24px
            '3xl': '1.875rem',// 30px
            '4xl': '2.25rem', // 36px
            '5xl': '3rem',    // 48px
        },
        fontWeight: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
        lineHeight: {
            tight: 1.25,
            normal: 1.5,
            relaxed: 1.75,
        },
    },

    /**
     * Spacing
     * 4px base unit for consistent spacing
     */
    spacing: {
        0: '0',
        1: '0.25rem',  // 4px
        2: '0.5rem',   // 8px
        3: '0.75rem',  // 12px
        4: '1rem',     // 16px
        6: '1.5rem',   // 24px
        8: '2rem',     // 32px
        12: '3rem',    // 48px
        16: '4rem',    // 64px
        24: '6rem',    // 96px
    },

    /**
     * Border Radius - Premium & Soft
     * 16-24px for modern, friendly feel
     */
    borderRadius: {
        sm: '0.5rem',   // 8px
        md: '0.75rem',  // 12px
        lg: '1rem',     // 16px - Standard
        xl: '1.25rem',  // 20px
        '2xl': '1.5rem',// 24px - Bento cards
        full: '9999px', // Pills
    },

    /**
     * Shadows - Layered for depth
     * Premium shadows for enterprise feel
     */
    shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        card: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        premium: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    },

    /**
     * Transitions
     * Consistent animation timing
     */
    transitions: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        easing: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        },
    },

    /**
     * Breakpoints
     * Mobile-first responsive design
     */
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },

    /**
     * Z-Index Scale
     * Consistent layering
     */
    zIndex: {
        base: 0,
        dropdown: 10,
        sticky: 20,
        modal: 30,
        popover: 40,
        tooltip: 50,
    },
} as const

/**
 * Component Variants
 * Predefined component styles for consistency
 */
export const componentVariants = {
    button: {
        primary: 'bg-brand-500 text-white hover:bg-brand-600 shadow-premium',
        secondary: 'bg-surface-100 text-surface-900 hover:bg-surface-200',
        outline: 'border-2 border-brand-500 text-brand-600 hover:bg-brand-50',
        ghost: 'text-surface-700 hover:bg-surface-100',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    },
    card: {
        default: 'bg-white border border-surface-200 rounded-2xl shadow-card',
        bento: 'bg-white border border-surface-200 rounded-2xl shadow-premium hover:shadow-card transition-shadow',
        glass: 'bg-white/80 backdrop-blur-md border border-surface-200 rounded-2xl',
    },
    input: {
        default: 'border-surface-300 focus:border-brand-500 focus:ring-brand-500/20',
        error: 'border-red-300 focus:border-red-500 focus:ring-red-500/20',
    },
} as const

/**
 * Layout Constants
 * Consistent layout measurements
 */
export const layout = {
    header: {
        height: '4rem', // 64px
    },
    sidebar: {
        width: '16rem', // 256px
        widthCollapsed: '4rem', // 64px
    },
    container: {
        maxWidth: '1280px',
        padding: '1rem',
    },
} as const

export type DesignSystem = typeof designSystem
export type ComponentVariants = typeof componentVariants
export type Layout = typeof layout
