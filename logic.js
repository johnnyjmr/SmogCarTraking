/**
 * Created by jhonnyjmr on 10/13/17.
 */


// INDEX PAGE

//INITIATE FIREBASE 
(function () {

    var config = {
        apiKey: "AIzaSyB1Crp6YUtHGdZzToil1N8jCVYlMtqC1WE",
        authDomain: "carsmogtracking.firebaseapp.com",
        databaseURL: "https://carsmogtracking.firebaseio.com",
        projectId: "carsmogtracking",
        storageBucket: "carsmogtracking.appspot.com",
        messagingSenderId: "1063081533898"
    };

    firebase.initializeApp(config);


    //Create db reference 
    var cardatabase = firebase.database().ref().child("carLot");

    //create sync listener 
    cardatabase.on('value', function (snap) {
        console.log(snap.val());
        showCars(snap);
        myFunction(snap);
    });
    //end os automatic function
})();



//TEST TO INTERACT WITH JSON FIREBASE DATABASE
function showCars(jsonFile) {
    jsonFile.forEach(function (childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        console.log(childSnapshot.key);
        // childData will be the actual contents of the child
        console.log(childSnapshot.val());
        console.log(childSnapshot.child('vin').val());
    });
}

//CREATE TABLE WITH CARS
/*
it will create each row for the table
 */
function myFunction(CarList) {

    CarList.forEach(function (element) {
        var car = $("<tr class='automobil' id=" + element.key + "></tr>");
        //buttoms to do actions (MAYBE HAVE A RULE OF ONLY 2 BUTTOMS PER ROW)
        var dropButtom = $("<a class='btn btn-info btn-xs' name='droped'></a>").append("<span class='glyphicon glyphicon-edit'></span> Drop");
        var smogButtom = $("<a class='btn btn-success btn-xs' name='done'></a>").append("<span class='glyphicon glyphicon-ok'></span> Smog");
        var actionCell = $("<td class='text-center'></td>").append(dropButtom, smogButtom);
        //display car info
        car.append(
            $("<td></td>").text(element.key),
            $("<td></td>").text(element.child('year').val()),
            $("<td></td>").text(element.child('make').val()),
            $("<td></td>").text(element.child('model').val()),
            $("<td></td>").text(element.child('vin').val()),
            $("<td></td>").text(element.child('status').val()),
            actionCell
        );
        $("#carList").append(car);
    });

    //*****THIS CALL IS FOT THE BUTTOMS TO MODIFY THE DB WHEN THEY ARE PRESS */
    $('.btn').on('click', function () {
        /*
         ACTIONS NEEDED FOR THE CARS (ADD HTML BUTTOM BEFORE HAND BUT WITH HIDE ATTR )
            Ready
            Smog Done
            Weight Done
            Engine Light 
            Need Drive 
            Cant find it 
            already sold but needed smog or weight 

         */
        var carSelected = $(this).parent().parent().attr('id');
        console.log($(this).parent().parent().attr('id') + "WAS MODIFY with "+$(this).attr('name')+"status");
        console.log(CarList.child(carSelected).val());
        //PUT HERE THE METOTH TO CHANGE THE DB.
        modifyCarStatus(carSelected,$(this).attr('name'));
       

    });


}
//FUNCTION TO MODIFY CARS WHEN THE BUTTONS ARE PRESS.
/*THE FUNCTION WILL HAVE TO MODIFY THE CARS AND HIDE BUTTOMS THAT ARE NOT APPLICABLE. 
EX: WHEN THE CAR IS DROP ONLY BUTTOM SHOWING SHOULD BE THE DONE BUTTOM.
 */
function modifyCarStatus(carToModify, carStatus) {

    firebase.database().ref().child("/carLot/"+carToModify).update({status:carStatus});
    location.reload(true);
}




//ADD PAGE

//TRY TO SAVE CAR FROM DATA TO SAVE IN XML FILE
$(document).ready(function () {
    $("form").submit(function () {
        var data = $('form').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        alert(data);
        console.log(data["stock"]);

    });
    $("#carFormSubmit").click(function () {
        $("form").submit();
    });

});











