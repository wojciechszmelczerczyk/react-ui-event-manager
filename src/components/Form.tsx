import "../index.css";

const Form = ({
  handleOp,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
}: any) => {
  const handleFirstName = (firstName: string) => {
    setFirstName(firstName);
  };

  const handleLastName = (lastName: string) => {
    setLastName(lastName);
  };

  const handleEmail = (email: string) => {
    setEmail(email);
  };

  const handlePassword = (password: string) => {
    setPassword(password);
  };

  return (
    <div className='flex min-h-screen justify-center items-center'>
      <div className='flex flex-col items-center h-96 bg-slate-600 rounded-lg shadow-lg'>
        <h1 className='text-white my-6'>Event Manager App</h1>
        <form className='flex flex-col items-center h-80 space-y-10 mx-3'>
          <div className='flex'>
            <label className='text-white'>First name</label>
            <input
              className='mx-2'
              onChange={(e) => handleFirstName(e.currentTarget.value)}
              type='text'
            />
          </div>
          <div className='flex'>
            <label className='text-white'>Last name</label>
            <input
              className='mx-2'
              onChange={(e) => handleLastName(e.currentTarget.value)}
              type='text'
            />
          </div>
          <div className='flex'>
            <label className='text-white'>Email</label>
            <input
              className='mx-2'
              onChange={(e) => handleEmail(e.currentTarget.value)}
              type='text'
            />
          </div>

          <div className='flex'>
            <label className='text-white'>Password</label>
            <input
              className='mx-2'
              onChange={(e) => handlePassword(e.currentTarget.value)}
              type='password'
            />
          </div>

          <button
            className='bg-yellow-600 w-32 rounded-lg'
            onClick={handleOp}
            type='submit'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
