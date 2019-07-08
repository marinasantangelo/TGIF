    var data;
var app = new Vue({  

  el: '#app',  
  data: {    
    senators: [],
                  },
    methods: {
   /* filter: function(){
        
        let aux = this.senators.filter(function(senator){
        if(app.checked.indexOf(senator.party) != -1 && (senator.state == app.selected || app.selected =="All")){
            return senator
        }
    })
        
        return aux
        
    },*/
        
    partyFilter: function(value){
        return this.senators.filter(function(q){
            if(q.party == value){
                return q  
            }
               
        })
       
    },    
     
                             
    vwpParties: function(value){
 let acum = 0
 
 this.partyFilter(value).forEach(function(j){
    acum = acum + j.votes_with_party_pct;
 })
     
     return (acum/this.partyFilter(value).length).toFixed(2);
},
        
        
vwp: function(){
 let acum = 0
 
 this.senators.forEach(function(j){
    acum = acum + j.votes_with_party_pct;
 })
     
     return (acum/this.senators.length).toFixed(2);
},
  
        
stats: function(){
    let array = ["D", "R", "I"]
    let aux = []
    for(i=0; i < array.length; i++){
        let obj = {}
        obj.text = party(array[i])
        obj.value = array[i]
        obj.q = this.partyFilter(array[i]).length
        obj.pct = this.vwpParties(array[i])
        
        if(obj.q > 0){
        aux.push(obj)
            }
    }
        
        
    function party(string){
        switch(string){
            case "D": return "Democrat"
             case "R": return "Republican"
            case "I": return "Independent"
        }
    }  
    
    return aux
    
},
                             
list: function(stat, order){
let sortedRepresentatives = [];
    
    if(order == 1){
    sortedRepresentatives = this.senators.sort((a,b) => b[stat] - a[stat]).filter(function(i){
            if(i.total_votes !== 0){
                return i  
            }
               
        })

    }
    else {
    sortedRepresentatives = this.senators.sort((a,b) => a[stat] - b[stat]).filter(function(i){
            if(i.total_votes !== 0){
                return i  
            }
               
        })
    }
/*(a, b) => a - b is a shortcut notation for:

function (a, b){
  return a - b;
}
Function sort 13 takes a comparison function as a parameter. This is what the sorting algorithm uses repeatedly to compare two elements in the array and decide which one goes to the left of the array and which goes to the right.

If you’re sorting numbers in ascending order, the smallest goes to the left. If you’re sorting in descending order, the biggest goes to the left.

The function needs to return -1 for a to be sorted to the left of b, 1 to be sorted to the right of b and 0 to be considered equal.*/
    
let i= 1;
let pct = this.senators.length/10
let filteredRepresentatives = []
      
filteredRepresentatives.push(sortedRepresentatives[0])
    
        while( i <= pct){
            
            if(sortedRepresentatives[i][stat] == sortedRepresentatives[i - 1][stat]) {
                pct ++
            }
            
           i++ 
             filteredRepresentatives.push(sortedRepresentatives[i])
        
        }
        
        return filteredRepresentatives
       //return sortedRepresentatives.slice(0, pct); 

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










