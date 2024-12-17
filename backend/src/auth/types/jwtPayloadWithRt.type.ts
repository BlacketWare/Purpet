import { JwtPayload } from "."

export type JwtPayloadWithRt = JwtPayload & {
    rt: string;
}