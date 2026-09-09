/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_RELEASE_APPROVED?: 'true' | 'false';
  readonly PUBLIC_INDEXING_APPROVED?: 'true' | 'false';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly CI?: string;
    readonly PUBLIC_SITE_URL?: string;
    readonly PUBLIC_RELEASE_APPROVED?: 'true' | 'false';
    readonly PUBLIC_INDEXING_APPROVED?: 'true' | 'false';
    readonly REQUIRE_CLIENT_ASSETS?: 'true' | 'false';
  }
}
