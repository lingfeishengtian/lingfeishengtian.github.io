import { type WikiPage } from './wikiClient';

const cjeWikiBaseUrl = 'https://github.com/lingfeishengtian/mdict_tools/wiki';
const cjeWikiRawBaseUrl = 'https://raw.githubusercontent.com/wiki/lingfeishengtian/mdict_tools';

export const selectedCJEDictionaryWikiPages: WikiPage[] = [
  {
    id: 'japanese-optimized-dictionary-parser',
    slug: 'Japanese-Optimized-Dictionary-Parser',
    title: 'Japanese Optimized Dictionary Parser',
    url: `${cjeWikiBaseUrl}/Japanese-Optimized-Dictionary-Parser`,
    markdownUrl: `${cjeWikiRawBaseUrl}/Japanese-Optimized-Dictionary-Parser.md`,
  },
];

export const fetchSelectedCJEDictionaryWikiPages = async (): Promise<WikiPage[]> =>
  selectedCJEDictionaryWikiPages;