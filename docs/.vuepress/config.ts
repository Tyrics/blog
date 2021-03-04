import type { UserConfig, DefaultThemeOptions } from 'vuepress';

const config: UserConfig<DefaultThemeOptions> = {
  lang: 'zh-CN',
  title: 'Tyric的随笔',
  description: 'hello world',
  base: '/blog/',

  themeConfig: {
    navbar: [
      {
        text: 'github',
        link: 'https://github.com/Tyrics/blog'
      }
    ],
    sidebar: [
      {
        text: 'Home',
        link: '/',
        children: []
      },
      {
        isGroup: true,
        text: 'TypeScript',
        children: [
          {
            text: '关于type与interface',
            link: '/TypeScript/type&interface.md',
            children: [],
          }
        ]
      },
      {
        isGroup: true,
        text: 'WebApi',
        children: [
          {
            text: 'ClipBoard API',
            link: '/WebApi/clipboard.md',
            children: []
          }
        ]
      },
      {
        isGroup: true,
        text: 'ECMAScript',
        children: [
          {
            text: 'JavaScript 异步',
            link: '/ECMAScript/async.md',
            children: []
          }
        ]
      }
    ]
  }
}

export = config