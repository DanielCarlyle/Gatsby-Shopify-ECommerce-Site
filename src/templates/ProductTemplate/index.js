/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import { graphql } from 'gatsby';
import {
  Layout,
  ImageGallery,
  ProductQuantityAdder,
  Button,
  SEO,
} from 'components';
import { Grid, SelectWrapper, Price } from './styles';
import CartContext from 'context/CartContext';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

//Page Query - Product Component template is used for the pages
export const query = graphql`
   query ProductQuery($shopifyId: String){
  shopifyProduct(shopifyId: {eq: $shopifyId }) {
    shopifyId
    title
    description
    images {
      id
      localFile {
        childImageSharp {
          fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
     }
    }
   }
`;

export default function ProductTemplate(props) {
   //Destructure the GetProducts from
   const { getProductById } = React.useContext(CartContext);
   const [product, setProduct] = React.useState(null);
   const [selectedVariant, setSelectedVariant] = React.useState(null);
   const { search, origin, pathname } = useLocation();
   //console.log(search, origin, pathname);
   const variantId = queryString.parse(search).variant;

   //Create a useEffect Hook
   React.useEffect(() => {
     getProductById(props.data.shopifyProduct.shopifyId).then(result => {
       setProduct(result);
       setSelectedVariant(
          result.variants.find(({ id }) => id === variantId) ||
       result.variants[0]
     );
     });
   }, [getProductById,
       setProduct,
       props.data.shopifyProduct.shopifyId,
       variantId,
     ]);

     const handleVariantChange = e => {
       const newVariant = product?.variants.find(v => v.id === e.target.value);
       setSelectedVariant(newVariant);
       navigate(
         `${origin}${pathname}?variant=${encodeURIComponent(newVariant.id)}`,
         {
           replace: true,
         }
       );
     };

    //console.log(props);
    return <Layout>
              <SEO
            description={props.data.shopifyProduct.description}
            title={props.data.shopifyProduct.title}
          />
          <Button onClick={() => navigate(-1)}>Back to products</Button>
           <Grid>
            <div>
            <h1>{props.data.shopifyProduct.title}</h1>
            <p>{props.data.shopifyProduct.description}</p>
            {product?.availableForSale && !!selectedVariant && (
            <>
            {product?.variants.length > 1 && (
            <SelectWrapper>
              <strong>Variant</strong>
              <select
                value={selectedVariant.id}
                onChange={handleVariantChange}
              >
                {product?.variants.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.title}
                  </option>
                ))}
              </select>
            </SelectWrapper>
          )}
            {!!selectedVariant && (
              <>
                    <Price>${selectedVariant.price}</Price>
                    <ProductQuantityAdder
                      available={selectedVariant.available}
                      variantId={selectedVariant.id}
                    />
                  </>
                )}
              </>
          )}
            </div>
            <div>
              <ImageGallery
                selectedVariantImageId={selectedVariant?.image.id}
                images={props.data.shopifyProduct.images}
              />
            </div>
            </Grid>
            </Layout>;
}
