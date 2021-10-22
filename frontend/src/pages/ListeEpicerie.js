import { useMutation, useQuery } from '@apollo/client';
import { memo } from 'react';
import Container from '../components/Layout/Container';
import Title from '../components/Layout/Title';
import Button from '../components/Button';
import { TrashIcon } from '@heroicons/react/outline';
import GroceryQuery from '../queries/GroceryQuery';
import ClearGroceryListMutation from '../mutations/ClearGroceryListMutation';

export default memo(function ListeEpicerie() {
  const { data: { groceryList } = {} } = useQuery(GroceryQuery, {
    fetchPolicy: 'network-only',
  });
  const [clearList] = useMutation(ClearGroceryListMutation, {
    refetchQueries: [GroceryQuery],
  });
  return (
    <Container>
      <Title>Liste d&apos;épicerie</Title>
      <Button
        onClick={() => {
          clearList();
        }}
        color="red"
      >
        <TrashIcon className="h-5 w-5 mr-2" />
        Vider la liste
      </Button>
      {groceryList &&
        groceryList.ingredients.map(({ id, quantity, ingredient, unit }) => (
          <div key={id}>
            {quantity || ''} {unit?.name} {ingredient.name}
          </div>
        ))}
    </Container>
  );
});
