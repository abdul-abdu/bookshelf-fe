import React from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Stack,
  LinearProgress,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, redirect } from "react-router-dom";
import { registerUser } from "../../api";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store";
import { LOCAL_STORAGE } from "../../constants";
import { useMutation } from "@tanstack/react-query";

export const Register: React.FC = ({}) => {
  const { register, handleSubmit, reset } = useForm<TUser>();
  const setUser = useAuthStore((store) => store.setUser);
  const { isLoading, mutate } = useMutation({
    mutationFn: (user: TUser) => registerUser(user),
    onSuccess: (data) => {
      localStorage.setItem(
        LOCAL_STORAGE.user,
        JSON.stringify({
          key: data.data.data.key,
          secret: data.data.data.secret,
        })
      );
      setUser(data.data.data);
      redirect("/");
    },
    onError: (error: any) => {
      toast(error?.response?.data?.message || "Error while registering", {
        style: { color: "red" },
      });
      reset();
    },
  });
  const onSubmit: SubmitHandler<TUser> = (user) => {
    mutate(user);
  };

  return (
    <Container maxWidth="sm">
      <Stack
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        spacing={2}
        autoComplete="off"
      >
        {isLoading && <LinearProgress />}
        <Typography>Register</Typography>
        <TextField
          required
          label="Name"
          variant="outlined"
          {...register("name")}
        />

        <TextField
          required
          type="email"
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          Register
        </Button>
      </Stack>
    </Container>
  );
};
