import { useMutation, useQuery } from '@apollo/client';
import { memo } from 'react';
import Container from '../components/Layout/Container';
import Title from '../components/Layout/Title';
import Button from '../components/Button';
import gql from 'graphql-tag';
import { TrashIcon } from '@heroicons/react/outline';

const GROCERY_QUERY = gql`
  query {
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

const CLEAR_LIST_MUTATION = gql`
  mutation {
    deleteGroceryList {
      groceryList {
        id
      }
    }
  }
`;

export default memo(function ListeEpicerie() {
  const { data: { groceryList } = {} } = useQuery(GROCERY_QUERY);
  const [clearList] = useMutation(CLEAR_LIST_MUTATION, {
    refetchQueries: [GROCERY_QUERY],
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
