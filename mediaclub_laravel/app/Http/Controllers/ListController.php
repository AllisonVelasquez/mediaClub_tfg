<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShowUserListsRequest;
use Illuminate\Http\Request;

class ListController extends Controller
{
    public function myLists (Request $request) {}
    public function createList (MyListsRequest $request) {}
    public function editList (MyListsRequest $request) {}
    public function deleteList (MyListsRequest $request) {}
    public function showList (MyListsRequest $request) {} //ver los detalles, nombre y eso
    public function addFrame (MyListsRequest $request) {}
    public function removeFrame (MyListsRequest $request) {}
    public function showPublicUserLists (ShowUserListsRequest $request) {}
    // public function showUserListContent (Request $request) {}

}
