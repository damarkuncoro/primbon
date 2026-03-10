export interface Binatang {
  nama: string;
  watak: string;
}

export interface PasaranWatak {
  gambaran: string;
  binatang: Binatang[];
  sifat: string[];
}

export const pasaranWatakData: Record<string, PasaranWatak> = {
  "Kliwon": {
    gambaran: "Wisa marta durjana tengah, ada jeleknya dan ada juga baiknya.",
    binatang: [
      {
        nama: "Kera",
        watak: "Suka memanjat, galak, banyak akal, berkeliaran di pohon, air, walau telah diberi makan masih menggigit, mempermainkan orang, sukar didekati dan diberi kebaikan."
      },
      {
        nama: "Anjing",
        watak: "Setia pada tuannya, besar kemauannya, sering selamat karena setia kepada tuannya, tetapi makannya kotor."
      }
    ],
    sifat: [
      "Ada jeleknya dan ada juga baiknya",
      "Banyak akal",
      "Besar kemauan",
      "Setia pada pemimpin/atasan"
    ]
  },
  "Legi": {
    gambaran: "Sumendi, ibarat Raja atau Bupati.",
    binatang: [
      {
        nama: "Kucing",
        watak: "Awas, jinak, celakanya jika difitnah, sukar mencurigai kecuali jika telah difitnah, dapat berkumpul dengan orang kaya/miskin."
      },
      {
        nama: "Tikus",
        watak: "Pada malam hari berjaga, awas, berhati-hati, sering bingung, sedikit makannya, gigitannya berbisa, yang terkena gigitan cepat mati, orang sering memasang perangkap untuknya, dapat berbuat sesuatu, selalu mengingat perbuatan baik/buruk, besar kebahagiaannya/celakanya."
      }
    ],
    sifat: [
      "Berwibawa seperti bangsawan",
      "Awas dan berhati-hati",
      "Mudah bergaul dengan siapa saja",
      "Selalu ingat budi baik orang"
    ]
  },
  "Pahing": {
    gambaran: "Cendana",
    binatang: [
      {
        nama: "Harimau",
        watak: "Selalu pergi jauh, duduk menyendiri, tidur menyendiri, jarang makan kecuali jika dipelihara Raja, banyak musuh, berbahaya jika didahului tetapi jika ia yang mendahului tidak menjadi apa, jika memiliki senjata dipelihara, kemarahannya timbul karena wanita, sering tertipu, jika barangnya hilang jarang kembali."
      }
    ],
    sifat: [
      "Suka menyendiri/mandiri",
      "Punya daya pikat (seperti Cendana)",
      "Banyak musuh jika tidak hati-hati",
      "Mudah tertipu",
      "Keras kemauannya"
    ]
  },
  "Pon": {
    gambaran: "Somahita, kulon lakuning Nabi.",
    binatang: [
      {
        nama: "Kambing",
        watak: "Suka nasehat, tiada bepergian jauh, yang dimakan berupa tanaman yang artinya miliknya sendiri, sering marah dengan isteri/keluarganya, kadang kala berani sama tuannya dimana keberanian ini tidak dapat dicegah, kekayaannya sedang, ingin selalu diturut nasehatnya, budinya tenteram."
      }
    ],
    sifat: [
      "Suka memberi nasihat",
      "Tidak suka merantau jauh",
      "Berani membela prinsip",
      "Ingin nasihatnya didengar",
      "Budi pekerti tenteram"
    ]
  },
  "Wage": {
    gambaran: "Prabuanom, lor lakuning dandang.",
    binatang: [
      {
        nama: "Sapi",
        watak: "Jinak, terserah yang memerintah, makannya harus diberi, ceroboh, pemarah, kadang kala mengamuk jika dicambuk, melanggar apa saja, sedikit mencari makan akan tetapi jika makan lupa sanak saudara dan orang tuanya, mudah difitnah karena fikirannya getas, sombong."
      }
    ],
    sifat: [
      "Jinak dan penurut",
      "Bisa menjadi pemarah jika ditekan",
      "Sedikit ceroboh",
      "Mudah difitnah",
      "Setia pada tugas"
    ]
  }
};