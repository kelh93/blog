export const data = {
  "key": "v-1ac1cb50",
  "path": "/stateManage/state/",
  "title": "状态管理",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "Vuex",
      "slug": "vuex",
      "children": []
    },
    {
      "level": 2,
      "title": "Redux",
      "slug": "redux",
      "children": []
    },
    {
      "level": 2,
      "title": "Mobox",
      "slug": "mobox",
      "children": []
    }
  ],
  "git": {},
  "filePathRelative": "stateManage/state/index.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
