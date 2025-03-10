const { SitemapStream, streamToPromise } = require("sitemap");
const fs = require("fs");

// 사이트 URL 목록
const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/portfolio", changefreq: "daily", priority: 0.8 },
  { url: "/brand", changefreq: "monthly", priority: 0.7 },
  { url: "/contact", changefreq: "monthly", priority: 0.7 },
];

const sitemap = new SitemapStream({ hostname: "https://www.theroom.co.kr" });

streamToPromise(sitemap)
  .then((data) => {
    fs.writeFileSync("./public/sitemap.xml", data);
    console.log("✅ sitemap.xml 생성 완료!");
  })
  .catch((err) => {
    console.error("❌ 사이트맵 생성 실패:", err);
  });

links.forEach((link) => sitemap.write(link));
sitemap.end();
