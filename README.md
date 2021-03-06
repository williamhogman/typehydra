# typehydra
typehydra is an unofficial client for
[ORY Hydra](https://github.com/ory/hydra)'s administrative endpoints. It is
_not_ an OAuth2 client, but is instead used to manage ORY Hydra's administrative
functions, like consent and login requests. typehydra aims to be an easier to
use alternative to the [autogenerated JS SDK](https://github.com/ory/hydra/tree/master/sdk/js/swagger).

## Installation
```bash
# Using Yarn
yarn add typehydra

# Using NPM
npm i typehydra
```
_Note: Typings are included with this package, no need to install
`@types/typehydra`!_

## Versioning
typehydra follows semantic versioning. With each update to support a new oryOS
version, if breaking changes are required, will constitute a major version bump.
If there are breaking changes to typehydra itself, regardless of oryOS version,
a major version bump will also occur.

Please refer to the table below for recommended typehydra versions for your
oryOS version:

| **`oryOS` version** | **`typehydra` min version** | **`typehydra` max version** |
|---------------------|-----------------------------|-----------------------------|
| oryOS.10            | 1.0.0-alpha.1               | latest                      |
| >oryOS.10           | _Not supported_             | _Not supported_             |

_Note: typehydra may be somewhat or completely compatible with other versions of
oryOS, but its is highly recommended to use the matching versions to avoid
unexpected issues._
