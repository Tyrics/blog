import type { SidebarConfig } from '@vuepress/theme-default';

export const sidebar: SidebarConfig = {
  '/ECMAScript/': [
    {
      isGroup: true,
      text: 'ECMAScript相关',
      children: [
        '/ecmascript/data-structures.md',
        '/ecmascript/async.md',
      ]
    }
  ],
  '/WebApi/': [
    {
      isGroup: true,
      text: 'WebApi相关',
      children: [
        '/webapi/clipboard.md',
        '/webapi/canvas.md',
      ]
    }
  ],
  '/TypeScript/': [
    {
      isGroup: true,
      text: 'TypeScript相关',
      children: [
        '/typescript/type&interface.md'
      ]
    }
  ],
}