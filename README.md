# Template for an Astro site running on Deno

## Development

### Dependencies

#### Required

- [Deno](https://deno.land/)
- [pnpm](https://pnpm.io/)

#### Optional

Visual Studio Code extensions:

- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- [Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Tailwind Fold](https://marketplace.visualstudio.com/items?itemName=stivo.tailwind-fold)

### Configuration

Opt-out of Astro data collection:

```
npx astro telemetry disable
```

## Writing code

This project is set up for development with [Visual Studio Code](https://code.visualstudio.com/), and is configured to have the editor
format files each time they are saved.

| task              | description                                        |
| ----------------- | -------------------------------------------------- |
| `deno task check` | linting, formatting, and type-checking             |
| `deno task dev`   | serve a development version of the website locally |
| `deno task prod`  | serve a production version of the website locally  |

### Committing to `master`

Commit messages should follow the following pattern:

```
type(scope): details

more details (optional)
```

Where `type` is one of:

- `change`
- `chore`
- `docs`
- `build`
- `feat`
- `fix`
- `refactor`
- `style`

## Deployment

This project is deployed to [Deno Deploy](https://deno.com/deploy) via [Github Actions](https://docs.github.com/en/actions). The deployment
is configured by `.github/workflows/deploy.yml`.

Deployments are triggered by pushed commits on the `master` and `dev` branches. The `master` branch is deployed to production.

... test ...
