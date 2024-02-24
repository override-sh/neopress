import PLUGIN_SYSTEM from "@neopress/plugin-system";
import { notFound } from "next/navigation";

export default function Page({ params }: {
    params: {
        path: string[]
    }
}) {
    const page = PLUGIN_SYSTEM.getRoute(params.path);

    if (!page) {
        notFound();
    }

    return <page.component />;
}

/**
 * Generate static paths for the page
 * @returns {Promise<{params: {path: string[]}}[]>}
 */
export async function generateStaticParams() {
    return Object.keys(PLUGIN_SYSTEM.getAllRoutes()).map(route => ({
        params: {
            path: route.split("/"),
        },
    }));
}