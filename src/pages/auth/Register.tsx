import React from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, redirect } from "react-router-dom";
import { registerUser } from "../../api";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store";
import { LOCAL_STORAGE } from "../../constants";

export const Register: React.FC = ({}) => {
  const { register, handleSubmit, reset } = useForm<TUser>();
  const setUser = useAuthStore((store) => store.setUser);
  const onSubmit: SubmitHandler<TUser> = async (user) => {
    try {
      const { data } = await registerUser(user);
      localStorage.setItem(
        LOCAL_STORAGE.user,
        JSON.stringify({ key: data.data.key, secret: data.data.secret })
      );
      setUser(data.data);
      redirect("/");
    } catch (error: any) {
      toast(error?.response?.data?.message, {
        style: { color: "red" },
      });
      reset();
    }
  };

  return (
    <Container maxWidth="sm">
      <Stack
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <Typography>Register</Typography>
        <TextField
          required
          label="Name"
          variant="outlined"
          {...register("name")}
        />

        <TextField
          required
          label="Email"
          variant="outlined"
          {...register("email")}
        />

        <TextField
          required
          label="Key"
          variant="outlined"
          {...register("key")}
        />

        <TextField
          required
          label="Secret"
          variant="outlined"
          {...register("secret")}
        />

        <small>
          Already have an account <Link to="/sign-in">Login</Link>
        </small>

        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </Stack>
    </Container>
  );
};
