declare interface SiteType {
  url: string,
  needQuery?: boolean
}

declare interface BaiduTranslateConfig {
  q: string
  from: string
  to: string
  appid: string
  salt: string
  sign: string
}

declare interface BaiduTranslateResult {
  dst: string
  src: string
}