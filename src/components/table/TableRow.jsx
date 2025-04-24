function TableRow( { data } ) {

	return data && <>
		<tr key={ data.id }>
			<th>{ data.category }</th>
			{
				data.animals.map( ( animal, index ) => {
					const styleProperties = { color: animal.color };

					return <td key={ index } style={ styleProperties }>
						{ animal.name }
					</td>
				} )
			}
		</tr>
	</>;
}

export default TableRow;
