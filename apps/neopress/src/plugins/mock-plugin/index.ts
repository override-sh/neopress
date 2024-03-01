import {
    BasePlugin,
    PluginSystem,
} from "@neopress/plugin-system";
import { MockApi } from "./mocks/api";
import { MockComponent } from "./mocks/component";
import { MockComponentAfterBody } from "./mocks/component-after-body";
import { MockComponentBeforeBody } from "./mocks/component-before-body";
import { MockComponentHead } from "./mocks/component-head";
import { MockComponentProviders } from "./mocks/component-providers";
import { MockMiddleware } from "./mocks/middleware";
import { MockPage } from "./mocks/page";

export class MockPlugin extends BasePlugin {
    public static plugin_name = "Mock Plugin";
    public static version = "1.0.0";
    public static description = "A sample mock plugin used for testing purposes, remove this before production deployment.";

    constructor(protected _plugin_system: PluginSystem) {
        super(_plugin_system);
    }

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
        this._plugin_system.registerApiRoute({
            route:   "/mock-api",
            method:  "PUT",
            handler: MockApi,
        });
        this._plugin_system.registerApiRoute({
            route:   "/mock-api",
            method:  "POST",
            handler: MockApi,
        });
        this._plugin_system.registerApiRoute({
            route:   "/mock-api",
            method:  "PATCH",
            handler: MockApi,
        });
        this._plugin_system.registerApiRoute({
            route:   "/mock-api",
            method:  "DELETE",
            handler: MockApi,
        });

        this._plugin_system.registerComponent({
            name:      "MockComponent",
            component: MockComponent,
        });
        this._plugin_system.registerComponent({
            name:      "MockComponentHead",
            component: MockComponentHead,
            placement: "root.head",
        });
        this._plugin_system.registerComponent({
            name:      "MockComponent",
            component: MockComponentProviders,
            placement: "root.providers",
        });
        this._plugin_system.registerComponent({
            name:      "MockComponent",
            component: MockComponentAfterBody,
            placement: "root.body.after",
        });
        this._plugin_system.registerComponent({
            name:      "MockComponent",
            component: MockComponentBeforeBody,
            placement: "root.body.before",
        });

        this._plugin_system.registerMiddleware({
            name:    "MockMiddleware",
            handler: MockMiddleware,
        });
    }
}
