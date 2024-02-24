import PLUGIN_SYSTEM, {
    DynamicRouteParams,
    RouteEntryPoint,
} from "@neopress/plugin-system";
import {
    Metadata,
    ResolvingMetadata,
} from "next";
import { ReactNode } from "react";

export default function Layout(
    props: DynamicRouteParams & {
        children: ReactNode
    },
) {
    const page = PLUGIN_SYSTEM.getRoute(props.params.path, RouteEntryPoint.layout);

    if (!page) {
        return props.children;
    }

    return <page.component { ...props }>{ props.children }</page.component>;
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
    const page = PLUGIN_SYSTEM.getRoute(params.path, RouteEntryPoint.layout);

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