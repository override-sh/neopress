import { ReactChildren } from "@neopress/core";
import { FC } from "react";
import { ComponentPlacements } from "./component-position.interface";

interface ComponentDefinitionBaseInterface {
    name: string;
    component: FC<any>;
    placement?: ComponentPlacements;
}

export interface ComponentDefinitionMixedInterface extends ComponentDefinitionBaseInterface {
    name: string;
    component: FC<unknown>;
    placement?: ComponentPlacements;
}

export interface ComponentDefinitionRootProvidersInterface extends ComponentDefinitionBaseInterface {
    component: FC<ReactChildren>;
    placement: "root.providers";
}

export type ComponentDefinitionInterface =
    ComponentDefinitionMixedInterface
    | ComponentDefinitionRootProvidersInterface;