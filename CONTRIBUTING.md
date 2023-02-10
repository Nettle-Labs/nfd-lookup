# Contributing guide

#### Table of contents

- [Commit messages](#commit-messages)
- [Pull requests](#pull-requests)
- [Pre-releases](#pre-releases)
  - [Working on a future release](#working-on-a-future-release)
  - [Releasing a bug fix on the default distribution channel](#releasing-a-bug-fix-on-the-default-distribution-channel)
  - [Publishing beta release to the default distribution channel](#publishing-beta-release-to-the-default-distribution-channel)
  - [Working on a new future release](#working-on-a-new-future-release)

## Commit messages

Commit messages lean heavily towards the convention set out by [conventional commits](https://www.conventionalcommits.org).

Each commit message must be in the format that includes a **type**, an optional **scope** and a **subject**:
```
type(scope?): subject  #scope is optional
```

Limit the whole message to 72 characters or less!

Example:

```
build(npm): add react package
```

### Type

Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: npm)
* **chore**: Changes that don't really fall under any other type
* **ci**: Changes to the CI configuration files and scripts
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **revert**: Revert a previous commit
* **task**: Similar to a chore, a small and general change that can be used to cover multiple types
* **test**: Adding missing tests or correcting existing tests

### Scope

A scope may be provided to a commit’s type, to provide additional contextual information and is contained within a parenthesis

### Subject

The subject contains a succinct description of the change:

* use the present tense ("Add feature" not "Added feature")
* use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* don't capitalise the first letter
* don't use a fullstop (.) at the end. <- Not this

<sup>[Back to top ^](#table-of-contents)</sup>

## Pull requests

1. Create a branch from the `main` branch and use the convention: `<feat|fix|task>/name-of-issue`.
2. Once the code is ready to be merged into `main`, open a pull request.
> ⚠️**NOTE:** The title must conform to the conventional commit message format outlined above. This is to ensure the merge commit to the main branch is picked up by the CI and creates an entry in the [CHANGELOG.md](./CHANGELOG.md).
3. To merge the PR, use the "Squash and merge" option. This is to keep the commit history clean and keep the commits on `main` with a 1:1 ratio with previous PRs.

<sup>[Back to top ^](#table-of-contents)</sup>

## Pre-releases

### Working on a future release

We now decide to work on a future major release, which will be composed of multiple features, some of them being breaking changes. We want to publish our package for each new feature developed for test purpose, however we do not want to increment our package version or make it available until all the features are developed and tested.

To implement that workflow we can commit our first feature to the `beta` branch. When pushing that commit, **semantic-release** will publish the pre-release version `2.0.0-beta.1` on the dist-tag `@beta`. That allow us to install our module with `yarn add @Nettle-Labs/nfd-lookup@beta`. Others installing with `yarn add @Nettle-Labs/nfd-lookup` will still receive the version `1.0.0`.

The Git history of the repository is now:

```
* feat: initial commit # => v1.0.0 on @latest
| \
|  * feat: first feature \n\n BREAKING CHANGE: it breaks something # => v2.0.0-beta.1 on @beta
```

We can continue to work on our future release by committing and pushing other features or bug fixes on the `beta` branch. With each push, **semantic-release** will publish a new pre-release on the dist-tag `@beta`.

With another feature, the Git history of the repository is now:

```
* feat: initial commit # => v1.0.0 on @latest
| \
|  * feat: first feature \n\n BREAKING CHANGE: it breaks something # => v2.0.0-beta.1 on @beta
|  * feat: second feature # => v2.0.0-beta.2 on @beta
```

<sup>[Back to top ^](#table-of-contents)</sup>

## Releasing a bug fix on the default distribution channel

In the meantime we can also continue to commit changes and release updates to `1.0.0`.

For example, we can commit a bug fix with the message `fix: a fix` to `main`. When pushing that commit, **semantic-release** will release the version `1.0.1` on the dist-tag `@latest`.

The Git history of the repository is now:

```
* feat: initial commit # => v1.0.0 on @latest
| \
|  * feat: first feature \n\n BREAKING CHANGE: it breaks something # => v2.0.0-beta.1 on @beta
|  * feat: second feature # => v2.0.0-beta.2 on @beta
| fix: a fix # => v1.0.1 on @latest
```

<sup>[Back to top ^](#table-of-contents)</sup>

## Publishing beta release to the default distribution channel

Once we've developed and pushed all the features & fixes we want to include in the future version `2.0.0` in the `beta` branch, we can release it to the default distribution channel, or `@latest`.

1. First, merge into `beta` any bug fixes:
```shell
git merge origin/main --ff-only
```

2. Next, checkout the `main` branch and pull the latest:
```shell
git checkout main
git pull
```
3. Now, we want the `main` branch to mirror the commit history of `beta`, so we want to use Git's fast-forward option; so we use:
```shell
git merge origin/beta --ff-only
```
> ⚠️**NOTE:** As `beta` and `main` branches may have diverged, this merge might require to resolve conflicts.

Once beta branch has been rebased on to `main`, **semantic-release** will release the version `2.0.0` on the dist-tag `@latest`.

The Git history of the repository is now:

```
* feat: initial commit # => v1.0.0 on @latest
| \
|  * feat: first feature \n\n BREAKING CHANGE: it breaks something # => v2.0.0-beta.1 on @beta
|  * feat: second feature # => v2.0.0-beta.2 on @beta
| fix: a fix # => v1.0.1 on @latest
| /
| Merge branch beta into main # => v2.0.0 on @latest
```

<sup>[Back to top ^](#table-of-contents)</sup>

## Working on a new future release

We can now start to work on a new future major release, version `3.0.0`, on the `@beta` distribution channel.

To do so we first need to update the `beta` branch with all the changes from `main` (the commits `fix: a fix`). As `beta` and `main` branches have diverged, this merge might require to resolve conflicts.

We can now commit our new feature on `beta`. When pushing that commit, **semantic-release** will publish the pre-release version `3.0.0-beta.1` on the dist-tag `@beta`. That allow us to run integration tests by installing our module with `npm install example-module@beta`. Other users installing with `npm install example-module` will still receive the version `3.0.0`.

The Git history of the repository is now:

```
* feat: initial commit # => v1.0.0 on @latest
| \
|  * feat: first feature \n\n BREAKING CHANGE: it breaks something # => v2.0.0-beta.1 on @beta
|  * feat: second feature # => v2.0.0-beta.2 on @beta
| fix: a fix # => v1.0.1 on @latest
| /
| Merge branch beta into main # => v2.0.0 on @latest
| \
|  | Merge branch main into beta
|  | feat: new feature \n\n BREAKING CHANGE: it breaks another thing # => v3.0.0-beta.1 on @beta
```

<sup>[Back to top ^](#table-of-contents)</sup>
