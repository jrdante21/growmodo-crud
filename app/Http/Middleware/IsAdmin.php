<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user() &&  auth()->user()->admin >= 1) {
            return $next($request);
        }

        if (! $request->expectsJson()) {
            return redirect('/');
        } else {
            return response()->json([
                'message' => 'Action not allowed'
            ], 401);
        }
    }
}
