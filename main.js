
    var data;
var app = new Vue({  

  el: '#app',  
  data: {    
    senators: [],
      checked: ['D', 'R', 'I'],
      selected: "All", 
        parties: [
          { text: 'Democrat', value: 'D' },
          { text: 'Republican', value: 'R' },
          { text: 'Independent', value: 'I' }
        ]
                  },
    methods: {
    filter: function(){
        
        let aux = this.senators.filter(function(senator){
        if(app.checked.indexOf(senator.party) != -1 && (senator.state == app.selected || app.selected =="All")){
            return senator
        }
    })
        
        return aux
        
    },
    createDrop: function(){
        let states = this.senators.map(function(i){
    return i.state;
}).filter(unique).sort();
    
        return states
    }
}
                  
}); 

var url



if(document.getElementById("senate")){
url = "https://api.propublica.org/congress/v1/113/senate/members.json"}
else if(document.getElementById("house")){
url = "https://api.propublica.org/congress/v1/113/house/members.json"
}

 fetch(url, {
  method: 'GET',  
  headers:{
    'X-API-key': "k8AY9awMuWhIXE5IVzr2NIFW6FZ91wIQuCJ9xuYo"
      
  }
}).then(function(res){
        return res.json()
    })
.then(function(json){
     app.senators = json.results[0].members
     
     
 })
.catch(error => console.error('Error:', error));


function unique(value, index, self) { 
    return self.indexOf(value) === index;
}



