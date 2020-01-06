const path = require("path");

module.exports = (options, context) => ({
  title: 'Form',
  description: 'Simplify form validations and handling with Vue Form',
  base: process.env.NODE_ENV === 'production'
    ? '/chris-washington/vue-form/'
    : '/',
  isPlayAllHeaders: true,
  activeHeaderLinks: true,
  evergreen: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  alias: {
    'vue-form': `${process.cwd()}/dist-babel/index.js`
  },
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    serviceWorker: {
      updatePopup: true
    },
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
