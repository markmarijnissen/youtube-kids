import api from "./api";

const state = {
  playlistIds: [],
  playlistId: null,
  videoIds: [],
  videoId: null
};

const strIds = localStorage.ids;
const match = location.hash.match(
  /^#\/([^/]+)(\/([0-9]{1,3})\/([0-9]{1,3}))?$/
);

if (match) {
  state.playlistIds = match[1].split(",");
  if (match[3] && match[4]) {
    const playlistId = state.playlistIds[match[3] * 1.0];
    const videoIndex = match[4] * 1.0;
    api.getVideoIds(playlistId).then(ids => {
      state.playlistId = playlistId;
      state.videoIds = ids;
      state.videoId = ids[videoIndex];
    });
  }
} else if (strIds) {
  state.playlistIds = strIds.split(",");
}

export default state;
