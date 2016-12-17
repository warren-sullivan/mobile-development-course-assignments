function calculate(){
    var amount = parseFloat(document.getElementById("amount").value);
    var rate = parseFloat(document.getElementById("return").value);
    var years = parseFloat(document.getElementById("years").value);
    var interest = 0;
    var table = "<th> Month </th><th> Interest </th><th> Balance </th>";
    table = newRow(table);

    for(i=1; years*12>=i; i++){
        interest = ((rate/100)/12) * amount;
        amount += interest;
        table += newRow(newColumn(" " + i + " ") + newColumn(" " + interest.toFixed(2) + " ") + newColumn(" " + amount.toFixed(2) + " "))
    }

    document.getElementById("results_table").innerHTML = newTable(table);
}

function reset(){
    document.getElementById("amount").value = "";
    document.getElementById("return").value = "";
    document.getElementById("years").value = "";
    document.getElementById("results_table").innerHTML = "";
}

function newRow(value){
    return "<tr>" + value + "</tr>";
}

function newColumn(value){
    return "<td>" + value + "</td>";
}

function newTable(value){
    return "<table>" + value + "</table>";
}