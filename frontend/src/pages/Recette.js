import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Layout/Container';
import Title from '../components/Layout/Title';
import Subtitle from '../components/Layout/Subtitle';

const RECIPE_QUERY = gql`
  query ($id: ID!) {
    recipe(id: $id) {
      title
      id
      ingredients {
        id
        ingredient {
          name
        }
        quantity
        state
        unit
      }
      steps {
        id
        text
      }
    }
  }
`;

export default memo(function Recette() {
  const { id } = useParams();
  const { data: { recipe } = {} } = useQuery(RECIPE_QUERY, {
    variables: { id },
  });
  return (
    <Container>
      {recipe && (
        <>
          <Title>{recipe.title}</Title>
          <div className="mb-4">
            <Subtitle>Ingrédients</Subtitle>
            {recipe.ingredients.map(
              ({ ingredient, id, quantity, unit, state }) => (
                <div key={id}>
                  {quantity} {unit} {ingredient.name} {state}
                </div>
              )
            )}
          </div>
          <Subtitle>Étapes</Subtitle>
          {recipe.steps.map(({ id, text }, index) => (
            <div className="mb-2" key={id}>
              <span className="font-bold">Étape #{index + 1} : </span>
              {text}
            </div>
          ))}
        </>
      )}
    </Container>
  );
});
