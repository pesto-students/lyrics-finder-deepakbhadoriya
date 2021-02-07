const baseUrl = new URL('https://api.lyrics.ovh');

const getSongs = async ({ setLoading, setData, setAlert, searchKeyword = '' }) => {
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

const getMoreSongs = async ({ setLoading, setData, setAlert, searchKeyword, index, songsList }) => {
  setLoading(true);
  try {
    const apiUrl = new URL(`${baseUrl}/suggest/${searchKeyword}&index=${index}`);
    const res = await fetch(apiUrl);
    const data = await res.json();
    setData({ ...songsList, data: [...songsList.data, ...data.data] });
    setLoading(false);
  } catch (error) {
    // ? using Static Error as api don't return error message
    setAlert({ message: 'Failed to Fetch', type: 'error' });
    console.log(error);
    setLoading(false);
  }
};

const getSongLyrics = async ({ setLoading, setData, setAlert, artistName, song }) => {
  setLoading(true);
  try {
    const apiUrl = new URL(`${baseUrl}/v1/${artistName}/${song}`);
    const res = await fetch(apiUrl);
    const data = await res.json();

    setData(data.lyrics === '' ? 'No lyrics present' : data.lyrics);
    setLoading(false);
  } catch (error) {
    // ? using Static Error as api don't know return error message
    setAlert({ message: 'Failed to Fetch', type: 'error' });
    console.log(error);
    setData(null);
    setLoading(false);
  }
};

const songActions = { getSongs, getMoreSongs, getSongLyrics };

export default songActions;
