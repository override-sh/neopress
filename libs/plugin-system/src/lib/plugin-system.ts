import { RouteDefinitionInterface } from "libs/plugin-system/src/lib/interfaces/route-definition.interface";
import { Constructor } from "type-fest";
import { ApiRouteStorage } from "./api-route-storage";
import { ComponentStorage } from "./component-storage";
import { ApiRouteDefinitionInterface } from "./interfaces/api-route-definition.interface";
import { ComponentDefinitionInterface } from "./interfaces/component-definition.interface";
import { MiddlewareDefinitionInterface } from "./interfaces/middleware-definition.interface";
import { PluginDefinitionInterface } from "./interfaces/plugin-definition.interface";
import { MiddlewareStorage } from "./middleware-storage";
import { PluginStorage } from "./plugin-storage";
import { RouteStorage } from "./route-storage";

export class PluginSystem {
    private _plugin_store: PluginStorage = new PluginStorage();
    private _component_store: ComponentStorage = new ComponentStorage();
    private _route_store: RouteStorage = new RouteStorage();
    private _api_route_store: ApiRouteStorage = new ApiRouteStorage();
    private _middleware_storage: MiddlewareStorage = new MiddlewareStorage();

    /**
     * Register a plugin to the system
     * @param {PluginDefinitionInterface & Constructor<PluginDefinitionInterface, [PluginSystem]>} plugin
     */
    registerPlugin(plugin: PluginDefinitionInterface & Constructor<PluginDefinitionInterface, [ PluginSystem ]>) {
        this._plugin_store.register(new plugin(this));
    }

    /**
     * Register a component to the system
     * @param {ComponentDefinitionInterface} component
     */
    registerComponent(component: ComponentDefinitionInterface) {
        this._component_store.register(component);
    }

    /**
     * Register a route to the system
     * @param {RouteDefinitionInterface} routeDefinition
     */
    registerRoute(routeDefinition: RouteDefinitionInterface) {
        this._route_store.register(routeDefinition);
    }

    /**
     * Register an API route to the system
     * @param {ApiRouteDefinitionInterface} apiRouteDefinition
     */
    registerApiRoute(apiRouteDefinition: ApiRouteDefinitionInterface) {
        this._api_route_store.register(apiRouteDefinition);
    }

    /**
     * Register a middleware to the system
     * @param {MiddlewareDefinitionInterface} middlewareDefinition
     * @returns {MiddlewareStorage}
     */
    registerMiddleware(middlewareDefinition: MiddlewareDefinitionInterface) {
        return this._middleware_storage.register(middlewareDefinition);
    }

    /**
     * Boot all plugins
     */
    boot() {
        Object.values(this._plugin_store.getAll()).forEach((plugin) => {
            plugin.boot();

            // Update the plugin state to reflect that it has been booted
            const plugin_state = this._plugin_store.getState(plugin.name) ?? {};
            this._plugin_store.setState(
                plugin.name,
                {
                    ...plugin_state,
                    booted: true,
                },
            );
        });
    }
}