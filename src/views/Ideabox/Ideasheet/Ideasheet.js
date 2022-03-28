import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

import logo from "./images/logo.png";
import logoMaster from "./images/logo-master.png";
import logo3tahun from "./images/3tahun.png";
import checkboxUnchecked from "./images/checkbox.jpg";
import checkboxChecked from "./images/checkbox-checked.png";
import Impact from "./Impact";
import Signature from "./Signature";
import DetailUmum from "./DetailUmum";
import DetailKyt from "./DetailKyt";

const Ideasheet = ({ data, width }) => {
  console.log("ideasheet data:", data);

  const { master, detail, comment, impact } = data;

  const styles = StyleSheet.create({
    page: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    viewer: {
      width: width,
      height: 1200,
    },
    header: {
      flexDirection: "row",
      display: "flex",
      paddingTop: 5,
      paddingLeft: 5,
      paddingRight: 5,
    },
  });

  const kop = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      borderWidth: 2,
      marginTop: 5,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      alignContent: "center",
    },
  });

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
      borderWidth: 1,
    },
    cellLeft: {
      flexGrow: 1,
      flexBasis: 0,
      borderWidth: 1,
    },
    cellRight: {
      flexGrow: 1,
      flexBasis: 0,
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
      height: 12,
      width: 14,
    },
  });

  const renderPdf = () => {
    return (
      <PDFViewer style={styles.viewer}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <View style={{ flexGrow: 1 }}>
                <Image src={logo} style={{ width: 250 }} />
              </View>
              <View style={{ flexGrow: 1 }}></View>
              <View style={{ flexGrow: 1 }}>
                <View style={{ borderWidth: 1, padding: 1, flexGrow: 1 }}>
                  <Text style={{ fontSize: 10 }}>
                    Tgl. Efektif : 3 Januari 2022
                  </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View
                    style={{
                      borderWidth: 1,
                      padding: 1,
                      flexGrow: 1,
                      textAlign: "right",
                    }}
                  >
                    <Text style={{ fontSize: 10 }}>No. Document</Text>
                  </View>
                  <View
                    style={{
                      borderTop: 1,
                      borderBottom: 1,
                      borderRight: 1,
                      padding: 1,
                      flexGrow: 1,
                    }}
                  >
                    <Text style={{ fontSize: 10 }}>S-FR-HR-049/4</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={kop.container}>
              <View style={kop.section}>
                <Image src={logoMaster} style={{ width: 120 }} />
              </View>
              <View style={kop.section}>
                <Text
                  style={{ fontSize: 16, display: "flex", alignSelf: "center" }}
                >
                  IDEA SHEET
                </Text>
              </View>
              <View style={kop.section}>
                <Image src={logo3tahun} style={{ width: 100 }} />
              </View>
            </View>
            <View style={{ borderWidth: 1 }}>
              <View style={sheet.row}>
                <View style={sheet.cellLeft}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: 80 }}>
                      <Text style={sheet.font12}>Nama</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text style={sheet.font12}>:</Text>
                    </View>
                    <View style={{ flexGrow: 1 }}>
                      <Text style={sheet.font12}>{master.submitterName}</Text>
                    </View>
                  </View>
                </View>
                <View style={sheet.cellRight}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: 80 }}>
                      <Text style={sheet.font12}>NIK</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text style={sheet.font12}>:</Text>
                    </View>
                    <View style={{ flexGrow: 1 }}>
                      <Text style={sheet.font12}>{master.submittedBy}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={sheet.row}>
                <View style={sheet.cellLeft}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: 80 }}>
                      <Text style={sheet.font12}>Departement</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text style={sheet.font12}>:</Text>
                    </View>
                    <View style={{ flexGrow: 1 }}>
                      <Text style={sheet.font12}>{master.departmentName}</Text>
                    </View>
                  </View>
                </View>
                <View style={sheet.cellRight}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: 80 }}>
                      <Text style={sheet.font12}>Area Kaizen</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text style={sheet.font12}>:</Text>
                    </View>
                    <View style={{ flexGrow: 1 }}>
                      <Text style={sheet.font12}>{master.kaizenArea}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={sheet.row}>
                <View style={sheet.cellLeft}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: 80 }}>
                      <Text style={sheet.font12}>Tanggal</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text style={sheet.font12}>:</Text>
                    </View>
                    <View style={{ flexGrow: 1 }}>
                      <Text style={sheet.font12}>{master.submittedAt}</Text>
                    </View>
                  </View>
                </View>
                <View style={sheet.cellRight}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: 80 }}>
                      <Text style={sheet.font12}>Jenis Idea</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text style={sheet.font12}>:</Text>
                    </View>
                    <View style={{ flexGrow: 1 }}>
                      <Text
                        style={
                          master.ideaType === "UMUM"
                            ? sheet.font12
                            : sheet.font12Strikethrough
                        }
                      >
                        UMUM
                      </Text>
                    </View>
                    <View style={{ flexGrow: 1 }}>
                      <Text
                        style={
                          master.ideaType === "Q-KYT"
                            ? sheet.font12
                            : sheet.font12Strikethrough
                        }
                      >
                        Q-KYT
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={sheet.row}>
                <View style={sheet.cell}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: 80 }}>
                      <Text style={sheet.font12}>Tema</Text>
                    </View>
                    <View style={{ width: 10 }}>
                      <Text style={sheet.font12}>:</Text>
                    </View>
                    <View style={{ flexGrow: 1 }}>
                      <Text style={sheet.font12}>{master.tema}</Text>
                    </View>
                    <View>
                      <Text style={sheet.font12}>No. {master.ideaNumber}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={sheet.row}>
                <View style={sheet.cell}>
                  <Text style={sheet.font8}>
                    Isi nama, departemen, tanggal, tema, NIK, dan area dengan
                    jelas tanpa di singkat.
                  </Text>
                </View>
              </View>
              <View style={sheet.row}>
                <View style={sheet.cell}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      display: "flex",
                      alignSelf: "center",
                    }}
                  >
                    Explanation (Penjelasan)
                  </Text>
                </View>
              </View>
              {master.ideaType === "UMUM" ? (
                <DetailUmum data={detail} />
              ) : (
                <DetailKyt data={detail} />
              )}
              <View
                style={{
                  borderWidth: 1,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexGrow: 1,
                    flexBasis: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                    }}
                  >
                    Pelaksanaan Ideasheet
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    flexBasis: 0,
                  }}
                >
                  <Image
                    source={
                      master.isIdeasheet === 1
                        ? checkboxChecked
                        : checkboxUnchecked
                    }
                    style={sheet.checkbox}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      display: "flex",
                      alignSelf: "center",
                    }}
                  >
                    Sudah
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: 1,
                    flexBasis: 0,
                  }}
                >
                  <Image
                    source={
                      master.isIdeasheet === 0
                        ? checkboxChecked
                        : checkboxUnchecked
                    }
                    style={sheet.checkbox}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      display: "flex",
                      alignSelf: "center",
                    }}
                  >
                    Belum
                  </Text>
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View
                  style={{
                    flexGrow: 1,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 11 }}>Isi Pengaruhnya</Text>
                </View>
                <View style={{ flexGrow: 1, borderWidth: 1 }}>
                  <Impact data={impact} />
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View
                  style={{
                    borderWidth: 1,
                    flexGrow: 1,
                    flexBasis: 0,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 12 }}>
                    Nilai Kaizen jika di Rupiahkan
                  </Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    flexGrow: 1,
                    flexBasis: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 12 }}>{master.kaizenAmount}</Text>
                </View>
              </View>
            </View>
            <View style={{ borderWidth: 1, marginTop: 2 }}>
              <View style={{ borderWidth: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    display: "flex",
                    alignSelf: "center",
                  }}
                >
                  Permintaan atau komentar dari pimpinan kerja pembuat Ideasheet
                </Text>
              </View>
              <View style={{ borderWidth: 1, padding: 2 }}>
                {comment.map((item, idx) => {
                  return (
                    <Text key={idx} style={{ fontSize: 11 }}>
                      BY {item.createdBy} : {item.value}
                    </Text>
                  );
                })}
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 11 }}>
                Note : Untuk Penjelasan Detail Dgn Gambar bisa dilampirkan
                gambar.
              </Text>
            </View>
            <Signature
              submittedBy={master.submitterName}
              reviewedBy={master.reviewerName}
              approvedBy={master.approverName}
              acceptedBy={master.receiverName}
            />
          </Page>
        </Document>
      </PDFViewer>
    );
  };

  return master !== null ? renderPdf() : "";
};

export default Ideasheet;
