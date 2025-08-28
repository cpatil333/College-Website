import { UPDATE_COURSE } from "../apollo/Mutation";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROGRAMS_OPTIONS, GET_TEACHERS_OPTIONS } from "../apollo/Query";

export const EditCourse = () => {
  const navigate = useNavigate();
  const courseById = useLoaderData();
  console.log(courseById);
  const [formData, setFormData] = useState({
    id: 0,
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

  const [updateCourse] = useMutation(UPDATE_COURSE);

  useEffect(() => {
    if (courseById?.course) {
      setFormData({
        id: courseById.course.id,
        code: courseById.course.code,
        title: courseById.course.title,
        description: courseById.course.description,
        programId: courseById.course.programId,
        teacherId: courseById.course.teacherId,
      });
    }
  }, [courseById]);

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.programId === "select") {
      alert("Please selec Program");
    }
    if (formData.teacherId === "select") {
      alert("Please selec Teacher");
    }
    try {
      const { data } = await updateCourse({
        variables: {
          input: {
            id: parseInt(formData.id),
            code: formData.code,
            title: formData.title,
            description: formData.description,
            programId: parseInt(formData.programId),
            teacherId: parseInt(formData.teacherId),
          },
        },
      });
      if (data?.updateCourse) {
        alert("Course data updated!");
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
            value={formData.code}
            placeholder="Course Code"
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Title"
            onChange={handleInput}
          />
        </div>
        <div>
          <textarea
            name="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleInput}
            rows={5}
            cols={45}
          ></textarea>
        </div>
        <div>
          <select
            name="programId"
            value={formData.programId}
            onChange={handleInput}
          >
            <option value="select">Select Program</option>
            {!programsLoading &&
              programsData?.programOptions?.map((program) => (
                <option value={program.id}>{program.name}</option>
              ))}
          </select>
        </div>
        <div>
          <select
            name="teacherId"
            value={formData.teacherId}
            onChange={handleInput}
          >
            <option value="select">Select Teacher</option>
            {!teachersLoading &&
              teachersData?.teacherOptions?.map((teacher) => (
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
