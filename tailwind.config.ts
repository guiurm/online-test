/** @type {import('tailwindcss').Config} */
import { type Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,vue}'],
    theme: {
        extend: {
            // palette: https://colorhunt.co/palette/222831393e4600adb5eeeeee
            colors: {
                background: '#fafafa',
                'background-dark': '#222222',
                dark: {
                    50: '#f6f7f9',
                    100: '#eceff2',
                    200: '#d4dbe3',
                    300: '#aebccb',
                    400: '#8297ae',
                    500: '#637b94',
                    600: '#4e637b',
                    700: '#405064',
                    800: '#384454',
                    900: '#323c48',
                    950: '#222831'
                },
                white: {
                    50: '#fafafa',
                    100: '#f1f1f1',
                    200: '#e0e0e0',
                    300: '#cbcbcb',
                    400: '#999999',
                    500: '#6a6a6a',
                    600: '#4c4c4c',
                    700: '#393939',
                    800: '#222222',
                    900: '#181818'
                },
                primary: {
                    DEFAULT: '#2196f3',
                    50: '#f2f8ff',
                    100: '#e0eefd',
                    200: '#b9dffe',
                    300: '#80c9ff',
                    400: '#42b0ff',
                    500: '#2196f3',
                    600: '#2778cf',
                    700: '#2461a6',
                    800: '#215489',
                    900: '#204771'
                },
                red: {
                    DEFAULT: '#ff5252',
                    50: '#fff1f1',
                    100: '#ffe9e8',
                    200: '#ffd6d6',
                    300: '#ffb1b0',
                    400: '#ff8382',
                    500: '#ff5252',
                    600: '#e83235',
                    700: '#c32129',
                    800: '#a21829',
                    900: '#891429'
                },
                green: {
                    DEFAULT: '#4caf50',
                    50: '#f3ffeb',
                    100: '#e7ffdb',
                    200: '#cfffbc',
                    300: '#a4fe8c',
                    400: '#83f473',
                    500: '#64da63',
                    600: '#4caf50',
                    700: '#368439',
                    800: '#2c672b',
                    900: '#245624'
                },
                orange: {
                    DEFAULT: '#ff9800',
                    50: '#fffaef',
                    100: '#fff2cf',
                    200: '#ffe49c',
                    300: '#ffd168',
                    400: '#ffbd44',
                    500: '#ff9800',
                    600: '#e07216',
                    700: '#b84f1b',
                    800: '#943d1b',
                    900: '#793319'
                }
            }
        }
    },
    plugins: [
        plugin(function ({ addComponents, theme }) {
            addComponents({
                /*'.btn': {
                    '@apply cursor-pointer bg-primary-500  text-primary-900 select-none inline-flex justify-center items-center py-3 px-5 font-medium text-center rounded-lg':
                        {},
                    fontSize: theme('fontSize.base'),
                    fontWeight: theme('fontWeight.normal'),

                    //color: '#fefefe',

                    '&:hover': {
                        '@apply  bg-primary-600': {}
                    },
                    '&:active': {
                        backgroundColor: theme('colors.primary.700')
                    },
                    '&:disabled': {
                        '@apply cursor-auto text-primary-400 bg-primary-100 border-primary-100': {}
                    },
                    '&-outline': {
                        '@apply btn border border-primary-500 bg-white-500 text-primary-500 bg-transparent': {},
                        '&:hover': {
                            '@apply bg-transparent text-primary-600': {}
                        },
                        '&:active': {
                            '@apply text-primary-400': {}
                        }
                    },
                    '&-disabled': {
                        '@apply cursor-default bg-primary-100  text-primary-400': {},

                        '&:hover': {
                            '@apply cursor-default bg-primary-100  text-primary-400': {}
                        }
                    }
                },
                '.btn-sm': {
                    //"@apply btn": {},
                    fontSize: theme('fontSize.sm')
                },*/
                '.glass': {
                    '@apply bg-white-500 bg-opacity-20 shadow-lg backdrop-blur-sm': {} //backdrop-blur backdrop-saturate-[182%] bg-white/50 px-4 py-2 shadow-2xl rounded-md': {},
                    //border: '1px solid rgba(255, 255, 255, 0.125)'
                }
            })
        })
    ]
}

export default config
