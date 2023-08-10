function sendHeartbeat(SOCKET){
    setTimeout(sendHeartbeat, 8000)
    SOCKET.emit('ping', { beat : 1 })
}

module.exports = { sendHeartbeat }