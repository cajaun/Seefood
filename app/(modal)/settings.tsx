import { View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Form from "@/components/ui/utils/forms";
import { useAuth } from "@/context/auth-context";

const Settings = () => {
  const { bottom } = useSafeAreaInsets();
  const { signOut, user } = useAuth();

  return (
    <View className="flex-1 w-full bg-[#161C1B]">
      <Form.List
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingBottom: bottom }}
        contentContainerStyle={{
          paddingBottom: bottom * 2,
        }}
      >
  
        <Form.Section title="Profile">
          <Form.Text
            hint={user?.email ?? "Not signed in"}
            systemImage={{ name: "person.circle.fill" }}
          >
            Account
          </Form.Text>
          <Form.Text hint="Free Plan" systemImage={{ name: "sparkles.rectangle.stack.fill" }}>
            Upgrade Plan
          </Form.Text>
        </Form.Section>

    
        <Form.Section title="Preferences">
          <Form.Link href="/" systemImage={{ name: "paintbrush.fill" }}>
            App Appearance
          </Form.Link>
          <Form.Link href="/" systemImage={{ name: "bell.badge.fill" }}>
            Notifications
          </Form.Link>
          <Form.Link href="/" systemImage={{ name: "camera.viewfinder" }}>
            Camera Settings
          </Form.Link>
          <Form.Link href="/" systemImage={{ name: "photo.on.rectangle.angled" }}>
            Image History
          </Form.Link>
        </Form.Section>

     
        <Form.Section title="Support">
          <Form.Link href="/" systemImage={{ name: "questionmark.circle.fill" }}>
            Help Center
          </Form.Link>
          <Form.Link href="/" systemImage={{ name: "bubble.left.and.bubble.right.fill" }}>
            Send Feedback
          </Form.Link>
          <Form.Link href="/" systemImage={{ name: "heart.fill" }}>
            Rate Seefood
          </Form.Link>
        </Form.Section>


        <Form.Section title="Privacy & Safety">
          <Form.Link href="/" systemImage={{ name: "lock.shield.fill" }}>
            Privacy Policy
          </Form.Link>
          <Form.Link href="/" systemImage={{ name: "doc.text.fill" }}>
            Terms of Service
          </Form.Link>
        </Form.Section>

     
        <Form.Section title="About">
          <Form.Text hint="v1.0.0" systemImage={{ name: "info.circle.fill" }}>
            App Version
          </Form.Text>
          <Form.Link href="/" systemImage={{ name: "doc.plaintext.fill" }}>
            Open Source Licenses
          </Form.Link>
        </Form.Section>


        <Form.Section title="Danger Zone">
          <Form.Text
            systemImage={{ name: "rectangle.portrait.and.arrow.right.fill" }}
            style={{ color: "#FF4D4F" }}
            onPress={async () => {
              await signOut();
            }}
          >
            Logout
          </Form.Text>
        </Form.Section>
      </Form.List>
    </View>
  );
};

export default Settings;
