# RouteEntryPoint

{% code title="route-entrypoint.enum.ts" lineNumbers="true" %}
```typescript
/**
 * Define the route entry point, where the route will be rendered.
 *
 * Check the next.js documentation for more information on the entry points:
 * https://nextjs.org/docs/app/api-reference/file-conventions
 */
export enum RouteEntryPoint {
    /**
     * The default entry point for the route, will be rendered in "default.tsx" file
     */
    default,
    /**
     * The error entry point for the route, will be rendered in "error.tsx" file
     */
    error,
    /**
     * The global error entry point for the route, will be rendered in "global-error.tsx" file
     */
    global_error,
    /**
     * The layout entry point for the route, will be rendered in "layout.tsx" file
     */
    layout,
    /**
     * The root layout entry point for the route, will be rendered in "layout.tsx" file at the root level
     */
    root_layout,
    /**
     * The loading entry point for the route, will be rendered in "loading.tsx" file
     */
    loading,
    /**
     * The not found entry point for the route, will be rendered in "not-found.tsx" file
     */
    not_found,
    /**
     * The global not found entry point for the route, will be rendered in "not-found.tsx" file at the root level
     */
    global_not_found,
    /**
     * The page entry point for the route, will be rendered in "page.tsx" file
     */
    page,
}
```
{% endcode %}
