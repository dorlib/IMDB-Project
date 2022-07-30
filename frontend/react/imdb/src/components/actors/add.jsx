import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  height: 48px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`;

export const SubmitButton = styled.button`
  position: absolute;
  top: 36rem;
  left: 10rem;
  width: 60%;
  padding: 11px 22%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: #cc2062;
  background: linear-gradient(
    58deg,
    #cc2062,
    #cc2062
  );

  &:hover {
    filter: brightness(1.03);
  }
`;