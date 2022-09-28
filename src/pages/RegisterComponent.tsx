import { useState } from "react";
import Form from "../components/Form";
import { register } from "../services/UserService";

const RegisterComponent = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const newUser = await register({ firstName, lastName, email, password });

    if (newUser) {
      // navigate to login
    }
  };

  return (
    <Form
      handleOp={handleRegister}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
};

export default RegisterComponent;
