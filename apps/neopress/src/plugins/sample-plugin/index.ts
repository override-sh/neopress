import {
    PluginDefinitionInterface,
    PluginSystem,
} from "@neopress/plugin-system";
import Test from "./pages/test";

export class SamplePlugin implements PluginDefinitionInterface {
    name = "Sample Plugin";
    version = "1.0.0";
    description = "A sample plugin";

    constructor(private _plugin_system: PluginSystem) {}

    boot() {
        this._plugin_system.registerRoute({
            route:     "/sample",
            component: Test,
        });
    }
}