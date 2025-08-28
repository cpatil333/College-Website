import { useLoaderData, useNavigate } from "react-router-dom";

export const Programs = () => {
  const navigate = useNavigate();
  const programList = useLoaderData();
  // console.log(programList);
  const handleDelete = (e) => {};

  return (
    <div className="main-container">
      <h2>Programs List</h2>
      <div>
        <button onClick={() => navigate(`/add-program`)}>New Program</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Program Name</th>
            <th>Description</th>
            <th>Duration Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {programList.programs.map((program) => (
            <tr key={program.id}>
              <td>{program.name}</td>
              <td>{program.description}</td>
              <td>{program.durationYears}</td>
              <td>
                <button onClick={() => navigate(`/edit-program/` + program.id)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(program.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
