const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let count=0;

do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Appending a message 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Sending to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    if(type=='incoming')
    {
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `
        mainDiv.innerHTML = markup
        messageArea.appendChild(mainDiv)
    }
    else
    {   
        let delButton=document.createElement('button');
        delButton.innerHTML='<img class="deleteImg" src="/delete.png" />';
        delButton.classList.add('deleteButton');
        let str="del"+ count++;
        delButton.id=str;
        delButton.onclick=function() { del(str);};
        let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        
        `
        mainDiv.innerHTML = markup
        mainDiv.appendChild(delButton);
        messageArea.appendChild(mainDiv)
    }
    
}
function del(id)
        {
            document.getElementById(id).parentNode.remove();
        }
// Receiving the messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



