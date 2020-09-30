//npm install exceljs
var Excel = require('exceljs');
var FileSaver = require('file-saver');


//regresa True si el formato de la Frecuencia es correcta
function verifyFrequency(userInput){
	bVerified = true;
	var days = ["LU","MA","MI","JU","VI","SA","DO"];
	i = 0
	j = days.length
	userInput.forEach(function(day){
	    if(i<j){
	        while(days[i] != day && i<j){
	            i++;
	        }
	        if(j==i){
	            bVerified = false;
	        }
	    }
	})
	return bVerified;
}

const excelToJson =
async function(file)
{
	var arrClases = []
	const reader = new FileReader()
	var workbookInput = new Excel.Workbook();
	reader.readAsArrayBuffer(file)

	//Lee un excel
	//'EJEMPLO_Formato_Inscripciones_PBI.xlsx'
	return new Promise(function(resolve,reject){
		reader.onload = () => {
			const buffer = reader.result;
				workbookInput.xlsx.load(buffer).then(function() {
			//variable booleana que es False si no hay ningun error en el documento de clases a leer
			//Si isError = true, no se sube a la base de datos nada
			var isError = false;
			var sErrorMessage = "No se pudo procesar el archivo<br>";
			//arreglo que guarda las clases leidas

			//Lee la hoja de Excel
			var worksheet = workbookInput.getWorksheet('Formato');
			if(!worksheet)
			{
					isError = true;
					sErrorMessage += "Error: Favor de utilizar la hoja de calculo con nombre 'Formato' segun el ejemplo dado<br>";
			}
			else
			{
				//Función que lee renglon por renglon la información de las clases
				worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber)
				{
					var sClase = "";
					var sName = "";
					var sFrequency = "";
					var sStartHour = "";
					var sEndHour = "";
					var iStartHour = 0;
					var iEndHour = 0;
					var sClassroom = "";
					var sInstructor = "";
					var iCupo = 0;
					//Se omite el renglón 1 porque contiene los títulos de las columnas
					if (rowNumber != 1)
					{
						//NOMBRE DEL CURSO, obligatoria
						//Si es undefined marca error y sale
						if(!row.values[1]){
							isError = true;
							sErrorMessage += ("Linea " + rowNumber + ": El campo Nombre esta vacio<br>");

						}else{
							sName = (row.values[1]);
						}
						////////////////////////////////////////////////////////////////////////
						//FRECUENCIA, Obligatoria
						//Expresion regular para comprobar formato de frecuencia (9 SESIONES POR MES, 15 CITAS, ETC.)
						freqRegExpr = new RegExp("(3)(SESIONES)(POR)(SEMANA)|(PERSONALIZADO)");

						//Si es undefined marca error y sale
						if(!row.values[2]){
							isError = true;
							sErrorMessage += ("Linea " + rowNumber + ": El campo Frecuencia esta vacio<br>");

						}
						else
						{
							//Frecuencia sin espacios se usa para comparaciones con expresiones regulares
							var inputFrequencyNoSpaces = row.values[2].toUpperCase().replace(/ /g,'');
							//Se usa para separar en un arreglo por cada palabra
							var inputFrequencyArr = row.values[2].toUpperCase().split(' ');
							//Se usa para guardar la respuesta final si es comprueba que es veridica
							var inputFrequencyUpperCase = row.values[2].toUpperCase();

							//Si el texto no cumple con la expresión regular 1 (freqRegExpr) marca error y sale
							if(!verifyFrequency(inputFrequencyArr) && (!freqRegExpr.test(inputFrequencyNoSpaces)))
							{
								isError = true;
								sErrorMessage += ("Linea " + rowNumber + ": Formato de Frecuencia incorrecto");
							}
							else
							{
								//Convierte el string a mayuscula y separa por epacios
								sTempFreq = inputFrequencyArr;
								//Checa con la expresión regular  (freqRegExpr) si la frecuencia empieza con números (Ej. 4 CITAS, 12 SESIONES POR SEMESTRE...)
								//Si sí, guarda el string completo como un solo valor dentro del arreglo
								if(freqRegExpr.test(inputFrequencyNoSpaces)){
									sFrequency = inputFrequencyUpperCase;
								}
								else //Si el formato es LU JU, guarda cada día como un elemento del arreglo
								{
									sFrequency = sTempFreq;
								}
							}
						}
						////////////////////////////////////////////////////////////////////////
						//HORA INICIO, Obligatoria
						if(!row.values[3]){
							isError = true;
							sErrorMessage += ("Linea " + rowNumber + ": El campo Hora Inicio esta vacio<br>");

						}else{
							dTimeTemp = new Date (row.values[3]);
							//Si no es formato fecha marca error y se sale
							if(isNaN(dTimeTemp.getTime()))
							{
								isError = true;
								sErrorMessage +=("Linea " + rowNumber + ": El campo Hora Inicio no es una hora valida<br>");

							}
							else{
								//Guarda la hora como string (Ej. "06:15" "23:05")
								iHour = dTimeTemp.getUTCHours();
								iMinutes = dTimeTemp.getUTCMinutes();
								iStartHour = iHour + (iMinutes/100); //Hora como formato número para fines de comparación de horas (Formato "6.15 = 6:15, 23.45 = 23:45")
								sStartHour = ((iHour < 10 ? '0' : '')+iHour) + ":" +  ((iMinutes < 10 ? '0' : '') + iMinutes); //Guarda la hora como string, este valor es el que se dara de alta
							}
						}
						////////////////////////////////////////////////////////////////////////
						//HORA FIN, Obligatoria
						if(!row.values[4]){
							isError = true;
							sErrorMessage += ("Linea " + rowNumber + ": El campo Hora Final esta vacio<br>");

						}else
						{
							dTimeTemp = new Date (row.values[4]);
							//Si no es formato fecha marca error y se sale
							if(isNaN(dTimeTemp.getTime()))
							{
								isError = true;
								sErrorMessage += ("Linea " + rowNumber + ": El campo Hora Final no es una hora valida<br>");

							}
							else{
								//Guarda la hora como un double (Ej. 6.15 = 06:15, 23.05 = 23:05)
								iHour = dTimeTemp.getUTCHours();
								iMinutes = dTimeTemp.getUTCMinutes();
								iEndHour = iHour + (iMinutes/100); //Hora como formato número para fines de comparación de horas (Formato "6.15 = 6:15, 23.45 = 23:45")
								sEndHour = ((iHour < 10 ? '0' : '')+iHour) + ":" + ((iMinutes < 10 ? '0' : '') + iMinutes); //Guarda la hora como string, este valor es el que se dara de alta
							}
							//Verifica que la hora inicial no sea >= a la hora fin, si lo es marca error y se sale
							if(iStartHour >= iEndHour)
							{
								isError = true;
								sErrorMessage += ("Linea " + rowNumber + ": La Hora Inicial no puede ser mayor o igual a la hora inicial<br>");

							}
						}
						//Lugar, Opcional,
						sClassroom = (row.values[5]);
						//Instructor, Opcional
						sInstructor = (row.values[6]);

						//Cupo Obligatorio
						if(!row.values[7]){
							isError = true;
							sErrorMessage += ("Linea " + rowNumber + ": El campo Cupo esta vacio<br>");
						}else{
							if (isNaN(row.values[7]))
							{
								isError = true;
								sErrorMessage += ("Linea " + rowNumber + ": El campo Cupo debe ser un numero<br>");
							}
							else
							{
								iCupo = (row.values[7]);
							}

						}

						//genera una key con todos los valores y lo mete al arreglo de clases arrClases
						sClase = {name: sName, frequency: sFrequency, startHour: sStartHour, endHour: sEndHour, classroom:sClassroom, instructor: sInstructor,quota:iCupo};
						arrClases.push(sClase);
					}
					});
				}
				//Si se pudo leer todo el archivo sin errores se guarda en la base de datos
				if(isError)
				{
					reject(sErrorMessage)
				}
				else{
					resolve(arrClases)

				}
			})
		}
	})
}

////////////ESCRIBIR UN EXCEL A PARTI DE UN JSON
const jsonToExcel =
function (arrClass,strPeriodo){

	var outputName = "";
	//Crea el workbook
	var workbookOutput = new Excel.Workbook();
	//Crea la worksheet llamada Formato
	var worksheet = workbookOutput.addWorksheet('Formato');

	//Escribir  el nombre de las columnas en el renglon 1
	worksheet.getRow(1).values = ['Nombre', 'Frecuencia', 'Hora Inicio', 'Hora Fin', 'Lugar', 'Instructor','Cupo'];

	//Al primer renglon se le agrega formato
	//Negritas, tamaño de letra 14, letra blanca
	worksheet.getRow(1).font = {'bold': true, 'color': { argb: 'FFFFFFFF' }, 'size': 14};
	//Color de celdas gris
	worksheet.getRow(1).fill = {
	type: 'pattern',
	pattern:'solid',
	fgColor:{argb:'FF595959'}
	};

	//Comentario explicativo el formato aceptado en cada una de las columnas
	worksheet.getCell('A1').note = //Nombre
		"Ejemplo: \"Acondicionamiento Físico General\"";
	worksheet.getCell('B1').note = //Frecuencia
		`Ejemplos: \"LU MI JU\", \"MA VI\", \"SA\", \"3 SESIONES POR SEMANA\", \"PERSONALIZADO\"`
	worksheet.getCell('C1').note = //Hora Inicio
		`Ejemplo:
		\"13:00\"
		\"17:00\"
		\"7:00\"`
	worksheet.getCell('D1').note = //Hora Fin
		`Ejemplo:
		\"13:00\"
		\"17:00\"
		\"7:00\"`
	worksheet.getCell('E1').note = //Lugar
		`Ejemplo: \"Centro Deportivo Borrego II\"`
	worksheet.getCell('F1').note = //Instructor
		`Ejemplo: \"Arturo Martínez\"`
	worksheet.getCell('G1').note = //Cupo
		`Ejemplo:
		\"40\"
		\"15\"`

	//Se define la anchura default de cada una de las columnas
	worksheet.getColumn(1).width = 44; //Nombre
	worksheet.getColumn(2).width = 22.71; //Frecuencia
	worksheet.getColumn(3).width = 12.71; //Hora Inicio
	worksheet.getColumn(4).width = 12.71; //Hora Fin
	worksheet.getColumn(5).width = 31.14; //Lugar
	worksheet.getColumn(6).width = 28.86; //Instructor
	worksheet.getColumn(7).width = 6.29; //Cupo

	//A partir del segundo renglón del Excel y hasta que se lean todos los renglones del JSON
	for(var i=0, j=2; i< arrClass.length; i++, j++)
	{
		var nombre = arrClass[i]['name']
		var frequency = arrClass[i]['frequency']
		var startHour = arrClass[i]['startHour']
		var endHour = arrClass[i]['endHour']
		var classroom = arrClass[i]['classroom']
		var instructor = arrClass[i]['instructor']
		var cupo = arrClass[i]['quota']

		//Si la frequency es tipo objeto (Ej. "LU MA VI") porque este formato guarda cada día como un arreglo
		if(typeof frequency == 'object')
		{
			var tempNewFreq = ""
			frequency.forEach(function(f){ //Guardar todos los elementos del arreglo como un string separado por un espacio
				tempNewFreq = tempNewFreq + f + ' '
			})
			frequency = tempNewFreq.substring(0, tempNewFreq.length-1); //Se borra el último espacio del string
		}

		dTimeStart = new Date(); //Se define un tipo fecha para la fecha inicial
		dTimeStart.setUTCHours(parseInt(startHour.substring(0,2))); //Se le asignan la hora
		dTimeStart.setUTCMinutes(parseInt(startHour.substring(3,5))); //Se le asigna los minutos

		dTimeEnd = new Date(); //Se define un tipo fecha para la fecha final
		dTimeEnd.setUTCHours(parseInt(endHour.substring(0,2))); //Se le asignan la hora
		dTimeEnd.setUTCMinutes(parseInt(endHour.substring(3,5))); //Se le asigna los minutos

		//Se imprimen todos los datos al renglón
		worksheet.getRow(j).values = [nombre,frequency,dTimeStart,dTimeEnd,classroom,instructor,cupo]
		worksheet.getRow(j).alignment = { wrapText: true, vertical: 'middle'};
	}

	//Se formate la columna de Hora Inicial y Hora Final para que tenga formato correcto de hora
	worksheet.getColumn(3).numFmt = 'hh:mm'
	worksheet.getColumn(4).numFmt = 'hh:mm'

	//Se arma el nombre del archivo de salida, compuesto por el periodo que se recibió como parámetro, la fecha y la hora actual
	strPeriodo = strPeriodo.replace(/ /g,"-");
	var hoy = new Date();
	var date = hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear();
	var time = hoy.getHours() + "-" + hoy.getMinutes();
	outputName = strPeriodo + '_' + date + '_' + time + '.xlsx'

	workbookOutput.xlsx.writeBuffer().then(function (data) {
		var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
		FileSaver.saveAs(blob, outputName);
	});

	//Se imprime el workbook con el nombre de archivo apropiado
	//workbookOutput.xlsx.writeFile(outputName);
	}

module.exports={
	excelToJson : excelToJson,
	jsonToExcel : jsonToExcel
}