<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\CreateListRequest;
use App\Http\Requests\EditListRequest;

use App\Actions\List\AddFrameToListAction;
use App\Actions\List\CreateListAction;
use App\Actions\List\DeleteListAction;
use App\Actions\List\GetMyListsAction;
use App\Actions\List\UpdateListAction;
use App\Actions\List\GetMyListContentAction;
use App\Actions\List\GetPublicListContentAction;
use App\Actions\List\GetPublicListsByFrameAction;
use App\Actions\List\GetUserPublicListsAction;
use App\Actions\List\RemoveFrameFromListAction;

use App\Models\Frame;
use App\Models\Lista;
use App\Models\Usuario;

class ListController extends Controller
{
    public function createList(CreateListRequest $request)
    {
        $me = $request->user();
        return app(CreateListAction::class)->execute($me, $request->validated());
    }
    public function editList(EditListRequest $request, Lista $lista)
    {
        $me = $request->user();
        return app(UpdateListAction::class)->execute($me, $lista, $request->validated());
    }
    public function deleteList(Request $request, Lista $lista)
    {
        $me = $request->user();
        return app(DeleteListAction::class)->execute($me, $lista);
    }
    public function myLists(Request $request)
    {
        return app(GetMyListsAction::class)->execute($request->user());
    }
    public function showMyListContent(Request $request, Lista $lista)
    {
        $me = $request->user();
        return app(GetMyListContentAction::class)->execute($me, $lista);
    }
    public function addFrame(Request $request, Lista $lista, Frame $frame)
    {
        $me = $request->user();

        return app(AddFrameToListAction::class)->execute($me, $lista, $frame);
    }
    public function removeFrame(Request $request, Lista $lista, Frame $frame)
    {
        $me = $request->user();
        return app(RemoveFrameFromListAction::class)->execute($me, $lista, $frame);
    }
    public function showPublicUserLists(Usuario $user)
    {
        return app(GetUserPublicListsAction::class)->execute($user);
    }
    public function showPublicUserListContent(Usuario $user, Lista $lista)
    {
        return app(GetPublicListContentAction::class)->execute($user, $lista);
    }

    public function showPublicListsByFrame(Frame $frame)
    {
        return app(GetPublicListsByFrameAction::class)->execute($frame);
    }

}
