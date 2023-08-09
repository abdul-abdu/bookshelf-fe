import React, { useState } from "react";
import {
  Typography,
  Stack,
  Grid,
  Box,
  Button,
  Modal,
  Divider,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { deleteBook, getBooks } from "../../api";
import { CreateBook, SingleBook } from "../../components";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";
import { useAuthStore } from "../../store";
import { LOCAL_STORAGE } from "../../constants";

export const Home: React.FC = () => {
  const [isModalOpen, setIsmodalOpen] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);
  const {
    isLoading,
    refetch,
    data: books,
  } = useQuery({
    queryKey: ["booksData"],
    queryFn: async () => {
      try {
        const { data } = await getBooks();
        if (!data.data) return [];
        const fetchedBooks = data.data;
        return fetchedBooks;
      } catch (error) {}
    },
  });

  // if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Box
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
        py={3}
        my={3}
      >
        <Box>
          <img src="public/shelf.png" alt="logo" style={{ width: 50 }} />
        </Box>
        <Box display="flex">
          <CreateBook refetchBooks={refetch} />
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              localStorage.removeItem(LOCAL_STORAGE.user);
              setUser(null);
              redirect("/sign-up");
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {isLoading && <Typography>Loading...</Typography>}
      {books?.length ? (
        <Stack justifyContent="center" alignItems="center">
          <Grid container spacing={3} justifyContent="center" display="flex">
            {books.map((book) => (
              <Grid item xs key={book.book.id}>
                <SingleBook
                  book={book}
                  onDelete={async (bookId) => {
                    try {
                      await deleteBook(bookId);
                      toast("Boook has been deleted", {
                        style: { color: "green" },
                      });
                      refetch();
                    } catch (error: any) {
                      toast(error?.response?.data?.message, {
                        style: { color: "red" },
                      });
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      ) : (
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="h4">You don't have books!</Typography>
          <Typography variant="h4">Let`s create!</Typography>
        </Stack>
      )}
      <Modal
        open={isModalOpen}
        onClose={() => setIsmodalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
