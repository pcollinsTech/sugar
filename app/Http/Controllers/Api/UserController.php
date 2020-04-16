<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\User;
use Auth;

class UserController extends Controller
{
    public function index(){

    }

    public function update(UserRequest $request, $id)
    {
        $user = User::findOrFail($id);

        $user->update($request->validated());

        return response()->json([
            'user' => $user
        ], 201);
    }
}
