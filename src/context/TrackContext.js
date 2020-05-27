import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => async () => {
  const response = await trackerApi.get("/api/tracks");
  const tracks = response.data.tracks;
  //console.log("TRACKCONTEXT", tracks);
  dispatch({ type: "fetch_tracks", payload: tracks });
};
const createTrack = (dispatch) => async (name, locations) => {
  await trackerApi.post("/api/tracks", { name, locations });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
);
