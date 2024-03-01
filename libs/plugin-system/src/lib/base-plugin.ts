import { PluginDefinitionInterface } from "./interfaces/plugin-definition.interface";
import { PluginSystem } from "./plugin-system";

export abstract class BasePlugin implements PluginDefinitionInterface {
    public static name: string;
    public static version: string;
    public static description?: string;

    protected constructor(protected _plugin_system: PluginSystem) {}

    public get name(): string {
        return (this.constructor as typeof BasePlugin).name;
    }

    public get version(): string {
        return (this.constructor as typeof BasePlugin).version;
    }

    public get description(): string | undefined {
        return (this.constructor as typeof BasePlugin).description;
    }

    public abstract boot(): void | Promise<void>;
}