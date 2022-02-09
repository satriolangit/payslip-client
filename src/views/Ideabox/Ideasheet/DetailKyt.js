import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { IdeaboxFileUrl } from "../../../setting";

function DetailKyt({ data }) {
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      marginTop: 2,
    },
    row: {
      display: "flex",
      flexDirection: "row",
    },
    cell: {
      flexGrow: 1,
      flexBasis: 0,
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
    font10: {
      fontSize: 10,
    },
    font11: {
      fontSize: 11,
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
    textCenter: {
      display: "flex",
      alignSelf: "center",
    },
  });

  const renderBeforeItem = (title, value) => {
    return (
      <View style={[styles.row, { borderBottom: 1 }]}>
        <View style={{ width: 80, borderRight: 1, paddingLeft: 2 }}>
          <Text style={{ fontSize: 12 }}>{title}:</Text>
        </View>
        <View style={{ flexGrow: 1, paddingLeft: 2 }}>
          <Text style={{ fontSize: 12 }}>{value}</Text>
        </View>
      </View>
    );
  };

  const renderSituation = (text, image) => {
    return (
      <View>
        <View
          style={{ display: "flex", alignItems: "center", borderBottom: 1 }}
        >
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
            Bagaimana hal ini bisa menjadi masalah ? (Situasi)
          </Text>
        </View>
        <View style={styles.row}>
          <View style={{ width: 150, borderRight: 1 }}>
            <Text style={{ fontSize: 11 }}>{text}</Text>
          </View>
          <View
            style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
          >
            <Image source={image} style={{ objectFit: "cover" }} />
          </View>
        </View>
      </View>
    );
  };

  const renderRank = (value) => {
    return (
      <View style={[styles.row, { borderTop: 1, marginTop: 2 }]}>
        <View style={{ width: 200, borderRight: 1 }}>
          <Text style={styles.font11}>Rank 3 Frekuensi Bertambah</Text>
          <Text style={styles.font11}>Rank 2 Terjadi Sewaktu-waktu</Text>
          <Text style={styles.font11}>Rank 1 Jarang Terjadi</Text>
        </View>
        <View style={{ flexGrow: 1 }}>
          <View style={{ borderBottom: 1 }}>
            <Text style={[styles.font12, styles.textCenter]}>Rank</Text>
          </View>
          <View style={{ display: "flex", alignItems: "center" }}>
            <Text style={[styles.font13]}>{value}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.row, { marginTop: 2, borderWidth: 2 }]}>
      <View style={[styles.cell, { borderRight: 1 }]}>
        <View style={{ borderBottom: 1 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              display: "flex",
              alignSelf: "center",
            }}
          >
            Before
          </Text>
        </View>
        <View style={{ borderBottom: 1, height: 50 }}>
          <Text style={{ fontSize: 12 }}>{data.beforeSummary}</Text>
        </View>
        {renderBeforeItem("Kapan", data.beforeKapan)}
        {renderBeforeItem("Dimana", data.beforeDimana)}
        {renderBeforeItem("Siapa", data.beforeSiapa)}
        {renderBeforeItem("Apa", data.beforeApa)}
        {renderBeforeItem("Bagaimana", data.beforeBagaimana)}
        {renderBeforeItem("Apa yg terjadi", data.beforeIncident)}
        {renderSituation(
          data.beforeSituation,
          IdeaboxFileUrl + data.beforeImage
        )}
      </View>
      <View style={[styles.cell]}>
        <View style={{ borderBottom: 1 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              display: "flex",
              alignSelf: "center",
            }}
          >
            After
          </Text>
        </View>
        <View
          style={{ borderBottom: 1, borderBottomStyle: "dotted", height: 180 }}
        >
          <Text style={{ fontSize: 12 }}>{data.afterSummary}</Text>
        </View>
        <View style={{ height: 100 }}>
          <Image
            source={IdeaboxFileUrl + data.afterImage}
            style={{ objectFit: "cover" }}
          />
        </View>
        {renderRank(data.afterRank)}
      </View>
    </View>
  );
}

export default DetailKyt;
