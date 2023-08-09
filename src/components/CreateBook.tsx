import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { LinearProgress, Stack, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { createBook } from "../api";
import { useMutation } from "@tanstack/react-query";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type TInput = Pick<IBook, "isbn">;

export const CreateBook: React.FC<{ refetchBooks: () => void }> = ({
  refetchBooks,
}) => {
  const { isLoading, mutate } = useMutation({
    mutationFn: (isbn: string) => {
      return createBook({ isbn });
    },
    onSuccess: () => {
      toast("Book has been created", {
        style: { color: "green" },
      });
      refetchBooks();
    },
    onError: (error: any) => {
      toast(error?.response?.data?.message, {
        style: { color: "red" },
      });
    },
    onSettled: () => {
      reset();
    },
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit, reset } = useForm<any>();

  const onSubmit: SubmitHandler<TInput> = async (input) => mutate(input.isbn);

  return (
    <div>
      <Button onClick={handleOpen}>Create</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2} onSubmit={handleSubmit(onSubmit)} component="form">
            {isLoading && <LinearProgress />}
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="center"
            >
              Create a book
            </Typography>

            <TextField
              fullWidth
              label="ISBN"
              type="isbn"
              variant="outlined"
              {...register("isbn")}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              Create
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
