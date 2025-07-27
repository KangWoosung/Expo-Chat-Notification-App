// hooks/usePushTokenSyncSupabase.ts
// import { useNotification } from "@/contexts/PushTokenProvider";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

export const usePushTokenSyncSupabase = () => {
  // const { expoPushToken, isLoading, isCachedToken } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [isCachedToken, setIsCachedToken] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const updatePushToken = async () => {
      // If the push token is not available, the user is not authenticated,
      // or the loading state is true, or the cached token is true,
      // skip the DB update
      if (!expoPushToken || !user?.id || isLoading || isCachedToken) {
        if (isCachedToken) {
          console.log("Skipping DB update for cached token");
        }
        return;
      }

      try {
        const { error } = await supabase
          .from("users")
          .update({
            push_token: expoPushToken,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);

        if (error) {
          console.error("Failed to update push token:", error);
        } else {
          console.log("Push token updated successfully");
        }
      } catch (error) {
        console.error("Error updating push token:", error);
      }
    };

    updatePushToken();
  }, [expoPushToken, user?.id, isLoading, isCachedToken]);
};
