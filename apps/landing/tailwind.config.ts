import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: '#10B981',
  				dark: '#059669',
  				light: '#D1FAE5'
  			},
  			background: '#FFFFFF',
  			surface: '#FFFFFF',
  			text: {
  				DEFAULT: '#1F2937',
  				muted: '#6B7280',
  				light: '#9CA3AF'
  			},
  			border: {
  				DEFAULT: '#E5E7EB',
  				light: '#F3F4F6'
  			},
  			success: '#10B981',
  			warning: '#F59E0B',
  			error: '#EF4444',
  			info: '#3B82F6'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			display: [
  				'2rem',
  				{
  					lineHeight: '2.5rem',
  					fontWeight: '600'
  				}
  			],
  			'display-lg': [
  				'3rem',
  				{
  					lineHeight: '3.5rem',
  					fontWeight: '600'
  				}
  			]
  		},
  		borderRadius: {
  			sm: '6px',
  			md: '8px',
  			lg: '12px'
  		},
  		spacing: {
  			'18': '4.5rem',
  			'22': '5.5rem'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [],
}

export default config
