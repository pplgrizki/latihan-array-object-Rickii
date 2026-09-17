function fetchProductsFromAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (!success) return reject(new Error('Gagal mengambil data produk'));
      const jsonData = JSON.stringify([
        { id: 1, name: "Keyboard Mekanikal", category: "Aksesoris", price: 450000, stock: 12 },
        { id: 2, name: "Mouse Wireless",     category: "Aksesoris", price: 150000, stock: 0  },
        { id: 3, name: "Monitor 24 inch",    category: "Elektronik", price: 1800000, stock: 5 },
        { id: 4, name: "Webcam HD",          category: "Elektronik", price: 350000, stock: 8 }
      ]);
      resolve(jsonData);
    }, 200);
  });
}

function fetchSupplierById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const suppliers = {
        1: "PT Sumber Elektronik",
        3: "CV Layar Jaya",
        5: "Toko Kamera Sejahtera"
      };
      resolve({ id, supplierName: suppliers[id] || "Tidak diketahui" });
    }, 200);
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runAllSoal() {
  console.log("\n=== SOAL 1 ===");
  await fetchProductsFromAPI()
    .then((jsonString) => {
      console.log(jsonString);
    })
    .catch((error) => console.error("Error:", error.message));

  console.log("\n=== SOAL 2 ===");
  await fetchProductsFromAPI()
    .then((jsonString) => {
      const productsArray = JSON.parse(jsonString);
      console.log(productsArray);
    })
    .catch((error) => console.error("Error:", error.message));

  console.log("\n=== SOAL 3 ===");
  async function getProducts() {
    const jsonString = await fetchProductsFromAPI();
    return JSON.parse(jsonString);
  }
  try {
    const products = await getProducts();
    console.log(products);
  } catch (error) {
    console.error("Error:", error.message);
  }

  console.log("\n=== SOAL 4 ===");
  try {
    const products = await getProducts();
    const productNames = products.map((product) => product.name);
    console.log(productNames);
  } catch (error) {
    console.error("Error:", error.message);
  }

  console.log("\n=== SOAL 5 ===");
  try {
    const products = await getProducts();
    const prettyJson = JSON.stringify(products, null, 2);
    console.log(prettyJson);
  } catch (error) {
    console.error("Error:", error.message);
  }

  console.log("\n=== SOAL 6 ===");
  await delay(100);
  console.log("Fungsi delay(ms) berhasil dibuat.");

  console.log("\n=== SOAL 7 ===");
  async function getProductsWithTryCatch() {
    try {
      const jsonString = await fetchProductsFromAPI();
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error tertangkap:", error.message);
      throw error;
    }
  }
  try {
    const res = await getProductsWithTryCatch();
    console.log("Berhasil mengambil data:", res.length, "item");
  } catch (error) {
    console.log("Penanganan luar:", error.message);
  }

  console.log("\n=== SOAL 8 ===");
  async function getSupplier(id) {
    const supplier = await fetchSupplierById(id);
    return supplier;
  }
  const supplier1 = await getSupplier(1);
  console.log(supplier1);

  console.log("\n=== SOAL 9 ===");
  try {
    const products = await getProducts();
    const supplier = await getSupplier(1);
    console.log("Produk:", products);
    console.log("Supplier:", supplier);
  } catch (error) {
    console.error("Error:", error.message);
  }

  console.log("\n=== SOAL 10 ===");
  try {
    console.time("Waktu Sequential");
    await fetchProductsFromAPI();
    await fetchSupplierById(1);
    await fetchSupplierById(3);
    console.timeEnd("Waktu Sequential");

    console.time("Waktu Paralel");
    const [jsonProducts, sup1, sup3] = await Promise.all([
      fetchProductsFromAPI(),
      fetchSupplierById(1),
      fetchSupplierById(3)
    ]);
    console.timeEnd("Waktu Paralel");
    console.log(sup1, sup3);
  } catch (error) {
    console.error("Error:", error.message);
  }

  console.log("\n=== SOAL 11 ===");
  function loadProductsFromJSON(jsonString) {
    const data = JSON.parse(jsonString);
    console.log("Is Array:", Array.isArray(data));
    return data;
  }
  const sampleJSON = JSON.stringify([{ id: 1, name: "Tes" }]);
  loadProductsFromJSON(sampleJSON);

  console.log("\n=== SOAL 12 ===");
  function loadProductsFromJSONSafe(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      return data;
    } catch (error) {
      console.error("Gagal parsing JSON:", error.message);
      return null;
    }
  }
  loadProductsFromJSONSafe("{ format_salah }");

  console.log("\n=== SOAL 13 ===");
  async function fetchWithRetry(maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Percobaan ke-${attempt}...`);
        const data = await fetchProductsFromAPI();
        return JSON.parse(data);
      } catch (error) {
        console.log(`Gagal percobaan ke-${attempt}`);
        if (attempt === maxRetries) {
          throw new Error(`Gagal setelah ${maxRetries} kali percobaan.`);
        }
        await delay(200);
      }
    }
  }
  try {
    const result = await fetchWithRetry(3);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }

  console.log("\n=== SOAL 14 ===");
  async function fetchAllSuppliers(ids) {
    const supplierPromises = ids.map((id) => fetchSupplierById(id));
    return await Promise.all(supplierPromises);
  }
  async function getProductsWithSuppliers() {
    const jsonProducts = await fetchProductsFromAPI();
    const products = JSON.parse(jsonProducts);
    const productIds = products.map((p) => p.id);
    const suppliers = await fetchAllSuppliers(productIds);

    return products.map((product) => {
      const foundSupplier = suppliers.find((s) => s.id === product.id);
      return {
        ...product,
        supplierName: foundSupplier ? foundSupplier.supplierName : "Tidak diketahui"
      };
    });
  }
  try {
    const joined = await getProductsWithSuppliers();
    console.log(joined);
  } catch (error) {
    console.error("Error:", error.message);
  }

  console.log("\n=== SOAL 15 ===");
  let cacheData = null;
  let lastFetchTime = 0;

  async function getProductsWithCache() {
    const now = Date.now();
    const CACHE_DURATION = 2000;

    if (cacheData && now - lastFetchTime < CACHE_DURATION) {
      console.log("Mengambil data dari cache...");
      return cacheData;
    }

    console.log("Mengambil data dari API...");
    const jsonString = await fetchProductsFromAPI();
    cacheData = JSON.parse(jsonString);
    lastFetchTime = now;
    return cacheData;
  }

  try {
    await getProductsWithCache();
    await getProductsWithCache();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

runAllSoal();