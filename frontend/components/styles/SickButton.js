import styled from 'styled-components';

const SickButton = styled.button`
  background: red;
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 2rem;
  padding: 0.8rem 1.5rem;
  transform: skew(-2deg);
  display: inline-block;
  transition: all 0.5s;
  cursor: pointer;
  background-image: linear-gradient(to right, #ff0000 70%, #3a3a3a 50%);
  background-position: 0;
  background-size: 200%;
  transition: all 400ms;
  transform: skew(-5deg) rotate(-1deg);
  box-shadow: 1px 2px 1px #1e1f23;

  &:hover {
    background-position: -50%;
    transform: rotate(-3deg);
    box-shadow: 2px 3px 2px #1e1f23;
  }
  &[disabled] {
    opacity: 0.5;
  }
`;

export default SickButton;
