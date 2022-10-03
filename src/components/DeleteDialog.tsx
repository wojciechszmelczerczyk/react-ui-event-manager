import { useContext } from "react";
import { DeleteDialogCtx } from "../context/DeleteDialogContext";
import { EventPromptCtx } from "../context/EventPromptContext";
import { deleteEvent } from "../services/EventService";

const DeleteDialog = ({ eventDetails }: any) => {
  const { setIsEventPromptVisible } = useContext(EventPromptCtx);
  const { setIsDialogVisible } = useContext(DeleteDialogCtx);

  const at = localStorage.getItem("at");

  const handleSubmit = async () => {
    setIsDialogVisible(false);
    setIsEventPromptVisible(false);
    await deleteEvent(at, eventDetails._id);
  };
  const handleCancel = () => {
    setIsDialogVisible(false);
  };

  return (
    <div className='flex flex-col absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 h-20 w-64 md:h-28 md:w-80 bg-white shadow-2xl rounded-lg z-50'>
      <h1 className='mx-6 my-2 md:my-3'>Do you want to delete event?</h1>
      <div className='flex my-2 md:my-8 self-end'>
        <p className='mx-2 cursor-pointer' onClick={handleCancel}>
          Cancel
        </p>
        <p className='mx-3 cursor-pointer' onClick={handleSubmit}>
          Delete event
        </p>
      </div>
    </div>
  );
};

export default DeleteDialog;
