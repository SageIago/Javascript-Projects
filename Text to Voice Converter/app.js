// let voice = new SpeechSynthesisUtterance()

// let changeVoices = []
 
// let voiceChanger = document.querySelector("select")

// window.speechSynthesis.onvoiceschanged = ()=> {
//     changeVoices = window.speechSynthesis.getVoices()
// voice.changeVoices = voice[0]

// changeVoices.forEach((voices, i) => (voiceChanger.options[i] = new Option(voices.name, i)));
// }

// voiceChanger.addEventListener("change", ()=> {
//     voice.changeVoices = voice[voiceChanger.value]
// })

// const btn = document.getElementById("Listen")

// btn.addEventListener("click", ()=> {
//     voice.text = document.querySelector("textarea").value
//     window.speechSynthesis.speak(voice)
// })


const speech = new SpeechSynthesisUtterance()

let voice = []

window.speechSynthesis.onvoiceschanged = ()=> {
    voice = window.speechSynthesis.getVoices()
    speech.voice = voice[0]


    voice.forEach((voices, i)=> (voiceSelect.options[i] = new Option(voices.name, i)))
}


let voiceSelect = document.querySelector("select")
voiceSelect.addEventListener("change", ()=> {
    speech.voice = voice[voiceSelect.value]
})


const btn = document.getElementById("Listen")

btn.addEventListener("click", ()=> {
    speech.text = document.querySelector("textarea").value
    window.speechSynthesis.speak(speech)
})