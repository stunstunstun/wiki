
## package.json

#### 버전의 범위

## yarn commands

#### yarn install

Install or update in the local `node_modules` but the yarn.lock file will not be `updated` as well.

```
$ yarn install
```

Yarn will not install any package listed in devDependencies if the NODE_ENV environment variable is set to production. Use this flag to instruct Yarn to ignore NODE_ENV and take its production-or-not status from this flag instead.

```
$ yarn install --production
```

```
$ yarn install NODE_ENV=production
```

Don’t generate a yarn.lock lockfile and fail if an update is needed.

```
$ yarn install --frozen-lockfile
```

#### yarn add

In general, a package is simply a folder with code and a package.json file that describes the contents. When you want to use another package, you first need to add it to your dependencies. This means running `yarn add [package-name]` to install it into your project.

This will also update your `package.json` and your `yarn.lock` so that other developers working on the project will get the same dependencies as you when they run yarn or yarn install.

```
$ yarn add eslint-html-reporter@^0.5.2
```

#### yarn upgrade

This command updates dependencies to their latest version based on the version range specified in the package.json file. The yarn.lock file will be `recreated` as well.

```
$ yarn upgrade
```

recommend like this!

```
$ yarn upgrade mocha@^3.5.0
```



#### yarn remove

Running `yarn remove foo` will remove the package named foo from your direct dependencies updating your package.json and yarn.lock files in the process.

Other developers working on the project can run yarn install to sync their own node_modules directories with the updated set of dependencies.

When you remove a package, it is removed from all types of dependencies: dependencies, devDependencies, etc.

```
$ yarn remove foo
```

> yarn remove will always update your package.json and yarn.lock. This ensures that different developers on the same project get the same set of dependencies. It is not possible to disable this behavior.

#### yarn check

Verifies that versions of the package dependencies in the current project’s package.json matches that of yarn’s lock file.

```
$ yarn check
```

## 결론

- `package.json`을 직접 수정하는 대신 yarn command를 사용하는 하자.

## References

- https://www.vobour.com/book/view/Y5vcMHJGHyN5ayheM
- https://yarnpkg.com/en/docs/cli/install
- https://yarnpkg.com/en/docs/cli/add
- https://yarnpkg.com/lang/en/docs/cli/upgrade/
- https://yarnpkg.com/en/docs/cli/check