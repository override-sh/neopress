# Installing a plugin

Installing a plugin from a developer's point of view is pretty easy, just add it to the `PLUGIN_LIST` array located in the `apps/neopress/src` folder.

Let's see an example of installing the `MockPlugin`

{% code title="/apps/neopress/src/plugins.ts" lineNumbers="true" %}
```typescript
import {
    BasePlugin,
    PluginSystem,
} from "@neopress/plugin-system";
import { Constructor } from "type-fest";
import { MockPlugin } from "./plugins/mock-plugin";

export const PLUGIN_LIST: Constructor<BasePlugin, [PluginSystem]>[] = [
    MockPlugin,
];
```
{% endcode %}

The plugin list is automatically bootstrapped when required via the following call to the `bootstrap` method.

{% code title="/apps/neopress/src/app/layout.tsx" lineNumbers="true" %}
```typescript
import PLUGIN_SYSTEM, {
    bootstrap,
    // ... other imports
} from "@neopress/plugin-system";
import { PLUGIN_LIST } from "../plugins";
// ... various imports

bootstrap(PLUGIN_LIST);

// ... remaining code
```
{% endcode %}
