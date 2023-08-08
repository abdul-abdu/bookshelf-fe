import React from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, redirect } from "react-router-dom";
import { getMyself } from "../../api";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../store";

type Inputs = Pick<TUser, "key" | "secret">;

export const Login: React.FC = ({}) => {
  const setUser = useAuthStore((store) => store.setUser);
  const { register, handleSubmit, reset } =
    useForm<Pick<TUser, "key" | "secret">>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { key, secret } = data;
      JSON.stringify({ key, secret: secret });
      const { data: response } = await getMyself();
      console.log(response);
      setUser(response.data);
      redirect("/");
    } catch (error) {
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
          <Typography>Login</Typography>
        </Grid>
        <Grid item>
          <TextField label="Key" variant="outlined" {...register("key")} />
        </Grid>
        <Grid item>
          <TextField
            label="Secret"
            variant="outlined"
            {...register("secret")}
          />
        </Grid>
        <Grid>
          <small>
            Do not have an account <Link to="/sign-up">Register</Link>
          </small>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
