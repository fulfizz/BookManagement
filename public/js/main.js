const baseURL = 'http://localhost/book-management/public';

// Function to show alert
function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;
}

let currentDeleteId = null;
let deleteType = '';

// Fetch and display pengarang
function fetchPengarang() {
    fetch(`${baseURL}/pengarang/index`)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('pengarang-list');
            list.innerHTML = '';
            data.forEach(pengarang => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pengarang.id_pengarang}</td>
                    <td>${pengarang.nama_pengarang}</td>
                    <td>${pengarang.no_telp}</td>
                    <td>${pengarang.email}</td>
                    <td>${pengarang.alamat}</td>
                    <td>
                        <button onclick="editPengarang('${pengarang.id_pengarang}')">Edit</button>
                        <button onclick="confirmDeletePengarang('${pengarang.id_pengarang}')">Delete</button>
                    </td>
                `;
                list.appendChild(row);
            });
        })
        .catch(error => {
            showAlert('Gagal memuat data pengarang.', 'danger');
            console.error('Error:', error);
        });
}

// Add new pengarang
function tambahPengarang() {
    const form = document.getElementById('pengarang-form');
    const nama_pengarang = document.getElementById('nama_pengarang').value;
    const no_telp = document.getElementById('no_telp').value;
    const email = document.getElementById('email').value;
    const alamat = document.getElementById('alamat').value;

    const data = { nama_pengarang, no_telp, email, alamat };

    fetch(`${baseURL}/pengarang/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            showAlert('Pengarang berhasil ditambahkan!', 'success');
            form.reset();
            fetchPengarang();
        })
        .catch(error => {
            showAlert('Gagal menambahkan pengarang.', 'danger');
            console.error('Error:', error);
        });
}

// Update pengarang
function updatePengarang(id) {
    const form = document.getElementById('pengarang-form');
    const nama_pengarang = document.getElementById('nama_pengarang').value;
    const no_telp = document.getElementById('no_telp').value;
    const email = document.getElementById('email').value;
    const alamat = document.getElementById('alamat').value;

    const data = { nama_pengarang, no_telp, email, alamat };

    fetch(`${baseURL}/pengarang/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            showAlert('Pengarang berhasil diperbarui!', 'success');
            form.reset();
            document.getElementById('id_pengarang').value = '';
            fetchPengarang();
        })
        .catch(error => {
            showAlert('Gagal memperbarui pengarang.', 'danger');
            console.error('Error:', error);
        });
}

// Delete pengarang
function deletePengarang(id) {
    fetch(`${baseURL}/pengarang/delete/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            showAlert('Pengarang berhasil dihapus!', 'success');
            fetchPengarang();
        })
        .catch(error => {
            showAlert('Gagal menghapus pengarang karena sudah digunakan di daftar buku.', 'danger');
            console.error('Error:', error);
        });
}

// Confirm delete pengarang
function confirmDeletePengarang(id) {
    currentDeleteId = id;
    deleteType = 'pengarang';
    $('#confirmDeleteModal').modal('show');
}

// Edit pengarang
function editPengarang(id) {
    fetch(`${baseURL}/pengarang/show/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('id_pengarang').value = data.id_pengarang;
            document.getElementById('nama_pengarang').value = data.nama_pengarang;
            document.getElementById('no_telp').value = data.no_telp;
            document.getElementById('email').value = data.email;
            document.getElementById('alamat').value = data.alamat;
        })
        .catch(error => {
            showAlert('Gagal mengambil data pengarang.', 'danger');
            console.error('Error:', error);
        });
}

// Fetch and display buku
function fetchBuku() {
    fetch(`${baseURL}/buku/index`)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('buku-list');
            list.innerHTML = '';
            data.forEach(buku => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${buku.id_buku}</td>
                    <td>${buku.judul_buku}</td>
                    <td>${buku.id_pengarang}</td>
                    <td>${buku.penerbit}</td>
                    <td>${buku.tahun_terbit}</td>
                    <td>${buku.kategori_buku}</td>
                    <td>${buku.no_isbn}</td>
                    <td>
                        <button onclick="editBuku('${buku.id_buku}')">Edit</button>
                        <button onclick="confirmDeleteBuku('${buku.id_buku}')">Delete</button>
                    </td>
                `;
                list.appendChild(row);
            });
        })
        .catch(error => {
            showAlert('Gagal memuat data buku.', 'danger');
            console.error('Error:', error);
        });
}

// Add new buku
function tambahBuku() {
    const form = document.getElementById('buku-form');
    const judul_buku = document.getElementById('judul_buku').value;
    const id_pengarang = document.getElementById('id_pengarang_buku').value;
    const penerbit = document.getElementById('penerbit').value;
    const tahun_terbit = document.getElementById('tahun_terbit').value;
    const kategori_buku = document.getElementById('kategori_buku').value;
    const no_isbn = document.getElementById('no_isbn').value;

    const data = { judul_buku, id_pengarang, penerbit, tahun_terbit, kategori_buku, no_isbn };

    fetch(`${baseURL}/buku/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            showAlert('Buku berhasil ditambahkan!', 'success');
            form.reset();
            fetchBuku();
        })
        .catch(error => {
            showAlert('Gagal menambahkan buku.', 'danger');
            console.error('Error:', error);
        });
}

// Update buku
function updateBuku(id) {
    const form = document.getElementById('buku-form');
    const judul_buku = document.getElementById('judul_buku').value;
    const id_pengarang = document.getElementById('id_pengarang_buku').value;
    const penerbit = document.getElementById('penerbit').value;
    const tahun_terbit = document.getElementById('tahun_terbit').value;
    const kategori_buku = document.getElementById('kategori_buku').value;
    const no_isbn = document.getElementById('no_isbn').value;

    const data = { judul_buku, id_pengarang, penerbit, tahun_terbit, kategori_buku, no_isbn };

    fetch(`${baseURL}/buku/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            showAlert('Buku berhasil diperbarui!', 'success');
            form.reset();
            document.getElementById('id_buku').value = '';
            fetchBuku();
        })
        .catch(error => {
            showAlert('Gagal memperbarui buku.', 'danger');
            console.error('Error:', error);
        });
}

// Delete buku
function deleteBuku(id) {
    fetch(`${baseURL}/buku/delete/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            showAlert('Buku berhasil dihapus!', 'success');
            fetchBuku();
        })
        .catch(error => {
            showAlert('Gagal menghapus buku.', 'danger');
            console.error('Error:', error);
        });
}

// Confirm delete buku
function confirmDeleteBuku(id) {
    currentDeleteId = id;
    deleteType = 'buku';
    $('#confirmDeleteModal').modal('show');
}

// Edit buku
function editBuku(id) {
    fetch(`${baseURL}/buku/show/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('id_buku').value = data.id_buku;
            document.getElementById('judul_buku').value = data.judul_buku;
            document.getElementById('id_pengarang_buku').value = data.id_pengarang;
            document.getElementById('penerbit').value = data.penerbit;
            document.getElementById('tahun_terbit').value = data.tahun_terbit;
            document.getElementById('kategori_buku').value = data.kategori_buku;
            document.getElementById('no_isbn').value = data.no_isbn;
        })
        .catch(error => {
            showAlert('Gagal mengambil data buku.', 'danger');
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('deleteButton').addEventListener('click', function () {
        if (deleteType === 'pengarang') {
            deletePengarang(currentDeleteId);
        } else if (deleteType === 'buku') {
            deleteBuku(currentDeleteId);
        }
        $('#confirmDeleteModal').modal('hide');
    });
});
