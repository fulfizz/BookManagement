<?php
require_once '../config/config.php';
require_once '../core/Controller.php';
require_once '../core/Model.php';
require_once '../core/Router.php';

$router = new Router();
$router->route();
