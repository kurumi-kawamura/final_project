import React, { useContext, useState } from "react";
// import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppContext } from "../../context";
import { Btn, DisabledBtn } from "../../decolation/FormItem";
import { ENAddMoss, ENBtn } from "../../sentence/Language";
import { JPAddMoss, JPBtn } from "../../sentence/Japanese";

const AddNewMoss = () => {
  // const dispatch = useDispatch();
  const { currentUser, lang } = useContext(AppContext);
  const [pic, setPic] = useState(null);
  const [mossName, setMossName] = useState(null);
  const [location, setLocation] = useState(null);
  const [url, setUrl] = useState(null);
  const [upload, setUpload] = useState("idle");

  const postDetails = (e) => {
    e.preventDefault();
    setUpload("loadingPic");
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
        if (data.url) {
          setUrl(data.url);
          setUpload("uploaded");
        } else if (data.url === undefined) {
          setUpload("pleaseSelect");
        }
      })
      .catch((err) => {
        console.log(err);
        setUpload("notUploaded");
      });
  };

  const submit = (e) => {
    e.preventDefault();
    fetch("/addRequest", {
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
          // dispatch(addNewMossInfo(json.data));
          alert("Request sent!");
          setUpload("success");
          clear();
          document.querySelector(".nameInput").value = "";
          document.querySelector(".locationInput").value = "";
          document.querySelector(".picInput").value = "";
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
              className="nameInput"
            />
            <Input
              placeholder={ENAddMoss.location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="locationInput"
            />
            <UploadWrapper>
              <P>{ENAddMoss.upload}</P>
              <ChooseFile
                type="file"
                onChange={(e) => setPic(e.target.files[0])}
                className="picInput"
              />
              <Button onClick={(e) => postDetails(e)}>
                {ENAddMoss.confirmPic}
              </Button>

              {upload === "uploaded" && <P>{ENAddMoss.uploadSuccess}</P>}
              {upload === "loadingPic" && <P>uploading...</P>}
              {upload === "notUploaded" && <P>{ENAddMoss.Unsuccess}</P>}
              {upload === "pleaseSelect" && <P>{ENAddMoss.selectFile}</P>}
            </UploadWrapper>
            <BtnWrapper>
              {location && mossName ? (
                <Btn onClick={(e) => submit(e)}>{ENBtn.submit}</Btn>
              ) : (
                <DisabledBtn disabled={true} onClick={(e) => submit(e)}>
                  {ENBtn.submit}
                </DisabledBtn>
              )}
            </BtnWrapper>
            <Btn type="reset" onClick={clear}>
              {ENBtn.clear}
            </Btn>
            {upload === "error" && <P>{ENAddMoss.Unsuccess}</P>}
          </>
        ) : (
          <>
            <H2>{JPAddMoss.add}</H2>
            <Input
              placeholder={JPAddMoss.name}
              onChange={(e) => setMossName(e.target.value)}
              required
              className="nameInput"
            />
            <Input
              placeholder={JPAddMoss.location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="locationInput"
            />
            <UploadWrapper>
              <P>{JPAddMoss.upload}</P>
              <ChooseFile
                type="file"
                onChange={(e) => setPic(e.target.files[0])}
                className="picInput"
              />
              <Button onClick={(e) => postDetails(e)}>
                {JPAddMoss.confirmPic}
              </Button>
              {upload === "uploaded" && <P>{JPAddMoss.uploadSuccess}</P>}
              {upload === "loadingPic" && <P>写真を読み込み中...</P>}
              {upload === "notUploaded" && <P>{JPAddMoss.Unsuccess}</P>}
              {upload === "pleaseSelect" && <P>{JPAddMoss.selectFile}</P>}
            </UploadWrapper>
            <BtnWrapper>
              {location && mossName ? (
                <Btn onClick={(e) => submit(e)}>{JPBtn.submit}</Btn>
              ) : (
                <DisabledBtn disabled={true} onClick={(e) => submit(e)}>
                  {JPBtn.submit}
                </DisabledBtn>
              )}
            </BtnWrapper>

            <Btn type="reset" onClick={clear}>
              {JPBtn.clear}
            </Btn>
            {upload === "error" && <P>{JPAddMoss.Unsuccess}</P>}
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
  width: 400px;
  height: 400px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  background-color: rgba(198, 204, 204, 0.5);
  margin-top: 20px;
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

const BtnWrapper = styled.div`
  margin-bottom: 10px;
`;

export default AddNewMoss;
