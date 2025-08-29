import { useLoaderData, useNavigate } from "react-router-dom";

export const Events = () => {
  const navigate = useNavigate();
  const eventsList = useLoaderData();
  console.log(eventsList);

  const handleDelete = (e) => {};

  return (
    <div className="main-container">
      <h2>Events List</h2>
      <div>
        <button className="" onClick={() => navigate(`/add-event`)}>
          New Event
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Full Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {eventsList?.events.map((event) => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.details}</td>
              <td>{event?.user.fullName}</td>
              <td>
                <button onClick={() => navigate(`/edit-event/` + course.id)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
