# Initial steps

To use this repository for your own project:

1. Clone the repository
2. Set up Git:
   - Remove the original configuration: `rm -rf .git`
   - Re-initialize the repository: `git init`
   - If desired, configure your Git username and email:
     - `git config --local user.name "Example Name"`
     - `git config --local user.email abc@example.com`
   - If desired, set your remote:
     - `git remote add origin git@[HOST]:[GITHUB-ACCOUNT]/[PROJECT].git`
3. Edit the Deno Deploy configuration:
   - Replace the `project` value in `.github/workflows/deploy.yml` with your Deno Deploy project name
4. Edit the base URL in `config.ts`
5. Rename the root directory and `.vscode/deno-astro-template.code-workspace`

# Development

[Deno 2](https://deno.com/) is necessary.

Using [Visual Studio Code](https://code.visualstudio.com/) is optional, though this project is configured for it. If it is used, the
following extensions may be helpful:

- [Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Tailwind Fold](https://marketplace.visualstudio.com/items?itemName=stivo.tailwind-fold)

## Setup

Install packages:

```
deno install --allow-scripts=npm:sharp
```

Disable Astro telemetry:

```
deno task disable-telemetry
```

## Writing code

This project is set up for development with [Visual Studio Code](https://code.visualstudio.com/), and is configured to have the editor
format files each time they are saved.

Packages are managed with both `deno.json` and `package.json`. Deno will modify the correct file when packages are added with
`deno add some-package@x.x.x`.

`package.json` is used only for tracking npm packages.

To format all code, and to lint and typecheck all `*.ts` and `*.tsx` files, execute `deno task check-code`.

### Why are `deno.json` and `package.json` both used?

- The `deno.json` file exists so that Visual Studio Code will delegate the formatting of all files to Deno during its format-on-save
  process. Without it, some files, like `*.astro`, will be managed by a different formatter.
- The `package.json` file is used to manage npm dependencies since managing these with `deno.json` results in Vite errors during Astro's
  bundling process.

## Running the app

To serve a development version of the site:

```
deno task dev
```

To build and serve a production version of the site:

```
deno task build
deno task serve
```

## End-to-end testing

```shell
deno task build
deno task serve

# (in a separate shell)
deno task test-e2e
```

## Debugging

The code may be debugged with Visual Studio Code via the `.vscode/launch.json` configurations:

| Code to debug   | Prelaunch step  | Configuration to run |
| --------------- | --------------- | -------------------- |
| Client          | `deno task dev` | `Web app: client`    |
| Server          | n/a             | `Web app: server`    |
| Server & Client | n/a             | `Web app: all`       |

## Deployment to Deno Deploy

See `.github/workflows/deploy.yml`.

## Using JSR packages

Packages from [jsr.io](https://jsr.io/) may be used by manually adding them to `package.json` and then executing `deno install`.

For example, to add the `@std/html` package:

```JSON
// package.json
{
    "dependencies": {
        "@std/html": "npm:@jsr/std__html@1"
    }
}
```

After executing `deno install`, you will then be able to use the package as follows:

```TypeScript
import { escape } from '@std/html`;
```

All of this relies on the `@jsr` entry within `.npmrc`.

### Regarding names

In `package.json`, the property key may be anything you'd like (it is `@std/html` in the example above).

The property value (`npm:@jsr/std__html@1` above) is derived from the original package name of `@std/html` as follows:

1. The slash between the scope and the package name is replaced with two underscores: `__`
2. The `@` is replaced with `npm:@jsr/`
3. The regular semantic version tag is added at the end

### Type declarations

Visual Studio Code may not be able to resolve the type declarations for JSR packages in `.astro` files without modifications to
`tsconfig.json`.

As an example, the following will allow type declarations to be resolved for packages from the Deno standard library:

```JSON
// tsconfig.json
{
    "compilerOptions": {
        "paths": {
            "@std/*": ["node_modules/@std/*/mod.ts"]
        }
    }
}
```

### Further reading

For more information, see the [JSR documentation](https://jsr.io/docs/npm-compatibility#advanced-setup).
