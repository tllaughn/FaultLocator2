var z1mag,z1ang,z1m,z0mag,z0ang,rs,xs,zsmag,zsang,rsm,xsm,r1m,x1m,zsm;

function poltorect(mag,ang){
	var re,im;
	re=mag*Math.cos(ang*Math.PI/180);
	im=mag*Math.sin(ang*Math.PI/180);
	var output = [re,im];
	return output;
}

function convertpoltorect(){
  var mag,ang;
  mag=document.getElementById("mag").value;
  ang=document.getElementById("ang").value;
  var rect;
  rect=poltorect(mag,ang);
  document.getElementById("results").innerHTML="Rectangular Coords: " + rect[0].toFixed(4) + " + j" + rect[1].toFixed(4);
  return;
}

function recttopol(re,im){
  var mag,ang;
  mag=Math.sqrt(re*re+im*im);
  ang=Math.acos(re/mag)*180/Math.PI;
  var output = [mag,ang];
  return output;
}

function recttopola(re,im){
  var mag,ang;
  mag=Math.sqrt(re*re+im*im);
  ang=Math.atan(im/re)*180/Math.PI;
  var output = [mag,ang];
  return output;
}

function convertrecttopol(){
  var re,im;
  re=document.getElementById("re").value;
  im=document.getElementById("im").value;
  var pol;
  pol=recttopol(re,im);
  document.getElementById("results").innerHTML="Polar Coords: " + pol[0].toFixed(4) + " < " + pol[1].toFixed(4);
}

function computeImpedance(){
	var l=Number(document.getElementById("linelength").value);
	var r1=Number(document.getElementById("r1").value);
	var x1=Number(document.getElementById("x1").value);
	var r0=Number(document.getElementById("r0").value);
	var x0=Number(document.getElementById("x0").value);

  var z1=recttopol(r1,x1);
  z1mag=z1[0];
  z1ang=z1[1];

  var z0=recttopol(r0,x0);
  z0mag=z0[0];
  z0ang=z0[1];

	rs=(2*r1+r0)/3;
	xs=(2*x1+x0)/3;

  var zs=recttopol(rs,xs);
  zsmag=zs[0];
  zsang=zs[1];

	rsm=rs/l;
	xsm=xs/l;
	zsm=zsmag/l;

	r1m=r1/l;
	x1m=x1/l;
	z1m=z1mag/l;

}

function computeFault() {
  computeImpedance();

	var vmag=Number(document.getElementById("vmag").value);
	var vang=Number(document.getElementById("vang").value);
	var imag=Number(document.getElementById("imag").value);
	var iang=Number(document.getElementById("iang").value);

	var vRect=poltorect(vmag,vang);
	var iRect=poltorect(imag,iang);

	var zRe=(vmag/imag)*Math.cos((vang-iang)*Math.PI/180);
	var zIm=(vmag/imag)*Math.sin((vang-iang)*Math.PI/180);

  var zf=recttopol(zRe,zIm);
	var zfmag=zf[0];
	var zfang=zf[1];

	var reactancefault=zIm/xsm;
	var simplefault=zfmag/zsm;

	var output="<B>Results:</B><br />";
	output+="<table><TR><TD>";
	output+="<B>Fault Impedance (Rectangular Form): </B>" + zRe.toFixed(4) + "+ j" + zIm.toFixed(4) + "<BR />";
	output+="<B>Fault Impedance (Polar Form): </B>" + zfmag.toFixed(4) + " < " + zfang.toFixed(4) + "<BR />";
	output+="<B>Simple Fault Distance (miles): </B>" + simplefault.toFixed(4) + "<BR />";
	output+="<B>Reactance Fault Distance (miles): </B>" + reactancefault.toFixed(4) + "<BR /></TD></TR></table>";

	document.getElementById("results").innerHTML=output;
}

function compute3phFault() {
  computeImpedance();

	var v1mag=Number(document.getElementById("v1mag").value);
	var v1ang=Number(document.getElementById("v1ang").value);
	var v1Rect=poltorect(v1mag,v1ang);

	var i1mag=Number(document.getElementById("i1mag").value);
	var i1ang=Number(document.getElementById("i1ang").value);
	var i1Rect=poltorect(i1mag,i1ang);

	var v2mag=Number(document.getElementById("v2mag").value);
	var v2ang=Number(document.getElementById("v2ang").value);
	var v2Rect=poltorect(v2mag,v2ang);

	var i2mag=Number(document.getElementById("i2mag").value);
	var i2ang=Number(document.getElementById("i2ang").value);
	var i2Rect=poltorect(i2mag,i2ang);

	var v12Re=v1Rect[0]-v2Rect[0];
	var v12Im=v1Rect[1]-v2Rect[1];
  //alert("V12: " + v12Re + ", " + v12Im);

	var i12Re=i1Rect[0]-i2Rect[0];
	var i12Im=i1Rect[1]-i2Rect[1];
  //alert("I12: " + i12Re + ", " + i12Im);

  var v12=recttopola(v12Re,v12Im);
  var vmag=v12[0];
  var vang=v12[1];
//  alert("v12mag<: " + vmag + ", " + vang);

  var i12=recttopola(i12Re,i12Im);
  var imag=i12[0];
  var iang=i12[1];
  //alert("i12mag<: " + imag + ", " + iang);

	var viangdiff=vang-iang;

	if (viangdiff < 0 || viangdiff > 90 ) {
		viangdiff+=180;
	}

	var zRe=(vmag/imag)*Math.cos((viangdiff)*Math.PI/180);
	var zIm=(vmag/imag)*Math.sin((viangdiff)*Math.PI/180);

  var zf=recttopola(zRe,zIm);
  var zfmag=zf[0];
  var zfang=zf[1];

	var reactancefault=zIm/x1m;
	var simplefault=zfmag/z1m;

	var output="<B>Results:</B><br />";
	output+="<table><TR>";
	output+="<B>Fault Impedance (Rectangular Form): </B>" + zRe.toFixed(4) + "+ j" + zIm.toFixed(4) + "<BR />";
	output+="<B>Fault Impedance (Polar Form): </B>" + zfmag.toFixed(4) + " < " + zfang.toFixed(4) + "<BR />";
	output+="<B>Simple Fault Distance (miles): </B>" + simplefault.toFixed(4) + "<BR />";
	output+="<B>Reactance Fault Distance (miles): </B>" + reactancefault.toFixed(4) + "<BR /></TD></TR></table>";

	document.getElementById("results").innerHTML=output;

}
