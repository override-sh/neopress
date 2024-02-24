import {
    PluginDefinitionInterface,
    PluginStateInterface,
} from "./interfaces/plugin-definition.interface";

type AliasPluginName = PluginDefinitionInterface["name"];

export class PluginStorage {
    private _storage: Record<AliasPluginName, PluginDefinitionInterface> = {};
    private _state: Record<AliasPluginName, PluginStateInterface> = {};

    /**
     * Register an object to the storage
     * @template K
     * @param {PluginDefinitionInterface} obj The object to register
     * @returns {this} The storage instance with the object registered
     */
    public register(
        obj: PluginDefinitionInterface,
    ): this {
        if (this._storage[obj.name]) {
            throw new Error(`Plugin with name '${ obj.name }' already exists.`);
        }
        this._storage[obj.name] = obj;
        this._state[obj.name] = { booted: false };
        return this;
    }

    /**
     * Unregister an object from the storage
     * @param {AliasPluginName} key The key of the object in the storage
     * @returns {this} The storage instance without the object
     */
    public unregister(key: AliasPluginName): this {
        if (!this._storage[key]) {
            throw new Error(`Plugin with key '${ key }' does not exist.`);
        }
        delete this._storage[key];
        delete this._state[key];
        return this;
    }

    /**
     * Get a list of all objects in the storage
     * @returns {PluginDefinitionInterface[]} The list of objects in the storage
     */
    public getAll(): Record<AliasPluginName, PluginDefinitionInterface> {
        return { ...this._storage };
    }

    /**
     * Check if the storage has an object by key
     * @param {AliasPluginName} key The key of the object in the storage
     * @returns {boolean} True if the storage has the object, false if not
     */
    public has(key: AliasPluginName): boolean {
        return key in this._storage;
    }

    /**
     * Get an object from the storage by key
     * @param {AliasPluginName} key The key of the object in the storage
     * @returns {PluginDefinitionInterface | null} The object in the storage, or null if not found
     */
    public get(key: AliasPluginName): PluginDefinitionInterface | null {
        return this._storage[key] ?? null;
    }

    /**
     * Set the state of a plugin
     * @param {AliasPluginName} key The key of the plugin in the storage
     * @param {PluginStateInterface} state The state to set
     * @returns {this} The storage instance with the state set
     */
    public setState(
        key: AliasPluginName,
        state: PluginStateInterface,
    ): this {
        if (!this._storage[key]) {
            throw new Error(`Plugin with key '${ key }' does not exist.`);
        }
        this._state[key] = state;
        return this;
    }

    /**
     * Get the state of a plugin
     * @param {AliasPluginName} key The key of the plugin in the storage
     * @returns {PluginStateInterface | null} The state of the plugin, or null if not found
     */
    public getState(key: AliasPluginName): PluginStateInterface | null {
        return this._state[key] ?? null;
    }
}