/**
 * Represents the definition of a plugin
 *
 * NOTE: Requires a constructor that accepts a single argument of type `any`, see example below
 *
 * @code
 * ```typescript
 * import {
 *     PluginSystem,
 *     BasePlugin
 * } from "@neopress/plugin-system";
 *
 * export class MockPlugin extends BasePlugin {
 *     public static name = "Mock Plugin";
 *     public static version = "1.0.0";
 *     public static description = "A sample mock plugin used for testing purposes, remove this before production
 *     deployment.";
 *
 *     constructor(protected _plugin_system: PluginSystem) {
 *         super(_plugin_system);
 *     }
 *
 *     boot() {
 *         console.log("Booting Page Plugin");
 *     }
 * }
 * ```
 * @endcode
 */
export interface PluginDefinitionInterface {
    /**
     * The name of the plugin
     */
    name: string;
    /**
     * The version of the plugin
     */
    version: string;
    /**
     * Optional description of the plugin
     */
    description?: string;

    /**
     * Boot the plugin
     * @returns {void | Promise<void>}
     */
    boot: () => void | Promise<void>;
}

export interface PluginStateInterface {
    /**
     * Whether the plugin has been booted
     */
    booted: boolean;
}