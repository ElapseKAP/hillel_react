/**
 * Find product in products list by the product id
 *
 * @param productId number
 * @param products array
 *
 * @return object
 */
function findProduct(productId, products) {

    if ( products.length ) {
        return products.find( ( product => product.id === productId ) );
    }

    return {};
}

export { findProduct }