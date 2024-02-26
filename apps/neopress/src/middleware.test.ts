import PLUGIN_SYSTEM, { PluginDefinitionInterface } from "@neopress/plugin-system";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";
import { PLUGIN_LIST } from "./plugins";

describe("middleware", () => {

    // Calls the "runMiddleware" method of the "PLUGIN_SYSTEM" object with the "request" parameter
    it(
        "should call the \"runMiddleware\" method of the \"PLUGIN_SYSTEM\" object with the \"request\" parameter",
        () => {
            const request: NextRequest = new NextRequest("https://example.com");
            const runMiddlewareSpy = jest.spyOn(PLUGIN_SYSTEM, "runMiddleware");

            middleware(request);

            expect(runMiddlewareSpy).toHaveBeenCalledWith(request);
        },
    );

    // Initializes the "PLUGIN_SYSTEM" object with the "PLUGIN_LIST" array
    it("should initialize the \"PLUGIN_SYSTEM\" object with the \"PLUGIN_LIST\" array", () => {
        middleware(new NextRequest("https://example.com"));

        expect(Object.values(PLUGIN_SYSTEM.getRegisteredPlugins()).map((plugin: PluginDefinitionInterface) => ({
            name:        plugin.name,
            version:     plugin.version,
            description: plugin.description,
        })))
            .toEqual(PLUGIN_LIST.map(plugin_class => {
                const plugin = new plugin_class();
                return {
                    name:        plugin.name,
                    version:     plugin.version,
                    description: plugin.description,
                };
            }));
    });

});
