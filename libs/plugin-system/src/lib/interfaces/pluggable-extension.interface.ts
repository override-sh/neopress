import { Constructor } from "type-fest";
import type { PluginSystem } from "../plugin-system";
import { PluginDefinitionInterface } from "./plugin-definition.interface";

export type PluggableExtensionInterface =
    PluginDefinitionInterface
    & Constructor<PluginDefinitionInterface, [ PluginSystem ]>