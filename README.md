


# remark-prefix-links

[**remark**](https://github.com/remarkjs/remark) plugin to prefix relative paths with a prefix.

## Installation

```
npm install @mgalbis/remark-prefix-links
```

## Usage

Say we have the following file `example.md`:

```markdown
[I'm an inline-style link](https://www.example.com)
[I'm an inline-style link with title](example.com "Example's Homepage")
[I'm a reference-style link][Arbitrary case-insensitive reference text]
![I'm a relative reference to an image](static/image.png)
[You can use numbers for reference-style link definitions][1]
Or leave it empty and use the [link text itself].

[arbitrary case-insensitive reference text]: static/link
[1]: static/link
[link text itself]: static/link
```

And our module `example.js` looks as follows:

```js
const fs = require('fs')
const html = require("remark-html")
const remark = require("remark")
const plugin = require("@mgalbis/remark-prefix-links")
remark()
    .use(plugin, { pathPrefix: "test" })
    .use(html)
    .process(fs.readFileSync('example.md'), (err, file) => {
        if (err) throw err
        console.log(String(file))
    })
```

Now running `node example.js` yields:

```html
<p>
  <a href="https://www.example.com">I'm an inline-style link</a>
  <a href="test/example.com" title="Example&#x27;s Homepage">I'm an inline-style link with title</a>
  <a href="test/static/link">I'm a reference-style link</a>
  <img src="test/static/image.png" alt="I'm a relative reference to an image">
  <a href="test/static/link">You can use numbers for reference-style link definitions</a>
  Or leave it empty and use the <a href="test/static/link">link text itself</a>.
</p>
```

## API
### `remark.use(plugin[, options])`
* `options.pathPrefix` (**required**) - the path prefix that will be prepended to the begging of links.


## Contributions
If you are interested in contributing to this project, please open an issue with a description of what you would like to add.

## License
[MIT](LICENSE) © [Maria Galbis](https://github.com/mgalbis)



[build-badge]: https://github.com/mgalbis/remark-prefix-links/workflows/main/badge.svg
[build]: https://github.com/mgalbis/remark-prefix-links/actions
[coverage-badge]: https://img.shields.io/codecov/c/github/mgalbis/remark-prefix-links.svg
[coverage]: https://codecov.io/github/mgalbis/remark-prefix-links