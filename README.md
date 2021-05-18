# Shared console components

Components that should be shared between our internal console and the open source console should live here.

We use [Vite](https://vitejs.dev/) as it allows to have a local dev setup to build the components (located inside `/lib`) and test them with a React app (located inside `/src`) running on the local server.

## Run it locally

Run `yarn dev` to start the local server, then you can edit the content of `/src` to help you test components locally before publishing them

## Build

Run `yarn build` to generate the `/dist` folder that will contain the bundled library and the Typescript type declarations.

## Publish

Make sure you are invited in the [`@tru_id`](https://www.npmjs.com/settings/tru_id/packages) npm org
Before publishing run `npm version [patch|minor|major]` to bump the version. Let's try to respect semver, if there is a breaking change we should bump the major `npm version major` otherwise `npm version patch` should be fine.
`npm publish` will publish the package to npm.

### TODO

Test how to npm link locally as there are some challenges with React packages:

https://mcocirio.medium.com/unsolving-the-mysteries-of-yarn-npm-link-for-libraries-development-41daa51a7cc6

https://blog.maximeheckel.com/posts/duplicate-dependencies-npm-link
