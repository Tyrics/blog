import type { UserConfig, DefaultThemeOptions } from 'vuepress';

const config: UserConfig<DefaultThemeOptions> = {
  lang: 'zh-CN',
  title: 'Tyric的个人博客',
  description: 'hello world',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    sidebar: [
      {
        text: '首页',
        link: '/',
        children: []
      },
      {
        isGroup: true,
        text: 'TypeScript',
        children: [
          {
            text: '1',
            link: '/typescript/1.md',
            children: [],
          }
        ]
      },
    ]
  }
}

export = config