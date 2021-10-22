import { useMutation, useQuery } from '@apollo/client';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Layout/Container';
import Title from '../components/Layout/Title';
import Subtitle from '../components/Layout/Subtitle';
import Badge from '../components/Layout/Badge';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import { PlusIcon } from '@heroicons/react/outline';
import RecipeQuery from '../queries/RecipeQuery';
import AddRecipeToGroceryListMutation from '../mutations/AddRecipeToGroceryListMutation';

export default memo(function Recette() {
  const { id } = useParams();
  const { data: { recipe } = {} } = useQuery(RecipeQuery, {
    variables: { id },
  });
  const [addToGroceryList] = useMutation(AddRecipeToGroceryListMutation, {
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
            <Button color="green" onClick={() => addToGroceryList()}>
              <PlusIcon className="h-5 w-5 mr-2" /> Ajouter a la liste
              d&apos;épicerie
            </Button>
          </div>
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
