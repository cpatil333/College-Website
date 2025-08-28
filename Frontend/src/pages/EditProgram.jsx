import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROGRAM } from "../apollo/Mutation";
import { useLoaderData, useNavigate } from "react-router-dom";

export const EditProgram = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
    durationYears: 0,
  });
  const programData = useLoaderData();
  console.log(programData);
  const [editProgram] = useMutation(UPDATE_PROGRAM);

  useEffect(() => {
    if (programData?.program) {
      setFormData({
        id: programData.program.id,
        name: programData.program.name,
        description: programData.program.description,
        durationYears: programData.program.durationYears,
      });
    }
  }, [programData]);

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await editProgram({
        variables: {
          input: {
            id: parseInt(formData.id),
            name: formData.name,
            description: formData.description,
            durationYears: parseInt(formData.durationYears),
          },
        },
      });
      if (data?.updateProgram) {
        alert("Program updated successfully!");
        navigate("/programs", { replace: true });
      } else {
        alert("Program update data failed!");
      }
    } catch (error) {
      console.error("Program udpate data error ", error.message);
      alert("Program update data failed, please check data!");
    }
  };

  return (
    <div className="container">
      <h2>Update Program</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={formData.name}
            name="name"
            placeholder="Program Name"
            onChange={handleInput}
          />
        </div>
        <div>
          <textarea
            type="text"
            value={formData.description}
            name="description"
            placeholder="Description"
            onChange={handleInput}
            rows={8}
            cols={50}
          ></textarea>
        </div>
        <div>
          <input
            type="number"
            value={formData.durationYears}
            name="durationYears"
            placeholder="Duration Years"
            onChange={handleInput}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
