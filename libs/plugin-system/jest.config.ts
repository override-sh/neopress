/* eslint-disable */
import type { Config } from "jest";

export default {
    displayName:          "plugin-system",
    preset:               "../../jest.preset.js",
    transform:            {
        "^.+\\.[tj]sx?$": [
            "@swc/jest",
            {
                jsc: {
                    parser: {
                        syntax: "typescript",
                        tsx:    true,
                    },
                    transform: { react: { runtime: "automatic" } },
                },
            },
        ],
    },
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
    ],
    coverageDirectory:    "../../coverage/libs/plugin-system",
    setupFiles:           [
        "./setup-test.ts",
    ],
    collectCoverage: true,
    coverageReporters: [
        "text",
        "html",
    ],
} as Config;
