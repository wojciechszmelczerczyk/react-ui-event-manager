const Event = ({ event }: any) => {
  return (
    <div className='bg-blue-500 w-64 my-2 px-3 py-3 rounded-lg' key={event._id}>
      <p className='text-white'>{event.eventTitle}</p>
    </div>
  );
};

export default Event;
