import "dotenv/config";

export const PORT = process.env.PORT ?? 3000;
export const MONGODB_URI = process.env.MONGODB_URI!;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
