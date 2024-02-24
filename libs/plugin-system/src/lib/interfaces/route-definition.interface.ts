import { FC } from "react";

export interface RouteDefinitionInterface {
    route: string;
    component: FC<unknown>;
}