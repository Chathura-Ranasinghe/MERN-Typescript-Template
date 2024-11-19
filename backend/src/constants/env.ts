import dotenv from 'dotenv';
dotenv.config();

interface EnvVariables {
  NODE_ENV: string;
  PORT: string;
  MONGO_URI: string;
  APP_ORIGIN: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
}

const getEnv = <K extends keyof EnvVariables>(key: K, defaultValue?: EnvVariables[K]): EnvVariables[K] => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw Error(`Missing String environment variable for ${key}`);
  }
  return value;
};

export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getEnv("PORT", "5000");
export const MONGO_URI = getEnv("MONGO_URI");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");