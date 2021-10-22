import gql from 'graphql-tag';

export default gql`
  query RecipeQuery($id: ID!) {
    recipe(id: $id) {
      title
      id
      servings
      ingredients {
        id
        ingredient {
          name
        }
        quantity
        state
        unit {
          name
        }
      }
      steps {
        id
        text
      }
      tags {
        id
        text
      }
    }
  }
`;
