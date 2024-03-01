# RouteDefinitionInterface

{% code title="route-definition.interface.ts" lineNumbers="true" %}
```typescript
import {
    Metadata,
    MetadataRoute,
    ResolvingMetadata,
} from "next";
import type {
    FC,
    ReactNode,
} from "react";
import { RouteEntryPoint } from "./route-entrypoint.enum";

export interface SearchParams {
    [key: string]: string | string[] | undefined;
}

export interface GenerateMetadataParams {
    /**
     * The search parameters for the route (aka: query parameters in the URL string)
     */
    searchParams?: SearchParams;
    /**
     * The metadata for the parent route
     */
    parent: ResolvingMetadata;
}

export type MetadataGenerator = (params: GenerateMetadataParams) => Metadata;

export interface DynamicRouteParams {
    params: {
        /**
         * The path parameters for the route
         */
        path: string[]
    };
    /**
     * The search parameters for the route (aka: query parameters in the URL string)
     */
    searchParams?: SearchParams;
}

export interface RouteDefinitionBaseInterface {
    /**
     * The route path with a leading slash
     *
     * @example "/about"
     * @example "/blog/an-example-slug"
     */
    route: string;
    /**
     * The component to render for this route
     *
     * NOTE: Always use server components for the entrypoint of a route in order to optimize the initial load time
     */
    component: FC<any>;
    /**
     * The entry point for the route
     */
    entry_point?: RouteEntryPoint;
    /**
     * The metadata (or generator function) for this route
     */
    metadata?: Metadata | MetadataGenerator;
    /**
     * Whether to hide this route from the sitemap
     */
    hide_from_sitemap?: boolean;
    /**
     * The sitemap metadata for this route
     */
    sitemap?: MetadataRoute.Sitemap[number];
}

export interface RouteDefinitionPageOrDefaultInterface extends RouteDefinitionBaseInterface {
    component: FC<DynamicRouteParams>;
    entry_point: RouteEntryPoint.page | RouteEntryPoint.default;
}

export interface RouteDefinitionLayoutInterface extends RouteDefinitionBaseInterface {
    component: FC<DynamicRouteParams & {
        children: ReactNode
    }>;
    entry_point: RouteEntryPoint.layout | RouteEntryPoint.root_layout;
}

export type RouteDefinitionInterface =
    RouteDefinitionPageOrDefaultInterface
    | RouteDefinitionLayoutInterface
    | RouteDefinitionBaseInterface;
```
{% endcode %}
