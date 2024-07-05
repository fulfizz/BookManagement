<?php
class BukuController extends Controller
{
    public function index()
    {
        $buku = $this->model('Buku');
        $data = $buku->getAll();
        $this->response($data);
    }

    public function show($id)
    {
        $buku = $this->model('Buku');
        $data = $buku->getById($id);
        if ($data) {
            $this->response($data);
        } else {
            $this->response(['message' => 'Buku not found'], 404);
        }
    }

    public function create()
    {
        $input = json_decode(file_get_contents('php://input'), true);
        if ($input) {
            $buku = $this->model('Buku');
            $result = $buku->create($input);
            if ($result) {
                $this->response(['message' => 'Buku created successfully'], 201);
            } else {
                $this->response(['message' => 'Failed to create buku'], 400);
            }
        } else {
            $this->response(['message' => 'Invalid input'], 400);
        }
    }

    public function update($id)
    {
        $input = json_decode(file_get_contents('php://input'), true);
        if ($input) {
            $buku = $this->model('Buku');
            $result = $buku->update($id, $input);
            if ($result) {
                $this->response(['message' => 'Buku updated successfully']);
            } else {
                $this->response(['message' => 'Failed to update buku'], 400);
            }
        } else {
            $this->response(['message' => 'Invalid input'], 400);
        }
    }

    public function delete($id)
    {
        $buku = $this->model('Buku');
        $result = $buku->delete($id);
        if ($result) {
            $this->response(['message' => 'Buku deleted successfully']);
        } else {
            $this->response(['message' => 'Failed to delete buku'], 400);
        }
    }
}
