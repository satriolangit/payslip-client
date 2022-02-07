import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";

function DetailUmum({ data }) {
  const sheet = StyleSheet.create({
    container: {
      borderWidth: 1,
    },
    row: {
      display: "flex",
      flexDirection: "row",
    },
    cell: {
      flexGrow: 1,
      flexBasis: 0,
      padding: 2,
      borderWidth: 1,
    },
    cellLeft: {
      flexGrow: 1,
      flexBasis: 0,
      padding: 2,
      borderWidth: 1,
    },
    cellRight: {
      flexGrow: 1,
      flexBasis: 0,
      padding: 2,
      borderTop: 1,
      borderBottom: 1,
      borderRight: 1,
    },
    font12: {
      fontSize: 12,
    },
    font12Strikethrough: {
      fontSize: 12,
      textDecoration: "line-through",
    },
    font8: {
      fontSize: 8,
    },
    font13: {
      fontSize: 13,
    },
    checkbox: {
      height: 20,
      width: 22,
    },
  });

  return (
    <View>
      <View style={[sheet.row, { marginTop: 2 }]}>
        <View style={sheet.cellLeft}>
          <Text
            style={[
              sheet.font12,
              {
                fontWeight: "bold",
                display: "flex",
                alignSelf: "center",
              },
            ]}
          >
            Before
          </Text>
        </View>
        <View style={sheet.cellRight}>
          <Text
            style={[
              sheet.font12,
              {
                fontWeight: "bold",
                display: "flex",
                alignSelf: "center",
              },
            ]}
          >
            After
          </Text>
        </View>
      </View>
      <View style={[sheet.row]}>
        <View style={[sheet.cellLeft, { height: 200 }]}>
          <View
            style={{
              height: 100,
              borderBottom: 1,
              borderBottomStyle: "dotted",
              marginBottom: 5,
            }}
          >
            <Text style={sheet.font12}>{data.beforeSummary}</Text>
          </View>
          <Image
            style={{ width: 250, display: "flex", alignSelf: "center" }}
            src={data.beforeImage}
          />
        </View>
        <View style={[sheet.cellRight, { height: 200 }]}>
          <View
            style={{
              height: 100,
              borderBottom: 1,
              borderBottomStyle: "dotted",
              marginBottom: 5,
            }}
          >
            <Text style={sheet.font12}>{data.afterSummary}</Text>
          </View>
          <Image
            style={{ width: 250, display: "flex", alignSelf: "center" }}
            src={data.afterImage}
          />
        </View>
      </View>
    </View>
  );
}

export default DetailUmum;
