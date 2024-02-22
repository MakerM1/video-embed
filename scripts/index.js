const messageInput = document.getElementById('message')
const messageButton = document.getElementById('send')
const messageBox = document.getElementById('messageBox')
const urlRegex = /(?:https?:\/\/)?(?:[^\s:@]+:[^\s:@]+@)?(?:[^\s:@]+)\.(?:[^\s:@]+)(?:[:\d]+)?(?:\/(?:[^\s:@]+\/[^\s:@]+)*(?:[^\s:@]+))(?:\?[^\s:@]+(?:=[^\s:@]+)(?:&[^\s:@]+(?:=[^\s:@]+)*)*)?/i;



let vid;
let vidAuthor;
let vidAuthorLink;
let title;
let url;


function sendMessage(value) {
    if (messageInput.value !== '') {
        if (messageInput.value.includes('https://www.youtube.com/')) {
            const vidurl = messageInput.value.match(urlRegex)[0];

            console.log(vidurl);
            
            fetch(`https://noembed.com/embed?dataType=json&url=${vidurl}`)
            .then(res => res.json())
            .then(data => {
                vid = data.html
                vidAuthor = data.author_name
                vidAuthorLink = data.author_url
                title = data.title
                url = data.url

                console.log(vid, vidAuthor, vidAuthorLink, url);
            })
            .then(loadVid => {
                loadVid = `
            <li class="youtube">
                <a href="${messageInput.value}" target="_blank">${messageInput.value}<a/> 
                <br /> 
                <div class="vid-container">
                <div class="video-titles">
                    <a href="https://www.youtube.com/" target="_blank" class="youtube-link">YouTube</a>
                    <a href="${vidAuthorLink}" target="_blank" class="channel-name">${vidAuthor}</a>
                    <a href="${url}" target="_blank" class="video-title">${title}</a>
                </div>
                    ${vid}
                </div>
            </li>`

            let txtMessage = loadVid
            console.log(txtMessage);
            messageInput.value = ''
        
            messageBox.innerHTML += txtMessage
            })

        } else {
            let txtMessage = `<li> ${messageInput.value} </li>`
            messageInput.value = ''
            messageBox.innerHTML += txtMessage
        }
    }
}

messageButton.addEventListener('click', sendMessage)
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage()
    }
 })