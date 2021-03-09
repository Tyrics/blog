import type { NavbarConfig } from '@vuepress/theme-default';

export const navbar: NavbarConfig = [
  {
    text: '编程语言',
    children: [
      {
        text: 'ECMAScript',
        link: '/ecmascript/data-structures.md'
      },
      {
        text: 'TypeScript',
        link: '/typescript/type&interface.md'
      },
    ]
  },
  {
    text: '前端',
    children: [
      {
        text: 'WepApi',
        link: '/webapi/clipboard.md'
      }
    ]
  },
  {
    text: 'github',
    link: 'https://github.com/Tyrics/blog'
  }
]