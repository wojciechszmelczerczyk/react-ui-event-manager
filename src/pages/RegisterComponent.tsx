import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { register } from "../services/UserService";

const RegisterComponent = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const newUser = await register({ firstName, lastName, email, password });

      if (newUser) {
        navigate("/login");
      }
    } catch (e) {
      const errors = e.response.data.split(":");
      setErrors(errors);
    }
  };

  return (
    <Form
      handleOp={handleRegister}
      errors={errors}
      setErrors={setErrors}
      accountExist={false}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
};

export default RegisterComponent;
