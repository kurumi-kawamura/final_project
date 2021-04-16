import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addNewMossInfo } from "../../actions";
import { AppContext } from "../../context";
import { Btn } from "../../decolation/FormItem";
import { ENAddMoss, ENBtn } from "../../sentence/English";
import { JPAddMoss, JPBtn } from "../../sentence/Japanese";

const AddNewMoss = () => {
  const dispatch = useDispatch();
  const { currentUser, lang } = useContext(AppContext);
  const [pic, setPic] = useState(null);
  const [mossName, setMossName] = useState(null);
  const [location, setLocation] = useState(null);
  const [url, setUrl] = useState(null);
  const [upload, setUpload] = useState("idle");

  const postDetails = (e) => {
    e.preventDefault();
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

  const submit = (e) => {
    e.preventDefault();
    fetch("/addNewMoss", {
      method: "POST",
      body: JSON.stringify({
        name: mossName,
        location: location,
        src: url,
        submittedBy: currentUser.userName,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { status } = json;
        if (status === 200) {
          dispatch(addNewMossInfo(json.data));
          alert("Successfully added!");
          setUpload("success");
          clear();
        } else {
          setUpload("error");
        }
      });
  };

  const clear = () => {
    setUpload("idle");
    setPic(null);
    setLocation(null);
    setMossName(null);
  };

  return (
    <>
      <Wrapper>
        {lang ? (
          <>
            <H2>{ENAddMoss.add}</H2>
            <Input
              placeholder={ENAddMoss.name}
              onChange={(e) => setMossName(e.target.value)}
              required
            />
            <Input
              placeholder={ENAddMoss.location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <UploadWrapper>
              <P>{ENAddMoss.upload}</P>
              <ChooseFile
                type="file"
                onChange={(e) => setPic(e.target.files[0])}
              />
              <Button onClick={(e) => postDetails(e)}>{ENAddMoss.confirmPic}</Button>
              {upload === "uploaded" && <div>Successfully uploaded!</div>}
              {upload === "notUploaded" && (
                <div>Something went wrong! Please try again.</div>
              )}
            </UploadWrapper>
            <Btn onClick={(e) => submit(e)}>{ENBtn.submit}</Btn>
            <Btn type="reset" onClick={clear}>
              {ENBtn.clear}
            </Btn>
            {upload === "success" && <div>Success!</div>}
            {upload === "error" && (
              <div>Something went wrong! Please try again.</div>
            )}
          </>
        ) : (
          <>
            <H2>{JPAddMoss.add}</H2>
            <Input
              placeholder={JPAddMoss.name}
              onChange={(e) => setMossName(e.target.value)}
              required
            />
            <Input
              placeholder={JPAddMoss.location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <UploadWrapper>
              <P>{JPAddMoss.upload}</P>
              <ChooseFile
                type="file"
                onChange={(e) => setPic(e.target.files[0])}
              />
              <Button onClick={(e) => postDetails(e)}>{JPAddMoss.confirmPic}</Button>
              {upload === "uploaded" && <div>Successfully uploaded!</div>}
              {upload === "notUploaded" && (
                <div>Something went wrong! Please try again.</div>
              )}
            </UploadWrapper>
            <Btn onClick={(e) => submit(e)}>{JPBtn.submit}</Btn>
            <Btn type="reset" onClick={clear}>
            {JPBtn.clear}
            </Btn>
            {upload === "success" && <div>Success!</div>}
            {upload === "error" && (
              <div>Something went wrong! Please try again.</div>
            )}
          </>
        )}
      </Wrapper>
    </>
  );
};

const H2 = styled.h2`
  font-size: 20px;
  margin-bottom: 5px;
`;

const Wrapper = styled.form`
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
  cursor: pointer;

  &:hover {
    background-color: rgba(54, 54, 54, 0.2);
  }
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
