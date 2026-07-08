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
3. Edit the base URL in `config.ts`
4. Rename the root directory and `.vscode/deno-astro-template.code-workspace`

# Development Instructions

For helpful Visual Studio Code extensions, see `.vscode/extensions.json`.

## Setup

Install packages:

```shell
deno install --frozen
```

Disable Astro telemetry:

```shell
deno task disable-telemetry
```

## Running the app

To serve a development version of the site:

```shell
deno task dev
```

To build and serve a production version of the site:

```shell
deno task build
deno task serve
```

To access your local site from other devices:

```shell
# Edit the port as necessary (4321)
ssh -R 80:localhost:4321 ssh.localhost.run
```

## End-to-end testing

```shell
deno task build
deno task serve

# (in a separate shell)
deno task test-e2e
```

## Writing code

This project is set up for development with [Visual Studio Code](https://code.visualstudio.com/), and is configured to have the editor
format files each time they are saved.

Packages are managed with both `deno.json` and `package.json`. Deno will modify the correct file when packages are added with
`deno add some-package@x.x.x`.

`package.json` is used only for tracking npm packages.

To format all code, and to lint and typecheck all `*.astro`, `*.ts` and `*.tsx` files, execute `deno task check-code`.

### Why are `deno.json` and `package.json` both used?

- The `deno.json` file exists so that Visual Studio Code will delegate the formatting of all files to Deno during its format-on-save
  process. Without it, some files, like `*.astro`, will be managed by a different formatter.
- The `package.json` file is used to manage npm dependencies, as managing these with `deno.json` results in Vite errors during Astro's
  bundling process.

## Debugging

The code may be debugged with Visual Studio Code via the `.vscode/launch.json` configurations:

| Code to debug    | Prelaunch step    | Configuration to run |
| ---------------- | ----------------- | -------------------- |
| Client           | `deno task dev`   | `Web app: client`    |
| Server           | n/a               | `Web app: server`    |
| Server & Client  | n/a               | `Web app: all`       |
| End-to-end tests | `deno task serve` | `e2e tests`          |

## Deployment to Deno Deploy

See `.github/workflows/deploy.yml`.

## Using JSR packages

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
