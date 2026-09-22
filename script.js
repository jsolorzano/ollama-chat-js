document.addEventListener('DOMContentLoaded', ()=>{
    const txtPrompt = document.getElementById('prompt');
    const btnSend = document.getElementById('btnSend');
    const responseDiv = document.getElementById('response');

    btnSend.addEventListener('click', async ()=> {
        const text = txtPrompt.value.trim();
        if(!text) return;

        btnSend.disabled = true;
        responseDiv.textContent = "Pensando...";

        try {
            const res = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    model: "qwen2.5:0.5b",
                    prompt: text,
                    stream: false
                })
            });

            if(!res.ok){
                throw new Error("Error HTTP en la solicitud.");
            }

            const data = await res.json();
            responseDiv.textContent = data.response ?? '(Sin respuesta)';

            txtPrompt.value = "";
        } catch (error) {
            console.error(error);
            responseDiv.textContent = "Error al conectar con Ollama. Asegúrate de que el servicio esté en ejecución.";
        } finally {
            btnSend.disabled = false;
        }
        
    });
})