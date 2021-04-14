import React, { useState } from "react";
import styled from "styled-components";
import { Btn } from "../../decolation/FormItem";

const AddNewMoss = () => {
  const [pic, setPic] = useState(null);
  const [mossName, setMossName] = useState(null);
  const [location, setLocation] = useState(null);
  const [url, setUrl] = useState(null);
  const [upload, setUpload] = useState("idle");

  const postDetails = () => {
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "Yubosha");
    data.append("cloud_name", "dsx3brzw6");
    fetch("https://api.cloudinary.com/v1_1/dsx3brzw6/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        setUpload("uploaded");
      })
      .catch((err) => {
        console.log(err);
        setUpload("notUploaded");
      });
  };

  const submit = () => {
    fetch("/addNewMoss", {
      method: "POST",
      body: JSON.stringify({
        name: mossName,
        location: location,
        src: url,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const { status } = json;
        if (status === 200) {
          setUpload("success");
        } else {
          setUpload("error");
        }
      });
  };
  return (
    <>
      <Wrapper>
        <Input
          placeholder="name"
          onChange={(e) => setMossName(e.target.value)}
        />
        <Input
          placeholder="location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <UploadWrapper>
          <P>Upload image</P>
          <ChooseFile type="file" onChange={(e) => setPic(e.target.files[0])} />
          <Button onClick={() => postDetails()}>Confirm</Button>
          {upload === "uploaded" && <div>Successfully uploaded!</div>}
          {upload === "notUploaded" && (
            <div>Something went wrong! Please try again.</div>
          )}
        </UploadWrapper>
        <Btn onClick={submit}>Submit</Btn>
        {upload === "success" && <div>Success!</div>}
        {upload === "error" && (
          <div>Something went wrong! Please try again.</div>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: rgba(198, 204, 204, 0.5);
`;
const Input = styled.input`
  margin: 10px 0;
  width: 170px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid var(--soft-gray);
  box-sizing: border-box;
  padding: 5px;
`;

const ChooseFile = styled.input`
  font-size: 10px;
  text-align: center;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background: none;
  border: none;
  border: 1.5px solid var(--soft-black);
  padding: 3px;
  font-size: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const P = styled.p`
  font-size: 12px;
  margin-bottom: 20px;
`;

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export default AddNewMoss;
