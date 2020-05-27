import React, { useContext } from "react";

import { Button, Input } from "react-native-elements";
import Spacer from "./Spacer";

import { Context as LocationContext } from "../context/LocationContext";

import useSaveTrack from "../hooks/useSaveTrack";

const TrackFrom = () => {
  const {
    state: { recording, name, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);

  //console.log(locations.length);

  const readyToSave = !recording && locations.length > 0;

  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Spacer>
        <Input value={name} onChangeText={changeName} placeholder="Entre Track Title" />
      </Spacer>
      <Spacer>
        {recording ? (
          <Button title="Stop" onPress={stopRecording} />
        ) : (
          <Button title="Start Recording" onPress={startRecording} />
        )}
      </Spacer>
      {readyToSave ? (
        <Spacer>
          <Button title="Save Recording" onPress={saveTrack} />
        </Spacer>
      ) : null}
    </>
  );
};

export default TrackFrom;
