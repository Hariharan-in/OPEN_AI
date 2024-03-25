const API_KEY = "API_KEY";
const API_URL = "https://api.openai.com/v1/chat/completions";


const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");
const searchText = document.getElementById("searchText");

let controller = null;

const generate = async () => {
  
  if (!promptInput.value) {
    alert("Please enter a prompt.");
    return;
  }

  generateBtn.disabled = true;
  stopBtn.disabled = false;
  resultText.innerText = "Generating...";
  searchText.innerText = promptInput.value


  controller = new AbortController();
  const signal = controller.signal;

  try {
 
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptInput.value }],
        max_tokens: 1000,
       
      }),
      signal, 
    });

    const data = await response.json();
    resultText.innerText = data.choices[0].message.content;
  } catch (error) {

    if (signal.aborted) {
      resultText.innerText = "Request aborted.";
    } else {
      console.error("Error:", error);
      resultText.innerText = "Error occurred while generating.";
    }
  } finally {

    generateBtn.disabled = false;
    stopBtn.disabled = true;
    controller = null; 
    promptInput.value = null
    
  }
};

const stop = () => {
  
  if (controller) {
    controller.abort();
    controller = null;
  }
};

promptInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    generate();
  }
});
generateBtn.addEventListener("click", generate);
stopBtn.addEventListener("click", stop);