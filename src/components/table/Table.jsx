import TableRow from "./TableRow";
import './table-style.css';

function Table( { title, data } ) {
	return data && <table>
		{ title && <caption>{ title }</caption> }

		<tbody>
			{ data.map( ( row, rowNum ) => <TableRow data={ row } key={ row.id } /> ) }
		</tbody>
	</table>
}

export default Table;
