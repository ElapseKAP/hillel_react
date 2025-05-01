import { Fragment } from "react";

/**
 * Capitalize first letter of the word
 *
 * @param {string} word
 * @returns {string}
 */
function capitalizeWord( word ) {
	if ( ! word ) return word;

	return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Render value by field type
 *
 * @param {string} value
 * @param {string} field
 * @returns
 */
function renderField( value, field ) {
	if ( typeof value === 'object' && value !== null ) {
		const classAttr = ['nested-info'];
		classAttr.push( field );
		return <dl className={ classAttr.join( ' ' ) }>
			{
				Object.entries( value ).map( ( [ property, value ] ) => {
					return <Fragment key={property}>
						<dt>{ `${capitalizeWord(property )}:` }</dt>
						<dd>{ renderField( value ) }</dd>
					</Fragment>
				} )
			}
		</dl>
	}

	let renderedValue;
	switch (field) {
		case 'email':
			renderedValue = <a href={`mailto:${value}`} target="_blank" className={field} rel="noopener noreferrer">{value}</a>
			break;
		case 'website':
			renderedValue = <a href={`https://${value}`} target="_blank" className={field} rel="noopener noreferrer">{value}</a>
			break;
		case 'phone':
			renderedValue = <a href={`tel:${value}`} target="_blank" className={field} rel="noopener noreferrer">{value}</a>
			break;
		default:
			renderedValue = value;
			break;
	}

	return renderedValue;
}


/**
 * Added styles to console method to print service message
 *
 * @param {any} message
 * @param {string} type
 */
function printMessageConsole( message, type = 'log' ) {
	let styles = ['font-size: 20px'];
	const color = 'error' == type ? 'color: #F50022' : 'color: #32a852';
	styles.push(color);

	console[type]( `%c ${message}`, styles.join('; ') );
}

export { capitalizeWord, renderField, printMessageConsole }
