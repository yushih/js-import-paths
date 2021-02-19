Analyze the output of https://www.npmjs.com/package/madge and output all import paths from the root module to a target module. Help answering the question: why is the target module imported? 

## Usage

```
madge root.js > madge-output

node js-import-paths madge-output target.js
```

## Note

For flow-typed codebase, to ignore type-imports, put below `.madgerc` in the working dir:

```
{
	"detectiveOptions": {
		"es6": {
			"skipTypeImports": true
		}
	}
}

```
