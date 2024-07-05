<?php
class Buku extends Model
{
    public function getAll()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM buku");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM buku WHERE id_buku = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    private function generateId()
    {
        $stmt = $this->pdo->prepare("SELECT MAX(id_buku) as max_id FROM buku");
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $maxId = $result['max_id'];

        $newId = 'B001';
        if ($maxId) {
            $numericId = (int)substr($maxId, 1);
            $newId = 'B' . str_pad($numericId + 1, 3, '0', STR_PAD_LEFT);
        }

        return $newId;
    }

    public function create($data)
    {
        $id_buku = $this->generateId();
        $stmt = $this->pdo->prepare("INSERT INTO buku (id_buku, judul_buku, id_pengarang, penerbit, tahun_terbit, kategori_buku, no_isbn) VALUES (?, ?, ?, ?, ?, ?, ?)");
        return $stmt->execute([$id_buku, $data['judul_buku'], $data['id_pengarang'], $data['penerbit'], $data['tahun_terbit'], $data['kategori_buku'], $data['no_isbn']]);
    }

    public function update($id, $data)
    {
        $stmt = $this->pdo->prepare("UPDATE buku SET judul_buku = ?, id_pengarang = ?, penerbit = ?, tahun_terbit = ?, kategori_buku = ?, no_isbn = ? WHERE id_buku = ?");
        return $stmt->execute([$data['judul_buku'], $data['id_pengarang'], $data['penerbit'], $data['tahun_terbit'], $data['kategori_buku'], $data['no_isbn'], $id]);
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM buku WHERE id_buku = ?");
        return $stmt->execute([$id]);
    }
}
