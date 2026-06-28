import type { MetadataRoute } from "next";

const BASE_URL = "https://bowvalleycleaners.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: BASE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE_URL}/resources/new-host`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${BASE_URL}/get-quote`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/for-cleaners`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/add-business`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
