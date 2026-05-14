import { writeFile } from "node:fs/promises";

const sources = {
  tw: {
    label: "TW",
    feedUrl: "https://news.google.com/rss?hl=zh-TW&gl=TW&ceid=TW:zh-Hant",
    moreUrl: "https://news.google.com/topstories?hl=zh-TW&gl=TW&ceid=TW:zh-Hant",
  },
  bbc: {
    label: "BBC",
    feedUrl: "https://feeds.bbci.co.uk/news/rss.xml",
    moreUrl: "https://www.bbc.com/news",
  },
  dw: {
    label: "DW",
    feedUrl: "https://rss.dw.com/rdf/rss-de-all",
    moreUrl: "https://www.dw.com/de/themen/s-9077",
  },
};

function decodeEntities(value) {
  return String(value)
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function tagValue(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeEntities(match[1]) : "";
}

function parseRss(xml) {
  return Array.from(xml.matchAll(/<item\b[\s\S]*?<\/item>/gi))
    .map(([item]) => ({
      title: tagValue(item, "title"),
      link: tagValue(item, "link"),
      publishedAt: tagValue(item, "pubDate"),
    }))
    .filter((item) => item.title && item.link)
    .slice(0, 8);
}

async function fetchSource([key, source]) {
  try {
    const response = await fetch(source.feedUrl, {
      headers: { "user-agent": "study-counter-news-updater/1.0" },
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const xml = await response.text();
    return [key, { ...source, items: parseRss(xml), error: "" }];
  } catch (error) {
    return [key, { ...source, items: [], error: String(error?.message || error) }];
  }
}

const entries = await Promise.all(Object.entries(sources).map(fetchSource));
const payload = {
  updatedAt: new Date().toISOString(),
  sources: Object.fromEntries(entries),
};

await writeFile("news.json", `${JSON.stringify(payload, null, 2)}\n`, "utf8");
