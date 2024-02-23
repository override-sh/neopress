import { ComponentPositions } from "./component-position.interface";
import { FC } from "react";

export interface ComponentDefinitionInterface {
    name: string;
    component: FC<unknown>;
    placement?: ComponentPositions;
}