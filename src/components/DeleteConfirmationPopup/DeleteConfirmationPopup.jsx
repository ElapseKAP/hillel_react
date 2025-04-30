function DeleteConfirmationPopup( { product, onDeleteConfirmation, onCloseBtn, isVisible = false } ) {
    const classAttr = ['modal', 'fade'];
    if ( isVisible ) {
        classAttr.push( 'show' );
    }

    if ( ! isVisible ) {
        return null;
    }

    return <div className={ classAttr.join( ' ' ) } id="deleteConfirmationModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden={ ! isVisible } style={ { display: isVisible ? 'block' : 'none' } }>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Product</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ () => onCloseBtn( false ) }></button>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete <br /><strong><em>{ product.title }</em></strong>?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={ () => onCloseBtn( false ) }>
                        Close
                    </button>
                    <button type="button" className="btn btn-primary" onClick={ () => onDeleteConfirmation( product.id ) }>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default DeleteConfirmationPopup;