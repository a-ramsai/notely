import type { User } from "./types";

declare global {
  interface CustomJwtSessionClaims extends User {
     role?: string;
    isAdmin?: boolean;
  }
}

export {};
