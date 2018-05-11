// cap.js  ----- Versión 27-06-2002 -----

var prem;

prem = new String(location);

var NS = (navigator.appName == "Netscape") ? 1 : 0;
var IE = (navigator.appName == "Microsoft Internet Explorer") ? 1 : 0; 
var ver4 = (navigator.appVersion.indexOf('4.',0) == 0) ? 1 : 0;

function trobarURLabs(relativa){


  // Fix per la plana index (INICI)
  
  var relativa2;
  var raux;
  raux=top.location.href;
  raux2=raux.substring(raux.length-1,raux.length);
  
  if ((raux2=='/') || (raux2=='\\')) 
  	 {
	 relativa2 = raux + relativa;
	 return relativa2;
	 }

  // Fix per la plana index (FI)

  if(relativa.indexOf('http://',0)==0) return relativa;

  if(relativa.indexOf('ftp://',0)==0) return relativa;

  //if(relativa.indexOf('mailto:',0)==0) return relativa;

  var n;

  var quants;

  var URLabs;


  quants = 0;

  URLabs = prem;


	if((n=URLabs.lastIndexOf('/web/'))==-1){
		if((n=URLabs.lastIndexOf('\\web\\'))==-1){
    		if((n=URLabs.lastIndexOf('/'))==-1){
    			if((n=URLabs.lastIndexOf('\\'))==-1){
    				n=URLabs.length;
    			}
    		}
			URLabs=URLabs.substring(0,n+1);
			return URLabs+=relativa;
		}
	}
		
  if(relativa.indexOf('/',0)==0){

	if((n=URLabs.lastIndexOf('/web/'))==-1)

		n=URLabs.lastIndexOf('\\web\\');

	URLabs=URLabs.substring(0,n);

  }



  else

  {

	n = relativa.indexOf('../',0);

	if(n != -1){

    		while(n!=-1){

      		n = relativa.indexOf('../',n+3);

      		quants++;

    		}

    	relativa = relativa.substring((quants*3),relativa.length);

  	} 

  

  	if(URLabs.indexOf('\\',0)==-1)

  	{

  	  for(var i=0; i<quants+1;i++){

  	    URLabs = URLabs.substring(0,URLabs.length-1);

  	    URLabs = URLabs.substring(0,URLabs.lastIndexOf('/')+1);

  	  }

  	}

  	else{

  	 for(var i=0; i<quants+1;i++){

  	    URLabs = URLabs.substring(0,URLabs.length-1);

  	    URLabs = URLabs.substring(0,URLabs.lastIndexOf('\\')+1);

  	  }

  	}

  }

  URLabs +=relativa;

  return URLabs;

}     

    



function docLoad(Url, target) {

var loc;

loc = target;

loc += '.location';

eval(loc + '=trobarURLabs(Url);');

}





function oWin(plana,type,tam1,tam2,mbar,locat,rsize,stat){

 var resWin;

      var w;

      var h;

      var nom;

      var cadena;



 if (type == "*")

            nom= getWinNm();

 else nom=type;



 if ((tam1 == "*") || (tam2 == "*")) {

  w = 600;

  h = 400;

 }

 else {

     w=tam1;

     h=tam2;

 }

   

  cadena = 'width='+w+',height='+h+',menubar=' + mbar + ',location=' + locat + ',resizable=' + rsize + ',scrollbars=yes,status=' + stat;

  resWin = window.open(trobarURLabs(plana),nom,cadena); 



  if (NS) {

	resWin.focus();

  }

}



function getIm(imatge)

{

	var im;

	im = new Image;

	im.src=trobarURLabs(imatge);

	return (im.src);

}



function mouseOver(banner) {

 self.status=banner;

 }



function mouseOut() {

 self.status="";

 }



function getWinNm()     {

        var now = new Date();

        var hr = new String(now.getHours());

        var mn = new String(now.getMinutes());

        var sc = new String(now.getSeconds());

        var winNm = hr + mn + sc;return winNm;

        }



function cache()

{

this.length=cache.arguments.length;

for(i=0;i<this.length;i++)

	{

	this[i+1]=new Image();

	this[i+1].src=cache.arguments[i];

	}

}


//Funció que ens retorna un array amb la llista de paràmetres de la url (p.ex.: http://www.uoc.es/index.html?param1&param2&param3)

function obteParametres()
{

var vect = new Array();
var p = new Array();
var sss=self.location.search;
var acc="";
var i=0;

for (var o=1;o<=sss.length;o++)
{
	if ((sss.charAt(o) == '&') || (o==sss.length))
	{
		p[i]=new String(acc);
		acc="";
		i++;
	}
	else 
	{
		acc=acc+sss.charAt(o);
	}
}
return p;

}


