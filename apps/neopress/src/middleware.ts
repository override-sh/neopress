import PLUGIN_SYSTEM, { bootstrap } from "@neopress/plugin-system";
import { NextRequest } from "next/server";
import { PLUGIN_LIST } from "./plugins";

bootstrap(PLUGIN_LIST);

/**
 * Middlewares for the plugin system
 * @param {NextRequest} request
 */
export async function middleware(request: NextRequest) {
    return await PLUGIN_SYSTEM.runMiddleware(request);
}