import {useEffect, useState} from "react";

function UpdateProductForm( { item, onCloseBtn, onUpdateProduct, isVisible = false } ) {
    const [title, setTitle] = useState( item.title );
    const [description, setDescription] = useState( item.description );
    const [category, setCategory] = useState( item.category );
    const [price, setPrice] = useState( item.price );


    function handleSubmitForm( event ) {
        event.preventDefault();

        const uri = 'https://fakestoreapi.com/products/' + item.id;
        const data = {
            id: item.id,
            title: title,
            description: description,
            category: category,
            price: price
        };

        const fetchParams = {
            method: 'put',
            body: JSON.stringify( data ),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch( uri, fetchParams )
            .then( response => {
                if ( ! response.ok ) {
                    throw new Error( `HTTP error, status: ${ response.status }` );
                }

                onUpdateProduct();
                onCloseBtn( false );
            } )
            .catch( error => console.error( 'Something went wrong during fetch data: ', error ) );
    }

    function handleCloseModal() {
        onCloseBtn( false );
    }

    useEffect( () => {
        setTitle( item.title );
        setDescription( item.description );
        setCategory( item.category );
        setPrice( item.price );
    }, [item] );

    let classAttr = [ 'modal', 'fade' ];
    if ( isVisible ) {
        classAttr.push( 'show' );
    }

    return item && <div className={ classAttr.join( ' ' ) } id="updateFormWrapper" aria-hidden={ ! isVisible } aria-labelledby="exampleModalToggleLabel" tabIndex="-1" style={ { display: isVisible ? 'block' : 'none' } }>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Update Product</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                </div>

                <div className="modal-body">
                    <form action="" id="updateProductForm" className="row" onSubmit={handleSubmitForm}>
                        <input type="hidden" name="id" value={ item.id } />
                        <div className="mb-3">
                            <label htmlFor="productTitle" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productTitle"
                                name="title"
                                value={ title }
                                onChange={ ( e) => setTitle( e.target.value ) } />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="productDescription" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="productDescription"
                                name="description"
                                value={ description }
                                rows="6"
                                onChange={ ( e) => setDescription( e.target.value ) }
                            ></textarea>
                        </div>

                        <div className="mb-3 col-6">
                            <label className="form-label" htmlFor="productCategory">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productCategory"
                                name="category"
                                value={ category }
                                onChange={ ( e) => setCategory( e.target.value ) }
                            />
                        </div>

                        <div className="mb-3 col-6">
                            <label className="form-label" htmlFor="productPrice">Price</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productPrice"
                                name="price"
                                value={ price }
                                onChange={ ( e) => setPrice( e.target.value ) }
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Update Product</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
}

export default UpdateProductForm;