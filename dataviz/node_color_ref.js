/*
"Diseases of Circulatory System"="#FF0000", 7

"Infectious and Parasitic Diseases"="#FF00FF", 1

"Diseases of Digestive System"="#736F6E", 9

"Neoplasms"="#151B8D", 2

"Diseases of Blood and Blood Forming Organs"="#C11B17", 4

"Diseases of Nervous System and Sense Organs"="#D4A017", 6

 "Diseases of Musculoskeletal and Connective Tissue"="#98AFC7", 13

"Congenital Anomalies"="#800080", 11?

 "Diseases of Respiratory System"="#FDD017", 8

"Diseases of Genitourinary System"="#FFFFFF", 10

"Diseases Skin and Subcutaneous Tissue"="#F9B7FF", 12

"Endocrine, Nutritional, and Metabolic Diseases and Immunity Disorders"="#F87217", 3

"Complications of Pregnancy, Childbirth, and the Puerperium"="#4AA02C",

"Mental Disorders"="#00FFFF", 5

"Newborn (Perinatal) Guidelines"="#000000"

"DEAD"="#FFFFFF", 99
*/

//"Diseases	of	Circulatory	System"="#FF0000",		

//"Infec&ous	and	Parasi&c	Diseases"="#FF00FF",		

//"Diseases	of	Diges&ve	System"="#736F6E",	

//"Neoplasms"="#151B8D",		

//"Diseases	of	Blood	and	Blood	Forming	Organs"="#C11B17",	

//"Diseases	of	Nervous	System	and	Sense	Organs"="#D4A017",	

//"Diseases	of	Musculoskeletal	and	Connec&ve	Tissue"="#98AFC7",	

//"Congenital	Anomalies"="#800080",	

//"Diseases	of	Respiratory	System"="#FDD017",	

//"Diseases	of	Genitourinary	System"="#FFFFFF",	

//"Diseases	Skin	and	Subcutaneous	Tissue"="#F9B7FF",	

//"Endocrine,	Nutri&onal,	and	Metabolic	Diseases	and	Immunity	Disorders"="#F87217",	

//"Complica&ons	of	Pregnancy,	Childbirth,	and	the	Puerperium"="#4AA02C",	

//"Mental	Disorders"="#00FFFF",	

//"Newborn	(Perinatal)	Guidelines"="#000000"

//----//

/*
"Nation","chapterNo","chapterTitle"

"us","1","Infectious and Parasitic Diseases" #FF00FF
"us","2","Neoplasms" #151B8D
"us","3","Endocrine, Nutritional, and Metabolic Diseases and Immunity Disorders" #F87217
"us","4","Diseases of Blood and Blood Forming Organs" #C11B17
"us","5","Mental Disorders" #00FFFF
"us","6","Diseases of Nervous System and Sense Organs" #D4A017
"us","7","Diseases of Circulatory System" #FF0000
"us","8","Diseases of Respiratory System" #FDD017
"us","9","Diseases of Digestive System" #736F6E
"us","10","Diseases of Genitourinary System" #FFFFFF
"us","11","Complications of Pregnancy, Childbirth, and the Puerperium" #4AA02C
"us","12","Diseases Skin and Subcutaneous Tissue" #F9B7FF
"us","13","Diseases of Musculoskeletal and Connective Tissue" #98AFC7
"us","14","Congenital Anomalies" #800080

"us","15","Certain Conditions Originating in the perinatal period"
"us","16","Symptoms, Signs and Ill-defined conditions"
"us","17","Injury and poisioning"*/

//"us","V","Classification of Factors Influencing Health Status and Contact with Health Service"

//"us","99","Death"


var node_color = [
	'#303060', //0
	'#FF00FF', //1
	'#151B8D', //2
	'#F87217', //3
	'#C11B17', //4
	'#00FFFF', //5
	'#D4A017', //6
	'#FF0000', //7
	'#FDD017', //8
	'#736F6E', //9
	'#FFFFFF', //10
	'#4AA02C', //11
	'#F9B7FF', //12
	'#98AFC7', //13
	'#800080', //14
];

/*
"Diseases	of	the	musculoskeletal	system	and	connec&ve	&ssue"="#98AFC7",		

"Diseases	of	the	circulatory	system"="#FF0000”,		

"Diseases	of	the	respiratory	system"="#FDD017”,	

"Mental	and	behavioural	disorders"=	"#00FFFF",		

"Diseases	of	the	ear	and	mastoid	process"="#CCFFFF",	

"Endocrine,	nutri&onal	and	metabolic	diseases"="#F87217”,	

"Certain	infec&ous	and	parasi&c	diseases"="#FF00FF",		

"Diseases	of	the	eye	and	adnexa"="#00FF00",	

"Neoplasms"="#151B8D",		

"Diseases	of	the	genitourinary	system"="#FFFFFF",	

"Diseases	of	the	skin	and	subcutaneous	&ssue"="#F9B7FF”,	

"Diseases	of	the	nervous	system"="#D4A017”,	

"Diseases	of	the	blood	and	blood-forming	organs	and	certain	disorders	involving	the	immune	mechanism"="#C11B17",	

"Diseases	of	the	diges&ve	system"="#736F6E",	

"Congenital	malforma&ons,	deforma&ons	and	chromosomal	abnormali&es"="#800080",		

"Pregnancy,	childbirth	and	the	puerperium"="#4AA02C"
*/


var node_color_KOR = [
	'#303060', // 0 DIE
	'#FF00FF', // 1 Certain infectious and parasitic diseases
	'#151B8D', // 2 Neoplasms
	'#C11B17', // 3 Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism
	'#F87217', // 4 Endocrine, nutritional and metabolic diseases
	'#00FFFF', // 5 Mental and behavioural disorders
	'#D4A017', // 6 Diseases of the nervous system
	'#00FF00', // 7 Diseases of the eye and adnexa
	'#CCFFFF', // 8 Diseases of the ear and mastoid process
	'#FF0000', // 9 Diseases of the circulatory system
	'#FDD017', // 10 Diseases of the respiratory system
	'#736F6E', // 11 Diseases of the digestive system
	'#F9B7FF', // 12 Diseases of the skin and subcutaneous tissue
	'#98AFC7', // 13 Diseases of the musculoskeletal system and connective tissue
	'#FFFFFF', // 14 Diseases of the genitourinary system
	'#4AA02C' // 15 Pregnancy, childbirth and the puerperium
	/*
	, // 16 Certain conditions originating in the perinatal period
	, // 17 Congenital malformations, deformations and chromosomal abnormalities
	, // 18 Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified
	, // 19 Injury, poisoning and certain other consequences of external causes
	, // 20 External causes of morbidity and mortality
	, // 21 Factors influencing health status and contact with health services
	*/
];

var MERGEPATH_INITNODE_REF = [];

