import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

export const verifyToken = (token: string) => {
  return jwtDecode(token) as CustomJwtPayload;
};
