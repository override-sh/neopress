import PLUGIN_SYSTEM, {
    bootstrap,
    ComponentDefinitionInterface,
    ComponentDefinitionMixedInterface,
    DynamicRouteParams,
    RouteEntryPoint,
} from "@neopress/plugin-system";
import {
    Metadata,
    ResolvingMetadata,
} from "next";
import { memo } from "radash";
import { ReactNode } from "react";
import { PLUGIN_LIST } from "../plugins";
import { Providers } from "./providers";

bootstrap(PLUGIN_LIST);

const getRootHead: () => ComponentDefinitionMixedInterface[] = memo(() => PLUGIN_SYSTEM.getAllComponents("root.head"));
const getRootBodyBefore: () => ComponentDefinitionMixedInterface[] = memo(() => PLUGIN_SYSTEM.getAllComponents(
    "root.body.before"));
const getRootBodyAfter: () => ComponentDefinitionMixedInterface[] = memo(() => PLUGIN_SYSTEM.getAllComponents(
    "root.body.after"));

/**
 * Generate a key for the component
 * @param {ComponentDefinitionInterface} v
 */
const makeKey = (v: ComponentDefinitionInterface) => `${ v.name }-{"p":"${ v.placement }"}`;

export default function RootLayout(
    props: {
        children: ReactNode;
    },
) {
    const page = PLUGIN_SYSTEM.getRoute([ "" ], RouteEntryPoint.root_layout);

    if (!page) {
        return (
            <html lang="en">
            <head>
                {
                    getRootHead().map(v =>
                        <v.component key={ makeKey(v) } />,
                    )
                }
            </head>
            <body>
                {
                    getRootBodyBefore().map(v =>
                        <v.component key={ makeKey(v) } />,
                    )
                }
                <Providers>
                    { props.children }
                </Providers>
                {
                    getRootBodyAfter().map(v =>
                        <v.component key={ makeKey(v) } />,
                    )
                }
            </body>
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