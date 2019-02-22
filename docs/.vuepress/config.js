var path = require('path')
let { getArticles } = require(path.resolve('docs/.vuepress/wg-util'))

module.exports = {
  title: '타자치는 곰',
  description: '킴웅식',
  base: '/woongsik2.github.io/',
  head: [
    // ['link', {
    //   rel: 'icon',
    //   href: '/logo.png'
    // }]
  ],
  themeConfig: {
    sidebar: [
      {
        title: 'javascript',
        collapsable: true,
        children: getArticles('javascript')
      },
      {
        title: 'etc',
        collapsable: true,
        children: getArticles('etc')
      }
    ],
    nav: [
      {
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
