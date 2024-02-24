import PLUGIN_SYSTEM, { RouteEntryPoint } from "@neopress/plugin-system";
import Link from "next/link";

export default function NotFound() {
    const page = PLUGIN_SYSTEM.getRoute([ "" ], RouteEntryPoint.not_found);

    if (!page) {
        return (
            <div>
                <h2>Not Found</h2>
                <p>Could not find requested resource</p>
                <Link href="/">Return Home</Link>
            </div>
        );
    }

    return <page.component />;
}