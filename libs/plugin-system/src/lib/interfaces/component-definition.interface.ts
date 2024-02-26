import { ReactChildren } from "@neopress/core";
import { FC } from "react";
import { ComponentPositions } from "./component-position.interface";

interface ComponentDefinitionBaseInterface {
    name: string;
    component: FC<any>;
    placement?: ComponentPositions;
}

export interface ComponentDefinitionMixedInterface extends ComponentDefinitionBaseInterface {
    name: string;
    component: FC<unknown>;
    placement?: ComponentPositions;
}

export interface ComponentDefinitionRootProvidersInterface extends ComponentDefinitionBaseInterface {
    component: FC<ReactChildren>;
    placement: "root.providers";
}

export type ComponentDefinitionInterface =
    ComponentDefinitionMixedInterface
    | ComponentDefinitionRootProvidersInterface;