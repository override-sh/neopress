import { ComponentDefinitionInterface } from "./interfaces/component-definition.interface";

type AliasComponentName = ComponentDefinitionInterface["name"];

export class ComponentStorage {
    private _storage: Record<AliasComponentName, ComponentDefinitionInterface> = {};

    /**
     * Register an object to the storage
     * @template K
     * @param {ComponentDefinitionInterface} obj The object to register
     * @returns {this} The storage instance with the object registered
     */
    public register(
        obj: ComponentDefinitionInterface,
    ): this {
        if (this._storage[obj.name]) {
            throw new Error(`Object with name '${obj.name}' is already registered.`);
        }
        this._storage[obj.name] = obj;
        return this;
    }

    /**
     * Unregister an object from the storage
     * @param {AliasComponentName} key The key of the object in the storage
     * @returns {this} The storage instance without the object
     */
    public unregister(key: AliasComponentName): this {
        if (!(key in this._storage)) {
            throw new Error(`Object with key '${key}' does not exist in the storage.`);
        }
        delete this._storage[key];
        return this;
    }

    /**
     * Check if an object with a specific key exists in the storage
     * @param {AliasComponentName} key The key of the object in the storage
     * @returns {boolean} True if the object exists, false otherwise
     */
    public has(key: AliasComponentName): boolean {
        return key in this._storage;
    }

    /**
     * Get a list of all objects in the storage
     * @returns {Record<AliasComponentName, ComponentDefinitionInterface>} The list of objects in the storage
     */
    public getAll(): Record<AliasComponentName, ComponentDefinitionInterface> {
        return { ...this._storage };
    }

    /**
     * Get an object from the storage by key
     * @param {AliasComponentName} key The key of the object in the storage
     * @returns {ComponentDefinitionInterface | null} The object in the storage, or null if not found
     */
    public get(key: AliasComponentName): ComponentDefinitionInterface | null {
        return this._storage[key] ?? null;
    }
}