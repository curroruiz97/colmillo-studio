export interface ContactChannel {
  /** Short name used where space is tight, such as the sticky header. */
  label: string;
  /** Public, human-readable identity of the channel. */
  value: string | null;
  /** Real destination. `null` keeps the channel unpublished. */
  href: string | null;
}

/**
 * Approved public channels supplied by the client on 2026-09-09.
 * `phone` stays unpublished until a real number is confirmed.
 */
export const contactChannels: Record<string, ContactChannel> = {
  email: {
    label: 'Correo',
    value: 'hola@colmillostudio.com',
    href: 'mailto:hola@colmillostudio.com',
  },
  instagram: {
    label: 'Instagram',
    value: '@colmillo.studio',
    href: 'https://www.instagram.com/colmillo.studio/',
  },
  phone: { label: 'Teléfono', value: null, href: null },
};

export const publishedContactChannels = Object.values(contactChannels).filter(
  (channel): channel is ContactChannel & { href: string } =>
    channel.href !== null,
);
