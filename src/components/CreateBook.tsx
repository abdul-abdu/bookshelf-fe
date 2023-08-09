import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { createBook } from "../api";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit, reset } = useForm<any>();
  const onSubmit: SubmitHandler<TInput> = async (input) => {
    try {
      const { data: _ } = await createBook({ isbn: input.isbn });
      toast("Book has been created", {
        style: { color: "green" },
      });
      refetchBooks();
    } catch (error: any) {
      console.log(error);
      toast(error?.response?.data?.message, {
        style: { color: "red" },
      });
    } finally {
      reset();
    }
  };

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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Create a book
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "2px 0" }}>
            <TextField
              fullWidth
              label="ISBN"
              type="isbn"
              variant="outlined"
              {...register("isbn")}
            />
            <Button fullWidth type="submit">
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
