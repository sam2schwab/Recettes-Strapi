import gql from 'graphql-tag';

export default gql`
  query RecipesQuery {
    recipes {
      title
      id
      steps {
        text
      }
      ingredients {
        ingredient {
          name
        }
      }
    }
  }
`;
