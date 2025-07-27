import React, { useEffect } from "react";
import { View } from "react-native";

const SsoCallback = () => {
  useEffect(() => {
    console.log("ssoCallback is renderred!!");
  }, []);

  return (
    <View>
      {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>sso-callback</Text> */}
      {/* <Link href="/">Go to home</Link> */}
    </View>
  );
};

export default SsoCallback;
