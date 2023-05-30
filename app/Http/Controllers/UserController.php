<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin')->only('index');
        $this->middleware('guestuser')->only('destroy');
    }

    public function index()
    {
        $users = User::where('admin', 0)->withTrashed()->latest()->get();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|unique:users,username|alpha_num:ascii|min:5',
            'email' => 'required|unique:users,email|email',
            'phone_number' => 'required|numeric|digits_between:8,20',
            'password' => 'required|confirmed|min:5',
        ]);

        $validated['admin'] = 0;

        User::create($validated);
        return response()->json([
            'message' => 'Registered successfully'
        ], 200);
    }

    public function destroy(Request $request)
    {
        $request->user()->delete();
        return response()->json([], 200);
    }
}
