// Do not deploy or upload this Open AI API Key onto Github
const API_KEY = ""

const submitButton = document.querySelector('#submit')
const outputContent = document.querySelector('#output')
const inputText = document.querySelector('input')
const history = document.querySelector('.history')
const clearButton = document.querySelector('button')

async function getMessage(){
    console.log('clicked')
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "user",
                    content: inputText.value
                }],
                max_tokens: 256
            })
        })
        const data = await response.json()
        console.log(data)
        outputContent.textContent = data.choices[0].message.content
        if(data.choices[0].message.content && inputText.value){
            const pElement = document.createElement('p')
            pElement.textContent = inputText.value
            pElement.addEventListener('click', () => {
                const inputText = document.querySelector('input')
                inputText.value = pElement.textContent 
            })
            history.append(pElement)
        }
    } 
    catch(error){
        console.error(error)
    }
}

function clearInput(){
    inputText.value = ''
}

submitButton.addEventListener('click', getMessage)
inputText.addEventListener('keydown', function(event){
    if(event.code == "Enter"){
        getMessage()
    }
})
clearButton.addEventListener('click', clearInput)