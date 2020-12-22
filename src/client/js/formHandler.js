async function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value

    if (Client.checkForName(formText)) {
        console.log("::: Form Submitted :::", formText)

        // let result = document.getElementById('result');
        // result.textContent = "loading..";

        let resultdata = await fetch('http://localhost:8082/getapi', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 'key': formText })
        })
        let evaluation = await resultdata.json();
        console.log('ccccccccccccc',evaluation)
      
      
        // document.getElementById('results').innerHTML = evaluation;
        document.getElementById('agreement').innerHTML = `Agreement or disagreement: ${evaluation.agreement}`;
        document.getElementById('subjectivity').innerHTML = `Objective or subjective: ${evaluation.subjectivity}`;
        document.getElementById('confidence').innerHTML = `Evaluation confidence level (100 is max): ${evaluation.confidence}`;
        document.getElementById('irony').innerHTML = `Is it an ironic evaluation: ${evaluation.irony}`;
        document.getElementById('sentiment').innerHTML = `Sentiment: ${switchSentiment(evaluation.score_tag)}`;
    

    } else {
        console.log('not valid url')
        document.getElementById('results').innerHTML = "error: not a valid url";
    }


}

function checkConfidence(confidenceLevel) {
    if (confidenceLevel > 50) {
        return "confident";
    } else {
        return "not confident"
    }
}

export { handleSubmit }
