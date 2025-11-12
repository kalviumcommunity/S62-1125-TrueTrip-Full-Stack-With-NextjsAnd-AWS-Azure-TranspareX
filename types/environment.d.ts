declare namespace NodeJS {
  interface ProcessEnv {
    // Database
    DATABASE_URL: string;

    // API Keys (Server-only)
    API_SECRET_KEY: string;
    STRIPE_SECRET_KEY: string;

    // Client-safe (NEXT_PUBLIC_ prefix)
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_APP_NAME: string;
    NEXT_PUBLIC_APP_VERSION: string;
  }
}
