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
     //console.log(testThree);
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

// function getKeyByValue(object, value) {
//     console.log(value);
//     return Object.keys(object).find(key => object[key] === value);
//   }
  
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
                console.log("added one Order!")
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
            url: '/NewOrder',
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




document.addEventListener("DOMContentLoaded", function (event) {
    myRandomizer();

    document.getElementById("randomizerButton").addEventListener("click", function (){
            myRandomizer();
    })


});


    // document.getElementById("get").addEventListener("click", function () {
    //     //myRandomizer();
    // });
  







  
 


    

 
 



