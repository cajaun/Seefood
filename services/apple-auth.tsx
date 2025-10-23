import { OAuthProvider, signInWithCredential } from "firebase/auth";
import * as AppleAuthentication from "expo-apple-authentication";
import { auth } from "@/FirebaseConfig";
import { router } from "expo-router";

export const AppleAuth = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (!credential.identityToken) throw new Error("No identity token returned from Apple");

    const provider = new OAuthProvider("apple.com");
    const appleCredential = provider.credential({ idToken: credential.identityToken });

    await signInWithCredential(auth, appleCredential);

    router.replace("/(root)");

  } catch (e: any) {
    if (e.code === "ERR_REQUEST_CANCELED") {
      console.log("User cancelled Apple sign-in");
    } else {
      console.error("Apple Sign-In Error:", e);
    }
  }
};

export const AppleAuthButton = () => {
  return (
    <AppleAuthentication.AppleAuthenticationButton
    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
    cornerRadius={300}
    style={{ width: "100%", height: 50 }}
    onPress={AppleAuth} 
  />
  )
}