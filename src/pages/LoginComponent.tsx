import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { login } from "../services/UserService";

const LoginComponent = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const newUser = await login({ firstName, lastName, email, password });

    if (newUser) {
      localStorage.setItem("at", newUser.data.accessToken);
      localStorage.setItem("rt", newUser.data.refreshToken);

      // navigate to main page
      navigate("/calendar");
    }
  };

  return (
    <Form
      handleOp={handleRegister}
      accountExist={true}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
};

export default LoginComponent;
