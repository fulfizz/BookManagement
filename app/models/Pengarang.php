<?php
class Pengarang extends Model
{
    public function getAll()
    {
        $stmt = $this->pdo->prepare("SELECT * FROM pengarang");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM pengarang WHERE id_pengarang = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    private function generateId()
    {
        $stmt = $this->pdo->prepare("SELECT MAX(id_pengarang) as max_id FROM pengarang");
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $maxId = $result['max_id'];

        $newId = 'P001';
        if ($maxId) {
            $numericId = (int)substr($maxId, 1);
            $newId = 'P' . str_pad($numericId + 1, 3, '0', STR_PAD_LEFT);
        }

        return $newId;
    }

    public function create($data)
    {
        $id_pengarang = $this->generateId();
        $stmt = $this->pdo->prepare("INSERT INTO pengarang (id_pengarang, nama_pengarang, no_telp, email, alamat) VALUES (?, ?, ?, ?, ?)");
        return $stmt->execute([$id_pengarang, $data['nama_pengarang'], $data['no_telp'], $data['email'], $data['alamat']]);
    }

    public function update($id, $data)
    {
        $stmt = $this->pdo->prepare("UPDATE pengarang SET nama_pengarang = ?, no_telp = ?, email = ?, alamat = ? WHERE id_pengarang = ?");
        return $stmt->execute([$data['nama_pengarang'], $data['no_telp'], $data['email'], $data['alamat'], $id]);
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM pengarang WHERE id_pengarang = ?");
        return $stmt->execute([$id]);
    }
}
