"use client";

import {
    PluginSystemProvider,
    ReactChildren,
} from "@neopress/core";
import PLUGIN_SYSTEM, { ComponentDefinitionRootProvidersInterface } from "@neopress/plugin-system";
import { memo } from "radash";
import { FC } from "react";

const getProviders: () => ComponentDefinitionRootProvidersInterface[] = memo(() => PLUGIN_SYSTEM.getAllComponents(
    "root.providers",
));

export const Providers: FC<ReactChildren> = ({ children }) => {
    return (
        <PluginSystemProvider value={ { plugin_system: PLUGIN_SYSTEM } }>
            {
                // nests all providers with the children as the innermost component
                getProviders().reduce((acc, { component: Provider }) => (
                    <Provider>{ acc }</Provider>
                ), children)
            }
        </PluginSystemProvider>
    );
};