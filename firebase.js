import { showModal } from './ui.js';

// Konfigurasi Firebase Anda yang baru (jeff-link)
const firebaseConfig = {
  apiKey: "AIzaSyC7KMPorNrZ4FzsYmQA1pMQh-X6f3YFPuI",
  authDomain: "jeff-link.firebaseapp.com",
  databaseURL: "https://jeff-link-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jeff-link",
  storageBucket: "jeff-link.firebasestorage.app",
  messagingSenderId: "207065312786",
  appId: "1:207065312786:web:8fd7e7067c7dd265e132cb",
  measurementId: "G-Z27PD0GBXY"
};

// Inisialisasi Firebase menggunakan metode Compat (agar web tidak rusak)
firebase.initializeApp(firebaseConfig);
export const db = firebase.database(); 
export const auth = firebase.auth();

export function masukSistem() {
    const e = document.getElementById('global-email').value; 
    const p = document.getElementById('global-pass').value;
    
    // Pastikan email dan password tidak kosong
    if (!e || !p) {
        return showModal("Peringatan", "Email dan Password tidak boleh kosong!", "alert");
    }

    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => auth.signInWithEmailAndPassword(e, p))
    .then(() => document.getElementById('main-menu-popup').classList.remove('active'))
    .catch((error) => {
        console.error("Error Firebase:", error);
        
        let pesanPeringatan = "Terjadi kesalahan saat mencoba login.";

        // Menerjemahkan kode error Firebase ke bahasa Indonesia
        switch (error.code) {
            case 'auth/user-not-found':
                pesanPeringatan = "Email ini belum terdaftar sebagai Admin.";
                break;
            case 'auth/wrong-password':
                pesanPeringatan = "Sandi yang Anda masukkan salah.";
                break;
            case 'auth/invalid-credential':
                pesanPeringatan = "Email atau Sandi yang dimasukkan tidak cocok.";
                break;
            case 'auth/invalid-email':
                pesanPeringatan = "Format email tidak valid (contoh yang benar: admin@mail.com).";
                break;
            case 'auth/user-disabled':
                pesanPeringatan = "Akun ini telah dinonaktifkan oleh sistem.";
                break;
            case 'auth/network-request-failed':
                pesanPeringatan = "Gagal terhubung ke server. Periksa koneksi internet Anda.";
                break;
            default:
                // Jika ada error lain yang tidak terdaftar di atas, tampilkan pesan aslinya
                pesanPeringatan = error.message; 
        }

        // Tampilkan pesan yang sudah disesuaikan ke layar
        showModal("Gagal Login", pesanPeringatan, "alert"); 
    });
}

export function keluarSistem() { 
    auth.signOut(); 
    document.getElementById('main-menu-popup').classList.remove('active'); 
}
