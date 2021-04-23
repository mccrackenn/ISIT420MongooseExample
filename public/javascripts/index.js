var storeZip=document.getElementById("storeZip");
var salesPersonIDField=document.getElementById("salesPersonID");
var cdIDField=document.getElementById("cdID");
var pricePaidField=document.getElementById("pricePaid");

let SalesDict={
    1:"98053",
    2:"98053",
    3:"98053",
    4:"98053",
    5:"98007",
    6:"98007",
    7:"98007",
    8:"98007",
    9:"98077",
    10:"98077",
    11:"98077",
    12:"98077",
    13:"98055" ,
    14:"98055" ,
    15:"98055" ,
    16:"98055" ,
    17:"98011",
    18:"98011",
    19:"98011",
    20:"98011",
    21:"98046",
    22:"98046",
    23:"98046",
    24:"98046"
};
let CdIDArray= [123456, 123654, 321456,321654,654123,
           654321,543216,354126,621453,623451
          ];

 let PricePaidArray=[5,6,7,8,9,10,11,12,13,14,15];
 
 function myRandomizer() {
     let testOne=getRndInteger(1,24)
     //console.log(testOne);
     let testTwo=SalesDict[testOne];
     //console.log(testTwo);
     let testThree=CdIDArray[getRndInteger(0,9)];
    // console.log(testThree);
     let testFour=PricePaidArray[getRndInteger(0,10)];
     //console.log(testFour);
     var oneOrder= new Order(testTwo,testOne,testThree,testFour)
     storeZip.value = testTwo;
     salesPersonIDField.value= testOne;
     cdIDField.value = testThree;
     pricePaidField.value = testFour;

     return oneOrder;

 }

function getRndInteger(min, max){
    return Math.floor(Math.random() * (max-min +1))+min
}

function getKeyByValue(object, value) {
    console.log(value);
    return Object.keys(object).find(key => object[key] === value);
  }
  
  document.getElementById("submit500").addEventListener("click", () => {
      for(i=1;i<=500;i++){
          var oneOrder=myRandomizer();

          $.ajax({
            url: '/FiveHundred' ,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(oneOrder),
            success: function (result) {
                //console.log("added new note")
            }

        });

      }
  })

document.getElementById("submitOne").addEventListener("click",function(){
        var oneOrder=new Order();
        oneOrder.StoreID=storeZip.value;
        oneOrder.SalesPersonID=parseInt(salesPersonIDField.value);
        oneOrder.CdID=parseInt(cdIDField.value);
        oneOrder.PricePaid=parseInt(pricePaidField.value);
        console.log(oneOrder);

        $.ajax({
            url: '/NewOrder' ,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(oneOrder),
            success: function (result) {
                console.log("added new note")
            }

        });

        // fetch('/NewOrder', {
        //     method: 'POST',
        //     body: JSON.stringify(oneOrder),
        //     headers:{ "Content-Type":"application/json",
        //                 "Accept": "application/json"
        // }
        // })
        // .then(function(response) {
        //     return response.json();
            
        // })
})
function Order(pStoreID, pSalesPersonID, pCdID, pPrice) {
    this.StoreID = pStoreID;
    this.SalesPersonID = pSalesPersonID;
    this.CdID = pCdID;
    this.PricePaid = pPrice;
  }

function Brews(pBrewName, pBrewer, pBrewerLocation) {
    this.BrewName = pBrewName;
    this.Brewer = pBrewer;
    this.BrewerLocation = pBrewerLocation;
    this.Tried = false;
  }
  var ClientNotes = [];  // our local copy of the cloud data


document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("randomizerButton").addEventListener("click", function (){
            myRandomizer();
    })



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
        
        var whichBrew = document.getElementById('deleteTitle').value;
        console.log(whichBrew);
        var idToDelete = "";
        for(i=0; i< ClientNotes.length; i++){
            if(ClientNotes[i].BrewName === whichBrew) {
                
                idToDelete = ClientNotes[i]._id;
                console.log(idToDelete);
           }
        }
        
        if(idToDelete != "")
        {
            console.log(idToDelete);
                     $.ajax({  
                    url: 'DeleteBrew/'+ idToDelete,
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
        var tBrew = document.getElementById("mBrew").value;
        var tBrewer = document.getElementById("mBrewer").value;
        var tLocation = document.getElementById("mLocation").value;
        var oneBrew = new Brews(tBrew, tBrewer, tLocation);
        oneBrew.Tried = document.getElementById("mTried").value;
        console.log('Updated Brew: ');
        console.log(oneBrew);

        // idToFind = "";
        // for(i=0; i< ClientNotes.length; i++){
        //     if(ClientNotes[i].BrewName === tBrew) {
        //         idToFind = ClientNotes[i]._id;
        //         console.log('ID to find and Update ' + idToFind);
        //    }
        // }
            $.ajax({
                url: 'UpdateBrew/'+idToFind,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(oneBrew),
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
        var tTitle = document.getElementById("modBrew").value;
        console.log(tTitle);
         idToFind = "";
        for(i=0; i< ClientNotes.length; i++){
            if(ClientNotes[i].BrewName === tTitle) {
                idToFind = ClientNotes[i]._id;
                console.log(idToFind);
           }
        }
 
        $.get("/FindBrew/"+ idToFind, function(data, status){ 
            document.getElementById("mBrew").value = data[0].BrewName;
            document.getElementById("mBrewer").value= data[0].Brewer;
            document.getElementById("mLocation").value = data[0].BrewerLocation;
            document.getElementById("mTried").value = data[0].Tried;
            console.log(data[0]);

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
    ClientNotes.forEach(ProcessBrew); // build one li for each item in array
    function ProcessBrew(item, index) {
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
