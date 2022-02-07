import React from "react";
import { Text, View, Image } from "@react-pdf/renderer";

import checkboxUnchecked from "./images/checkbox.jpg";
import checkboxChecked from "./images/checkbox-checked.png";

function Impact({ data }) {
  return data.map((item) => {
    return (
      <View key={item.id} style={{ display: "flex", flexDirection: "row" }}>
        <Image
          source={item.checked === 1 ? checkboxChecked : checkboxUnchecked}
          style={{ height: 12, width: 14 }}
        />
        <Text
          style={{ fontSize: 10, display: "flex", alignSelf: "flex-start" }}
        >
          {item.text}
        </Text>
      </View>
    );
  });
}

export default Impact;
