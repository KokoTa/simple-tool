export const sites: { [key: string]: SiteType } = {
  mdn: {
    url: 'https://developer.mozilla.org/en-US/search?q=',
    needQuery: true
  },
  google: {
    url: 'https://www.google.com/search?q=',
    needQuery: true
  },
  stackoverflow: {
    url: 'https://stackoverflow.com/search?q=',
    needQuery: true
  },
  baidu: {
    url: 'https://www.baidu.com/s?wd=',
    needQuery: true
  },
  bilibili: {
    url: 'https://search.bilibili.com/all?keyword=',
    needQuery: true
  },
  github: {
    url: 'https://github.com/search?q=',
    needQuery: true
  },
  juejin: {
    url: 'https://juejin.cn/search?query=',
    needQuery: true
  },
  douban: {
    url: 'https://www.douban.com/search?q=',
    needQuery: true
  },
  zhihu: {
    url: 'https://www.zhihu.com/search?type=content&q=',
    needQuery: true
  },
  weibo: {
    url: 'https://s.weibo.com/weibo?q=',
    needQuery: true
  },
  bing: {
    url: 'https://cn.bing.com/search?q=',
    needQuery: true
  },
  reddit: {
    url: 'https://www.reddit.com/search/?q=',
    needQuery: true
  },
  giphy: {
    url: 'https://giphy.com/search/',
    needQuery: true
  },
  caniuse: {
    url: 'https://caniuse.com/?search=',
    needQuery: true
  },
  node: {
    url: 'https://nodejs.org/api/',
    needQuery: false
  },
  ali: {
    url: 'https://help.aliyun.com/',
    needQuery: false
  },
  tencent: {
    url: 'https://cloud.tencent.com/document/product',
    needQuery: false
  },
  tool: {
    url: 'https://tool.lu/',
    needQuery: false
  },
  vue: {
    url: 'https://v3.cn.vuejs.org/guide/introduction.html',
    needQuery: false
  },
  react: {
    url: 'https://zh-hans.reactjs.org/',
    needQuery: false
  }
};