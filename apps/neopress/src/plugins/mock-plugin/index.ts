import {
    PluginDefinitionInterface,
    PluginSystem,
} from "@neopress/plugin-system";
import { MockApi } from "./mocks/api";
import { MockComponent } from "./mocks/component";
import { MockMiddleware } from "./mocks/middleware";
import { MockPage } from "./mocks/page";

export class MockPlugin implements PluginDefinitionInterface {
    name = "Mock Plugin";
    version = "1.0.0";
    description = "A sample mock plugin used for testing purposes, remove this before production deployment.";

    constructor(private _plugin_system: PluginSystem) {}

    boot() {
        this._plugin_system.registerRoute({
            route:     "/mock-page",
            component: MockPage,
        });
        this._plugin_system.registerApiRoute({
            route:   "/mock-api",
            method:  "GET",
            handler: MockApi,
        });
        this._plugin_system.registerComponent({
            name:      "MockComponent",
            component: MockComponent,
        });
        this._plugin_system.registerMiddleware({
            name:    "MockMiddleware",
            handler: MockMiddleware,
        });
    }
}