import './DropdownButton.scss';


function DropdownButton( { onBtnClick, productId } ) {
	return <div className="dropdown text-end">
		<button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
			Actions
		</button>

		<ul className="dropdown-menu">
			<li>
				<button className="dropdown-item action-delete"
					type="button"
					onClick={ ( e) => onBtnClick( e, 'delete', productId ) }
				>
					Delete
				</button>
			</li>
			<li>
				<button className="dropdown-item action-update"
					type="button"
					onClick={ ( e) => onBtnClick( e, 'update', productId ) }
				>
					Update
				</button>
			</li>
		</ul>
	</div>
}

export default DropdownButton;