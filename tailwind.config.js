/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#e0ffff',
  				'100': '#b3ffff',
  				'200': '#80ffff',
  				'300': '#4dffff',
  				'400': '#1affff',
  				'500': '#00ffff',
  				'600': '#00cccc',
  				'700': '#009999',
  				'800': '#006666',
  				'900': '#003333',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#ffe0ff',
  				'100': '#ffb3ff',
  				'200': '#ff80ff',
  				'300': '#ff4dff',
  				'400': '#ff1aff',
  				'500': '#ff00ff',
  				'600': '#cc00cc',
  				'700': '#990099',
  				'800': '#660066',
  				'900': '#330033',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				'50': '#e0ffe0',
  				'100': '#b3ffb3',
  				'200': '#80ff80',
  				'300': '#4dff4d',
  				'400': '#1aff1a',
  				'500': '#00ff00',
  				'600': '#00cc00',
  				'700': '#009900',
  				'800': '#006600',
  				'900': '#003300',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			neutral: {
  				'50': '#f8f9fa',
  				'100': '#e9ecef',
  				'200': '#dee2e6',
  				'300': '#ced4da',
  				'400': '#adb5bd',
  				'500': '#6c757d',
  				'600': '#495057',
  				'700': '#343a40',
  				'800': '#212529',
  				'900': '#0a0a0a'
  			},
  			dark: {
  				'50': '#1a1a1a',
  				'100': '#151515',
  				'200': '#121212',
  				'300': '#0f0f0f',
  				'400': '#0c0c0c',
  				'500': '#0a0a0a',
  				'600': '#080808',
  				'700': '#060606',
  				'800': '#040404',
  				'900': '#020202'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'neon-gradient': 'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #00ff00 100%)',
  			'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,255,255,0.05) 100%)',
  			'dark-glass': 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,255,255,0.02) 100%)',
  			holographic: 'linear-gradient(45deg, transparent 30%, rgba(0,255,255,0.1) 50%, transparent 70%)'
  		},
  		boxShadow: {
  			glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  			'glass-lg': '0 16px 64px 0 rgba(31, 38, 135, 0.5)',
  			'neon-cyan': '0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.1)',
  			'neon-magenta': '0 0 20px rgba(255, 0, 255, 0.3), 0 0 40px rgba(255, 0, 255, 0.1)',
  			'neon-lime': '0 0 20px rgba(0, 255, 0, 0.3), 0 0 40px rgba(0, 255, 0, 0.1)',
  			'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
  			futuristic: '0 4px 16px rgba(0, 255, 255, 0.1), 0 8px 32px rgba(255, 0, 255, 0.05)',
  			hologram: '0 0 10px rgba(0, 255, 255, 0.2), inset 0 0 10px rgba(255, 0, 255, 0.1)'
  		},
  		animation: {
  			'fade-in-up': 'fadeInUp 0.8s ease-out',
  			'fade-in': 'fadeIn 0.6s ease-out',
  			'slide-in-left': 'slideInLeft 0.7s ease-out',
  			'slide-in-right': 'slideInRight 0.7s ease-out',
  			'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
  			float: 'float 3s ease-in-out infinite',
  			hologram: 'hologram 4s ease-in-out infinite',
  			'micro-lift': 'microLift 0.3s ease-out',
  			'shimmer': 'shimmer var(--shimmer-duration, 2.2s) linear infinite var(--shimmer-repeat-delay, 0s)'
  		},
  		keyframes: {
  			shimmer: {
  				'0%': {
  					'backgroundPosition': '200% 0'
  				},
  				'100%': {
  					'backgroundPosition': '-200% 0'
  				}
  			},
  			fadeInUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideInLeft: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(-20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			slideInRight: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			glowPulse: {
  				'0%': {
  					boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
  				},
  				'100%': {
  					boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			hologram: {
  				'0%, 100%': {
  					opacity: '0.8',
  					transform: 'translateY(0px) rotateX(0deg)'
  				},
  				'25%': {
  					opacity: '1',
  					transform: 'translateY(-2px) rotateX(1deg)'
  				},
  				'50%': {
  					opacity: '0.9',
  					transform: 'translateY(0px) rotateX(0deg)'
  				},
  				'75%': {
  					opacity: '1',
  					transform: 'translateY(2px) rotateX(-1deg)'
  				}
  			},
  			microLift: {
  				'0%': {
  					transform: 'translateY(0px)'
  				},
  				'100%': {
  					transform: 'translateY(-2px)'
  				}
  			}
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
