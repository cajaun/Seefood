import React from "react";
import { View } from "react-native";

export function HistoryTrayContent({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ gap: 24 }}>
    
      {children}
      
    </View>
  );
}
