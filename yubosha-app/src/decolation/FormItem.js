import styled from "styled-components";

export const Btn = styled.button`
  background: none;
  color: var(--soft-gray);
  border-radius: 5px;
  border: solid 2px var(--soft-gray);
  cursor: pointer;
  padding: 10px 10px;
  font-weight: 500;
  width: 120px;
  height: 40px;

  &:hover {
    background-color: rgba(181, 181, 181, 0.7);
  }
`;

export const DisabledBtn = styled(Btn)`
  background-color: rgba(181, 181, 181, 0.7);
`;

export const FormWrapper = styled.div`
  background-image: url("./assets/tony-anananana-qOXWUIDZOqM-unsplash.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  filter: blur(1.5px);
  height: 400px;
  width: 500px;
  border-radius: 10px;
  margin-top: 60px;

  @media (max-width: 540px){
    width: 400px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 540px){
    width: 400px;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
`;
