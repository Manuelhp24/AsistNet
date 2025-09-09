from flask import Flask, render_template, jsonify, request, send_from_directory
from flask_cors import CORS
import os
import json
from datetime import datetime, timedelta
import random

# Configuración de la aplicación Flask
app = Flask(__name__, 
            template_folder='templates',
            static_folder='static')
app.secret_key = 'asistnet-secret-key-2024'
CORS(app)

# Configuración
app.config.update(
    DEBUG=True,
    JSONIFY_PRETTYPRINT_REGULAR=True
)

# Datos de ejemplo para simular una base de datos
class MockDB:
    def __init__(self):
        self.users = {
            'admin': {'password': 'admin123', 'role': 'admin', 'name': 'Administrador'},
            'estudiante1': {'password': 'student123', 'role': 'student', 'name': 'Juan Pérez'},
            'profesor1': {'password': 'teacher123', 'role': 'teacher', 'name': 'Ana Martínez'}
        }
        
        self.students = [
            {
                'id': 'EST2024001', 
                'name': 'Juan Pérez', 
                'email': 'juan@email.com',
                'phone': '+1234567890',
                'birthdate': '2000-05-15',
                'avatar': '/static/img/avatars/student1.jpg',
                'attendance_rate': 92,
                'active_courses': 3,
                'total_absences': 2
            }
        ]
        
        self.courses = [
            {
                'id': 'MATH101',
                'name': 'Matemáticas Avanzadas',
                'professor': 'Carlos Rodríguez',
                'schedule': 'Lun y Mié • 08:00-10:00',
                'students': 25,
                'attendance_rate': 95
            }
        ]
        
        self.attendance = self.generate_attendance_data()

    def generate_attendance_data(self):
        records = []
        statuses = ['present', 'present', 'present', 'present', 'present', 'late', 'absent']
        
        for i in range(30):
            date = (datetime.now() - timedelta(days=i)).strftime('%Y-%m-%d')
            records.append({
                'id': i + 1,
                'student_id': 'EST2024001',
                'course': random.choice(['Matemáticas', 'Programación', 'Inglés']),
                'date': date,
                'time': random.choice(['08:00', '09:30', '10:00']),
                'status': random.choice(statuses)
            })
        
        return records

# Instancia de la base de datos mock
db = MockDB()

# Rutas principales
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/perfil')
def profile():
    return render_template('perfil.html')

@app.route('/busqueda')
def search():
    return render_template('busqueda.html')

@app.route('/notificaciones')
def notifications():
    return render_template('notificaciones.html')

# API Routes
@app.route('/api/login', methods=['POST'])
def api_login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        user = db.users.get(username)
        if user and user['password'] == password:
            return jsonify({
                'success': True,
                'user': {
                    'username': username,
                    'name': user['name'],
                    'role': user['role']
                }
            })
        else:
            return jsonify({'success': False, 'message': 'Credenciales inválidas'}), 401
            
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/user/profile')
def api_user_profile():
    try:
        # Simular usuario autenticado (en producción usaría sesiones/JWT)
        student = db.students[0]
        return jsonify({
            'success': True,
            'data': student
        })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/user/attendance')
def api_user_attendance():
    try:
        student_id = request.args.get('student_id', 'EST2024001')
        limit = int(request.args.get('limit', 10))
        
        student_attendance = [r for r in db.attendance if r['student_id'] == student_id][:limit]
        
        return jsonify({
            'success': True,
            'data': student_attendance
        })
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/search')
def api_search():
    try:
        query = request.args.get('q', '')
        search_type = request.args.get('type', 'all')
        
        results = []
        
        # Búsqueda en estudiantes
        if search_type in ['all', 'students']:
            for student in db.students:
                if (query.lower() in student['name'].lower() or 
                    query.lower() in student['email'].lower()):
                    results.append({
                        'type': 'student',
                        'data': student
                    })
        
        # Búsqueda en cursos
        if search_type in ['all', 'courses']:
            for course in db.courses:
                if (query.lower() in course['name'].lower() or 
                    query.lower() in course['professor'].lower()):
                    results.append({
                        'type': 'course',
                        'data': course
                    })
        
        return jsonify({
            'success': True,
            'results': results,
            'count': len(results)
        })
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/notifications')
def api_notifications():
    try:
        # Notificaciones de ejemplo
        notifications = [
            {
                'id': 1,
                'type': 'alert',
                'title': '⚠️ Inasistencia consecutiva',
                'message': 'Juan Pérez tiene 3 inasistencias consecutivas en Matemáticas',
                'time': 'Hace 2 horas',
                'read': False
            },
            {
                'id': 2,
                'type': 'success',
                'title': '✅ Asistencia registrada',
                'message': 'Asistencia masiva del curso de Programación registrada correctamente',
                'time': 'Hace 5 horas',
                'read': True
            }
        ]
        
        return jsonify({
            'success': True,
            'data': notifications
        })
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/user/update', methods=['POST'])
def api_user_update():
    try:
        data = request.get_json()
        
        # Aquí se actualizaría en una base de datos real
        print('Datos recibidos para actualizar:', data)
        
        return jsonify({
            'success': True,
            'message': 'Perfil actualizado correctamente'
        })
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

# Servir archivos estáticos
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

# Manejo de errores
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'success': False, 'message': 'Error interno del servidor'}), 500

if __name__ == '__main__':
    # Crear carpeta de avatares si no existe
    os.makedirs('static/img/avatars', exist_ok=True)
    
    print("🚀 AsistNet Flask Server starting...")
    print("📁 Static files:", app.static_folder)
    print("📁 Templates:", app.template_folder)
    print("🌐 Server running on: http://localhost:5000")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
