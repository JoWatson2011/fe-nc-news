import { useContext, useState } from "react";
import { UserDispatchContext } from "../contexts/UserContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getRequest } from "../utils/api";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const dispatch = useContext(UserDispatchContext);
  const navigate = useNavigate();

  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleTestUserLogIn = (e) => {
    e.preventDefault();
  };
  const handleLogInSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await getRequest(`api/users/${loginUserName}`);
      dispatch({ type: "login", data: user });
      navigate("/");
    } catch (err) {
      setLoginError("Cannot find user details, please try again");
      console.log(err);
    }
    setLoginUserName("");
    setLoginPassword("");
  };

  return (
    <main className="flex flex-col w-full place-items-center space-y-5">
      <div className="flex flex-col w-[60%] p-8 place-items-center border border-black rounded-[20px]">
        <h2 className="text-lg text-center">
          <span className="text-red-800 font-semibold">
            Don't have an account?{" "}
          </span>
          <br />
          Log into the test user account here!
        </h2>
        <Button
          onClick={handleTestUserLogIn}
          sx={{
            borderRadius: "30px",
            color: "darkred",
            border: "1px solid darkred",
          }}
        >
          Log in as test user
        </Button>
      </div>
      <div className="flex flex-col w-[60%] p-8 place-items-center border border-black rounded-[20px]">
        <h2 className="text-center text-lg mb-4">
          <span className="text-red-800 font-semibold"> Have an account?</span>{" "}
          <br />
          Log In here:
        </h2>
        <form
          className="flex flex-col w-full place-items-center space-y-5"
          onSubmit={handleLogInSubmit}
        >
          <TextField
            label="Username"
            id="login-username"
            value={loginUserName}
            onChange={(e) => setLoginUserName(e.target.value)}
            InputProps={{ sx: { borderRadius: "30px" } }}
          />
          <TextField
            label="Password"
            id="login-password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            InputProps={{ sx: { borderRadius: "30px" } }}
          />
          <Button
            type="submit"
            sx={{
              borderRadius: "30px",
              color: "darkred",
              border: "1px solid darkred",
            }}
          >
            Log In
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LogIn;
