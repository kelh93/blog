export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "你好，世界。",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "git": {},
  "filePathRelative": "README.md"
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
