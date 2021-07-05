
// In this code we are going to code the index.js . So let's get started
console.log('To kaise hai aap log');

// Hiding the parameter box in starting but when anybody click on the custom parameter it will show and I will do it aage
let parameterValues = document.getElementById('parametersValues');
parameterValues.style.display = 'none';

// Hiding the json request box in starting but when anybody click on the json it will show and I will do it aage
let requestJsonBox = document.getElementById('requestJsonBox');
requestJsonBox.style.display = 'none';

// Now when user click on the json radio the request Json will show
let jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersValues').style.display = 'none';
})

// Now when user click on the custom parameter radio the parameter box will show
let paramsRadio = document.getElementById('paramsRadio')
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersValues').style.display = 'block';
})

// Now, If user wants to add more than one custom parameters then we have to add the parameters  and after adding he wants to remove that custom parameters. so let's code it
let addedCount = 0;
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    document.getElementById('addParams');
    let string = `    <div class="row g-3 my-2" id="parametersValues">
                        <label for="textArea" class="col-sm-2 col-form-label"><b>Enter Parameter${addedCount + 2}</b></label>
                        <div class="col-md-4">
                        <input type="text" id="parameterKey" class="form-control" placeholder="Enter Parameter ${addedCount + 2} key" >
                        </div>
                        <div class="col-md-4">
                        <input type="text" id="parameterValue" class="form-control" placeholder="Enter Parameter ${addedCount + 2} value" >
                        </div>
                        <button id="addParam" class="btn btn-primary col-md-1">-</button>
                    </div>`
    let paramElement = getElementFromString(string);
    addParams.appendChild(paramElement);

    // Now, if user added the custom parameters then for deleting them if he wants
    let deleteParams = document.getElementsByClassName('deleteParams');
    for (item of deleteParams) {
        item.addEventListener('click', (e) => {
            // alert('Are you sure to delete this')
            e.target.parentElement.remove();
        })
    }
    addedCount++;
})

// Now, I have to code the submit Button
// If user clicks on the submit button than what will happen let's do it by the code
let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
    document.getElementById('responsePrism').innerHTML = "Please wait... fetching request";

    // Fetching all the values which user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // Now, if the use select the parameter option then fetching the parameterValues
    if (contentType == 'addParams') {
        data = {};
        for (let i = 0; i < addedCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1) != undefined)) {
                let parameterKey = document.getElementById('parameterKey' + (i + 1)).value;
                let parameterValue = document.getElementById('parameterValue' + (i + 1)).value;
                data[parameterKey] = parameterValue;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // Log all the values in the console for debugging
    console.log("url is", url);
    console.log("request type is", requestType);
    console.log("params is", contentType);
    console.log('Data is ', data);


    // if the request type is get, invoke fetch api to create a get request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                // Prism.highLightAll();
            });
        }
    else {
        // if the request type is get, post fetch api to create a post request
        if (requestType == 'POST') {
            fetch(url, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
                .then(response => response.text())
                .then((text) => {
                    document.getElementById('responsePrism').innerHTML = text;
                    // Prism.highLightAll();
                })
        }
    }

});