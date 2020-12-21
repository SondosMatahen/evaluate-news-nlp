function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    if(Client.checkForName(formText)){
        console.log("::: Form Submitted :::",formText)
        fetch('http://localhost:8081/getapi',{
            method:"POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({'key':url})
    
        })
        .then(res => res.json())
        .then(function(res) {
            document.getElementById('results').innerHTML = res.message
        })
    }else{
        console.log('not valid url')
        document.getElementById('results').innerHTML  = "error: not a valid url";
    }


}



export { handleSubmit }
