import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Layout/Container';
import Title from '../components/Layout/Title';
import Subtitle from '../components/Layout/Subtitle';
import Badge from '../components/Layout/Badge';
import BackButton from '../components/BackButton';

const RECIPE_QUERY = gql`
  query ($id: ID!) {
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

export default memo(function Recette() {
  const { id } = useParams();
  const { data: { recipe } = {} } = useQuery(RECIPE_QUERY, {
    variables: { id },
  });
  return (
    <Container>
      {recipe && (
        <>
          <Title>
            <BackButton />
            {recipe.title}
          </Title>
          <div className="pb-2">
            {recipe.tags.map(({ id, text }) => (
              <Badge key={id}>{text}</Badge>
            ))}
          </div>
          <div className="pb-2">{recipe.servings} portions</div>
          <div className="pb-4">
            <Subtitle>Ingrédients</Subtitle>
            {recipe.ingredients.map(
              ({ ingredient, id, quantity, unit, state }) => (
                <div key={id}>
                  {quantity || ''} {unit?.name} {ingredient.name} {state}
                </div>
              )
            )}
          </div>
          <div className="pb-4">
            <Subtitle>Étapes</Subtitle>
            {recipe.steps.map(({ id, text }, index) => (
              <div className="mb-2" key={id}>
                <span className="font-bold">Étape #{index + 1} : </span>
                {text}
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  );
});
