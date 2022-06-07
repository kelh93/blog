export const data = {
  "key": "v-3fd37577",
  "path": "/workflow/",
  "title": "前端工作流",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "构建工具",
      "slug": "构建工具",
      "children": [
        {
          "level": 3,
          "title": "webpack",
          "slug": "webpack",
          "children": []
        }
      ]
    }
  ],
  "git": {},
  "filePathRelative": "workflow/index.md"
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
