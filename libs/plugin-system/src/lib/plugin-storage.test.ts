import {
    PluginDefinitionInterface,
    PluginStateInterface,
} from "./interfaces/plugin-definition.interface";
import { PluginStorage } from "./plugin-storage";

describe("PluginStorage", () => {

    // Register a plugin and retrieve it with 'get'
    it("should register a plugin and retrieve it with 'get' when calling register()", () => {
        const pluginStorage = new PluginStorage();
        const plugin: PluginDefinitionInterface = {
            name:        "plugin1",
            version:     "1.0.0",
            description: "A sample plugin",
            boot: () => {
                // Do something
            },
        };

        pluginStorage.register(plugin);

        expect(pluginStorage.get("plugin1")).toEqual(plugin);
    });

    // Unregister a plugin that does not exist and confirm an error is thrown
    it("should throw an error when unregistering a plugin that does not exist", () => {
        const pluginStorage = new PluginStorage();

        expect(() => pluginStorage.unregister("plugin1"))
            .toThrow(`Plugin with key 'plugin1' does not exist.`);
    });

    // Register multiple plugins and retrieve them all with 'getAll'
    it("should register multiple plugins and retrieve them all with 'getAll'", () => {
        const pluginStorage = new PluginStorage();
        const plugin1: PluginDefinitionInterface = {
            name:        "plugin1",
            version:     "1.0.0",
            description: "Plugin 1",
            boot: () => {
                // Do something
            },
        };
        const plugin2: PluginDefinitionInterface = {
            name:        "plugin2",
            version:     "2.0.0",
            description: "Plugin 2",
            boot: () => {
                // Do something
            },
        };
        const plugin3: PluginDefinitionInterface = {
            name:        "plugin3",
            version:     "3.0.0",
            description: "Plugin 3",
            boot: () => {
                // Do something
            },
        };

        pluginStorage.register(plugin1);
        pluginStorage.register(plugin2);
        pluginStorage.register(plugin3);

        const result = pluginStorage.getAll();

        expect(result).toEqual({
            plugin1: plugin1,
            plugin2: plugin2,
            plugin3: plugin3,
        });
    });

    // Unregister a plugin and confirm it is no longer in the storage
    it("should unregister a plugin and confirm it is no longer in the storage", () => {
        const pluginStorage = new PluginStorage();
        const plugin: PluginDefinitionInterface = {
            name:        "plugin1",
            version:     "1.0.0",
            description: "Plugin 1",
            boot: () => {
                // Do something
            },
        };

        pluginStorage.register(plugin);
        pluginStorage.unregister("plugin1");

        const result = pluginStorage.get("plugin1");

        expect(result).toBeNull();
    });

    // Check if a plugin exists in the storage with 'has'
    it("should check if a plugin exists in the storage with 'has'", () => {
        const pluginStorage = new PluginStorage();
        const plugin: PluginDefinitionInterface = {
            name:        "plugin1",
            version:     "1.0.0",
            description: "Plugin 1",
            boot: () => {
                // Do something
            },
        };

        pluginStorage.register(plugin);

        const result = pluginStorage.has("plugin1");

        expect(result).toBe(true);
    });

    // Set the state of a plugin and retrieve it with 'getState'
    it("should set the state of a plugin and retrieve it with getState", () => {
        const pluginStorage = new PluginStorage();
        const plugin: PluginDefinitionInterface = {
            name:        "plugin1",
            version:     "1.0.0",
            description: "A sample plugin",
            boot: () => {
                // Do something
            },
        };
        const state: PluginStateInterface = {
            booted: true,
        };

        pluginStorage.register(plugin);
        pluginStorage.setState("plugin1", state);

        expect(pluginStorage.getState("plugin1")).toEqual(state);
    });

    // Register a plugin with the same name as a previously registered plugin and confirm an error is thrown
    it("should throw an error when registering a plugin with the same name as a previously registered plugin", () => {
        const pluginStorage = new PluginStorage();
        const plugin1: PluginDefinitionInterface = {
            name:        "plugin1",
            version:     "1.0.0",
            description: "A sample plugin",
            boot: () => {
                // Do something
            },
        };
        const plugin2: PluginDefinitionInterface = {
            name:        "plugin1",
            version:     "2.0.0",
            description: "Another sample plugin",
            boot: () => {
                // Do something
            },
        };

        pluginStorage.register(plugin1);

        expect(() => pluginStorage.register(plugin2)).toThrow(`Plugin with name '${ plugin2.name }' already exists.`);
    });

    // Get a plugin that does not exist and confirm null is returned
    it("should return null when getting a plugin that does not exist", () => {
        const pluginStorage = new PluginStorage();

        const result = pluginStorage.get("nonexistent-plugin");

        expect(result).toBeNull();
    });

    // Set the state of a plugin that does not exist and confirm an error is thrown
    it("should throw an error when setting the state of a plugin that does not exist", () => {
        const pluginStorage = new PluginStorage();
        const key = "plugin1";
        const state: PluginStateInterface = {
            booted: true,
        };

        expect(() => pluginStorage.setState(key, state))
            .toThrow(`Plugin with key '${ key }' does not exist.`);
    });

    // Get the state of a plugin that does not exist and confirm null is returned
    it("should return null when getting the state of a plugin that does not exist", () => {
        const pluginStorage = new PluginStorage();
        const key = "plugin1";

        const result = pluginStorage.getState(key);

        expect(result).toBeNull();
    });

    // Unregister a plugin and confirm the state is removed
    it("should unregister a plugin and confirm the state is removed", () => {
        const pluginStorage = new PluginStorage();
        const plugin: PluginDefinitionInterface = {
            name:        "plugin1",
            version:     "1.0.0",
            description: "A sample plugin",
            boot: () => {
                // Do something
            },
        };
        const state: PluginStateInterface = {
            booted: true,
        };

        pluginStorage.register(plugin);
        pluginStorage.setState("plugin1", state);
        pluginStorage.unregister("plugin1");

        const result = pluginStorage.getState("plugin1");

        expect(result).toBeNull();
    });

    // Register a plugin and confirm it is not booted
    it("should register a plugin and confirm it is not booted", () => {
        const pluginStorage = new PluginStorage();
        const plugin: PluginDefinitionInterface = {
            name:        "plugin1",
            version:     "1.0.0",
            description: "A sample plugin",
            boot: () => {
                // Do something
            },
        };

        pluginStorage.register(plugin);

        const result = pluginStorage.getState("plugin1");

        expect(result).toEqual({ booted: false });
    });

});
