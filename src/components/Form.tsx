import { NavLink } from "react-router-dom";
import "../index.css";

const Form = ({
  handleOp,
  errors,
  setErrors,
  accountExist,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
}: any) => {
  const handleFirstName = (firstName: string) => {
    setErrors([]);
    setFirstName(firstName);
  };

  const handleLastName = (lastName: string) => {
    setErrors([]);
    setLastName(lastName);
  };

  const handleEmail = (email: string) => {
    setErrors([]);
    setEmail(email);
  };

  const handlePassword = (password: string) => {
    setErrors([]);
    setPassword(password);
  };

  return (
    <div className='flex justify-center items-center  min-h-screen text-gray-800'>
      <div className='xl:w-144'>
        <div className='block bg-white shadow-lg rounded-lg'>
          <div className='px-4 md:px-0'>
            <div className='md:p-12 md:mx-6'>
              <div className='text-center'>
                <img
                  className='mx-auto w-10'
                  src='https://img.icons8.com/doodle/48/FA5252/calendar--v2.png'
                  alt='logo'
                />
                <h4 className='text-xl font-semibold mt-1 mb-12 pb-1'>
                  Event Manager
                </h4>
                <div
                  className={
                    errors.length
                      ? "flex flex-col items-start max-h-40 bg-red-500 rounded-lg my-6 py-2 px-2 shadow-lg"
                      : ""
                  }
                >
                  {errors.length ? (
                    <>
                      {errors
                        .filter(
                          (err: any) =>
                            // include error messages with specific string
                            err.includes("Please") |
                            err.includes("Minimum") |
                            err.includes("Provide")
                        )
                        .map((filteredErr: any) => (
                          <li className='mx-2 list-none	text-white'>
                            {filteredErr.includes(",") ? (
                              // if error message include ',' char, use regex and cut everything after symbol
                              <>{filteredErr.replace(/, [a-zA-Z]*/, "")}</>
                            ) : (
                              // otherwise display error
                              <>{filteredErr}</>
                            )}
                          </li>
                        ))}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <form>
                {accountExist ? (
                  ""
                ) : (
                  <>
                    <div className='mb-4'>
                      <input
                        type='text'
                        data-cy='firstNameInput'
                        onChange={(e) => handleFirstName(e.currentTarget.value)}
                        className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        placeholder='First Name'
                      />
                    </div>
                    <div className='mb-4'>
                      <input
                        type='text'
                        data-cy='lastNameInput'
                        onChange={(e) => handleLastName(e.currentTarget.value)}
                        className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        placeholder='Last name'
                      />
                    </div>
                  </>
                )}

                <div className='mb-4'>
                  <input
                    type='text'
                    data-cy='emailInput'
                    onChange={(e) => handleEmail(e.currentTarget.value)}
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    placeholder='Email'
                  />
                </div>
                <div className='mb-4'>
                  <input
                    type='password'
                    data-cy='passwordInput'
                    onChange={(e) => handlePassword(e.currentTarget.value)}
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    placeholder='Password'
                  />
                </div>
                <div className='text-center pt-1 mb-12 pb-1'>
                  <button
                    data-cy='formBtn'
                    className='inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3'
                    onClick={handleOp}
                    type='submit'
                  >
                    {accountExist ? "Log in" : "Sign up"}
                  </button>
                </div>
                <div className='flex items-center justify-between pb-6'>
                  {accountExist ? (
                    <NavLink className='mb-0 mr-2 hover:text-blue-500' to='/'>
                      Don't have an account?
                    </NavLink>
                  ) : (
                    <NavLink
                      className='mb-0 mr-2 hover:text-blue-500'
                      to='/login'
                    >
                      Already have an account?
                    </NavLink>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
