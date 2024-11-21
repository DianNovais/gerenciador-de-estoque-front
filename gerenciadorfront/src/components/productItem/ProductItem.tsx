import * as C from './ProductItem.style';

const ProductItem = () => {
  return (
    <C.productContainer>
        <C.ImageProduct src="/images/notimage.png"/>
        <C.priceProduct>
            0,50 R$
        </C.priceProduct>
    </C.productContainer>
  )
}

export default ProductItem