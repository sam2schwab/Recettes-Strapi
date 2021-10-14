import { memo } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Layout/Title';
import Table from '../components/Layout/Table';
import { TableHeaderRow } from '../components/Layout/Table';
import Container from '../components/Layout/Container';
import { TableHeader } from '../components/Layout/Table';
import { TableRow } from '../components/Layout/Table';
import { TableCell } from '../components/Layout/Table';

const RECIPES_QUERY = gql`
  query {
    recipes {
      title
      id
    }
  }
`;

export default memo(function Recettes() {
  const { data } = useQuery(RECIPES_QUERY);
  const navigate = useNavigate();
  return (
    <Container>
      <Title>Livre de Recettes</Title>
      <Table columns={2}>
        <TableHeaderRow>
          <TableHeader>ID</TableHeader>
          <TableHeader>Nom</TableHeader>
        </TableHeaderRow>
        <tbody>
          {data &&
            data.recipes.map((recipe) => (
              <TableRow
                key={recipe.id}
                clickable
                onClick={() => navigate(recipe.id)}
              >
                <TableCell>{recipe.id}</TableCell>
                <TableCell>{recipe.title}</TableCell>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </Container>
  );
});
