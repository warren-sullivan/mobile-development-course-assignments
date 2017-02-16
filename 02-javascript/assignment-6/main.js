var app = new function(){

this.el = document.getElementById('countries');
this.countries = ['France', 'Germany', 'England', 'Spain', 'Belgium', 'Italy', 'Portugal', 'Irland', 'Luxembourg'];

this.Count = function(data){
  var el   = document.getElementById('counter');
  var name = 'country';
  if (data){
    if (data > 1)
      name = 'countries';
    el.innerHTML = data + ' ' + name ;
  }else{
    el.innerHTML = 'No ' + name;
}};

this.FetchAll = function(){
  var data = '';
  if (this.countries.length > 0){
    for (i = 0; i < this.countries.length; i++){
      data += '<tr>';
      data += '<td>' + this.countries[i] + '</td>';
      data += '<td><button onclick="app.Edit(' + i + ')">Edit</button></td>';
      data += '<td><button onclick="app.Delete(' + i + ')">Delete</button></td>';
      data += '</tr>';
    }
  }

  this.Count(this.countries.length);
  return this.el.innerHTML = data;
};

this.Add = function (){
  el = document.getElementById('add-name');
  var country = el.value;

  if (country){
    this.countries.push(country.trim());
    el.value = '';
    this.FetchAll();
}};

this.Edit = function (item){
  var el = document.getElementById('edit-name');
  el.value = this.countries[item];
  document.getElementById('spoiler').style.display = 'block';
  self = this;

  document.getElementById('saveEdit').onsubmit = function(){
    var country = el.value;

    if (country){
      self.countries.splice(item, 1, country.trim());
      self.FetchAll();
      CloseInput();
}}};

this.Delete = function (item){
  this.countries.splice(item, 1);
  this.FetchAll();
};
  
}

app.FetchAll();

function CloseInput(){
  document.getElementById('spoiler').style.display = 'none';
}
