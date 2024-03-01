import {
    ComponentDefinitionInterface,
    ComponentDefinitionMixedInterface,
    ComponentDefinitionRootProvidersInterface,
} from "./interfaces/component-definition.interface";
import { ComponentPlacements } from "./interfaces/component-position.interface";

type AliasComponentName = ComponentDefinitionInterface["name"];

/**
 * A storage for components, to keep track of all components
 */
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
        if (this._storage[`${ obj.name }-{"p":"${ obj.placement }"}`]) {
            throw new Error(`Object with name '${ obj.name }' is already registered.`);
        }
        this._storage[`${ obj.name }-{"p":"${ obj.placement }"}`] = obj;
        return this;
    }

    /**
     * Unregister an object from the storage
     * @param {AliasComponentName} key The key of the object in the storage
     * @param {ComponentPlacements | undefined} placement The position class of the object (where to place it in the
     *     layout)
     * @returns {this} The storage instance without the object
     */
    public unregister(key: AliasComponentName, placement?: ComponentPlacements): this {
        if (!(`${ key }-{"p":"${ placement }"}` in this._storage)) {
            throw new Error(`Object with key '${ key }' does not exist in the storage.`);
        }
        delete this._storage[`${ key }-{"p":"${ placement }"}`];
        return this;
    }

    /**
     * Check if an object with a specific key exists in the storage
     * @param {AliasComponentName} key The key of the object in the storage
     * @param {ComponentPlacements | undefined} placement The position class of the object (where to place it in the
     *     layout)
     * @returns {boolean} True if the object exists, false otherwise
     */
    public has(key: AliasComponentName, placement?: ComponentPlacements): boolean {
        return `${ key }-{"p":"${ placement }"}` in this._storage;
    }

    /**
     * Get a list of all objects in the storage (un-mutable), optionally filtered by position
     * @returns {Record<AliasComponentName, ComponentDefinitionInterface>} The list of objects in the storage
     */
    public getAll<P extends ComponentPlacements>(placement?: P):
        P extends "root.providers"
        ? Record<AliasComponentName, ComponentDefinitionRootProvidersInterface>
        : Record<AliasComponentName, ComponentDefinitionMixedInterface> {
        return {
            ...(
                Object.values(this._storage)
                    .filter(v => v.placement === placement)
                    .reduce(
                        (acc, v) => {
                            acc[v.name] = v;
                            return acc;
                        },
                        {} as Record<AliasComponentName, ComponentDefinitionInterface>,
                    )
            ),
        } as any;
    }

    /**
     * Get an object from the storage by key
     * @param {AliasComponentName} key The key of the object in the storage
     * @param {ComponentPlacements | undefined} placement The position class of the object (where to place it in the
     *     layout)
     * @returns {ComponentDefinitionInterface | null} The object in the storage, or null if not found
     */
    public get(key: AliasComponentName, placement?: ComponentPlacements): ComponentDefinitionInterface | null {
        return this._storage[`${ key }-{"p":"${ placement }"}`] ?? null;
    }
}