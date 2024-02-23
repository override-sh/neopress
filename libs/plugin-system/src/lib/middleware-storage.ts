import {
    NextRequest,
    NextResponse,
} from "next/server";
import { MiddlewareDefinitionInterface } from "./interfaces/middleware-definition.interface";

type AliasMiddlewareName = MiddlewareDefinitionInterface["name"];

export class MiddlewareStorage {
    private _storage: Record<AliasMiddlewareName, MiddlewareDefinitionInterface> = {};

    /**
     * Register an object to the storage
     * @template K
     * @param {MiddlewareDefinitionInterface} obj The object to register
     * @returns {this} The storage instance with the object registered
     */
    public register(
        obj: MiddlewareDefinitionInterface,
    ): this {
        if (this._storage[obj.name]) {
            throw new Error(`Middleware with name '${ obj.name }' already exists.`);
        }
        this._storage[obj.name] = obj;
        return this;
    }

    /**
     * Unregister an object from the storage
     * @param {AliasMiddlewareName} key The key of the object in the storage
     * @returns {this} The storage instance without the object
     */
    public unregister(key: AliasMiddlewareName): this {
        if (!this._storage[key]) {
            throw new Error(`Middleware with key '${ key }' does not exist.`);
        }
        delete this._storage[key];
        return this;
    }

    /**
     * Get a list of all objects in the storage
     * @returns {MiddlewareDefinitionInterface[]} The list of objects in the storage
     */
    public getAll(): MiddlewareDefinitionInterface[] {
        return Object.entries(this._storage)
            // Sort by priority in descending order (higher priority first)
            .toSorted((a, b) => (b[1].priority ?? 1) - (a[1].priority ?? 1))
            .map(v => v[1]);
    }

    /**
     * Check if the storage has an object by key
     * @param {AliasMiddlewareName} key The key of the object in the storage
     * @returns {boolean} True if the storage has the object, false if not
     */
    public has(key: AliasMiddlewareName): boolean {
        return key in this._storage;
    }

    /**
     * Get an object from the storage by key
     * @param {AliasMiddlewareName} key The key of the object in the storage
     * @returns {MiddlewareDefinitionInterface | null} The object in the storage, or null if not found
     */
    public get(key: AliasMiddlewareName): MiddlewareDefinitionInterface | null {
        return this._storage[key] ?? null;
    }

    /**
     * Run the middleware chain
     * @param {NextRequest} request The request to run through the middleware chain
     * @returns {Promise<NextRequest>} The request after running through the middleware chain
     */
    public chain(request: NextRequest): Promise<NextResponse> {
        const middlewares = this.getAll();
        let i = 0;
        const next = async () => {
            if (i >= middlewares.length) {
                return NextResponse.next();
            }

            const middleware = middlewares[i];
            i++;
            return middleware.handler(request, next);
        };

        return next();
    }
}