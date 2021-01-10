const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};

//We use Gatsby-node to generate pages
//Because it is node, we have to resolve, we can't just use an import
//graphql Object allows us to query our data through graphql
//actions Object uses redux

exports.createPages = async ({graphql, actions}) => {

  const {createPage} = actions;

  //data Objext has access to all the Shopify data
  const {data} = await graphql(`
    {
      allShopifyProduct {
       edges {
         node {
           shopifyId
           handle
         }
       }
     }
   }
  `);

data.allShopifyProduct.edges.forEach(({node}) => {
  createPage({
    path: `products/${node.handle}`,
    context: {
      //Gatsby will inject the context into the props of the ProductTemplate Component
      shopifyId: node.shopifyId,
    },
    component: path.resolve('./src/templates/ProductTemplate/index.js')
  });
});
};
