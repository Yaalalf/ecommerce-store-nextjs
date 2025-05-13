import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const config = {
  GOOGLE_STORAGE: {
    resourcesBucket: process.env.GS_BUCKET_STORE_PRODUCTS || "",
    serviceAccountKeyBase64: process.env.GS_SERVICE_ACCOUNT_KEY_BASE64 || "",
  },
  DATABASE: {
    dbUser: process.env.DB_USER || "",
    dbPassword: process.env.DB_PASSWORD || "",
    dbHost: process.env.DB_HOST || "127.0.0.1",
    dbPort: process.env.DB_PORT || "",
    dbNAME: process.env.DB_NAME || "",
    isLocalDB: process.env.IS_LOCAL_DB || true,
  },
};

export default config;
