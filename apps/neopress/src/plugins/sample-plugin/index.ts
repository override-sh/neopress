import {
    PluginDefinitionInterface,
    PluginSystem,
} from "@neopress/plugin-system";

export class SamplePlugin implements PluginDefinitionInterface {
    name = "Sample Plugin";
    version = "1.0.0";
    description = "A sample plugin";

    constructor(private _plugin_system: PluginSystem) {}

    boot() {
        console.log("Booting Sample Plugin");
    }
}