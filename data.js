const products = [
 { id: 1, nama: "Keyboard Mekanikal", kategori: "Aksesoris",   harga: 450000, stock:12   
}, 
 { id: 2, nama: "Mouse Wireless",     kategori: "Aksesoris",   harga: 150000, stock:0
},
 { id: 3, nama: "Monitor 24 inch",    kategori: "Elektronik", harga: 1800000, stock:5
},
 { id: 4, nama: "Laptop Stand",       kategori: "Aksesoris",   harga: 200000, stock:25
},
{  id: 5, nama:  "Webcam HD",         kategori: "Elektronik", harga: 350000, stock:8   
},
 { id: 6, nama: "SSD 1TB",            kategori: "Elektronik", harga: 900000, stock:3
},
 { id: 7, nama: "Headset Gaming",     kategori: "Aksesoris",  harga: 500000, stock:0}
];

const suppliers  = [
    { id : 1, supplierNama: "PT Sumber Elektronik"},
    { id : 3, supplierNama: "CV Layar Jaya"},
    { id : 5, supplierNama: "Toko Kamera Sejahtera"}
];

console.log("\n=== soal no 1 ===");
const semuanama = products.map(produk => produk.nama);
console.log(semuanama);

console.log("\=== soal no 2 ===");
const itemsedikit = products.filter(barang => barang.item < 10);
console.log(itemsedikit);

console.log("\n=== soal no 3 ===");
const barangketemu = products.find(barang => barang.id);
console.log(barangketemu);

console.log("\n=== soal no 4 ===");
const itemhabis = products.filter(barang => barang.item <1);
console.log(itemhabis);

console.log("\n=== soal no 5 ===");
const semuakategori = products.map(item => item.kategori);
const kategoriunik = [... new Set(semuakategori)];
console.log(kategoriunik);

console.log("\n=== soal no 6 ===");
const hargatinggi = products.some(produk => produk.harga >1000000);
console.log(hargatinggi);

console.log("\n=== soal no 7 ===");
const jumalahElektronik = products
 .filter(item => item.kategori === "Elektronik")
 .reduce((total,item) => total + item.stock,0);
console.log(jumalahElektronik);

console.log("\n=== soal no 8 ===");
const berurutan = [...products].sort((a,b) => a.nama.localeCompare(b.nama));
console.log(berurutan);

console.log("\n=== soal no 9 ===");
const totalnialai = products.reduce((total,item) => {
    return total + (item.harga* item.stock);
}, 0);
console.log(totalnialai);

console.log("\n=== no soal 10 ===");
const berurutanharga = [ ... products].sort((a,b) =>a.harga - b.harga);
console.log(berurutanharga);

console.log("\n=== no soal 11 ===");
const elektronik = products.filter(item => item.kategori === "Elektronik");
const semuaelektroni = elektronik.every(produk => produk.harga > 300000);
console.log(elektronik);

console.log("\n=== no soal 12 ===");
const kelompokkategori  = products.reduce((hasilsementara,produk) => {
    const kategori =produk.kategori;
if(!hasilsementara[kategori]){
    hasilsementara[kategori] = [];
}
hasilsementara[kategori].push(produk);
return hasilsementara;
},{});
console.log(kelompokkategori);

console.log("\n=== no soal 13 ===");
const hasilbaru = products.map(produk =>({
    ... produk,
status:produk.stock === 0 ? "habis" : produk.stock < 5? "stock menipis" : "tersedia"
}));
console.log(hasilbaru);

console.log("\n=== no soal 14 ===");
const produkelektronik = products.filter(produk => produk.kategori === "Elektronik");
const totalelektronik = produkelektronik.reduce((total,produk) => total + produk.harga,0 );
const rataelektronik = totalelektronik/produkelektronik.length;

const produkaksesoris = products.filter(produk => produk.kategori === "Aksesoris");
const totalaksesoris = produkaksesoris.reduce((total,produk) =>  total + produk.harga,0 );
const rataaksesoris = totalaksesoris/produkaksesoris.length;

console.log(rataelektronik);
console.log(rataaksesoris);

console.log("\n=== soal no 15 ====");
const hasiltermahaldantermurah = products.reduce((acumulator,produk) => {
    if(produk.harga > acumulator.termahal.harga){   
        acumulator.termahal = produk;
    }
    if(produk.harga < acumulator.termurah.harga){
        acumulator.termurah = produk;
    }
    return acumulator;
}, {
    termahal:products[0],
    termurah:products[0]
});
console.log("Produk Termahal:", hasiltermahaldantermurah.termahal);
console.log("Produk Termurah:", hasiltermahaldantermurah.termurah);

console.log("\n=== soal no 16 ====");

function searchProduct(keyword) {
  return products.filter(produk => {
    return produk.nama.toLowerCase().includes(keyword.toLowerCase());
  });
}
console.log(searchProduct("key")); 

console.log("\n=== no 17 soal ===");

const productssuupliers = products.map(produk => {
    const supplierDitemukan = suppliers.find(sup => sup.id === produk.id);
    
    return {
        ...produk,
        supplier: supplierDitemukan ? supplierDitemukan.supplierNama : "Supplier Tidak Ditemukan"
    };
});

console.log(productssuupliers);

console.log("\n=== no 18 soal ===");

function removeProduct(idYgDihapus) {
  return products.filter(produk => produk.id !== idYgDihapus);
}
const sisaProduk = removeProduct(2);

console.log("--- HASIL ARRAY BARU (ID 2 Hilang) ---");
console.log(sisaProduk); 

console.log("\n=== no 19 soal ===");

function getproductBypage(array, page, perPage){
    const mulai = (page - 1) * perPage;
    return array.slice(mulai, mulai + perPage);
}

const hasilhalaman = getproductBypage(products, 1, 3);

console.log("--- HASIL PAGINATION HALAMAN 1 ---");
console.log(hasilhalaman);

console.log("\n=== no 20 soal ===");

function sortProducts(array, key, order) {
  
  const salinanArray = [...array];

  return salinanArray.sort((a, b) => {
    
    if (typeof a[key] === 'string') {
      return order === 'asc' 
        ? a[key].localeCompare(b[key]) 
        : b[key].localeCompare(a[key]);
    }
    
    return order === 'asc' 
      ? a[key] - b[key] 
      : b[key] - a[key];
  });
}

console.log("--- URUT HARGA TERMAHAL (DESC) ---");
const hargaTermahal = sortProducts(products, "harga", "desc");
console.log(hargaTermahal); 