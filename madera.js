let inventory = [];

let form = document.querySelector('.form')


let bundle = document.querySelector('#bundle');
let wood = document.querySelector('#wood');
let height = document.querySelector('#height');
let length = document.querySelector('#length');
let five = document.querySelector('#five');
let six = document.querySelector('#six');
let seven = document.querySelector('#seven');
let eight = document.querySelector('#eight');
let nine = document.querySelector('#nine');
let ten = document.querySelector('#ten');
let qt = document.querySelector('#qt');
let width = document.querySelector('#width');
let labelWidth = document.querySelector('#labelWidth');
let labelQt = document.querySelector('#labelQt');
let labelHeight = document.querySelector('#labelHeight');
let labelLength = document.querySelector('#labelLength');
let labelBulto = document.querySelector('#labelBulto');
let labelWood = document.querySelector('#labelWood');

let startBultoBtn = document.querySelector('#startBulto');
let updateBultoBtn = document.querySelector('#update');
let newBundle = document.querySelector('.newBundle');
let updateBundle = document.querySelector('.updateBundle');
let woodIn = document.querySelector('.woodIn');
let woodOut = document.querySelector('.woodOut');
let woodOutBtn=document.querySelector('#woodOutBtn');
let woodInBtn=document.querySelector('#woodInBtn');


/*let errorBundle = document.querySelector('#errorBundle');
let errorwood = document.querySelector('#errorwood');
let errorlength = document.querySelector('#errorlength');
let errorheight = document.querySelector('#errorheight');
let errorWidth = document.querySelector('#errorWidth');*/
let error = document.querySelector('#error');


///this function removes error message after clicking on the message

var removeErrorMessage = () => {
	error.innerHTML="";
}



var displayBundles = () => {
	output = document.querySelector('#listOfBundles');
	let sumPieces = 0;
	let sumPt = 0;
	let sumM3 = 0;

	

    table = "<table class = 'tableBundles'><thead><tr><td>Bundle</th><td>wood</td><td>height</td><td>length</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>Pieces</td><td>PT</td><td>M<sup>3</sup></td><td></td></tr></thead>";

    for (t = 0; t < inventory.length; t++) {
		sumPieces += inventory[t].pieces();
		sumPt += inventory[t].pt();
		sumM3 += inventory[t].cubicMeters();
        console.log(sumPieces);
        table += '<tr><td class="firstCell">' + inventory[t].id + '</td><td>' + inventory[t].wood + '</td><td>' + inventory[t].height + '</td><td>' + inventory[t].length + '</td><td>' + inventory[t].five + '</td><td>' + inventory[t].six + '</td><td>' + inventory[t].seven + '</td><td>' + inventory[t].eight + '</td><td>' + inventory[t].nine + '</td><td>' + inventory[t].ten + '</td><td>' + inventory[t].pieces() + '</td><td>' + inventory[t].pt() + '</td><td>'
			            + inventory[t].cubicMeters() + '</td><td><button class="deleteBultoBtn" onclick="deleteBulto(this.value)" value="'+t+'">Delete</button></td></tr>';


    }
    table += `<tr><td colspan="10" class="emptyCell"></td><td class="sums">${sumPieces}</td><td class="sums">${sumPt}</td><td class="sums">${sumM3}</td><td class="sums"></tr></table>`;
    output.innerHTML = table;
}

 var deleteBulto = (clicked) => {
	let error = document.querySelector('#error');
	let valueBtn = clicked;
	console.log(valueBtn);
	let itemToBeDeleted = parseInt (inventory[valueBtn].pieces());
	let bultoNumber = inventory[valueBtn].id;
	console.log(itemToBeDeleted +" is a "+typeof itemToBeDeleted);
	
	if (itemToBeDeleted == 0){
		inventory.splice(valueBtn, 1);
		displayBundles();
		error.style.display="block";
		error.textContent =   " Bulto number "+ bultoNumber +" was deleted";
		
		
	}else if (itemToBeDeleted < 0) {
		error.style.display="block";
		error.textContent = "The amount of pieces in the bulto number "+bultoNumber+" has a negative value. SOMETHING IS WRONG...CAN'T BE DELETED.";

	}else {
		error.style.display="block";
		error.textContent = "You can't delete the bundle "+bultoNumber+". It still has wood in it.";
	
		
	}

}




// bulto constructor function
class Bulto {
	constructor(id, wood, height, length, five, six, seven, eight, nine, ten) {
		this.id = id;
		this.wood = wood;
		this.height = height;
		this.length = length;
		this.five = five;
		this.six = six;
		this.seven = seven;
		this.eight = eight;
		this.nine = nine;
		this.ten = ten;
		this.pt = function () {
			return Math.floor((this.height * this.length * this.five * 5) / 12 +
				(this.height * this.length * this.six * 6) / 12 +
				(this.height * this.length * this.seven * 7) / 12 +
				(this.height * this.length * this.eight * 8) / 12 +
				(this.height * this.length * this.seven * 7) / 12 +
				(this.height * this.length * this.eight * 8) / 12 +
				(this.height * this.length * this.nine * 9) / 12 +
				(this.height * this.length * this.ten * 10) / 12);
		};
		this.cubicMeters = function () {
			return Math.floor(this.pt() * 568.26125);
		};
		this.pieces = function () {
			return this.five + this.six + this.seven + this.eight + this.nine + this.ten;
		};
	}
}
error.addEventListener('click',removeErrorMessage)
var removeErrorMessage = () => {
	 error.innerHTML="";
}


/////////////////////////////////////////////////////////////////////////
///////////////// NEW BUNDLE ///////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// this function adds new bulto to the array inventory
function createNewBulto() {
    // to make sure error message is gone when btn is clicked after an error message was displayed
    error.innerHTML = "";
    error.style.display = "none";


    if (bundle.value == "" || wood.value == "" || length.value == "" || height.value == "") {
        error.style.display = "block";
        error.textContent = "Fillout all fields !";

    } else if (isNaN(bundle.value) == true || isNaN(wood.value) == false || isNaN(length.value) == true || isNaN(length.value) == true) {
        error.style.display = "block";
        error.textContent = "Input Type Error !";
    } else {

		        //check if the bundle we want update exists
		        var counter = 0;
		        for (m = 0; m < inventory.length; m++) {
		            if (inventory[m].id == bundle.value) {
		                counter = counter + 1;
		            }

		        }
		        if (counter > 0) {
					error.style.display = "block";
		            error.innerHTML = "Bundle " + bundle.value + " already exists";
		        } else {




		        var tempBulto = new Bulto(bundle.value, wood.value, height.value, length.value, 0, 0, 0, 0, 0 , 0);
		        inventory.push(tempBulto);
		        bundle.value = "";
		        wood.value = "";
		        height.value = "";
		        length.value = "";


		        displayBundles();
	            }
			}

}

document.querySelector('#newBundle').addEventListener('click', openFormNewBundle);


//displays fields and button for creating new bulto
function openFormNewBundle() {
    // form.style.height="350px";
    //form.style.display="block";
    //form.style.transition="all 0.9s";
	error.innerHTML = "";
    error.style.display = "none";
	form.style.backgroundColor="#b1c1f2";


    newBundle.classList.add("selected");
    updateBundle.classList.remove("selected");
    woodIn.classList.remove("selected");
    woodOut.classList.remove("selected");

    startBultoBtn.style.display = "inline-flex";
    updateBultoBtn.style.display = "none";
    bundle.style.display = "inline-block";
    wood.style.display = "inline-block";
    height.style.display = "inline-block";
    length.style.display = "inline-block";
    labelBulto.style.display = "inline-block";
    labelWood.style.display = "inline-block";
    labelHeight.style.display = "inline-block";
    labelLength.style.display = "inline-block";
	woodInBtn.style.display = "none";
	woodOutBtn.style.display = "none";


    //hide
    labelWidth.style.display = "none";
    width.style.display = "none";
    labelQt.style.display = "none";
    qt.style.display = "none";

	entregasPlaceholder.innerHTML= "";
	salidasPlaceholder.innerHTML= "";



}

/////////////////////////////////////////////////////////////////////////
///////////////// Update BUNDLE /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// after clicking update bundle nav btn
document.querySelector('#updateBundle').addEventListener('click', openFormUpdateBundle);

function openFormUpdateBundle() {
    form.style.backgroundColor="#4287f5";
    updateBundle.classList.add("selected");
    newBundle.classList.remove("selected");
    woodIn.classList.remove("selected");
    woodOut.classList.remove("selected");
    startBultoBtn.style.display = "none";
    updateBultoBtn.style.display = "inline-flex";
    labelWidth.style.display = "none";
    width.style.display = "none";
    labelQt.style.display = "none";
    qt.style.display = "none";
	woodInBtn.style.display = "none";
	woodOutBtn.style.display = "none";
	labelWood.style.display = "inline-block";
    labelHeight.style.display = "inline-block";
    labelLength.style.display = "inline-block";
	wood.style.display = "inline-block";
    height.style.display = "inline-block";
    length.style.display = "inline-block";

	entregasPlaceholder.innerHTML= "";
	salidasPlaceholder.innerHTML= "";


}


document.querySelector('#update').addEventListener('click', updateExistingBulto);

function updateExistingBulto() {
    // to make sure error message is gone when btn is clicked after an error message was displayed
    error.innerHTML = "";
    error.style.display = "none";

    // form validation

    if (bundle.value == "" || wood.value == "" || length.value == "" || height.value == "") {
        error.style.display = "block";
        error.innerHTML = "Fillout all fields !<br>";

    } else if (isNaN(bundle.value) == true || isNaN(wood.value) == false || isNaN(length.value) == true || isNaN(length.value) == true) {
        error.style.display = "block";
        error.innerHTML = "Input Type Error !<br>";
    } else {


        //check if the bundle we want update exists
        var counter = 0;
        for (m = 0; m < inventory.length; m++) {
            if (inventory[m].id == bundle.value) {
                counter += 1;
            }else{

			}
            console.log(counter);
        };
        if (counter == 0) {
			error.style.display = "block";
            error.textContent = "Bundle " + bundle.value + " doesn't exist !!";
        } else {
            // checks array index of bulto id
            index = inventory.findIndex(x => x.id === bundle.value);
            inventory[index].wood = wood.value;
			inventory[index].height = height.value;
			inventory[index].length = length.value;

			bundle.value = "";
			wood.value = "";
			height.value = "";
			length.value = "";





            displayBundles();
        }

    }

}



/////////////////////////////////////////////////////////////////////////
///////////////// WOOD IN////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// after clicking Wood in nav btn
document.querySelector('.woodIn').addEventListener('click', openFormWoodIn);


//displays fields and button for creating new bulto
function openFormWoodIn() {
    // form.style.height="350px";
    //form.style.display="block";
    //form.style.transition="all 0.9s";
	error.innerHTML = "";
    error.style.display = "none";
	form.style.backgroundColor="#cbeda4";


    newBundle.classList.remove("selected");
    updateBundle.classList.remove("selected");
    woodIn.classList.add("selected");
    woodOut.classList.remove("selected");

    startBultoBtn.style.display = "none";
    updateBultoBtn.style.display = "none";
	woodInBtn.style.display = "inline-flex";
	woodOutBtn.style.display = "none";
    bundle.style.display = "inline-block";
    wood.style.display = "none";
    height.style.display = "none";
    length.style.display = "none";
    labelBulto.style.display = "inline-block";
    labelWood.style.display = "none";
    labelHeight.style.display = "none";
    labelLength.style.display = "none";

    labelWidth.style.display = "inline-block";
    width.style.display = "inline-block";
    labelQt.style.display = "inline-block";
    qt.style.display = "inline-block";
	salidasPlaceholder.innerHTML= "";
	displayEntregas();

}


document.querySelector('#woodInBtn').addEventListener('click', submitWoodIn);

function submitWoodIn() {
    // to make sure error message is gone when btn is clicked after an error message was displayed
    error.innerHTML = "";
    error.style.display = "none";


    if (bundle.value == "" || width.value == "" || qt.value == "") {
        error.style.display = "block";
        error.textContent = "Fillout all fields !";

    } else if (isNaN(bundle.value) == true ||  isNaN(width.value) == true || isNaN(qt.value) == true) {
        error.style.display = "block";
        error.textContent = "Input Type Error !";
    } else {

		        //check if the bundle we want add wood to exists
		        var counter = 0;
		        for (m = 0; m < inventory.length; m++) {
		            if (inventory[m].id == bundle.value) {
		                counter = counter + 1;
		            }

		        }
		        if (counter == 0) {
					error.style.display = "block";
		            error.innerHTML = "Bundle " + bundle.value + " doesn't exist !!";
		        } else {



                // checks for index of this bulto in inventory object array
				index = inventory.findIndex(x => x.id === bundle.value);

				if (width.value == 5){
					inventory[index].five = parseInt(qt.value) + parseInt(inventory[index].five);
				}
				else if (width.value == 6){
					inventory[index].six = parseInt(qt.value) + parseInt(inventory[index].six);
				}
				else if (width.value ==7){
					inventory[index].seven = parseInt(qt.value) + parseInt(inventory[index].seven);
				}
				else if (width.value == 8){
					inventory[index].eight = parseInt(qt.value) + parseInt(inventory[index].eight);
				}
				else if (width.value == 9){
					inventory[index].nine = parseInt(qt.value) + parseInt(inventory[index].nine);
				}
				else {
					inventory[index].ten = parseInt(qt.value) + parseInt(inventory[index].ten);
				}



		        displayBundles();
				createEntregaRercord();
				displayEntregas();


				/*bundle.value = "";
			    wood.value = "";
			    height.value = "";
			    length.value = "";
			    width.value = "";
			    qt.value = "";*/
	            }
			}

}
/////////////////////////////////////////////////////////////////////////
///////////////// WOOD OUT////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

// after clicking Wood Out nav btn
document.querySelector('.woodOut').addEventListener('click', openFormWoodOut);


//displays fields and button for creating new bulto
function openFormWoodOut() {
    // form.style.height="350px";
    //form.style.display="block";
    //form.style.transition="all 0.9s";
	error.innerHTML = "";
    error.style.display = "none";
	form.style.backgroundColor="#f78383";


    newBundle.classList.remove("selected");
    updateBundle.classList.remove("selected");
    woodIn.classList.remove("selected");
    woodOut.classList.add("selected");

    startBultoBtn.style.display = "none";
    updateBultoBtn.style.display = "none";
	woodInBtn.style.display = "none";
	woodOutBtn.style.display = "inline-flex";
    bundle.style.display = "inline-block";
    wood.style.display = "none";
    height.style.display = "none";
    length.style.display = "none";
    labelBulto.style.display = "inline-block";
    labelWood.style.display = "none";
    labelHeight.style.display = "none";
    labelLength.style.display = "none";

    labelWidth.style.display = "inline-block";
    width.style.display = "inline-block";
    labelQt.style.display = "inline-block";
    qt.style.display = "inline-block";
	entregasPlaceholder.innerHTML= "";
	displaySalidas();

}


document.querySelector('#woodOutBtn').addEventListener('click', submitWoodOut);

function submitWoodOut() {
    // to make sure error message is gone when btn is clicked after an error message was displayed
    error.innerHTML = "";
    error.style.display = "none";


    if (bundle.value == "" || width.value == "" || qt.value == "") {
        error.style.display = "block";
        error.textContent = "Fillout all fields !";

    } else if (isNaN(bundle.value) == true ||  isNaN(width.value) == true || isNaN(qt.value) == true) {
        error.style.display = "block";
        error.textContent = "Input Type Error !";
    } else {

		        //check if the bundle we want add wood to exists
		        var counter = 0;
		        for (m = 0; m < inventory.length; m++) {
		            if (inventory[m].id == bundle.value) {
		                counter = counter + 1;
		            }

		        }
		        if (counter == 0) {
					error.style.display = "block";
		            error.innerHTML = "Bundle " + bundle.value + " doesn't exist !!";
		        } else {



                // checks for index of this bulto in inventory object array
				index = inventory.findIndex(x => x.id === bundle.value);

				if (width.value == 5){
					inventory[index].five = parseInt(inventory[index].five) - parseInt(qt.value) ;
				}
				else if (width.value == 6){
					inventory[index].six =parseInt(inventory[index].six) - parseInt(qt.value);
				}
				else if (width.value == 7){
					inventory[index].seven =parseInt(inventory[index].seven) - parseInt(qt.value);
				}
				else if (width.value == 8){
					inventory[index].eight =parseInt(inventory[index].eight) - parseInt(qt.value);
				}
				else if (width.value == 9){
					inventory[index].nine =parseInt(inventory[index].nine) - parseInt(qt.value);
				}
				else {
					inventory[index].ten =parseInt(inventory[index].ten) - parseInt(qt.value);

				}






		        displayBundles();
				createSalidaRercord();
				displaySalidas();

				/*bundle.value = "";
				wood.value = "";
				height.value = "";
				length.value = "";
				width.value = "";
				qt.value = "";*/


	            }
			}

}


////////////////////////////////////
//////////entregas////////////////////
/////////////////////////////////////

let allEntregas =[];



//entrega object constructor function
class Entrega {
	constructor(entregaId, entregaWidth, entregaQt, entregaWood, entregaLength, entregaHeight) {
		this.entregaId = entregaId;
		this.entregaWood = entregaWood;
		this.entregaWidth = entregaWidth;
		this.entregaQt = entregaQt;
		this.entregaLength = entregaLength;
		this.entregaHeight = entregaHeight;
		this.entregaDate = dateFunction();
		this.entregaPt = function () {
			return this.entregaHeight * this.entregaLength * this.entregaWidth * this.entregaQt / 12;
		};
		this.entregaM3 = function () {
			return Math.floor(this.entregaPt() * 568.26125);
		};
	}
}


// reusable function to get date witho
function dateFunction() {
	var d = new Date();
	let day = d.getDate();
	let month = d.getMonth();
	let year = d.getFullYear();
	return day + "-"+ (month + 1) +"-"+ year;
}



var createEntregaRercord = () => {
	var counter = 0;
	for (m = 0; m < inventory.length; m++) {
		if (inventory[m].id == bundle.value) {
			counter += 1;
		}
		else {

		}
	}

	if (counter == 1){
		index = inventory.findIndex(x => x.id === bundle.value);


  	  var tempEntrega = new Entrega (bundle.value, width.value, qt.value, inventory[index].wood, inventory[index].length , inventory[index].height );
  	  allEntregas.push(tempEntrega);
  	  console.log(allEntregas);

	}else {
		error.innerHTML = "Bundle " + bundle.value + " doesn't exist !!";
	}

}


var entregasPlaceholder = document.querySelector('#entregasPlaceholder');
let displayEntregas = () => {

	let output = '<div><input type="text" id="searchIncomingWood" class="searchWood" name="searchIncomingWood"><button type="button" id ="searchEntregas" class ="searchWoodBTN" onclick="displayFoundEntregas()">Search</button></div><div class="toolTip">search : Bundles, Wood, Dates</div><div class="woodTransactions"><h2 class ="woodTransHeader">Incoming Wood</h2><table><thead><tr><td>Bundle</td><td>Wood</td><td>Width</td><td>Qt</td><td>Length</td><td>Height</td><td>Date</td><td>PT</td><td>M<sup>3</sup></td></thead>';

	for(s = 0; s < allEntregas.length; s++ ) {
		output+='<tr><td class="firstCell">' + allEntregas[s].entregaId + '</td><td>'+ allEntregas[s].entregaWood + '</td><td>'+ allEntregas[s].entregaWidth +'</td><td class ="secondCell">'+ allEntregas[s].entregaQt +'</td><td>'+allEntregas[s].entregaLength + '</td><td>' +allEntregas[s].entregaHeight+ '</td><td>' + allEntregas[s].entregaDate +'</td><td>' + allEntregas[s].entregaPt()  + '</td><td>'+ allEntregas[s].entregaM3() +'</td></tr>';

	}
	output += '</table></div>';
	entregasPlaceholder.innerHTML= output;
	document.querySelector('.searchWood').addEventListener('onmouseover', ()=> {
		document.querySelector('.toolTip').style.display="block";
	})
	
	
}




var displayFoundEntregas = () => {
	let searchEntregas = document.querySelector('#searchIncomingWood');
	let output = '<div><input type="text" id="searchIncomingWood" class="searchWood" name="searchIncomingWood"><button type="button" id ="searchEntregas" class ="searchWoodBTN" onclick="displayFoundEntregas()">Search</button><button  class="showAll" type="button" onclick="displayEntregas()">Show All</button></div><div class="toolTip">search : Bundles, Wood, Dates</div><div class="woodTransactions"><h2 class ="woodTransHeader">Incoming Wood</h2><table><thead><tr><td>Bundle</td><td>Wood</td><td>Width</td><td>Qt</td><td>Length</td><td>Height</td><td>Date</td><td>PT</td><td>M<sup>3</sup></td></thead>';
	
	for (e = 0; e < allEntregas.length;e++) {
		if (allEntregas[e].entregaId == searchEntregas.value || allEntregas[e].entregaWood == searchEntregas.value || allEntregas[e].entregaDate == searchEntregas.value){
			output+='<tr><td class="firstCell">' + allEntregas[e].entregaId + '</td><td>'+ allEntregas[e].entregaWood + '</td><td>'+ allEntregas[e].entregaWidth +'</td><td class ="secondCell">'+ allEntregas[e].entregaQt +'</td><td>'+allEntregas[e].entregaLength + '</td><td>' +allEntregas[e].entregaHeight+ '</td><td>' + allEntregas[e].entregaDate +'</td><td>' + allEntregas[e].entregaPt()  + '</td><td>'+ allEntregas[e].entregaM3() +'</td></tr>';	
			console.log(allEntregas[e].entregaWood);
		}
	}
	output += '</table></div>';
	entregasPlaceholder.innerHTML= output;
	salidasPlaceholder.innerHTML= "";
	document.querySelector('.searchWood').addEventListener('onmouseover', ()=> {
		document.querySelector('.toolTip').style.display="block";
	})

}








/////////////////////////////////////
////////// Salidas //////////////////
/////////////////////////////////////

let allSalidas =[];







class Salida {
	constructor(salidaId, salidaWidth, salidaQt, salidaWood, salidaLength, salidaHeight) {
		this.salidaId = salidaId;
		this.salidaWood = salidaWood;
		this.salidaWidth = salidaWidth;
		this.salidaQt = salidaQt;
		this.salidaLength = salidaLength;
		this.salidaHeight = salidaHeight;
		this.salidaDate = dateFunction();
		this.salidaPt = function () {
			return this.salidaHeight * this.salidaLength * this.salidaWidth * this.salidaQt / 12;
		};
		this.salidaM3 = function () {
			return Math.floor(this.salidaPt() * 568.26125);
		};
	}
}






var createSalidaRercord = () => {
	var counter = 0;
	for (n = 0; n < inventory.length; n++) {
		if (inventory[n].id == bundle.value) {
			counter += 1;
		}
		else {

		}
	}

	if (counter == 1){
		index = inventory.findIndex(x => x.id === bundle.value);


  	  var tempSalida = new Salida (bundle.value, width.value, qt.value, inventory[index].wood, inventory[index].length , inventory[index].height );
  	  allSalidas.push(tempSalida);
  	  console.log(allSalidas);

	}else {
		error.innerHTML = "Bundle " + bundle.value + " doesn't exist !!";
	}

}


var salidasPlaceholder = document.querySelector('#salidasPlaceholder');
let displaySalidas = () => {

	let output = '<div><input type="text" id="searchOutgoingWood" class="searchWood" name="searchOutgoingWood"><button type="button" id ="searchSalidas" class ="searchWoodBTN" onclick="displayFoundSalidas()">Search</button></div><div class="toolTip">search : Bundles, Wood, Dates</div><div class="woodTransactions"><h2 class ="woodTransHeader">Outgoing Wood</h2><table><thead><tr><td>Bundle</td><td>Wood</td><td>Width</td><td>Qt</td><td>Length</td><td>Height</td><td>Date</td><td>PT</td><td>M<sup>3</sup></td></thead>';

	for(s = 0; s < allSalidas.length; s++ ) {
		output+='<tr><td class="firstCell">' + allSalidas[s].salidaId + '</td><td>'+ allSalidas[s].salidaWood + '</td><td>'+ allSalidas[s].salidaWidth +'</td><td class ="secondCell">'+ allSalidas[s].salidaQt +'</td><td>'+allSalidas[s].salidaLength + '</td><td>' +allSalidas[s].salidaHeight+ '</td><td>' + allSalidas[s].salidaDate +'</td><td>' + allSalidas[s].salidaPt()  + '</td><td>'+ allSalidas[s].salidaM3() +'</td></tr>';

	}
	output += '</table></div>';
	salidasPlaceholder.innerHTML= output;
	/*bundle.value = "";
	width.value ="";
	qt.value ="";*/
	document.querySelector('.toolTip').addEventListener('onmouseover', ()=> {
		document.querySelector('.toolTip').style.display="none";
	})

}

var displayFoundSalidas = () => {
	let searchSalidas = document.querySelector('#searchOutgoingWood');
	let output = '<div><input type="text" id="searchOutgoingWood" class="searchWood" name="searchOutgoingWood"><button type="button" id ="searchSalidas" class ="searchWoodBTN" onclick="displayFoundSalidas()">Search</button><button class="showAll" type="button" onclick="displaySalidas()">Show All</button></div><div class="toolTip">search : Bundles, Wood, Dates</div><div class="woodTransactions"><h2 class ="woodTransHeader">Outgoing Wood</h2><table><thead><tr><td>Bundle</td><td>Wood</td><td>Width</td><td>Qt</td><td>Length</td><td>Height</td><td>Date</td><td>PT</td><td>M<sup>3</sup></td></thead>';
	
	for (e = 0; e < allSalidas.length;e++) {
		if (allSalidas[e].salidaId == searchSalidas.value || allSalidas[e].salidaWood == searchSalidas.value || allSalidas[e].salidaDate == searchSalidas.value){
			output+='<tr><td class="firstCell">' + allSalidas[e].salidaId + '</td><td>'+ allSalidas[e].salidaWood + '</td><td>'+ allSalidas[e].salidaWidth +'</td><td class ="secondCell">'+ allSalidas[e].salidaQt +'</td><td>'+allSalidas[e].salidaLength + '</td><td>' +allSalidas[e].salidaHeight+ '</td><td>' + allSalidas[e].salidaDate +'</td><td>' + allSalidas[e].salidaPt()  + '</td><td>'+ allSalidas[e].salidaM3() +'</td></tr>';	
			
		}
	}
	output += '</table></div>';
	salidasPlaceholder.innerHTML= output;
	entregasPlaceholder.innerHTML= "";

	document.querySelector('.toolTip').addEventListener('onmouseover', ()=> {
		document.querySelector('.toolTip').style.display="none";
	})


}

///////select first cell of table row

$(".tableBundles").on("click","td", function (){
    var ptsID = $(this).parent("tr").find("td:first").text();
    alert(ptsID);
});




