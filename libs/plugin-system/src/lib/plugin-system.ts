import { HTTP_METHOD } from "next/dist/server/web/http";
import { NextRequest } from "next/server";
import { ApiRouteStorage } from "./api-route-storage";
import { ComponentStorage } from "./component-storage";
import { ApiRouteDefinitionInterface } from "./interfaces/api-route-definition.interface";
import {
    ComponentDefinitionInterface,
    ComponentDefinitionMixedInterface,
    ComponentDefinitionRootProvidersInterface,
} from "./interfaces/component-definition.interface";
import { ComponentPositions } from "./interfaces/component-position.interface";
import { MiddlewareDefinitionInterface } from "./interfaces/middleware-definition.interface";
import { PluggableExtensionInterface } from "./interfaces/pluggable-extension.interface";
import { RouteDefinitionInterface } from "./interfaces/route-definition.interface";
import { RouteEntryPoint } from "./interfaces/route-entrypoint.enum";
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
     * @param {PluggableExtensionInterface} plugin
     */
    public registerPlugin(plugin: PluggableExtensionInterface): this {
        this._plugin_store.register(new plugin(this));
        return this;
    }

    /**
     * Register a component to the system
     * @param {ComponentDefinitionInterface} component
     */
    public registerComponent(component: ComponentDefinitionInterface): this {
        this._component_store.register(component);
        return this;
    }

    /**
     * Register a route to the system
     * @param {RouteDefinitionInterface} routeDefinition
     */
    public registerRoute(routeDefinition: RouteDefinitionInterface): this {
        this._route_store.register(routeDefinition);
        return this;
    }

    /**
     * Register an API route to the system
     * @param {ApiRouteDefinitionInterface} apiRouteDefinition
     */
    public registerApiRoute(apiRouteDefinition: ApiRouteDefinitionInterface): this {
        this._api_route_store.register(apiRouteDefinition);
        return this;
    }

    /**
     * Register a middleware to the system
     * @param {MiddlewareDefinitionInterface} middlewareDefinition
     */
    public registerMiddleware(middlewareDefinition: MiddlewareDefinitionInterface): this {
        this._middleware_storage.register(middlewareDefinition);
        return this;
    }

    /**
     * Get an API route by its path and method
     * @param {string[]} route The route path
     * @param {Exclude<HTTP_METHOD, "OPTIONS">} method The HTTP method
     */
    public getApiRoute(route: string[], method: Exclude<HTTP_METHOD, "OPTIONS">) {
        return this._api_route_store.get(`/${ route.join("/") }`, method);
    }

    /**
     * Get a route by its path
     * @param {string[]} route The route path
     * @param {RouteEntryPoint} entrypoint The entry point for the route
     */
    public getRoute<E extends RouteEntryPoint>(route: string[], entrypoint?: E) {
        return this._route_store.get(`/${ route.join("/") }`, entrypoint);
    }

    /**
     * Get all routes
     */
    public getAllRoutes() {
        return this._route_store.getAll();
    }

    /**
     * Run all middleware
     * @param {NextRequest} request
     */
    public runMiddleware(request: NextRequest) {
        return this._middleware_storage.chain(request);
    }

    /**
     * Get a component by its name and position
     * @param {string} name The name of the component
     * @param {ComponentPositions} position The position of the component in the layout
     */
    public getComponent(name: string, position?: ComponentPositions) {
        return this._component_store.get(name, position);
    }

    /**
     * Get all components
     * @param {ComponentPositions} position The position of the component in the layout
     */
    public getAllComponents<P extends ComponentPositions>(position?: P):
        P extends "root.providers"
        ? ComponentDefinitionRootProvidersInterface[]
        : ComponentDefinitionMixedInterface[] {
        return Object.values(this._component_store.getAll(position)) as any;
    }

    /**
     * Boot all plugins
     */
    public boot() {
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