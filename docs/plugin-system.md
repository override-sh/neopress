# Plugin system

The ground of the whole NeoPress extensibility is its plugin system, freely inspired by the one seen in WordPress, but with many peculiarities.

## The storages

NeoPress plugin system is based on a series of `storages` (aka classes) with controlled access and registration capabilities.&#x20;

The storages are not by default extendable nor is the plugin system natively, this behaviour may be subject to change in future releases as extendability and developer experience are some of the main goals of NeoPress.

There are 5 native Storages each with its peculiarities.

### The `plugin storage`

The `plugin storage` is the one responsible for the registration and state management of all the plugins loaded and booted into NeoPress.

### The `component storage`

The `component storage` keeps track of all the extension components. Components may be used for a large variety of tasks:

* when their `placement` is defined, that is used as a reference to inject them into the defined position
* when no `placement` is defined, they can be referenced by other plugins or custom features to inject them into arbitrary application positions, much like a dependency injection

### The `route storage`

The `route storage` is one of the most important, it allows the registration of pages (or views) into the application. Each route is identified as a pair of <mark style="color:yellow;">route definitions</mark> + <mark style="color:orange;">route entrypoint</mark>, in simple words, the <mark style="color:yellow;">route definition</mark> is the actual route at which the page will be rendered (eg. `/example/route`) while the <mark style="color:orange;">route entrypoint</mark> allows you to define the kind of Next.js page you're creating.&#x20;

<details>

<summary>List of available route entrypoints</summary>

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
     * The default entry point for the route, will be rendered in 
     * "default.tsx" file
     */
    default,
    /**
     * The error entry point for the route, will be rendered in 
     * "error.tsx" file
     */
    error,
    /**
     * The global error entry point for the route, will be rendered in  
     * "global-error.tsx" file
     */
    global_error,
    /**
     * The layout entry point for the route, will be rendered in  
     * "layout.tsx" file
     */
    layout,
    /**
     * The root layout entry point for the route, will be rendered in  
     * "layout.tsx" file at the root level
     */
    root_layout,
    /**
     * The loading entry point for the route, will be rendered in  
     * "loading.tsx" file
     */
    loading,
    /**
     * The not found entry point for the route, will be rendered in  
     * "not-found.tsx" file
     */
    not_found,
    /**
     * The global not found entry point for the route, will be rendered in  
     * "not-found.tsx" file at the root level
     */
    global_not_found,
    /**
     * The page entry point for the route, will be rendered in  
     * "page.tsx" file
     */
    page,
}
```
{% endcode %}

</details>

{% hint style="info" %}
If not specified the default `RouteEntryPoint` will always be considered `RouteEntryPoint.page`
{% endhint %}

{% hint style="warning" %}
Currently dynamic path segments (eg. `/sample/[dynamic]/[path]/segments`) are not supported, but we plan to support them soon to provide a fully featured wrapper around Next.js native functionalities.
{% endhint %}

Each of the routes can define multiple arguments, including its sitemap definition and its metadata (or metadata generator) more about the available interfaces [here](api/routedefinitioninterface.md).

### The `API route storage`

As the name suggests the `API route storage` handles the registration of all the application API routes. Internally it works mostly like the page route but, instead of the entrypoints defined for the `route storage` here is the requirements to define the API method.

### The `middleware storage`

Finally, there's the `middleware storage` for an internal definition of middlewares and their capabilities refer to the [Next.js Official Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware).

{% hint style="warning" %}
Due to its nature, the official `matcher` functionalities are not supported as they can potentially exclude the execution of other middlewares for routes they should act on.
{% endhint %}

Apart from the default capabilities middlewares are composed based on their priority, the higher it is the higher in the hierarchy will be the middleware. By default, all middlewares without priority have a  priority of `1`.

<details>

<summary>Example</summary>

Assuming there are 3 middlewares defined as follows (other properties except for priority excluded for the sake of simplicity)

```typescript
const MiddlewareA = { priority: 5 }
const MiddlewareB = { priority: 3 }
const MiddlewareC = { priority: 7 }
```

The execution order will be:

* `MiddlewareC`
* `MiddlewareA`
* `MiddlewareB`

If any of `MiddlewareC` or `MiddlewareA` returns without calling the next middleware `MiddlewareB` won't ever be executed

</details>
