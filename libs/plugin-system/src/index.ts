// Use this file to export React client components (e.g. those with 'use client' directive) or other non-server
// utilities

import PLUGIN_SYSTEM from "./lib/bootstrap";

export default PLUGIN_SYSTEM;

export * from "./lib/interfaces/plugin-definition.interface";
export * from "./lib/plugin-system";
export * from "./lib/interfaces/pluggable-extension.interface";
export * from "./lib/interfaces/api-route-definition.interface";
export * from "./lib/interfaces/component-definition.interface";
export * from "./lib/interfaces/middleware-definition.interface";
export * from "./lib/interfaces/route-definition.interface";
export * from "./lib/bootstrap";
export * from "./lib/interfaces/route-entrypoint.enum";
export * from "./lib/hooks/use-plugin-system";
export * from "./lib/base-plugin";
