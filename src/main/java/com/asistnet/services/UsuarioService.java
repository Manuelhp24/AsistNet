package com.asistnet.services;

import com.asistnet.entities.Usuario;
import com.asistnet.repositories.UsuarioRepository;
import java.util.List;

public class UsuarioService {
    private UsuarioRepository usuarioRepository;
    
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    
    public boolean autenticarUsuario(String username, String password) {
        Usuario usuario = usuarioRepository.buscarPorUsername(username);
        if (usuario != null && usuario.getPassword().equals(password)) {
            System.out.println("✅ Usuario autenticado: " + username);
            return true;
        }
        System.out.println("❌ Autenticación fallida para: " + username);
        return false;
    }
    
    public List<Usuario> obtenerTodosUsuarios() {
        return usuarioRepository.obtenerTodosUsuarios();
    }
    
    public boolean registrarUsuario(String username, String password, String rol) {
        // Validar que el usuario no exista
        if (usuarioRepository.buscarPorUsername(username) != null) {
            System.out.println("❌ Usuario ya existe: " + username);
            return false;
        }
        
        // Crear y guardar nuevo usuario
        Usuario nuevoUsuario = new Usuario(0, username, password, rol);
        usuarioRepository.guardarUsuario(nuevoUsuario);
        System.out.println("✅ Usuario registrado: " + username);
        return true;
    }
}
