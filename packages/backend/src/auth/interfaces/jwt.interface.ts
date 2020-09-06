export interface JwtPayload {
  sub: number;
  username: string;
  email: string;
}

export interface JwtDecrypted {
  email: string;
  userId: number;
  username: string;
}
