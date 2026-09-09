const configuredSiteUrl = import.meta.env.PUBLIC_SITE_URL;
const releaseApproved = import.meta.env.PUBLIC_RELEASE_APPROVED === 'true';
const indexingApproved = import.meta.env.PUBLIC_INDEXING_APPROVED === 'true';

function parseSiteOrigin(value: string | undefined): URL | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      url.pathname === '/' &&
      !url.search &&
      !url.hash
      ? url
      : null;
  } catch {
    return null;
  }
}

const siteUrl = parseSiteOrigin(configuredSiteUrl);

export const siteConfig = {
  name: 'Colmillo Studio',
  defaultTitle: 'Colmillo Studio',
  defaultDescription: 'Portfolio de Colmillo Studio.',
  locale: 'es-ES',
  siteUrl,
  isPrelaunch: !(siteUrl && releaseApproved && indexingApproved),
  socialImage: null,
  socialImageAlt: null,
} as const;
