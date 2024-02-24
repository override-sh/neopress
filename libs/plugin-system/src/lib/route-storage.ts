import {
    RouteDefinitionBaseInterface,
    RouteDefinitionInterface,
    RouteDefinitionLayoutInterface,
    RouteDefinitionPageOrDefaultInterface,
} from "./interfaces/route-definition.interface";
import { RouteEntryPoint } from "./interfaces/route-entrypoint.enum";

type AliasApiRoute = RouteDefinitionInterface["route"];

export class RouteStorage {
    private _storage: Record<AliasApiRoute, RouteDefinitionInterface> = {};

    /**
     * Register an object to the storage
     * @template K
     * @param {RouteDefinitionInterface} obj The object to register
     * @returns {this} The storage instance with the object registered
     * @throws {Error} If the route is already registered
     */
    public register(
        obj: RouteDefinitionInterface,
    ): this {
        if (this._storage[obj.route]) {
            throw new Error(`Route '${ obj.route }' is already registered`);
        }

        // If the entry point is not provided, use the default one
        if (!obj.entry_point) {
            obj.entry_point = RouteEntryPoint.page;
        }

        this._storage[`${ obj.route }-{"ep":${ obj.entry_point }}`] = obj as RouteDefinitionInterface;
        return this;
    }

    /**
     * Unregister an object from the storage
     * @param {AliasApiRoute} key The key of the object in the storage
     * @param {RouteEntryPoint} entrypoint The entry point for the route
     * @returns {this} The storage instance without the object
     * @throws {Error} If the route does not exist in the storage
     */
    public unregister(key: AliasApiRoute, entrypoint: RouteEntryPoint = RouteEntryPoint.page): this {
        if (!(key in this._storage)) {
            throw new Error(`Route '${ key }' does not exist in the storage.`);
        }
        delete this._storage[`${ key }-{"ep":${ entrypoint }}`];
        return this;
    }

    /**
     * Get a list of all objects in the storage
     * @returns {Record<AliasApiRoute, RouteDefinitionInterface>} The list of objects in the storage
     */
    public getAll(): Record<AliasApiRoute, RouteDefinitionInterface> {
        return { ...this._storage };
    }

    /**
     * Get an object from the storage by key
     * @param {AliasApiRoute} key The key of the object in the storage
     * @param {RouteEntryPoint} entrypoint The entry point for the route
     * @returns {RouteDefinitionInterface | null} The object in the storage, or null if not found
     */
    public get<E extends RouteEntryPoint>(
        key: AliasApiRoute,
        entrypoint?: E,
    ): (
           E extends RouteEntryPoint.layout | RouteEntryPoint.root_layout
           ? RouteDefinitionLayoutInterface
           : (
               E extends RouteEntryPoint.default | RouteEntryPoint.page
               ? RouteDefinitionPageOrDefaultInterface
               : (E extends undefined
                  ? RouteDefinitionPageOrDefaultInterface
                  : RouteDefinitionBaseInterface
                   )
               )
           ) | null {
        // If the entry point is not provided, use the default one
        if (!entrypoint) {
            entrypoint = RouteEntryPoint.page as E;
        }

        return (this._storage[`${ key }-{"ep":${ entrypoint }}`] ?? null) as any;
    }

    /**
     * Check if a route is already registered in the storage
     * @param {AliasApiRoute} route The route to check
     * @param {RouteEntryPoint} entrypoint
     * @returns {boolean} True if the route is already registered, false otherwise
     */
    public has(
        route: AliasApiRoute,
        entrypoint: RouteEntryPoint = RouteEntryPoint.page,
    ): boolean {
        return `${ route }-{"ep":${ entrypoint }}` in this._storage;
    }
}