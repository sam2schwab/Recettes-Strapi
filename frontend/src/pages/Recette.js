import { useMutation, useQuery } from '@apollo/client';
import { memo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Layout/Container';
import Title from '../components/Layout/Title';
import Subtitle from '../components/Layout/Subtitle';
import Badge from '../components/Layout/Badge';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import { CheckIcon, PlusIcon } from '@heroicons/react/outline';
import RecipeQuery from '../queries/RecipeQuery';
import AddRecipeToGroceryListMutation from '../mutations/AddRecipeToGroceryListMutation';
import parse from 'html-react-parser';

export default memo(function Recette() {
  const [addedToGrocery, setAddedToGrocery] = useState(false);
  const { id } = useParams();
  const { data: { recipe } = {} } = useQuery(RecipeQuery, {
    variables: { id },
  });
  const [addToGroceryList] = useMutation(AddRecipeToGroceryListMutation, {
    variables: { id },
  });

  function handleAdd() {
    setAddedToGrocery(true);
    addToGroceryList();
  }

  return (
    <Container>
      {recipe && (
        <>
          <Title>
            <BackButton />
            {recipe.title}
          </Title>
          <div className="pb-2">
            <Button color="green" disabled={addedToGrocery} onClick={handleAdd}>
              {addedToGrocery ? (
                <>
                  <CheckIcon className="h-5 w-5 mr-2" /> Ajouté
                </>
              ) : (
                <>
                  <PlusIcon className="h-5 w-5 mr-2" /> Ajouter
                </>
              )}{' '}
              a la liste d&apos;épicerie
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
                {parse(text)}
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  );
});
