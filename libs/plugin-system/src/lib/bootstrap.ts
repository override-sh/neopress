import { PluggableExtensionInterface } from "./interfaces/pluggable-extension.interface";
import { PluginSystem } from "./plugin-system";

const PLUGIN_SYSTEM = new PluginSystem();

export const bootstrap = (plugins: PluggableExtensionInterface[]) => {
    plugins.forEach(plugin => PLUGIN_SYSTEM.registerPlugin(plugin));

    PLUGIN_SYSTEM.boot();
};

export default PLUGIN_SYSTEM;