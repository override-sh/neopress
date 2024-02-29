import PLUGIN_SYSTEM, {
    DynamicRouteParams,
    RouteEntryPoint,
} from "@neopress/plugin-system";
import {
    Metadata,
    ResolvingMetadata,
} from "next";
import { notFound } from "next/navigation";

export default function Page(props: DynamicRouteParams) {
    const page = PLUGIN_SYSTEM.getRoute(props.params.path, RouteEntryPoint.page);

    if (!page) {
        notFound();
    }

    return <page.component { ...props } />;
}

/**
 * Generate static paths for the page
 * @returns {Promise<DynamicRouteParams[]>}
 */
export async function generateStaticParams(): Promise<DynamicRouteParams[]> {
    return Object.keys(PLUGIN_SYSTEM.getAllRoutes()).map(route => ({
        params:       {
            path: route.split("/"),
        },
        searchParams: {},
    }));
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
    const page = PLUGIN_SYSTEM.getRoute(params.path);

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