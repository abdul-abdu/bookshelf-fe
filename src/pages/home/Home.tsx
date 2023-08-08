import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
  Grid,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../../api";
import { SingleBook } from "../../components";

export const Home: React.FC = () => {
  const {
    isLoading,
    error,
    data: books,
  } = useQuery({
    queryKey: ["booksData"],
    queryFn: async () => {
      const { data } = await getBooks();
      console.log(data.data);
      if (!data.data) {
        return [];
      }
      const fetchedBooks = data.data.map((book) => book);
      return fetchedBooks;
    },
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Book List
      </Typography>
      <List>
        {isLoading && <>Loading</>}
        {books?.length ? (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {books.map((book) => (
              <Grid item xs={6}>
                <SingleBook book={book} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Stack justifyContent="center" alignItems="center">
            <Typography variant="h4">You don't have books!</Typography>
            <Typography variant="h4">Let`s create!</Typography>
          </Stack>
        )}
      </List>
    </Container>
  );
};
