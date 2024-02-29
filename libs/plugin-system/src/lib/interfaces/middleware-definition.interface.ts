import {
    NextRequest,
    NextResponse,
} from "next/server";

export type NextMiddlewareInChain = () => Promise<NextResponse>
export type TerminalMiddleware = (request: NextRequest, next: NextMiddlewareInChain) => NextResponse | Promise<NextResponse>;

export interface MiddlewareDefinitionInterface {
    name: string;
    handler: TerminalMiddleware;
    priority?: number;
}