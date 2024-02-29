import { HTTP_METHOD } from "next/dist/server/web/http";
import {
    NextRequest,
    NextResponse,
} from "next/server";

export interface ApiRouteDefinitionInterface {
    route: string;
    method: Exclude<HTTP_METHOD, "OPTIONS">;
    handler: (request: NextRequest) => NextResponse | Promise<NextResponse>;
}