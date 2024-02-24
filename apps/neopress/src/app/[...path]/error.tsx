"use client";

import PLUGIN_SYSTEM, { RouteEntryPoint } from "@neopress/plugin-system";

interface ErrorPageProps {
    error: Error & {
        digest?: string
    };
    reset: () => void;
}

export default function Error(props: ErrorPageProps) {
    const page = PLUGIN_SYSTEM.getRoute([ "" ], RouteEntryPoint.error);

    if (!page) {
        return (
            <div>
                <h2>Something went wrong!</h2>
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        props.reset
                    }
                >
                    Try again
                </button>
            </div>
        );
    }

    return <page.component { ...props } />;
}