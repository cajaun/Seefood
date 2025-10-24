import ShimmerText from "@/components/ui/shimmer";
import { PressableScale } from "@/components/ui/utils/pressable-scale";
import { SymbolView } from "expo-symbols";
import { Text, View } from "react-native";

type ViewInfoProps = {
  bottomInset: number;
  isGenerating: boolean;
  scrollToTab?: (key: string) => void;
};

const ViewInfo = ({
  bottomInset,
  isGenerating,
  scrollToTab,
}: ViewInfoProps) => {
  return (
    <PressableScale
      onPress={() => scrollToTab?.("Scans")}
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
        {isGenerating ? (
          <ShimmerText
            fixedWidth={180}
            fixedHeight={30}
            style={{
              fontFamily: "Sf-bold",
              color: "#525252",
              textAlign: "center",
              fontSize: 22,
              lineHeight: 28,
              letterSpacing: 0.2,
            }}
          >
            Creating images
          </ShimmerText>
        ) : (
          <View
           
          >
            <Text
              style={{
                fontFamily: "Sf-bold",
                color: "#525252",
                textAlign: "center",
                fontSize: 22,
                lineHeight: 28,
                letterSpacing: 0.2,
                width: 180,
                height: 30,
              }}
            >
              View Menu
            </Text>
          </View>
        )}
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
