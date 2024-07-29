import Button from "@mui/material/Button";
import { useContext } from "react";
import { UserDispatchContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const dispatch = useContext(UserDispatchContext);
  const navigate = useNavigate();
  return (
    <main className="flex flex-col w-full place-items-center space-y-5">
      <Button
        sx={{
          borderRadius: "30px",
          color: "darkred",
          border: "1px solid darkred",
        }}
        onClick={() => {
          dispatch({ type: "logout" });
          navigate("/");
        }}
      >
        Log Out
      </Button>
    </main>
  );
};

export default MyAccount;
