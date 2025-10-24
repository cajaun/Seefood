import React from "react";
import { View, Image, Text } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../constants";
import { FRAME_HEIGHT, FRAME_TOP, FRAME_WIDTH } from "@/components/constants";
import { Menu } from "@/types/menu";
import { Timestamp } from "firebase/firestore";

type HistoryItemProps = {
  item: Menu;
};

export const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  const createdAtDate =
    item.createdAt instanceof Timestamp ? item.createdAt.toDate() : new Date();

  const createdAtString = createdAtDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const firstThreeItems = item.items.slice(0, 3);

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignItems: "center", 
        backgroundColor: "#151C1B",
        paddingTop: FRAME_TOP,
      }}
    >

      <View
        style={{
          width: FRAME_WIDTH,
          borderRadius: 28,
          overflow: "hidden",
          backgroundColor: "#2C2F2E",
        }}
      >
        <Image
          source={{ uri: item.originalImageUrl }}
          style={{ width: FRAME_WIDTH, height: FRAME_HEIGHT }}
          resizeMode="cover"
        />
      </View>


      <View style={{ paddingVertical: 12, alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Sf-bold",
            textAlign: "center",
            fontSize: 20,
            lineHeight: 26,
            letterSpacing: 0.2,
            color: "#ffffff99",
          }}
        >
          {createdAtString}
        </Text>
      </View>


      <View
        style={{
          width: SCREEN_WIDTH, 
          paddingHorizontal: 12,
          gap: 16,
          alignItems: "flex-start", 
        }}
      >
        {firstThreeItems.map((menuItem, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#2C2F2E",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontFamily: "Sf-black",
                  fontSize: 18,
                }}
              >
                {index + 1}
              </Text>
            </View>

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 18,
                color: "#ffffff",
                fontFamily: "Sf-black",
                flexShrink: 1,
              }}
            >
              {menuItem.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
