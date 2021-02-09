# setup-yq
[![LICENSE](https://img.shields.io/github/license/md-actions/setup-yq)](https://github.com/md-actions/setup-yq/blob/main/LICENSE)
This action sets up the yq tool. It downloads yq binaries from https://github.com/mikefarah/yq/releases and adds path to PATH

   
# Usage
## Set up default yq version (v4.4.1)
```yaml
- uses: md-actions/setup-yq@v1.0.0
```
## Set up specific yq version
```yaml
- uses: md-actions/setup-yq@v1.0.0
  with:
    version: 4.5.0
```
