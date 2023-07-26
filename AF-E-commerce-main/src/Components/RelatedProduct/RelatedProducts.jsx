import React from 'react'
import Products from '../../pages/Products/Products'
import useFetch from '../../Hooks/useState';

const RelatedProducts = ({ categoryId, productId }) => {
  const { products } = useFetch(
    `/api/products?populate=*&filters[id][$ne]=${productId}&filters[categories][id]=${categoryId}&pagination[start]=0&pagination[limit]=4`
);
// console.log(products);
  return (
    <div className='relatedProducts'>
      <Products headingText="Related Products" products={products} />
    </div>
  )
}

export default RelatedProducts
