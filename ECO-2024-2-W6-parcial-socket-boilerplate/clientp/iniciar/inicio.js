
const socket = io('http://localhost:5050', {
  path: '/real-time'
});

document.addEventListener('DOMContentLoaded', () => {
  const playerListElement = document.getElementById('playerList');

  // Emit a joinGame event when the document is loaded
  socket.emit('joinGame', { name: 'Player' });

  // Listen for the userJoined event and update the player list
  socket.on('userJoined', (players) => {
    updatePlayerList(players);
    console.log('New user joined:', players);
  });

  function updatePlayerList(players) {
    playerListElement.innerHTML = '';
    players.forEach(player => {
      const li = document.createElement('li');
      li.textContent = `New user joined:'${player.username}`;
      playerListElement.appendChild(li);
    });
  }
});
