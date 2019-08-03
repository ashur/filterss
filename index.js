const filterss = require( './src/filterss' );
const operators = require( './src/operators' );
const transformers = require( './src/transformers' );

operators.forEach( operator =>
{
	filterss.operator( operator.name, operator.callback );
});

transformers.forEach( transformer =>
{
	filterss.transformer( transformer.name, transformer.callback );
});

module.exports = filterss;
