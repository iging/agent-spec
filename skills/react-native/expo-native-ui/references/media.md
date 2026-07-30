# Media (Camera, Audio, Video)

> [!IMPORTANT]  
> **Always request permissions eagerly for primary features.** If your app is a camera app, request the camera immediately. However, request secondary permissions (like saving to the Media Library) *lazily* (only when the user taps "Save"). 

## Anti-Patterns (DO NOT DO THIS)

> [!WARNING]  
> **Never use the legacy `expo-av` module.** 
> It is an older, bloated package that attempts to handle both audio and video poorly. It has been completely replaced by purpose-built modules.
> 
> ❌ `import { Audio, Video } from 'expo-av';` (BANNED)
> ✅ `import { useAudioPlayer } from 'expo-audio';` (REQUIRED)
> ✅ `import { useVideoPlayer } from 'expo-video';` (REQUIRED)

> [!CAUTION]
> **Never use intrinsic elements like `<img>` or `<video>` outside of Expo DOM components.** You are building a native application. Use `<Image>` (from `expo-image`) or `<VideoView>` (from `expo-video`).

## Camera Integration

When building a full-screen camera, you must hide the navigation headers and account for safe area insets so the capture buttons don't overlap the OS home indicator.

```tsx
import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import { colors } from "@/theme/colors";
import { GlassView } from "expo-glass-effect";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function CameraScreen({ onPicture }: { onPicture: (uri: string) => Promise<void> }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [type, setType] = useState<CameraType>("back");
  const { bottom } = useSafeAreaInsets();

  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.systemBackground }}>
        <Text style={{ color: colors.label, padding: 16 }}>Camera access is required</Text>
        <GlassView isInteractive tintColor={colors.systemBlue} style={{ borderRadius: 12 }}>
          <TouchableOpacity onPress={requestPermission} style={{ padding: 12, borderRadius: 12 }}>
            <Text style={{ color: "white" }}>Grant Permission</Text>
          </TouchableOpacity>
        </GlassView>
      </View>
    );
  }

  const takePhoto = async () => {
    await Haptics.selectionAsync(); // Provide immediate tactile feedback
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
    if (photo?.uri) await onPicture(photo.uri);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* mirror prop ensures the front camera doesn't save flipped images */}
      <CameraView ref={cameraRef} mirror style={{ flex: 1 }} facing={type} />
      
      <View style={{ position: "absolute", left: 0, right: 0, bottom: bottom + 20, alignItems: "center" }}>
        <GlassView isInteractive style={{ padding: 8, borderRadius: 99 }}>
          <TouchableOpacity
            onPress={takePhoto}
            style={{ width: 64, height: 64, borderRadius: 99, backgroundColor: "white" }}
          />
        </GlassView>
      </View>
    </View>
  );
}
```

## Audio Playback

Use `expo-audio` for high-performance, low-latency audio playback.

```tsx
import { useAudioPlayer } from "expo-audio";
import { Button } from "react-native";

function AudioPlayer() {
  const player = useAudioPlayer({
    uri: "https://stream.nightride.fm/rektory.mp3",
  });

  return <Button title="Play" onPress={() => player.play()} />;
}
```

## Audio Recording (Microphone)

Use `expo-audio` for recording. You must request microphone permissions manually using `AudioModule`.

```tsx
import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState,
} from "expo-audio";
import { useEffect } from "react";
import { Alert, Button } from "react-native";

function VoiceRecorder() {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (status.granted) {
        // Allows recording and ensures playback doesn't mute when hardware ringer is off
        setAudioModeAsync({ playsInSilentMode: true, allowsRecording: true });
      } else {
        Alert.alert("Permission denied", "Microphone access is required.");
      }
    })();
  }, []);

  const toggleRecord = async () => {
    if (recorderState.isRecording) {
      audioRecorder.stop();
    } else {
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
    }
  };

  return (
    <Button
      title={recorderState.isRecording ? "Stop Recording" : "Start Recording"}
      onPress={toggleRecord}
    />
  );
}
```

## Video Playback

Use `expo-video` for native video decoding.

> [!TIP]
> **Picture in Picture (PiP)**: Expo Video supports native iOS/Android PiP out of the box using `allowsPictureInPicture`.

```tsx
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

const videoSource = "https://example.com/video.mp4";

function Player() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  // Reactive event listener for state changes
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <VideoView 
      player={player} 
      style={{ width: '100%', aspectRatio: 16 / 9 }}
      allowsPictureInPicture 
      nativeControls={true}
      contentFit="contain" 
    />
  );
}
```

## Saving Media to Device Gallery

Use `expo-media-library`. **Do not ask for this permission on app startup.** Wait until the user actually taps a "Save to Gallery" button.

```tsx
import * as MediaLibrary from "expo-media-library";

async function saveImage(uri: string) {
  const { granted } = await MediaLibrary.requestPermissionsAsync();
  if (granted) {
    await MediaLibrary.saveToLibraryAsync(uri);
  }
}
```

### Saving Base64 Images

`MediaLibrary.saveToLibraryAsync` only accepts local file paths. If you have generated a base64 image (like an AI generated image), you must write it to disk first using `expo-file-system/next`.

```tsx
import { File, Paths } from "expo-file-system/next";

function base64ToLocalUri(base64: string, filename?: string) {
  if (!filename) {
    // Extract extension from data URI if present
    const match = base64.match(/^data:(image\/[a-zA-Z]+);base64,/);
    const ext = match ? match[1].split("/")[1] : "jpg";
    filename = `generated-${Date.now()}.${ext}`;
  }

  if (base64.startsWith("data:")) base64 = base64.split(",")[1];
  
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(new ArrayBuffer(len));
  for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);

  const file = new File(Paths.cache, filename);
  file.create({ overwrite: true });
  file.write(bytes); // Write binary data to disk
  return file.uri;
}
```
