"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

const id = {
  UNKNOWN: "Tidak diketahui",
  SLUG_DOES_NOT_MATCH: "Slug tidak sesuai",
  SLUG_REQUIRED: "Slug organisasi wajib diisi",
  DELETE_ORGANIZATION_INSTRUCTIONS:
    "Masukkan slug organisasi untuk melanjutkan:",
  DELETE_ORGANIZATION_SUCCESS: "Organisasi berhasil dihapus",
  DELETE_ORGANIZATION_DESCRIPTION:
    "Hapus organisasi dan seluruh isinya secara permanen. Tindakan ini tidak dapat dibatalkan, harap lanjutkan dengan hati-hati.",
  DELETE_ORGANIZATION: "Hapus Organisasi",
  INVITATION_EXPIRED: "Undangan ini sudah kedaluwarsa",
  REJECT: "Tolak",
  ACCEPT: "Terima",
  INVITATION_REJECTED: "Undangan berhasil ditolak",
  INVITATION_ACCEPTED: "Undangan berhasil diterima",
  ACCEPT_INVITATION_DESCRIPTION:
    "Anda diundang untuk bergabung ke sebuah organisasi.",
  ACCEPT_INVITATION: "Terima Undangan",
  INVITATION_CANCELLED: "Undangan berhasil dibatalkan",
  CANCEL_INVITATION: "Batalkan Undangan",
  PENDING_USER_INVITATIONS_DESCRIPTION:
    "Undangan yang Anda terima dari organisasi.",
  PENDING_INVITATIONS_DESCRIPTION:
    "Kelola undangan yang masih tertunda di organisasi Anda.",
  PENDING_INVITATIONS: "Undangan Tertunda",
  SEND_INVITATION_SUCCESS: "Undangan berhasil dikirim",
  SEND_INVITATION: "Kirim Undangan",
  MEMBER_ROLE_UPDATED: "Peran anggota berhasil diperbarui",
  UPDATE_ROLE: "Perbarui Peran",
  UPDATE_ROLE_DESCRIPTION: "Perbarui peran untuk anggota ini",
  OWNER: "Pemilik",
  GUEST: "Tamu",
  MEMBER: "Anggota",
  ADMIN: "Admin",
  SELECT_ROLE: "Pilih peran",
  ROLE: "Peran",
  INVITE_MEMBER_DESCRIPTION:
    "Kirim undangan untuk menambahkan anggota baru ke organisasi Anda.",
  MEMBERS_INSTRUCTIONS: "Undang anggota baru ke organisasi Anda.",
  MEMBERS_DESCRIPTION:
    "Tambah atau hapus anggota dan atur peran masing-masing.",
  MEMBERS: "Anggota",
  INVITE_MEMBER: "Undang Anggota",
  REMOVE_MEMBER_SUCCESS: "Anggota berhasil dihapus",
  REMOVE_MEMBER_CONFIRM:
    "Anda yakin ingin menghapus anggota ini dari organisasi?",
  REMOVE_MEMBER: "Hapus Anggota",
  MANAGE_ORGANIZATION: "Kelola Organisasi",
  LEAVE_ORGANIZATION_SUCCESS: "Anda berhasil keluar dari organisasi ini.",
  LEAVE_ORGANIZATION_CONFIRM: "Anda yakin ingin keluar dari organisasi ini?",
  LEAVE_ORGANIZATION: "Keluar dari Organisasi",
  ORGANIZATIONS_INSTRUCTIONS:
    "Buat organisasi untuk berkolaborasi dengan pengguna lain.",
  ORGANIZATIONS_DESCRIPTION: "Kelola organisasi dan keanggotaan Anda.",
  ORGANIZATIONS: "Organisasi",
  USER: "Pengguna",
  BY_CONTINUING_YOU_AGREE: "Dengan melanjutkan, Anda menyetujui",
  PROTECTED_BY_RECAPTCHA: "Situs ini dilindungi oleh reCAPTCHA.",
  TERMS_OF_SERVICE: "Ketentuan Layanan",
  PRIVACY_POLICY: "Kebijakan Privasi",
  DELETE_LOGO: "Hapus Logo",
  UPLOAD_LOGO: "Unggah Logo",
  UPLOAD: "Unggah",
  LOGO_INSTRUCTIONS: "Logo bersifat opsional namun sangat dianjurkan.",
  LOGO_DESCRIPTION:
    "Klik pada logo untuk mengunggah logo kustom dari file Anda.",
  LOGO: "Logo",
  UPLOAD_AVATAR: "Unggah Avatar",
  SESSION_NOT_FRESH: "Sesi Anda sudah tidak segar. Silakan masuk kembali.",
  GO_BACK: "Kembali",
  VERIFY_YOUR_EMAIL_DESCRIPTION:
    "Silakan verifikasi alamat email Anda. Periksa kotak masuk untuk email verifikasi. Jika belum menerima email, klik tombol di bawah untuk mengirim ulang.",
  VERIFY_YOUR_EMAIL: "Verifikasi Email Anda",
  SIGN_IN_USERNAME_PLACEHOLDER: "Nama pengguna atau email",
  USERNAME_PLACEHOLDER: "Nama pengguna",
  USERNAME_INSTRUCTIONS: "Gunakan maksimal 32 karakter.",
  USERNAME_DESCRIPTION:
    "Masukkan nama pengguna yang ingin Anda gunakan untuk masuk.",
  USERNAME: "Nama Pengguna",
  UPDATED_SUCCESSFULLY: "Berhasil diperbarui",
  UNLINK: "Putuskan Tautan",
  SEND_VERIFICATION_CODE: "Kirim kode verifikasi",
  TWO_FACTOR_TOTP_LABEL: "Pindai kode QR dengan aplikasi autentikator Anda",
  TWO_FACTOR_PROMPT: "Autentikasi Dua Faktor",
  TWO_FACTOR_DISABLED: "Autentikasi dua faktor telah dinonaktifkan.",
  TWO_FACTOR_ENABLED: "Autentikasi dua faktor telah diaktifkan.",
  TWO_FACTOR_ENABLE_INSTRUCTIONS:
    "Masukkan kata sandi Anda untuk mengaktifkan 2FA.",
  TWO_FACTOR_DISABLE_INSTRUCTIONS:
    "Masukkan kata sandi Anda untuk menonaktifkan 2FA.",
  TWO_FACTOR_CARD_DESCRIPTION:
    "Tambahkan lapisan keamanan ekstra ke akun Anda.",
  TWO_FACTOR_DESCRIPTION:
    "Masukkan kata sandi satu kali (OTP) untuk melanjutkan.",
  TWO_FACTOR_ACTION: "Verifikasi kode",
  TWO_FACTOR: "Dua Faktor",
  TRUST_DEVICE: "Percayai perangkat ini",
  SWITCH_ACCOUNT: "Ganti Akun",
  SECURITY: "Keamanan",
  SAVE: "Simpan",
  SETTINGS: "Pengaturan",
  SET_PASSWORD_DESCRIPTION:
    "Klik tombol di bawah ini untuk menerima email pengaturan kata sandi.",
  SET_PASSWORD: "Atur Kata Sandi",
  SESSIONS_DESCRIPTION:
    "Kelola sesi aktif Anda dan cabut akses jika diperlukan.",
  SESSIONS: "Sesi",
  SIGN_UP_EMAIL: "Periksa email Anda untuk tautan verifikasi.",
  SIGN_UP_DESCRIPTION: "Masukkan informasi Anda untuk membuat akun.",
  SIGN_UP_ACTION: "Buat akun",
  SIGN_UP: "Daftar",
  SIGN_OUT: "Keluar",
  SIGN_IN_WITH: "Masuk dengan",
  SIGN_IN_USERNAME_DESCRIPTION:
    "Masukkan nama pengguna atau email untuk masuk ke akun Anda.",
  SIGN_IN_DESCRIPTION: "Masukkan email Anda untuk masuk ke akun.",
  SIGN_IN_ACTION: "Masuk",
  SIGN_IN: "Masuk",
  API_KEY: "API Key",
  DELETE_API_KEY_CONFIRM: "Anda yakin ingin menghapus API key ini?",
  DELETE_API_KEY: "Hapus API Key",
  REVOKE: "Cabut",
  REQUEST_FAILED: "Permintaan gagal",
  RESET_PASSWORD_SUCCESS: "Kata sandi berhasil direset",
  RESET_PASSWORD_DESCRIPTION: "Masukkan kata sandi baru di bawah ini.",
  RESET_PASSWORD_ACTION: "Simpan kata sandi baru",
  RESET_PASSWORD: "Reset Kata Sandi",
  RESEND_VERIFICATION_EMAIL: "Kirim ulang email verifikasi",
  RESEND_CODE: "Kirim ulang kode",
  REMEMBER_ME: "Ingat saya",
  RECOVER_ACCOUNT_DESCRIPTION:
    "Masukkan kode cadangan (backup code) untuk mengakses akun Anda.",
  RECOVER_ACCOUNT_ACTION: "Pulihkan akun",
  RECOVER_ACCOUNT: "Pulihkan Akun",
  PROVIDERS_DESCRIPTION: "Hubungkan akun Anda dengan layanan pihak ketiga.",
  PROVIDERS: "Penyedia",
  PASSWORDS_DO_NOT_MATCH: "Kata sandi tidak cocok",
  PASSWORD_REQUIRED: "Kata sandi wajib diisi",
  PASSWORD_PLACEHOLDER: "Kata sandi",
  PASSWORD: "Kata Sandi",
  CREATE_ORGANIZATION_SUCCESS: "Organisasi berhasil dibuat.",
  ORGANIZATION_SLUG_PLACEHOLDER: "acme-inc",
  ORGANIZATION_SLUG_INSTRUCTIONS: "Gunakan maksimal 48 karakter.",
  ORGANIZATION_SLUG_DESCRIPTION: "Ini adalah namespace URL organisasi Anda.",
  ORGANIZATION_SLUG: "Slug URL",
  ORGANIZATION_NAME_INSTRUCTIONS: "Gunakan maksimal 32 karakter.",
  ORGANIZATION_NAME_DESCRIPTION:
    "Ini adalah nama yang ditampilkan untuk organisasi Anda.",
  ORGANIZATION_NAME_PLACEHOLDER: "Acme Inc.",
  ORGANIZATION_NAME: "Nama",
  ORGANIZATION: "Organisasi",
  CREATE_ORGANIZATION: "Buat Organisasi",
  NO_EXPIRATION: "Tanpa kedaluwarsa",
  EXPIRES: "Berakhir",
  NEVER_EXPIRES: "Tidak pernah kedaluwarsa",
  CREATE_API_KEY_SUCCESS:
    "Salin API key Anda dan simpan di tempat yang aman. Demi keamanan, kami tidak dapat menampilkannya lagi.",
  API_KEY_CREATED: "API Key Dibuat",
  API_KEY_NAME_PLACEHOLDER: "API Key Baru",
  CREATE_API_KEY_DESCRIPTION:
    "Masukkan nama unik untuk API key agar mudah dibedakan.",
  CREATE_API_KEY: "Buat API Key",
  API_KEYS_INSTRUCTIONS:
    "Buat API key untuk mengakses akun Anda secara terprogram.",
  API_KEYS_DESCRIPTION: "Kelola API key Anda untuk akses yang aman.",
  API_KEYS: "API Keys",
  PERSONAL_ACCOUNT: "Akun Pribadi",
  PASSKEYS_INSTRUCTIONS: "Akses akun Anda dengan aman tanpa kata sandi.",
  PASSKEYS_DESCRIPTION: "Kelola passkey Anda untuk akses yang aman.",
  PASSKEYS: "Passkeys",
  PASSKEY: "Passkey",
  OR_CONTINUE_WITH: "Atau lanjutkan dengan",
  ONE_TIME_PASSWORD: "Kode Satu Kali (OTP)",
  NEW_PASSWORD_REQUIRED: "Kata sandi baru wajib diisi",
  NEW_PASSWORD_PLACEHOLDER: "Kata sandi baru",
  NEW_PASSWORD: "Kata Sandi Baru",
  NAME_PLACEHOLDER: "Nama",
  NAME_INSTRUCTIONS: "Gunakan maksimal 32 karakter.",
  NAME_DESCRIPTION: "Masukkan nama lengkap atau nama tampilan Anda.",
  NAME: "Nama",
  EMAIL_OTP_VERIFICATION_SENT: "Silakan cek email Anda untuk kode verifikasi.",
  EMAIL_OTP_DESCRIPTION: "Masukkan email untuk menerima kode.",
  EMAIL_OTP_VERIFY_ACTION: "Verifikasi kode",
  EMAIL_OTP_SEND_ACTION: "Kirim kode",
  EMAIL_OTP: "Kode Email",
  MAGIC_LINK_EMAIL: "Periksa email Anda untuk tautan magic link.",
  MAGIC_LINK_DESCRIPTION: "Masukkan email untuk menerima magic link.",
  MAGIC_LINK_ACTION: "Kirim magic link",
  MAGIC_LINK: "Magic Link",
  LINK: "Tautkan",
  FORGOT_PASSWORD_LINK: "Lupa kata sandi?",
  FORGOT_PASSWORD_EMAIL: "Periksa email Anda untuk tautan reset kata sandi.",
  FORGOT_PASSWORD_DESCRIPTION: "Masukkan email untuk mereset kata sandi.",
  FORGOT_PASSWORD_ACTION: "Kirim tautan reset",
  FORGOT_PASSWORD: "Lupa Kata Sandi",
  FORGOT_AUTHENTICATOR: "Lupa autentikator?",
  IS_THE_SAME: "sama",
  IS_REQUIRED: "wajib diisi",
  IS_INVALID: "tidak valid",
  ENABLE_TWO_FACTOR: "Aktifkan Autentikasi Dua Faktor",
  EMAIL_VERIFICATION: "Silakan cek email Anda untuk tautan verifikasi.",
  EMAIL_VERIFY_CHANGE: "Silakan cek email Anda untuk memverifikasi perubahan.",
  EMAIL_REQUIRED: "Alamat email wajib diisi",
  EMAIL_PLACEHOLDER: "nama@contoh.com",
  EMAIL_IS_THE_SAME: "Email sama seperti sebelumnya.",
  EMAIL_INSTRUCTIONS: "Masukkan alamat email yang valid.",
  EMAIL_DESCRIPTION: "Masukkan email yang akan digunakan untuk masuk.",
  EMAIL: "Email",
  DONE: "Selesai",
  DONT_HAVE_AN_ACCOUNT: "Belum punya akun?",
  DISABLED_CREDENTIALS_DESCRIPTION: "Pilih penyedia untuk masuk ke akun Anda.",
  DISABLE_TWO_FACTOR: "Nonaktifkan Autentikasi Dua Faktor",
  DELETE_ACCOUNT_SUCCESS: "Akun Anda telah dihapus.",
  DELETE_ACCOUNT_VERIFY:
    "Silakan cek email Anda untuk memverifikasi penghapusan akun.",
  DELETE_ACCOUNT_INSTRUCTIONS:
    "Konfirmasi penghapusan akun Anda. Tindakan ini tidak dapat dibatalkan, harap lanjutkan dengan hati-hati.",
  DELETE_ACCOUNT_DESCRIPTION:
    "Hapus akun dan semua isinya secara permanen. Tindakan ini tidak dapat dibatalkan, harap lanjutkan dengan hati-hati.",
  DELETE_ACCOUNT: "Hapus Akun",
  DELETE_AVATAR: "Hapus Avatar",
  DELETE: "Hapus",
  CURRENT_SESSION: "Sesi Saat Ini",
  CURRENT_PASSWORD_PLACEHOLDER: "Kata sandi saat ini",
  CURRENT_PASSWORD: "Kata Sandi Saat Ini",
  CONTINUE: "Lanjutkan",
  COPY_ALL_CODES: "Salin semua kode",
  COPY_TO_CLIPBOARD: "Salin ke clipboard",
  COPIED_TO_CLIPBOARD: "Berhasil disalin ke clipboard",
  CONTINUE_WITH_AUTHENTICATOR: "Lanjutkan dengan Autentikator",
  CONFIRM_PASSWORD_REQUIRED: "Konfirmasi kata sandi wajib diisi",
  CONFIRM_PASSWORD_PLACEHOLDER: "Konfirmasi kata sandi",
  CONFIRM_PASSWORD: "Konfirmasi Kata Sandi",
  CHANGE_PASSWORD_SUCCESS: "Kata sandi Anda berhasil diubah.",
  CHANGE_PASSWORD_INSTRUCTIONS: "Gunakan minimal 8 karakter.",
  CHANGE_PASSWORD_DESCRIPTION:
    "Masukkan kata sandi saat ini dan kata sandi baru.",
  CHANGE_PASSWORD: "Ubah Kata Sandi",
  CANCEL: "Batal",
  BACKUP_CODE: "Kode Cadangan",
  BACKUP_CODE_PLACEHOLDER: "Kode cadangan.",
  BACKUP_CODES_DESCRIPTION:
    "Simpan kode cadangan ini di tempat yang aman. Anda dapat menggunakannya untuk mengakses akun jika kehilangan metode autentikasi dua faktor.",
  BACKUP_CODES: "Kode Cadangan",
  BACKUP_CODE_REQUIRED: "Kode cadangan wajib diisi",
  AVATAR_INSTRUCTIONS: "Avatar bersifat opsional namun sangat dianjurkan.",
  AVATAR_DESCRIPTION:
    "Klik avatar untuk mengunggah gambar kustom dari file Anda.",
  AVATAR: "Avatar",
  ALREADY_HAVE_AN_ACCOUNT: "Sudah punya akun?",
  ADD_PASSKEY: "Tambah Passkey",
  ADD_ACCOUNT: "Tambah Akun",
  ACCOUNTS_INSTRUCTIONS: "Masuk ke akun tambahan.",
  ACCOUNTS_DESCRIPTION: "Kelola akun yang sedang Anda gunakan.",
  ACCOUNTS: "Akun",
  ACCOUNT: "Akun",
  APP: "Aplikasi",
  USER_ALREADY_HAS_PASSWORD: "Pengguna sudah memiliki kata sandi.",
  ACCOUNT_NOT_FOUND: "Akun tidak ditemukan.",
  FAILED_TO_UNLINK_LAST_ACCOUNT: "Tidak dapat memutus tautan akun terakhir.",
  SESSION_EXPIRED: "Sesi Anda telah kedaluwarsa.",
  CREDENTIAL_ACCOUNT_NOT_FOUND: "Kredensial akun tidak ditemukan.",
  EMAIL_CAN_NOT_BE_UPDATED: "Email tidak dapat diperbarui.",
  PASSWORD_TOO_LONG: "Kata sandi terlalu panjang.",
  PASSWORD_TOO_SHORT: "Kata sandi terlalu pendek.",
  USER_EMAIL_NOT_FOUND: "Email pengguna tidak ditemukan.",
  FAILED_TO_GET_USER_INFO: "Gagal mengambil informasi pengguna.",
  ID_TOKEN_NOT_SUPPORTED: "ID token tidak didukung.",
  INVALID_TOKEN: "Token tidak valid.",
  PROVIDER_NOT_FOUND: "Penyedia tidak ditemukan.",
  SOCIAL_ACCOUNT_ALREADY_LINKED: "Akun sosial sudah tertaut.",
  INVALID_EMAIL_OR_PASSWORD: "Email atau kata sandi tidak valid.",
  INVALID_PASSWORD: "Kata sandi tidak valid.",
  FAILED_TO_GET_SESSION: "Gagal mengambil sesi.",
  FAILED_TO_UPDATE_USER: "Gagal memperbarui pengguna.",
  FAILED_TO_CREATE_SESSION: "Gagal membuat sesi.",
  BANNED_USER: "Pengguna diblokir.",
  YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD:
    "Anda tidak diizinkan mengatur kata sandi pengguna.",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS:
    "Anda tidak diizinkan menghapus pengguna.",
  YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS:
    "Anda tidak diizinkan mencabut sesi pengguna.",
  YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS:
    "Anda tidak diizinkan menyamar sebagai pengguna lain.",
  YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "Anda tidak diizinkan memblokir pengguna.",
  YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS:
    "Anda tidak diizinkan melihat daftar sesi pengguna.",
  YOU_ARE_NOT_ALLOWED_TO_LIST_USERS:
    "Anda tidak diizinkan melihat daftar pengguna.",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS:
    "Anda tidak diizinkan membuat pengguna baru.",
  YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE:
    "Anda tidak diizinkan mengubah peran pengguna.",
  YOU_CANNOT_BAN_YOURSELF: "Anda tidak dapat memblokir diri sendiri.",
  USER_ALREADY_EXISTS: "Pengguna sudah ada.",
  ANONYMOUS_USERS_CANNOT_SIGN_IN_AGAIN_ANONYMOUSLY:
    "Pengguna anonim tidak dapat masuk lagi sebagai anonim.",
  COULD_NOT_CREATE_SESSION: "Tidak dapat membuat sesi.",
  FAILED_TO_CREATE_USER: "Gagal membuat pengguna.",
  SERVER_ONLY_PROPERTY: "Properti ini hanya dapat digunakan di server.",
  INVALID_API_KEY_GETTER_RETURN_TYPE:
    "Tipe pengembalian API key getter tidak valid.",
  INVALID_USER_ID_FROM_API_KEY: "User ID dari API key tidak valid.",
  INVALID_API_KEY: "API key tidak valid.",
  KEY_DISABLED_EXPIRATION: "Kedaluwarsa kunci dinonaktifkan.",
  NO_VALUES_TO_UPDATE: "Tidak ada nilai yang diperbarui.",
  RATE_LIMIT_EXCEEDED: "Batas permintaan terlampaui. Coba lagi nanti.",
  METADATA_DISABLED: "Metadata dinonaktifkan.",
  INVALID_NAME_LENGTH: "Panjang nama tidak valid.",
  INVALID_PREFIX_LENGTH: "Panjang prefix tidak valid.",
  INVALID_REMAINING: "Nilai sisa tidak valid.",
  EXPIRES_IN_IS_TOO_LARGE: "Masa kedaluwarsa terlalu lama.",
  EXPIRES_IN_IS_TOO_SMALL: "Masa kedaluwarsa terlalu pendek.",
  KEY_NOT_RECOVERABLE: "Kunci tidak dapat dipulihkan.",
  USAGE_EXCEEDED: "Penggunaan melebihi batas.",
  KEY_EXPIRED: "Kunci sudah kedaluwarsa.",
  KEY_DISABLED: "Kunci dinonaktifkan.",
  KEY_NOT_FOUND: "Kunci tidak ditemukan.",
  UNAUTHORIZED_SESSION: "Sesi tidak diotorisasi.",
  USER_BANNED: "Pengguna diblokir.",
  REFILL_INTERVAL_AND_AMOUNT_REQUIRED:
    "Interval dan jumlah isi ulang wajib diisi.",
  REFILL_AMOUNT_AND_INTERVAL_REQUIRED:
    "Jumlah dan interval isi ulang wajib diisi.",
  INVALID_METADATA_TYPE: "Tipe metadata tidak valid.",
  UNKNOWN_ERROR: "Terjadi kesalahan yang tidak diketahui.",
  MISSING_RESPONSE: "Respons tidak ditemukan.",
  VERIFICATION_FAILED: "Verifikasi gagal.",
  SERVICE_UNAVAILABLE: "Layanan sedang tidak tersedia.",
  MISSING_SECRET_KEY: "Secret key tidak tersedia.",
  TOO_MANY_ATTEMPTS: "Terlalu banyak percobaan. Coba lagi nanti.",
  USER_NOT_FOUND: "Pengguna tidak ditemukan.",
  INVALID_EMAIL: "Email tidak valid.",
  INVALID_OAUTH_CONFIGURATION: "Konfigurasi OAuth tidak valid.",
  PASSWORD_COMPROMISED: "Kata sandi telah bocor atau dikompromikan.",
  INVALID_SESSION_TOKEN: "Token sesi tidak valid.",
  INVITATION_LIMIT_REACHED: "Batas undangan telah tercapai.",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM:
    "Anda tidak diizinkan menghapus tim ini.",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM:
    "Anda tidak diizinkan memperbarui tim ini.",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION:
    "Anda tidak diizinkan menghapus tim di organisasi ini.",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION:
    "Anda tidak diizinkan membuat tim di organisasi ini.",
  ORGANIZATION_MEMBERSHIP_LIMIT_REACHED:
    "Batas jumlah anggota organisasi telah tercapai.",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER:
    "Anda tidak diizinkan memperbarui anggota ini.",
  UNABLE_TO_REMOVE_LAST_TEAM: "Tidak dapat menghapus tim terakhir.",
  YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS:
    "Anda telah mencapai jumlah tim maksimum.",
  FAILED_TO_RETRIEVE_INVITATION: "Gagal mengambil undangan.",
  YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE:
    "Anda tidak diizinkan mengundang pengguna dengan peran ini.",
  INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION:
    "Pengundang sudah bukan anggota organisasi.",
  YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION:
    "Anda tidak diizinkan membatalkan undangan ini.",
  YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION:
    "Anda bukan penerima undangan ini.",
  INVITATION_NOT_FOUND: "Undangan tidak ditemukan.",
  USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION:
    "Pengguna sudah diundang ke organisasi ini.",
  YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION:
    "Anda tidak diizinkan mengundang pengguna ke organisasi ini.",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER:
    "Anda tidak diizinkan menghapus anggota ini.",
  YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER:
    "Anda tidak dapat keluar sebagai satu-satunya pemilik organisasi.",
  TEAM_NOT_FOUND: "Tim tidak ditemukan.",
  TEAM_ALREADY_EXISTS: "Tim sudah ada.",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM:
    "Anda tidak diizinkan membuat tim baru.",
  ROLE_NOT_FOUND: "Peran tidak ditemukan.",
  MEMBER_NOT_FOUND: "Anggota tidak ditemukan.",
  USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION:
    "Pengguna sudah menjadi anggota organisasi ini.",
  NO_ACTIVE_ORGANIZATION: "Tidak ada organisasi aktif.",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION:
    "Anda tidak diizinkan menghapus organisasi ini.",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION:
    "Anda tidak diizinkan memperbarui organisasi ini.",
  USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION:
    "Pengguna bukan anggota organisasi ini.",
  ORGANIZATION_NOT_FOUND: "Organisasi tidak ditemukan.",
  ORGANIZATION_ALREADY_EXISTS: "Organisasi sudah ada.",
  YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS:
    "Anda telah mencapai jumlah organisasi maksimum.",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION:
    "Anda tidak diizinkan membuat organisasi baru.",
  FAILED_TO_UPDATE_PASSKEY: "Gagal memperbarui passkey.",
  UNABLE_TO_CREATE_SESSION: "Tidak dapat membuat sesi.",
  AUTHENTICATION_FAILED: "Autentikasi gagal.",
  PASSKEY_NOT_FOUND: "Passkey tidak ditemukan.",
  FAILED_TO_VERIFY_REGISTRATION: "Gagal memverifikasi pendaftaran.",
  YOU_ARE_NOT_ALLOWED_TO_REGISTER_THIS_PASSKEY:
    "Anda tidak diizinkan mendaftarkan passkey ini.",
  CHALLENGE_NOT_FOUND: "Challenge tidak ditemukan.",
  PHONE_NUMBER_NOT_VERIFIED: "Nomor telepon belum diverifikasi.",
  INVALID_OTP: "OTP tidak valid.",
  OTP_EXPIRED: "OTP sudah kedaluwarsa.",
  OTP_NOT_FOUND: "OTP tidak ditemukan.",
  INVALID_PHONE_NUMBER_OR_PASSWORD:
    "Nomor telepon atau kata sandi tidak valid.",
  PHONE_NUMBER_EXIST: "Nomor telepon sudah terdaftar.",
  INVALID_PHONE_NUMBER: "Nomor telepon tidak valid.",
  SUBSCRIPTION_NOT_SCHEDULED_FOR_CANCELLATION:
    "Langganan tidak dijadwalkan untuk dibatalkan.",
  SUBSCRIPTION_NOT_ACTIVE: "Langganan tidak aktif.",
  EMAIL_VERIFICATION_REQUIRED: "Verifikasi email diperlukan.",
  FAILED_TO_FETCH_PLANS: "Gagal mengambil daftar paket.",
  UNABLE_TO_CREATE_CUSTOMER: "Tidak dapat membuat data pelanggan.",
  ALREADY_SUBSCRIBED_PLAN: "Anda sudah berlangganan paket ini.",
  SUBSCRIPTION_PLAN_NOT_FOUND: "Paket langganan tidak ditemukan.",
  SUBSCRIPTION_NOT_FOUND: "Langganan tidak ditemukan.",
  INVALID_TWO_FACTOR_COOKIE: "Cookie dua faktor tidak valid.",
  TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE:
    "Terlalu banyak percobaan. Silakan minta kode baru.",
  INVALID_CODE: "Kode tidak valid.",
  INVALID_BACKUP_CODE: "Kode cadangan tidak valid.",
  BACKUP_CODES_NOT_ENABLED: "Kode cadangan belum diaktifkan.",
  TWO_FACTOR_NOT_ENABLED: "Autentikasi dua faktor belum diaktifkan.",
  TOTP_NOT_ENABLED: "TOTP belum diaktifkan.",
  OTP_HAS_EXPIRED: "OTP telah kedaluwarsa.",
  OTP_NOT_ENABLED: "OTP belum diaktifkan.",
  INVALID_USERNAME: "Nama pengguna tidak valid.",
  USERNAME_TOO_LONG: "Nama pengguna terlalu panjang.",
  USERNAME_TOO_SHORT: "Nama pengguna terlalu pendek.",
  USERNAME_IS_ALREADY_TAKEN: "Nama pengguna sudah digunakan.",
  UNEXPECTED_ERROR: "Terjadi kesalahan tak terduga.",
  EMAIL_NOT_VERIFIED: "Email belum diverifikasi.",
  INVALID_USERNAME_OR_PASSWORD: "Nama pengguna atau kata sandi tidak valid.",
} as const;

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        router.refresh();
      }}
      social={{
        providers: ["github"],
      }}
      Link={Link}
      localization={id}
    >
      {children}
    </AuthUIProvider>
  );
}
