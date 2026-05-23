import React from "react";

// ================= CORE AUTH =================
import { AuthProvider } from "./AuthContext";

// ================= FEATURE PROVIDERS =================
import { ProfileProvider } from "../features/profile/context/ProfileContext";
import { BookingProvider } from "./BookingContext";
import { WalletProvider } from "./WalletContext";
import { NotificationProvider } from "./NotificationContext";

// ================= CHAT =================
import { ChatProvider } from "../features/chat/context/ChatContext";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ChatProvider>
        <ProfileProvider>
          <WalletProvider>
            <BookingProvider>
              <NotificationProvider>
                {children}
              </NotificationProvider>
            </BookingProvider>
          </WalletProvider>
        </ProfileProvider>
      </ChatProvider>
    </AuthProvider>
  );
};

export default AppProviders;