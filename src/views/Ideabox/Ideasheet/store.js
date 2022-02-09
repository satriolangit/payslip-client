const master = {
  ideaboxId: 0,
  ideaNumber: "2022-01-0001",
  ideaType: "Q-KYT",
  submittedBy: "2010",
  submittedAt: "01 January 2022",
  submitterName: "PURWANTO",
  tema: "TEMA",
  kaizenArea: "AREA",
  kaizenAmount: "100000",
  departmentId: 1,
  reviewerName: "Abde Yasin",
  approverName: "Cecep Ridwan",
  receiverName: "Santoso",
  status: "CLOSED",
  isIdeasheet: 0,
  departmentName: "HR",
};

const detail = {
  id: 0,
  ideaboxId: 1,
  beforeSummary: "MASTER SAMPLE JIG MUDAH KENA DEBU SEHINGGA TERLIHAT KOTOR.",
  beforeImage: "https://picsum.photos/300/150",
  beforeKapan: "30-Des-2021",
  beforeDimana: "Assembly",
  beforeSiapa: "PURWONO",
  beforeApa: "Master sample JIG ",
  beforeBagaimana: "Master sampel jig kotor",
  beforeIncident: "Proses pencocokan jig dengan master sampel terhambat",
  beforeSituation: `Waktu pengecekan terhambat dikarenakan
  saat mencocokkan jig dengan master
  sample tidak bisa dilakukan. Master jig
  sangat kotor sehingga menyebabkan debu
  akan tertempel pada product yang akan
  menyebabkan product menjadi rentan
  kualitas sensitivitasnya`,
  afterSummary:
    "MEMBUAT COVER JIG UNTUK MELINDUNGI MASTER SAMPLE JIG DARI DEBU",
  afterImage: "https://picsum.photos/300/150",
  afterRank: 1,
};

const comment = [
  {
    value: "test comment 1",
    createdBy: "Section Manager 1",
    createdAt: "2022-01-12",
  },
  {
    value: "test comment 2",
    createdBy: "Department Manager 1",
    createdAt: "2022-01-13",
  },
];

const impact = [
  {
    id: 1,
    text: "Internal Control, Efisiensi Waktu Kerja dan Cost Down",
    checked: 1,
  },
  {
    id: 1,
    text: "Efisiensi Waktu (Penyederhanaan proses kerja)",
    checked: 1,
  },
  {
    id: 3,
    text: "Efisiensi Biaya (Cost Down) (General / Administrative / Labour cost / FOH)",
    checked: 0,
  },
  {
    id: 4,
    text: "Internal Control namun tidak ada efisiensi waktu dan biaya",
    checked: 0,
  },
  {
    id: 5,
    text: "Tidak Ada",
    checked: 0,
  },
];

export { master, detail, comment, impact };
