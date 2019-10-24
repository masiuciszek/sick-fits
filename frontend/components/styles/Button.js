import styled from 'styled-components';

export const BtnSlide = styled.button`
  cursor: pointer;
  font-size: 1.3rem;
  text-decoration: none;
  width: 10rem;
  border: 2px solid #1e1f23;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.4);
  background-image: linear-gradient(to right, #ff0000 70%, #3a3a3a 50%);
  background-position: 0;
  background-size: 300%;
  transition: all 400ms;
  transform: skew(-5deg) rotate(-1deg);
  box-shadow: 1px 2px 1px #1e1f23;
  line-height: 1.3;
  font-size: 2rem;
  text-align: center;
  color: white;
  padding: 0 1rem;

  &:hover {
    background-position: -100%;
    color: #fefeee;
    transform: rotate(-7deg);
    box-shadow: 2px 3px 2px #1e1f23;
  }
`;
