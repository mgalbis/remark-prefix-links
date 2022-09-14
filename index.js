const visit = require("unist-util-visit");

module.exports = (options) => {
  function visitor(node) {
    // console.log(JSON.stringify(node));
    try {
      // eslint-disable-next-line no-new
      new URL(node.url);
      return;
    } catch (e) {
      // eslint-disable-next-line no-empty
    }

    const relativeUrl = node.url.replace(/^\//, "");
    if (relativeUrl.startsWith("#")) {
      return;
    }
    try {
      node.url = new URL(relativeUrl, options.pathPrefix);
    } catch (e) {
      node.url = `${options.pathPrefix}/${relativeUrl}`;
    }
  }

  function transform(tree) {
    if (options && options.pathPrefix) {
      visit(tree, ["image", "link", "definition"], visitor);
    } else {
      throw Error("Missing required `pathPrefix` option.");
    }
  }

  return transform;
};
