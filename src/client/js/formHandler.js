function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value

    if (Client.checkForName(formText)) {
        console.log("::: Form Submitted :::", formText)

        // let result = document.getElementById('result');

        // result.textContent = "loading..";

        fetch('http://localhost:8082/getapi', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 'key': formText })

        })
            .then(res => {
                console.log("handleSubmittttt" + res)
                console.log("handleSubmittttt" + res.json())

                res.json()})
            .then(function(res){
                console.log("handleSubmit" + JSON.stringify(res))
            
                var text = `
                    Model: ${res.model}  
                    Score: ${res.score_tag}  
                    Irony: ${res.irony} 
                    Confidence: ${checkConfidence(res.confidence)}
                `;
    
                result.innerText = text;
            })
    } else {
        console.log('not valid url')
        document.getElementById('results').innerHTML = "error: not a valid url";
    }


}

function checkConfidence(confidenceLevel){
    if(confidenceLevel>50){
        return "confident";
    }else{
        return "not confident"
    }
}

export { handleSubmit }
