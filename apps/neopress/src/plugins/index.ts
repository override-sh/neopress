import { PluggableExtensionInterface } from "@neopress/plugin-system";
import { SamplePlugin } from "./sample-plugin";

export const PLUGIN_LIST: PluggableExtensionInterface[] = [
    SamplePlugin as unknown as PluggableExtensionInterface,
];