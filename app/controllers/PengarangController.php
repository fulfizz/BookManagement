<?php
class PengarangController extends Controller
{
    public function index()
    {
        $pengarang = $this->model('Pengarang');
        $data = $pengarang->getAll();
        $this->response($data);
    }

    public function show($id)
    {
        $pengarang = $this->model('Pengarang');
        $data = $pengarang->getById($id);
        if ($data) {
            $this->response($data);
        } else {
            $this->response(['message' => 'Pengarang not found'], 404);
        }
    }

    public function create()
    {
        $input = json_decode(file_get_contents('php://input'), true);
        if ($input) {
            $pengarang = $this->model('Pengarang');
            $result = $pengarang->create($input);
            if ($result) {
                $this->response(['message' => 'Pengarang created successfully'], 201);
            } else {
                $this->response(['message' => 'Failed to create pengarang'], 400);
            }
        } else {
            $this->response(['message' => 'Invalid input'], 400);
        }
    }

    public function update($id)
    {
        $input = json_decode(file_get_contents('php://input'), true);
        if ($input) {
            $pengarang = $this->model('Pengarang');
            $result = $pengarang->update($id, $input);
            if ($result) {
                $this->response(['message' => 'Pengarang updated successfully']);
            } else {
                $this->response(['message' => 'Failed to update pengarang'], 400);
            }
        } else {
            $this->response(['message' => 'Invalid input'], 400);
        }
    }

    public function delete($id)
    {
        $pengarang = $this->model('Pengarang');
        $result = $pengarang->delete($id);
        if ($result) {
            $this->response(['message' => 'Pengarang deleted successfully']);
        } else {
            $this->response(['message' => 'Failed to delete pengarang'], 400);
        }
    }
}
