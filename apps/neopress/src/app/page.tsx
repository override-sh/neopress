import PLUGIN_SYSTEM, {
    DynamicRouteParams,
    RouteEntryPoint,
} from "@neopress/plugin-system";
import {
    Metadata,
    ResolvingMetadata,
} from "next";

export default async function Index() {
    const page = PLUGIN_SYSTEM.getRoute([ "" ], RouteEntryPoint.page);

    if (!page) {
        return (
            <main>
                <h1>Root page</h1>
            </main>
        );
    }

    return <page.component params={ { path: [ "" ] } } />;
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
        searchParams,
    }: DynamicRouteParams,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const page = PLUGIN_SYSTEM.getRoute([ "" ], RouteEntryPoint.page);

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