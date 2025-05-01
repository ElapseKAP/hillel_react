import { Fragment } from "react";
import { capitalizeWord, renderField } from "../../utils/formatter";
import './UserItem.css';

function UserItem( { data, onChangeField, onBlurName } ) {
	const orderedField = [
		'email', 'phone', 'username', 'website', 'company', 'address'
	];

	return <details className="user-item">
		<summary>{ data.name }</summary>
		<div className="user-info">
			<div className="grouped-field">
				<div className="user-name">
					<label htmlFor={`userName-${data.id}`}>Name:</label>
					<input
						type="text"
						id={`userName-${data.id}`}
						name="name"
						value={data.name}
						onChange={ e => onChangeField( data.id, e.target.value, 'name' ) }
						onBlur={ e => onBlurName( data.id, e.target.value ) }
					/>
				</div>

				<div className="married-status">
					<label htmlFor={`marriedStatus-${data.id}`} aria-label="Married Status">Married:</label>
					<input
						type="checkbox"
						id={`marriedStatus-${data.id}`}
						name="married"
						value={data.married}
						checked={data.married}
						onChange={ e => onChangeField( data.id, e.target.checked, 'married' ) }
					/>
				</div>
			</div>

			<dl className="user-details">
				{
					orderedField.map( ( field , index ) => {
						return <Fragment key={index}>
							<dt>{ `${capitalizeWord(field)}:` }</dt>
							<dd>{ renderField(data[field], field) }</dd>
						</Fragment>
					} )
				}
			</dl>
		</div>
	</details>
}

export default UserItem;
