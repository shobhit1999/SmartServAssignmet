
var filename;
document.getElementById('InputFile').onchange = function () {
    filename = this.value;
};

var ftype=document.getElementById('ftype')

var json = (function() {
    var json = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "data.json",
      'dataType': "json",
      'success': function(data) {
        json = data;
      }
    });
    return json;
  })();


function getData() {
    
    data = []
    n = json.count;
    products = json.products;
    for (var key in products) {
        data.push(products[key])
    }
    data.sort((a, b) => (parseInt(a.popularity) > parseInt(b.popularity)) ? 1 : -1);
    data.reverse();
    init = "<tr><th>Index</th>"
    console.log(fields);
    for (var i = 0;i < fields.length;i++) {
        init = init+"<th>"+fields[i].value+"</th>";
    }
    init = init+"</tr>";
    // console.log(data[0]['title']);
    $("table").append(init);    
    for (var i =0;i<n;i++){
        var record = "<tr><td>"+(i+1)+"</td>";
        for (var j = 0;j < fields.length;j++) {
            var cat = fields[j].value;
            if (data[i][cat]){
                record = record+"<td>"+data[i][cat]+"</td>";
            } 
            else {
                record = record+"<td>-</td>";
            }
        }   
        record = record+"</tr>";
        $("table").append(record);
    }    
}

var sel = []

function remElem() {
    $("#selectedOptions :selected").remove();
    console.log($("#selectedOptions :selected"));   
}


function printAll() {

    var obj = availablefields.myfields,
    options = obj.options, 
    selected = [], i, str;
    for (i = 0; i < options.length; i++) {
        options[i].selected && selected.push(obj[i].value);
    }
    for (var i in selected) {
        var a = "<option value="+selected[i]+">"+selected[i]+"</option>";
        $("#selectedOptions").append(a);
        console.log(a)
    }
}


var fields = []
function showRes() {
    fields = document.getElementById("selectedOptions").options;
    filename = filename.split("\\")[2];
    if (filename.split(".")[1]!='json') {
        alert('Input the JSON/CSV file only!')
    }
    else if (ftype.value!='JSON'){
        alert('Choose a correct file type!')
    }
    else {
        getData();
        var bo = document.getElementById('MainBody').style.display = "none";
    }
    
}

function reload(){
    window.location.reload();
}