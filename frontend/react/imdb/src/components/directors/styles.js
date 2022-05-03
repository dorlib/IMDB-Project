import styled from "styled-components";

const Card = styled.div`
  display: flex;
  position: relative;
  background-color: ${({ isEmpty }) => (isEmpty ? "#cc2062" : "#cc2062")};
  height: 100%;
  overflow: hidden;
`;

const DropDown = styled.div`
  background-color: #cc2062;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Footer = styled.div`
  display: flex;
  position: relative;
  background-color: #cc2062;
  width: 100%;
  height: 60px; /* changed */
  font-size: 20px;
  line-height: 12px;
  color: #1976D2;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out; /* added */
  overflow: hidden; /* added */

  span {
    padding: 8px 11px;
  }

  .accordion {
    padding: 10px 15px 80px; /* changed */
    
  }

  &.show {
    height: ${({ setHeight }) => setHeight}px;
  }
`;

export { Card, Footer, DropDown };
