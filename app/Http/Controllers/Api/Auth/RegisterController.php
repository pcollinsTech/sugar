<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required|min:3',
            'last_name' => 'required|min:3',
            'addressline_1' => 'required|min:3',
            'posttown' => 'required|min:3',
            'postcode' => 'required|min:3',
            'date_of_birth' => 'required|min:3',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6'
        ], [
            'password.confirmed' => 'The password does not match.'
        ]);

        try {
            event(new Registered($this->create($request->all())));

            $http = new Client;

            $response = $http->post(env('APP_URL') . '/oauth/token', [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => env('PASSWORD_CLIENT_ID'),
                    'client_secret' => env('PASSWORD_CLIENT_SECRET'),
                    'username' => $request->get('email'),
                    'password' => $request->get('password'),
                    'remember' => false,
                    'scope' => '',
                ],
            ]);

            return json_decode((string)$response->getBody(), true);
        } catch (\Exception $e) {
            dd($e->getMessage(), $e->getCode(), $e->getTrace());
            return response()->json([
                "error" => "invalid_credentials",
                "message" => "The user credentials were incorrect."
            ], 401);
        }
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'addressline_1' => $data['addressline_1'],
            'posttown' => $data['posttown'],
            'postcode' => $data['postcode'],
            'date_of_birth' => $data['date_of_birth'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }
}
