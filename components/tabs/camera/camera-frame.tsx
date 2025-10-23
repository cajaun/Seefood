import {
  FRAME_HEIGHT,
  FRAME_TOP,
  FRAME_WIDTH,
  HORIZONTAL_PADDING,
} from "@/components/constants";
import { PressableScale } from "@/components/ui/utils/pressable-scale";
import { CameraView } from "expo-camera";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { StyleSheet, View } from "react-native";

type CameraFrameProps = {
  cameraRef: React.RefObject<CameraView>;
  photoUri: string | null;
  flash: boolean;
  facing: "front" | "back";
  cameraReady: boolean;
  setCameraReady: React.Dispatch<React.SetStateAction<boolean>>;
  setFlash: React.Dispatch<React.SetStateAction<boolean>>;
};

const CameraFrame = ({
  cameraRef,
  photoUri,
  flash,
  facing,
  cameraReady,
  setCameraReady,
  setFlash,
}: CameraFrameProps) => {
  return (
    <View
      style={{
        position: "absolute",
        top: FRAME_TOP,
        left: HORIZONTAL_PADDING,
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        borderRadius: 28,
        overflow: "hidden",
        backgroundColor: "#2C2F2E",
      }}
    >
      {!photoUri ? (
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing={facing}
          enableTorch={flash}
          animateShutter={false}
          onCameraReady={() => setCameraReady(true)}
        />
      ) : (
        <Image
          source={{ uri: photoUri }}
          style={[StyleSheet.absoluteFillObject]}
      
        />
      )}

      {!cameraReady && !photoUri && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: "#2C2F2E",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 20,
            },
          ]}
        />
      )}

      {!photoUri && (
        <PressableScale
          scale={0.75}
          onPress={() => setFlash(!flash)}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 20,
            padding: 5,
          }}
        >
          <SymbolView
            name={flash ? "bolt.fill" : "bolt.slash.fill"}
            size={25}
            tintColor="white"
          />
        </PressableScale>
      )}
    </View>
  );
};

export default CameraFrame;
