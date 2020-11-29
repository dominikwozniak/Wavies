import React from 'react';
import { gql, useQuery } from '@apollo/client';
import './styles/app.scss';
import Wavies from './components/Wavies';
import Loading from './components/Loading';

const GET_MUSIC = gql`
  {
    musicID {
      id
      name
      artist
      cover
      audio
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_MUSIC);
  if (loading || !data || error) return <Loading />;
  const { musicID } = data;

  return (
    <>
      <Wavies data={musicID} />
    </>
  );
}

export default App;
