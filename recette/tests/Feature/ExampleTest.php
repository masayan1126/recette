<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class ExampleTest extends TestCase
{
    // use RefreshDatabase;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_example()
    {
        // User::create([
        //     'name' =>  "テスと",
        //     'email' => "masa@gmail.com",
        //     'password' => Hash::make("masafjeiahei1124"),
        // ]);
        $user = User::find(2);
        // dd($user);
        Auth::login($user);
        $res = $this->getJson('api/user');
        $res->assertOk()->assertJsonCount(6);

        // dd($res->json());
    }
}
