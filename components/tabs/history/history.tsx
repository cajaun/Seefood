import React, { useRef, useState } from "react";
import { View, FlatList, ViewToken} from "react-native";
import { HistoryHeader } from "./history-header";
import { HistoryFooter } from "./history-footer";
import { HistoryItem } from "./history-item";
import { HistoryEmptyState } from "./history-empty-state";
import { useActionTray } from "@/context/action-tray-context";
import { Menu, MenuItem } from "@/types/menu";
import { HistoryTrayContent } from "./action-tray/history-tray-content";
import { HistoryTrayHeader } from "./action-tray/history-tray-header";
import { HistoryItemList } from "./history-item-list";
import { Image } from "expo-image";
import KeyViewButton from "@/components/action-tray/content/keyViewButton";
import { SymbolView } from "expo-symbols";

type HistoryTabProps = {
  scrollToTab?: (key: string) => void;
  recentMenus?: Menu[];
};

export default function HistoryTab({ scrollToTab, recentMenus = [] }: HistoryTabProps) {
  const { openTray, closeTray } = useActionTray();
  const [currentMenu, setCurrentMenu] = useState<Menu | null>(recentMenus[0] || null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentMenu(viewableItems[0].item as Menu);
      }
    }
  ).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const openItemInTray = (menuItem: MenuItem) => {
    if (!menuItem) return;

    const contentMap = {
      1: (
        <HistoryTrayContent>
          <HistoryTrayHeader title={menuItem.name} onClose={closeTray} />
          {menuItem.generatedImages?.[0] && (
            <>
          
           <View
           style={{
             justifyContent: "center", 
             alignItems: "center",     
             flex: 1,                 
           }}
         >
           <Image
             source={{ uri: menuItem.generatedImages[0] }}
             style={{ width: 180, height: 180, borderRadius: 16 }}
           />
            </View>
           <View style={{ flexDirection: "row", gap: 16, paddingHorizontal: 24 }}>
            <KeyViewButton
               onPress={() => openMenuItemsInTray()} 
              text="Cancel"
                textColor="white"
              backgroundColor={"#2C2F2E"}
            />
          
          </View>
        
         </>
          )}

        </HistoryTrayContent>
      ),
    };

    openTray(1, contentMap);
  };

  const openMenuItemsInTray = () => {
    if (!currentMenu) return;

    const contentMap = {
      0: (
        <HistoryTrayContent>
          <HistoryTrayHeader title="Menu Items" onClose={closeTray} />
          <HistoryItemList items={currentMenu.items || []} onItemPress={openItemInTray} />
        </HistoryTrayContent>
      ),
    };

    openTray(0, contentMap);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#151C1B" }}>
      <HistoryHeader onPress={() => scrollToTab?.("camera")} />

      {recentMenus.length > 0 ? (
        <FlatList
          data={recentMenus}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryItem item={item} />}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          decelerationRate="fast"
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewConfigRef.current}
        />
      ) : (
        <HistoryEmptyState />
      )}

      <HistoryFooter onPress={openMenuItemsInTray} />
    </View>
  );
}
