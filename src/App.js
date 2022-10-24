import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import SelectedTrack from './components/selected-track';
import MainWrapper from './components/main-wrapper'
import './styles/variables.css'
import { tracks } from './shared/data'
import { Helmet } from 'react-helmet'
import TracksWrapper from './components/tracks-wrapper';
import Track from './components/track';

function App() {

  const felaRenderer = createRenderer();

  return (
    <>
      <Helmet>
        <title>NBHB Music Player</title>
      </Helmet>
      <RendererProvider renderer={felaRenderer}>
        <MainWrapper>
          <SelectedTrack />
          <TracksWrapper>
            {tracks.map((track) => (
                <Track track={track}></Track>
            ))}
          </TracksWrapper>
        </MainWrapper>
      </RendererProvider>
    </>
  );
}

export default App;
