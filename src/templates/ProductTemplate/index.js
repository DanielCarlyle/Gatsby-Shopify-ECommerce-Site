import React from 'react';
import { graphql } from 'gatsby';
import {Layout, ImageGallery} from 'components';
import {Grid} from './styles';

//Page Query - Product Component template is used for the pages
export const query = graphql`
   query ProductQuery($shopifyId: String){
  shopifyProduct(shopifyId: {eq: $shopifyId }) {
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
    //console.log(props);
    return <Layout>
           <Grid>
            <div>
            <h1>{props.data.shopifyProduct.title}</h1>
            <p>{props.data.shopifyProduct.description}</p>
            </div>
            <div>
            <ImageGallery images={props.data.shopifyProduct.images} />
            </div>
            </Grid>
            </Layout>;
}
