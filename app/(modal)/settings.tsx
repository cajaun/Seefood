import { View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Form from "@/components/ui/utils/forms";
import { useAuth } from "@/context/auth-context";

const Settings = () => {
  const { bottom } = useSafeAreaInsets();

  const { signOut } = useAuth();

  return (
    <View
      className="w-full flex-1 bg-[#161C1B]"

    >
      <Form.List
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingBottom: bottom }}
        contentContainerStyle={{
          paddingBottom: bottom + 32,
        }}
      >
        <Form.Section title="Settings">
          <Form.Text hint="cajaun@yahoo.com" systemImage={{ name: "envelope" }}>
            Edit Profile
          </Form.Text>
          <Form.Text hint="Free Plan" systemImage={{ name: "creditcard" }}>
            Wallet
          </Form.Text>
          <Form.Link href="/" systemImage={{ name: "arrow.up.circle" }}>
            Appearance
          </Form.Link>
          <Form.Link href="/" systemImage={{ name: "paintbrush" }}>
            Notifications
          </Form.Link>
          <Form.Link href="/" systemImage={{ name: "paintbrush" }}>
            Rate Believe
          </Form.Link>
          <Form.Link href="/" systemImage={{ name: "paintbrush" }}>
            Share feedback
          </Form.Link>
        </Form.Section>

        <Form.Section title="Privacy & Safety">
          <Form.Link href="/" systemImage={{ name: "lock.shield" }}>
            Privacy Policy
          </Form.Link>
          <Form.Link href="/" systemImage={{ name: "doc.text" }}>
            Terms of Service
          </Form.Link>
        </Form.Section>

        <Form.Section title="Support">
          <Form.Link href="/" systemImage={{ name: "questionmark.circle" }}>
            Help & Support
          </Form.Link>
          <Form.Link href="/" systemImage={{ name: "bubble.left" }}>
            Send Feedback
          </Form.Link>
        </Form.Section>

        <Form.Section title="About">
          <Form.Text hint="v1.0.0" systemImage={{ name: "info.circle" }}>
            App Version
          </Form.Text>
          <Form.Link href="/" systemImage={{ name: "doc.plaintext" }}>
            Open Source Licenses
          </Form.Link>
        </Form.Section>

        <Form.Section>
          <Form.Text
            systemImage={{
              name: "rectangle.portrait.and.arrow.right",
            }}
            style={{ color: "red" }}
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
