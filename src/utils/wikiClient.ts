export interface WikiPage {
  id: string;
  slug: string;
  title: string;
  url: string;
  markdownUrl: string;
}

const wikiBaseUrl = 'https://github.com/lingfeishengtian/FilenFoto/wiki';
const wikiRawBaseUrl = 'https://raw.githubusercontent.com/wiki/lingfeishengtian/FilenFoto';

export const selectedWikiPages: WikiPage[] = [
  {
    id: 'data-volatility',
    slug: 'Data-Volatility',
    title: 'Data Volatility',
    url: `${wikiBaseUrl}/Data-Volatility`,
    markdownUrl: `${wikiRawBaseUrl}/Data-Volatility.md`,
  },
  {
    id: 'filen-integration',
    slug: 'Filen-Integration',
    title: 'Filen Integration',
    url: `${wikiBaseUrl}/Filen-Integration`,
    markdownUrl: `${wikiRawBaseUrl}/Filen-Integration.md`,
  },
  {
    id: 'swiftui-uikit-interoperability',
    slug: 'SwiftUI-and-UIKit-Interoperability',
    title: 'SwiftUI and UIKit Interoperability',
    url: `${wikiBaseUrl}/SwiftUI-and-UIKit-Interoperability`,
    markdownUrl: `${wikiRawBaseUrl}/SwiftUI-and-UIKit-Interoperability.md`,
  },
  {
    id: 'thumbnails',
    slug: 'Thumbnails',
    title: 'Thumbnails',
    url: `${wikiBaseUrl}/Thumbnails`,
    markdownUrl: `${wikiRawBaseUrl}/Thumbnails.md`,
  },
  {
    id: 'uikit-photo-gallery',
    slug: 'UIKit-Photo-Gallery',
    title: 'UIKit Photo Gallery',
    url: `${wikiBaseUrl}/UIKit-Photo-Gallery`,
    markdownUrl: `${wikiRawBaseUrl}/UIKit-Photo-Gallery.md`,
  },
];

export const fetchSelectedWikiPages = async (): Promise<WikiPage[]> => selectedWikiPages;

export const fetchWikiMarkdown = async (markdownUrl: string): Promise<string> => {
  const response = await fetch(markdownUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch wiki markdown: ${response.status}`);
  }

  return response.text();
};