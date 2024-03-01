import { Constructor } from "type-fest";
import { BasePlugin } from "./base-plugin";
import { PluginSystem } from "./plugin-system";

const PLUGIN_SYSTEM = new PluginSystem();

export const bootstrap = (plugins: Constructor<BasePlugin, [ PluginSystem ]>[]) => {
    plugins.forEach(plugin => PLUGIN_SYSTEM.registerPlugin(plugin));

    PLUGIN_SYSTEM.boot();
};

export default PLUGIN_SYSTEM;