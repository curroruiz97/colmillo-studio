export interface ContactChannel {
  label: string;
  href: string | null;
}

export const contactChannels: Record<string, ContactChannel> = {
  email: { label: 'Correo', href: null },
  instagram: { label: 'Instagram', href: null },
  phone: { label: 'Teléfono', href: null },
};

export const publishedContactChannels = Object.values(contactChannels).filter(
  (channel): channel is ContactChannel & { href: string } =>
    channel.href !== null,
);
