import { createRenderer } from 'fela'
import { RendererProvider } from 'react-fela'
import Image from './components/image';
import Wrapper from './components/wrapper';
import Heading from './components/typography/heading';
import PlayControl from './components/play-control';
import './styles/variables.css'
import { albumData } from './shared/data'
import { Helmet } from 'react-helmet'

function App() {

  const felaRenderer = createRenderer();
  const imageSize = 500;
  const audio = new Audio(albumData[0].audio);

  return (
    <>
    <Helmet>
      <title>NBHB</title>
    </Helmet>
    <RendererProvider renderer={felaRenderer}>
      <Wrapper size={imageSize}>
        <Image size={imageSize} src={albumData[0].image} alt={albumData[0].artist}/>
        <Heading fontSize={36} text={albumData[0].artist}/>
        <Heading h2 text={albumData[0].title} />
        <PlayControl pauseColor={'--maximum-yellow'} playColor={'#050505ff'} audio={audio}/>
      </Wrapper>
    </RendererProvider>
    </>
  );
}

export default App;
