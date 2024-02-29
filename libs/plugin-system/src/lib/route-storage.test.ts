import { RouteEntryPoint } from "libs/plugin-system/src/lib/interfaces/route-entrypoint.enum";
import { RouteDefinitionInterface } from "./interfaces/route-definition.interface";
import { RouteStorage } from "./route-storage";

describe("RouteStorage", () => {

    // Register a new object to the storage successfully
    it("should register a new object to the storage successfully when calling register()", () => {
        const route_storage = new RouteStorage();
        const obj: RouteDefinitionInterface = {
            route:     "/test",
            component: () => null,
        };

        route_storage.register(obj);

        expect(route_storage.get("/test")).toEqual(obj);
    });

    // Throw an error when registering an object with an already registered route
    it("should throw an error when registering an object with an already registered route", () => {
        const route_storage = new RouteStorage();
        const obj1: RouteDefinitionInterface = {
            route:     "/test",
            component: () => null,
        };
        const obj2: RouteDefinitionInterface = {
            route:     "/test",
            component: () => null,
        };

        route_storage.register(obj1);

        expect(() => route_storage.register(obj2)).toThrow(`Route '/test' is already registered`);
    });

    // Unregister an object from the storage successfully
    it("should unregister an object from the storage when calling unregister()", () => {
        const route_storage = new RouteStorage();
        const obj: RouteDefinitionInterface = {
            route:     "/route1",
            component: () => null,
        };

        route_storage.register(obj);
        route_storage.unregister("/route1");

        expect(route_storage.get("/route1")).toBeNull();
    });

    // Get all objects in the storage successfully
    it("should return a list of all objects in the storage when calling getAll()", () => {
        const route_storage = new RouteStorage();
        const obj1: RouteDefinitionInterface = {
            route:     "/route1",
            component: () => null,
        };
        const obj2: RouteDefinitionInterface = {
            route:     "/route2",
            component: () => null,
        };

        route_storage.register(obj1);
        route_storage.register(obj2);

        const result = route_storage.getAll();

        expect(result).toEqual({
            [`/route1-{"ep":${ RouteEntryPoint.page }}`]: obj1,
            [`/route2-{"ep":${ RouteEntryPoint.page }}`]: obj2,
        });
    });

    // Get an object from the storage by key successfully
    it("should return the object from the storage when calling get() with a valid key", () => {
        const route_storage = new RouteStorage();
        const obj: RouteDefinitionInterface = {
            route:     "/route1",
            component: () => null,
        };

        route_storage.register(obj);

        const result = route_storage.get("/route1");

        expect(result).toEqual(obj);
    });

    // Return null when calling get() with an invalid key
    it("should return null when calling get() with an invalid key", () => {
        const route_storage = new RouteStorage();
        const obj: RouteDefinitionInterface = {
            route:     "/route1",
            component: () => null,
        };

        route_storage.register(obj);

        const result = route_storage.get("/invalid");

        expect(result).toBeNull();
    });

    // Throw an error when calling unregister() with an invalid key
    it("should throw an error when calling unregister() with an invalid key", () => {
        const route_storage = new RouteStorage();
        const obj: RouteDefinitionInterface = {
            route:     "/route1",
            component: () => null,
        };

        route_storage.register(obj);

        expect(() => route_storage.unregister("/invalid")).toThrow(`Route '/invalid' does not exist`);
    });

    // Check if a route is already registered in the storage
    it("should return true when calling isRouteRegistered() with a registered route", () => {
        const route_storage = new RouteStorage();
        const obj: RouteDefinitionInterface = {
            route:     "/route1",
            component: () => null,
        };

        route_storage.register(obj);

        const result = route_storage.has("/route1");

        expect(result).toBe(true);
    });

});
