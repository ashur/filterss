module.exports = [
	{
		name: "is",
		callback: (contents, pattern) =>
		{
			return contents === pattern;
		},
	},
	{
		name: "isNot",
		callback: (contents, pattern) =>
		{
			return contents !== pattern;
		},
	},

	{
		name: "startsWith",
		callback: (contents, pattern) =>
		{
			return contents.indexOf( pattern ) === 0;
		},
	},
	{
		name: "endsWith",
		callback: (contents, pattern) =>
		{
			return contents.substring( contents.length - pattern.length ) === pattern;
		},
	},
	{
		name: "contains",
		callback: (contents, pattern) =>
		{
			return contents.includes( pattern );
		},
	},
	{
		name: "doesNotContain",
		callback: (contents, pattern) =>
		{
			return !contents.includes( pattern );
		},
	},
];
