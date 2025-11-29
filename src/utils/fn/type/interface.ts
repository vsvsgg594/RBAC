import { JwtPayload } from "jsonwebtoken";

export interface JwtUserPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}
 