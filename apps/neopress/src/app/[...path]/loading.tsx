import PLUGIN_SYSTEM, { RouteEntryPoint } from "@neopress/plugin-system";

export default function Loading() {
    const page = PLUGIN_SYSTEM.getRoute([ "" ], RouteEntryPoint.loading);

    if (!page) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    }

    return <page.component />;
}