document.addEventListener('DOMContentLoaded', ()=>{
    const txtPrompt = document.getElementById('prompt');
    const btnSend = document.getElementById('btnSend');
    const responseDiv = document.getElementById('response');

    btnSend.addEventListener('click', async ()=> {
        const text = txtPrompt.value.trim();
        if(!text) return;

        btnSend.disabled = true;
        responseDiv.textContent = "Pensando...";

        const res = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                model: "qwen2.5:0.5b",
                prompt: text,
                stream: false
            })
        });

        const data = await res.json();
        responseDiv.textContent = data.response ?? '(Sin respuesta)';

        btnSend.disabled = false;
        txtPrompt.value = "";
    });
})