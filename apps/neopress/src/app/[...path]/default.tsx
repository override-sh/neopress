import PLUGIN_SYSTEM, {
    DynamicRouteParams,
    RouteEntryPoint,
} from "@neopress/plugin-system";
import { notFound } from "next/navigation";

export default function Default(props: DynamicRouteParams) {
    const page = PLUGIN_SYSTEM.getRoute(props.params.path, RouteEntryPoint.default);

    if (!page) {
        notFound();
    }

    return <page.component { ...props } />;
}