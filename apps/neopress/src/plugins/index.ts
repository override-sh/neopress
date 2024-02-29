import { PluggableExtensionInterface } from "@neopress/plugin-system";
import { MockPlugin } from "./mock-plugin";

export const PLUGIN_LIST: PluggableExtensionInterface[] = [
    MockPlugin as unknown as PluggableExtensionInterface,
];