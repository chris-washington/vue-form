const path = require("path");

module.exports = (options, context) => ({
  title: 'VRx Form',
  description: 'Simplify form validations and handling with VRx Form',
  base: process.env.NODE_ENV === 'production'
    ? '/vue-form/'
    : '/',
  isPlayAllHeaders: true,
  activeHeaderLinks: true,
  evergreen: true,
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }],
    ['link', { rel: 'icon', href: '/images/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' }],
    ['link', { rel: 'icon', href: '/images/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }],
    ['link', { rel: 'shortcut icon', href: '/images/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'white' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
  ],
  plugins: [
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }]
  ],
  alias: {
    'vrx-form': `${process.cwd()}/dist-babel/index.js`
  },
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/images/logo.png',
    search: true,
    searchMaxSuggestions: 10,
    sidebarDepth: 2,
    nav: [
      { text: 'Guides', link: '/guides/' },
      { text: 'API', link: '/api/' },
      { text: 'Github', link: 'https://github.com/chris-washington/vue-form'}
    ],
    sidebar: {
      '/guides/': [
        '',
        '/guides/form',
        '/guides/fields',
        '/guides/validators',
        '/guides/submit',
        '/guides/errors',
        '/guides/examples'
      ],
      '/api/': [''
      ],
    }
  },
});
