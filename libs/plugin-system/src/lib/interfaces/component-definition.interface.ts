import { ReactChildren } from "@neopress/core";
import { FC } from "react";
import { ComponentPlacements } from "./component-position.interface";

interface ComponentDefinitionBaseInterface {
    name: string;
    component: FC<any>;
    placement?: ComponentPlacements;
}

export type ComponentDefinitionMixedInterface = ComponentDefinitionBaseInterface

export interface ComponentDefinitionRootProvidersInterface extends ComponentDefinitionBaseInterface {
    component: FC<ReactChildren>;
    placement?: "root.providers";
}

export type ComponentDefinitionInterface =
    ComponentDefinitionMixedInterface
    | ComponentDefinitionRootProvidersInterface;
