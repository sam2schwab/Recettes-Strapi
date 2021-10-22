import gql from 'graphql-tag';

export default gql`
  mutation AddRecipeToGroceryListMutation($id: ID!) {
    addRecipeToGroceryList(recipeId: $id) {
      success
    }
  }
`;
