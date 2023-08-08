import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, ListItem, ListItemText } from "@mui/material";

export const SingleBook: React.FC<{ book: IBookData }> = ({
  book: {
    book: { author, cover, id, published, title },
    status,
  },
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={cover} alt="title" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <ListItem key={id}>
            <ListItemText
              primary={title}
              secondary={`Author: ${author}, Published: ${published}`}
            />
          </ListItem>
          <Typography>Status: {status}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
