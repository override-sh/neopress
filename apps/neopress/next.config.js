//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require("@nx/next");

/**
 * @type {import("@nx/next/plugins/with-nx").WithNxOptions}
 **/
const nextConfig = {
    nx:              {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    poweredByHeader: false,
    reactStrictMode: true,
    analyticsId:     process.env.NEXT_PUBLIC_ANALYTICS_ID,
    cleanDistDir:    true,
    generateEtags:   true,
    optimizeFonts:   true,
    swcMinify:       true,
    headers:         async () => {
        return [
            {
                source:  "/(.*)",
                headers: [
                    {
                        key:   "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key:   "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key:   "Access-Control-Allow-Origin",
                        value: "*",
                    },
                    {
                        key:   "Cross-Origin-Opener-Policy",
                        value: "same-origin",
                    },
                ],
            },
        ];
    },
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
