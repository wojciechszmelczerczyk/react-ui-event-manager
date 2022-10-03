import { useContext } from "react";
import { EventPromptCtx } from "../context/EventPromptContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCalendar,
  faTrash,
  faPen,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { DeleteDialogCtx } from "../context/DeleteDialogContext";

const EventPrompt = ({ eventDetails }: any) => {
  const { setIsEventPromptVisible } = useContext(EventPromptCtx);
  const { isDialogVisible, setIsDialogVisible } = useContext(DeleteDialogCtx);

  return (
    <div
      className={`flex flex-col absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 z-10 h-48 w-80 md:h-96 md:w-144 bg-white rounded-lg shadow-lg ${
        isDialogVisible ? "opacity-50" : ""
      }`}
    >
      <div className='flex'>
        <p
          className='text-gray-500 cursor-pointer self-end mx-3 my-2 md:text-2xl'
          onClick={() => setIsEventPromptVisible(false)}
        >
          X
        </p>
        <div className='flex grow justify-end'>
          <div
            className='mx-2 text-gray-500 self-center'
            onClick={() => setIsDialogVisible(true)}
          >
            <FontAwesomeIcon
              className='cursor-pointer md:text-xl'
              icon={faTrash}
              color='red'
            />
          </div>
          <div className='mx-2 md:mx-4 self-center'>
            <FontAwesomeIcon className='md:text-xl' icon={faPen} color='gray' />
          </div>
        </div>
      </div>
      <div className='flex'>
        <div className='mx-4 self-center bg-blue-500 h-3 w-3 md:h-4 md:w-4 rounded-sm'></div>
        <h1 className='text-2xl md:text-3xl self-center'>
          {eventDetails.eventTitle}
        </h1>
      </div>
      <div className='hidden md:flex h-20 items-center mx-4'>
        <div>
          <FontAwesomeIcon icon={faClock} color='gray' />
        </div>
        <p className='mx-2 text-gray-500 text-lg'>time</p>
      </div>
      <div className='items-center h-10 md:h-20 mx-4 flex'>
        <div>
          <FontAwesomeIcon className='md:text-lg' icon={faBell} color='gray' />
        </div>
        <p className='mx-2 text-gray-500 md:text-lg'>30 minutes before</p>
      </div>
      <div className='items-center h-10 md:h-20 mx-4 flex'>
        <div>
          <FontAwesomeIcon
            className='md:text-lg'
            icon={faCalendar}
            color='gray'
          />
        </div>
        <p className='mx-2 text-gray-500 md:text-lg'>{eventDetails.email}</p>
      </div>
    </div>
  );
};

export default EventPrompt;
