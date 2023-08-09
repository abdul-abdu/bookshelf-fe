import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ReactCardFlip from "react-card-flip";
import {
  Button,
  CardActionArea,
  CardActions,
  LinearProgress,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { editBook } from "../api";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const CARD_STYLE: React.CSSProperties = {
  fontSize: "40px",
  borderRadius: "4px",
  maxWidth: 300,
  minWidth: 200,
};

export const SingleBook: React.FC<{
  book: IBookData;
  onDelete: (bookId: number) => void;
}> = ({
  book: {
    book: { author, cover, id, published, title },
    status,
  },
  onDelete,
}) => {
  const [flip, setFlip] = useState(false);
  const { register, handleSubmit } = useForm<any>();
  const { isLoading, mutate } = useMutation({
    mutationFn: (status: number) => editBook(id, { status }),
    onSuccess: () => {
      toast("Status updated", { style: { color: "green" } });
      setFlip((bool) => !bool);
    },
    onError: () => {
      toast("Error while editing", { style: { color: "red" } });
    },
  });
  const editBookStatus: SubmitHandler<Pick<IBookData, "status">> = async (
    form
  ) => {
    mutate(form.status);
  };

  return (
    <ReactCardFlip isFlipped={flip} flipDirection="vertical">
      <div style={CARD_STYLE}>
        {/* Old */}
        <Card>
          <CardActionArea>
            <CardMedia component="img" height={200} image={cover} alt={title} />
            <CardContent sx={{ height: 100 }}>
              <Typography gutterBottom variant="caption" component="div">
                {title}
              </Typography>
              <ListItem key={id}>
                <ListItemText
                  secondary={`Author: ${author}, Published: ${published}`}
                />
              </ListItem>
              <Typography>Status: {status}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              color="info"
              sx={{ width: 60 }}
              onClick={() => setFlip(!flip)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="warning"
              onClick={() => onDelete(id)}
              sx={{ width: 60 }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </div>

      {/* Back */}
      <div style={CARD_STYLE}>
        <Card>
          {isLoading && <LinearProgress />}
          <form onSubmit={handleSubmit(editBookStatus)}>
            <TextField
              sx={{ textAlign: "center", mt: 2 }}
              type="number"
              label="Status"
              defaultValue={status}
              variant="outlined"
              fullWidth
              {...register("status")}
            />

            <CardActions
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                color="info"
                sx={{ width: 60 }}
                type="submit"
              >
                Update
              </Button>
            </CardActions>
          </form>
        </Card>
        <br />
      </div>
    </ReactCardFlip>
  );
};
