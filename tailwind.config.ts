/** @type {import('tailwindcss').Config} */
import { type Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,vue}'],
    theme: {
        extend: {
            // palette: https://colorhunt.co/palette/222831393e4600adb5eeeeee
            colors: {
                dark: {
                    '50': '#f6f7f9',
                    '100': '#eceff2',
                    '200': '#d4dbe3',
                    '300': '#aebccb',
                    '400': '#8297ae',
                    '500': '#637b94',
                    '600': '#4e637b',
                    '700': '#405064',
                    '800': '#384454',
                    '900': '#323c48',
                    '950': '#222831'
                },
                primary: {
                    '50': '#ebfffc',
                    '100': '#cdfffb',
                    '200': '#a1fffa',
                    '300': '#60fff9',
                    '400': '#18f8f4',
                    '500': '#00dede',
                    '600': '#00adb5',
                    '700': '#088c96',
                    '800': '#10707a',
                    '900': '#125d67',
                    '950': '#053e47'
                },
                white: {
                    '50': '#f8f8f8',
                    '100': '#eeeeee',
                    '200': '#dcdcdc',
                    '300': '#bdbdbd',
                    '400': '#989898',
                    '500': '#7c7c7c',
                    '600': '#656565',
                    '700': '#525252',
                    '800': '#464646',
                    '900': '#3d3d3d',
                    '950': '#292929'
                }
            }
        }
    },
    plugins: [
        plugin(function ({ addComponents, theme }) {
            addComponents({
                '.btn': {
                    '@apply cursor-pointer bg-primary-500  text-primary-950 select-none inline-flex justify-center items-center py-3 px-5 font-medium text-center rounded-lg':
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
                },
                '.glass': {
                    '@apply bg-white-500 bg-opacity-20 shadow-lg backdrop-blur-sm': {} //backdrop-blur backdrop-saturate-[182%] bg-white/50 px-4 py-2 shadow-2xl rounded-md': {},
                    //border: '1px solid rgba(255, 255, 255, 0.125)'
                }
            })
        })
    ]
}

export default config
