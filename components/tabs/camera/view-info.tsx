import ShimmerText from "@/components/ui/shimmer";
import { PressableScale } from "@/components/ui/utils/pressable-scale";
import { SymbolView } from "expo-symbols";
import { View } from "react-native";

type ViewInfoProps = { bottomInset: number; isGenerating: boolean };

const ViewInfo = ({ bottomInset, isGenerating }: ViewInfoProps) => {
  return (
    <PressableScale
      style={{
        position: "absolute",
        bottom: bottomInset,
        alignSelf: "center",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
          padding: 12,
        }}
      >
        <ShimmerText
          shimmer={isGenerating}
          style={{
            fontFamily: "Sf-bold",
            color: "#525252",
            textAlign: "center",
            fontSize: 22,
            lineHeight: 28,
            letterSpacing: 0.2,
          }}
        >
          {isGenerating ? "Creating images" : "View menu"}
        </ShimmerText>
      </View>

      <SymbolView
        name="chevron.compact.down"
        size={35}
        tintColor="white"
        weight="semibold"
      />
    </PressableScale>
  );
};

export default ViewInfo;
