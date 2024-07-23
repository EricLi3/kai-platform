import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import _import from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/node_modules", "**/out", "**/.next"],
}, ...fixupConfigRules(compat.extends(
    "next/core-web-vitals",
    "next",
    "airbnb",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "prettier",
    "next/core-web-vitals",
)), {
    plugins: {
        import: fixupPluginRules(_import),
        prettier: fixupPluginRules(prettier),
        "simple-import-sort": simpleImportSort,
    },

    rules: {
        "prettier/prettier": ["error", {
            singleQuote: true,
            parser: "flow",
            endOfLine: "auto",
        }],

        "react/react-in-jsx-scope": "off",
        "react/display-name": "off",
        "react-hooks/exhaustive-deps": "off",
        "react/jsx-props-no-spreading": [0],
        "react/no-array-index-key": "off",
        "react/prop-types": [0],
        "import/no-unresolved": [0],
        "no-restricted-exports": "off",
        "no-unused-vars": "warn",
        "import/extensions": "off",
        "import/no-mutable-exports": "off",
        "import/prefer-default-export": "off",

        "no-param-reassign": ["error", {
            props: false,
        }],

        quotes: ["error", "single", {
            allowTemplateLiterals: false,
        }],

        camelcase: "off",

        "react/function-component-definition": [2, {
            namedComponents: ["arrow-function", "function-declaration"],
        }],

        "sort-imports": ["error", {
            ignoreCase: true,
            allowSeparatedGroups: true,
            ignoreDeclarationSort: true,
        }],

        "import/order": [1, {
            groups: [
                "builtin",
                "external",
                "internal",
                "parent",
                "sibling",
                "object",
                "type",
                "index",
            ],

            pathGroups: [{
                pattern: "react",
                group: "builtin",
            }, {
                pattern: "react-dom",
                group: "builtin",
            }, {
                pattern: "next/**",
                group: "external",
            }, {
                pattern: "@/components/**",
                group: "internal",
            }, {
                pattern: "@/templates/**",
                group: "internal",
            }, {
                pattern: "@/layouts/**",
                group: "internal",
            }, {
                pattern: "common",
                group: "internal",
            }, {
                pattern: "@/routes/**",
                group: "internal",
            }, {
                pattern: "@/hooks/**",
                group: "internal",
                position: "before",
            }, {
                pattern: "@/assets/**",
                group: "internal",
                position: "after",
            }, {
                pattern: "@/constants/**",
                group: "internal",
                position: "after",
            }, {
                pattern: "@/styles/**",
                group: "index",
                position: "after",
            }],

            pathGroupsExcludedImportTypes: ["internal"],

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },

            "newlines-between": "always-and-inside-groups",
        }],
    },
}];