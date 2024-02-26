import {
    NextRequest,
    NextResponse,
} from "next/server";
import { ApiRouteStorage } from "./api-route-storage";
import { ApiRouteDefinitionInterface } from "./interfaces/api-route-definition.interface";

describe('ApiRouteStorage', () => {

    // Register a new object to the storage successfully
    it('should register a new object to the storage successfully when calling register()', () => {
        const apiRouteStorage = new ApiRouteStorage();
        const obj: ApiRouteDefinitionInterface = {
            route: "/test",
            handler: (request: NextRequest) => {
                return new NextResponse();
            },
            method: "GET",
        };

        apiRouteStorage.register(obj);

        expect(apiRouteStorage.get("/test", "GET")).toEqual(obj);
    });

    // Throw an error when registering an object with an already registered route
    it('should throw an error when registering an object with an already registered route', () => {
        const apiRouteStorage = new ApiRouteStorage();
        const obj1: ApiRouteDefinitionInterface = {
            route: "/test",
            handler: (request: NextRequest) => {
                return new NextResponse();
            },
            method: "GET",
        };
        const obj2: ApiRouteDefinitionInterface = {
            route: "/test",
            handler: (request: NextRequest) => {
                return new NextResponse();
            },
            method: "GET",
        };

        apiRouteStorage.register(obj1);

        expect(() => apiRouteStorage.register(obj2)).toThrow(`Route '/test' is already registered`);
    });

    // Unregister an object from the storage successfully
    it('should unregister an object from the storage when calling unregister()', () => {
        const apiRouteStorage = new ApiRouteStorage();
        const obj: ApiRouteDefinitionInterface = {
            route: "/route1",
            handler: (request: NextRequest) => {
                return new NextResponse();
            },
            method: "GET",
        };

        apiRouteStorage.register(obj);
        apiRouteStorage.unregister("/route1", "GET");

        expect(apiRouteStorage.get("/route1", "GET")).toBeNull();
    });

    // Get all objects in the storage successfully
    it('should return a list of all objects in the storage when calling getAll()', () => {
        const apiRouteStorage = new ApiRouteStorage();
        const obj1: ApiRouteDefinitionInterface = {
            route: "/route1",
            handler: (request: NextRequest) => {
                return new NextResponse();
            },
            method: "GET",
        };
        const obj2: ApiRouteDefinitionInterface = {
            route: "/route2",
            handler: (request: NextRequest) => {
                return new NextResponse();
            },
            method: "GET",
        };

        apiRouteStorage.register(obj1);
        apiRouteStorage.register(obj2);

        const result = apiRouteStorage.getAll();

        expect(result).toEqual({
            "/route1-{\"m\":\"GET\"}": obj1,
            "/route2-{\"m\":\"GET\"}": obj2,
        });
    });

    // Get an object from the storage by key successfully
    it('should return the object from the storage when calling get() with a valid key', () => {
        const apiRouteStorage = new ApiRouteStorage();
        const obj: ApiRouteDefinitionInterface = {
            route: "/route1",
            handler: (request: NextRequest) => {
                return new NextResponse();
            },
            method: "GET",
        };

        apiRouteStorage.register(obj);

        const result = apiRouteStorage.get("/route1", "GET");

        expect(result).toEqual(obj);
    });

    // Return null when calling get() with an invalid key
    it('should return null when calling get() with an invalid key', () => {
        const apiRouteStorage = new ApiRouteStorage();
        const obj: ApiRouteDefinitionInterface = {
            route: "/route1",
            handler: (request: NextRequest) => {
                return new NextResponse();
            },
            method: "GET",
        };

        apiRouteStorage.register(obj);

        const result = apiRouteStorage.get("/invalid", "GET");

        expect(result).toBeNull();
    });

    // Throw an error when calling unregister() with an invalid key
    it('should throw an error when calling unregister() with an invalid key', () => {
        const apiRouteStorage = new ApiRouteStorage();
        const obj: ApiRouteDefinitionInterface = {
            route: "/route1",
            handler: (request: NextRequest) => {
                return new NextResponse();
            },
            method: "GET",
        };

        apiRouteStorage.register(obj);

        expect(() => apiRouteStorage.unregister("/invalid", "GET")).toThrow(`Route '/invalid' does not exist`);
    });

    // Check if a route is already registered in the storage
    it('should return true when calling isRouteRegistered() with a registered route', () => {
        const apiRouteStorage = new ApiRouteStorage();
        const obj: ApiRouteDefinitionInterface = {
            route: "/route1",
            handler: (request: NextRequest) => {
                return new NextResponse();
            },
            method: "GET",
        };

        apiRouteStorage.register(obj);

        const result = apiRouteStorage.has("/route1", "GET");

        expect(result).toBe(true);
    });

});
