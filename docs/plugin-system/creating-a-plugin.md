# Creating a plugin

Creating a plugin is as easy as exporting a class implementing the `PluginDefinitionInterface` (check its definition [here](https://github.com/override-sh/neopress/blob/main/libs/plugin-system/src/lib/interfaces/plugin-definition.interface.ts)), let's check an example.

## Mock plugin

One of the most basic plugins is the `MockPlugin` exported from the `@neopress/plugin-mock` package.

As a plugin it is responsible to register each of its fragments into the plugin system, let's examine its implementation below.import { BasePlugin

<pre class="language-typescript" data-title="MockPlugin" data-line-numbers><code class="lang-typescript"><strong>import { BasePlugin } from "@neopress/plugin-system";
</strong>// ...

<strong>export class MockPlugin extends BasePlugin {
</strong><strong>    public static plugin_name = "Mock Plugin";
</strong><strong>    public static version = "1.0.0";
</strong><strong>    public static description = "A sample mock plugin used for testing purposes, remove this before production deployment.";
</strong>    
    constructor(protected _plugin_system: PluginSystem) {
        super(_plugin_system);
    }
    
    boot() {
        // Register all component functionalities by leveraging 
        // this._plugin_system
    }
}
</code></pre>

This is mostly the core of the `MockPlugin` class, let's examine it piece by piece, each plugin must:

* Extend the `BasePlugin`
* Define at least the `name` and `version` static properties, optionally a `description` can be provided
* Implement the `boot` method where register and initialize all the plugin features

### The boot method

The `MockPlugin` registers quite a long list of components and routes for testing purposes, let's examine a few of them.

{% code title="MockPlugin.boot" lineNumbers="true" %}
```typescript
export class MockPlugin extends BasePlugin {
    public boot() {
        this._plugin_system.registerRoute({
            route:     "/mock-page",
            component: MockPage,
        });

        this._plugin_system.registerApiRoute({
            route:   "/mock-api",
            method:  "GET",
            handler: MockApi,
        });
        // other mock api registration

        this._plugin_system.registerComponent({
            name:      "MockComponent",
            component: MockComponent,
        });
        this._plugin_system.registerComponent({
            name:      "MockComponentHead",
            component: MockComponentHead,
            placement: "root.head"
        });
        // other mock component registration

        this._plugin_system.registerMiddleware({
            name:    "MockMiddleware",
            handler: MockMiddleware,
        });
    }
}
```
{% endcode %}

In the `boot` method defined above the mock plugin registers at least one plugin feature of each kind:

* A route accessible at `/mock-page`
* A series of API routes with their methods, all of them responding to rest requests to the `/api/mock-api` endpoint
* A series of components, the first named `MockComponent` registered as a simple reusable component for other libraries, the second named `MockComponentHead` that will be auto-injected into the `root.head` position
* A custom middleware
