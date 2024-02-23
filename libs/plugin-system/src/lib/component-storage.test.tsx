import { ComponentDefinitionInterface } from "./interfaces/component-definition.interface";
import {ComponentStorage} from "./component-storage";

describe('ComponentStorage', () => {

    // Can register an object to the storage
    it('should register an object to the storage when calling register()', () => {
        const componentStorage = new ComponentStorage();
        const obj: ComponentDefinitionInterface = {
            name: "component1",
            component: () => null,
        };

        componentStorage.register(obj);

        expect(componentStorage.get("component1")).toEqual(obj);
    });

    // Throws an error when trying to register an object with an already existing name
    it('should throw an error when trying to register an object with an already existing name', () => {
        const componentStorage = new ComponentStorage();
        const obj1: ComponentDefinitionInterface = {
            name: "component1",
            component: () => null,
        };
        const obj2: ComponentDefinitionInterface = {
            name: "component1",
            component: () => null,
        };

        componentStorage.register(obj1);

        expect(() => componentStorage.register(obj2))
            .toThrow(`Object with name '${obj2.name}' is already registered.`);
    });

    // Can unregister an object from the storage
    it('should unregister an object from the storage when calling unregister()', () => {
        const componentStorage = new ComponentStorage();
        const obj: ComponentDefinitionInterface = {
            name: "component1",
            component: () => null,
        };

        componentStorage.register(obj);
        componentStorage.unregister("component1");

        expect(componentStorage.get("component1")).toBeNull();
    });

    // Can get a list of all objects in the storage
    it('should return a list of all objects in the storage when calling getAll()', () => {
        const componentStorage = new ComponentStorage();
        const obj1: ComponentDefinitionInterface = {
            name: "component1",
            component: () => null,
        };
        const obj2: ComponentDefinitionInterface = {
            name: "component2",
            component: () => null,
        };

        componentStorage.register(obj1);
        componentStorage.register(obj2);

        const result = componentStorage.getAll();

        expect(result).toEqual({
            component1: obj1,
            component2: obj2,
        });
    });

    // Can get an object from the storage by key
    it('should return an object from the storage when calling get()', () => {
        const componentStorage = new ComponentStorage();
        const obj: ComponentDefinitionInterface = {
            name: "component1",
            component: () => null,
        };

        componentStorage.register(obj);

        const result = componentStorage.get("component1");

        expect(result).toEqual(obj);
    });

    // Returns null when trying to get an object that does not exist in the storage
    it('should return null when trying to get an object that does not exist in the storage', () => {
        const componentStorage = new ComponentStorage();
        const result = componentStorage.get("component1");

        expect(result).toBeNull();
    });

    // Returns true when an object with a specific key exists in the storage
    it('should return true when an object with a specific key exists in the storage', () => {
        const componentStorage = new ComponentStorage();
        const obj: ComponentDefinitionInterface = {
            name: "component1",
            component: () => null,
        };

        componentStorage.register(obj);

        const result = componentStorage.has("component1");

        expect(result).toBe(true);
    });

});
