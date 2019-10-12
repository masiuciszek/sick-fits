import styled from 'styled-components';

export const BtnSlide = styled.button`
  padding: 0.5rem 0.85rem;
  cursor: pointer;
  font-size: 1.3rem;
  text-decoration: none;
  width: 10rem;
  border: 2px solid #1e1f23;
  color: #1e1f23;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.4);
  background-image: linear-gradient(to right, #ff0000 50%, #3a3a3a 50%);
  background-position: 0;
  background-size: 200%;
  transition: all 400ms;
  box-shadow: 1px 2px 1px #1e1f23;
  &:hover {
    background-position: -100%;
    color: #fefeee;
    transform: rotate(-7deg);
    box-shadow: 2px 3px 2px #1e1f23;
  }
`;
