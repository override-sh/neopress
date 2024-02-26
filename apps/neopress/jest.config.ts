/* eslint-disable */
import { Config } from "jest";

export default {
    displayName:              "neopress",
    preset:                   "../../jest.preset.js",
    transform:                {
        "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "@nx/react/plugins/jest",
        "^.+\\.[tj]sx?$":                      [
            "babel-jest",
            { presets: [ "@nx/next/babel" ] },
        ],
    },
    moduleFileExtensions:     [
        "ts",
        "tsx",
        "js",
        "jsx",
    ],
    coverageDirectory:        "../../coverage/apps/neopress",
    modulePathIgnorePatterns: [ "<rootDir>/e2e/" ],
    setupFiles:               [
        "./setup-test.ts",
    ],
    collectCoverage:          true,
    coverageReporters:        [
        "text",
        "html",
    ],
} as Config;
