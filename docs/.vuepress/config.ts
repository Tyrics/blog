import type { UserConfig, DefaultThemeOptions } from 'vuepress';
import { navbar, sidebar } from './configs';

const config: UserConfig<DefaultThemeOptions> = {
  lang: 'zh-CN',
  title: 'Tyric的随笔',
  description: 'hello world',
  base: '/blog/',

  themeConfig: {
    navbar,
    sidebar
  }
};

export = config;