
console.log("SCRIPT LOADED");

function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  };
}

/* =====================================================
   1. STORAGE HELPER (SINGLE SOURCE OF TRUTH)
===================================================== */
const Storage = {
  get(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

/* =====================================================
   2. MASTER MENU TETAP (SEKALI SAJA)
===================================================== */
// const MASTER_MENU = [
//   // MAKANAN
//   { nama: "Nasi Kucing", kategori: "Makanan", harga: 3000, stok: 0 },
//   { nama: "Gorengan", kategori: "Makanan", harga: 1000, stok: 0 },
//   { nama: "Ati/Ampela", kategori: "Makanan", harga: 2000, stok: 0 },
//   { nama: "Usus", kategori: "Makanan", harga: 2000, stok: 0 },
//   { nama: "Kulit", kategori: "Makanan", harga: 2000, stok: 0 },
//   { nama: "Telur Puyuh", kategori: "Makanan", harga: 3000, stok: 0 },
//   { nama: "Kepala Ayam", kategori: "Makanan", harga: 6000, stok: 0 },
//   { nama: "Sayap", kategori: "Makanan", harga: 7000, stok: 0 },
//   { nama: "Bakso", kategori: "Makanan", harga: 3000, stok: 0 },
//   { nama: "Kornet", kategori: "Makanan", harga: 5000, stok: 0 },
//   { nama: "Fishroll", kategori: "Makanan", harga: 4000, stok: 0 },
//   { nama: "Dumpling", kategori: "Makanan", harga: 7000, stok: 0 },
//   { nama: "Sosis Kecil", kategori: "Makanan", harga: 3000, stok: 0 },
//   { nama: "Sosis Besar", kategori: "Makanan", harga: 7000, stok: 0 },
//   { nama: "Scallop", kategori: "Makanan", harga: 5000, stok: 0 },
//   { nama: "Cikua", kategori: "Makanan", harga: 3000, stok: 0 },
//   { nama: "Otak-Otak", kategori: "Makanan", harga: 3000, stok: 0 },
  

//   // MINUMAN
//   { nama: "Teh Tawar", kategori: "Minuman", harga: 2000, stok: 0 },
//   { nama: "Es Teh Manis", kategori: "Minuman", harga: 4000, stok: 0 },
//   { nama: "Teh Manis Hangat", kategori: "Minuman", harga: 3000, stok: 0 },
//   { nama: "Jeruk Peras", kategori: "Minuman", harga: 6000, stok: 0 },
//   { nama: "Nutrisari", kategori: "Minuman", harga: 5000, stok: 0 },
//   { nama: "Teh Tarik", kategori: "Minuman", harga: 7000, stok: 0 },
//   { nama: "Good Day", kategori: "Minuman", harga: 7000, stok: 0 },
//   { nama: "Kapal Api", kategori: "Minuman", harga: 5000, stok: 0 },
//   { nama: "ABC Kopi Susu", kategori: "Minuman", harga: 5000, stok: 0 },
//   { nama: "ABC Klepon", kategori: "Minuman", harga: 7000, stok: 0 },
//   { nama: "Indocafe", kategori: "Minuman", harga: 4000, stok: 0 },
//   { nama: "Luwak White Koffie", kategori: "Minuman", harga: 4000, stok: 0 },
//   { nama: "Ovaltine", kategori: "Minuman", harga: 7000, stok: 0 },
//   { nama: "Chocolatos", kategori: "Minuman", harga: 7000, stok: 0 },
//   { nama: "Milo", kategori: "Minuman", harga: 6000, stok: 0 },
//   { nama: "Beng-Beng", kategori: "Minuman", harga: 7000, stok: 0 },
//   { nama: "Frisian Flag Panas", kategori: "Minuman", harga: 4000, stok: 0 },
//   { nama: "Frisian Flag Dingin", kategori: "Minuman", harga: 6000, stok: 0 },
//   { nama: "Susu Jahe", kategori: "Minuman", harga: 7000, stok: 0 },
//   { nama: "Jahe Murni", kategori: "Minuman", harga: 5000, stok: 0 },
// ];

/* =====================================================
   3. INIT STORAGE + SEED MENU
===================================================== */
async function initStorage() {
  if (!localStorage.getItem("persediaan")) {
    localStorage.setItem("persediaan", JSON.stringify([]));
  }

  if (!localStorage.getItem("transaksi")) {
    localStorage.setItem("transaksi", JSON.stringify([]));
  }

  // 🔥 AMBIL MENU DARI DB
  if (localStorage.getItem("token")) {
    await syncMenuFromAPI();
  } else {
    // fallback DEV ONLY
    if (!localStorage.getItem("menuBarang")) {
      localStorage.setItem("menuBarang", JSON.stringify(MASTER_MENU));
    }
  }
}



// function syncMenuOrder() {
//   const menu = Storage.get("menuBarang");

//   const ordered = MASTER_MENU.map(master => {
//     const existing = menu.find(m => m.nama === master.nama);
//     return existing ? { ...existing } : { ...master };
//   });

//   Storage.set("menuBarang", ordered);
// }

//ini buat hapus menuBarang di localStorage biar reset
// localStorage.removeItem("menuBarang");

function formatRupiah(value) {
  return "Rp " + Number(value).toLocaleString("id-ID");
}

function formatRupiahInput(input) {
  const raw = input.value.replace(/[^\d]/g, "");
  input.value = raw
    ? "Rp " + Number(raw).toLocaleString("id-ID")
    : "";
}

/* =====================================================
   4. SIDEBAR
===================================================== */
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.toggle("collapsed");
}

function closeSidebar() {
  if (window.innerWidth <= 768) {
    document.getElementById("sidebar")?.classList.add("collapsed");
  }
}

function setActiveSidebar() {
  const current = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === current);
  });
}

/* =====================================================
   5. STOK PERSEDIAAN
===================================================== */

function tambahPersediaan() {
  const namaEl = document.getElementById("nama");
  const satuanEl = document.getElementById("satuan");
  const jumlahEl = document.getElementById("jumlah");
  const hargaEl = document.getElementById("harga");

  if (!namaEl || !satuanEl || !jumlahEl || !hargaEl) {
    console.error("Input tidak ditemukan di DOM");
    return;
  }

  const nama = namaEl.value.trim();
  const satuan = satuanEl.value.trim();
  const jumlah = Number(jumlahEl.value);
  const harga = Number(hargaEl.value.replace(/[^\d]/g, ""));

  if (!nama || !satuan || jumlah <= 0 || harga <= 0) {
    alert("Lengkapi data persediaan");
    return;
  }

  const persediaan = Storage.get("persediaan");
  const transaksi = Storage.get("transaksi");

  const total = jumlah * harga;
  const tanggal = new Date().toISOString().split("T")[0];
  const id = Date.now();

  // ✅ SIMPAN KE LOCAL (UI TETAP)
  persediaan.push({
    id,
    nama,
    satuan,
    jumlah,
    harga,
    total,
    tanggal
  });

  transaksi.push({
    id,
    tanggal,
    tipe: "expense",
    deskripsi: `Beli ${nama} (${jumlah} ${satuan})`,
    total
  });

  Storage.set("persediaan", persediaan);
  Storage.set("transaksi", transaksi);

  renderRincianStok();
  renderPersediaan();

  // 🔥 KIRIM EXPENSE KE API (DI SINI TEMPATNYA)
  fetch("http://127.0.0.1:8000/api/transaksi", {
  method: "POST",
  headers: authHeaders(),
  body: JSON.stringify({
    tanggal,
    tipe: "expense",
    deskripsi: `Beli ${nama} (${jumlah} ${satuan})`,
    jumlah: total
  })
})
  .then(res => {
    if (!res.ok) return res.text().then(t => { throw new Error(t); });
    return res.json();
  })
  .then(data => console.log("✅ EXPENSE MASUK API", data))
  .catch(err => console.error("❌ EXPENSE GAGAL", err));

  document.getElementById("stokForm").reset();
}

function formatHarga(input) {
  const raw = input.value.replace(/[^\d]/g, "");
  const num = Number(raw);
  input.value = num ? num.toLocaleString("id-ID") : "";
}

function renderRincianStok() {
  const tbody = document.getElementById("rincianTable");
  if (!tbody) return;

  const data = Storage.get("persediaan");
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;color:#7f8c8d;">
          Tidak ada persediaan yang ditambahkan
        </td>
      </tr>
    `;
    return;
  }

  data.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.nama}</td>
        <td>${p.satuan}</td>
        <td><input 
              type="text" 
              class="input-jumlah"
              value="${p.jumlah}" 
              inputmode="decimal"
              onblur="updateJumlah(${p.id}, this.value)">
        </td>
        <td class="hrg-satuan">Rp ${p.harga.toLocaleString("id-ID")}</td>
        <td class="jml-hrg">Rp ${p.total.toLocaleString("id-ID")}</td>
        <td>
          <button class="btn-delete" onclick="hapusPersediaan(${p.id})">
            <img src="pict/trash.jpeg" class="icon-trash" alt="Hapus">
      </button>
        </td>
      </tr>
    `;
  });
}

function updateJumlah(id, value) {
  const jumlah = Number(value);

  if (isNaN(jumlah) || jumlah <= 0) {
    alert("Jumlah harus angka dan lebih dari 0");
    renderRincianStok(); // kembalikan nilai lama
    return;
  }

  const persediaan = Storage.get("persediaan");

  const item = persediaan.find(p => p.id === id);
  if (!item) return;

  item.jumlah = jumlah;
  item.total = jumlah * item.harga;

  Storage.set("persediaan", persediaan);

  renderRincianStok();
  renderPersediaan();
}

function hapusPersediaan(id) {
  let data = Storage.get("persediaan");
  data = data.filter(p => p.id !== id);
  Storage.set("persediaan", data);

  renderRincianStok();
  renderPersediaan();
}

function renderPersediaan() {
  const tbody = document.getElementById("persediaanTable");
  if (!tbody) return;

  const data = Storage.get("persediaan");
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center;color:#7f8c8d;">
          Tidak ada persediaan yang ditambahkan
        </td>
      </tr>
    `;
    return;
  }

  data.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.nama}</td>
        <td>${p.satuan}</td>
        <td>${p.jumlah}</td>
        <td class="hrg-satuan">Rp ${p.harga.toLocaleString("id-ID")}</td>
        <td class="jml-hrg">Rp ${p.total.toLocaleString("id-ID")}</td>
      </tr>
    `;
  });
}


/* =====================================================
   6. PENGELOLAAN MENU (HANYA UPDATE STOK)
===================================================== */

function renderMenuStokInput() {
  const tbody = document.getElementById("menuStokInput");
  if (!tbody) return;

  const menu = Storage.get("menuBarang");
  tbody.innerHTML = "";

  menu.forEach((item, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${item.nama}</td>
        <td>${item.kategori}</td>
        <td class="hrg-satuan">${formatRupiah(item.harga)}</td>
        <td>
          <input
            type="number"
            min="0"
            value="${item.stok}"
            class="stok-input"
            id="stok-${i}"
            name="stok_${item.nama.replace(/\s+/g, '_').toLowerCase()}"
            onchange="updateStok(${i}, this.value)"
          >
        </td>
        <td>
          <button class="btn-delete" onclick="openDeleteMenu(${i})">
            <img src="pict/trash.jpeg" class="icon-trash">
          </button>
        </td>
      </tr>
    `;
  });
}

function renderMenuBarangRecord() {
  const tbody = document.getElementById("menuBarangRecord");
  if (!tbody) return;

  const menu = Storage.get("menuBarang");
  tbody.innerHTML = "";

  menu.forEach(item => {
    if (item.stok > 0) {
      tbody.innerHTML += `
        <tr>
          <td>${item.nama}</td>
          <td>${item.kategori}</td>
          <td class="hrg-satuan">${formatRupiah(item.harga)}</td>
          <td>${item.stok}</td>
        </tr>
      `;
    }
  });

  if (!tbody.innerHTML.trim()) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center;color:#7f8c8d;">
          Belum ada stok yang diinput
        </td>
      </tr>
    `;
  }
}

async function updateStok(index, value) {
  const menu = Storage.get("menuBarang");
  const stok = Math.max(0, Number(value) || 0);

  await fetch("http://127.0.0.1:8000/api/menu/set-stok", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      nama: menu[index].nama,
      stok
    })
  });

  // sync ulang dari DB
  await syncMenuFromAPI();
  renderMenuStokInput();
  renderMenuBarangRecord();
}


let deleteMenuIndex = null;

function openDeleteMenu(index) {
  deleteMenuIndex = index;
  document.getElementById("deleteMenuModal").style.display = "flex";
}

function confirmDeleteMenu() {
  const menu = Storage.get("menuBarang");
  menu[deleteMenuIndex].stok = 0;
  Storage.set("menuBarang", menu);

  closeDeleteMenu();
  renderMenuStokInput();
  renderMenuBarangRecord();
  renderMenuKasir(currentKategori);
}

function closeDeleteMenu() {
  deleteMenuIndex = null;
  document.getElementById("deleteMenuModal").style.display = "none";
}

async function syncMenuFromAPI() {
  const res = await fetch("http://127.0.0.1:8000/api/menu", {
    headers: authHeaders()
  });

  const data = await res.json();

  const menu = data.map(m => ({
    nama: m.nama_menu,     // STRING IDENTIK
    kategori: m.kategori,
    harga: m.harga_jual,
    stok: m.stok
  }));

  Storage.set("menuBarang", menu);
}


/* =====================================================
   7. KASIR
===================================================== */
let cart = {};
let currentKategori = "__INIT__";

function renderMenuKasir(filterKategori = "") {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;

  if (filterKategori === "__INIT__") {
    grid.innerHTML = `
      <p style="text-align:center;color:#7f8c8d;">
        Pilih kategori terlebih dahulu
      </p>
    `;
    return;
  }
  const menu = Storage.get("menuBarang");
  grid.innerHTML = "";

  menu.forEach(item => {
    if (item.stok <= 0) return;

    // 🔥 FILTER KATEGORI
    if (
      filterKategori &&
      item.kategori.toLowerCase() !== filterKategori.toLowerCase()
    ) return;

    grid.innerHTML += `
      <div class="menu-card-item"
        onclick="addToCart('${item.nama}', ${item.harga}, this)">
        <p class="menu-name">${item.nama}</p>
        <p class="menu-price">
          Rp ${item.harga.toLocaleString("id-ID")}
        </p>
      </div>
    `;
  });

  if (!grid.innerHTML.trim()) {
    grid.innerHTML = `
      <p style="text-align:center;color:#7f8c8d;">
        Tidak ada menu pada kategori ini
      </p>
    `;
  }
}

function filterMenu() {
  console.log("FILTER MENU DIPANGGIL");
  const value = document.getElementById("categorySelect").value;

  if (!value) {
    currentKategori = "__INIT__";
  } else {
    currentKategori = value;
  }

  console.log("Kategori sekarang:", currentKategori);
  renderMenuKasir(currentKategori);
}



function addToCart(nama, harga, el) {
  cart[nama] = cart[nama] || { harga, qty: 0 };
  cart[nama].qty++;

  el?.classList.add("active");
  setTimeout(() => el?.classList.remove("active"), 150);
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const totalHarga = document.getElementById("totalHarga");
  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  Object.keys(cart).forEach(nama => {
    const item = cart[nama];
    const subtotal = item.qty * item.harga;
    total += subtotal;

    cartItems.innerHTML += `
      <div class="cart-row">
        <div class="cart-name">${nama}</div>

        <div class="cart-qty">
          <button onclick="updateQty('${nama}', -1)">−</button>

          <input
            type="number"
            min="1"
            value="${item.qty}"
            id="qty-${nama.replace(/\s+/g,'-').toLowerCase()}"
            name="qty_${nama.replace(/\s+/g,'_').toLowerCase()}"
            onchange="setQty('${nama}', this.value)"
          >


          <button onclick="updateQty('${nama}', 1)">+</button>
        </div>

        <div class="cart-price">
          Rp ${subtotal.toLocaleString("id-ID")}
        </div>

        <button class="cart-delete" onclick="removeItem('${nama}')">
          <img src="pict/trash.jpeg">
        </button>
      </div>
    `;
  });

  totalHarga.value = total
    ? "Rp " + total.toLocaleString("id-ID")
    : "0";
  // 🧹 JIKA KERANJANG KOSONG → RESET INPUT PEMBAYARAN
  if (total === 0) {
  document.getElementById("amountPaid").value = "";
  document.getElementById("kembalian").value = "Rp 0";
  return;
}
  calculateChange();
}

function updateQty(nama, delta) {
  if (!cart[nama]) return;

  cart[nama].qty += delta;

  if (cart[nama].qty <= 0) {
    delete cart[nama];
  }

  renderCart();
}

function setQty(nama, value) {
  const qty = parseInt(value);
  if (isNaN(qty) || qty < 1) return;

  cart[nama].qty = qty;
  renderCart();
}

function removeItem(nama) {
  delete cart[nama];
  renderCart();
}

function showSuccess() {
  const total = Number(
    document.getElementById("totalHarga").value.replace(/[^\d]/g, "")
  );
  const paid = Number(
    document.getElementById("amountPaid").value.replace(/[^\d]/g, "")
  );

  if (paid < total) {
    openPaymentError();
    return;
  }

  const overlay = document.getElementById("successOverlay");
  overlay.style.display = "flex";

  setTimeout(() => {
  overlay.style.display = "none";
  simpanTransaksi();
  renderMenuKasir(currentKategori); // 🔥 tetap di kategori terakhir
  }, 2000);

}

function openClearCartModal() {
  document.getElementById("clearCartModal").style.display = "flex";
}

function closeClearCartModal() {
  document.getElementById("clearCartModal").style.display = "none";
}

function confirmClearCart() {
  cart = {};
  renderCart();
  closeClearCartModal();
}

function formatAmountPaid(input) {
  // ambil angka murni
  const raw = input.value.replace(/[^\d]/g, "");
  const paid = Number(raw);

  // format Rp
  input.value = paid
    ? "Rp " + paid.toLocaleString("id-ID")
    : "";

  calculateChange();
}

//Cegah klik “Berhasil” kalau uang kurang
function calculateChange() {
  const totalText = document.getElementById("totalHarga").value;
  const paidText = document.getElementById("amountPaid").value;
  const changeInput = document.getElementById("kembalian");

  const total = Number(totalText.replace(/[^\d]/g, ""));
  const paid = Number(paidText.replace(/[^\d]/g, ""));

  let change = paid - total;

  if (change < 0 || !paid) {
    changeInput.value = "Rp 0";
    return;
  }

  changeInput.value = "Rp " + change.toLocaleString("id-ID");
}

function openPaymentError() {
  document.getElementById("paymentErrorModal").style.display = "flex";
}

function closePaymentError() {
  document.getElementById("paymentErrorModal").style.display = "none";
}

/* =====================================================
   8. SIMPAN TRANSAKSI
===================================================== */

let selectedTransaksiId = null;
let longPressTimer = null;

function setTransaksiDate() {
  const input = document.getElementById("tanggalTransaksi");
  if (!input) return;

  input.value = new Date().toISOString().split("T")[0];
}

async function addTransaksi(e) {
  e.preventDefault();

  const tipe = document.getElementById("tipeTransaksi").value;
  const tanggal = document.getElementById("tanggalTransaksi").value;
  const deskripsi = document.getElementById("deskripsiTransaksi").value.trim();
  const jumlahInput = document.getElementById("jumlahTransaksi");

  if (!jumlahInput) {
    alert("Input nominal tidak ditemukan");
    return;
  }

  const jumlah = Number(jumlahInput.value.replace(/[^\d]/g, ""));

  if (!tipe || !tanggal || jumlah <= 0) {
    alert("Lengkapi data transaksi & nominal > 0");
    return;
  }

  const res = await fetch("http://127.0.0.1:8000/api/transaksi", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      tanggal,
      tipe,
      deskripsi,
      jumlah
    })
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("API ERROR:", err);
    alert("Gagal menyimpan transaksi");
    return;
  }

  e.target.reset();
  setTransaksiDate();
  renderTransaksi();
}


async function renderTransaksi() {
  const tbody = document.getElementById("transaksiTable");
  if (!tbody) return;

  try {
    const res = await fetch("http://127.0.0.1:8000/api/transaksi", {
      headers: authHeaders()
    });

    const transaksi = await res.json();
    tbody.innerHTML = "";

    if (transaksi.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align:center;color:#7f8c8d;">
            Tidak ada pencatatan transaksi
          </td>
        </tr>
      `;
      return;
    }

    transaksi.reverse().forEach(t => {
      const isIncome = t.tipe === "income";
      const warna = isIncome ? "text-income" : "text-expense";
      const tanda = isIncome ? "+" : "-";

      tbody.innerHTML += `
        <tr
          class="transaksi-row"
          onmousedown="startLongPress(${t.id_transaksi})"
          onmouseup="cancelLongPress()"
          onmouseleave="cancelLongPress()"
          ontouchstart="startLongPress(${t.id_transaksi})"
          ontouchend="cancelLongPress()"
        >
          <td>${t.tanggal}</td>
          <td class="${warna}">${t.tipe}</td>
          <td class="col-desc" title="${t.deskripsi || "-"}">
            ${t.deskripsi || "-"}
          </td>
          <td class="${warna}">
            ${tanda} Rp ${Number(t.jumlah).toLocaleString("id-ID")}
          </td>
        </tr>
      `;
    });

  } catch (e) {
    console.error("Gagal load transaksi", e);
  }
}

async function simpanTransaksi() {
  const menu = Storage.get("menuBarang");

  const items = Object.keys(cart).map(nama => ({
    nama,
    qty: cart[nama].qty,
    harga: cart[nama].harga
  }));

  const total = items.reduce((s, i) => s + i.qty * i.harga, 0);

  // 🔥 DESKRIPSI OTOMATIS (TETAP ADA)
  const deskripsi = items
    .map(i => `${i.nama} (${i.qty})`)
    .join(", ");

  // 🔥 KURANGI STOK (TETAP DI FRONTEND)
  items.forEach(i => {
    const m = menu.find(x => x.nama === i.nama);
    if (m) m.stok = Math.max(0, m.stok - i.qty);
  });

  Storage.set("menuBarang", menu);

// 🔥 SIMPAN KE API (SUMMARY SAJA)
await fetch("http://127.0.0.1:8000/api/transaksi", {
  method: "POST",
  headers: authHeaders(),
  body: JSON.stringify({
    tanggal: new Date().toISOString().split("T")[0],
    tipe: "income",
    deskripsi,
    jumlah: total
  })
});


await fetch("http://127.0.0.1:8000/api/menu/decrease-stok", {
  method: "POST",
  headers: authHeaders(),
  body: JSON.stringify(
    items.map(i => ({
      nama: i.nama,
      qty: i.qty
    }))
  )
});



  cart = {};
  renderCart();
  renderMenuKasir(currentKategori);
  renderTransaksi(); // 🔥 reload dari API
}


//Hapus transaksi dengan tekan lama
function startLongPress(id) {
  cancelLongPress(); // reset dulu
  longPressTimer = setTimeout(() => {
    selectedTransaksiId = id;
    openDeleteTransaksi();
  }, 600); // 600ms = tekan lama
}

function cancelLongPress() {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
}

function openDeleteTransaksi() {
  document.getElementById("deleteTransaksiModal").style.display = "flex";
}

function closeDeleteTransaksi() {
  selectedTransaksiId = null;
  document.getElementById("deleteTransaksiModal").style.display = "none";
}

async function confirmDeleteTransaksi() {
  if (!selectedTransaksiId) return;

  await fetch(
    `http://127.0.0.1:8000/api/transaksi/${selectedTransaksiId}`,
    {
      method: "DELETE",
      headers: authHeaders()
    }
  );

  closeDeleteTransaksi();
  renderTransaksi();
}


/*=====================================================
   9. LAPORAN KEUANGAN
===================================================== */
function setReportDate() {
  const input = document.getElementById("reportDate");
  if (!input) return;

  input.value = new Date().toISOString().split("T")[0];
}

async function filterTransaksiByPeriod(period, dateStr) {
  const res = await fetch("http://127.0.0.1:8000/api/transaksi", {
    headers: authHeaders()
  });

  const transaksi = await res.json();
  const baseDate = new Date(dateStr);

  return transaksi.filter(t => {
    const tDate = new Date(t.tanggal);

    if (period === "daily") {
      return t.tanggal === dateStr;
    }

    if (period === "weekly") {
      const start = new Date(baseDate);
      start.setDate(baseDate.getDate() - baseDate.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return tDate >= start && tDate <= end;
    }

    if (period === "monthly") {
      return (
        tDate.getMonth() === baseDate.getMonth() &&
        tDate.getFullYear() === baseDate.getFullYear()
      );
    }

    return false;
  });
}


async function generateReport() {
  const period = document.getElementById("reportPeriod")?.value;
  const date = document.getElementById("reportDate")?.value;
  if (!period || !date) return;

  const data = await filterTransaksiByPeriod(period, date);

  const income = data
    .filter(t => t.tipe === "income")
    .reduce((s, t) => s + Number(t.jumlah), 0);

  const expense = data
    .filter(t => t.tipe === "expense")
    .reduce((s, t) => s + Number(t.jumlah), 0);

  document.getElementById("reportIncome").innerText = formatRupiah(income);
  document.getElementById("reportExpense").innerText = formatRupiah(expense);
  document.getElementById("reportProfit").innerText =
    formatRupiah(income - expense);

  renderSalesSummary(data);
  renderReportChart(data, period);
}

function renderSalesSummary(data) {
  const tbody = document.getElementById("salesSummaryTable");
  if (!tbody) return;

  const menu = Storage.get("menuBarang"); // 🔥 ambil harga dari sini
  const summary = {};

  data.forEach(t => {
    if (t.tipe !== "income" || !t.deskripsi) return;

    // ambil semua pola: Nama (angka)
    const matches = t.deskripsi.match(/([a-zA-Z\s]+)\s*\((\d+)\)/g);
    if (!matches) return;

    matches.forEach(text => {
      const [, rawNama, qty] = text.match(/(.+)\((\d+)\)/);

      const nama = rawNama.trim();
      const jumlah = Number(qty);

      const menuItem = menu.find(m => {
        const menuNames = m.nama
          .toLowerCase()
          .split("/")
          .map(s => s.trim());

        return menuNames.includes(nama.toLowerCase());
      });

      const harga = menuItem ? menuItem.harga : 0;
      if (!summary[nama]) {
        summary[nama] = { qty: 0, total: 0 };
      }

      summary[nama].qty += jumlah;
      summary[nama].total += jumlah * harga;
    });
  });

  tbody.innerHTML = "";

  const entries = Object.entries(summary);
  if (entries.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" style="text-align:center;color:#7f8c8d;">
          Tidak ada data penjualan yang tersedia
        </td>
      </tr>
    `;
    return;
  }

  entries.forEach(([nama, v]) => {
    tbody.innerHTML += `
      <tr>
        <td>${nama}</td>
        <td>${v.qty}</td>
        <td>${formatRupiah(v.total)}</td>
      </tr>
    `;
  });
}

let reportChart = null;

function renderReportChart(data, period) {
  const ctx = document.getElementById("reportChart");
  if (!ctx) return;

  if (reportChart) reportChart.destroy();

  const map = {};

  data.forEach(t => {
    const label =
      period === "monthly"
        ? t.tanggal.slice(0, 7)
        : t.tanggal;

    if (!map[label]) map[label] = { income: 0, expense: 0 };

    const amount = Number(t.jumlah) || 0;

    if (t.tipe === "income") map[label].income += amount;
    if (t.tipe === "expense") map[label].expense += amount;
  });

  const labels = Object.keys(map);
  const incomeData = labels.map(l => map[l].income);
  const expenseData = labels.map(l => map[l].expense);

  reportChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Pendapatan",
          data: incomeData,
          borderColor: "#2ecc71",
          backgroundColor: "rgba(46,204,113,0.15)",
          fill: true,
          tension: 0.4
        },
        {
          label: "Pengeluaran",
          data: expenseData,
          borderColor: "#e74c3c",
          backgroundColor: "rgba(231,76,60,0.15)",
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => "Rp " + Number(value).toLocaleString("id-ID")
          }
        }
      }
    }
  });
}

/* =====================================================
   10. DASHBOARD REPORT
===================================================== */

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

async function getDashboardData() {
  const res = await fetch("http://127.0.0.1:8000/api/transaksi", {
    headers: authHeaders()
  });

  const transaksi = await res.json();
  const today = new Date().toISOString().split("T")[0];

  let todayIncome = 0;
  let todayExpense = 0;
  let totalBalance = 0;

  transaksi.forEach(t => {
    const amount = Number(t.jumlah) || 0;

    if (t.tipe === "income") {
      totalBalance += amount;
      if (t.tanggal === today) todayIncome += amount;
    }

    if (t.tipe === "expense") {
      totalBalance -= amount;
      if (t.tanggal === today) todayExpense += amount;
    }
  });

  return {
    todayIncome,
    todayExpense,
    todayProfit: todayIncome - todayExpense,
    totalBalance
  };
}


async function updateDashboardCards() {
  const incomeEl = document.getElementById("todayIncome");
  const expenseEl = document.getElementById("todayExpense");
  const profitEl = document.getElementById("todayProfit");
  const balanceEl = document.getElementById("totalBalance");

  // ⛔ kalau bukan halaman dashboard → STOP
  if (!incomeEl || !expenseEl || !profitEl || !balanceEl) {
    return;
  }

  const data = await getDashboardData();

  incomeEl.innerText = formatRupiah(data.todayIncome);
  expenseEl.innerText = formatRupiah(data.todayExpense);
  profitEl.innerText = formatRupiah(data.todayProfit);
  balanceEl.innerText = formatRupiah(data.totalBalance);
}



async function renderRecentTransaksi() {
  const tbody = document.getElementById("recenttransaksi");
  if (!tbody) return;

  const res = await fetch("http://127.0.0.1:8000/api/transaksi", {
    headers: authHeaders()
  });

  const transaksi = await res.json();
  const today = new Date().toISOString().split("T")[0];

  const todayTransaksi = transaksi
    .filter(t => t.tanggal === today)
    .reverse()
    .slice(0, 5);

  tbody.innerHTML = "";

  if (todayTransaksi.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center;color:#7f8c8d;">
          Belum ada transaksi hari ini
        </td>
      </tr>`;
    return;
  }

  todayTransaksi.forEach(t => {
    const warna = t.tipe === "income" ? "text-income" : "text-expense";
    const tanda = t.tipe === "income" ? "+" : "-";

    tbody.innerHTML += `
      <tr>
        <td>${t.tanggal}</td>
        <td class="${warna}">${t.tipe}</td>
        <td>${t.deskripsi || "-"}</td>
        <td class="${warna}">
          ${tanda} Rp ${Number(t.jumlah).toLocaleString("id-ID")}
        </td>
      </tr>
    `;
  });
}



/*=====================================================
   11. LOGIN-LOGOUT
===================================================== */
function authGuard() {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("loginPage")) {
    authGuard();
  }
});


function openLogoutModal() {
  const modal = document.getElementById("logoutModal");
  modal.style.display = "flex";

  // klik background = close
  modal.onclick = function (e) {
    if (e.target === modal) {
      closeLogoutModal();
    }
  };
}

function closeLogoutModal() {
  const modal = document.getElementById("logoutModal");
  modal.style.display = "none";
}

function confirmLogout() {
  // hapus session
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");

  // redirect
  window.location.replace("login.html");
}


/* =====================================================
   12. AUTO RUN
===================================================== */
document.addEventListener("DOMContentLoaded", async () => {

  const select = document.getElementById("categorySelect");
  if (select) {
    select.addEventListener("change", filterMenu);
  }

  const stokForm = document.getElementById("stokForm");
  if (stokForm) {
    stokForm.addEventListener("submit", e => {
      e.preventDefault();
      tambahPersediaan();
    });
  }

  // 🔥 1. INIT DATA (menu dari DB kalau ada token)
  await initStorage();

  // 🔥 2. BARU RENDER UI
  renderRincianStok();
  renderPersediaan();
  setActiveSidebar();

  renderMenuStokInput();
  renderMenuBarangRecord();
  renderMenuKasir("__INIT__");

  // 🔥 3. DATA API
  renderTransaksi();

  // 🔥 4. KHUSUS DASHBOARD
  if (document.getElementById("todayIncome")) {
    updateDashboardCards();
    renderRecentTransaksi();
  }

});



/* =====================================================
   13. AUTO SYNC HP B (POLLING)
===================================================== */

let lastMenuUpdate = null;

async function checkMenuUpdate() {
  try {
    const res = await fetch(
      "http://127.0.0.1:8000/api/menu/last-update",
      { headers: authHeaders() }
    );

    const data = await res.json();

    if (lastMenuUpdate && data.last_update !== lastMenuUpdate) {
      console.log("🔄 Stok berubah, sync ulang...");
      await syncMenuFromAPI();

      renderMenuStokInput();
      renderMenuBarangRecord();
      renderMenuKasir(currentKategori);
    }

    lastMenuUpdate = data.last_update;

  } catch (e) {
    console.error("Polling error", e);
  }
}
// setInterval(checkMenuUpdate, 15000); // 15 detik

