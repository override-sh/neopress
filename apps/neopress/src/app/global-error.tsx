"use client";

import PLUGIN_SYSTEM, {
    DynamicRouteParams,
    RouteEntryPoint,
} from "@neopress/plugin-system";

interface ErrorPageProps extends DynamicRouteParams {
    error: Error & {
        digest?: string
    };
    reset: () => void;
}

export default function GlobalError(props: ErrorPageProps) {
    const page = PLUGIN_SYSTEM.getRoute([ "" ], RouteEntryPoint.global_error);

    if (!page) {
        return (
            <html>
            <body>
                <h2>Something went wrong!</h2>
                <button onClick={ props.reset }>Try again</button>
            </body>
            </html>
        );
    }

    return <page.component { ...props } params={ { path: [ "" ] } } />;
}