# html-selector

## Install
---

You can get it on npm.

<pre>$ npm install @guillaumeferber/html-selector --save</pre>

## Usage
---

### Standalone

#### JavaScript

Add the script tag before the closing `<body>` tag

<pre>
&lt;script src=&quot;node_modules/@guillaumeferber/html-selector/html-selector.min.js&quot;&gt;&lt;/script&gt;
</pre>

#### CSS/SCSS

1) Add the link CSS tag in `<head>`
<pre>
&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;node_modules/@guillaumeferber/html-selector/css/html-selector.min.css&quot;&gt;&lt;/script&gt;
</pre>

2) or you can import the Sass file to your Sass project

<pre>
@import "node_modules/@guillaumeferber/html-selector/scss/html-selector.default";
</pre>

#### HTML Usage

Just add the `js-select` class name to the select element you want to customize.

```
<select class="js-select">
	<option>Select</option>
	<option value="value_1">option #1</option>
	<option value="value_2">option #2</option>
	<option value="value_3">option #3</option>
</select>
```


## License
Apache 2.0 License &copy; Guillaume Ferber
