import type { PluginSystem } from "@neopress/plugin-system";
import {
    createContext,
    useContext,
} from "react";

const PluginSystemContext = createContext<{
    plugin_system: PluginSystem
}>({ plugin_system: {} as PluginSystem });
export const PluginSystemProvider = PluginSystemContext.Provider;

/**
 * Get the plugin system
 */
export const usePluginSystem = () => {
    return useContext(PluginSystemContext).plugin_system;
};