import {
    BasePlugin,
    PluginSystem,
} from "@neopress/plugin-system";
import { Constructor } from "type-fest";
import { MockPlugin } from "./plugins/mock-plugin";

export const PLUGIN_LIST: Constructor<BasePlugin, [ PluginSystem ]>[] = [
    MockPlugin,
];