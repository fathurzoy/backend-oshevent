const { Staff } = require("../Model");

const staff_dummy = [
  {
    nik: "210163",
    name: "AHMAD MULYONO",
    posisi: "manager",
    gender: "laki-laki",
    divisi_id: 4,
  },
  {
    nik: "690422",
    name: "ANIS",
    posisi: "asman",
    gender: "laki-laki",
    divisi_id: 4,
  },
  {
    nik: "710035",
    name: "ISTIKMAL",
    posisi: "staff",
    gender: "laki-laki",
    divisi_id: 4,
  },
  {
    nik: "670563",
    name: "RAMSES MANURUNG",
    posisi: "asman",
    gender: "laki-laki",
    divisi_id: 1,
  },
  {
    nik: "680560",
    name: "SUDIARIS",
    posisi: "staff",
    gender: "laki-laki",
    divisi_id: 1,
  },
  {
    nik: "680525",
    name: "RACHMAT",
    posisi: "asman",
    gender: "laki-laki",
    divisi_id: 2,
  },
  {
    nik: "680527",
    name: "NANANG SOPANDI",
    posisi: "staff",
    gender: "laki-laki",
    divisi_id: 2,
  },
  {
    nik: "680528",
    name: "M. NURCHOLISH",
    posisi: "staff",
    gender: "laki-laki",
    divisi_id: 2,
  },
  {
    nik: "680529",
    name: "M. NUR DWI CAHYO",
    posisi: "staff",
    gender: "laki-laki",
    divisi_id: 2,
  },
  {
    nik: "680530",
    name: "DONI SAPUTRA",
    posisi: "staff",
    gender: "laki-laki",
    divisi_id: 2,
  },
  {
    nik: "700600",
    name: "RIYANTO",
    posisi: "asman",
    gender: "laki-laki",
    divisi_id: 3,
  },
  {
    nik: "670324",
    name: "DEDIT PERMADI",
    posisi: "staff",
    gender: "laki-laki",
    divisi_id: 3,
  },
  {
    nik: "9678322",
    name: "HARIS",
    posisi: "staff",
    gender: "laki-laki",
    divisi_id: 3,
  },
  {
    nik: "680482",
    name: "RACHMAD ANWAR",
    posisi: "asman",
    gender: "laki-laki",
    divisi_id: 5,
  },
  {
    nik: "700511",
    name: "GUSGINANTO",
    posisi: "staff",
    gender: "laki-laki",
    divisi_id: 5,
  },
  {
    nik: "897123",
    name: "ABDUL RAHMAN",
    posisi: "staff",
    gender: "laki-laki",
    divisi_id: 5,
  },
  {
    nik: "812536",
    name: "BENNY SAPUTRA ",
    posisi: "staff",
    gender: "laki-laki",
    divisi_id: 5,
  },
  {
    nik: "234123",
    name: "BILLY ASTRA GURUH",
    posisi: "staff",
    gender: "laki-laki",
    divisi_id: 5,
  },
  {
    nik: "234124",
    name: "SITI UMIYATI",
    posisi: "staff",
    gender: "laki-laki",
    divisi_id: 5,
  },
];

const staff_seeder = async () => {
  try {
    const result = await Staff.bulkCreate(staff_dummy);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = staff_seeder;
