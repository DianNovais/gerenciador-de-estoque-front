import ProductForm from '../../components/productsForm/ProductForm';
import TitleContent from '../../components/titlePages/titlePages.style';
import * as C from './AddProducts.style';

const AddProducts = () => {

  return (
    <C.addProductsContainer>
      <TitleContent>Adicionar produtos</TitleContent>
      <ProductForm></ProductForm>
    </C.addProductsContainer>
  )
}

export default AddProducts