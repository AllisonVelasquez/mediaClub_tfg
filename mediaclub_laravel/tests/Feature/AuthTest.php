<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    public function test_registro_usuario_exitoso()
    {
        $data = [
            'login_id' => 'allis123',
            'correo' => 'test@example.com',
            'contrasena' => 'Password123.',
            'alias' => 'Allis Velasquez',
            'bio' => 'Hola soy Yo'
        ];
        $response = $this->postJson('/auth/registro', $data);

        $response->assertStatus(201);

        $this->assertDatabaseHas('usuarios', ['login_id' => $data['login_id']]);
    }

    // public function test_login_usuario_exitoso()
    // {
    //     $user = User::factory()->create([
    //         'password' => bcrypt('password123'),
    //     ]);

    //     $data = [
    //         'email' => $user->email,
    //         'password' => 'password123',
    //     ];

    //     $response = $this->postJson('/auth/login', $data);

    //     $response->assertStatus(200);
    //     $response->assertJsonStructure(['token']); // si devuelves token, por ejemplo
    // }

    // public function test_logout_usuario_autenticado()
    // {
    //     $user = User::factory()->create();

    //     $token = $user->createToken('test-token')->plainTextToken;

    //     $response = $this->withHeaders([
    //         'Authorization' => "Bearer $token",
    //     ])->postJson('/auth/logout');

    //     $response->assertStatus(200); // o el código que uses para logout exitoso
    // }
}
