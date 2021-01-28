const baseUrl = new URL('https://api.lyrics.ovh');

const getSongs = async ({ setLoading, setData, searchKeyword }) => {
  setLoading(true);
  try {
    const apiUrl = new URL(`${baseUrl}/suggest/${searchKeyword}`);
    const res = await fetch(apiUrl);
    const data = await res.json();
    setData(data);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setData(null);
    setLoading(false);
  }
};

const getMoreSongs = async ({ setLoading, setData, url, songsList }) => {
  setLoading(true);
  try {
    const res = await fetch(url);
    const data = await res.json();
    setData({ ...songsList, data: [...songsList.data, data.data], next: data.next });
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

const getSongLyrics = async ({ setLoading, setData, artistName, song }) => {
  setLoading(true);
  try {
    const apiUrl = new URL(`${baseUrl}/v1/${artistName}/${song}`);
    const res = await fetch(apiUrl);
    const data = await res.json();
    setData(data.lyrics === '' ? 'No lyrics present' : data.lyrics);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setData(null);
    setLoading(false);
  }
};

const songActions = { getSongs, getMoreSongs, getSongLyrics };

export default songActions;
