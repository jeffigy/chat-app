import "dotenv/config";

export const PORT = process.env.PORT ?? 3000;
export const MONGODB_URI = process.env.MONGODB_URI!;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const NODE_ENV = process.env.NODE_ENV!;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET!;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!;
