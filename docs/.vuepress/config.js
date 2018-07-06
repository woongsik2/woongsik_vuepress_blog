module.exports = {
  title: '타자치는 곰',
  description: '킴웅식',
  base: "/woongsik2.github.io/",
  head: [
    // ['link', {
    //   rel: 'icon',
    //   href: '/logo.png'
    // }]
  ],
  themeConfig: {
    sidebar: [
      '/javascript/Const-let',
      '/javascript/Scope',
      '/javascript/Hoisting',
      '/javascript/Closure',
      '/javascript/ExecutionContext',

      '/etc/Jest-Enzyme',
      '/etc/docker',
    ],
    nav: [{
        text: 'Guide',
        link: '/#'
      },
      {
        text: 'Git',
        link: 'https://github.com/woongsik2'
      }
    ]
  }
}