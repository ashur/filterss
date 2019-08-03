module.exports = [
	{
		name: "ignoreCase",
		callback: operands =>
		{
			operands.contents = operands.contents.toLowerCase();
			operands.pattern = operands.pattern.toLowerCase();
		},
	},
	{
		name: "trim",
		callback: operands =>
		{
			operands.contents = operands.contents.trim();
		},
	},
];
