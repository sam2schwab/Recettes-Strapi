import gql from 'graphql-tag';

export default gql`
  query GroceryQuery {
    groceryList {
      ingredients {
        id
        quantity
        ingredient {
          name
        }
        unit {
          name
        }
      }
    }
  }
`;
