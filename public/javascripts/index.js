
function Brews(pBrewName, pBrewer, pBrewerLocation) {
    this.BrewName = pBrewName;
    this.Brewer = pBrewer;
    this.BrewerLocation = pBrewerLocation;
    this.Tried = false;
  }
  var ClientNotes = [];  // our local copy of the cloud data


document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("submit").addEventListener("click", function () {
        var tBrewName = document.getElementById("brewName").value;
        var tBrewer = document.getElementById("brewer").value;
        var tLocation = document.getElementById("brewerLocation").value;
        var newBrew = new Brews(tBrewName, tBrewer, tLocation);

        $.ajax({
            url: '/NewBrew' ,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(newBrew),
            success: function (result) {
                console.log("added new note")
            }

        });
    });

    document.getElementById("get").addEventListener("click", function () {
        updateList()
    });
  


    document.getElementById("delete").addEventListener("click", function () {
        
        var whichToDo = document.getElementById('deleteTitle').value;
        var idToDelete = "";
        for(i=0; i< ClientNotes.length; i++){
            if(ClientNotes[i].title === whichToDo) {
                idToDelete = ClientNotes[i]._id;
           }
        }
        
        if(idToDelete != "")
        {
                     $.ajax({  
                    url: 'DeleteToDo/'+ idToDelete,
                    type: 'DELETE',  
                    contentType: 'application/json',  
                    success: function (response) {  
                        console.log(response);  
                    },  
                    error: function () {  
                        console.log('Error in Operation');  
                    }  
                });  
        }
        else {
            console.log("no matching Subject");
        } 
    });



    document.getElementById("msubmit").addEventListener("click", function () {
        var tTitle = document.getElementById("mtitle").value;
        var tDetail = document.getElementById("mdetail").value;
        var tPriority = document.getElementById("mpriority").value;
        var oneToDo = new ToDo(tTitle, tDetail, tPriority);
        oneToDo.completed =  document.getElementById("mcompleted").value;
        
            $.ajax({
                url: 'UpdateToDo/'+idToFind,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(oneToDo),
                    success: function (response) {  
                        console.log(response);  
                    },  
                    error: function () {  
                        console.log('Error in Operation');  
                    }  
                });  
            
       
    });


    
    var idToFind = ""; // using the same value from the find operation for the modify
    // find one to modify
    document.getElementById("find").addEventListener("click", function () {
        var tTitle = document.getElementById("modTitle").value;
         idToFind = "";
        for(i=0; i< ClientNotes.length; i++){
            if(ClientNotes[i].title === tTitle) {
                idToFind = ClientNotes[i]._id;
           }
        }
        console.log(idToFind);
 
        $.get("/FindToDo/"+ idToFind, function(data, status){ 
            console.log(data[0].title);
            document.getElementById("mtitle").value = data[0].title;
            document.getElementById("mdetail").value= data[0].detail;
            document.getElementById("mpriority").value = data[0].priority;
            document.getElementById("mcompleted").value = data[0].completed;
           

        });
    });

    // get the server data into the local array
    updateList();

});


function updateList() {
var ul = document.getElementById('listUl');
ul.innerHTML = "";  // clears existing list so we don't duplicate old ones

//var ul = document.createElement('ul')

$.get("/Brews", function(data, status){  // AJAX get
    ClientNotes = data;  // put the returned server json data into our local array

    // sort array by one property
    ClientNotes.sort(compare);  // see compare method below
    console.log(data);
    //listDiv.appendChild(ul);
    ClientNotes.forEach(ProcessOneToDo); // build one li for each item in array
    function ProcessOneToDo(item, index) {
        var li = document.createElement('li');
        ul.appendChild(li);

        li.innerHTML=li.innerHTML + index + ": " + " Brew Name: " + item.BrewName + "--- \tBrewer: " + item.Brewer + "---\tBrewer Location:  " + item.BrewerLocation + "--- \tTried It? "+ item.Tried;
    }
});
}

function compare(a,b) {
    if (a.completed == false && b.completed== true) {
        return -1;
    }
    if (a.completed == false && b.completed== true) {
        return 1;
    }
    return 0;
}
