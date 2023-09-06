import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import '@/App.css';

function App() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15%;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-color: #cae9ff;
`;

export default App;
