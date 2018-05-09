// Script to open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

function selectFaultType() {

	if (document.getElementById("faulttype").selectedIndex==0) {
		document.getElementById("LG").style.display="inline";
		document.getElementById("3PH").style.display="none";

	} else {
		document.getElementById("LG").style.display="none";
		document.getElementById("3PH").style.display="inline";
	}
	document.getElementById("results").innerHTML="";
}

function resetForm(){
  document.forms[0].reset();
  document.getElementById("faulttype").selectedIndex=0;
  selectFaultType();


}
