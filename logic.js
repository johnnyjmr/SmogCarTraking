/**
 * Created by jhonnyjmr on 10/13/17.
 */


// INDEX PAGE

//GET CARS FROM XML FILE
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

        myFunction(this);


    }
};
xhttp.open("GET", "cars.xml", true);
xhttp.send();

//CREATE TABLE WITH CARS
function myFunction(xml) {
    var xmlDoc = xml.responseXML;

     var newElement = xmlDoc.createElement("drop");
     var x = xmlDoc.getElementsByTagName("car")[0]
    x.appendChild(newElement);


    //experiment
    //$("#jquery").html(xmlDoc.getElementsByTagName("car")[0].childNodes[1].childNodes[0].nodeValue);

    //get list of cars
    var carList = xmlDoc.getElementsByTagName("car");


    //loop through cars
    for (i = 0; i < carList.length; i++) {
        var car = $("<tr class='automobil'></tr>");


        var dropButtom = $("<a class='btn btn-info btn-xs'></a>").append("<span class='glyphicon glyphicon-edit'></span> Drop");
        var smogButtom = $("<a class='btn btn-success btn-xs'></a>").append("<span class='glyphicon glyphicon-ok'></span> Smog");
        var actionCell = $("<td class='text-center'></td>").append(dropButtom, smogButtom);
        car.append(
            $("<td></td>").text(carList[i].getElementsByTagName("stock")[0].childNodes[0].nodeValue),
            $("<td></td>").text(carList[i].getElementsByTagName("year")[0].childNodes[0].nodeValue),
            $("<td></td>").text(carList[i].getElementsByTagName("make")[0].childNodes[0].nodeValue),
            $("<td></td>").text(carList[i].getElementsByTagName("model")[0].childNodes[0].nodeValue),
            $("<td></td>").text(carList[i].getElementsByTagName("vin")[0].childNodes[0].nodeValue),
            $("<td></td>").text(carList[i].getElementsByTagName("status")[0].childNodes[0].nodeValue),
            actionCell
        );

        $("#carList").append(car);


    }


}





//ADD PAGE

//TRY TO SAVE CAR FROM DATA TO SAVE IN XML FILE
$(document).ready(function(){
    $("form").submit(function(){
        var data = $('form').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        alert(data);
        console.log(data["stock"]);

    });
    $("#carFormSubmit").click(function(){
        $("form").submit();
    });

});











