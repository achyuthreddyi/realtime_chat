const chatForm = document.getElementById('chat-form')
const chatMessages = document.getElementById('chat-messages')


const socket = io()

//message from server
socket.on('message',message =>{
    console.log(message);
    outputMessage(message)

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})


//message submit

chatForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    //get message text
    const msg = e.target.elements.msg.value
    e.target.elements.msg.value=''
    e.target.elements.msg.focus()

    //  emitting the message to server
    socket.emit('chatMessage',msg);
})

//output messgae to dom

function outputMessage(message){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${ message }
    </p>`

    document.querySelector('.chat-messages').appendChild(div)

}