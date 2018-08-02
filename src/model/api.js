import "whatwg-fetch";
import uniq from "lodash.uniq";
import qs from "query-string";
import cached from "./cached";

const API_URL = "https://www.googleapis.com/youtube/v3/";
const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;

const list = async (
  method,
  opts,
  maxResults = 500,
  pageToken = undefined,
  results = []
) => {
  if (!opts) return results;
  opts.maxResults = Math.min(50, maxResults - results.length);
  if (pageToken) opts.pageToken = pageToken;
  opts.key = API_KEY;
  const res = await fetch(`${API_URL}${method}?${qs.stringify(opts)}`);
  if (res.status !== 200) return results;
  const data = await res.json();
  if (data.items) {
    results.splice.apply(results, [results.length, 0].concat(data.items));
  }
  console.log(data.nextPageToken, results.length, maxResults);
  if (data.nextPageToken && results.length < maxResults) {
    return list(method, opts, maxResults, data.nextPageToken, results);
  } else {
    return results;
  }
};

const getPlaylistInfo = cached("playlistinfo", async (playlistId = "") => {
  if (!playlistId) return [];
  const opts = {
    id: playlistId,
    part: "snippet",
    key: API_KEY
  };
  const res = await fetch(`${API_URL}playlists?${qs.stringify(opts)}`);
  const data = await res.json();
  if (data.items.length === 0) return null;
  return data.items[0].snippet;
});

const getVideoIds = cached("playlistids", async (playlistId = "") => {
  if (!playlistId) return [];
  const results = await list("playlistItems", {
    playlistId,
    part: "contentDetails"
  });
  return uniq(
    results
      .filter(item => item.kind === "youtube#playlistItem")
      .map(item => item.contentDetails.videoId)
  );
});

const searchPlaylist = async (q = "", n = 15) => {
  if (!q) return Promise.resolve([]);
  const results = await list(
    "search",
    {
      q,
      part: "snippet",
      safeSearch: "strict"
    },
    n
  );
  return results.map(item => item.snippet);
};

const getPlaylistIds = getVideoIds;
window.getVideoIds = getVideoIds;
window.searchPlaylist = searchPlaylist;
window.getPlaylistInfo = getPlaylistInfo;

const api = { searchPlaylist, getPlaylistIds, getVideoIds, getPlaylistInfo };
export default api;
