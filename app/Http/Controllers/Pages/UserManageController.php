<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class UserManageController extends Controller
{
    public function show(Request $request): Response
    {
        $search = $request->query('search', '');

        $query = User::query()
            ->when(
                $search,
                fn($query) =>
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
            )
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        $query->getCollection()->transform(function (User $user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at?->diffForHumans(),
            ];
        });

        $users = [
            'data' => $query->items(),
            'meta' => [
                'current_page' => $query->currentPage(),
                'from' => $query->firstItem() ?? 0,
                'last_page' => $query->lastPage(),
                'per_page' => $query->perPage(),
                'to' => $query->lastItem() ?? 0,
                'total' => $query->total(),
            ],
            'links' => [
                'prev' => $query->previousPageUrl(),
                'next' => $query->nextPageUrl(),
                'pages' => $query->linkCollection()
                    ->filter(fn(array $link) => is_numeric($link['label']) || $link['active'])
                    ->map(function (array $link) {
                        $page = is_numeric($link['label']) ? (int) $link['label'] : null;

                        return [
                            'label' => $link['label'],
                            'url' => $link['url'],
                            'page' => $page,
                            'active' => $link['active'],
                        ];
                    })
                    ->values(),
            ],
        ];

        return Inertia::render('user-manage', [
            'users' => $users,
            'filters' => [
                'search' => $search,
            ],
            'success' => $request->session()->get('success'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('user-create');
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('users')->with('success', 'Pengguna berhasil ditambahkan.');
    }

    public function edit(User $user): Response
    {
        return Inertia::render('user-edit', [
            'user' => $user,
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $validated = $request->validated();

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password']
                ? Hash::make($validated['password'])
                : $user->password,
        ]);

        return redirect()->route('users')->with('success', 'Data pengguna berhasil diperbarui.');
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect()->route('users')->with('success', 'Pengguna berhasil dihapus.');
    }
}
