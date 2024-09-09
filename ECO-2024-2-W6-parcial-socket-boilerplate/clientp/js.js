const socket = io('http://localhost:5050', { path: '/real-time' });

document.getElementById('pasajeroForm').addEventListener('submit', function (event) {
	event.preventDefault();

	const username = document.getElementById('username').value.trim();

	if (username) {
		socket.emit('joinGame', { username, role: 'jugador' });
		alert('Pasajero registrado');

		socket.on('userJoined', (data) => {
			console.log('User joined:', data);
			// Redirect to another page
			window.location.href = 'http://127.0.0.1:3001/iniciar/inicio.html';
		});
	} else {
		alert('Por favor, ingresa tu nombre.');
	}
});

