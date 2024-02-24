import PLUGIN_SYSTEM, {
    bootstrap,
    DynamicRouteParams,
    RouteEntryPoint,
} from "@neopress/plugin-system";
import "./global.css";
import {
    Metadata,
    ResolvingMetadata,
} from "next";
import { ReactNode } from "react";
import { PLUGIN_LIST } from "../plugins";

bootstrap(PLUGIN_LIST);

export default function RootLayout(
    props: {
        children: ReactNode;
    },
) {
    const page = PLUGIN_SYSTEM.getRoute([ "" ], RouteEntryPoint.root_layout);

    if (!page) {
        return (
            <html lang="en">
            <body>{ props.children }</body>
            </html>
        );
    }

    return <page.component { ...props } params={ { path: [ "" ] } }>{ props.children }</page.component>;
}

/**
 * Generate metadata for the page
 * @param {{path: string[]}} params The list of page parameters
 * @param {SearchParams} searchParams The search parameters
 * @param {ResolvingMetadata} parent The parent metadata
 * @returns {Promise<Metadata>} The metadata for the page
 */
export async function generateMetadata(
    {
        params,
        searchParams,
    }: DynamicRouteParams,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const page = PLUGIN_SYSTEM.getRoute([ "" ], RouteEntryPoint.root_layout);

    if (!page) {
        return {};
    }

    return (
               typeof page.metadata === "function"
               ? page.metadata({
                   searchParams,
                   parent,
               })
               : page.metadata
           ) ?? {};
}