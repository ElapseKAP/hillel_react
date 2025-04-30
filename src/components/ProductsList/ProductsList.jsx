import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import UpdateProductForm from "../UpdateProductForm/UpdateProductForm";
import DeleteConfirmationPopup from "../DeleteConfirmationPopup/DeleteConfirmationPopup.jsx";
import {findProduct} from "../../utils/utils.jsx";


function ProductsList() {
	const [products, setProducts] = useState([] );
	const [product, setProduct] = useState(null );
	const [showUpdateForm, setShowUpdateForm] = useState(false );
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [deletedProduct, setDeletedProduct] = useState(null);

	function getProducts() {

		fetch( 'https://fakestoreapi.com/products' )
			.then( response => {
				if ( ! response.ok ) {
					throw new Error( `HTTP error, status: , ${response.status}` );
				}

				return response.json()
			} )
			.then( productList => setProducts( productList ) )
			.catch( error => {
				console.error( 'Something went wrong during getting products list: ', error );
			} );
	}

	function handleDeleteConfirmation( productId ) {

		fetch( 'https://fakestoreapi.com/products/' + productId, { method: 'delete' } )
			.then( response => {
				setShowDeleteConfirmation(false );
				setDeletedProduct(null);
				if ( ! response.ok ) {
					throw new Error( `HTTP error, status: , ${response.status}` );
				}

				getProducts();
			} )
			.catch( error => {
				console.error( 'Something went wrong during deleting the product: ', error );
			} );
	}

	function handleActionBtn( e, type, productId ) {
		if ( type === 'delete' ) {
			setShowDeleteConfirmation( true );
			setDeletedProduct( findProduct( productId, products ) );
		}

		if ( type === 'update' ) {
			setShowUpdateForm( true );
			setProduct( findProduct( productId, products ) );
		}
	}


	useEffect( function() {
		getProducts();
	}, [] );

	return products && <>
		{
			products.map( function( product ) {
				return <ProductCard key={ product.id } data={ product } onBtnClick={handleActionBtn} />
			} )
		}

		{
			showUpdateForm &&
			<UpdateProductForm
				item={ product }
				onCloseBtn={ setShowUpdateForm }
				onUpdateProduct={ getProducts }
				isVisible={ showUpdateForm }
			/>
		}

		{
			showDeleteConfirmation &&
			<DeleteConfirmationPopup
				product={deletedProduct}
				onDeleteConfirmation={handleDeleteConfirmation}
				onCloseBtn={setShowDeleteConfirmation}
				isVisible={showDeleteConfirmation}
			/>
		}
	</>
}

export default ProductsList;