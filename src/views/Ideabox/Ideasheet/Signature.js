import React from "react";
import { Text, View } from "@react-pdf/renderer";

function Signature({ submittedBy, reviewedBy, approvedBy, acceptedBy }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
      }}
    >
      <View style={{ flexGrow: 1, flexBasis: 0 }}>
        <View style={{ display: "flex", alignItems: "center", borderWidth: 1 }}>
          <Text style={{ fontSize: 12 }}>Diterima</Text>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderLeft: 1,
            borderRight: 1,
            borderBottom: 1,
            height: 50,
          }}
        >
          <Text style={{ fontSize: 12 }}>{acceptedBy}</Text>
        </View>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text style={{ fontSize: 10 }}>Komite Idea Box</Text>
        </View>
      </View>

      <View style={{ flexGrow: 1, flexBasis: 0 }}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            borderTop: 1,
            borderRight: 1,
            borderBottom: 1,
          }}
        >
          <Text style={{ fontSize: 12 }}>Disetujui</Text>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: 1,
            borderBottom: 1,
            height: 50,
          }}
        >
          <Text style={{ fontSize: 12 }}>{approvedBy}</Text>
        </View>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text style={{ fontSize: 10 }}>Departement Manager</Text>
        </View>
      </View>

      <View style={{ flexGrow: 1, flexBasis: 0 }}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            borderTop: 1,
            borderRight: 1,
            borderBottom: 1,
          }}
        >
          <Text style={{ fontSize: 12 }}>Diperiksa</Text>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: 1,
            borderBottom: 1,
            height: 50,
          }}
        >
          <Text style={{ fontSize: 12 }}>{reviewedBy}</Text>
        </View>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text style={{ fontSize: 10 }}>Section Manager / Group Head</Text>
        </View>
      </View>

      <View style={{ flexGrow: 1, flexBasis: 0 }}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderBottom: 1,
          }}
        >
          <Text style={{ fontSize: 12 }}>Dibuat</Text>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: 1,
            borderBottom: 1,
            height: 50,
          }}
        >
          <Text style={{ fontSize: 12 }}>{submittedBy}</Text>
        </View>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text style={{ fontSize: 10 }}>Pembuat Ide</Text>
        </View>
      </View>
    </View>
  );
}

export default Signature;
