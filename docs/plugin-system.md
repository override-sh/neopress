# Plugin system

The ground of the whole NeoPress extensibility is its plugin system, freely inspired by the one seen in WordPress, but with many peculiarities.

### The storages

NeoPress plugin system is based on a series of `storages` (aka classes) with controlled access and registration capabilities.&#x20;

The storages are not by default extendable nor is the plugin system natively, this behaviour may be subject to change in future releases as extendability and developer experience are some of the main goals of NeoPress.

There are 5 native Storages each with its peculiarities.

#### The `plugin storage`

The `plugin storage` is the one responsible for the registration and state management of all the plugins loaded and booted into NeoPress.

#### The `component storage`

The `component storage` keeps track of all the extension components. Components may be used for a large variety of tasks:

* when their `placement` is defined, that is used as a reference to inject them into the defined position
* when no `placement` is defined, they can be referenced by other plugins or custom features to inject them into arbitrary application positions, much like an injected dependency

