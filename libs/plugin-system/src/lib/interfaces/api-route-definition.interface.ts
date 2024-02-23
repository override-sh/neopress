import {
    NextRequest,
    NextResponse,
} from "next/server";

export interface ApiRouteDefinitionInterface {
    route: string;
    handler: (request: NextRequest) => NextResponse | Promise<NextResponse>;
}