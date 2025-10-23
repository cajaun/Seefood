import { PressableScale } from "@/components/ui/utils/pressable-scale";
import { SymbolView } from "expo-symbols";
import { View } from "react-native";

type CaptureControlsProps = {
  photoUri: string | null;
  bottomInset: number;
  handleCapture: () => void;
  handleConfirm: () => void;
  handleToggleCamera: () => void;
  handlePickImage: () => void;
  setPhotoUri: React.Dispatch<React.SetStateAction<string | null>>;
};

const CaptureControls = ({
  photoUri,
  bottomInset,
  handleCapture,
  handleConfirm,
  handleToggleCamera,
  handlePickImage,
  setPhotoUri,
}: CaptureControlsProps) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: bottomInset + 130,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 40,
      }}
    >
      <PressableScale
        scale={0.75}
        onPress={() => {
          if (photoUri) setPhotoUri(null);
          else handlePickImage();
        }}
      >
        <SymbolView
          name={photoUri ? "xmark" : "photo.on.rectangle.angled"}
          size={40}
          tintColor="white"
        />
      </PressableScale>

      <View
        style={{
          width: 85,
          height: 85,
          borderRadius: 42.5,
          borderWidth: 4,
          borderColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PressableScale
          scale={0.75}
          onPress={photoUri ? handleConfirm : handleCapture}
        >
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: photoUri ? "#2D2F2E" : "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {photoUri && (
              <SymbolView name="checkmark" size={30} tintColor="white" />
            )}
          </View>
        </PressableScale>
      </View>

      <PressableScale scale={0.75} onPress={handleToggleCamera}>
        <SymbolView
          name="arrow.trianglehead.2.clockwise.rotate.90"
          size={40}
          tintColor="white"
        />
      </PressableScale>
    </View>
  );
};

export default CaptureControls;
