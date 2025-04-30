import DropdownButton from '../DropdownButton/DropdownButton';
import { truncateText } from "../../utils/formatters.jsx";
import './ProductCard.scss';


function ProductCard( { data, onBtnClick } ) {

	return <div className="col-12 col-md-6 col-lg-3">
		<div className="card" data-product-id={ data.id }>
			<img src={ data.image } className="card-img-top" alt={ data.title } />
			<div className="card-body">
				<h5 className="card-title text-center">{ data.title }</h5>
				<p className="card-text">
					{ truncateText( data.description ) }
				</p>

				<DropdownButton onBtnClick={ onBtnClick } productId={ data.id } />
			</div>
		</div>
	</div>
}

export default ProductCard;