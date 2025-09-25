package com.asistnet;

import com.asistnet.entities.Usuario;
import com.asistnet.repositories.UsuarioRepository;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        System.out.println("🚀 AsistNet Java Backend iniciado!");
        
        // Probar el repository
        UsuarioRepository usuarioRepo = new UsuarioRepository();
        
        // Obtener todos los usuarios
        List<Usuario> usuarios = usuarioRepo.obtenerTodosUsuarios();
        System.out.println("📊 Usuarios en el sistema:");
        
        for (Usuario usuario : usuarios) {
            System.out.println("  👤 " + usuario.toString());
        }
        
        // Agregar un nuevo usuario
        Usuario nuevoUsuario = new Usuario(0, "manuel", "password123", "ESTUDIANTE");
        usuarioRepo.guardarUsuario(nuevoUsuario);
        
        System.out.println("✅ Sistema de gestión de asistencias listo!");
        System.out.println("🌐 Frontend disponible en: frontend/index.html");
    }
}
