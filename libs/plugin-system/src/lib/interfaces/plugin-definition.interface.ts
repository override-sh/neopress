/**
 * Represents the definition of a plugin
 *
 * NOTE: Requires a constructor that accepts a single argument of type `any`, see example below
 *
 * @code
 * ```typescript
 * import { PluginDefinitionInterface } from "@neopress/plugin-system";
 *
 * export class SamplePlugin implements PluginDefinitionInterface {
 *     name = "Sample Plugin";
 *     version = "1.0.0";
 *     description = "A sample plugin";
 *
 *     constructor(private _plugin_system: any) {}
 *
 *     boot() {
 *         console.log("Booting Sample Plugin");
 *     }
 * }
 * ```
 * @endcode
 */
export interface PluginDefinitionInterface {
    name: string;
    version: string;
    description?: string;

    boot: () => void | Promise<void>;
}

export interface PluginStateInterface {
    booted: boolean;
}