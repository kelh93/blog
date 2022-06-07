const { defaultTheme } = require('@vuepress/theme-default');

module.exports = {
  title: "Ke's Blog",
  description: '大前端',
  theme: defaultTheme({
    navbar: [
      { text: '主页', link: '/' },
      { text: '性能优化', link: '/optimize/' },
      { text: '实战SSR', link: '/ssr/' },
      { text: 'GitHub', link: 'https://github.com/kelh93' },
    ],
    sidebar: [
      '/README.md',
      {
        text: 'JavaScript',
        link: '/javascript/index.md',
        collapsible: true,
        children: ['/javascript/async.md'],
      },
      {
        text: 'React',
        link: '/react/index.md',
        collapsible: true,
        children: ['/react/fiber.md'],
      },
      {
        text: 'Vue',
        link: '/vue/',
        children: ['/vue/index.md'],
      },
      {
        text: 'Node.js',
        link: '/nodejs/',
        collapsible: true,
        children: ['/nodejs/index.md'],
      },
      {
        text: 'CSS',
        link: '/css/',
        children: ['/css/index.md'],
      },
      {
        text: '网络',
        link: '/network/',
        children: ['/network/index.md'],
      },
      {
        text: '实战',
        link: '/project/',
        children: ['/project/index.md'],
      },
      {
        text: '前端工作流',
        link: '/workflow/',
        children: ['/workflow/index.md'],
      },
      {
        text: '状态管理',
        collapsible: true,
        link: '/stateManage/index.md',
        children: ['vuex.md', 'redux.md', { link: 'other.md', text: '其他', collapsible: true }],
      },
      {
        text: '前端架构设计',
        link: '/architecture/index.md',
        children: ['/architecture/designPatterns.md'],
      },
      {
        text: '性能优化',
        link: '/optimize/',
        children: ['/optimize/index.md'],
      },
      {
        text: '图形学',
        link: '/graph/',
        children: ['/graph/index.md'],
      },
      {
        text: '数据结构与算法',
        link: '/leetcode/',
        children: ['/leetcode/index.md'],
      },
      {
        text: '设计模式',
        link: '/design/',
        children: ['/design/index.md'],
      },
    ],
  }),
};
