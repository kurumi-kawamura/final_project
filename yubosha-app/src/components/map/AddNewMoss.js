import React, { useState } from "react";
import styled from "styled-components";
import ImageUploader from "react-images-upload";
import { Btn } from "../../decolation/FormItem";

const AddNewMoss = () => {
  const [pic, setPic] = useState({ pictures: [] });
  const [mossName, setMossName] = useState(null);
  const [location, setLocation] = useState(null);

  const onDrop = (picFile, picURL) => {
    if (picFile) {
      setPic({ pictures: URL.createObjectURL(picFile) });
    }
  };
  console.log(pic);

  const submit = () => {
    fetch("/addNewMoss", {
      method: "POST",
      body: JSON.stringify({ name: mossName, location: location, src: pic.pictures }),
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
        } else {
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
        <ImageUploader
          withIcon={false}
          withPreview={true}
          label=""
          buttonText="Upload image"
          onChange={(e) => onDrop(e[0])}
          imgExtension={[".jpg", ".gif", ".png", ".svg"]}
        />
        <Btn onClick={submit}>Submit</Btn>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div``;
const Input = styled.input``;

export default AddNewMoss;
