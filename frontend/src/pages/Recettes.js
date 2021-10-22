import { memo, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import Title from '../components/Layout/Title';
import Table from '../components/Layout/Table';
import { TableHeaderRow } from '../components/Layout/Table';
import Container from '../components/Layout/Container';
import { TableHeader } from '../components/Layout/Table';
import { TableRow } from '../components/Layout/Table';
import { TableCell } from '../components/Layout/Table';
import SearchBar from '../components/SearchBar';

const RECIPES_QUERY = gql`
  query {
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
const fuse_keys = ['title', 'steps.text', 'ingredients.ingredient.name'];

export default memo(function Recettes() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { data: { recipes = [] } = {} } = useQuery(RECIPES_QUERY);

  const fuse = useMemo(() => new Fuse(recipes, { keys: fuse_keys }), [recipes]);
  const defaultResult = useMemo(
    () => recipes.map((recipe) => ({ item: recipe })),
    [recipes]
  );

  const searchResults = useMemo(
    () => (search ? fuse.search(search) : defaultResult),
    [recipes, search]
  );

  return (
    <Container>
      <Title>Recettes</Title>
      <SearchBar
        placeholder="Rechercher une recette..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table columns={2}>
        <TableHeaderRow>
          <TableHeader>ID</TableHeader>
          <TableHeader>Nom</TableHeader>
        </TableHeaderRow>
        <tbody>
          {searchResults &&
            searchResults.map(({ item: recipe }) => (
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
