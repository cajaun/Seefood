import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/FirebaseConfig";
import { AppleAuth } from "@/services/apple-auth";
import { router } from "expo-router";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Menu } from "@/types/menu";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  AppleAuth: () => Promise<void>;
  signOut: () => Promise<void>;
  recentMenus: Menu[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentMenus, setRecentMenus] = useState<Menu[]>([]);


  useEffect(() => {
    let unsubscribeMenus: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
 
      if (unsubscribeMenus) {
        unsubscribeMenus();
        unsubscribeMenus = undefined;
      }

      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const menusRef = collection(db, "users", currentUser.uid, "menus");
        const q = query(menusRef, orderBy("createdAt", "desc"));

        unsubscribeMenus = onSnapshot(q, (snapshot) => {
          const menus: Menu[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              originalImageUrl: data.originalImageUrl || "",
              items: Array.isArray(data.items)
                ? data.items.map((item: any) => ({
                    name: item.name ?? "Unknown Item",
                    generatedImages: item.generatedImages ?? [],
                  }))
                : [],
              createdAt: data.createdAt?.toDate?.() ?? null,
            };
          });
          setRecentMenus(menus);
        });
      } else {
        setRecentMenus([]);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeMenus) unsubscribeMenus();
    };
  }, []);


  const signOut = async () => {
    try {
      await auth.signOut();
      router.replace("/(auth)/welcome")
    } catch (e) {
      console.error("Sign out error:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, AppleAuth, signOut, recentMenus}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
