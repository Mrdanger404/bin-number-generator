const card = document.getElementById("card");
const length = document.getElementById("length");
const output = document.getElementById("output");
const printCardName = document.getElementById("card-name");
const printNumbers = document.getElementById("numbers");
const generate = document.getElementById("generate");
const downloadFile = document.getElementById("download")
const BinTable = document.getElementById("tableBody");

const BinNumbers = [];
console.log(BinNumbers)

generate.addEventListener('click', (e) => {
    e.preventDefault();
    const cardValue = parseInt(card.value);
    const lengthValue = parseInt(length.value);

    let CardValueText = "";

    if (cardValue === 5) {
        CardValueText = "Master Card";
    } else {
        CardValueText = "Visa Card";
    }

    // printNumbers.innerHTML = "";

    for (let i = 1; i <= lengthValue; i++) {
        // Generate a new random number for each iteration
        const randomNumber = cardValue + Math.floor(Math.random() * Math.pow(10, 5)).toString().padStart(5, '0');
        
        // const binNumber = Bins.textContent = randomNumber;
        BinNumbers.push(randomNumber)
    }
    // Update the card name
    const cardName = printCardName.querySelector("h1");
    cardName.textContent = CardValueText;

    // ... (previous code)

// check data from api
const fetchBinInfo = (binNumber) => {
    return fetch(`https://data.handyapi.com/bin/${binNumber}`)
        .then(response => response.json())
        .then(result => {
            console.log(`success bin ${binNumber} response: ${result.Status},${result.Type}`)
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `<td>${result.Status}</td><td>${binNumber}</td><td>${result.Scheme}</td><td>${result.Type}</td><td>${result.Issuer}</td><td>${result.CardTier}</td><td>${result.Country.Name}</td><td>${result.Country.A2}</td><td>${result.Country.A3}</td><td>${result.Country.N3}</td><td>${result.Country.ISD}</td><td>${result.Country.Cont}</td><td>${result.Luhn}</td>`;
            BinTable.appendChild(tableRow);
            console.log(tableRow)
            
        })
        .catch(error => {
            console.log(`Error for bin ${binNumber}: ${error.message}`);
        });
}

BinNumbers.forEach(binNumber => {
    fetchBinInfo(binNumber)
})


});



const table = document.getElementById("tableInfo");

const toPdf = function(table) {
    const html_code = `
    <link rel="stylesheet" href="./index.css">
    <table border="1" border-collapse="collapse" id="tableInfo">${table.innerHTML} <h3> Tajbir islam</h3></table>
    `
    const new_window = window.open();
    new_window.document.write(html_code);
    
    setTimeout(() => {
        new_window.print()
    }, 200);
}

downloadFile.addEventListener('click', () => {
    console.log("click")
    toPdf(table)

    
});




