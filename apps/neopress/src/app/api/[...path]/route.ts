import PLUGIN_SYSTEM, { bootstrap } from "@neopress/plugin-system";
import {
    NextRequest,
    NextResponse,
} from "next/server";
import { PLUGIN_LIST } from "../../../plugins";

bootstrap(PLUGIN_LIST);

const handler = async (
    req: NextRequest,
    context: {
        params: {
            path: string[]
        }
    },
) => {
    const route = PLUGIN_SYSTEM.getApiRoute(context.params.path, req.method as any);

    if (!route) {
        return NextResponse.json(
            {
                message: "Not found",
            },
            {
                status: 404,
            },
        );
    }

    return route.handler(req);
};

export const GET = handler;

export const HEAD = handler;

export const POST = handler;

export const PUT = handler;

export const DELETE = handler;

export const PATCH = handler;