import React from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
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
      console.log("asdasdasda");
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        minHeight={"100vh"}
      >
        <Grid item>
          <Typography>Register</Typography>
        </Grid>
        <Grid item>
          <TextField label="Name" variant="outlined" {...register("name")} />
        </Grid>
        <Grid item>
          <TextField label="Email" variant="outlined" {...register("email")} />
        </Grid>
        <Grid item>
          <TextField
            label="Key"
            type="password"
            variant="outlined"
            {...register("key")}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Secret"
            type="password"
            variant="outlined"
            {...register("secret")}
          />
        </Grid>
        <Grid>
          <small>
            Already have an account <Link to="/sign-in">Login</Link>
          </small>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
