const test = require("tape");
const remark = require("remark");
const html = require("remark-html");
const plugin = require(".");

test("remark-prefix-links", async (t) => {
  t.plan(6);

  const image = "![Image](static/image.png)";
  const link = "[Link](static/link)";
  const reference =
    "[I'm an inline-style link](https://www.example.com)\n" +
    "[I'm an inline-style link with title](example.com \"Example's Homepage\")\n" +
    "[I'm a reference-style link][Arbitrary case-insensitive reference text]\n" +
    "[I'm a relative reference to a repository file](static/link)\n" +
    "[You can use numbers for reference-style link definitions][1]\n" +
    "Or leave it empty and use the [link text itself].\n" +
    "\n" +
    "[arbitrary case-insensitive reference text]: static/link\n" +
    "[1]: static/link\n" +
    "[link text itself]: static/link";

  remark()
    .use(plugin, { pathPrefix: "test" })
    .use(html)
    .process(image, (err, file) => {
      const expectedYield =
        '<p><img src="test/static/image.png" alt="Image"></p>\n';
      t.equal(String(file), expectedYield);
    });

  remark()
    .use(plugin, { pathPrefix: "test" })
    .use(html)
    .process(link, (err, file) => {
      const expectedYield = '<p><a href="test/static/link">Link</a></p>\n';
      t.equal(String(file), expectedYield);
    });

  remark()
    .use(plugin, { pathPrefix: "test" })
    .use(html)
    .process(reference, (err, file) => {
      const expectedYield =
        '<p><a href="https://www.example.com">I\'m an inline-style link</a>\n' +
        '<a href="test/example.com" title="Example&#x27;s Homepage">I\'m an inline-style link with title</a>\n' +
        '<a href="test/static/link">I\'m a reference-style link</a>\n' +
        '<a href="test/static/link">I\'m a relative reference to a repository file</a>\n' +
        '<a href="test/static/link">You can use numbers for reference-style link definitions</a>\n' +
        'Or leave it empty and use the <a href="test/static/link">link text itself</a>.</p>\n';
      t.equal(String(file), expectedYield);
    });

  remark()
    .use(plugin, { pathPrefix: "test" })
    .use(html)
    .process("![Image](http://example.com/static/image.png)", (err, file) => {
      const expectedYield =
        '<p><img src="http://example.com/static/image.png" alt="Image"></p>\n';
      t.equal(String(file), expectedYield);
    });

  remark()
    .use(plugin, { pathPrefix: "test" })
    .use(html)
    .process("[Link](/static/link)", (err, file) => {
      const expectedYield = '<p><a href="test/static/link">Link</a></p>\n';
      t.equal(String(file), expectedYield);
    });

  try {
    await remark().use(plugin).use(html).process(image);
  } catch (err) {
    const expectedYield = "Missing required `pathPrefix` option.";
    t.equal(err.message, expectedYield);
  }

  t.end();
});
