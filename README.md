


# remark-prefix-links

[**remark**](https://github.com/remarkjs/remark) plugin to prefix relative paths with a prefix.

## Installation

```
npm install @mgalbis/remark-prefix-links
```

## Usage

### Source
```js
const html = require("remark-html")
const remark = require("remark")
const plugin = require("@mgalbis/remark-prefix-links")
remark()
  .use(plugin, { pathPrefix: "test" })
  .use(html)
  .process("![Image](static/image.png)", (err, file) => {
    if (err) throw err
    console.log(String(file))
  })
```

### Yields
```html
<p><img src="test/static/image.png" alt="Image"></p>
```

## API
### `remark.use(plugin[, options])`
* `options.pathPrefix` (**required**) - the path prefix that will be prepended to the begging of links.


## Contributions
If you are interested in contributing to this project, please open an issue with a description of what you would like to add.

## License
[MIT](LICENSE) © [Maria Galbis](https://github.com/mgalbis)