import styled from 'styled-components';

import '@/App.css';
import { MainPage } from './pages';

function App() {
  return (
    <Main>
      <MainPage />
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
