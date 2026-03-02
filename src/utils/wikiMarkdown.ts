export const filenFotoWikiBaseUrl = 'https://github.com/lingfeishengtian/FilenFoto/wiki';
export const cjeDictionaryWikiBaseUrl = 'https://github.com/lingfeishengtian/mdict_tools/wiki';

export const generateDescription = (markdown: string, maxLength = 180): string => {
  const lines = markdown
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#') && !line.startsWith('```'));

  const description = lines[0] ?? 'Wiki page content.';
  return description.length > maxLength
    ? `${description.slice(0, maxLength - 3)}...`
    : description;
};

export const normalizeWikiUrl = (url: string, wikiBaseUrl = filenFotoWikiBaseUrl): string => {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) {
    return url;
  }
  if (url.startsWith('/')) {
    return `https://github.com${url}`;
  }

  return `${wikiBaseUrl}/${url.replace(/^\.\//, '')}`;
};

export const preprocessWikiLinks = (
  markdown: string,
  wikiBaseUrl = filenFotoWikiBaseUrl
): string => {
  return markdown.replace(/\[\[([^\]]+)\]\]/g, (_, title: string) => {
    const slug = title.trim().replace(/\s+/g, '-');
    return `[${title}](${wikiBaseUrl}/${slug})`;
  });
};