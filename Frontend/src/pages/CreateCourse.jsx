import { CREATE_COURSE } from "../apollo/Mutation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROGRAMS_OPTIONS, GET_TEACHERS_OPTIONS } from "../apollo/Query";

export const courseData = async ({ request }) => {
  try {
    const res = await request.FormData();
    const data = Object.fromEntries(res);
  } catch (error) {
    console.log(error.message);
  }
};
export const CreateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    description: "",
    programId: "select",
    teacherId: "select",
  });

  // ✅ useQuery hook instead of client.query
  const { data: programsData, loading: programsLoading } =
    useQuery(GET_PROGRAMS_OPTIONS);
  const { data: teachersData, loading: teachersLoading } =
    useQuery(GET_TEACHERS_OPTIONS);
  console.log(programsData);
  const [createCourse] = useMutation(CREATE_COURSE);

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.role === "select") {
      alert("Please select role");
    }
    try {
      const { data } = await createCourse({
        variables: {
          input: {
            code: formData.code,
            title: formData.title,
            description: formData.description,
            programId: parseInt(formData.programId),
            teacherId: parseInt(formData.teacherId),
          },
        },
      });
      if (data?.createCourse) {
        alert("Course data saved!");
        navigate("/courses", { replace: true });
      } else {
        alert("Course data failed !");
        return;
      }
    } catch (error) {
      console.error("Course data error ", error.message);
      alert("Course data failed, please check data!");
    }
  };

  return (
    <div className="container">
      <h2>New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="code"
            placeholder="Course Code"
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleInput}
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleInput}
            rows={5}
            cols={45}
          ></textarea>
        </div>
        <div>
          <select name="programId" onChange={handleInput}>
            <option value="select">Select Program</option>
            {programsData.programOptions.map((program) => (
              <option value={program.id}>{program.name}</option>
            ))}
          </select>
        </div>
        <div>
          <select name="teacherId" onChange={handleInput}>
            <option value="select">Select Teacher</option>
            {teachersData.teacherOptions.map((teacher) => (
              <option value={teacher.id}>{teacher.fullName}</option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
