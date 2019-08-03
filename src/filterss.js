const convert = require( 'xml-js' );

let operators = {};
let transformers = {};

function matchElement( element, rule )
{
	let didMatch;

	// ex., "webmaster@example.com"
	let contents = element._cdata ?
		element._cdata :
		element._text;

	// ex., "webmaster"
	let pattern = rule.pattern;


	/* Transformers */
	let operands = {
		contents: contents,
		pattern: pattern,
	};

	for( let t in transformers )
	{
		if( rule[t] )
		{
			transformers[t]( operands );
		}
	}


	/* Operators */
	if( operators[rule.operator] )
	{
		didMatch = operators[rule.operator]( operands.contents, operands.pattern );
	}
	else
	{
		didMatch = false;
	}

	return didMatch;
}

function atom( data, rules, match )
{
	let entries = data.feed.entry.filter( entry =>
	{
		return rules.reduce( (acc, rule) =>
		{
			// ex., "title" or "author.name"
			let elementTree = rule.element.split( '.' );
			let element = entry;

			while( elementTree.length > 0 )
			{
				let elementName = elementTree.shift();
				element = element[elementName];
				if( !element )
				{
					return false;
				}
			}

			let didMatch = matchElement( element, rule );

			if( match === 'any' )
			{
				return acc || didMatch;
			}
			else
			{
				return acc && didMatch;
			}

		}, match === "all" );
	});

	data.feed.entry = entries;

	return data;
}

function rss( data, rules, match )
{
	let items = data.rss.channel.item.filter( item =>
	{
		return rules.reduce( (acc, rule) =>
		{
			let didMatch;

			// ex., "author"
			let element = item[rule.element];
			if( !element )
			{
				return false;
			}

			didMatch = matchElement( element, rule );

			if( match === 'any' )
			{
				return acc || didMatch;
			}
			else
			{
				return acc && didMatch;
			}

		}, match === "all" );
	});

	data.rss.channel.item = items;

	return data;
}

module.exports.operator = (name, callback) =>
{
	operators[name] = callback;
};

module.exports.transformer = (name, callback) =>
{
	transformers[name] = callback;
};

module.exports.filter = (xml, rules=[], match="all") =>
{
	let data = convert.xml2js( xml, { compact: true } );
	let filtered;

	if( data.rss )
	{
		filtered = rss( data, rules, match );
	}
	if( data.feed )
	{
		filtered = atom( data, rules, match );
	}

	return convert.js2xml( filtered, { compact: true, spaces: 4 } );
};
