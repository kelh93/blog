import { Vuepress } from '@vuepress/client'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"你好，世界。"},["/index.html","/README.md"]],
  ["v-a4282216","/architecture/designPatterns.html",{"title":"designPatterns"},["/architecture/designPatterns","/architecture/designPatterns.md"]],
  ["v-63e82ae3","/architecture/",{"title":"设计模式"},["/architecture/index.html","/architecture/index.md"]],
  ["v-72582dd0","/design/",{"title":"设计模式"},["/design/index.html","/design/index.md"]],
  ["v-7fd47cda","/graph/",{"title":"Graph"},["/graph/index.html","/graph/index.md"]],
  ["v-2d26bd9a","/graph/webgl.html",{"title":"WebGL"},["/graph/webgl","/graph/webgl.md"]],
  ["v-74458d05","/css/",{"title":"CSS"},["/css/index.html","/css/index.md"]],
  ["v-00d40066","/javascript/async.html",{"title":"异步编程"},["/javascript/async","/javascript/async.md"]],
  ["v-e02a086e","/javascript/",{"title":"JavaScript"},["/javascript/index.html","/javascript/index.md"]],
  ["v-31987621","/leetcode/",{"title":"Leetcode"},["/leetcode/index.html","/leetcode/index.md"]],
  ["v-24f2d5ba","/network/",{"title":"NetWork"},["/network/index.html","/network/index.md"]],
  ["v-2fe4ecaa","/nodejs/",{"title":"Node.js"},["/nodejs/index.html","/nodejs/index.md"]],
  ["v-6c555e19","/optimize/",{"title":"性能优化"},["/optimize/index.html","/optimize/index.md"]],
  ["v-c9bbfba2","/project/",{"title":"项目实战"},["/project/index.html","/project/index.md"]],
  ["v-469522f6","/react/fiber.html",{"title":"Fiber"},["/react/fiber","/react/fiber.md"]],
  ["v-dc3b2a6e","/react/",{"title":"React"},["/react/index.html","/react/index.md"]],
  ["v-62ea5317","/stateManage/Redux.html",{"title":"Redux"},["/stateManage/Redux","/stateManage/Redux.md"]],
  ["v-5fde1312","/stateManage/",{"title":"状态管理"},["/stateManage/index.html","/stateManage/index.md"]],
  ["v-0622905b","/stateManage/other.html",{"title":"其他"},["/stateManage/other","/stateManage/other.md"]],
  ["v-8b8bccd6","/stateManage/vuex.html",{"title":"Vuex"},["/stateManage/vuex","/stateManage/vuex.md"]],
  ["v-744e35e2","/vue/",{"title":"Vue"},["/vue/index.html","/vue/index.md"]],
  ["v-3fd37577","/workflow/",{"title":"前端工作流"},["/workflow/index.html","/workflow/index.md"]],
  ["v-574f425e","/workflow/webpack-chapter1.html",{"title":"webpack5"},["/workflow/webpack-chapter1","/workflow/webpack-chapter1.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: '404',
      path: '/:catchAll(.*)',
      component: Vuepress,
    }
  ]
)
