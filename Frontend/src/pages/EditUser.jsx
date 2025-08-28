import { useMutation } from "@apollo/client";
import { USER_UPDATE } from "../apollo/Mutation";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const editUserData = async ({ request }) => {
  try {
    const res = await request.FormData();
    const data = Object.fromEntries(res);
  } catch (error) {
    console.log(error.message);
  }
};

export const EditUser = () => {
  const navigate = useNavigate();
  const userData = useLoaderData();
  console.log(userData);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    email: "",
    password: "",
    imageUrl: "",
    role: "select",
  });

  useEffect(() => {
    if (userData?.user) {
      setFormData({
        id: userData.user.id,
        fullName: userData.user.fullName,
        email: userData.user.email,
        password: userData.user.password,
        imageUrl: userData.user.imageUrl,
        role: userData.user.role,
      });
    }
  }, [userData]);

  const [useUpdate] = useMutation(USER_UPDATE);

  const handleSelectInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

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
      let uploadFileName = "";

      if (selectedFile) {
        const fileData = new FormData();
        fileData.append("imageUrl", selectedFile);

        try {
          const response = await fetch("http://localhost:4000/uploads", {
            method: "POST",
            body: fileData,
          });

          if (!response.ok) {
            throw new Error("Upload failed");
          }

          const contentType = response.headers.get("content-type") || "";

          if (!contentType.includes("application/json")) {
            // only error if it’s *not* JSON
            const text = await response.text();
            throw new Error("Server return non-JSON", text);
          }
          const result = await response.json();
          uploadFileName = result.fileName;
        } catch (error) {
          console.log("uploaded fiiled ", error.message);
          return;
        }
      }
      const { data } = await useUpdate({
        variables: {
          input: {
            id: formData.id,
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            imageUrl: uploadFileName,
            role: formData.role,
          },
        },
      });
      if (data?.editUser) {
        alert("User data udpated!");
        navigate("/", { replace: true });
      } else {
        alert("User data update failed !");
        return;
      }
    } catch (error) {
      console.error("User updated data error ", error.message);
      alert("User updated failed, please check data!");
    }
  };

  return (
    <div className="container">
      <h2>User Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            placeholder="Full Name"
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type="file"
            name="imageUrl"
            placeholder="Select images"
            onChange={handleSelectInput}
          />
        </div>
        <div>
          <select name="role" value={formData.role} onChange={handleInput}>
            <option value="select">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
