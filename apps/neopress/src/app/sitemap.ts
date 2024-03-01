import PLUGIN_SYSTEM, { bootstrap } from "@neopress/plugin-system";
import { MetadataRoute } from "next";
import { PLUGIN_LIST } from "../plugins";

bootstrap(PLUGIN_LIST);

/**
 * Generate a sitemap for the site
 * @returns {Promise<MetadataRoute.Sitemap>}
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return Object.values(PLUGIN_SYSTEM.getAllRoutes())
        // Filter out routes that are hidden from the sitemap
        .filter(definition => !(definition.hide_from_sitemap ?? false))
        .map(definition => ({
            ...definition.sitemap ?? {
                url: `${ process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000/" }${ definition.route }`,
                changeFrequency: "never",
                priority:        0.7,
            },
        }));
}