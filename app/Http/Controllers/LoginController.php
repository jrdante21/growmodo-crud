<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        $user_type = filter_var($request->input('username'), FILTER_VALIDATE_EMAIL ) ? 'email' : 'username';
        $request->merge([
            $user_type => $request->input('username')
        ]);

        if (auth()->attempt($request->only($user_type, 'password'))) {
            return response()->json([
                'status' => true,
                'message' => 'Logged In Successfully',
                'token' => auth()->user()->createToken("API_TOKEN")->plainTextToken
            ], 200);

        } else {
            return response()->json([
                'status' => false,
                'message' => $user_type.' & password does not exist.',
            ], 401);
        }
    }

    public function logout()
    {
        auth()->logout();
    }
}
