# Folder structure

NeoPress is based on Nx and as such it is a monorepo project. There are two main folders in the NeoPress codebase `apps` and `libs`.

### The `apps` folder

The `apps` folder contains all the applications related to the structure of the project. NeoPress is shipped as an isolated and extendable application based on the Next.js framework.

Most of the time you won't need to edit any of the files in the base application as they are designed to be as extendable and flexible as possible.

### The `libs` folder

The `libs` folder is where all the native NeoPress plugins reside. While developers are free to ship their plugins under any namespace they want, in isolated or mono repos, native NeoPress plugins will always be created inside this folder.

Each and all of the native plugins will be named `plugin-[...]` to allow for easier and faster retrieval of the context and relations it has.

Non-plugin libraries be included into this folder too but won't follow the aforementioned naming convention (like the `core` library).
