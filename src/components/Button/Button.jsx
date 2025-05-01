import './Button.css';


function Button( { userId:id, onDeleteAction } ) {
	return <button className="btn btn-primary" onClick={() => ( onDeleteAction( id ) ) }>
		Delete user
	</button>
}

export default Button;
