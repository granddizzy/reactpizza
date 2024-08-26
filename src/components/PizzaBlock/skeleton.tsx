import React from "react"
import ContentLoader from "react-content-loader"

const skeleton = () => (
  <ContentLoader
    speed={2}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="pizza-block-skeleton"
  >
    <circle cx="144" cy="149" r="124" />
    <rect x="32" y="298" rx="10" ry="10" width="230" height="27" />
    <rect x="34" y="346" rx="19" ry="19" width="227" height="68" />
    <rect x="38" y="437" rx="13" ry="13" width="106" height="26" />
    <rect x="162" y="440" rx="10" ry="10" width="100" height="52" />
  </ContentLoader>
)

export default skeleton

