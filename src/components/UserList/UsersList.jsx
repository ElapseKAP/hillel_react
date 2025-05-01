import {useState, useEffect} from 'react';
import UserItem from '../UserItem/UserItem';
import { printMessageConsole } from '../../utils/formatter';


function UsersList() {
	const [users, setUsers] = useState(null);

	const API_URI = import.meta.env.VITE_API_URI;

	async function getUsers() {
		try {
			const response = await fetch( API_URI );

			if ( ! response.ok ) {
				throw new Error( `HTTP error, status: ${response.status}` );
			}
			const users = await response.json();
			setUsers(users);
		} catch (error) {
			printMessageConsole( `Error during user fetching ${error}`, 'error' );
		}
	}

	async function updateUserField( id, value, field ) {
		try {
			const fetchParams = {
				method: 'PUT',
				body: JSON.stringify( { [field]: value } ),
				headers: {'Content-Type': 'application/json'}
			};
			const response = await fetch(
				API_URI + `/${id}`,
				fetchParams
			);
			if ( ! response.ok ) {
				throw new Error( 'HTTP error, status: ' + response.status );
			}
		}
		catch(error) {
			printMessageConsole( `Error during user updating (field: ${field}): ${error}`, 'error' );
		}

	}

	const handleChangeField = ( userId, value, field ) => {
		setUsers( prevState =>
      prevState.map(user =>
        user.id === userId ? { ...user, [field]: value } : user
      )
    );

		if ( 'married' == field ) {
			updateUserField( userId, value, field );
		}
	}

	const handleNameBlur = ( userId, value ) => {
		setUsers( prevState =>
      prevState.map(user =>
        user.id === userId ? { ...user, name: value } : user
      )
    );

		updateUserField( userId, value, 'name' );
	}

	async function handleDeleteBtn( userId ) {

		try {
			const fetchParams = {
				method: 'delete',
				headers: {'Content-Type': 'application/json'}
			}
			const response = await fetch(
				API_URI + `/${userId}`,
				fetchParams
			);

			if ( ! response.ok ) {
				throw new Error( `HTTP error, status: ${response.status}` );
			}

			// Update Users after deleting user
			getUsers();
		}
		catch(error) {
			printMessageConsole( `Error during user deleting (user id: ${userId}): ${error}`, 'error' );
		}
	}


	useEffect( () => {
		getUsers();
	}, [] );


	return users ?
		users.map( userItem => <UserItem key={userItem.id} data={userItem} onChangeField={handleChangeField} onBlurName={handleNameBlur} onDeleteAction={handleDeleteBtn} /> )
		: <h2>Sorry, no Users found</h2>
}

export default UsersList;
