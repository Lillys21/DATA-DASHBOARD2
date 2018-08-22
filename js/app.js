/*
 * Funcionalidad de tu producto
 */
// Puedes hacer uso de la base de datos a través de la variable `data`
 //console.log(data);
 //console.log(data['AQP']['2016-2']['students']);

//SE OBTUVIERON LAS SEDES
var obtenerSedes = function (dataObj) {
    var select = document.getElementById("sedes");

    var dataKeys = Object.keys(data);
    console.log(dataKeys, dataKeys.length);
    for (var i = 0; i < dataKeys.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", dataKeys[i]);
        option.innerHTML = dataKeys[i];
        select.appendChild(option);
        console.log(dataKeys[i]);
    }
}

//SE OBTUVIERON LAS GENERACIONES
var obtenerGeneracion = function(e){
    var sede = e.target.value;
    console.log(data[sede]);
    //console.log(data[generacion]["2017-1"]);
    //console.log(data[generacion]["2017-1"]["students"]);

    var sedeKeys = Object.keys(data[sede]);
    var contenedorGeneracion = document.getElementById("generations");
    contenedorGeneracion.innerHTML= "";
    console.log(sedeKeys, sedeKeys.length);
    for (var i = 0; i < sedeKeys.length; i++) {
        var option2 = document.createElement("button");
        var boton= document.createTextNode(sedeKeys[i]);
        option2.setAttribute("data-sede", sede)
        option2.setAttribute("data-generacion", sedeKeys[i])
        option2.addEventListener("click", obtenerEstudiantes)
        option2.appendChild(boton);
        contenedorGeneracion.appendChild(option2);
        console.log(sedeKeys[i]);
    }
}


/*SE OBTUVIERON LAS ESTUDIANTES*/

var obtenerEstudiantes = function(e){
    var estudiantes = e.target;
    console.log(estudiantes.dataset["sede"],estudiantes.dataset["generacion"]);
    var sede= estudiantes.dataset["sede"];
    var generacion = estudiantes.dataset["generacion"];
    var students = (data[sede][generacion]["students"]);
    console.log(students);
    var totalStudents = students.length;
    console.log(totalStudents);
    //console.log(data[sede][generacion]["students"].length);
    //crear el p en su tml totalstudents textnode y appendcild totalestudiantesgeneracion

    //***creacion de elementos en el DOM para imprimir el numero de estudiantes por generacion***
    var studentsGeneration = document.getElementById("totalEstudiantesGeneracion");
    studentsGeneration.innerHTML= "";
    
    var option3 = document.createElement("p");
    var divText= document.createTextNode("El numero total de estudiantes por generación es: " +  generacion +" "+  totalStudents);
    //option3.setAttribute("data-sede", sede);
    //option3.setAttribute("data-generacion", sedeKeys[i]);
    option3.setAttribute("data-students", totalStudents);
    option3.addEventListener("click", obtenerEstudiantes)
    option3.appendChild(divText);
    studentsGeneration.appendChild(option3);
    console.log(totalStudents);   
    
    //CUENTA LAS ACTIVAS Y DA EL NOMBRE DE LAS INACTIVAS//
    studActivas = 0;
    studInactivas = 0;
    nombreInactivas = [];

    for (var i = 0; i < totalStudents; i++) {
        if(students[i]["active"] == true){
        studActivas ++;
        var activas = studActivas;

        //OBTIENE EL PUNTAJE DE CADA UNA DE LAS ESTUDIANTES TANTO EN TECH COMO EL HSE//
        promTech = 0;
        promHSE = 0;
    

        for (var j = 0; j < students[i]["sprints"].length; j++) {
            promTech += students[i]["sprints"][j]["score"]["tech"];
            promHSE += students[i]["sprints"][j]["score"]["hse"];
            console.log(promTech);
            console.log(promHSE);

            var totalProm = promHSE +  promTech;
            console.log(totalProm);

    } 
    

        }else{
            studInactivas ++;
            var inactivas = studInactivas;
            nombreInactivas.push(students[i]["name"]);
            console.log(nombreInactivas);
        }
    } 

    //IMPRIME EL PORCENTAJE DE LAS ESTUDIANTES ACTIVAS E INACTIVAS   
    var porcentActivas = (studActivas *100 / totalStudents).toFixed() + "%" + " Total: " + activas;
    var porcentInactivas = (studInactivas *100 / totalStudents).toFixed() + "%" + " Total: " + inactivas;

    var option4 = document.createElement("p");
    var divText1= document.createTextNode("Porcentaje de las estudiantes activas: " +  porcentActivas);
    option4.setAttribute("data-active", porcentActivas);
    option4.addEventListener("click", obtenerEstudiantes)
    option4.appendChild(divText1);
    studentsGeneration.appendChild(option4);
    console.log(porcentActivas); 

    var option5 = document.createElement("p");
    var divText2= document.createTextNode("Porcentaje de las estudiantes inactivas: " +  porcentInactivas);
    option5.setAttribute("data-active", porcentInactivas);
    option5.addEventListener("click", obtenerEstudiantes)
    option5.appendChild(divText2);
    studentsGeneration.appendChild(option5);
    console.log(porcentInactivas); 
    
    //IMPRIME EL NOMBRE DE LAS ESTUDIANTES INACTIVAS
    var option6 = document.createElement("p");
    var divText3= document.createTextNode("Nombre de las estudiantes que desestaron por generacion: " +  nombreInactivas);
    option6.setAttribute("data-active", nombreInactivas);
    option6.addEventListener("click", obtenerEstudiantes);
    option6.appendChild(divText3);
    studentsGeneration.appendChild(option6);
    console.log(nombreInactivas);      


} 

//EN EL ID SEDES DEL HTML SE CREO UN EVENTO PARA OBTENER LAS GENERACIONES 
document.getElementById("sedes").addEventListener("change", obtenerGeneracion)


obtenerSedes(data);


