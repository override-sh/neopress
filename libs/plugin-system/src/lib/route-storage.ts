import { RouteDefinitionInterface } from "./interfaces/route-definition.interface";

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
        this._storage[obj.route] = obj;
        return this;
    }

    /**
     * Unregister an object from the storage
     * @param {AliasApiRoute} key The key of the object in the storage
     * @returns {this} The storage instance without the object
     * @throws {Error} If the route does not exist in the storage
     */
    public unregister(key: AliasApiRoute): this {
        if (!(key in this._storage)) {
            throw new Error(`Route '${ key }' does not exist in the storage.`);
        }
        delete this._storage[key];
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
     * @returns {RouteDefinitionInterface | null} The object in the storage, or null if not found
     */
    public get(key: AliasApiRoute): RouteDefinitionInterface | null {
        return this._storage[key] ?? null;
    }

    /**
     * Check if a route is already registered in the storage
     * @param {AliasApiRoute} route The route to check
     * @returns {boolean} True if the route is already registered, false otherwise
     */
    public has(route: AliasApiRoute): boolean {
        return route in this._storage;
    }
}