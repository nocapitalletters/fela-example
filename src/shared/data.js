import { atom } from 'jotai';

  export const selectedTrack = atom({
      id: 1001,
      title: 'The Long and Winding Road',
      artist: 'The Beatles',
      image: require('../resources/song1.webp'),
      audio: require('../resources/song1.mp3'),
      //actualAudio: atom(new Audio(this.audio))
  });

  export const tracks = [
    {
      id: 1001,
      title: 'The Long and Winding Road',
      artist: 'The Beatles',
      image: require('../resources/song1.webp'),
      audio: require('../resources/song1.mp3')
    },
    {
      id: 1002,
      title: "I Don't Wanna Face It",
      artist: 'John Lennon',
      image: require('../resources/song2.webp'),
      audio: require('../resources/song2.mp3')
    },
    {
      id: 1003,
      title: 'Step Inside Love / Los Paranoias',
      artist: 'The Beatles',
      image: require('../resources/song3.webp'),
      audio: require('../resources/song3.mp3')
    }
  ];