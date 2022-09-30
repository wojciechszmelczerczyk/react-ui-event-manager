import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { AuthCtx } from "../context/AuthContext";
import { login } from "../services/UserService";

const LoginComponent = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState([]);
  const { setAuthenticated } = useContext(AuthCtx);

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const newUser = await login({ firstName, lastName, email, password });

      if (newUser) {
        localStorage.setItem("at", newUser.data.accessToken);
        localStorage.setItem("rt", newUser.data.refreshToken);

        // update auth context after successful login
        setAuthenticated(true);

        // navigate to main page
        navigate("/calendar");
      }
    } catch (e) {
      const errors = e.response.data.split(":");
      setErrors(errors);
    }
  };

  return (
    <Form
      handleOp={handleLogin}
      errors={errors}
      setErrors={setErrors}
      accountExist={true}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
};

export default LoginComponent;
