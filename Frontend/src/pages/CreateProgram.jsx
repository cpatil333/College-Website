import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROGRAMS } from "../apollo/Mutation";
import { useNavigate } from "react-router-dom";

export const programData = async ({ request }) => {
  try {
    const res = await request.formData();
    const data = Object.fromEntries(res);
  } catch (error) {
    console.log("Error ", error.message);
  }
};

export const CreateProgram = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [newProgram] = useMutation(CREATE_PROGRAMS);

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await newProgram({
        variables: {
          input: {
            name: formData.name,
            description: formData.description,
            durationYears: parseInt(formData.durationYears),
          },
        },
      });
      if (data?.createProgram) {
        alert("Program saved successfully!");
        navigate("/programs", { replace: true });
      } else {
        alert("Program data failed!");
      }
    } catch (error) {
      console.error("Programs data error ", error.message);
      alert("Program data failed, please check data!");
    }
  };

  return (
    <div className="container">
      <h2>Add Program</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Program Name"
            onChange={handleInput}
          />
        </div>
        <div>
          <textarea
            type="email"
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
