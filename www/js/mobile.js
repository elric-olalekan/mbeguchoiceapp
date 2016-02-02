var db;
var dbCreated = false;
var id;
var uuid;
var value;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
	
	// db = window.openDatabase("mbeguchoicedb", "1.0", "MbeguChoice", 2 * 1024 * 1024); //100MB db
	db = window.sqlitePlugin.openDatabase({name: "mbeguchoiceappdb.db"});

	//testDB();
	populateDB();
	populate_counties_dropdown();
	populate_maturity_filter();
	
	sync_with_live_db();

	$('.generate-pdf').click(function(e) {
    	generateResultsPDF();
	});

	$('#submit-btn').click(function(e) {
		var email_body = '';

		if($( "#contact_name" ).val() !=''){ email_body += 'Name: '+$( "#contact_name" ).val()+'<br>'; };
		if($( "#contact_email" ).val() !=''){ var contact_email = $( "#contact_email" ).val() }else{ var contact_email = ''};
		if($( "#contact_phone" ).val() !=''){ email_body += 'Phone Number: '+$( "#contact_phone" ).val()+'<br>';};
		if($( "#contact_message" ).val() !=''){ email_body += $( "#contact_message" ).val();};

		// Add app alias
		cordova.plugins.email.addAlias('gmail', 'com.google.android.gm');
		
		cordova.plugins.email.isAvailable(function() {
		   // not available
			console.dir('Please configure your email client app');
		 }, function() {
		   // is available
		   cordova.plugins.email.open({
				app: 	 'gmail',
				to:      'e.wamugu@creativeyr.co.ke',
				cc:  	 contact_email,
				subject: 'From MbeguChoice App',
				body:    email_body,
				isHtml:  true
			});
		 });
	}); 

	uuid=device.uuid;
}


function testDB(){

	//Create Table
	db.transaction(
		function(tx) {
			//List All Tables
			tx.executeSql("SELECT * FROM sqlite_master where type='table'", [], function (tx, results) {
			  	var length = results.rows.length, i;
			  	console.dir(length);
			  	// for (i = 0; i < length; i++) {
			   //  	console.dir(results.rows.item(i));
			  	// }
			});

		},
		function(error){console.dir(error);}
	);
}

function populateDB(){
	comm_levels_tbl();			
	comm_potential_tbl();
	swa_comm_potential_tbl();
	counties_tbl();
	crops_tbl();			
	swa_crops_tbl();			
	cropcategories_tbl();			
	swa_cropcategories_tbl();			
	institutions_tbl();
	institutiontypes_tbl();
	license_types_tbl();			
	swa_license_types_tbl();			
	seasons_tbl();
	swa_seasons_tbl();
	cropvarieties_tbl();		
	swa_cropvarieties_tbl();
	variety_institutions_joins_tbl();	
	seedtypes_tbl();
	swa_seedtypes_tbl();
}

function comm_levels_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_comm_level ( "+
					"comm_level_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"comm_level_name varchar(255) " + 
				");";
			var populatetablesql = "INSERT OR IGNORE INTO default_sid_comm_level (comm_level_name, comm_level_id) VALUES "+
				"('', 1),"+
				"('EMERGING', 2),"+
				"('FULL', 3),"+
				"('LIMITED', 5),"+
				"('PAST', 8),"+
				"('ZERO', 9);";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

			// tx.executeSql('SELECT * FROM default_sid_comm_level', [], function (tx, results) {
			//   	var length = results.rows.length, i;
			//   	for (i = 0; i < length; i++) {
			//     	console.dir(results.rows.item(i));
			//   	}
			// });

		},
		function(error){console.dir(error);}
	);
}

function comm_potential_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_comm_potential ( "+
					"comm_potential_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"comm_potential_name varchar(255) " + 
				");";

			var populatetablesql = "INSERT OR IGNORE INTO default_sid_comm_potential (comm_potential_name, comm_potential_id) VALUES "+
				"('', 1),"+
				"('HIGH', 2),"+
				"('LOW', 3),"+
				"('MEDIUM', 4),"+
				"('ZERO', 6);";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function swa_comm_potential_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_comm_potential_swa ( "+
					"comm_potential_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"comm_potential_name varchar(255) " + 
				");";

			var populatetablesql = "INSERT OR IGNORE INTO default_sid_comm_potential_swa (comm_potential_name, comm_potential_id) VALUES "+
				"('', 1),"+
				"('JUU', 2),"+
				"('KADRI', 3),"+
				"('MEDIUM', 4),"+
				"('ZERO', 6);";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function counties_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_counties ( "+
					"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"county_name varchar(255) " + 
				");";

			var populatetablesql = "INSERT OR IGNORE INTO default_sid_counties (id, county_name) VALUES "+
				"(1, 'BARINGO'),"+
				"(2, 'BOMET'),"+
				"(3, 'BUNGOMA'),"+
				"(4, 'BUSIA'),"+
				"(5, 'ELGEYO MARAKWET'),"+
				"(6, 'EMBU'),"+
				"(7, 'GARISSA'),"+
				"(8, 'HOMA BAY'),"+
				"(9, 'ISIOLO'),"+
				"(10, 'KAJIADO'),"+
				"(11, 'KAKAMEGA'),"+
				"(12, 'KERICHO'),"+
				"(13, 'KIAMBU'),"+
				"(14, 'KILIFI'),"+
				"(15, 'KIRINYAGA'),"+
				"(16, 'KISII'),"+
				"(17, 'KISUMU'),"+
				"(18, 'KITUI'),"+
				"(19, 'KWALE'),"+
				"(20, 'LAIKIPIA'),"+
				"(21, 'LAMU'),"+
				"(22, 'MACHAKOS'),"+
				"(23, 'MAKUENI'),"+
				"(24, 'MANDERA'),"+
				"(25, 'MARSABIT'),"+
				"(26, 'MERU'),"+
				"(27, 'MIGORI'),"+
				"(28, 'MOMBASA'),"+
				"(29, 'MURANGA'),"+
				"(30, 'NAIROBI'),"+
				"(31, 'NAKURU'),"+
				"(32, 'NANDI'),"+
				"(33, 'NAROK'),"+
				"(34, 'NYAMIRA'),"+
				"(35, 'NYANDARUA'),"+
				"(36, 'NYERI'),"+
				"(37, 'SAMBURU'),"+
				"(38, 'SIAYA'),"+
				"(39, 'TAITA TAVETA'),"+
				"(40, 'TANA RIVER'),"+
				"(41, 'THARAKA NITHI'),"+
				"(42, 'TRANS NZOIA'),"+
				"(43, 'TURKANA'),"+
				"(44, 'UASIN GISHU'),"+
				"(45, 'VIHIGA'),"+
				"(46, 'WAJIR'),"+
				"(47, 'WEST POKOT');";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function crops_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_crop ( "+
					"crop_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"crop_name varchar(255), " + 
					"category_id INTEGER(11) " + 
				");";
			
			var populatetablesql = "INSERT OR IGNORE INTO default_sid_crop (crop_id, crop_name, category_id) VALUES "+
				"(1, 'FINGER MILLET', 1),"+
				"(2, 'FOXTAIL MILLET', 1),"+
				"(3, 'MAIZE HYBRID', 1),"+
				"(4, 'RICE PADDY', 1),"+
				"(5, 'RICE UPLAND', 1),"+
				"(6, 'SORGHUM', 1),"+
				"(7, 'WHEAT', 1),"+
				"(8, 'CHICKPEA', 2),"+
				"(9, 'CLIMBING BEAN', 2),"+
				"(10, 'COMMON BEAN', 2),"+
				"(11, 'COWPEA', 2),"+
				"(12, 'DOLICHOS BEAN', 2),"+
				"(14, 'PEARL MILLET', 2),"+
				"(15, 'PIGEON PEA', 2),"+
				"(16, 'SOYA BEANS', 2),"+
				"(17, 'CASSAVA', 3),"+
				"(18, 'IRISH POTATO', 3),"+
				"(19, 'SWEET POTATO', 3),"+
				"(20, 'MUNG BEANS/GREENGRAMS', 2),"+
				"(21, 'MAIZE OPV', 1);";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function swa_crops_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_crop_swa ( "+
					"crop_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"crop_name varchar(255), " + 
					"category_id INTEGER(11) " + 
				");";
			
			var populatetablesql = "INSERT OR IGNORE INTO default_sid_crop_swa (crop_id, crop_name, category_id) VALUES "+
				"(1, 'WIMBI-FINGER', 1),"+
				"(2, 'WIMBI-FOXTAIL', 1),"+
				"(3, 'MAHINDI  HYBRID', 1),"+
				"(4, 'MPUNGA (PADDY RICE)', 1),"+
				"(5, 'MPUNGA (UPLAND RICE)', 1),"+
				"(6, 'MTAMA', 1),"+
				"(7, 'NGANO', 1),"+
				"(8, 'MINJI(CHICKPEA)', 2),"+
				"(9, 'MAHARAGWE YA KUTAMBAA', 2),"+
				"(10, 'MAHARAGWE ASILI', 2),"+
				"(11, 'KUNDE', 2),"+
				"(12, 'MAHARAGWE DOLICHOS', 2),"+
				"(14, 'WIMBI-PEARL', 2),"+
				"(15, 'MBAAZI', 2),"+
				"(16, 'MAHARAGWE SOYA', 2),"+
				"(17, 'MUHOGO', 3),"+
				"(18, 'VIAZI', 3),"+
				"(19, 'VIAZI VITAMU', 3),"+
				"(20, 'POJO/DENGU', 2),"+
				"(21, 'MAHINDI  OPV', 1);";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function cropcategories_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_cropcategory ( "+
					"category_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"category_name varchar(255) " + 
				");";

			var populatetablesql = "INSERT OR IGNORE INTO default_sid_cropcategory (category_id, category_name) VALUES "+
				"(1, 'GRAIN'),"+
				"(2, 'PULSES'),"+
				"(3, 'ROOTS/TUBERS'),"+
				"(4, 'GRAIN');";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function swa_cropcategories_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_cropcategory_swa ( "+
					"category_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"category_name varchar(255) " + 
				");";

			var populatetablesql = "INSERT OR IGNORE INTO default_sid_cropcategory_swa (category_id, category_name) VALUES "+
				"(1, 'NAFAKA'),"+
				"(2, 'KUNDEKUNDE'),"+
				"(3, 'MIZIZI'),"+
				"(4, 'NAFAKA');";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function institutions_tbl(){
	//Create Table
	db.transaction(
		function(tx) {
			var deletetablesql = "DROP TABLE IF EXISTS default_sid_institution;";

			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_institution ( "+
					"institution_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"institution_name varchar(255) " + 
				");";

			var populatetablesql = "INSERT OR IGNORE INTO default_sid_institution (institution_id, institution_name) VALUES "+
				"(3, 'AARDAPPELKWEEK'),"+
				"(4, 'AFRICE SEED'),"+
				"(5, 'AGRICO EAST AFRICA LTD.'),"+
				"(6, 'AGRICULTURAL DEVELOPMENT CORPORATION'),"+
				"(7, 'AGRISEED'),"+
				"(8, 'ALPHEGA'),"+
				"(9, 'BUBAYI SEED CO'),"+
				"(10, 'CROP AFRICA'),"+
				"(11, 'DEKALB'),"+
				"(12, 'DEN HARTIGH BV'),"+
				"(13, 'DRYLAND SEED LTD'),"+
				"(14, 'EAST AFRICAN SEED CO LTD'),"+
				"(15, 'EGERTON UNIVERSITY'),"+
				"(16, 'ELGON KENYA LIMITED'),"+
				"(18, 'FARMERS'),"+
				"(19, 'FRESHCO KENYA LIMITED'),"+
				"(20, 'GICHEHA'),"+
				"(21, 'GNASS KENYA'),"+
				"(23, 'ICIPE'),"+
				"(24, 'ICRISAT'),"+
				"(25, 'IITA'),"+
				"(26, 'INTERNATIONAL POTATO CENTER'),"+
				"(27, 'KARI'),"+
				"(28, 'KARI (MWEA & KIBOS)'),"+
				"(29, 'KARI EMBU'),"+
				"(30, 'KARI KAKAMEGA'),"+
				"(31, 'KARI KITALE'),"+
				"(32, 'KARI MUGUGA'),"+
				"(33, 'KARI SEED UNIT'),"+
				"(36, 'KARI KATUMANI'),"+
				"(37, 'KARI LANET'),"+
				"(41, 'KARI KIBOS'),"+
				"(44, 'KARI MTWAPA'),"+
				"(46, 'KARI MWEA'),"+
				"(47, 'KARI NJORO'),"+
				"(48, 'KARI TIGONI'),"+
				"(50, 'KENYA SEED CO. LTD'),"+
				"(55, 'LAGROTECH SEED'),"+
				"(56, 'LELDET LTD'),"+
				"(58, 'MASENO UNIVERSITY'),"+
				"(59, 'MONSANTO KENYA LTD'),"+
				"(62, 'NASECO'),"+
				"(63, 'NATIONAL IRRIGATION BOARD'),"+
				"(64, 'NONE'),"+
				"(66, 'OIL CROP DEVELOPMENT'),"+
				"(67, 'OLERAI'),"+
				"(69, 'OREON'),"+
				"(70, 'PANNAR SEED COMPANY'),"+
				"(71, 'PIONEER HI-BRED KENYA LIMITED '),"+
				"(72, 'SACRED'),"+
				"(73, 'SEEDCO-KENYA'),"+
				"(74, 'SIMLAW SEEDS'),"+
				"(75, 'UNIVERSITY OF NAIROBI'),"+
				"(76, 'VET AGRO'),"+
				"(77, 'VICTORIA'),"+
				"(78, 'WAKALA'),"+
				"(79, 'WESTERN SEED COMPANY LTD');";

			tx.executeSql(deletetablesql);
			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function institutiontypes_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_institutiontype ( "+
					"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"inst_type_name varchar(255) " + 
				");";
			var populatetablesql = "INSERT OR IGNORE INTO default_sid_institutiontype (inst_type_name, id) VALUES "+
				"('Breeding Institution', 1),"+
				"('Maintainer', 2),"+
				"('Commercializing Company', 3);";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function license_types_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_license_type ( "+
					"license_type_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"license_type varchar(255) " + 
				");";
			
			var populatetablesql = "INSERT OR IGNORE INTO default_sid_license_type (license_type, license_type_id) VALUES "+
				"(NULL, 1),"+
				"('', 2),"+
				"('EXCLUSIVE', 3),"+
				"('NON-EXCLUSIVE', 4),"+
				"('OPEN', 7),"+
				"('PROPRIETARY', 8);";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function swa_license_types_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_license_type_swa ( "+
					"license_type_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"license_type varchar(255) " + 
				");";
			
			var populatetablesql = "INSERT OR IGNORE INTO default_sid_license_type_swa (license_type, license_type_id) VALUES "+
				"(NULL, 1),"+
				"('', 2),"+
				"('YA KIPEKEE', 3),"+
				"('ISIYO YA KIPEKEE', 4),"+
				"('WAZI', 7),"+
				"('YA KIBIASHARA', 8);";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function seasons_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_season ( "+
					"season_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"season_name varchar(255) " + 
				");";

			var populatetablesql = "INSERT OR IGNORE INTO default_sid_season (season_id, season_name) VALUES "+
				"(1, NULL),"+
				"(2, 'SHORT'),"+
				"(3, 'BOTH'),"+
				"(4, 'LONG');";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function swa_seasons_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_season_swa ( "+
					"season_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"season_name varchar(255) " + 
				");";

			var populatetablesql = "INSERT OR IGNORE INTO default_sid_season_swa (season_id, season_name) VALUES "+
				"(1, NULL),"+
				"(2, 'CHACHE'),"+
				"(3, 'ZOTE'),"+
				"(4, 'NYINGI');";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function cropvarieties_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_seedchoice_seedworks_combined ( "+
					"sw_id INTEGER PRIMARY KEY AUTOINCREMENT,"+
					"sw_variety varchar(255),"+
					"category_id INTEGER(11),"+
					"crop_id INTEGER(11),"+
					"seedtype_id INTEGER(11),"+
					"season_id INTEGER(11),"+
					"license_type_id INTEGER(11),"+
					"comm_potential_id INTEGER(11),"+
					"comm_level_id INTEGER(11),"+
					"sw_releaseyr INTEGER(11),"+
					"sw_breed_institution varchar(255),"+
					"sw_maintainer varchar(255),"+
					"sw_comm_agent varchar(255),"+
					"sw_alt_optimal varchar(255),"+
					"sw_alt_min INTEGER(11),"+
					"sw_alt_max INTEGER(11),"+
					"sw_maturity varchar(255),"+
					"sw_maturity_age varchar(50),"+
					"sw_special_attrib varchar(255),"+
					"sw_drought_tolerant varchar(10),"+
					"sw_disease_tolerant varchar(10),"+
					"sw_storage_pest_resistant varchar(10),"+
					"sw_consumer_preferences varchar(10),"+
					"county TEXT,"+
					"lowland TEXT,"+
					"lowland_transitional TEXT,"+
					"mid_altitude TEXT,"+
					"highland_transitional TEXT,"+
					"highland TEXT "+ 
				");";

			var populatetablesql = "INSERT OR IGNORE INTO default_sid_seedchoice_seedworks_combined (sw_id, sw_variety, category_id, crop_id, seedtype_id, season_id, license_type_id, comm_potential_id, comm_level_id, sw_releaseyr, sw_breed_institution, sw_maintainer, sw_comm_agent, sw_alt_optimal, sw_alt_min, sw_alt_max, sw_maturity, sw_maturity_age, sw_special_attrib, sw_drought_tolerant, sw_disease_tolerant, sw_storage_pest_resistant, sw_consumer_preferences, county, lowland, lowland_transitional, mid_altitude, highland_transitional, highland) VALUES "+
				"(275, '27-1', 2, 11, 4, 3, 7, 4, 5, 1989, '27', '40', '33', '600-1200', 600, 1200, 'EARLY', '2.5 - 3 MONTHS', 'DUAL PURPOSE', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', '', '', ''),"+
				"(196, '30G19', 4, 3, 2, 3, 8, 2, 3, 2003, '71', '71', '71', '1000-1800', 1000, 1800, 'MEDIUM', '5-6 MONTHS', 'EXCELLENT STANDABILITY,RESISTANT TO GREY LEAF SPOT AND MAIZE STREAK VIRUS', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(423, '5543/156', 3, 17, 5, 3, 7, 4, 3, 1969, '27', '44', '33', '0-500', 0, 500, 'MEDIUM', '12-15 MONTHS', 'HIGH CYANIDE', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', '', '', ''),"+
				"(423, '5543/156', 3, 17, 5, 3, 7, 4, 3, 1969, '27', '44', '33', '0-500', 0, 500, 'MEDIUM', '12-15 MONTHS', 'HIGH CYANIDE', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', '', '', ''),"+
				"(3, 'ARNOVA', 3, 18, 5, 3, 8, 2, 9, 2013, '5', '5', '5', '1800-2600', 1800, 2600, '', '', 'LOW CYANIDE ', '', '', '', '', '', '', '', '', '', ''),"+
				"(385, 'BW-196', 4, 5, 4, 3, 7, 2, 3, 1986, '63', '46', '63', '1400-1800', 1400, 1800, 'LATE', '4-5 MONTHS', 'HIGH TILLERING', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(161, 'C5051', 4, 3, 2, 3, 8, 3, 8, 2000, '59', '59', '11', '1000-1800', 1000, 1800, 'MEDIUM', '4-5 MONTHS', 'MODERATELY TOLERANT TO MAIZE STREAK VIRUS, EASY TO SHELL', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(303, 'CANADIAN WONDER (GLP-24)', 2, 10, 4, 3, 7, 2, 3, 1982, '27,50', '27,50', '14,50', '1200-1800', 1200, 1800, 'MEDIUM', '3 - 3.5 MONTHS', 'MODERATELY RESISTANT TO ANGULAR LEAF SPOT', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(107, 'CCM', 4, 3, 2, 3, 8, 3, 8, 1974, '50', '50', '50', '0-1200', 0, 1200, 'MEDIUM', '4-5 MONTHS', 'HEAT TOLERANT', '', '', '', '', '', '', '', '', '', ''),"+
				"(162, 'CG4141', 4, 3, 2, 3, 8, 3, 8, 2000, '59', '59', '11', '900-1700', 900, 1700, 'MEDIUM', '4-5 MONTHS', 'EARLINESS FAST DRY DOWN', '', '', '', '', '', '', '', '', '', ''),"+
				"(288, 'CHELALANG', 2, 10, 4, 4, 4, 2, 3, 2008, '15', '15', '19,50,56,66', '1800-2200', 1800, 2200, 'MEDIUM', '2.5 - 3.5 MONTHS', 'RESISTANT TO BEAN COMMON MOSAIC VIRUS TOLERANT TO RUST', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(289, 'CIANKU', 2, 10, 4, 4, 4, 2, 3, 2008, '15', '15', '19,50,56,66', '1500-2150', 1500, 2150, 'MEDIUM', '2.5 - 3.5 MONTHS', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(257, 'CKIR04002', 4, 21, 3, 3, 7, 3, 5, 2006, '27', '40', '64', '0-900', 0, 900, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(258, 'CKIR04003', 4, 21, 3, 3, 7, 3, 5, 2006, '27', '40', '64', '0-900', 0, 900, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(7, 'DESIREE', 3, 18, 5, 4, 7, 2, 3, 1972, '27', '48', '33', '1800-2600', 1800, 2600, 'MEDIUM', '4 - 5 MONTHS', 'GOOD STORAGE', '', '', 'YES', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(111, 'DH 12', 4, 3, 2, 3, 8, 1, 2, 2007, '50', '50', '50', '900-1400', 900, 1400, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(163, 'DK 8031', 4, 3, 2, 3, 8, 2, 3, 2003, '59', '59', '11', '900-1700', 900, 1700, 'MEDIUM', '4 - 4.7 MONTHS', 'GREY LEAF SPOT,TOLERANT', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(164, 'DK 8071', 4, 3, 2, 3, 8, 3, 8, 2003, '59', '59', '11', '1500-1700', 1500, 1700, 'MEDIUM', '5 MONTHS', 'FLINT GRAIN', '', '', '', '', '', '', '', '', '', ''),"+
				"(165, 'DKC 80-33', 4, 3, 2, 3, 8, 3, 5, 2004, '59', '59', '11', '900-1700', 900, 1700, 'MEDIUM', '5-6 MONTHS', 'RESISTANT TO GREY LEAF SPOT, GOOD STANDABILITY', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(166, 'DKC 80-53', 4, 3, 2, 3, 8, 2, 3, 2004, '59', '59', '11', '900-1700', 900, 1700, 'MEDIUM', '4-5 MONTHS', 'TOLERANCE TO GLS, MAIZE STREAK VIRUS , GOOD STANDABILITY, WIDE ADAPTABILITY, PROLIFIC ', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', ''),"+
				"(167, 'DKC 80-73', 4, 3, 2, 3, 8, 4, 8, 2004, '59', '59', '11', '1500-1700', 1500, 1700, 'MEDIUM', '5-6 MONTHS', 'TOLERANCE TO GREY LEAF SPOT, MAIZE STREAK VIRUS AND DIPLODIA, GOOD HUSK COVER', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(168, 'DKC90-89', 4, 3, 2, 3, 8, 2, 3, 2012, '59', '59', '11', '900-1800', 900, 1800, 'MEDIUM', '3.5 -4.5 MONTHS', 'HIGH STABLE YIELDS,PROFILIC, GOOD STANDABILITY,GOOD FLINT TYPE QUALITY GRAIN ', '', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(379, 'DOURADO PRECOSE', 4, 4, 4, 3, 7, 2, 5, 2009, '27', '28', '50', '0-1700', 0, 1700, 'MEDIUM', '2.3-5.5 MONTHS', 'BEARDLESS', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(323, 'DPSB 8', 2, 16, 4, 3, 8, 1, 1, 2010, '27', '27', '56', '900-2400', 900, 2400, 'EARLY', '3-4 MONTHS', 'KABULI AND RESISTANT TO FUSARIUM WILT,MEDIUM WHITE GRAIN.', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(8, 'DUTCH ROBIJN', 3, 18, 5, 4, 7, 2, 3, 0, '27', '48', '33', '1600-2600', 1600, 2600, 'MEDIUM', '4-5 MONTHS', 'GOOD STORAGE AND CRISPING QUALITY', '', '', 'YES', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(360, 'E 6518', 4, 6, 3, 3, 7, 3, 2, 2000, '27', '43', '56', '1750-2300', 1750, 2300, 'LATE', '8 MONTHS', 'HIGH QUALITY', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(361, 'E1291', 4, 6, 3, 3, 7, 3, 5, 2000, '27', '43', '50,56', '1750-2300', 1750, 2300, 'LATE', '7 MONTHS', 'DUAL PURPOSE GOOD BEVERAGE QUALITY ', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(325, 'EAI 3600', 2, 16, 4, 3, 7, 3, 9, 2009, '27', '47', '64', '800-1700', 800, 1700, 'EARLY', '3-4 MONTHS', 'HIGH GRAIN IRON AND ZINC CONCENTRATION,MEDIUM SIZED,YELLOW GRAIN', '', '', '', '', '', '', '', '', '', ''),"+
				"(63, 'EMB 0702', 4, 3, 2, 3, 7, 1, 1, 2011, '27', '38', '64', '1200-1800', 1200, 1800, 'MEDIUM', '4-5 MONTHS', 'POST HARVEST INSECT PESTS TOLERANT, LARGER GRAIN BORER (LGB) AND MAIZE WEEVIL TOLERANT', '', '', 'YES', '', '', '', '', '', '', ''),"+
				"(64, 'EMB 0703', 4, 3, 2, 3, 7, 1, 1, 2011, '27', '38', '64', '1200-1800', 1200, 1800, 'MEDIUM', '5-6 MONTHS', 'STEM BORER RESISTANT', '', '', 'TES', '', '', '', '', '', '', ''),"+
				"(65, 'EMB 204', 4, 3, 2, 3, 7, 1, 1, 2004, '27', '38', '64', '1000-1500', 1000, 1500, 'MEDIUM', '5-6 MONTHS', 'QUALITY PROTEIN MAIZE, GOOD HUSK COVER, RESISTANT TO GREY LEAF SPOT, EAR ROT, RUST, BLIGHT', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(409, 'FARASI', 4, 7, 4, 3, 8, 1, 1, 2007, '50', '50', '50', '1800-2400', 1800, 2400, 'EARLY', '3-4 MONTHS', 'SUGAR GRAIN TYPE (CREAM WHITE BACKGROUND WITH RED FLECKS), LARGE SEEDED, RESISTANT TO ANTHRACNOSE', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(333, 'FLORA', 2, 9, 4, 3, 7, 4, 5, 1996, '27', '39', '33', '1500-2200', 1500, 2200, 'LATE', '4 -5 MONTHS', 'LIGHT PINK PODS', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(169, 'FS650', 4, 3, 2, 4, 8, 1, 1, 2001, '66', '66', '66', '1500-2200', 1500, 2200, 'LATE', '6-7 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS, GOOD YIELDER, FLINT KERNELS', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(326, 'GAZELLE', 2, 16, 4, 3, 7, 3, 9, 2009, '27', '47', '64', '1200-2400', 1200, 2400, 'EARLY', '3-4 MONTHS', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(302, 'GLP-92 PINTO BEAN', 2, 10, 4, 3, 7, 4, 5, 1982, '27', '27', '50', '100-1500', 100, 1500, 'MEDIUM', '3 - 3.5 MONTHS', 'MODERATELY RESISTANT TO ANGULAR LEAF SPOT', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(424, 'GUZO', 3, 17, 5, 3, 7, 1, 1, 1969, '27', '44', '33', '0-700', 0, 700, 'MEDIUM', '12-15 MONTHS', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(118, 'H2801', 4, 3, 2, 4, 8, 1, 9, 2011, '50', '50', '50', '1500-2300', 1500, 2300, 'LATE', '6-8 MONTHS', 'A DOUBLE CROSS HYBRID, HIGH GRAIN YIELD OF 9.92% ABOVE THE MEAN OF CHECKS (H614D, H6213, H628, H626 AND H627), RESISTANT TO EAR-ROTS,TOLERANT TO LEAF BLIGHT, RUST AND GREY LEAF SPOT', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(56, 'H511', 4, 3, 2, 3, 3, 3, 8, 1967, '50', '27', '66', '1000-1500', 1000, 1500, 'MEDIUM', '4-5 MONTHS', 'MEDIUM MATURING', '', '', '', '', '', '', '', '', '', ''),"+
				"(57, 'H512', 4, 3, 2, 3, 3, 3, 8, 1970, '50', '27', '50', '1200-1600', 1200, 1600, 'MEDIUM', '4-5 MONTHS', 'LARGE KERNELS', '', '', '', '', '', '', '', '', '', ''),"+
				"(120, 'H513', 4, 3, 2, 3, 8, 2, 3, 1995, '50', '50', '50', '1200-1600', 1200, 1600, 'MEDIUM', '4-5 MONTHS', 'GOOD STANDABILITY', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(121, 'H515', 4, 3, 2, 3, 8, 2, 3, 2000, '50', '50', '50', '1200-1500', 1200, 1500, 'MEDIUM', '4-5 MONTHS', 'LODGE RESISTANT', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(122, 'H516', 4, 3, 2, 3, 8, 2, 3, 2001, '50', '50', '50', '1200-1500', 1200, 1500, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO BLIGHT, RUST AND LODGING', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(123, 'H518', 4, 3, 2, 3, 8, 1, 9, 2002, '50', '50', '50', '1400-1700', 1400, 1700, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO GREY LEAF SPOT, RUST, BLIGHT', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(124, 'H519', 4, 3, 2, 3, 8, 1, 9, 2003, '50', '50', '50', '1200-1700', 1200, 1700, 'MEDIUM', '4-5 MONTHS', 'PROLIFIC, RESISTANT TO EAR ROTS, RUST, GREY LEAF SPOT, NORTHERN LEAF BLIGHT, STEM AND ROOT LODGING COMPARED TO H513, SEMIDENT', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(125, 'H520', 4, 3, 2, 3, 8, 2, 3, 2003, '50', '50', '50', '1400-1700', 1400, 1700, 'MEDIUM', '4-5 MONTHS', 'BETTER RESISTANCE TO NORTHERN BLIGHT, RUST, EAR ROT, STEM AND ROOT LODGING SEMI FLINT. GOOD HUSK COVER ', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(126, 'H521', 4, 3, 2, 3, 8, 1, 9, 2003, '50', '50', '50', '1000-1600', 1000, 1600, 'MEDIUM', '4-5.5 MONTHS', 'MORE TOLERANT TO GREY LEAFSPOT, LEAFBLIGHT, ROOT AND STALK LODGING THAN H513, SEMI DENT', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(127, 'H522', 4, 3, 2, 3, 8, 1, 9, 2003, '50', '50', '50', '1200-1600', 1200, 1600, 'MEDIUM', '4-5 MONTHS', 'TOLERANT TO GREY LEAF SPOT. RESISTANT TO EAR ROT, ROOTAND STALK LODGING, SEMIDENT', '', '', '', '', '', '', '', '', '', ''),"+
				"(128, 'H523', 4, 3, 2, 3, 8, 1, 9, 2003, '50', '50', '50', '1200-1600', 1200, 1600, 'MEDIUM', '4-5months', 'BETTER YIELDING THAN H623, TOLERANT TO GREY LEAFSPOT, RESISTANT TO ROOT AND STALK LODGING, SEMI DENT', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(156, 'H612D', 4, 3, 2, 4, 3, 1, 8, 1986, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-8 MONTHS', 'SEMI FLINT', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(157, 'H613D', 4, 3, 2, 4, 3, 1, 8, 1986, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-8 MONTHS', 'SEMI FLINT', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(60, 'H614D', 4, 3, 2, 4, 3, 2, 3, 1986, '50', '27,50', '50', '1500-2100', 1500, 2100, 'LATE', '6-9 MONTHS', 'STABLE OVER LOCATIONS AND SEASONS SEMIFLINT', '', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(129, 'H6210', 4, 3, 2, 4, 8, 2, 3, 2001, '50', '50', '50', '1600-2200', 1600, 2200, 'LATE', '', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(130, 'H6211', 4, 3, 2, 4, 8, 1, 5, 2001, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-8months', 'EARLY MATURING, SHORT SEMI FLINT', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(131, 'H6212', 4, 3, 2, 4, 8, 1, 5, 2001, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-8 MONTHS', 'SHORT, SEMI FLINT RESISTANT TO EAR ROT ', '', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(133, 'H6218', 4, 3, 2, 4, 8, 1, 5, 2008, '50', '50', '50', '1600-2200', 1600, 2200, '', '', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(58, 'H622', 4, 3, 2, 3, 3, 3, 8, 1965, '50', '27', '50', '1200-1700', 1200, 1700, 'LATE', '6-7 MONTHS', 'LARGE KERNELS DENT', '', '', '', '', '', '', '', '', '', ''),"+
				"(134, 'H623', 4, 3, 2, 3, 3, 3, 8, 1999, '50', '50', '50', '1200-1700', 1200, 1700, 'LATE', '6-7 MONTHS', 'PROLIFIC, LARGE DENT KERNELS', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(135, 'H624', 4, 3, 2, 4, 3, 2, 3, 2004, '50', '50', '50', '1600-2200', 1600, 2200, '', '6-8 MONTHS', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(61, 'H625', 4, 3, 2, 4, 3, 2, 3, 1981, '27,50', '27,50', '50', '1500-2100', 1500, 2100, 'LATE', '6-8 MONTHS', 'PROLIFIC, GOOD HUSK COVER', '', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(62, 'H626', 4, 3, 2, 4, 3, 2, 3, 1989, '27,50', '27,50', '50', '1500-2100', 1500, 2100, '', '', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(158, 'H627', 4, 3, 2, 4, 8, 1, 9, 1995, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-8 MONTHS', 'SEMI-FLINT', '', '', '', '', '', '', '', '', '', ''),"+
				"(136, 'H628', 4, 3, 2, 4, 8, 2, 3, 1999, '50', '50', '50', '1700-2300', 1500, 2300, 'LATE', '6-8 MONTHS', 'FLINT', '', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(137, 'H629', 4, 3, 2, 4, 8, 2, 3, 2000, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-8 MONTHS', 'SEMI DENT', '', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(59, 'H632', 4, 3, 2, 3, 3, 3, 8, 1964, '27', '27', '50', '1200-1700', 1200, 1700, 'LATE', '6-7 MONTHS', 'LARGE KERNELS DENT', '', '', '', '', '', '', '', '', '', ''),"+
				"(430, 'HARAKA', 3, 19, 5, 3, 4, 4, 5, 2011, '27', '35', '33', '1300-1600', 1300, 1600, 'MEDIUM', '4-5 MONTHS', 'ORANGE-FLESHED,HIGH DRY MATTER', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(327, 'HILL', 2, 16, 4, 3, 7, 3, 9, 2009, '27', '47', '64', '1200-2000', 1200, 2400, 'EARLY', '3-4 MONTHS', 'WIDE ADAPTATION, RESISTANT TO BEAN COMMON MOSAIC VIRUS, TOLERANT TO RUST', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(369, 'HOKHALE-1', 4, 1, 3, 3, 7, 4, 5, 2013, '27', '39', '33', '0-2000', 0, 2000, '', '', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(351, 'IKINYALUKA', 4, 6, 3, 3, 7, 3, 5, 1996, '27', '30', '33,56', '1750-2300', 1750, 2300, 'LATE', '7 MONTHS', 'HIGH QUALITY FORAGE', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(345, 'IS 8193', 4, 6, 3, 3, 7, 3, 5, 1996, '27', '27', '33', '500-1600', 500, 1600, 'MEDIUM', '4 MONTHS', 'RESISTANT TO BIRD DAMAGE', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(432, 'K117', 3, 19, 5, 3, 4, 4, 5, 2011, '27', '35', '33', '1200-1600', 1200, 1600, 'LATE', '5-6 MONTHS', 'ORANGE-FLESHED,HIGH DRY MATTER', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(309, 'KABETE SUPER', 2, 10, 4, 3, 3, 1, 2, 2008, '75', '75', '16', '1300-2000', 1300, 2000, 'MEDIUM', '3 - 3.5 MONTHS', 'LARGE GRAINS, RESISTANT TO FLOURY LEAF SPOT, HALO BLIGHT, ANGULAR LEAF SPOT, ANTHRACNOSE,BEAN COMMON MOSAIC VIRUS & COMMON BACTERIAL BLIGHT ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(435, 'KABODE', 3, 19, 5, 3, 4, 4, 2, 2013, '27', '39', '33', '1200', 1200, 1400, 'MEDIUM', '4-5 MONTHS', 'HIGH CAROTENE CONTENT,TOLERANT TO SWEET-POTATO VIRUSES', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(371, 'KACIMI42', 4, 1, 3, 3, 7, 4, 9, 2013, '27', '39', '64', '0-2000', 0, 2000, 'MEDIUM', '4 MONTHS', 'LARGE GRAINS, MODERATELY RESISTANT TO HALO BLIGHT, ANGULAR LEAF SPOT, ANTHRACNOSE, BEAN COMMON MOSAIC VIRUS & COMMON BACTERIAL BLIGHT', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(352, 'KARI MTAMA-1', 4, 6, 3, 3, 4, 4, 5, 2000, '27', '36', '13', '0-1800', 0, 1800, 'MEDIUM', '3-3.5 MONTHS', 'TOLERANT TO STEM BORER', '', '', 'YES', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(320, 'KAT X 16', 2, 10, 4, 3, 7, 1, 9, 1994, '27', '40', '33', '900-1600', 900, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(339, 'KAT/DL-1', 2, 12, 4, 3, 7, 4, 5, 1978, '27', '40', '33', '0-2000', 10, 2000, 'MEDIUM', '3 - 3.5 MONTHS', 'DETERMINATE, BLACK SEEDS ', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(340, 'KAT/DL-2', 2, 12, 4, 3, 7, 4, 5, 1987, '27', '40', '33', '0-2000', 10, 2000, 'MEDIUM', '3.5 - 4 MONTHS', 'DETERMINATE,CREAM SEEDS ', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(341, 'KAT/DL-3', 2, 12, 4, 3, 7, 4, 5, 1995, '27', '40', '33', '0-200', 0, 2000, 'MEDIUM', '3.5 - 4 MONTHS', 'INDETERMINATE, DUAL PURPOSE ', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(356, 'KAT/PRO I', 4, 6, 3, 3, 3, 1, 5, 1998, '27,50', '27,50', '50', '1000-1700', 1000, 1700, '', '', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(284, 'KAT81/3/3', 2, 15, 4, 3, 7, 3, 8, 1981, '27', '40', '64', '900-1800', 900, 1800, 'MEDIUM', '5.5 - 6months', 'DETERMINATE, BLACK SEEDS', '', '', '', '', '', '', '', '', '', ''),"+
				"(285, 'KATUMANI 60/8', 2, 15, 4, 3, 4, 2, 3, 1998, '27', '40', '13,19', '0-1800', 0, 1800, 'MEDIUM', '4 - 5 MONTHS', 'SHORT DURATION,RATOONS WELL ', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(22, 'KDH1', 4, 3, 2, 3, 7, 1, 9, 2003, '27', '27', '64', '900-1200', 900, 1200, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(23, 'KDH2', 4, 3, 2, 3, 7, 1, 9, 2003, '27', '27', '64', '900-1200', 900, 1200, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(26, 'KDH414-01SBR', 4, 3, 2, 3, 7, 1, 9, 2008, '27', '27', '64', '900-1200', 900, 1200, 'EARLY', '3-4 MONTHS', 'RESISTANT TO STEM BORERS, TOLERANT TO DROUGHT & LOW NITROGEN,', '', '', '', '', '', '', '', '', '', ''),"+
				"(31, 'KEMBU 214', 4, 3, 2, 3, 7, 1, 1, 2008, '27', '27', '64', '1200-1600', 1200, 1600, 'MEDIUM', '4-5 MONTHS', 'TOLERANT TO STEM BORERS', '', '', 'YES', '', '', '', '', '', '', ''),"+
				"(328, 'KENSOY 009', 2, 16, 4, 3, 7, 3, 9, 2013, '27', '47', '64', '', 0, 0, 'EARLY', '3-4 MONTHS', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(448, 'KENSPOT-2', 3, 19, 5, 3, 7, 4, 2, 2013, '27', '47', '18,33', '1300-2000', 1300, 2000, 'LATE', '6-7 MONTHS', 'MODERATE DRY MATTER,WHITE-FLESHED,HIGH ACCEPTABILITY RATING.', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(449, 'KENSPOT-3', 3, 19, 5, 3, 7, 2, 2, 2013, '27', '47', '18,33', '1300-2000', 1300, 2000, 'LATE', '6-7 MONTHS', 'HIGH DRY MATTER CONTENT,ORANGE-FLESHED (AVG CAROTENE CONTENT,AVERAGE ACCEPTABILITY', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(450, 'KENSPOT-4', 3, 19, 5, 3, 7, 2, 2, 2013, '27', '47', '18,33', '1300-2000', 1300, 2000, 'LATE', '6-7 MONTHS', 'HIGH DRY MATTER CONTENT, ORANGE-FLESHED (HIGH CAROTENE CONTENT),AVERAGE ACCEPTABILITY. ', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(451, 'KENSPOT-5', 3, 19, 5, 3, 7, 2, 2, 2013, '27', '47', '18,33', '1300-2000', 1300, 2000, 'LATE', '6-7 MONTHS', 'MODERATE DRY MATTER, ORANGE-FLESHED,HIGH CAROTENE CONTENT,MODERATELY RESISTANT TO SWEET-POTATO VIRAL DISEASES,MODERATE ACCEPTABILITY. ', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(389, 'KENYA CHIRIKU', 4, 7, 4, 3, 7, 1, 1, 1989, '27', '27', '50', '1800-2400', 1800, 2400, 'EARLY', '3-4 MONTHS', 'GOOD STORAGE', '', '', 'YES', 'YES', '', '', '', '', '', ''),"+
				"(398, 'KENYA HAWK 12', 4, 7, 4, 3, 7, 2, 2, 2012, '27', '47', '6,33,50', '2100-2400', 2100, 2400, 'MEDIUM', '4-5 MONTHS', 'RED HARD GRAIN , RESISTANCE TO BOTH LODGING AND SPROUT, HIGH TEST WEIGHT AND BAKING QUALITIES, RESISTANT TO BOTH STEM RUST AND YELLOW RUST ', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(393, 'KENYA KONGONI', 4, 7, 4, 3, 3, 3, 5, 1975, '27,50', '27,50', '50', '1800-2700', 1800, 2700, 'MEDIUM', '4-5 MONTHS', 'ACID SOIL TOLERANT', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(316, 'KENYA WONDER', 2, 10, 4, 4, 3, 2, 2, 2008, '75', '75', '16', '1030-2000', 1030, 2000, 'MEDIUM', '3 - 3.5 MONTHS', 'LARGE GRAINS, MODERATELY RESISTANT TO HALO BLIGHT, ANGULAR LEAF SPOT, ANTHRACNOSE, BEAN COMMON MOSAIC VIRUS & COMMON BACTERIAL BLIGHT ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(13, 'KERR’S PINK', 3, 18, 5, 4, 7, 3, 8, 1960, '27', '48', '33', '1400-2700', 1400, 2700, 'EXTRA EARLY', '2-3 MONTHS', 'BEARDLESS', '', '', '', '', '', '', '', '', '', ''),"+
				"(68, 'KH 631Q', 4, 3, 2, 3, 4, 4, 5, 2004, '27', '39', '19', '1000-1500', 1000, 1500, 'MEDIUM', '4.5 MONTHS', 'HIGH QUALITY PROTEIN', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(98, 'KH125- 04 PhPR', 4, 3, 2, 3, 7, 2, 9, 2012, '27', '44', '33', '0-1000', 0, 1000, 'MEDIUM', '4-5 MONTHS', 'POSTHARVEST PEST RESISTANT (LARGER GRAIN BORER AND MAIZE WEEVIL)', '', '', 'YES', '', '', '', '', '', '', ''),"+
				"(99, 'KH125- 05 PhPR', 4, 3, 2, 3, 7, 2, 9, 2012, '27', '44', '33', '0-1000', 0, 1000, 'MEDIUM', '4-5 MONTHS', 'POSTHARVEST PEST RESISTANT (LARGER GRAIN BORER AND MAIZE WEEVIL)', '', '', 'YES', '', '', '', '', '', '', ''),"+
				"(100, 'KH125- 06 SBR', 4, 3, 2, 3, 7, 2, 9, 2012, '27', '44', '33', '0-1000', 0, 1000, 'MEDIUM', '4-5 MONTHS', 'STEM BORER RESISTANT', '', '', 'YES', '', '', '', '', '', '', ''),"+
				"(76, 'KH125-02 MDR', 4, 3, 2, 3, 4, 1, 9, 2010, '27', '40', '21', '900-1400', 900, 1400, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(78, 'KH414-01SBR', 4, 3, 2, 3, 3, 4, 2, 2007, '27', '40', '59', '900-1400', 900, 1400, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(79, 'KH414-02SBR', 4, 3, 2, 3, 7, 4, 9, 2007, '27', '40', '64', '900-1400', 900, 1400, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(80, 'KH414-03SBR', 4, 3, 2, 3, 7, 4, 9, 2007, '27', '40', '64', '900-1400', 900, 1400, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(82, 'KH414-05 DRT', 4, 3, 2, 3, 7, 4, 9, 2007, '27', '40', '64', '800-1600', 800, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(83, 'KH414-06 DRT', 4, 3, 2, 3, 7, 4, 9, 2012, '27', '40', '64', '800-1600', 800, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(84, 'KH414-07 DRT', 4, 3, 2, 3, 7, 4, 9, 2012, '27', '40', '64', '800-1600', 800, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(85, 'KH414-08 DRT', 4, 3, 2, 3, 7, 4, 9, 2012, '27', '40', '64', '800-1600', 800, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(86, 'KH414-09 DRT', 4, 3, 2, 3, 7, 4, 9, 2012, '27', '40', '64', '800-1600', 800, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(87, 'KH414-10 DRT', 4, 3, 2, 3, 7, 4, 9, 2012, '27', '40', '64', '800-1600', 800, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(48, 'KH500-21A', 4, 3, 2, 3, 4, 2, 3, 2004, '27', '32', '10,13,19,69', '1200-1600', 1200, 1600, 'MEDIUM', '5-6 MONTHS', 'GOOD STANDABILITY, HUSK COVER,RESISTANT TO MAIZE STREAK VIRUS,HEAD SMUT. ', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(32, 'KH500-22A', 4, 3, 2, 4, 3, 2, 3, 2008, '27', '27', '67', '1000-2000', 1000, 2000, 'MEDIUM', '4-5 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(49, 'KH500-31A', 4, 3, 2, 3, 4, 2, 3, 2004, '27', '32', '19,56,66,69,72', '1400-1800', 1400, 1800, 'MEDIUM', '4-5 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS, RUST, STAYS GREEN', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(50, 'KH500-32A', 4, 3, 2, 3, 4, 2, 3, 2004, '27', '32', '10,19,56,69', '1300-1800', 1300, 1800, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO RUST, MAIZE STREAK VIRUS,BLIGHT ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(51, 'KH500-33A', 4, 3, 2, 3, 4, 2, 3, 2004, '27', '32', '14,19,69', '1400-1800', 1400, 1800, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO RUST, MAIZE STREAK VIRUS,BLIGHT ', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(52, 'KH500-34A', 4, 3, 2, 3, 3, 2, 3, 2004, '27', '32', '56', '1300-1800', 1300, 1800, 'MEDIUM', '5-6 MONTHS', 'RESISTANT TO RUST, MAIZE STREAK VIRUS, BLIGHT ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(53, 'KH500-35A', 4, 3, 2, 3, 7, 4, 2, 2003, '27', '32', '64', '1200-1600', 1200, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(54, 'KH500-36A', 4, 3, 2, 3, 7, 4, 2, 2003, '27', '32', '64', '1200-1800', 1200, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(66, 'KH500-36E', 4, 3, 2, 3, 4, 2, 2, 2007, '27', '38', '8', '1200-1800', 1200, 1800, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO MAIZE STREAK VIRUS, RUST & BLIGHT, FLINT', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(55, 'KH500-38A', 4, 3, 2, 3, 7, 4, 2, 2003, '27', '32', '64', '1200-1800', 1200, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(253, 'KH500-39A', 4, 3, 2, 3, 4, 4, 2, 2008, '27', '32', '6', '1200-1800', 1200, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(67, 'KH500-39E', 4, 3, 2, 3, 4, 2, 2, 2007, '27', '38', '8', '1200-1800', 1200, 1800, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO GREY LEAF SPOT AND BLIGHT ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(33, 'KH500-40A', 4, 3, 2, 3, 7, 2, 2, 2008, '27', '27', '72', '1200-1800', 1200, 1800, 'MEDIUM', '5-6 MONTHS', 'MID-LATE MATURITY,RESISTANT TO MAIZE STREAK VIRUS, GREY LEAF SPOT & BLIGHT,LARGE SIZED COBS,LARGE-SIZED, WHITE GRAINS.', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(101, 'KH500-41A', 4, 3, 2, 3, 7, 4, 2, 2003, '27', '45', '64', '1400-1800', 1400, 1800, 'MEDIUM', '4-5 MONTHS', 'MEDIUM MATURITY,RESISTANT TO MSV, GREY LEAF SPOT, BLIGHT, MEDIUM SIZED COBS,INTERMEDIATE-SIZED, WHITE GRAINS, DUAL PURPOSE (FOR FOOD AND FEED).', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(34, 'KH500-43A', 4, 3, 2, 3, 3, 2, 3, 2008, '27', '27', '14', '1200-2100', 1200, 2100, 'MEDIUM', '4-5 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS, DOUBLE COBBER,HIGH FOLIAGE (DUAL PURPOSE) ', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(35, 'KH500-44A', 4, 3, 2, 4, 3, 2, 3, 2008, '27', '27', '77', '1500-2100', 1500, 2100, 'MEDIUM', '4-5 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(36, 'KH500-45A', 4, 3, 2, 4, 3, 2, 3, 2006, '27', '27', '77', '1500-2100', 1500, 2100, 'MEDIUM', '4-5 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(37, 'KH500-46A', 4, 3, 2, 4, 3, 2, 3, 2010, '27', '27', '67', '1000-1500', 1000, 1500, '', '', 'TOLERANT TO MAIZE STREAK VIRUS', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(102, 'KH500-48A', 4, 3, 2, 3, 7, 2, 2, 2010, '27', '45', '33', '1400-1800', 1400, 1800, 'MEDIUM', '4-5months', 'RESISTANT TO MAIZE STREAK VIRUS, GREY LEAF SPOT AND TURCICUM BLIGHT, FLINT GRAINS, DUAL PURPOSE (55% DM ABOVE COMMERCIAL HYBRIDS),LARGE COBS GROWN IN MOIST MEDIUM ALTITUDE AREAS', '', '', '', '', '', '', '', '', '', ''),"+
				"(103, 'KH500-49A', 4, 3, 2, 3, 3, 2, 2, 2010, '27', '45', '56', '1400-1800', 1400, 1800, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO MSV, GREY LEAF SPOT AND TURCICUM BLIGHT DUAL PURPOSE (49% DM ABOVE COMMERCIAL HYBRIDS) INTERMEDIATE –DENT GRAINS,MEDIUM SIZE COBS,GROWN IN MEDIUM ALTITUDE TRANSITIONAL AREAS', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(104, 'KH500-50A', 4, 3, 2, 3, 3, 2, 9, 2011, '27', '45', '20', '1400-1800', 1400, 1800, 'MEDIUM', '4-5 MONTHS', 'MEDIUM MATURITY,RESISTANT TO MSV, GREY LEAF SPOT, BLIGHT,MEDIUM-SIZED COBS,INTERMEDIATE-SIZED, FLINTY, WHITE GRAINS.', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(105, 'KH500-51A', 4, 3, 2, 3, 3, 6, 2, 2012, '27', '45', '20', '1400-1800', 1400, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(106, 'KH500-52A', 4, 3, 2, 3, 7, 2, 2, 2012, '27', '45', '64', '1400-1800', 1400, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(38, 'KH600-11D', 4, 3, 2, 4, 3, 2, 5, 2000, '27', '27', '19', '1800-2500', 1800, 2500, 'MEDIUM', '4-5 MONTHS', 'GOOD STANDABILITY', '', '', '', '', '', '', '', '', '', ''),"+
				"(89, 'KH600-14E', 4, 3, 2, 4, 3, 2, 5, 2004, '27', '42', '19', '1800-2500', 1800, 2500, 'LATE', '6-8 MONTHS', 'GOOD STANDABILITY, WIDE ADAPTATION', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(90, 'KH600-15A', 4, 3, 2, 4, 3, 2, 5, 2001, '27', '42', '14', '1800-2500', 1800, 2500, 'LATE', '6-8 MONTHS', 'GOOD STANDABILITY', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(91, 'KH600-16A', 4, 3, 2, 4, 4, 2, 5, 2001, '27', '42', '14,19', '1800-2500', 1800, 2500, 'LATE', '6-8 MONTHS', ' GOOD STANDABILITY', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(92, 'KH600-17A', 4, 3, 2, 4, 3, 2, 5, 2002, '27', '42', '19', '1800-2500', 1800, 2500, 'MEDIUM', '5-6 MONTHS', 'GOOD STANDABILITY', '', '', '', '', '', '', '', '', '', ''),"+
				"(93, 'KH600-18A', 4, 3, 2, 4, 3, 2, 5, 2004, '27', '42', '66', '1800-2500', 1800, 2500, 'MEDIUM', '5-6 MONTHS', 'GOOD DISEASE TOLERANCE', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(94, 'KH600-19A', 4, 3, 2, 4, 3, 2, 5, 2005, '27', '42', '7', '1800-2500', 1800, 2500, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(45, 'KH600-20A', 4, 3, 2, 4, 3, 2, 5, 2005, '27', '31', '7', '1800-2300', 1800, 2500, 'MEDIUM', '5-6 MONTHS', 'GOOD STANDABILITY, RESISTANCE TO BLIGHT ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(46, 'KH600-21A', 4, 3, 2, 4, 3, 2, 5, 2006, '27', '31', '7', '1800-2300', 1800, 2500, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(47, 'KH600-22A', 4, 3, 2, 4, 3, 2, 5, 2006, '27', '31', '11', '1800-2300', 1800, 2500, 'LATE', '6-8 MONTHS', 'GOOD HUSK COVER, RESISTANT TO LODGING, EAR ROTS, BLIGHT, GREY LEAF STREAK', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(39, 'KH600-23A', 4, 3, 2, 4, 3, 2, 5, 2008, '27', '27', '6', '1800-2500', 1800, 2500, 'MEDIUM', '5-6 MONTHS', 'RESISTANT TO GREY LEAF SPOT, RUST, BLIGHT, LESS LODGING ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(40, 'KH600-24A', 4, 3, 2, 4, 3, 1, 5, 2008, '27', '27', '62', '1800-2500', 1800, 2500, 'MEDIUM', '5-6 MONTHS', 'RESISTANT TO GREY LEAF SPOT, RUST & BLIGHT, LESS LODGING', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(95, 'KH600-25A', 4, 3, 2, 4, 7, 1, 9, 2012, '27', '42', '64', '1800-2500', 1800, 2500, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(96, 'KH600-26A', 4, 3, 2, 4, 7, 1, 9, 2013, '27', '42', '64', '1800-2500', 1800, 2500, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(97, 'KH600-27A', 4, 3, 2, 4, 7, 1, 9, 2013, '27', '42', '64', '1800-2500', 1800, 2500, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(43, 'KH633A', 4, 3, 2, 3, 7, 1, 9, 2009, '27', '30', '64', '1400-1800', 1400, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(364, 'KIBUYU', 4, 6, 1, 3, 8, 3, 9, 2011, '56', '56', '56', '1500-1800', 1500, 1800, 'MEDIUM', '4-5 MONTHS', 'WIDE ADAPTABILITY,DUAL PURPOSE,RED SEED, RESISTANT TO BIRD DAMANGE', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(297, 'KK 22 (RWR719)', 2, 10, 4, 3, 7, 4, 9, 1996, '27', '35', '33', '1500-1800', 1500, 1800, 'EARLY', '2.5 - 3 MONTHS', 'BLAST TOLERANT, LONG GRAINS', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(453, 'KK8', 2, 10, 4, 3, 4, 2, 2, 2014, '27', '36', '9,56,10,33', '1200-1800', 1200, 1800, 'EARLY', '3-4 MONTHS', 'WIDE ADAPTATION, RESISTANT TO BEAN COMMON MOSAIC VIRUS,TOLERANT TO RUST.', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(69, 'KM1101', 4, 3, 2, 3, 7, 1, 9, 2012, '27', '39', '64', '1600-1800', 1600, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(70, 'KM403', 4, 3, 2, 3, 7, 1, 9, 2010, '27', '39', '64', '1600-1800', 1600, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(71, 'KM404', 4, 3, 2, 3, 7, 1, 9, 2010, '27', '39', '64', '1600-1800', 1600, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(72, 'KM406', 4, 3, 2, 3, 7, 1, 9, 2010, '27', '39', '64', '1600-1800', 1600, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(417, 'KME 1', 3, 17, 5, 3, 7, 4, 3, 2000, '27', '40', '33', '250-1500', 250, 1500, 'MEDIUM', '12-14 MONTHS', 'LOW CYANIDE', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(418, 'KME 61', 3, 17, 5, 3, 7, 1, 3, 2000, '27', '40', '33', '250-1500', 250, 1500, 'MEDIUM', '14 MONTHS', 'LOW CYANIDE ', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(386, 'KOMBOKO', 4, 5, 4, 3, 7, 3, 5, 2013, '27', '46', '64', '1400-1800', 1400, 1800, 'MEDIUM', '3-3.5 MONTHS', 'AROMATIC, LONG SLENDER TRANSLUSCENT GRAING, GOOD COOKING QUALITIES', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(410, 'KS MWAMBA', 4, 7, 4, 3, 8, 2, 3, 2001, '50', '50', '50', '1500-2400', 1500, 2400, 'MEDIUM', '4-4.5 MONTHS', 'WIDE ADAPDATION, HIGH YIELDING', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(138, 'KS-6505', 4, 3, 2, 3, 8, 1, 9, 2010, '50', '50', '50', '1350-1700', 1350, 1700, 'LATE', '6-7 MONTHS', 'RESISTANT TO GREY LEAF SPOT,EXCELLENT HUSK COVER, FLINT KERNELS', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(139, 'KS-6506', 4, 3, 2, 3, 8, 1, 9, 2010, '50', '50', '50', '1350-1700', 1350, 1700, 'MEDIUM', '5-6 MONTHS months', 'RESISTANT TO GREY LEAF SPOT SHORT AND RESISTANT TO LODGING', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(412, 'KS-CHUI', 4, 7, 4, 3, 8, 1, 1, 2008, '50', '50', '50', '1800-2400', 1800, 2400, 'EARLY', '4 MONTHS', 'HIGH QUALITY FORAGE', '', '', '', '', '', '', '', '', '', ''),"+
				"(141, 'KS-DH13', 4, 3, 2, 3, 8, 1, 9, 2008, '50', '50', '50', '800-1800', 800, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(143, 'KS-DH15', 4, 3, 2, 3, 8, 1, 9, 2013, '50', '50', '50', '1000-1500', 1000, 1500, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(144, 'KS-H524', 4, 3, 2, 3, 8, 1, 8, 2008, '50', '50', '50', '1200-1500', 1200, 1500, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO RUST, GREY LEAF SPOT & EAR ROT', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(147, 'KS-H6216', 4, 3, 2, 4, 8, 1, 9, 2008, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-7 MONTHS', 'LODGING RESISTANT, FLINT KERNELS', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(148, 'KS-H6217', 4, 3, 2, 4, 8, 1, 9, 2008, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-7 MONTHS', 'LODGING RESISTANT, FLINT KERNELS', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(150, 'KS-H6502', 4, 3, 2, 3, 8, 1, 9, 2008, '50', '50', '50', '1300-1800', 1300, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(151, 'KS-H6503', 4, 3, 2, 3, 8, 1, 9, 2008, '50', '50', '50', '1300-1800', 1300, 1800, 'MEDIUM', '5-6 MONTHS', 'RESISTANT TO RUST, LODGING RESISTANT,TOLERANT TO GREY LEAF SPOT & BLIGHT,', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(413, 'KS-KANGA', 4, 7, 4, 3, 8, 1, 1, 2013, '50', '50', '50', '1800-2401', 1800, 2400, '', '', 'RESISTANT TO BIRD DAMAGE', '', '', '', '', '', '', '', '', '', ''),"+
				"(363, 'KS-SORG2', 4, 6, 2, 3, 8, 3, 9, 2013, '50', '50', '50', '0-1800', 0, 1800, 'EARLY', '2.5-3 MONTHS', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(145, 'KSH527', 4, 3, 2, 3, 8, 1, 9, 2010, '50', '50', '50', '1200-1500', 1200, 1500, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO GREY LEAF SPOT,RESISTANT TO BLIGHT,RESISTANT TO RUST', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(146, 'KSH6214', 4, 3, 2, 4, 8, 1, 9, 2004, '50', '50', '50', '1600-2100', 1600, 2100, 'LATE', '6-7 MONTHS', 'TOLERANCE TO GREY LEAF SPOT,LEAF BLIGHT,LODGING RESISTANT,EARLY MATURING', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(149, 'KSH6219', 4, 3, 2, 4, 8, 1, 9, 2010, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-7 MONTHS', 'RESISTANT TO GREY LEAF SPOT, RESISTANT TO BOTH ROOT AND STEM LODGE, BIG SEMI – FLINT KERNELS', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(279, 'KVU – 419 (KUNDE 419)', 2, 11, 4, 3, 7, 4, 5, 2000, '27', '40', '33', '0-1200', 0, 1200, 'EXTRA EARLY', '2 – 2.5 MONTHS', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(273, 'LDT 065', 2, 8, 4, 3, 8, 1, 1, 2010, '56', '24,56', '56', '500 - 2000', 500, 2000, 'MEDIUM', '3-4 MONTHS', ' RESISTANT TO FUSARIUM WILT,MEDIUM WHITE GRAIN. ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(366, 'LDT090', 4, 6, 1, 3, 8, 3, 9, 2011, '56', '56', '56', '1500-1800', 1500, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(433, 'LIMARA', 3, 19, 5, 3, 4, 4, 5, 0, '27', '35', '33', '1200-1700', 1200, 1700, 'MEDIUM', '4-5 MONTHS', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(330, 'MAC 13', 2, 9, 4, 3, 3, 2, 2, 2012, '27,75', '27,75', '50', '1400-2000', 1400, 2000, 'MEDIUM', '3-4 MONTHS', 'SUGAR GRAIN TYPE (CREAM WHITE BACKGROUND WITH RED FLECKS), LARGE SEEDED,RESISTANT TO ANTHRACNOSE ', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(332, 'MAC 34', 2, 9, 4, 3, 3, 2, 2, 2012, '27,75', '38,75', '50', '1400-2000', 1400, 2000, 'MEDIUM', '3-4 MONTHS', 'RED MOTTLED, LARGE WEDGE SHAPED SEEDS,RESISTANT TO ANGULAR LEAFSPOT AND COMMON BACTERIAL BLIGHT. ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(331, 'MAC 64', 2, 9, 4, 3, 3, 2, 2, 2012, '27,75', '27,75', '50', '1400-2000', 1400, 2000, 'LATE', '4-5 MONTHS', 'DARK RED MOTTLED,MEDIUM SEEDED, RESISTANT TO ANTHRACNOSE AND COMMON BACTERIAL BLIGHT ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(438, 'MUGANDE', 3, 19, 5, 3, 4, 4, 5, 2001, '27', '39', '33', '1300-2000', 1300, 2000, 'MEDIUM', '4-5 MONTHS', 'MEDIUM MATURING,', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(439, 'MWAVULI', 3, 19, 5, 3, 4, 4, 5, 0, '27', '39', '33', '1200-1800', 1200, 1800, 'MEDIUM', '4-5 MONTHS', 'HIGH ROOT YIELD,HIGH DRY MATTER,DUAL PURPOSE', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(368, 'NAKURU/FMI', 4, 1, 3, 4, 4, 4, 9, 1996, '27', '37', '33', '1750-2300', 1750, 2300, 'MEDIUM', '5-7 MONTHS', 'MODERATE DRY MATTER ,WHITE-FLESHED,HIGH ACCEPTABILITY RATING.', '', '', '', '', '', '', '', '', '', ''),"+
				"(387, 'NERICA 1', 4, 5, 4, 3, 4, 3, 5, 2009, '27', '46', '33,50', '1400-1800', 1400, 1800, 'MEDIUM', '2.5-5.5 MONTHS', 'AROMATIC, BLAST TOLERANT, LONG GRAINS ', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(382, 'NERICA 4', 4, 4, 4, 3, 4, 4, 5, 2009, '27', '46', '50', '1400-1800', 1400, 1800, 'LATE', '3.2-6.5 MONTHS', 'BLAST TOLERANT, LONG GRAINS ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(334, 'NGWINURARE', 2, 9, 4, 4, 7, 4, 5, 1996, '27', '39', '33', '1500-2200', 1500, 2200, 'LATE', '4-5 MONTHS', 'LARGE RED SEEDED, RESISTANT TO ANTHRACNOSE, ANGULAR LEAF SPOT, HALO BLIGHT, NECROTIC VIRUS', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(383, 'NIBAM 10', 4, 4, 4, 3, 4, 4, 5, 2010, '27', '46', '50', '0-1700', 0, 1700, 'LATE', '3.5 - 6 MONTHS', 'AROMATIC, TOLERANT TO RICE YELLOW MOTTLE VIRUS (RYMV), LONG SLENDER GRAINS,AWNED NO ANTHOCYANIN, HIGH RATOONING ABILITY ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(384, 'NIBAM 11', 4, 4, 4, 3, 7, 2, 3, 2010, '63', '63', '50', '0-1700', 0, 1700, 'MEDIUM', '3.2 - 6.5 MONTHS', 'AROMATIC, TOLERANT TO RICE YELLOW MOTTLE VIRUS (RYMV), LONG SLENDER GRAINS,AWNED NO ANTHOCYANIN, HIGH RATOONING ABILITY ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(329, 'NYALA', 2, 16, 4, 3, 7, 3, 9, 2009, '27', '47', '64', '1200-2400', 1200, 2400, 'EARLY', '3-4 MONTHS', 'MEDIUM MATURING,', '', '', '', '', '', '', '', '', '', ''),"+
				"(452, 'NYAWO', 3, 19, 5, 3, 7, 4, 2, 2013, '27', '47', '18,33', '1300-2000', 1300, 2000, 'LATE', '6-7 MONTHS', 'FAIRLY HIGH DRY MATTER,YELLOW-FLESHED,AVERAGE ACCEPTABILITY', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(414, 'NZALAUKA', 3, 17, 5, 3, 7, 1, 1, 2008, '27', '27', '33', '15-1200', 15, 1200, 'EXTRA EARLY', '6-8 MONTHS', 'FAIRLY HIGH DRY MATTER,YELLOW-FLESHED,AVERAGE ACCEPTABILITY', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL),"+
				"(207, 'P3253W', 4, 3, 2, 3, 8, 2, 3, 1994, '71', '71', '71', '1200-1600', 1200, 1600, 'MEDIUM', '4-5 MONTHS', 'WIDE ADAPTATION, GOOD STANDABILITY', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(208, 'P3812W', 4, 3, 2, 3, 8, 2, 3, 2011, '71', '71', '71', '1200-1600', 1200, 1600, 'MEDIUM', '5-6 MONTHS', 'EXCELLENT STANDABILITY, TOLERANCE TO GREY LEAF SPOT AND MAIZE STREAK VIRUS, GOOD EAR PLACEMENT', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', ''),"+
				"(367, 'P9518A XICSR92074', 4, 6, 2, 3, 7, 1, 9, 2012, '27', '40', '33', '900-1800', 900, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(170, 'PAN 15', 4, 3, 2, 3, 8, 1, 1, 2004, '70', '70', '70', '1400-1800', 1400, 1800, 'MEDIUM', '4-5 MONTHS', 'LODGE RESISTANT', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(171, 'PAN 33', 4, 3, 2, 3, 8, 1, 1, 2003, '70', '70', '70', '1400-1800', 1400, 1800, 'MEDIUM', '5 - 6 MONTHS', 'HIGH YIELDING', '', '', '', '', '', '', '', '', '', ''),"+
				"(175, 'PAN 5195', 4, 3, 2, 3, 8, 1, 1, 1995, '70', '70', '70', '1000-1800', 1000, 1800, 'MEDIUM', '4-5 MONTHS', 'PROLIFIC TOLERANT TO MAIZE STREAK VIRUS', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(176, 'PAN 5243', 4, 3, 2, 3, 8, 1, 1, 2001, '70', '70', '70', '1200-1800', 1200, 1800, 'MEDIUM', '4-5 MONTHS', 'TOLERANT TO GREY LEAF SPOT AND NORTHERN LEAF BLIGHT PROLIFIC', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(177, 'PAN 5355', 4, 3, 2, 3, 8, 1, 1, 2000, '70', '70', '70', '1000-1800', 1000, 1800, 'MEDIUM', '4-5 MONTHS', 'MODERATE MAIZE STREAK VIRUS RESISTANCE', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(178, 'PAN 57', 4, 3, 2, 3, 8, 1, 1, 2008, '70', '70', '70', '1200-1700', 1200, 1700, 'MEDIUM', '4-5 MONTHS', 'FLINT, TOLERANT TO LEAF DISEASES', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(179, 'PAN 5M-35', 4, 3, 2, 3, 8, 1, 1, 2010, '70', '70', '70', '1200-1700', 1200, 1700, 'MEDIUM', '4-4.5 MONTHS', 'DOUBLE COBBER, GOOD HUSK COVER,FLINT GOOD ON LEAF DISEASES', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(180, 'PAN 63', 4, 3, 2, 3, 8, 1, 3, 2010, '70', '70', '70', '1200-1700', 1200, 1700, 'MEDIUM', '4-4.5 MONTHS', 'PROLIFIC FLINT, TOLERANCE TO LEAF DISEASES INCLUDING MAIZE STREAK VIRUS, VERY GOOD DROUGHT TOLERANCE, ADAPTABILITY ,VERY HARD GRAIN', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(181, 'PAN 67', 4, 3, 2, 3, 8, 1, 3, 2001, '70', '70', '70', '1200-1600', 1200, 1600, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO MAIZE STREAK VIRUS,TOLERANT TO LOW SOIL NITROGEN', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(182, 'PAN 683', 4, 3, 2, 4, 8, 1, 1, 2003, '70', '70', '70', '1800-2200', 1800, 2200, 'LATE', '6-7 MONTHS', 'LATE MATURITY, EXCELLENT STANDABILITY, EXCELLENT TIP COVER ,RESISTANT TO GREY LEAF SPOT ', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(183, 'PAN 69', 4, 3, 2, 3, 8, 1, 3, 2008, '70', '70', '70', '1200-1700', 1200, 1700, 'MEDIUM', '4-5 MONTHS', 'HIGH YIELDING, WIDE ADAPTABILITY, GOOD STANDABILITY, TOLERANT TO LEAF DISEASES,', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(184, 'PAN 691', 4, 3, 2, 4, 8, 1, 1, 2001, '70', '70', '70', '1700-2400', 1700, 2400, 'LATE', '6-9 MONTHS', 'TOLERANT TO GREY LEAF SPOT, GOOD STANDABILITY, LOW EAR PLACEMENT ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(185, 'PAN 697', 4, 3, 2, 3, 8, 1, 1, 2010, '70', '70', '70', '1500-2000', 1500, 2000, 'MEDIUM', '5-5.5 MONTHS', 'TOLERANT TO LEAF DISEASES ESPECIALLY MSV. GOOD HUSK COVER. VERY ATTRACTIVE COBS.', '', '', '', '', '', '', '', '', '', ''),"+
				"(186, 'PAN 7M-89', 4, 3, 2, 3, 8, 1, 1, 2008, '70', '70', '70', '1400-2000', 1400, 2000, 'MEDIUM', '5-6 MONTHS', 'HIGH YIELDING, TOLERANT TO LEAF DISEASES', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(187, 'PAN 7M-97', 4, 3, 2, 3, 8, 1, 1, 2008, '70', '70', '70', '1400-1700', 1400, 1700, 'MEDIUM', '4-5 MONTHS', 'HIGH YIELDING, GOOD STANDABILITY, PROLIFIC', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(188, 'PAN 8M-91', 4, 3, 2, 4, 8, 1, 1, 2008, '70', '70', '70', '1400-2000', 1400, 2000, 'MEDIUM', '5-6 MONTHS', 'EXCELLENT GREY LEAF SPOT AND RUST TOLERANCE, GOOD FOR SILAGE, PROLIFIC', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(189, 'PAN 8M-93', 4, 3, 2, 4, 8, 1, 1, 2011, '70', '70', '70', '1400-2000', 1400, 2000, 'MEDIUM', '4-5 MONTHS', 'HIGH YIELDING,GOOD HASK COVER,GOOD STANDABILITY,TOLERANT TO COB ROT,BLIGHT,GREY LEAF SPOT,MAIZE STREAK VIRUS', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(192, 'PEX 602', 4, 3, 2, 3, 8, 1, 1, 2011, '70', '70', '70', '1200-1700', 1200, 1700, 'MEDIUM', '4.0-4.5 MONTHS', 'EXCELLENT STANDABILITY, DOUBLE COBBER, STAY GREEN ', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(193, 'PEX 702', 4, 3, 2, 3, 8, 1, 1, 2011, '70', '70', '70', '1500-2000', 1500, 2000, 'MEDIUM', '4.5-5.0 MONTHS', 'GOOD ON LEAF DISEASES (BLIGHT, MAIZE STREAK VIRUS, GREY LEAF SPOT, RUST) BIG COBS AND GRAINS', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(194, 'PEX 703', 4, 3, 2, 4, 8, 1, 1, 2011, '70', '70', '70', '1700-2100', 1700, 2100, 'MEDIUM', '5.0-5.5 MONTHS', 'VERY GOOD HUSK COVER. GOOD ON COB ROTS', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(195, 'PEX 704', 4, 3, 2, 3, 8, 1, 1, 2012, '70', '70', '70', '1500-2000', 1500, 2000, 'MEDIUM', '4.5-5.0 MONTHS', 'GOOD HUSK COVER,EXCELLENT STANDABILITY, GOOD TOLERANCE TO LEAF DISEASES', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(152, 'PH 4', 4, 3, 2, 3, 8, 2, 3, 1995, '50', '50', '50', '0-1200', 0, 1200, 'MEDIUM', '3-5 MONTHS', 'HEAT TOLERANT, GOOD STANDABILITY, PARTIAL MAIZE STREAK VIRUS RESISTANCE', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', '', '', ''),"+
				"(153, 'PH 5', 4, 3, 2, 3, 8, 1, 9, 2007, '50', '50', '50', '0-1200', 0, 1200, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO LODGING, EAR ROTBAND RUST, GOOD HUSK COVER, GOOD STANDABILITY', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(197, 'PHB 30D79', 4, 3, 2, 3, 8, 2, 3, 2008, '71', '71', '71', '1000-1800', 1000, 1800, 'MEDIUM', '5-6 MONTHS', 'GOOD TOLERANCE TO BLIGHT & MSV,RESISTANT TO GREY LEAF SPOT, STRONG STALKS', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(198, 'PHB 30G19', 4, 3, 2, 3, 8, 2, 3, 2006, '71', '71', '71', '1000-1800', 1000, 1800, 'MEDIUM', '5-6 MONTHS', 'RESISTANT TO GREY LEAF SPOT, LOW EAR PLACEMENT, GOOD HUSK COVER AND STANDABILITY, LODGING RESISTANT', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(199, 'PHB 30G97', 4, 3, 2, 3, 8, 2, 3, 2003, '71', '71', '71', '1200-2000', 1200, 2000, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO GREY LEAFSPOT, RESISTANT TO EAR ROTS, TOLERANT TO MAIZE STREAK VIRUS, GOOD GRAIN QUALITY, BEST FOR MID –ALTITUDES', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(200, 'PHB 30V53', 4, 3, 2, 3, 8, 2, 3, 2006, '71', '71', '71', '1200-2000', 1200, 2000, 'MEDIUM', '5-6 MONTHS', 'RESISTANT TO GREY LEAF SPOTTOLERANT TO MAIZE STREAK VIRUS LOW EAR PLACEMENT GOOD HUSK COVER', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(201, 'PHB 3253W', 4, 3, 2, 3, 8, 2, 3, 1996, '71', '71', '71', '800-1800', 800, 1800, 'MEDIUM', '4-5 MONTHS', 'WIDE ADAPTATION, GOOD STANDABILITY', '', '', '', '', '', '', '', '', '', ''),"+
				"(202, 'PHB 3812W', 4, 3, 2, 3, 8, 2, 3, 2011, '71', '71', '71', '1200-1600', 1200, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(203, 'PHB30H83', 4, 3, 2, 3, 8, 2, 3, 2002, '71', '71', '71', '1000-2000', 1000, 2000, 'MEDIUM', '5-6 MONTHS', 'GREY LEAF SPOT TOLERANT, EAR ROT RESISTANCE', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(14, 'PURPLE GOLD.', 3, 18, 5, 4, 7, 2, 2, 2010, '26,27', '48', '26,27', '1800-3000', 1800, 3000, 'MEDIUM', '4.0-4.5 MONTHS', 'ROUND TUBERS,DARK PURPLE SKIN COLOUR,SHALLOW EYE DEPTH,WHITE FLESH COLOUR,MODERATELY RESISTANT TO LATE BLIGHT,GOOD STORABILITY,RESISTANT TO GREENING ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(434, 'RACHAR', 3, 19, 5, 3, 4, 4, 5, 2011, '27', '35', '33', '1200-1680', 1200, 1680, 'MEDIUM', '4-5 MONTHS', 'VIRUS RESISTANT', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(321, 'ROSECOCO MADINI', 2, 10, 4, 3, 2, 2, 1, 2013, '75', '75', '64', '1300-2000', 1300, 2000, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(388, 'SARO-5', 4, 5, 4, 3, 7, 3, 5, 2013, '27', '46', '70', '1400-1800', 1400, 1800, 'MEDIUM', '3-3.5 MONTHS', 'RESISTANT TO RICE BLAST, BACTERIAL LEAF BLIGHT', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(214, 'SC PUNDA MILIA 529', 4, 3, 2, 3, 8, 2, 9, 2013, '73', '73', '7', '800-1600', 800, 1600, 'EARLY', '3.5-4 MONTHS', 'GOOD TIP COVER, TOLERANT TO AIR BORNE DISEASES GLS, HEAT TOLERANT, RUST', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(215, 'SC PUNDA MILIA 53', 4, 3, 2, 3, 8, 2, 3, 2005, '73', '73', '7', '1800-1900', 1800, 1900, 'MEDIUM', '5-6 MONTHS', 'GOOD STANDABILITY,TOLERANT TO GREY LEAF SPOT,TOLERANT TO MAIZE STREAK VIRUS ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', ''),"+
				"(217, 'SC SIMBA 65', 4, 3, 2, 3, 8, 2, 9, 2013, '73', '73', '7', '900-1400', 900, 1400, 'EARLY', '4 MONTHS', ' GOOD STANDABILITY, HARD DENT (INTERMEDIATE TO SEMIDENT),AIR BORNE DISEASE TOLERANCE, GREY LEAF SPOT,HEAT TOLERANT AND RUST, HIGH SHELLING PERCENTAGE, MAIZE STREAK VIRUS TOLERANCE', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(218, 'SC TEMBO 71', 4, 3, 2, 3, 8, 1, 1, 2006, '73', '73', '7', '1800-1900', 1800, 1900, 'MEDIUM', '5-5.5 MONTHS', 'TOLERANT TO GREY LEAF SPOT & MAIZE STREAK VIRUS,GOOD STANDABILITY', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(219, 'SC TEMBO 727', 4, 3, 2, 3, 8, 2, 9, 2013, '73', '73', '7', '1200-1400', 1200, 1400, 'MEDIUM', '5months', 'GOOD STANDABILITYMAIZE STREAK VIRUS TOLERANCE HIGH SHELLING PERCENTAGE', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(220, 'SC TEMBO 73', 4, 3, 2, 3, 8, 2, 3, 2013, '73', '73', '7', '1200-1600', 1200, 1600, 'MEDIUM', '5-6 MONTHS', 'GOOD STANDABILITYTOLERANT TO GREY LEAF SPOTTOLERANT TO MAIZE STREAK VIRUS ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(222, 'SC05C8575', 4, 3, 2, 3, 8, 1, 1, 2012, '73', '73', '7', '1200-1800', 1200, 1800, 'MEDIUM', '5months', 'GOOD STANDABILITY,HARD DENT(INTERMEDIATE TO SEMI DENT), GOOD TIP COVER,MID PLANT COB PLACEMENT,TOLERANT TO GREY LEAF SPOT, HEAT TOLERANT AND RUST,HIGH SHELLING PERCENTAGE,DROUGHT TOLERANCE,TOLERANCE OF COB DISEASES - DIPLODIA & FUSARIUM,HIGHYIELDS - AVERA', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(18, 'SHEREKEA', 3, 18, 5, 4, 7, 4, 5, 2010, '27', '48', '33', '1800-3000', 1800, 3000, 'EARLY', '3.5-4 MONTHS', 'ROUND TUBERS, HIGH NUMBER OF TUBERS PER PLANT, RED SKIN COLOUR,MEDIUM EYE DEPTH,CREAM FLESH COLOUR, HIGHLY RESISTANT TO LATE BLIGHT AND VIRUSES, GOOD STORABILITY ,INTERMEDIATE,CRISP AND MASHING ', '', 'YES', 'YES', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(223, 'SIMBA 61', 4, 3, 2, 3, 8, 2, 3, 2003, '73', '73', '7', '1200-1800', 1200, 1800, 'MEDIUM', '4.5-6 MONTHS', 'RESISTANT TO MSV, EAR ROTS, GLS', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(441, 'SPK 013', 3, 19, 5, 3, 4, 4, 5, 2001, '27', '39', '33', '1200-1400', 1200, 1400, 'MEDIUM', '4-5 MONTHS', 'LOW UNDERGROUND STABILITY', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(373, 'U15', 4, 1, 3, 3, 7, 4, 5, 2013, '27', '39', '33', '0-2000', 0, 2000, '', '', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(224, 'UA KAYONGO 1', 4, 3, 2, 3, 3, 3, 5, 2004, '27', '79', '79', '1200-1600', 1200, 1600, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO STRIGA', '', '', '', '', '', '', '', '', '', ''),"+
				"(42, 'UA KAYONGO 3', 4, 3, 2, 3, 7, 3, 9, 2007, '27', '29', '64', '1000-1500', 1000, 1500, 'MEDIUM', '4-5 MONTHS', 'TOLERANT TO GREY LEAF VIRUS AND MAIZE STREAK VIRUS, ROOT AND STALK LODGING', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(335, 'UNUMBANO', 2, 9, 4, 4, 7, 4, 5, 1996, '27', '39', '33', '1500-2200', 1500, 2200, 'LATE', '4 - 5 MONTHS', 'LARGE RED SEEDED, RESISTANT TO ANTHRACNOSE, ANGULAR LEAF SPOT, HALO BLIGHT, NECROTIC VIRUS', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(442, 'VITAMU', 3, 19, 5, 3, 4, 4, 2, 2013, '27', '39', '33', '1200-1400', 1200, 1400, 'MEDIUM', '4-5 MONTHS', 'HIGH CAROTENE,HIGH DRY MATTER CONTENT', '', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(228, 'WH 402', 4, 3, 2, 2, 8, 1, 1, 2006, '79', '79', '79', '1000-1800', 1000, 1800, 'MEDIUM', '4.5 -5.5 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS,GREY LEAF SPOT AND BLIGHT, EVER GREEN STRONG STEM AT HARVEST,SUITABLE FOR FODDER. ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(231, 'WH 505', 4, 3, 2, 3, 8, 2, 3, 2003, '79', '79', '79', '1200-1800', 1200, 1800, 'MEDIUM', '4.5-5.5 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS, GREY LEAF SPOT AND NORTHERN LEAF BLIGHT ,GREEN STEMS AT HARVEST, SUITABLE FOR ANIMAL FODDER ,TOLERANT TO LOW SOIL NITROGEN ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(234, 'WH 602', 4, 3, 2, 2, 8, 2, 3, 2006, '79', '79', '79', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(235, 'WH 699', 4, 3, 2, 4, 8, 2, 3, 2002, '79', '79', '79', '1700-2200', 1700, 2200, 'LATE', '6-8 MONTHS', 'TOLERANT TO SMUT', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(236, 'WH 904', 4, 3, 2, 3, 8, 2, 3, 2002, '79', '79', '79', '1000-1700', 1000, 1700, 'MEDIUM', '5-6 MONTHS', 'TOLERANT TO STREAK VIRUS ', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(242, 'WH404', 4, 3, 2, 2, 8, 3, 8, 2008, '79', '79', '79', '', 0, 0, 'MEDIUM', '5-6 MONTHS', ' GOOD TOLERANCE TO MAIZE STREAK VIRUS, GREY LEAFSPOT AND BLIGHT STRONG GREEN STEM AT HARVEST US AS CATTLE FODDER.', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(243, 'WH405', 4, 3, 2, 2, 8, 1, 1, 2008, '79', '79', '79', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(244, 'WH406', 4, 3, 2, 3, 8, 1, 1, 2010, '79', '79', '79', '1000-1700', 1000, 1700, 'MEDIUM', '5 - 6 MONTHS', ' TOLERANT TO MAIZE STREAK VIRUS, GREY LEAFSPOT AND BLIGHT,STRONG GREEN STEM AT HARVEST , USE AS CATTLE FODDER', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(245, 'WH501', 4, 3, 2, 3, 8, 1, 1, 2003, '79', '79', '79', '1300-1700', 1300, 1700, 'MEDIUM', '5-6 MONTHS', 'SUITABLE FOR LOW INPUT PRODUCTION, TOLERANT TO GREY LEAF SPOT, MAIZE STREAK VIRUS AND NORTHERN LEAF BLIGHT', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(246, 'WH601', 4, 3, 2, 4, 8, 1, 1, 2009, '79', '79', '79', '1500-2100', 1500, 2100, 'MEDIUM', '5 – 6 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS, GREY LEAFSPOT & BLIGHT, LODGING RESISTANT, GOOD HUSK COVER', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(247, 'WH605', 4, 3, 2, 2, 8, 2, 3, 2008, '79', '79', '79', '', 0, 0, 'MEDIUM', '5-6 MONTHS', 'GOOD TOLERANCE TO MAIZE STREAK VIRUS, GREY LEAFSPOT AND BLIGHT, STRONG GREEN STEMS AT HARVEST,USED AS CATTLE FODDER.', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(251, 'WS 909', 4, 3, 2, 3, 8, 2, 3, 2002, '79', '79', '79', '0-1500', 0, 1500, 'MEDIUM', '4-5 MONTHS', 'TOLERANT TO STRIGA', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(252, 'WS104', 4, 3, 2, 3, 8, 2, 3, 2010, '79', '79', '79', '0-1200', 0, 1200, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(205, 'X7A344W', 4, 3, 2, 3, 8, 2, 9, 2012, '71', '71', '71', '1200-1800', 1200, 1800, 'MEDIUM', '4.5 -5 MONTHS', 'VERY GOOD TOLERANT TO MAIZE STEAK VIRUS,EXCELLENT RESISTANCE TO GRAY LEAF SPOT,IMPROVED YIELD AND GRAIN QUALITY, GOOD STANDABILITY', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(429, '22/77', 3, 19, 5, 3, 4, 4, 5, 1998, '27', '27', '33', '0-800', 0, 800, 'EARLY', '3.5 MONTHS', 'GOOD FOR PIECE MEAL HARVESTING', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', '', '', ''),"+
				"(355, '2K X 17', 4, 6, 3, 3, 3, 3, 5, 1981, '27,50', '27,50', '33,50', '0-1500', 0, 1500, 'EARLY', '3 MONTHS', 'HARD ENDOSPERM, DEHULLED TO MAKE A RICE LIKE PRODUCT ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(5, 'ANETT', 3, 18, 5, 4, 7, 2, 3, 1972, '27', '48', '33', '1400-2400', 1400, 2400, 'EXTRA EARLY', '2.5 - 3 MONTHS', 'FAIRLY TOLERANT TO LATE BLIGHT', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(2, 'ARIZONA', 3, 18, 5, 3, 8, 2, 9, 2013, '5', '5', '5', '1800-2600', 1800, 2600, 'EARLY', '3-3.5 MONTHS', 'RESISTANT TO CASSAVA MOSAIC DISEASE,EARLY MATURING, LOW CYANIDE,SWEET, RESISTANT TO CASSAVA MOSAIC VIRUS,POUNDABLE', 'YES', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(6, 'ASANTE', 3, 18, 5, 3, 4, 2, 3, 1998, '27', '48', '6,33', '1800-2600', 1800, 2600, 'EARLY', '3-4 MONTHS', 'ROUND TUBERS,DARK PURPLE SKIN COLOUR,SHALLOW EYE DEPTH,WHITE FLESH COLOUR,MODERATELY RESISTANT TO LATE BLIGHT,GOOD STORABILITY,RESISTANT TO GREENING ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(324, 'BLACK HAWK', 2, 16, 3, 3, 7, 3, 9, 2009, '27', '47', '64', '800-1700', 800, 1700, 'EARLY', '3-4 MONTHS', 'RESISTANT TO CMV, TOLERANT TO CBSD,STRAIGHT STEMS IDEAL FOR INTERCROPPING', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(268, 'CHANIA DESI 1', 2, 8, 4, 3, 4, 2, 2, 2013, '15', '15', '19,56,66', '800-1200', 800, 1200, 'EARLY', '2.5-3 MONTHS', 'DROUGHT TOLERANT,HIGH YIELDING,EARLY MATURING ,ERECT AND HIGH CANOPY CLEARANCE (20-30CM), SUITABLE FOR COMBINE HARVESTING,TOUGH SEED COAT,RESISTANT TO STORAGE PESTS, FIXES NITROGEN 20-40KG/HA, BIOMASS BREAKS DISEASE CYCLES MAINLY RUSTS IN WHEAT AND FUSARI', 'YES', 'YES', 'YES', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(269, 'CHANIA DESI 2', 2, 8, 4, 3, 4, 2, 2, 2013, '15', '15', '19,56,66', '800-1200', 800, 1200, 'EARLY', '2.5-3 MONTHS', 'DROUGHT TOLERANT,HEAT TOLERANT,ERECT AND HIGH CANOPY CLEARANCE SUITABLE FOR COMBINE HARVESTING, TOLERANT TO FUSARIUM WILT, DRY ROT & COLLAR ROT, TOUGH SEED COAT, RESISTANT TO STORAGE PESTS, BROWN SEEDED, SUITABLE FOR MAKING GITHERI', 'YES', 'YES', 'YES', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(270, 'CHANIA DESI 3', 2, 8, 4, 3, 4, 2, 2, 2013, '15', '15', '19,56,66', '800-1200', 800, 1200, 'EARLY', '2.5-3 MONTHS', 'DROUGHT TOLERANT,TOLERANT TO FUSARIUM WILT, DRY ROT AND COLLAR ROT TOUGH SEED COAT, RESISTANT TO STORAGE PESTS,BROWN SEEDED, SUITABLE FOR MAKING GITHERI &DHAL(STEW),GOOD FOR CANNING ', 'YES', 'YES', 'YES', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(108, 'DH 06', 4, 3, 2, 3, 8, 2, 2, 2007, '50', '50', '50', '900-1500', 900, 1500, 'EARLY', '3-4 MONTHS', 'GOOD STANDABILITY, GOOD HUSK COVER ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(109, 'DH 09', 4, 3, 2, 3, 8, 1, 2, 2004, '50', '50', '50', '1000-1500', 1000, 1500, 'EARLY', '3-4 MONTHS', 'RESISTANT TO ROOT AND STALK LODGING, GOOD HUSK COVER, HIGH YIELDING', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(110, 'DH 10', 4, 3, 2, 3, 8, 1, 2, 2004, '50', '50', '50', '800-1400', 800, 1400, 'EARLY', '3-4 MONTHS', 'RESISTANT TO RUST, EAR ROT AND LODGING, GOOD HUSK COVER, SHORT STATURE', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(112, 'DH 8', 4, 3, 2, 3, 8, 1, 9, 2003, '50', '50', '50', '900-1500', 900, 1500, 'EARLY', '3-4 MONTHS', 'GOOD PERFORMANCE IN LOW YIELDING ENVIRONMENTS, RESISTANT TO STALK LODGING, ROOT LODGING AND EAR ROTS, SEMI DENT', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(113, 'DH01', 4, 3, 2, 3, 8, 2, 3, 1995, '50', '50', '50', '900-1400', 900, 1400, 'EARLY', '3-4 MONTHS', 'EARLY MATURING, STAYS GREEN', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(114, 'DH02', 4, 3, 2, 3, 8, 2, 3, 1995, '50', '50', '50', '900-1400', 900, 1400, 'EARLY', '3-4 MONTHS', 'EARLY MATURING, STAYS GREEN', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(115, 'DH03', 4, 3, 2, 3, 8, 2, 3, 2000, '50', '50', '50', '900-1500', 900, 1500, 'EARLY', '3-4 MONTHS', 'STAYS GREEN, GOOD STANDABILITY', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(116, 'DH04', 4, 3, 2, 3, 8, 2, 3, 2001, '50', '50', '50', '900-1500', 900, 1500, 'EARLY', '3-4 MONTHS', 'SHORT STATURE', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(117, 'DH05', 4, 3, 2, 3, 8, 1, 9, 2001, '50', '50', '50', '900-1500', 900, 1500, 'EARLY', '3-4 MONTHS', 'HIGH YIELDING AND EARLY MATURING', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(155, 'DLC1', 4, 3, 2, 3, 3, 3, 8, 1989, '50', '50', '50', '800-1200', 800, 1200, 'EXTRA EARLY', '2-3 MONTHS', 'FLINT ', 'YES', '', '', 'YES', '', '', '', '', '', ''),"+
				"(322, 'DPSB 19', 2, 16, 4, 3, 8, 1, 1, 2010, '27', '27', '56', '900-2400', 900, 2400, 'EARLY', '3-4 MONTHS', 'DESI AND RESISTANT TO FUSARIUM WILT,SMALL BROWN GRAIN.', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(395, 'EAGLE10', 4, 7, 4, 3, 7, 2, 2, 2010, '27', '47', '6,33,50', '1800-2700', 1800, 2700, 'EARLY', '3.5 MONTHS', 'GOOD RESISTANCE TO STEM RUST ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(282, 'EGERTON MBAAZI M1', 2, 15, 4, 3, 4, 2, 2, 2012, '15', '15', '19,56,66', '800-1500', 800, 1500, 'MEDIUM', '4-5 MONTHS', 'DROUGHT TOLERANT,TOLERANT TO FUSARIUM WILT,TOLERANT TO PEST, TOUGH SEEDED,CREAM COLOR OF GRAIN ', 'YES', '', 'YES', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(344, 'GADAM', 4, 6, 3, 3, 7, 2, 3, 1994, '27', '27', '13,19,33,50,56', '0-1500', 0, 1500, 'EARLY', '3 MONTHS', 'SPECIALLY ADAPTED TO COASTAL AND SEMI-ARID LOWLANDS ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(267, 'GAF4', 4, 21, 3, 3, 7, 4, 2, 2007, '27', '41', '33', '1200-1600', 1200, 1600, 'EARLY', '3-4 MONTHS', 'TOLERANT TO STRIGA,DROUGHT TOLERANT', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(291, 'GLP-585 RED HARICOT', 2, 10, 4, 3, 7, 2, 3, 1982, '27', '27', '33', '1500-2000', 1500, 2000, 'EARLY', '2.5 - 3 MONTHS', 'SUITABLE FOR HIGH RAINFALL AREAS, RESISTANT TO BEAN COMMON MOSAIC VIRUS ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(304, 'GLP-X 1127 NEW MWEZI MOJA', 2, 10, 4, 3, 7, 4, 5, 1982, '27,50', '27,50', '50', '1000-1500', 1000, 1500, 'EARLY', '2.5 - 3 MONTHS', 'WIDE ADAPTATION, RESISTANT TO BEAN COMMON MOSAIC VIRUS,TOLERANT TO RUST. ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(119, 'H28P1', 4, 3, 2, 3, 8, 1, 9, 2011, '50', '50', '50', '0-1200', 0, 1200, 'MEDIUM', '4-5months', 'A THREE-WAY CROSS HYBRID, HIGH GRAIN YIELD OF 11.91% ABOVE THE MEAN OF CHECKS (KS-PH1, PH),HEAT TOLERANT,TOLERANT TO LEAF RUST', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(132, 'H6213', 4, 3, 2, 4, 8, 2, 3, 2002, '50', '50', '50', '1600-2200', 1600, 2200, 'LATE', '6-8 MONTHS', 'HIGH YIELD, DROUGHT TOLERANT', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(276, 'HB 48/10E', 2, 11, 4, 3, 7, 4, 5, 1987, '27', '40', '33', '0-1200', 0, 1200, 'EARLY', '2 - 2.5 MONTHS', 'TOLERANT TO VIRAL DISEASES', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(359, 'Hybrid Mtama-1(KSBH-01)', 4, 6, 2, 3, 7, 1, 9, 2012, '27', '40', '33', '900-1800', 900, 1800, 'EARLY', '3-3.5 MONTHS', 'EARLY MATURING,HEAT TOLERANT,SWEET GRAIN', 'YES', '', '', 'YES', '', '', '', '', '', ''),"+
				"(370, 'I.E4115', 4, 1, 3, 3, 7, 4, 9, 2013, '27', '39', '33', '0-2000', 0, 2000, 'MEDIUM', '4 MONTHS', 'HIGH YIELDING,RESISTANT TO RUST', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(354, 'IS76', 4, 6, 3, 3, 3, 3, 8, 1981, '27', '27', '50', '0-1500', 0, 1500, 'EARLY', '3 MONTHS', 'TOLERANT TO SHADING', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(350, 'IS8595', 4, 6, 3, 3, 7, 3, 8, 1982, '27', '34', '33', '0-1800', 0, 1800, 'EARLY', '3 MONTHS', 'TOLERANT TO HEAT,DROUGHT TOLERANT', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(431, 'JAYALO', 3, 19, 5, 3, 4, 4, 5, 1998, '27', '35', '33', '0-200', 0, 200, 'EARLY', '4 MONTHS', 'GOOD FOR PIECE MEAL HARVESTING', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(277, 'K 80', 2, 11, 4, 3, 4, 2, 3, 2000, '27', '40', '13,14,56', '1200-1800', 1200, 1800, 'EARLY', '2.5-3 MONTHS', 'DUAL PURPOSE,TOLERANT TO THRIPS,SILVERY MID RIBS ', 'YES', '', 'YES', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(346, 'KABURU', 4, 6, 3, 3, 7, 1, 9, 2008, '27', '27', '33', '500-1500', 500, 1500, 'MEDIUM', '3.5 MONTHS', 'EARLY, LARGE GRAINS, MODERATELY RESISTANT TO HALO BLIGHT, BEAN COMMON MOSAIC VIRUS & COMMON BACTERIAL BLIGHT', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(425, 'KALESO', 3, 17, 5, 3, 7, 1, 1, 1969, '27', '44', '33', '0-1500', 0, 1500, 'LATE', '12-18 MONTHS', 'TOLERANT TO ROOT ROT', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(416, 'KAREMBO', 3, 17, 5, 3, 7, 4, 3, 2008, '27', '40', '33', '15-1200', 15, 1200, 'EXTRA EARLY', '8 MONTHS', 'SHORT WITH OPEN STRUCTURE', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(347, 'KARI 16.MTAMA 2', 4, 6, 3, 3, 7, 1, 9, 2008, '27', '27', '33', '500-1200', 500, 1500, 'MEDIUM', '3.5 MONTHS', 'TOLERANT TO ROOT ROT', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(348, 'KARIA-SH2', 4, 6, 3, 3, 7, 1, 9, 2008, '27', '27', '33', '1500-2000', 1500, 2000, 'MEDIUM', '5.5 MONTHS', 'LARGE GRAINS, RESISTANT TO FLOURY LEAF SPOT, HALO BLIGHT, ANGULAR LEAF SPOT,ANTHRACNOSE, BEAN COMMON MOSAIC VIRUS & COMMON BACTERIAL BLIGHT', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(426, 'KARIBUNI', 3, 17, 5, 3, 7, 4, 3, 2008, '27', '44', '33', '15-1200', 15, 1200, 'EARLY', '8-12 MONTHS', 'HIGH BRANCHING HEIGHTS, GOOD FOR INTERCROPPING ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(283, 'KAT 777', 2, 15, 4, 3, 7, 3, 8, 1981, '27', '40', '64', '600-1500', 600, 1500, 'MEDIUM', '5 - 6 MONTHS', 'DROUGHT TOLERANT', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(299, 'KAT B1(KATHEKA)', 2, 10, 4, 3, 7, 2, 3, 1987, '27', '36', '13,56', '1000-1800', 1000, 1800, 'EARLY', '2.5 MONTHS', 'EARLY MATURING, SWEET TASTING, LESS FLATULENT, HEAT TOLERANT, DROUGHT TOLERANT', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(259, 'KAT CB', 4, 21, 3, 3, 2, 2, 3, 1967, '27', '40', '33', '900-1350', 900, 1350, 'EARLY', '3-4 MONTHS', 'EARLY MATURING', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(300, 'KAT X 69', 2, 10, 4, 3, 7, 2, 3, 1995, '27', '36', '33', '1200-1800', 1200, 1800, 'EARLY', '2 - 3 MONTHS', 'HIGH YIELDING, RESISTANT TO RUST, COMMON BEAN MOSSAIC VIRUS, ANGULAR LEAF SPOT, CHARCOAL ROT', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(306, 'KAT X56', 2, 10, 4, 3, 7, 2, 3, 1995, '27', '40', '13,56', '900-1800', 900, 1800, 'EARLY', '2.5-3 MONTHS', 'HIGH YIELDING, GOOD COOKING QUALITY, SWEET TASTING', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(301, 'KAT-BEAN 9', 2, 10, 4, 3, 7, 2, 3, 1998, '27', '36', '13', '900-1600', 900, 1600, 'EARLY', '2.5-3 MONTHS', 'TOLERANT TO HEAT, AND DROUGHT, LESS FLATULENT', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(307, 'KAT/BEAN 2', 2, 10, 4, 3, 7, 1, 9, 1987, '27', '40', '33', '1200-1800', 1200, 1800, 'EARLY', '2 - 3 MONTHS', 'MEDIUM MATURING, MODERATELY RESISTANT TO HALO BLIGHT, ANGULAR LEAF SPOT, ANTHRACNOSE, BEAN COMMON MOSAIC VIRUS & COMMON BACTERIAL BLIGHT', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(374, 'KAT/FM I', 4, 1, 3, 3, 4, 3, 5, 2000, '27', '40', '33,50', '250-1150', 250, 1150, 'EARLY', '3 MONTHS', 'DROUGHT TOLERANT', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(375, 'KAT/FOX-1', 4, 2, 3, 3, 7, 4, 5, 1981, '27', '40', '33', '250-1500', 250, 1500, 'EARLY', '3-4 MONTHS', 'CREAM GRAIN COLOUR ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(376, 'KAT/PM - 3', 4, 14, 3, 3, 4, 4, 5, 2001, '27', '40', '33,56', '250-1150', 250, 1150, 'EARLY', '2 MONTHS', 'BOLD GRAINS', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(377, 'KAT/PM 1', 4, 14, 3, 3, 7, 4, 5, 2000, '27', '40', '33', '250-1150', 250, 1150, 'EARLY', '2-3 MONTHS', '80% BRISTLED,TOLERANT TO BIRD DAMAGE ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(378, 'KAT/PM 2', 4, 14, 3, 3, 7, 4, 5, 2000, '27', '40', '33', '250-1150', 250, 1150, 'EARLY', '2 MONTHS', 'GRAIN USED AT DOUGH STAGE ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(20, 'KAT021-13-28', 4, 3, 2, 3, 3, 1, 1, 2012, '27', '13', '13', '750-1750', 750, 1750, 'EXTRA EARLY', '2.5 MONTHS', 'EARLY/DROUGHT TOLERANT', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(73, 'KATEH2007-3', 4, 3, 2, 3, 7, 1, 9, 2011, '27', '40', '64', '900-1600', 900, 1600, 'EARLY', '4 MONTHS', 'STEM BORER RESISTANT', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(278, 'KCP 022', 2, 11, 4, 3, 7, 4, 5, 2000, '27', '40', '33', '0-1200', 0, 1200, 'EARLY', '', '', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(24, 'KDH3', 4, 3, 2, 3, 3, 1, 1, 2004, '27', '27', '13', '900-1200', 900, 1200, 'EXTRA EARLY', '2.5 MONTHS', 'EARLY MATURING,DROUGHT TOLERANT ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(25, 'KDH4 SBR', 4, 3, 2, 3, 7, 1, 9, 2008, '27', '27', '64', '900-1200', 900, 1200, '', '', 'RESISTANT TO STEM BORERS, TOLERANT TO DROUGHT & LOW NITROGEN', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(27, 'KDH414-02 SBR', 4, 3, 2, 3, 7, 1, 9, 2008, '27', '27', '64', '900-1200', 900, 1200, '', '', 'RESISTANT TO STEM BORERS, TOLERANT TO DROUGHT & LOW NITROGEN,', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(28, 'KDH414-03 SBR', 4, 3, 2, 3, 7, 1, 9, 2008, '27', '27', '64', '900-1200', 900, 1200, '', '', 'RESISTANT TO STEM BORERS, TOLERANT TO DROUGHT & LOW NITROGEN,', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(29, 'KDH5 SBR', 4, 3, 2, 3, 7, 1, 9, 2008, '27', '27', '64', '900-1200', 900, 1200, '', '', 'RESISTANT TO STEM BORERS, TOLERANT TO DROUGHT & LOW NITROGEN,', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(30, 'KDH6 SBR', 4, 3, 2, 3, 7, 1, 9, 2008, '27', '27', '64', '900-1200', 900, 1200, '', '', 'RESISTANT TO STEM BORERS, TOLERANT TO DROUGHT & LOW NITROGEN,', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(260, 'KDV1', 4, 21, 3, 3, 4, 4, 3, 2006, '27', '40', '13,19', '0-900', 0, 900, 'EXTRA EARLY', '2.5-3 MONTHS', 'EARLY MATURING,DROUGHT TOLERANT ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', '', '', ''),"+
				"(261, 'KDV2', 4, 21, 3, 3, 4, 4, 3, 2006, '27', '40', '13,19', '0-900', 0, 900, 'EXTRA EARLY', '2.5-3 MONTHS', 'EARLY MATURING,DROUGHT TOLERANT ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', '', '', ''),"+
				"(262, 'KDV3', 4, 21, 3, 3, 3, 4, 3, 2006, '27', '40', '13', '0-900', 0, 900, 'EXTRA EARLY', '2.5-3.5 MONTHS', 'DROUGHT TOLERANT', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(263, 'KDV4', 4, 21, 3, 3, 3, 4, 3, 2006, '27', '40', '13', '0-900', 0, 900, 'EXTRA EARLY', '2.5-3 MONTHS', 'EARLY MATURING,DROUGHT TOLERANT ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', '', '', ''),"+
				"(264, 'KDV5', 4, 21, 3, 3, 3, 4, 3, 2006, '27', '40', '13', '0-900', 0, 900, 'EXTRA EARLY', '2.5-3.5 MONTHS', 'DROUGHT TOLERANT', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(265, 'KDV6', 4, 21, 3, 3, 3, 4, 3, 2006, '27', '40', '13', '0-900', 0, 900, 'EXTRA EARLY', '2.5-3 MONTHS', 'EARLY MATURING,DROUGHT TOLERANT ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', '', '', ''),"+
				"(266, 'KDV7', 4, 21, 3, 3, 3, 4, 3, 2006, '27', '40', '13', '0-900', 0, 900, 'EXTRA EARLY', '2.5-3.5 MONTHS', 'DROUGHT TOLERANT', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(436, 'KEMB 10', 3, 19, 5, 3, 4, 4, 5, 2001, '27', '39', '33', '1300-2000', 1300, 2000, 'EARLY', '3-4 MONTHS', 'HIGH YIELDING', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(336, 'KENYA AFYA', 2, 9, 4, 3, 7, 2, 9, 2012, '75', '75', '64', '1300-2000', 1300, 2000, 'MEDIUM', '3 - 4 MONTHS', 'CREAM GRAIN COLOUR', 'YES', '', '', 'YES', '', '', '', '', '', ''),"+
				"(310, 'KENYA ALUMASI', 2, 10, 4, 3, 2, 2, 1, 2013, '75', '75', '64', '1300-2000', 1300, 2000, '', '', 'FAIRLY TOLERANT TO LATE BLIGHT', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(9, 'KENYA BARAKA', 3, 18, 5, 4, 7, 2, 3, 1973, '27', '48', '33', '1600-2700', 1600, 2700, 'EARLY', '2.6 - 4 MONTHS', 'FAIRLY TOLERANT TO DROUGHT GOOD STORAGE QUALITY', 'YES', '', 'YES', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(10, 'KENYA CHAGUO', 3, 18, 5, 4, 7, 2, 3, 1988, '27', '48', '33', '1800-2600', 1800, 2600, 'EXTRA EARLY', '2 - 3 MONTHS', 'GOOD MASHING QUALITY', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(311, 'KENYA CHEUPE', 2, 10, 4, 3, 2, 2, 1, 2013, '75', '75', '64', '1300-2000', 1300, 2000, '', '', 'ROUND TUBERS,DARK PURPLE SKIN COLOUR,SHALLOW EYE DEPTH,WHITE FLESH COLOUR,MODERATELY RESISTANT TO LATE BLIGHT,GOOD STORABILITY,RESISTANT TO GREENING', 'YES', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(396, 'KENYA CHOZI', 4, 7, 4, 3, 7, 4, 3, 1999, '27', '47', '50', '1500-1800', 1500, 1800, 'EARLY', '3-4 MONTHS', 'DROUGHT TOLERANT', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(11, 'KENYA DHAMANA', 3, 18, 5, 4, 7, 2, 3, 1988, '27', '48', '33', '1800-2600', 1800, 2600, 'EXTRA EARLY', '2 - 3 MONTHS', 'GOOD MASHING QUALITY', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(397, 'KENYA DUMA', 4, 7, 4, 3, 7, 4, 3, 1994, '27', '47', '50', '0-1800', 0, 1800, 'EARLY', '2-3 MONTHS', 'DROUGHT TOLERANT, EARLY MATURING ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(312, 'KENYA EARLY', 2, 10, 4, 3, 3, 2, 2, 2008, '75', '75', '50', '1100-1900', 1100, 1900, 'EARLY', '2.5 - 3 MONTHS', 'LARGE GRAINS, EARLY, MODERATELY RESISTANT TO, HALO BLIGHT, ANGULAR LEAF SPOT, ANTHRACNOSE,BEAN COMMON MOSAIC VIRUS & COMMON BACTERIAL BLIGHT ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(390, 'KENYA FAHARI', 4, 7, 4, 3, 8, 4, 3, 1977, '27', '27', '50', '1800-2400', 1800, 2400, 'EARLY', '3-4 MONTHS', 'ROUND TUBERS, EARLY TUBERIZATION, LARGE SIZE TUBERS, CREAM WHITE SKIN COLOUR WITH PINK EYES, SHALLOW EYE DEPTH, CREAM WHITE FLESH COLOUR,RESISTANT TO LATE BLIGHT, GOOD STORABILITY, SHORT DORMANCY, GOOD FOR CHIPS AND MASHING, WIDE ADAPTABILITY', 'YES', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(399, 'KENYA HEROE', 4, 7, 4, 3, 7, 4, 3, 1999, '27', '47', '50', '2100-2400', 2100, 2400, 'EARLY', '3-4 MONTHS', 'HIGH YIELDING', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(400, 'KENYA IBIS', 4, 7, 4, 3, 7, 4, 5, 2007, '27', '47', '33', '1500-1800', 1500, 1800, 'EARLY', '3.5 - 4 MONTHS', 'DROUGHT TOLERANT, TOLERANT TO STEM RUST, GOOD BAKING QUALITIES ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(401, 'KENYA KINGBIRD', 4, 7, 4, 3, 7, 2, 2, 2012, '27', '47', '6,33,50', '1800-2700', 1800, 2700, 'EARLY', '3-4 MONTHS', 'RESISTANCE TO BOTH YELLOW AND STEM RUST, HIGH BIOMASS, HIGH PROTEIN CONTENT, SUITABLE FOR WHOLE GRAIN CHAPATIS AND BAKING ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(402, 'KENYA KORONGO', 4, 7, 4, 3, 7, 2, 2, 2012, '27', '47', '6,33,50', '2100-2400', 2100, 2400, 'EARLY', '3-4 MONTHS', 'WHITE HARD GRAIN, VERY HIGH FLOUR CONVERSION WITH GOOD BAKING QUALITIES, RECOMMENDED FOR DRY AREAS LIKE RONGAI AND NAIVASHA ', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(403, 'KENYA KWALE', 4, 7, 4, 3, 7, 4, 3, 1987, '27', '47', '50', '2100-2400', 2100, 2400, 'EARLY', '4 MONTHS', 'HIGH YIELDING TOLERANT TO SPROUT ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(337, 'KENYA MADINI', 2, 9, 4, 3, 7, 2, 9, 2010, '75', '75', '64', '1300-2000', 1300, 2000, 'MEDIUM', '3 - 4 MONTHS', 'GOOD CHIPPING, BOILING & MASHING QUALITY, TOLERANT TO LATE BLIGHT', 'YES', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(338, 'KENYA MAJANO', 2, 9, 4, 3, 7, 2, 9, 2011, '75', '75', '64', '1300-2000', 1300, 2000, 'MEDIUM', '3-4 MONTHS', 'YELLOW SEED, NO STONINESS', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(313, 'KENYA MAUA', 2, 10, 4, 3, 2, 2, 1, 2013, '75', '75', '64', '1300-2000', 1300, 2000, '', '', 'GREEN BOLD SEEDS, NO STONINESS.', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(394, 'KENYA MBUNI', 4, 7, 4, 3, 3, 3, 5, 1987, '27,50', '27,50', '50', '1800-2400', 1800, 2400, 'EARLY', '3-4 MONTHS', 'HIGH YIELDING', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(12, 'KENYA MPYA.', 3, 18, 5, 4, 7, 2, 3, 2010, '27', '48', '26,27', '1400-3000', 1400, 3000, 'EARLY', '3.0-3.5 MONTHS', 'OVAL /ROUND TUBERS EARLY TUBERIZATION: LARGE SIZE TUBERS CREAM WHITE SKIN COLOUR WITH PINK EYES SHALLOW EYE DEPTH CREAM WHITE FLESH COLOUR RESISTANT TO LATE BLIGHT GOOD STORABILITY SHORT DORMANCY GOOD FOR TABLE ,CHIPS AND MASHING WIDE ADAPTABILITY ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(391, 'KENYA POPO', 4, 7, 4, 3, 3, 3, 5, 1989, '27', '27', '50', '1800-2400', 1800, 2400, '', '', 'GRAIN USED AT DOUGH STAGE', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(314, 'KENYA RED KIDNEY', 2, 10, 4, 4, 3, 2, 2, 2008, '75', '75', '50', '1000-2100', 1000, 2100, 'EARLY', '2.5 - 3 MONTHS', 'LARGE GRAINS, MODERATELY RESISTANT TO HALO BLIGHT, ANGULAR LEAF SPOT, ANTHRACNOSE, BEAN COMMON MOSAIC VIRUS & COMMON BACTERIAL BLIGHT ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(315, 'KENYA SUGAR BEAN', 2, 10, 4, 3, 3, 2, 2, 2008, '75', '75', '50', '1000-1900', 1000, 1900, 'EARLY', '2.5 - 3 MONTHS', 'EARLY, LARGE GRAINS, MODERATELY RESISTANT TO HALO BLIGHT, BEAN COMMON MOSAIC VIRUS & COMMON BACTERIAL BLIGHT ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(404, 'KENYA SUNBIRD', 4, 7, 4, 3, 7, 3, 2, 2012, '27', '47', '6,33,50', '2100-2400', 2100, 2400, 'EARLY', '3-4 MONTHS', 'RESISTANCE TO BOTH YELLOW AND STEM RUST, HIGH BIOMASS, HIGH PROTEIN CONTENT,SUITABLE FOR WHOLE GRAIN CHAPATIS AND BAKING. ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(405, 'KENYA TAE', 4, 7, 4, 3, 7, 2, 2, 2011, '27', '47', '6,33,50', '2100-2400', 2100, 2400, 'EARLY', '3-4 MONTHS', 'RESISTANT TO BOTH STEM RUST AND YELLOW RUST, RED HARD GRAIN WITH HEAVY BIOMASS, MAY BE WELL ADOPTED BY FARMERS WHO USE STRAW FOR LIVESTOCK FEED. ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(392, 'KENYA TEMBO', 4, 7, 4, 3, 3, 3, 5, 1975, '27', '27', '50', '1800-2100', 1800, 2100, 'MEDIUM', '4-5 MONTHS', 'SHORT DURATION(SINGLE SEASON)', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(406, 'KENYA WREN', 4, 7, 4, 3, 7, 2, 2, 2011, '27', '47', '6,33,50', '2100-2400', 2100, 2400, 'EARLY', '3-4 MONTHS', ' RESISTANCE TO BOTH YELLOW AND STEM RUST DISEASES, LARGE RED HARD GRAIN WITH EXCELLENT FLOUR CONVERSION, HIGH PROTEIN ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(74, 'KH125- 02 MDR', 4, 3, 2, 3, 7, 1, 9, 2012, '27', '40', '64', '1200-1600', 1200, 1600, 'EARLY', '4 MONTHS', 'HIGH YIELD, RESISTANCE TO GREY LEAF SPOT, MAIZE STREAK VIRUS', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(75, 'KH125-01SG', 4, 3, 2, 3, 4, 2, 9, 2010, '27', '40', '16', '900-1400', 900, 1400, 'EARLY', '4 MONTHS', 'WIDE ADAPTATION, STAY GREEN, HIGH YIELD, RESISTANCE TO GREY LEAF SPOT, MAIZE STREAK VIRUS', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(77, 'KH125-03SG', 4, 3, 2, 3, 4, 2, 9, 2010, '27', '40', '16', '900-1400', 900, 1400, 'EARLY', '4 MONTHS', 'DROUGHT TOLERANT, HIGH YIELD, RESISTANCE TO GREY LEAF SPOT, MAIZE STREAK VIRUS, STAY GREEN', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(81, 'KH414-04SBR', 4, 3, 2, 3, 7, 4, 9, 2007, '27', '40', '64', '900-1400', 900, 1400, 'EARLY', '4 MONTHS', 'STEM BORER RESISTANT', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(44, 'KH634A', 4, 3, 2, 3, 7, 1, 9, 2009, '27', '30', '64', '1400-1800', 1400, 1800, 'EARLY', '3-5 MONTHS', 'RESISTANT TO BLIGHT, GREY LEAF SPOT', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(296, 'KK 15 (MLB49/879)', 2, 10, 4, 3, 4, 4, 3, 1997, '27', '35', '10,16,33', '1500-1800', 1500, 1800, 'EARLY', '2.5 - 3 MONTHS', 'RESISTANT TO ROOT ROT, GOOD COOKING QUALITY', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(298, 'KK 8 (SCAM-80/15)', 2, 10, 4, 3, 4, 4, 3, 1997, '27', '35', '9,10,16,21,33,56', '1500-1800', 1500, 1800, 'EARLY', '2.5 - 3 MONTHS', 'RESISTANT TO ROOT ROT, GOOD COOKING QUALITY', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(255, 'KK SYN-1', 4, 21, 3, 3, 3, 1, 9, 2004, '27', '39', '72', '1500-1800', 1500, 1800, 'EARLY', '3-4 MONTHS', 'WIDE ADAPTABILITY,RESPONSIVE TO LOW INPUT ENVIRONMENT, RESISTANT TO MAIZE STREAK VIRUS', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(256, 'KK SYN-2', 4, 21, 3, 3, 3, 4, 9, 2004, '27', '39', '72', '1500-1800', 1500, 1800, 'EARLY', '3-4 MONTHS', 'WIDE ADAPTABILITY,RESPONSIVE TO LOW INPUT ENVIRONMENT, RESISTANT TO MAIZE STREAK VIRUS', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(419, 'KME2', 3, 17, 5, 3, 7, 1, 3, 2010, '27', '40', '33', '200 - 2000', 200, 2000, 'EARLY', '8-10 MONTHS', 'RESISTANT TO CASSAVA MOSAIC DISEASE,EARLY MATURING, LOW CYANIDE,SWEET, RESISTANT TO CASSAVA MOSAIC VIRUS, POUNDABLE ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(420, 'KME3', 3, 17, 5, 3, 7, 1, 3, 2010, '27', '40', '33', '200 - 2000', 200, 2000, 'EARLY', '8-10 MONTHS', 'RESISTANT TO CASSAVA MOSAIC DISEASE,EARLY MATURING, LOW CYANIDE,SWEET,POUNDABLE ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(421, 'KME4', 3, 17, 5, 3, 7, 1, 3, 2010, '27', '40', '33', '200 - 2000', 200, 2000, 'EARLY', '8-10 MONTHS', 'RESISTANT TO CASSAVA MOSAIC DISEASE,EARLY MATURING, LOW CYANIDE,SWEET, RESISTANT TO CASSAVA MOSAIC VIRUS,POUNDABLE ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(411, 'KS SIMBA', 4, 7, 4, 3, 8, 2, 2, 2007, '50', '50', '50', '1500-2400', 1500, 2400, 'EARLY', '3-4 MONTHS', 'SUITABLE FOR BOTH MARGINAL AND HIGH POTENTIAL AREAS,GOOD BAKING QUALITY ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(142, 'KS-DH14', 4, 3, 2, 3, 8, 1, 9, 2008, '50', '50', '50', '800-1300', 800, 1300, 'EARLY', '3.5 -4.5 MONTHS', 'DROUGHT TOLERANT, LODGING RESISTANT,STAYS GREEN', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(362, 'KS-SORG1', 4, 6, 2, 3, 8, 3, 9, 2013, '50', '50', '50', '0-1750', 0, 1750, 'EARLY', '2.5-3 MONTHS', 'DUAL PURPOSE, TOLERANT TO RUST AND COLD', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(353, 'KSBH01', 4, 6, 3, 3, 4, 3, 9, 2013, '27', '36', '21', '0-1500', 0, 1500, '', '', 'THIS IS A HYBRID SORGHUM, BROWN LARGE SEED, SWEET STEMS (15+%BRIX WHICH INCREASES AFTER HARVESTING HEADS), HIGH EXTRACTABLE STARCH (77.4%), DROUGHT TOLERANCE, EARLY MATURING ', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(140, 'KSD-01', 4, 3, 2, 3, 8, 1, 9, 2013, '50', '50', '50', '800-1300', 800, 1300, 'EXTRA EARLY', '2-3 MONTHS', 'DROUGHT, BLIGHT AND GREY LEAF SPOT TOLERANT, OPEN POLLINATED VARIETY', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(437, 'KSP 20 (WANJUGU)', 3, 19, 5, 3, 4, 4, 5, 2002, '27', '39', '33', '250-1750', 250, 1750, 'EARLY', '3-4 MONTHS', 'HIGH CAROTENE LEVELS RED SKINNED', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(443, 'KSP0047', 3, 19, 5, 3, 4, 4, 5, 0, '27', '40', '33', '800-1000', 800, 1000, 'EARLY', '3-4 MONTHS', 'LIGHT ORANGE FLESHED, HIGH CAROTENE CONTENT', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(444, 'KSP0072', 3, 19, 5, 3, 4, 4, 5, 2010, '27', '40', '33', '800-1000', 600, 1800, 'EARLY', '3-4 MONTHS', 'LIGHT ORANGE FLESHED, HIGH CAROTENE CONTENT', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(445, 'KSP0084', 3, 19, 5, 3, 4, 4, 5, 2010, '27', '40', '33', '800-1000', 600, 1800, 'EARLY', '3-4 MONTHS', 'HIGH BETA-CAROTENE, LIGHT ORANGE FLESHED,', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(446, 'KSP0154', 3, 19, 5, 3, 4, 4, 5, 2010, '27', '40', '33', '800-1000', 600, 1800, 'EARLY', '3-4 MONTHS', 'LIGHT ORANGE FLESHED, HIGH CAROTENE CONTENT', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(254, 'KSTP 94', 4, 21, 3, 3, 3, 4, 9, 2000, '27', '30', '64', '1350-1800', 1350, 1800, 'EARLY', '4 MONTHS', 'TOLERANT TO STRIGA', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(281, 'KUNDE 1', 2, 11, 4, 3, 8, 4, 5, 0, '79', '79', '50,79', '0-2000', 0, 2000, 'EARLY', '2.5 - 3 MONTHS', 'DUAL PURPOSE', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(159, 'LAGROTECH EARLY', 4, 3, 2, 3, 8, 1, 9, 2003, '55', '55', '55', '0-1500', 0, 1500, 'EARLY', '2.7-3.5 MONTHS', 'GOOD EAR COVER , EARLY MATURING, STRIGA TOLERANT, DROUGHT ESCAPING', 'YES', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(272, 'LDT 0069', 2, 8, 4, 3, 8, 1, 1, 2010, '56', '24,56', '56', '500 - 2000', 500, 2000, 'EARLY', '3 MONTHS', ' RESISTANT TO FUSARIUM WILT,SMALL BROWN GRAIN. ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(349, 'LEGIO', 4, 6, 1, 3, 7, 1, 9, 2008, '27', '27', '33', '1000-2000', 1000, 2000, 'EARLY', '4 MONTHS', 'HIGH YIELD', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(280, 'MACHAKOS 66 (M66)', 2, 11, 4, 3, 4, 4, 5, 1998, '27', '40', '13,33,56', '1200-1500', 1200, 1500, 'EARLY', '2.5-3 MONTHS', 'DUAL PURPOSE,DEEP GREEN MID RIBS ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(160, 'MASENO DOUBLE COBBER', 4, 3, 2, 3, 8, 1, 9, 2002, '55', '55', '64', '1000-1600', 1000, 1600, 'EARLY', '3 - 4 MONTHS', 'PROLIFIC-FREQUENCY OF 30-80%, FLINT KERNELS', 'YES', '', '', 'YES', '', '', '', '', '', ''),"+
				"(286, 'MBAAZI 1', 2, 15, 4, 3, 4, 2, 3, 1998, '27', '40', '13,33', '600-900', 600, 900, 'EARLY', '3 - 4 MONTHS', 'SHORT DURATION(SINGLE SEASON) ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', '', '', ''),"+
				"(287, 'MBAAZI 3', 2, 15, 4, 3, 7, 3, 8, 0, '27', '40', '64', '10-1500', 10, 1500, 'EXTRA EARLY', '3-3.5 MONTHS', '17.8% OIL CONTENT', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(305, 'MBIGO', 2, 10, 4, 3, 7, 4, 2, 2013, '27', '38', '64', '1,200-1,600', 1200, 1600, 'MEDIUM', '3-4 MONTHS', '22% OIL CONTENT', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(21, 'MH 401 TOSHEKA', 4, 3, 2, 3, 8, 1, 9, 2013, '14', '14', '14', '900-1400', 900, 1400, 'EARLY', '3-3.5 MONTHS', 'LOW UNIFORM COB POSITIONING (EAR PLACEMENT), EAR DROOPING WHEN MATURE,WHITE SEMI DENT GRAINS (KERNELS), STAY GREEN TRAIT (STOVER), RESISTANT TO GREY LEAF SPOT , MAIZE STREAK VIRUS , RUST AND TURCICUM,LEAF BLIGHT RESISTANT,MOISTURE STRESS (DROUGHT) TOLERAN', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(317, 'MIEZI MBILI', 2, 10, 4, 3, 3, 2, 2, 2008, '75', '75', '50', '1000-2000', 1000, 2000, 'EARLY', '2.5 - 3 MONTHS', 'LARGE GRAINS, EARLY, RESISTANT TO FLOURY LEAF SPOT, HALO BLIGHT, ANGULAR LEAF SPOT,ANTHRACNOSE, BEAN COMMON MOSAIC VIRUS & COMMON BACTERIAL BLIGHT ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(447, 'MTWAPA 8', 3, 19, 5, 3, 4, 4, 5, 1998, '27', '44', '33', '0-1500', 0, 1500, 'EARLY', '3.5 MONTHS', 'LOW FIBRE, HIGH BETA CAROTENE', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(422, 'MUCERICERI', 3, 17, 5, 3, 7, 1, 1, 2000, '27', '40', '33', '250-1750', 250, 1750, 'MEDIUM', '12-14 MONTHS', '17% OIL CONTENT', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(292, 'MWEZI MOJA (GLP1004)', 2, 10, 4, 3, 4, 4, 5, 1982, '27,50', '27', '14,50', '1200-1600', 1200, 1600, 'EARLY', '2 - 3 MONTHS', 'GOOD PERFORMANCE IN DRY AREAS, EARLY MATURING ,TOLERANT TO DROUGHT AND BEAN FLY ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(293, 'MWITEMANIA(GLP 92)', 2, 10, 4, 3, 4, 2, 3, 1982, '27,50', '27', '14,50', '900-1600', 900, 1600, 'EARLY', '2-3 MONTHS', 'DROUGHT TOLERANT', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(342, 'N 22', 2, 20, 4, 3, 7, 3, 5, 1998, '27', '40', '33', '10-1600', 10, 1600, 'EARLY', '2.5 - 3 MONTHS', 'YELLOW SEED, NO STONINESS ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(343, 'N 26', 2, 20, 4, 3, 4, 2, 3, 1998, '27', '40', '13,14,19,33,56', '10-1600', 10, 1600, 'EARLY', '2.5 - 3 MONTHS', 'GREEN BOLD SEEDS, NO STONINESS. ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(380, 'NERICA 10', 4, 4, 4, 3, 4, 4, 5, 2009, '27', '46', '50', '1400-1800', 1400, 1800, 'LATE', '3.5-6.7 MONTHS', 'LONG GRAINS,BLAST TOLERANT ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(381, 'NERICA 11', 4, 4, 4, 3, 4, 4, 5, 2009, '27', '46', '50', '1400-1800', 1400, 1800, 'MEDIUM', '3-5 MONTHS', 'HIGH RATOONING ABILITY, LONG GRAINS, TOLERANT TO BLAST, DROUGHT ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(294, 'NEW MWEZI MOJA (GLP1127)', 2, 10, 4, 3, 4, 3, 8, 1982, '27', '27', '14', '1200-1600', 1200, 1600, '', '', 'LIGHT ORANGE FLESHED, HIGH ß CAROTENE CONTENT', 'YES', '', '', 'YES', '', '', '', '', '', ''),"+
				"(318, 'NEW ROSE COCO', 2, 10, 4, 3, 3, 2, 2, 2008, '75', '75', '50', '1100-2000', 1100, 2000, 'EARLY', '2.5 - 3 MONTHS', 'UPRIGHT GROWTH HABIT, EARLY MATURING, MODERATE RESISTANCE TO RUST, COMMON BACTERIAL BLIGHT,ANGULAR LEAF SPOT, ANTHRACNOSE, BEAN COMMON MOSAIC VIRUS & NECROTIC VIRUS,LARGE GRAINS ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(271, 'NGARA LOCAL', 2, 8, 4, 3, 4, 4, 2, 2013, '15', '15', '19,56,66', '600-1200', 600, 1200, 'EARLY', '3 MONTHS', 'RESISTANT TO FUSARIUM WILT,SMALL BROWN GRAIN. ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(407, 'NJORO 2', 4, 7, 4, 3, 7, 2, 3, 2001, '27', '47', '50', '1800-2400', 1800, 2400, 'EARLY', '3-4 MONTHS', 'TOLERANT TO ACID SOIL, RESISTANT TO LODGING ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(372, 'P-224', 4, 1, 3, 3, 4, 4, 5, 1981, '27', '39', '33,50', '1150-1750', 1150, 1750, 'EARLY', '3-4 MONTHS', 'TOLERANT TO LODGING AND BLAST ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(206, 'P2859W', 4, 3, 2, 3, 8, 2, 3, 2007, '71', '71', '71', '1200-1600', 1200, 1600, 'EARLY', '3-4 MONTHS', 'DROUGHT TOLERANT, RESISTANT TO GREY LEAF SPOT, MAIZE STREAK VIRUS, LEAF BLIGHT, COMMON RUST, LOW SOIL NITROGEN, GOOD STANDABILITY', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(172, 'PAN 4M-17', 4, 3, 2, 3, 8, 1, 1, 2008, '70', '70', '70', '900-1500', 900, 1500, 'EARLY', '3-4 MONTHS', 'FLINT, DROUGHT TOLERANT, EARLY MATURING,', 'YES', '', '', 'YES', '', '', '', '', '', ''),"+
				"(173, 'PAN 4M-19', 4, 3, 2, 3, 8, 1, 3, 2008, '70', '70', '70', '900-1500', 900, 1500, 'EARLY', '3-4 MONTHS', 'FLINT, DROUGHT TOLERANT,PROLIFIC, EARLY MATURING, FAST DRY DOWN, GOOD STANDABILITY ', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(174, 'PAN 4M-21', 4, 3, 2, 3, 8, 1, 3, 2005, '70', '70', '70', '1000-1500', 1000, 1500, 'EARLY', '3-4 MONTHS', 'DROUGHT TOLERANT,FLINT GRAIN,GOOD HUSK COVER, DOUBLE COBBER,EARLY MATURING', 'YES', '', '', 'YES', '', '', '', '', '', ''),"+
				"(190, 'PAN 99', 4, 3, 2, 4, 8, 1, 1, 2001, '70', '70', '70', '1000-2000', 1000, 2000, 'MEDIUM', '5-6 MONTHS', 'GREY LEAF SPOT TOLERANT DROUGHT TOLERANT', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(191, 'PEX 501', 4, 3, 2, 3, 8, 1, 1, 2012, '70', '70', '70', '1200-1700', 1200, 1700, 'MEDIUM', '4-4.5 MONTHS', 'VERY GOOD TOLERANCE TO LEAF DISEASES-BLIGHT, GREY LEAF SPOT, RUST, MAIZE STREAK VIRUS, TOLERANCE TO COB ROTS THEREFORE MORE USABLE EARS, DROUGHT TOLERANT.', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(154, 'PH1', 4, 3, 2, 3, 8, 2, 3, 1989, '50', '50', '50', '0-1200', 0, 1200, 'LATE', '6-8 MONTHS', 'TOLERANT TO LODGING,STRONG STALKS, DROUGHT TOLERANT', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', '', '', ''),"+
				"(408, 'ROBIN', 4, 7, 4, 3, 7, 4, 3, 2010, '27', '47', '33,50', '2100-2400', 2100, 2400, 'EARLY', '3.5 MONTHS', ' RESISTANT TO STEM RUST (UG99 STRAIN), EARLY MATURING AND WIDE ADAPTABILITY, LARGE GRAINS WITH A TEST WEIGHT OF 48G/1000KENNELS, HIGH PROTEIN CONTENT (12.5) AND GOOD MILLING QUALITIES', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(295, 'ROSECOCO (GLP 2)', 2, 10, 4, 3, 4, 2, 3, 1982, '27,50', '27', '14,50', '1500-2000', 1500, 2000, 'EARLY', '2 - 3 MONTHS', 'HIGH YIELD, WIDE ADAPTATION, ATTRACTIVE SEED COLOUR, GOOD TASTE ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(15, 'ROSLIN BVUMBWE', 3, 18, 5, 4, 7, 4, 5, 1974, '27', '48', '33', '1800-2600', 1800, 2600, 'EXTRA EARLY', '2 - 3 MONTHS', 'GOOD CHIPPING QUALITY', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(16, 'ROSLIN EBURU (B53)', 3, 18, 5, 4, 7, 3, 8, 1953, '27', '48', '33', '2000-2800', 2000, 2800, 'MEDIUM', '4 - 4.8 MONTHS', 'DROUGHT TOLERANT', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(17, 'ROSLIN TANA', 3, 18, 5, 4, 7, 4, 5, 1974, '27', '48', '33', '1800-2600', 1800, 2600, 'EXTRA EARLY', '2 - 3 MONTHS', 'GOOD CHIPPING QUALITY', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(4, 'RUDOLPH', 3, 18, 5, 3, 8, 4, 9, 2013, '5', '5', '5', '1800-2600', 1800, 2600, 'EARLY', '4 MONTHS', 'RESISTANT TO RUSSIAN WHEAT APHID', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(274, 'SAINA-K1', 2, 8, 4, 3, 7, 4, 2, 2012, '27', '40', '19,56,66', '600-1200', 600, 1200, 'MEDIUM', '3-4 MONTHS', 'LARGE SEEDED - KABULI TYPE, GROWS WITH RESIDUE SOIL MOISTURE AND IN BLACK COTTON SOILS, DROUGHT TOLERANT, HIGH YIELDING, FIXES NITROGEN 20-40KG/HA,BIOMASS, BREAKS DISEASE CYCLES MAINLY RUSTS,WHITE SEEDED, SUITABLE FOR FRESHSALADS, GREEN PODS ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(209, 'SC DUMA 41', 4, 3, 2, 3, 8, 2, 3, 2004, '73', '73', '7', '800-1800', 800, 1800, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO EAR ROT, RUST, MAIZE STREAK VIRUS, MOTTLE VIRUS,DROUGHT TOLERANT, EARLY MATURING', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(210, 'SC DUMA 43', 4, 3, 2, 3, 8, 2, 3, 2004, '73', '73', '7', '800-1800', 800, 1800, 'MEDIUM', '4-5 MONTHS', 'RESISTANT TO EAR ROT, RUST,MAIZE STREAK VIRUS, DROUGHT ,EARLY MATURING ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(211, 'SC DUMA 45', 4, 3, 2, 3, 8, 2, 9, 2013, '73', '73', '7', '400-1200', 400, 1200, 'EARLY', '3 -3.5 MONTHS', 'DROUGHT TOLERANCE,TOLERANT TO AIR BORNE DISEASES,GREY LEAF SPOT, HEAT TOLERANT AND RUST', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(212, 'SC DUMA 47', 4, 3, 2, 3, 8, 2, 9, 2013, '73', '73', '7', '400-1200', 400, 1200, 'EARLY', '3-3.5 MONTHS', 'DROUGHT TOLERANT,TOLERANT TO AIR BORNE DISEASESGLS, HEAT TOLERANT, RUST', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(213, 'SC PUNDA MILIA 51', 4, 3, 2, 3, 8, 1, 1, 2006, '73', '73', '7', '800-1600', 800, 1600, 'MEDIUM', '4-4.5 MONTHS', 'TOLERANT TO GREY LEAF SPOT & MAIZE STREAK VIRUS,GOOD STANDABILITY, WIDE ADAPTABILITY', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(216, 'SC SIMBA 63', 4, 3, 2, 3, 8, 1, 1, 2005, '73', '73', '7', '1200-1800', 1200, 1800, 'MEDIUM', '4-5 MONTHS', 'DROUGHT TOLERANT,TOLERANT TO GREY LEAF SPOT,MAIZE STREAK VIRUS, BLIGHT AND EAR ROT', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(221, 'SC05C8480', 4, 3, 2, 3, 8, 1, 1, 2012, '73', '73', '7', '900-1400', 900, 1400, 'EARLY', '4months', 'GOOD STANDABILITY,HARD DENT(INTERMEDIATE TO SEMI DENT), GOOD TIP COVER,MID PLANT COB PLACEMENT,TOLERANT TO GREY LEAF SPOT, HEAT TOLERANT AND RUST,HIGH SHELLING PERCENTAGE,DROUGHT TOLERANCE,TOLERANCE OF COB DISEASES - DIPLODIA & FUSARIUM,HIGHYIELDS - AVERA', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(357, 'SEREDO', 4, 6, 3, 3, 7, 2, 3, 1970, '27,50', '27,50', '13,50', '0-1750', 0, 1750, 'EARLY', '4 MONTHS', 'WIDE ADAPTABILITY', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(358, 'SERENA', 4, 6, 3, 3, 7, 2, 3, 1970, '27,50', '27,50', '50', '0-1750', 0, 1750, 'EARLY', '3 MONTHS', 'WIDE ADOPTABILITY', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(427, 'SHIBE', 3, 17, 5, 3, 7, 4, 3, 2008, '27', '44', '33', '15-1200', 15, 1200, 'EARLY', '8-12 MONTHS', 'TOLERANT TO CASSAVA BROWN STREAK,STRAIGHT STEMS,IDEAL FOR INTERCROPPING ', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(365, 'SILA', 4, 6, 3, 3, 8, 2, 5, 2006, '73', '73', '7', '0-1800', 0, 1800, 'EARLY', '3-3.5 MONTHS', 'DUAL PURPOSE', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', ''),"+
				"(415, 'SIRI', 3, 17, 5, 3, 7, 1, 1, 2008, '27', '27', '33', '15-1200', 15, 1200, 'EARLY', '8-12 MONTHS', 'RESISTANT TO CASSAVA MOSAIC VIRUS, TOLERANT TO CASSAVA BROWN STREAK, VERY SHORT, NO BRANCHES ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(440, 'SPK 004', 3, 19, 5, 3, 4, 4, 5, 2001, '27', '39', '33', '1300-2000', 1300, 2000, 'EARLY', '3-4 MONTHS', 'HIGH BETA-CAROTENE ,LIGHT ORANGE FLESHED, HIGH CAROTENE CONTENT, DUO PURPOSE', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(319, 'SUPER ROSE COCO', 2, 10, 4, 4, 3, 2, 2, 2008, '75', '75', '16', '1000-2100', 1000, 2100, 'EARLY', '2.5 - 3 MONTHS', 'MEDIUM MATURING, MODERATELY RESISTANT TO HALO BLIGHT, ANGULAR LEAF SPOT, ANTHRACNOSE, BEAN COMMON MOSAIC VIRUS & COMMON BACTERIAL BLIGHT ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(428, 'TAJIRIKA', 3, 17, 5, 3, 7, 4, 3, 2008, '27', '44', '33', '15-1200', 15, 1200, 'EARLY', '8 MONTHS', 'RESISTANT TO CASSAVA MOSAIC VIRUS, TOLERANT TO CASSAVA BROWN STREAK,STRAIGHT STEMS IDEAL FOR INTERCROPPING ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(290, 'TASHA', 2, 10, 4, 3, 4, 2, 3, 2008, '15', '15', '19,50,56,66', '1500-2000', 1500, 2000, 'EARLY', '2.5 - 3.5 MONTHS', '', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'ISIOLO,MARSABIT,MERU,KITUI,MACHAKOS,MAKUENI,KIAMBU,TURKANA,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(19, 'TIGONI', 3, 18, 5, 4, 7, 2, 3, 1998, '27', '48', '6,33', '1800-2600', 1800, 2600, 'EARLY', '3-4 MONTHS', 'GOOD CHIPPING, BOILING,MASHING QUALITY, TOLERANT TO LATE BLIGHT ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MACHAKOS,MERU,EMBU,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,HOMA BAY,KISII,NYAMIRA'),"+
				"(41, 'UA KAYONGO 2', 4, 3, 2, 3, 7, 3, 9, 2007, '27', '29', '64', '1000-1500', 1000, 1500, 'MEDIUM', '4-5 MONTHS', 'DIPLODIA & FUSARIUM, HIGH YIELDS -AVERAGE OF 8-10 TONNES PER HA,MAIZE STREAK VIRUS TOLERANCE, UNIFORM COB PLACEMENT -EASY FOR COMBINE HARVESTER,TOLERANT TO GREY LEAF VIRUS AND MAIZE STREAK VIRUS,DROUGHT TOLERANT, GOOD EAR PLACEMENT', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(308, 'WAIRIMU DWARF', 2, 10, 4, 3, 8, 2, 3, 2008, '50', '74', '50,74', '500', 500, 1700, 'EARLY', '2.5 - 2.8 MONTHS', 'EARLY MATURING, HEAT TOLERANT, GOOD FOR MAIZE INTERCROPPING, EXCELLENT COOKING QUALITIES ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', '', '', ''),"+
				"(88, 'WE1101 ', 4, 3, 2, 3, 4, 2, 2, 2013, '27', '40', '13,16,19,67,76', '800-1200', 800, 1200, 'MEDIUM', '4.5 MONTHS', ' DROUGHT TOLERANT, RESISTANT TO MAIZE STREAK VIRUS AND GREY LEAF SPOT ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', '', '', ''),"+
				"(225, 'WH 101', 4, 3, 2, 2, 8, 1, 1, 2006, '79', '79', '79', '', 0, 0, 'EARLY', '3.5-4 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS, GREY LEAF SPOT & BLIGHT, TOLERANT TO DROUGHT AND LOW NITROGEN,SUITABLE FOR 2ND SEASON PLANTING', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(226, 'WH 105', 4, 3, 2, 3, 8, 2, 3, 2010, '79', '79', '79', '0-1500', 0, 1500, 'EARLY', '3.5-4 MONTHS', 'TOLERANT TO MSV, GLS, TOLERANT TO DROUGHT, SUITABLE FOR 2ND SEASON PLANTING', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(227, 'WH 401', 4, 3, 2, 2, 8, 1, 1, 2006, '79', '79', '79', '', 0, 0, 'MEDIUM', '4-5 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS, GREY LEAF SPOT AND BLIGHT, TOLERANT TO DROUGHT AND LOW NITROGEN.', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(229, 'WH 502', 4, 3, 2, 3, 8, 2, 3, 2003, '79', '79', '79', '1000-1700', 1000, 1700, 'MEDIUM', '4 - 5 MONTHS', ' TOLERANT TO MAIZE STREAK VIRUS, TOLERANT TO GREY LEAFSPOT, NORTHERN LEAF BLIGHT,STRIGA, DROUGHT AND LOW SOIL NITROGEN ', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(230, 'WH 504', 4, 3, 2, 3, 8, 2, 3, 2003, '79', '79', '79', '1000-1700', 1000, 1700, 'MEDIUM', '4.5-5.5months', 'TOLERANT TO MAIZE STREAK VIRUS, GREY LEAFSPOT AND NORTHERN LEAF BLIGHT, GREEN STEMS AT HARVEST, SUITABLE FOR ANIMAL FODDER, TOLERANT TO DROUGHT AND LOW SOIL NITROGEN', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(232, 'WH 507', 4, 3, 2, 2, 8, 1, 1, 2006, '79', '79', '79', '1000-1600', 1000, 1600, 'MEDIUM', '4-5 MONTHS', 'TOLERANT TO MOSAIC STREAK VIRUS , GREY LEAF SPOT AND BLIGHT, TOLERANT TO DROUGHT,TOLERANT TO LOW NITROGEN ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(233, 'WH 508', 4, 3, 2, 2, 8, 2, 3, 2006, '79', '79', '79', '1000-1500', 1000, 1500, 'MEDIUM', '5-6 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS, GREY LEAFSPOT AND BLIGHT, TOLERANT TO DROUGHT AND LOW NITROGEN, EVER GREEN STEMS AT HARVEST', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(237, 'WH002', 4, 3, 2, 2, 8, 2, 3, 2008, '79', '79', '79', '', 0, 0, 'MEDIUM', '4.5-5.5 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS, GREY LEAFSPOT AND BLIGHT, TOLERANT TO DROUGHT AND LOW NITROGEN, SUITABLE FOR 2ND SEASON PLANTING.', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(238, 'WH003', 4, 3, 2, 3, 8, 1, 1, 2010, '79', '79', '79', '0-1000', 0, 1000, 'EARLY', '3 - 4 MONTHS', ' TOLERANT TO MAIZE STREAK VIRUS, GREY LEAFSPOT,GOOD TOLERANCE TO DROUGHT AND LOW NITROGEN', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(239, 'WH202', 4, 3, 2, 3, 8, 2, 3, 2010, '79', '79', '79', '0-1500', 0, 1500, 'MEDIUM', '4.0-5.0 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS, GREY LEAF SPOT, DROUGHT AND LOW NITROGEN, GOOD 2ND SEASON CROP IN MEDIUM ALTITUDES.', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(240, 'WH301', 4, 3, 2, 3, 8, 1, 1, 2008, '79', '79', '79', '1200-1800', 1200, 1800, 'MEDIUM', '4-5 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS, GREY LEAFSPOT AND BLIGHT, TOLERANT TO DROUGHT AND LOW NITROGEN, SUITABLE FOR GREEN MAIZE', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(241, 'WH302', 4, 3, 2, 2, 8, 1, 1, 2008, '79', '79', '79', '', 0, 0, 'MEDIUM', '4-5 MONTHS', 'V. GOOD TOLERANCE TO MAIZE STREAK VIRUS, GREY LEAFSPOT.GOOD TOLERANCE TO DROUGHT AND LOW NITROGEN.SUITABLE FOR SHORT 2ND SEASON PLANTING.', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(248, 'WS 103', 4, 3, 2, 2, 8, 2, 3, 2006, '79', '79', '79', '', 0, 0, 'EARLY', '3-4 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS, GREY LEAFSPOT, NORTHERN BLIGHT, DROUGHT AND LOW SOIL NITROGEN', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(249, 'WS 202', 4, 3, 2, 3, 8, 2, 3, 2004, '79', '79', '79', '0-1500', 0, 1500, 'EARLY', '3-4 MONTHS', 'RESISTANT TO MAIZE STREAK VIRUS, GREY LEAFSPOT,DROUGHT TOLERANT, LOW SOIL NITROGEN', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(250, 'WS 303', 4, 3, 2, 3, 8, 1, 1, 2010, '79', '79', '79', '0-1500', 0, 1500, 'MEDIUM', '4-5 MONTHS', 'TOLERANT TO MAIZE STREAK VIRUS, GREY LEAFSPOT AND RUST ,TOLERANT TO DROUGHT AND LOW NITROGEN, RESISTANT TO STRIGA ', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,MANDERA,MARSABIT,ISIOLO,MERU,KITUI,TURKANA,SAMBURU,KAJIADO,WAJIR', '', '', '', ''),"+
				"(204, 'X6C461W', 4, 3, 2, 3, 8, 2, 9, 2012, '71', '71', '71', '1000-1600', 1000, 1600, 'EARLY', '3-4months', ' RESISTANT TO GRAY LEAF SPOT,VERY GOOD STABILITY ACROSS ENVIRONMENTS,GOOD PERFORMANCE IN DROUGHT CONDITIONS & LOW NITROGEN ENVIRONMENTS, IMPROVED STANDABILITY', 'YES', 'YES', '', '', '', '', '', '', '', '');";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function swa_cropvarieties_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_seedchoice_seedworks_combined_swa ( "+
					"sw_id INTEGER PRIMARY KEY AUTOINCREMENT,"+
					"sw_variety varchar(255),"+
					"category_id INTEGER(11),"+
					"crop_id INTEGER(11),"+
					"seedtype_id INTEGER(11),"+
					"season_id INTEGER(11),"+
					"license_type_id INTEGER(11),"+
					"comm_potential_id INTEGER(11),"+
					"comm_level_id INTEGER(11),"+
					"sw_releaseyr INTEGER(11),"+
					"sw_breed_institution varchar(255),"+
					"sw_maintainer varchar(255),"+
					"sw_comm_agent varchar(255),"+
					"sw_alt_optimal varchar(255),"+
					"sw_alt_min INTEGER(11),"+
					"sw_alt_max INTEGER(11),"+
					"sw_maturity varchar(255),"+
					"sw_maturity_age varchar(50),"+
					"sw_special_attrib varchar(255),"+
					"sw_drought_tolerant varchar(10),"+
					"sw_disease_tolerant varchar(10),"+
					"sw_storage_pest_resistant varchar(10),"+
					"sw_consumer_preferences varchar(10),"+
					"county TEXT,"+
					"lowland TEXT,"+
					"lowland_transitional TEXT,"+
					"mid_altitude TEXT,"+
					"highland_transitional TEXT,"+
					"highland TEXT "+ 
				");";

			var populatetablesql = "INSERT OR IGNORE INTO default_sid_seedchoice_seedworks_combined_swa (sw_id, sw_variety, category_id, crop_id, seedtype_id, season_id, license_type_id, comm_potential_id, comm_level_id, sw_releaseyr, sw_breed_institution, sw_maintainer, sw_comm_agent, sw_alt_optimal, sw_alt_min, sw_alt_max, sw_maturity, sw_maturity_age, sw_special_attrib, sw_drought_tolerant, sw_disease_tolerant, sw_storage_pest_resistant, sw_consumer_preferences, county, lowland, lowland_transitional, mid_altitude, highland_transitional, highland) VALUES "+
				"(2, 'ARIZONA', 3, 18, 5, 3, 8, 2, 9, 2013, '5', '5', '5', '1800-2600', 1800, 2600, 'EARLY', '3-3.5', 'INAHIMILI UGONJWA WA KUNYAUKA MAJANI,INAKOMAA HARAKA, CYANIDE YA CHINI,TAMU, INATWANGIKA KWA URAHISI', 'YES', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(3, 'ARNOVA', 3, 18, 5, 3, 8, 2, 9, 2013, '5', '5', '5', '1800-2600', 1800, 2600, '', '', 'INA KIWANGO CHA CHINI CHA SUMU YA CYANIDE', '', '', '', '', '', '', '', '', '', ''),"+
				"(4, 'RUDOLPH', 3, 18, 5, 3, 8, 4, 9, 2013, '5', '5', '5', '1800-2600', 1800, 2600, 'EARLY', '4', 'INAHIMILI UGONJWA WA RUSSIAN WHEAT APHID', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(5, 'ANETT', 3, 18, 5, 4, 7, 2, 3, 1972, '27', '48', '33', '1400-2400', 1400, 2400, 'EXTRA EARLY', '2.5 - 3', 'INAHIMILI UGONJWA WA KUNYAUKA MAJANI KIASI', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(6, 'ASANTE', 3, 18, 5, 3, 4, 2, 3, 1998, '27', '48', '6,33', '1800-2600', 1800, 2600, 'EARLY', '3-4', 'MIZIZI YA UMBO LA MVIRINGO,RANGI YA ZAMBARAU,MACHO YA KIMA CHA KADRI,NDANI NI RANGI NYEUPE,INAHIMILI KWA KIASI UGONJWA WA KUNYAUKA MAJANI,INAHIFADHIKA VIZURI,HAIBADILIKI KWA URAHISI RANGI YA KIJANI KIBICHI', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(7, 'DESIREE', 3, 18, 5, 4, 7, 2, 3, 1972, '27', '48', '33', '1800-2600', 1800, 2600, 'MEDIUM', '4 - 5', 'INAHIFADHIKA VIZURI', '', '', 'YES', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(8, 'DUTCH ROBIJN', 3, 18, 5, 4, 7, 2, 3, 0, '27', '48', '33', '1600-2600', 1600, 2600, 'MEDIUM', '4-5', 'INAHIFADHIKA VIZURI NA RAHISI KUCHONGA KACHIRI', '', '', 'YES', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(9, 'KENYA BARAKA', 3, 18, 5, 4, 7, 2, 3, 1973, '27', '48', '33', '1600-2700', 1600, 2700, 'EARLY', '2.6 - 4', 'INAHIMILI UKAME', 'YES', '', 'YES', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(10, 'KENYA CHAGUO', 3, 18, 5, 4, 7, 2, 3, 1988, '27', '48', '33', '1800-2600', 1800, 2600, 'EXTRA EARLY', '2 - 3', 'INAPONDEKA VIZURI', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(11, 'KENYA DHAMANA', 3, 18, 5, 4, 7, 2, 3, 1988, '27', '48', '33', '1800-2600', 1800, 2600, 'EXTRA EARLY', '2 - 3', 'INAPONDEKA VIZURI', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(12, 'KENYA MPYA.', 3, 18, 5, 4, 7, 2, 3, 2010, '27', '48', '26,27', '1400-3000', 1400, 3000, 'EARLY', '3.0-3.5', 'MIZIZI YA UMBO LA YAI/MVIRINGI, INAVIMBA HARAKA: MIZIZI MIZITO, NGOZI YA JUU NI RANGI YA CREAP IKIWA NA MACHO YA ZAMBARAU, MACHO YA NDANI, NDANI NI NYEUPE AINA YA CREAM INAHIMILI UGONJWA WA KUNYAUKA, INAHIFADHIKA VIZURI, UNAKAA MDA MFUPI KABLA KUCHIPUZA, ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(13, 'KERR’S PINK', 3, 18, 5, 4, 7, 3, 8, 1960, '27', '48', '33', '1400-2700', 1400, 2700, 'EXTRA EARLY', '2-3', 'HAITOI NYUZI', '', '', '', '', '', '', '', '', '', ''),"+
				"(14, 'PURPLE GOLD.', 3, 18, 5, 4, 7, 2, 2, 2010, '26,27', '48', '26,27', '1800-3000', 1800, 3000, 'MEDIUM', '4.0-4.5', 'MIZIZI YA UMBO LA MVIRINGO,RANGI YA ZAMBARAU,MACHO YA KIMA CHA KADRI,NDANI NI RANGI NYEUPE,INAHIMILI KWA KIASI UGONJWA WA KUNYAUKA MAJANI,INAHIFADHIKA VIZURI,HAIBADILIKI KWA URAHISI RANGI YA KIJANI KIBICHI', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(15, 'ROSLIN BVUMBWE', 3, 18, 5, 4, 7, 4, 5, 1974, '27', '48', '33', '1800-2600', 1800, 2600, 'EXTRA EARLY', '2 - 3', 'INACHONGEKA VIZURI', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(16, 'ROSLIN EBURU (B53)', 3, 18, 5, 4, 7, 3, 8, 1953, '27', '48', '33', '2000-2800', 2000, 2800, 'MEDIUM', '4 - 4.8', 'INAHIMILI UKAME', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(17, 'ROSLIN TANA', 3, 18, 5, 4, 7, 4, 5, 1974, '27', '48', '33', '1800-2600', 1800, 2600, 'EXTRA EARLY', '2 - 3', 'INACHONGEKA VIZURI', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(18, 'SHEREKEA', 3, 18, 5, 4, 7, 4, 5, 2010, '27', '48', '33', '1800-3000', 1800, 3000, 'EARLY', '3.5-4', 'MIZIZI YA MVIRINGO, MIZIZI MINGI MWA MMEA MMOJA, NGOZI RANGI NYEKUNDU, MACHO YA KIMA CHA KADRI,NDANI NI RANGI YA CREAM, INAHIMILI UGONJWA WA KUNYAUKA MAJANI NA  VIRUSI,INAHIFADHIKA VIZURI ,INATUMIKA KAMA CHAKULA CHA KATIKATI,KUCHONGEKA NA KUPONDEKA KWA UR', '', 'YES', 'YES', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(19, 'TIGONI', 3, 18, 5, 4, 7, 2, 3, 1998, '27', '48', '6,33', '1800-2600', 1800, 2600, 'EARLY', '3-4', 'INASAGIKA VIZURI, KUCHEMKA VIZURI,INAWEZA PONDWAPONDWA, INAHIMILI UGONJWA WA KUNYAUKA MAJANI', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(20, 'KAT021-13-28', 4, 3, 2, 3, 3, 1, 1, 2012, '27', '13', '13', '750-1750', 750, 1750, 'EXTRA EARLY', '2.5', 'HUKOMAA MAPEMA INAHIMILI UKAME', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(21, 'MH 401 TOSHEKA', 4, 3, 2, 3, 8, 1, 9, 2013, '14', '14', '14', '900-1400', 900, 1400, 'EARLY', '3-3.5', 'INATOA GUNZI KIMA CHA CHINI , INAIMAMISHA GUNZI INAPOKOMAA,UTAFITI HALISI(TRUE BREEDING), NYEUPE ZENYE VISHIMO HUSALIA KIJANI HATA WAKATI WA KUKOMAA, INAHIMILI MADOADOA YA KIJIVU, VIRUSI VYA KUOZESHA MAHINDI , KUTUYA MAJANI NA TURCICUM, INAHIMILI KUVU YA ', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(22, 'KDH1', 4, 3, 2, 3, 7, 1, 9, 2003, '27', '27', '64', '900-1200', 900, 1200, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(23, 'KDH2', 4, 3, 2, 3, 7, 1, 9, 2003, '27', '27', '64', '900-1200', 900, 1200, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(24, 'KDH3', 4, 3, 2, 3, 3, 1, 1, 2004, '27', '27', '13', '900-1200', 900, 1200, 'EXTRA EARLY', '2.5', 'HUKOMAA MAPEMA INAHIMILI UKAME', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(25, 'KDH4 SBR', 4, 3, 2, 3, 7, 1, 9, 2008, '27', '27', '64', '900-1200', 900, 1200, '', '', 'INAHIMILI VIWAVI WANAOKULA MABUA, INAHIMILI KIANGAZI  &  VIWANGO VYA CHINI VYA  NITROGEN', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(26, 'KDH414-01SBR', 4, 3, 2, 3, 7, 1, 9, 2008, '27', '27', '64', '900-1200', 900, 1200, 'EARLY', '3-4', 'INAHIMILI VIWAVI WANAOKULA MABUA, INAHIMILI KIANGAZI  &  VIWANGO VYA CHINI VYA  NITROGEN', '', '', '', '', '', '', '', '', '', ''),"+
				"(27, 'KDH414-02 SBR', 4, 3, 2, 3, 7, 1, 9, 2008, '27', '27', '64', '900-1200', 900, 1200, '', '', 'INAHIMILI VIWAVI WANAOKULA MABUA, INAHIMILI KIANGAZI  &  VIWANGO VYA CHINI VYA  NITROGEN', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(28, 'KDH414-03 SBR', 4, 3, 2, 3, 7, 1, 9, 2008, '27', '27', '64', '900-1200', 900, 1200, '', '', 'INAHIMILI VIWAVI WANAOKULA MABUA, INAHIMILI KIANGAZI  &  VIWANGO VYA CHINI VYA  NITROGEN', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(29, 'KDH5 SBR', 4, 3, 2, 3, 7, 1, 9, 2008, '27', '27', '64', '900-1200', 900, 1200, '', '', 'INAHIMILI VIWAVI WANAOKULA MABUA, INAHIMILI KIANGAZI  &  VIWANGO VYA CHINI VYA  NITROGEN', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(30, 'KDH6 SBR', 4, 3, 2, 3, 7, 1, 9, 2008, '27', '27', '64', '900-1200', 900, 1200, '', '', 'INAHIMILI VIWAVI WANAOKULA MABUA, INAHIMILI KIANGAZI  &  VIWANGO VYA CHINI VYA  NITROGEN', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(31, 'KEMBU 214', 4, 3, 2, 3, 7, 1, 1, 2008, '27', '27', '64', '1200-1600', 1200, 1600, 'MEDIUM', '4-5', 'INAHIMILI VIWAVI', '', '', 'YES', '', '', '', '', '', '', ''),"+
				"(32, 'KH500-22A', 4, 3, 2, 4, 3, 2, 3, 2008, '27', '27', '67', '1000-2000', 1000, 2000, 'MEDIUM', '4-5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(33, 'KH500-40A', 4, 3, 2, 3, 7, 2, 2, 2008, '27', '27', '72', '1200-1800', 1200, 1800, 'MEDIUM', '5-6', 'INAKOMAA KWA MUDA WA WASTANI,INAHIMILI VIRUSI VINAVYOSABABISHA MAHINDI KUOZA, MADOADOA YA KIJIVU NA KUVU,MAGUNZI MAKUBWA NA UTAFITI HALISI(TRUE BREEDING), KUBWA NYEUPE.', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(34, 'KH500-43A', 4, 3, 2, 3, 3, 2, 3, 2008, '27', '27', '14', '1200-2100', 1200, 2100, 'MEDIUM', '4-5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, INATOA MAGUNZI MAWILI, INATUMIKA KWA CHAKULA CHA BINADAMU NA MIFUGO', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(35, 'KH500-44A', 4, 3, 2, 4, 3, 2, 3, 2008, '27', '27', '77', '1500-2100', 1500, 2100, 'MEDIUM', '4-5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(36, 'KH500-45A', 4, 3, 2, 4, 3, 2, 3, 2006, '27', '27', '77', '1500-2100', 1500, 2100, 'MEDIUM', '4-5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(37, 'KH500-46A', 4, 3, 2, 4, 3, 2, 3, 2010, '27', '27', '67', '1000-1500', 1000, 1500, '', '', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(38, 'KH600-11D', 4, 3, 2, 4, 3, 2, 5, 2000, '27', '27', '19', '1800-2500', 1800, 2500, 'MEDIUM', '4-5', 'INASIMAMA VIZURI', '', '', '', '', '', '', '', '', '', ''),"+
				"(39, 'KH600-23A', 4, 3, 2, 4, 3, 2, 5, 2008, '27', '27', '6', '1800-2500', 1800, 2500, 'MEDIUM', '5-6', 'INAHIMILI MADOADOA YA KIJIVU, KUTU YA MAJANI, KUVU, HAIVUNJIKI SANA', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(40, 'KH600-24A', 4, 3, 2, 4, 3, 1, 5, 2008, '27', '27', '62', '1800-2500', 1800, 2500, 'MEDIUM', '5-6', 'INAHIMILI MADOADOA YA KIJIVU, KUTU YA MAJANI NA KUVU. HAIVUNJIKI SANA', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(41, 'UA KAYONGO 2', 4, 3, 2, 3, 7, 3, 9, 2007, '27', '29', '64', '1000-1500', 1000, 1500, 'MEDIUM', '4-5', 'DIPLODIA & FUSARIUM, MAZAO YA JUU ?WASTANI WA TANI  8-10  KWA HEKTA,  INAHIMILI WADUDU WAHARIBIFU, GUNZI LILILO LAINI ?INAWEZA KUVUNWA RAHISI NA COMBINE HARVESTER,INAHIMILI UGONJWA WA MAJANI YA RANGI YA JIVU ,INAHIMILI UKAME', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(42, 'UA KAYONGO 3', 4, 3, 2, 3, 7, 3, 9, 2007, '27', '29', '64', '1000-1500', 1000, 1500, 'MEDIUM', '4-5', 'INAHIMILI MADOADOA YA KIJIVU, VIRUSI VINAVYOOZESHA MAHINDI, HAIOZI MIZIZI NA KUVUNJIMA MABUA', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(43, 'KH633A', 4, 3, 2, 3, 7, 1, 9, 2009, '27', '30', '64', '1400-1800', 1400, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(44, 'KH634A', 4, 3, 2, 3, 7, 1, 9, 2009, '27', '30', '64', '1400-1800', 1400, 1800, 'EARLY', '3-5', 'INAHIMILI KOVU NA MADOADOA YA KIJUVU,', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(45, 'KH600-20A', 4, 3, 2, 4, 3, 2, 5, 2005, '27', '31', '7', '1800-2300', 1800, 2500, 'MEDIUM', '5-6', 'INASIMAMA VIZURI INAHIMILI KUVU YA MAJANI', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(46, 'KH600-21A', 4, 3, 2, 4, 3, 2, 5, 2006, '27', '31', '7', '1800-2300', 1800, 2500, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(47, 'KH600-22A', 4, 3, 2, 4, 3, 2, 5, 2006, '27', '31', '11', '1800-2300', 1800, 2500, 'LATE', '6-8', 'INAFUNIKA GUNZI VIZURI, INAHIMILI KUVUNJIKA KWA BUA, KUOZA GUNZI(COB), KOVU YA MAJANI, KUNYAUKA KWA MAJANI', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(48, 'KH500-21A', 4, 3, 2, 3, 4, 2, 3, 2004, '27', '32', '10,13,19,69', '1200-1600', 1200, 1600, 'MEDIUM', '5-6', 'INASIMAMA VIZURI, INAFUNIKA GUNZI,INAHIMILI VIRUSI VYA KUOZESHA MAHINDI, NA UGONJWA WA HEAD SMUT.', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(49, 'KH500-31A', 4, 3, 2, 3, 4, 2, 3, 2004, '27', '32', '19,56,66,69,72', '1400-1800', 1400, 1800, 'MEDIUM', '4-5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI NA KUVU. HUSALIA KUWA KIJANI', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(50, 'KH500-32A', 4, 3, 2, 3, 4, 2, 3, 2004, '27', '32', '10,19,56,69', '1300-1800', 1300, 1800, 'MEDIUM', '4-5', 'INAHIMILI KUTU, VIRUSI VYA KUOZESHA MAHINDI NA KUVU', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(51, 'KH500-33A', 4, 3, 2, 3, 4, 2, 3, 2004, '27', '32', '14,19,69', '1400-1800', 1400, 1800, 'MEDIUM', '4-5', 'INAHIMILI KUTU, VIRUSI VYA KUOZESHA MAHINDI NA KUVU', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(52, 'KH500-34A', 4, 3, 2, 3, 3, 2, 3, 2004, '27', '32', '56', '1300-1800', 1300, 1800, 'MEDIUM', '5-6', 'INAHIMILI KUTU YA MAJANI, HAIVUNJIKI MABUA,INAHIMILI MADOADOA YA KIJIVU', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(53, 'KH500-35A', 4, 3, 2, 3, 7, 4, 2, 2003, '27', '32', '64', '1200-1600', 1200, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(54, 'KH500-36A', 4, 3, 2, 3, 7, 4, 2, 2003, '27', '32', '64', '1200-1800', 1200, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(55, 'KH500-38A', 4, 3, 2, 3, 7, 4, 2, 2003, '27', '32', '64', '1200-1800', 1200, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(56, 'H511', 4, 3, 2, 3, 3, 3, 8, 1967, '50', '27', '66', '1000-1500', 1000, 1500, 'MEDIUM', '4-5', 'INAKOMAA KWA KADRI', '', '', '', '', '', '', '', '', '', ''),"+
				"(57, 'H512', 4, 3, 2, 3, 3, 3, 8, 1970, '50', '27', '50', '1200-1600', 1200, 1600, 'MEDIUM', '4-5', 'UTAFITI HALISI(TRUE BREEDING), KUBWA', '', '', '', '', '', '', '', '', '', ''),"+
				"(58, 'H622', 4, 3, 2, 3, 3, 3, 8, 1965, '50', '27', '50', '1200-1700', 1200, 1700, 'LATE', '6-7', 'UTAFITI HALISI(TRUE BREEDING), KUBWA', '', '', '', '', '', '', '', '', '', ''),"+
				"(59, 'H632', 4, 3, 2, 3, 3, 3, 8, 1964, '27', '27', '50', '1200-1700', 1200, 1700, 'LATE', '6-7', 'UTAFITI HALISI(TRUE BREEDING), KUBWA', '', '', '', '', '', '', '', '', '', ''),"+
				"(60, 'H614D', 4, 3, 2, 4, 3, 2, 3, 1986, '50', '27,50', '50', '1500-2100', 1500, 2100, 'LATE', '6-9', 'INAHIMILI AINA NYINGI ZA KIMAZINGIRA NA MISIMU, NI NGUMU KIASI', '', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(61, 'H625', 4, 3, 2, 4, 3, 2, 3, 1981, '27,50', '27,50', '50', '1500-2100', 1500, 2100, 'LATE', '6-8', 'INAZAA VIZURI, INAFUNIKA GUNZI VIZURI', '', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(62, 'H626', 4, 3, 2, 4, 3, 2, 3, 1989, '27,50', '27,50', '50', '1500-2100', 1500, 2100, '', '', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(63, 'EMB 0702', 4, 3, 2, 3, 7, 1, 1, 2011, '27', '38', '64', '1200-1800', 1200, 1800, 'MEDIUM', '4-5', 'INAHIMILI WADUDU WA BAADA YA KUVUNA, WADUDU WA NAFAKA (LGB) NAKUHIMILI VIWAVI', '', '', 'YES', '', '', '', '', '', '', ''),"+
				"(64, 'EMB 0703', 4, 3, 2, 3, 7, 1, 1, 2011, '27', '38', '64', '1200-1800', 1200, 1800, 'MEDIUM', '5-6', 'INAHIMILI VIWAVI', '', '', 'TES', '', '', '', '', '', '', ''),"+
				"(65, 'EMB 204', 4, 3, 2, 3, 7, 1, 1, 2004, '27', '38', '64', '1000-1500', 1000, 1500, 'MEDIUM', '5-6', 'MAHINDIYENYE KIWANGO CHA JUU CHA PROTEIN, GANDA ZURI , INAHIMILI MADOADOA YA KIJUVU, KUOZA GUNZI(COB), KUTU YA MAJANI NA KOVU', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(66, 'KH500-36E', 4, 3, 2, 3, 4, 2, 2, 2007, '27', '38', '8', '1200-1800', 1200, 1800, 'MEDIUM', '4-5', 'INAHIMILI VIRUSI VINAVYOSABBISHAMAHINDI KUOZA, KUTU YA MAJANI NA KUVU', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(67, 'KH500-39E', 4, 3, 2, 3, 4, 2, 2, 2007, '27', '38', '8', '1200-1800', 1200, 1800, 'MEDIUM', '4-5', 'INAHIMILI MADOADOA YA KIJIVU NA KUVU', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(68, 'KH 631Q', 4, 3, 2, 3, 4, 4, 5, 2004, '27', '39', '19', '1000-1500', 1000, 1500, 'MEDIUM', '4.5', 'INA PROTEIN YA JUU', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(69, 'KM1101', 4, 3, 2, 3, 7, 1, 9, 2012, '27', '39', '64', '1600-1800', 1600, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(70, 'KM403', 4, 3, 2, 3, 7, 1, 9, 2010, '27', '39', '64', '1600-1800', 1600, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(71, 'KM404', 4, 3, 2, 3, 7, 1, 9, 2010, '27', '39', '64', '1600-1800', 1600, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(72, 'KM406', 4, 3, 2, 3, 7, 1, 9, 2010, '27', '39', '64', '1600-1800', 1600, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(73, 'KATEH2007-3', 4, 3, 2, 3, 7, 1, 9, 2011, '27', '40', '64', '900-1600', 900, 1600, 'EARLY', '4', 'INAHIMILI VIWAVI', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(74, 'KH125- 02 MDR', 4, 3, 2, 3, 7, 1, 9, 2012, '27', '40', '64', '1200-1600', 1200, 1600, 'EARLY', '4', 'MAZAO YA JUU, INAHIMILI MADOADOA YA KIJIVU NA VIRUSI VINAVYOOZESHA MAHINDI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(75, 'KH125-01SG', 4, 3, 2, 3, 4, 2, 9, 2010, '27', '40', '16', '900-1400', 900, 1400, 'EARLY', '4', 'INATUMIKA KATIKA MAZINGIRA TOFAUTI TOFAUTI, INABAKI KUWA YA KIJANI, MAZAO YA JUU, INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI NA MADOADOA YA KIJIVU', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(76, 'KH125-02 MDR', 4, 3, 2, 3, 4, 1, 9, 2010, '27', '40', '21', '900-1400', 900, 1400, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(77, 'KH125-03SG', 4, 3, 2, 3, 4, 2, 9, 2010, '27', '40', '16', '900-1400', 900, 1400, 'EARLY', '4', 'INAHIMILI KIANGAZI, MAZAO YA HALI YA JUU, INAHIMILI UGONJWA WA MAJANI KUGEUKA RANGI YA KIJIVU, WADUDU WAHARIBIFU, HUSALIA KUWA RANGI YA KIJANI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(78, 'KH414-01SBR', 4, 3, 2, 3, 3, 4, 2, 2007, '27', '40', '59', '900-1400', 900, 1400, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(79, 'KH414-02SBR', 4, 3, 2, 3, 7, 4, 9, 2007, '27', '40', '64', '900-1400', 900, 1400, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(80, 'KH414-03SBR', 4, 3, 2, 3, 7, 4, 9, 2007, '27', '40', '64', '900-1400', 900, 1400, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(81, 'KH414-04SBR', 4, 3, 2, 3, 7, 4, 9, 2007, '27', '40', '64', '900-1400', 900, 1400, 'EARLY', '4', 'INAHIMILI VIWAVI', 'YES', '', 'YES', '', '', '', '', '', '', ''),"+
				"(82, 'KH414-05 DRT', 4, 3, 2, 3, 7, 4, 9, 2007, '27', '40', '64', '800-1600', 800, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(83, 'KH414-06 DRT', 4, 3, 2, 3, 7, 4, 9, 2012, '27', '40', '64', '800-1600', 800, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(84, 'KH414-07 DRT', 4, 3, 2, 3, 7, 4, 9, 2012, '27', '40', '64', '800-1600', 800, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(85, 'KH414-08 DRT', 4, 3, 2, 3, 7, 4, 9, 2012, '27', '40', '64', '800-1600', 800, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(86, 'KH414-09 DRT', 4, 3, 2, 3, 7, 4, 9, 2012, '27', '40', '64', '800-1600', 800, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(87, 'KH414-10 DRT', 4, 3, 2, 3, 7, 4, 9, 2012, '27', '40', '64', '800-1600', 800, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(88, 'WE1101 ', 4, 3, 2, 3, 4, 2, 2, 2013, '27', '40', '13,16,19,67,76', '800-1200', 800, 1200, 'MEDIUM', '4.5', 'INAHIMILI UKAME, INAHIMILI WADUDU WALA MAHINDI NA MADOA YA RANGI YA JIVU', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', '', '', '', ''),"+
				"(89, 'KH600-14E', 4, 3, 2, 4, 3, 2, 5, 2004, '27', '42', '19', '1800-2500', 1800, 2500, 'LATE', '6-8', 'INASIMAMA VIZURI NA INAFANYA VIZURI SEHEMU NYINGI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(90, 'KH600-15A', 4, 3, 2, 4, 3, 2, 5, 2001, '27', '42', '14', '1800-2500', 1800, 2500, 'LATE', '6-8', 'INASIMAMA VIZURI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(91, 'KH600-16A', 4, 3, 2, 4, 4, 2, 5, 2001, '27', '42', '14,19', '1800-2500', 1800, 2500, 'LATE', '6-8', 'INASIMAMA VIZURI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(92, 'KH600-17A', 4, 3, 2, 4, 3, 2, 5, 2002, '27', '42', '19', '1800-2500', 1800, 2500, 'MEDIUM', '5-6', 'INASIMAMA VIZURI', '', '', '', '', '', '', '', '', '', ''),"+
				"(93, 'KH600-18A', 4, 3, 2, 4, 3, 2, 5, 2004, '27', '42', '66', '1800-2500', 1800, 2500, 'MEDIUM', '5-6', 'INAHIMILI MAGONJWA', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(94, 'KH600-19A', 4, 3, 2, 4, 3, 2, 5, 2005, '27', '42', '7', '1800-2500', 1800, 2500, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(95, 'KH600-25A', 4, 3, 2, 4, 7, 1, 9, 2012, '27', '42', '64', '1800-2500', 1800, 2500, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(96, 'KH600-26A', 4, 3, 2, 4, 7, 1, 9, 2013, '27', '42', '64', '1800-2500', 1800, 2500, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(97, 'KH600-27A', 4, 3, 2, 4, 7, 1, 9, 2013, '27', '42', '64', '1800-2500', 1800, 2500, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(98, 'KH125- 04 PhPR', 4, 3, 2, 3, 7, 2, 9, 2012, '27', '44', '33', '0-1000', 0, 1000, 'MEDIUM', '4-5', 'INAHIMILI WADUDU WA BAADA YA KUVUNA, WADUDU WA NAFAKA (LGB) NAKUHIMILI VIWAVI', '', '', 'YES', '', '', '', '', '', '', ''),"+
				"(99, 'KH125- 05 PhPR', 4, 3, 2, 3, 7, 2, 9, 2012, '27', '44', '33', '0-1000', 0, 1000, 'MEDIUM', '4-5', 'INAHIMILI WADUDU WA BAADA YA KUVUNA, WADUDU WA NAFAKA (LGB) NAKUHIMILI VIWAVI', '', '', 'YES', '', '', '', '', '', '', ''),"+
				"(100, 'KH125- 06 SBR', 4, 3, 2, 3, 7, 2, 9, 2012, '27', '44', '33', '0-1000', 0, 1000, 'MEDIUM', '4-5', 'INAHIMILI VIWAVI', '', '', 'YES', '', '', '', '', '', '', ''),"+
				"(101, 'KH500-41A', 4, 3, 2, 3, 7, 4, 2, 2003, '27', '45', '64', '1400-1800', 1400, 1800, 'MEDIUM', '4-5', 'MAGUNZI YA KIASI,KIMO CHA KADRI, UTAFITI HALISI(TRUE BREEDING), NYEUPE.UTAFITI HALISI(TRUE BREEDING), NYEUPE, INATUMIKA KWA CHAKULA CHA BINADAMU NA MIFUGO', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(102, 'KH500-48A', 4, 3, 2, 3, 7, 2, 2, 2010, '27', '45', '33', '1400-1800', 1400, 1800, 'MEDIUM', '4', 'INAHIMILI VIRUSI VISABABISHAVYO MAHINDI KUOZA, MADOADOA YA KIJIVU  NA KUV, UTAFITI HALISI(TRUE BREEDING), NGUMU, INATUMIKA MARA MBILI 55% DM JUU YA AINA YA KISASA YA KIBIASHARA),MAGUNZI MAKUBWA, INAKUZWA KATIKA MAENEO YA MUINUKO WA KADRI', '', '', '', '', '', '', '', '', '', ''),"+
				"(103, 'KH500-49A', 4, 3, 2, 3, 3, 2, 2, 2010, '27', '45', '56', '1400-1800', 1400, 1800, 'MEDIUM', '4-5', 'INAHIMILI VIRUSI VINAVYOSABBISHAMAHINDI KUOZA,, MADOADOA YA KIJIVU NA KUVU. INA MATUMIZI MARA MBILI (49% DM KUSHINDA AINA YA MAHINDI YA KISASA) NAFAKA YA KADRI , GUNZI KUBWA, INAKUZWA KATIKA MAENEO YA MIINUKO YA KADRI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(104, 'KH500-50A', 4, 3, 2, 3, 3, 2, 9, 2011, '27', '45', '20', '1400-1800', 1400, 1800, 'MEDIUM', '4-5', 'INAKOMAA KWA MUDA WA KADRI, INAHIMILI VIRUSI VYA KUOZESHA MAHINDI, MADOADOA YA KIJIVU, KUVU YA MAJANI', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(105, 'KH500-51A', 4, 3, 2, 3, 3, 6, 2, 2012, '27', '45', '20', '1400-1800', 1400, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(106, 'KH500-52A', 4, 3, 2, 3, 7, 2, 2, 2012, '27', '45', '64', '1400-1800', 1400, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(107, 'CCM', 4, 3, 2, 3, 8, 3, 8, 1974, '50', '50', '50', '0-1200', 0, 1200, 'MEDIUM', '4-5', 'INAHIMILI JOTO', '', '', '', '', '', '', '', '', '', ''),"+
				"(108, 'DH 06', 4, 3, 2, 3, 8, 2, 2, 2007, '50', '50', '50', '900-1500', 900, 1500, 'EARLY', '3-4', 'INASIMAMA VIZURI INAFUNIKA MAGUNZI', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(109, 'DH 09', 4, 3, 2, 3, 8, 1, 2, 2004, '50', '50', '50', '1000-1500', 1000, 1500, 'EARLY', '3-4', 'INAHIMILI KUOZA MIZIZI NA KUVUNJIKA MABUA, INAFUNIKA GUNZI VIZURI, MAZAO YA JUU', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(110, 'DH 10', 4, 3, 2, 3, 8, 1, 2, 2004, '50', '50', '50', '800-1400', 800, 1400, 'EARLY', '3-4', 'INAHIMILI KUTU YA MAJANI, KUOZA GUNZI(COB) NA KUVUNJIKA MABUA, INAFUNIKA GUNZI VIZURI, YA KIMO KIFUPI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(111, 'DH 12', 4, 3, 2, 3, 8, 1, 2, 2007, '50', '50', '50', '900-1400', 900, 1400, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(112, 'DH 8', 4, 3, 2, 3, 8, 1, 9, 2003, '50', '50', '50', '900-1500', 900, 1500, 'EARLY', '3-4', 'INAFANYA VIZURI KATIKA MAZINGIRA YA MAZAO DUNIINAHIMILI KUVUNJIKA KWA MABUA, KUKATIKA MIZIZI KUOZA GUNZI(COB) NA KUINAMA', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(113, 'DH01', 4, 3, 2, 3, 8, 2, 3, 1995, '50', '50', '50', '900-1400', 900, 1400, 'EARLY', '3-4', 'HUKOMAA MAPEMA, HUSALIA KUWA RANGI YA KIJANI', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(114, 'DH02', 4, 3, 2, 3, 8, 2, 3, 1995, '50', '50', '50', '900-1400', 900, 1400, 'EARLY', '3-4', 'HUKOMAA MAPEMA IHUSALIA KUWA KIJANI', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(115, 'DH03', 4, 3, 2, 3, 8, 2, 3, 2000, '50', '50', '50', '900-1500', 900, 1500, 'EARLY', '3-4', 'HUBAKI YA RANGI YA KIJANI, HUSIMAMA VIZURI', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(116, 'DH04', 4, 3, 2, 3, 8, 2, 3, 2001, '50', '50', '50', '900-1500', 900, 1500, 'EARLY', '3-4', 'INA KIMO KIFUPI', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(117, 'DH05', 4, 3, 2, 3, 8, 1, 9, 2001, '50', '50', '50', '900-1500', 900, 1500, 'EARLY', '3-4', 'MAZAO YA JUU, INASIMAMA VIZURI, INATOA MAGUNZI MENGI', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(118, 'H2801', 4, 3, 2, 4, 8, 1, 9, 2011, '50', '50', '50', '1500-2300', 1500, 2300, 'LATE', '6-8', 'YA KISASA MARA MBILI, MAZAO YA JUU YA 9.92% JUU YA VIWANGO VYA KAWAIDA (H614D, H6213, H628, H626 AND H627), INAHIMILI UGONJWA WA EAR ROT, INAHIMILI UGONJWA KWA KUNYAUKA MAJANI, KUTU YA MAJANI NA UGONJWA WA MADOADOA YA RANGI YA JIVU', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(119, 'H28P1', 4, 3, 2, 3, 8, 1, 9, 2011, '50', '50', '50', '0-1200', 0, 1200, 'MEDIUM', '4', 'MAZAO YA JUU YA 11.91% JUU YA VIWANGO VYA KAWAIDA (KS-PH1, PH),INAHIMILI JOTO NA KUTU YA MAJANI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(120, 'H513', 4, 3, 2, 3, 8, 2, 3, 1995, '50', '50', '50', '1200-1600', 1200, 1600, 'MEDIUM', '4-5', 'INASIMAMA VIZURI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(121, 'H515', 4, 3, 2, 3, 8, 2, 3, 2000, '50', '50', '50', '1200-1500', 1200, 1500, 'MEDIUM', '4-5', 'INAHIMILI KUVUNJIKA KWA MABUA', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(122, 'H516', 4, 3, 2, 3, 8, 2, 3, 2001, '50', '50', '50', '1200-1500', 1200, 1500, 'MEDIUM', '4-5', 'INAHIMILI KOVU, KUTU YA MAJANI NA KUVUNJIKA', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(123, 'H518', 4, 3, 2, 3, 8, 1, 9, 2002, '50', '50', '50', '1400-1700', 1400, 1700, 'MEDIUM', '4-5', 'INAHIMILI MADOADOA YA KIJIVU, KUTU YA MAJANI, KUVU', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(124, 'H519', 4, 3, 2, 3, 8, 1, 9, 2003, '50', '50', '50', '1200-1700', 1200, 1700, 'MEDIUM', '4-5', 'INATOANMAZAO MENGI, INAHIMILI KUOZA MASIKI, KUTU YA MAJANI NA MADOADOA YA KIJIVU, KUVU, KUVUNJIKAKWA MABUA NA MIZIZI IKILINGANISHWA NA AINA YA  H513,', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(125, 'H520', 4, 3, 2, 3, 8, 2, 3, 2003, '50', '50', '50', '1400-1700', 1400, 1700, 'MEDIUM', '4-5', 'INAHIMILI MARADHI YA KUNYAUKA MAJANI YA NOTHERN BLIGHT, KUTU YA MAJANI, KUOZA GUNZI(COB), BUA NA MIZIZI INASHIKANA JUU. GUGUTA LIMEFUNIKWA VIZURI', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(126, 'H521', 4, 3, 2, 3, 8, 1, 9, 2003, '50', '50', '50', '1000-1600', 1000, 1600, 'MEDIUM', '4-5.5', 'INAHIMILI ZAIDI UGONJWA WA MADOADOA YA KIJIVU, KUVU, KUVUNJIKA KWA MABUANA MIZIZI KUSHINDA AINA YA  H513', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(127, 'H522', 4, 3, 2, 3, 8, 1, 9, 2003, '50', '50', '50', '1200-1600', 1200, 1600, 'MEDIUM', '4-5', 'INAHIMILI MADOADOA YA KIJIVU, VIRUSI VINAVYOOZESHA MAHINDI, HAIOZI MIZIZI NA KUVUNJIMA MABUA', '', '', '', '', '', '', '', '', '', ''),"+
				"(128, 'H523', 4, 3, 2, 3, 8, 1, 9, 2003, '50', '50', '50', '1200-1600', 1200, 1600, 'MEDIUM', '4', 'MAZAO MAZURI ZAIDI YA  H623, INAHIMILI UGONJWA WA MADOADOA YA RANHI YA JIVU, INAHIMILI KUOTA MIZIZI NJE', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(129, 'H6210', 4, 3, 2, 4, 8, 2, 3, 2001, '50', '50', '50', '1600-2200', 1600, 2200, 'LATE', '', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(130, 'H6211', 4, 3, 2, 4, 8, 1, 5, 2001, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6', 'HUKOMAA MAPEMA, MAFUNDO MAFUPI', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(131, 'H6212', 4, 3, 2, 4, 8, 1, 5, 2001, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-8', 'NI FUPI, NGUMU KIASI, INAHIMILI KUOZA GUNZI(COB)', '', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(132, 'H6213', 4, 3, 2, 4, 8, 2, 3, 2002, '50', '50', '50', '1600-2200', 1600, 2200, 'LATE', '6-8', 'MAZAO YA JUU, INAHIMILI KIANGAZI', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(133, 'H6218', 4, 3, 2, 4, 8, 1, 5, 2008, '50', '50', '50', '1600-2200', 1600, 2200, '', '', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(134, 'H623', 4, 3, 2, 3, 3, 3, 8, 1999, '50', '50', '50', '1200-1700', 1200, 1700, 'LATE', '6-7', 'FINATOA MAZAO MENGI, UTAFITI HALISI(TRUE BREEDING), KUBWA', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(135, 'H624', 4, 3, 2, 4, 3, 2, 3, 2004, '50', '50', '50', '1600-2200', 1600, 2200, '', '', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(136, 'H628', 4, 3, 2, 4, 8, 2, 3, 1999, '50', '50', '50', '1700-2300', 1500, 2300, 'LATE', '6-8', 'NAFAKA NGUMU', '', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(137, 'H629', 4, 3, 2, 4, 8, 2, 3, 2000, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-8', 'NI NGUMU KIASI', '', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(138, 'KS-6505', 4, 3, 2, 3, 8, 1, 9, 2010, '50', '50', '50', '1350-1700', 1350, 1700, 'LATE', '6-7', 'INAHIMILI MADOADOA YA KIJIVU,INAFUNIKAGUNZI VIZURI, UTAFITI HALISI(TRUE BREEDING), NGUMU', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(139, 'KS-6506', 4, 3, 2, 3, 8, 1, 9, 2010, '50', '50', '50', '1350-1700', 1350, 1700, 'MEDIUM', '5-6', 'INAHIMILI MADOADOA YA KIJIVU, NI FUPU NA HAIVUNJIKII', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(140, 'KSD-01', 4, 3, 2, 3, 8, 1, 9, 2013, '50', '50', '50', '800-1300', 800, 1300, 'EXTRA EARLY', '2-3', 'INAHIMILI UKAME, KOVU NA MAJANI KUGEUKA RANGI YA KIJIVU', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(141, 'KS-DH13', 4, 3, 2, 3, 8, 1, 9, 2008, '50', '50', '50', '800-1800', 800, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(142, 'KS-DH14', 4, 3, 2, 3, 8, 1, 9, 2008, '50', '50', '50', '800-1300', 800, 1300, 'EARLY', '3.5 -4.5', 'INAHIMILI UKAME, HUBAKI RANGI YA KIJANI WAKATI WOTE', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(143, 'KS-DH15', 4, 3, 2, 3, 8, 1, 9, 2013, '50', '50', '50', '1000-1500', 1000, 1500, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(144, 'KS-H524', 4, 3, 2, 3, 8, 1, 8, 2008, '50', '50', '50', '1200-1500', 1200, 1500, 'MEDIUM', '4-5', 'INAHIMILI KUTU YA MAJANI, MADOADOA YA KIJIVU NA KUOZA GUNZI(COB).', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(145, 'KSH527', 4, 3, 2, 3, 8, 1, 9, 2010, '50', '50', '50', '1200-1500', 1200, 1500, 'MEDIUM', '4-5', 'INAHIMILI MADOADOA YA KIJIV, INAHIMILI KUTU NA KUVU YA MAJANI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(146, 'KSH6214', 4, 3, 2, 4, 8, 1, 9, 2004, '50', '50', '50', '1600-2100', 1600, 2100, 'LATE', '6-7', 'INAHIMILI MADOADOA YA KIJIVU, KUVU YA MAJANI, HAIVUNJIKI MABUA, INAKOMAA MAPEMA', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(147, 'KS-H6216', 4, 3, 2, 4, 8, 1, 9, 2008, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-7', 'INAHIMILI KUVUNJIKA KWA MABUA NA KUNYAUKA UTAFITI HALISI(TRUE BREEDING),', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(148, 'KS-H6217', 4, 3, 2, 4, 8, 1, 9, 2008, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-7', 'INAHIMILI KUVUNJIKA KWA MABUA NA KUNYAUKA UTAFITI HALISI(TRUE BREEDING),', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(149, 'KSH6219', 4, 3, 2, 4, 8, 1, 9, 2010, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-7', 'INAHIMILI MADOADOA YA KIJIVU, HAIVUNJIKI MABUA NA MIZIZI, UTAFITI HALISI(TRUE BREEDING), KUBWA', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(150, 'KS-H6502', 4, 3, 2, 3, 8, 1, 9, 2008, '50', '50', '50', '1300-1800', 1300, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(151, 'KS-H6503', 4, 3, 2, 3, 8, 1, 9, 2008, '50', '50', '50', '1300-1800', 1300, 1800, 'MEDIUM', '5-6', 'INAHIMILI KUTU YA MAJANI, HAIVUNJIKI MABUA,INAHIMILI MADOADOA YA KIJIVU & KUVU', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(152, 'PH 4', 4, 3, 2, 3, 8, 2, 3, 1995, '50', '50', '50', '0-1200', 0, 1200, 'MEDIUM', '3-5', 'INAHIMILI JOTO, INASIMAMA VIZURI, INAHIMILI KWA KIASI VIRUSI VYA KUOZESHA MAHINDI', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', '', '', '', ''),"+
				"(153, 'PH 5', 4, 3, 2, 3, 8, 1, 9, 2007, '50', '50', '50', '0-1200', 0, 1200, 'MEDIUM', '4-5', 'HAIVUNJIKI HARAKA, INAHIMILI KUTU NA KUOZA GUNZI(COB), INAFUNIKA GUNZI VIZURI, INASIMAMA VIZURI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(154, 'PH1', 4, 3, 2, 3, 8, 2, 3, 1989, '50', '50', '50', '0-1200', 0, 1200, 'LATE', '6-8', 'HAIVUNJIKI MABUA KWA URAHISI,MABUA THABITI, INAHIMILI UKAME', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', '', '', '', ''),"+
				"(155, 'DLC1', 4, 3, 2, 3, 3, 3, 8, 1989, '50', '50', '50', '800-1200', 800, 1200, 'EXTRA EARLY', '2-3', 'NAFAKA NGUMU', 'YES', '', '', 'YES', '', '', '', '', '', ''),"+
				"(156, 'H612D', 4, 3, 2, 4, 3, 1, 8, 1986, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-8', 'NI NGUMU KIASI', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(157, 'H613D', 4, 3, 2, 4, 3, 1, 8, 1986, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-8', 'NI NGUMU KIASI', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(158, 'H627', 4, 3, 2, 4, 8, 1, 9, 1995, '50', '50', '50', '1500-2100', 1500, 2100, 'LATE', '6-8', 'NI NGUMU KIASI', '', '', '', '', '', '', '', '', '', ''),"+
				"(159, 'LAGROTECH EARLY', 4, 3, 2, 3, 8, 1, 9, 2003, '55', '55', '55', '0-1500', 0, 1500, 'EARLY', '2.7-3.5', 'INAFUNIKA GUNZI(COB) , INAKOMAA HARAKA, INAHIMILI UGONJWA WA STRIGA,  INAKWEPA KIANGAZI', 'YES', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(160, 'MASENO DOUBLE COBBER', 4, 3, 2, 3, 8, 1, 9, 2002, '55', '55', '64', '1000-1600', 1000, 1600, 'EARLY', '3 - 4', 'INAZAA VIZURI- KIWANGO CHA 30-80%,', 'YES', '', '', 'YES', '', '', '', '', '', ''),"+
				"(161, 'C5051', 4, 3, 2, 3, 8, 3, 8, 2000, '59', '59', '11', '1000-1800', 1000, 1800, 'MEDIUM', '4-5', 'INAHIMILI KWA KIASI VIRUSI VYA KUOZESHA MAHINDI NA NI RAHISI KUPUKUSA', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(162, 'CG4141', 4, 3, 2, 3, 8, 3, 8, 2000, '59', '59', '11', '900-1700', 900, 1700, 'MEDIUM', '4-5', 'HUKAUKA HARAKA', '', '', '', '', '', '', '', '', '', ''),"+
				"(163, 'DK 8031', 4, 3, 2, 3, 8, 2, 3, 2003, '59', '59', '11', '900-1700', 900, 1700, 'MEDIUM', '4 - 4.7', 'INAHIMILI MADOADOA YA KIJIVU', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(164, 'DK 8071', 4, 3, 2, 3, 8, 3, 8, 2003, '59', '59', '11', '1500-1700', 1500, 1700, 'MEDIUM', '5', 'NAFAKA NGUMU', '', '', '', '', '', '', '', '', '', ''),"+
				"(165, 'DKC 80-33', 4, 3, 2, 3, 8, 3, 5, 2004, '59', '59', '11', '900-1700', 900, 1700, 'MEDIUM', '5-6', 'INAHIMILI MADOADOA YA KIJIVU, INASIMAMA WIMA', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(166, 'DKC 80-53', 4, 3, 2, 3, 8, 2, 3, 2004, '59', '59', '11', '900-1700', 900, 1700, 'MEDIUM', '4-5', 'INAHIMILI MADOADOA YA KIJIVU, VIRUSI VINAVYOOZESHA MAHINDI, INASIMAMA VIZURI INAFANYA VIZURI MAENEO MENGI, MAZAO YA JUU', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', ''),"+
				"(167, 'DKC 80-73', 4, 3, 2, 3, 8, 4, 8, 2004, '59', '59', '11', '1500-1700', 1500, 1700, 'MEDIUM', '5-6', 'INAHIMILI MADOADOA YA KIJIVU, VIRUSI VINAVYOOZESHA MAHINDI  NA DIPLODIA, INAFUNIKA GUNZI VIZURI', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(168, 'DKC90-89', 4, 3, 2, 3, 8, 2, 3, 2012, '59', '59', '11', '900-1800', 900, 1800, 'MEDIUM', '3.5 -4.5', 'MAZAO THABITI, INASIMAMA VIZURI ,NAFAKA BORA YA KIWANGO CHA JUU', '', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(169, 'FS650', 4, 3, 2, 4, 8, 1, 1, 2001, '66', '66', '66', '1500-2200', 1500, 2200, 'LATE', '6-7', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MAZAO MENGI, UTAFITI HALISI(TRUE BREEDING), NGUMU', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(170, 'PAN 15', 4, 3, 2, 3, 8, 1, 1, 2004, '70', '70', '70', '1400-1800', 1400, 1800, 'MEDIUM', '4-5', 'INAHIMILI KUVUNJIKA KWA MABUA', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(171, 'PAN 33', 4, 3, 2, 3, 8, 1, 1, 2003, '70', '70', '70', '1400-1800', 1400, 1800, 'MEDIUM', '5 - 6', 'MAZAO YA JUU INAKOMAA HARAKA', '', '', '', '', '', '', '', '', '', ''),"+
				"(172, 'PAN 4M-17', 4, 3, 2, 3, 8, 1, 1, 2008, '70', '70', '70', '900-1500', 900, 1500, 'EARLY', '3-4', 'NGUMU, INAHIMILI UKAME, INAKOMAA MAPEMA,', 'YES', '', '', 'YES', '', '', '', '', '', ''),"+
				"(173, 'PAN 4M-19', 4, 3, 2, 3, 8, 1, 3, 2008, '70', '70', '70', '900-1500', 900, 1500, 'EARLY', '3-4', 'NGUMU, INAHIMILI UKAME, INAZAA SANA, INAKOMAA MAPEMA, INAKAUKA HARAKA, INASIMAMA WIMA', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(174, 'PAN 4M-21', 4, 3, 2, 3, 8, 1, 3, 2005, '70', '70', '70', '1000-1500', 1000, 1500, 'EARLY', '3-4', 'INAHIMILI UKAME, KOVU YA NAFAKA, INAFUNIKA GUGUTA VIZURI, HUOTA MAGUNZI MAWILI, INAKOMAA MAPEMA', 'YES', '', '', 'YES', '', '', '', '', '', ''),"+
				"(175, 'PAN 5195', 4, 3, 2, 3, 8, 1, 1, 1995, '70', '70', '70', '1000-1800', 1000, 1800, 'MEDIUM', '4-5', 'INATOMAZAO MENGI INAHIMILI VIRUSI VYA KUOZESHA MAHINDI', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(176, 'PAN 5243', 4, 3, 2, 3, 8, 1, 1, 2001, '70', '70', '70', '1200-1800', 1200, 1800, 'MEDIUM', '4-5', 'INAHIMILI MADOADOA YA KIJIVU NA KUVU. INATOA MAZAO MENGI', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(177, 'PAN 5355', 4, 3, 2, 3, 8, 1, 1, 2000, '70', '70', '70', '1000-1800', 1000, 1800, 'MEDIUM', '4-5', 'INAHIMILI KWA KIASI VIRUSI VINAVYOSABABISHA MAHINDI KUOZA', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(178, 'PAN 57', 4, 3, 2, 3, 8, 1, 1, 2008, '70', '70', '70', '1200-1700', 1200, 1700, 'MEDIUM', '4-5', 'NGUMU, INAHIMILI MAGONJWA YA MAJANI', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(179, 'PAN 5M-35', 4, 3, 2, 3, 8, 1, 1, 2010, '70', '70', '70', '1200-1700', 1200, 1700, 'MEDIUM', '4-4.5', 'MAGUNZI MAWILI, INAFUNIKA GUGUTA VIZURI, INAHIMILI MAGONJWA YA MAJANI', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(180, 'PAN 63', 4, 3, 2, 3, 8, 1, 3, 2010, '70', '70', '70', '1200-1700', 1200, 1700, 'MEDIUM', '4-4.5', 'INATOA MAZAO MENGI,  INAHIMILI MAGONJWA MENGI YA MAHINDI IKIWEMO VIRUSI VYA KUOZESHA MAHINDI, INAHIMILI VIZURI KIANGAZI, INAFANYA VIZURI SEHEMU NYINGI,UTAFITI HALISI(TRUE BREEDING), ZAKE NGUMU', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(181, 'PAN 67', 4, 3, 2, 3, 8, 1, 3, 2001, '70', '70', '70', '1200-1600', 1200, 1600, 'MEDIUM', '4-5', 'INAHIMILI VIRUSI VINAVYOSABBISHAMAHINDI KUOZA,,INAHIMILI UDONGO ULIO N A VIWANGO VYA CHINI VYA NITROGEN', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(182, 'PAN 683', 4, 3, 2, 4, 8, 1, 1, 2003, '70', '70', '70', '1800-2200', 1800, 2200, 'LATE', '6-7', 'INAKOMAA KUCHELEWA, INASIMAMA VIZURI, INAFUNIKA KILELE ,INAHIMILI MADOADOA YA KIJIVU', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(183, 'PAN 69', 4, 3, 2, 3, 8, 1, 3, 2008, '70', '70', '70', '1200-1700', 1200, 1700, 'MEDIUM', '4-5', 'INATOA MAZAO MENGI, INAFANYA VIZURI KATIKA MAENEO MENGI, INASIMAMA VIZURI, INAHIMILI MAGONJWA YA MAJANI,', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(184, 'PAN 691', 4, 3, 2, 4, 8, 1, 1, 2001, '70', '70', '70', '1700-2400', 1700, 2400, 'LATE', '6-9', 'INAHIMILI MADOADOA YA KIJIVU, INASIMAMA VIZURI NA KUOTA GUNZI CHINI', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(185, 'PAN 697', 4, 3, 2, 3, 8, 1, 1, 2010, '70', '70', '70', '1500-2000', 1500, 2000, 'MEDIUM', '5-5.5', 'INAHIMILI MAGONJWA KAMA VILE VIRUSI VINAVYOOZESHA MAHINDI. INAFUNIKA GUNZI VIZURI. MAGUNZI YA KUPENDEZA', '', '', '', '', '', '', '', '', '', ''),"+
				"(186, 'PAN 7M-89', 4, 3, 2, 3, 8, 1, 1, 2008, '70', '70', '70', '1400-2000', 1400, 2000, 'MEDIUM', '5-6', 'INATOA MAZAO MENGI NA KUHIMILI MAGONJWA YA MAJANI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(187, 'PAN 7M-97', 4, 3, 2, 3, 8, 1, 1, 2008, '70', '70', '70', '1400-1700', 1400, 1700, 'MEDIUM', '4-5', 'INATOA MAZAO MENGI NA KUHIMILI MAGONJWA YA MAJANI', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(188, 'PAN 8M-91', 4, 3, 2, 4, 8, 1, 1, 2008, '70', '70', '70', '1400-2000', 1400, 2000, 'MEDIUM', '5-6', 'INAHIMILI UGONJWA WA MAJANI KUWA NA MADOA YA RANGI YA KIJIVU NA KUTU YA MAJANI NI NZURI KWA CHAKULA CHA MIFUGO NA HUZAA KWA WINGI?', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(189, 'PAN 8M-93', 4, 3, 2, 4, 8, 1, 1, 2011, '70', '70', '70', '1400-2000', 1400, 2000, 'MEDIUM', '4-5', 'INATOA MAZAO MENGI,INAFUNIKA GUNZI VIZURI,INASIMAMA VIZURI,INAHIMILI KUOIZA KWA MAGUNZI, MADOADOA YA KIJIVU NA VIRUSI VINAVYOOZESHA MAHINDI', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(190, 'PAN 99', 4, 3, 2, 4, 8, 1, 1, 2001, '70', '70', '70', '1000-2000', 1000, 2000, 'MEDIUM', '5-6', 'INAHIMILI MADOADOA YA KIJUVU NA KIANGAZI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(191, 'PEX 501', 4, 3, 2, 3, 8, 1, 1, 2012, '70', '70', '70', '1200-1700', 1200, 1700, 'MEDIUM', '4-4.5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU, KUOZA GUNZI KWAHIVYO NZURI PIA KWA GUNZI(COB). INAHIMILI UKAME', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(192, 'PEX 602', 4, 3, 2, 3, 8, 1, 1, 2011, '70', '70', '70', '1200-1700', 1200, 1700, 'MEDIUM', '4.0-4.5', 'MABUA HUSIMAMA WIMA, HUTOA MAGUNZI MAWILI, HUBAKI RANGI YA KIJANI WAKATI WOTE', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(193, 'PEX 702', 4, 3, 2, 3, 8, 1, 1, 2011, '70', '70', '70', '1500-2000', 1500, 2000, 'MEDIUM', '4.5-5.0', 'NZURI KWA KUHIMILI MAGONJWA YA MAJANI (KUVU, KUOZA, MADOA YA KIJIVU, KUTU YA MAJANI) MAGUNZI MAKUBWA', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(194, 'PEX 703', 4, 3, 2, 4, 8, 1, 1, 2011, '70', '70', '70', '1700-2100', 1700, 2100, 'MEDIUM', '5.0-5.5', 'NZURI KWA KUFUNIKA GUNZI NA MARADHI YA KUOZA GUNZI', '', '', '', 'YES', '', '', '', '', '', ''),"+
				"(195, 'PEX 704', 4, 3, 2, 3, 8, 1, 1, 2012, '70', '70', '70', '1500-2000', 1500, 2000, 'MEDIUM', '4.5-5.0', 'INAFUNIKA GUNZI VIZURI,HUSIMAMA WIMA, INAHIMILI MAGONJWA YA MAJANI', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(196, '30G19', 4, 3, 2, 3, 8, 2, 3, 2003, '71', '71', '71', '1000-1800', 1000, 1800, 'MEDIUM', '5-6', 'HUSIMAMA VIZURI,INAHIMILI MADOA YA KIJIVU NA VIRUSI VYA KUOZESHA MAHINDI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(197, 'PHB 30D79', 4, 3, 2, 3, 8, 2, 3, 2008, '71', '71', '71', '1000-1800', 1000, 1800, 'MEDIUM', '5-6', 'INAHIMILI KUVU & MSV, INAHIMILI MADOADOA YA KIJIVU, MABUA THABITI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(198, 'PHB 30G19', 4, 3, 2, 3, 8, 2, 3, 2006, '71', '71', '71', '1000-1800', 1000, 1800, 'MEDIUM', '5-6', 'INAHIMILI MADOADOA YA KIJIVU, INAOTA MAJANI IKIWA CHINI, INAFUNIKA GUNZI VIZURI INASIMAMA WIMA, HAIVUNJIKI.', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(199, 'PHB 30G97', 4, 3, 2, 3, 8, 2, 3, 2003, '71', '71', '71', '1200-2000', 1200, 2000, 'MEDIUM', '4-5', 'INAHIMILI MADOADOA YA KIJIVU, INAHIMILI KUOZA GUNZI(COB), INAHIMILI VIRUSI VUNAVYOOZESHA MAHINDI, NAFAKA YA UBORA WA JUU, NZURI KWA MAENEO YA MUINUKO WA KADRI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(200, 'PHB 30V53', 4, 3, 2, 3, 8, 2, 3, 2006, '71', '71', '71', '1200-2000', 1200, 2000, 'MEDIUM', '5-6', 'INAHIMILI MADOADOA YA KIJIVU, INAHIMILI VIRUSI VINAVYOSABABISHA MAHINDI KUOZA , INAOTESHA MAGUNZI SEHEMU ZA CHINI, INAFUNIKA GUNZI VIZURI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(201, 'PHB 3253W', 4, 3, 2, 3, 8, 2, 3, 1996, '71', '71', '71', '800-1800', 800, 1800, 'MEDIUM', '4-5', 'INATUMIKA KATIKA MAZINGIRA TOFAUTI TOFAUTI, INASIMAMA VIZURI', '', '', '', '', '', '', '', '', '', ''),"+
				"(202, 'PHB 3812W', 4, 3, 2, 3, 8, 2, 3, 2011, '71', '71', '71', '1200-1600', 1200, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(203, 'PHB30H83', 4, 3, 2, 3, 8, 2, 3, 2002, '71', '71', '71', '1000-2000', 1000, 2000, 'MEDIUM', '5-6', 'INAHIMILI MADOADOA YA KIJIVU NA KUOZA GUNZI(COB)', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(204, 'X6C461W', 4, 3, 2, 3, 8, 2, 9, 2012, '71', '71', '71', '1000-1600', 1000, 1600, 'EARLY', '3-', 'INAHIMILI UGONJWA WA MADOADOA YA RANGI YA JIVU,NI THABITI KWA MAZINGIRA MBALI MBALI,INAFANYA VIZURI NYAKATI ZA UKAME & MAZINGIRA YENYE NITROGEN YA KIWANGO CHA CHINI, INASIMAMA VIZURI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(205, 'X7A344W', 4, 3, 2, 3, 8, 2, 9, 2012, '71', '71', '71', '1200-1800', 1200, 1800, 'MEDIUM', '4.5 -5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI NA MADOADOA YA KIJIVU,AINA NZURI YA ,MAHINDI YENYE MAZAO BORA NA INASIMAMA VIZURI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(206, 'P2859W', 4, 3, 2, 3, 8, 2, 3, 2007, '71', '71', '71', '1200-1600', 1200, 1600, 'EARLY', '3-4', 'INAHIMILI UKAME, MARADHI YA MAJANI KUGEUKA RANGI YA KIJIVU,INAHIMILI WADUDU WAHARIBIFU, KOVU, KUTU YA MAJANI, KIWANGO CHA CHINI CHA NITROGEN, HUKUAVIZURI.', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(207, 'P3253W', 4, 3, 2, 3, 8, 2, 3, 1994, '71', '71', '71', '1200-1600', 1200, 1600, 'MEDIUM', '4-5', 'INATUMIKA KATIKA MAZINGIRA TOFAUTI TOFAUTI, INASIMAMA VIZURI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(208, 'P3812W', 4, 3, 2, 3, 8, 2, 3, 2011, '71', '71', '71', '1200-1600', 1200, 1600, 'MEDIUM', '5-6', 'MABUA HUSIMAMA WIMA, INAHIMILI MADOA YA KIJIVU NA WADUDU WAHARIBIFU, GOOD EAR PLACEMENT', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', ''),"+
				"(209, 'SC DUMA 41', 4, 3, 2, 3, 8, 2, 3, 2004, '73', '73', '7', '800-1800', 800, 1800, 'MEDIUM', '4-5', 'INAHIMILI KUOZA GUNZI(COB), KUTU YA MAJANI,VIRUSI VYINAVYOOZESHA MAHINDI, UKAME ,INAKOMAA MAPEMA', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(210, 'SC DUMA 43', 4, 3, 2, 3, 8, 2, 3, 2004, '73', '73', '7', '800-1800', 800, 1800, 'MEDIUM', '4-5', 'INAHIMILI KUOZA MASIKIO, KUTU YA MAJANI,VIRUSI VYINAVYOOZESHA MAHINDI, UKAME ,INAKOMAA MAPEMA', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(211, 'SC DUMA 45', 4, 3, 2, 3, 8, 2, 9, 2013, '73', '73', '7', '400-1200', 400, 1200, 'EARLY', '3 -3.5', 'INAHIMILI KIANGAZI,INAHIMILI MAGONJWA YA HEWA, UGONJWA WA MAJANI KUGEUKA RANGI YA KIJIVU, INAHIMILI JOTO NA KUTU YA MAJANI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(212, 'SC DUMA 47', 4, 3, 2, 3, 8, 2, 9, 2013, '73', '73', '7', '400-1200', 400, 1200, 'EARLY', '3-3.5', 'INAHIMILI UKAME,INAHIMILI MAGONJWA YA HEWA, INAHIMILI JOTO NA KUTU YA MAJANI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(213, 'SC PUNDA MILIA 51', 4, 3, 2, 3, 8, 1, 1, 2006, '73', '73', '7', '800-1600', 800, 1600, 'MEDIUM', '4-4.5', 'INAHIMILI MADOADOA YA KIJIVU, VIRUSI VINAVYOOZESHA MAHINDI  INASIMAMA VIZURI, INAFANYA VIZURI MAENEOMENGI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(214, 'SC PUNDA MILIA 529', 4, 3, 2, 3, 8, 2, 9, 2013, '73', '73', '7', '800-1600', 800, 1600, 'EARLY', '3.5-4', 'INASIMAMA VIZRURI, INAHIMILI MADOADOA YA KIJIVU INAHIMILI VIRUSI VYA KUOZESHA MAHINDI?', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(215, 'SC PUNDA MILIA 53', 4, 3, 2, 3, 8, 2, 3, 2005, '73', '73', '7', '1800-1900', 1800, 1900, 'MEDIUM', '5-6', 'INASIMAMA VIZURI INAHIMILI MADOADOA YA KIJIVU NA VIRUSI VINAVYOSABABISHA KUOZA KWA MAHINDI', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', ''),"+
				"(216, 'SC SIMBA 63', 4, 3, 2, 3, 8, 1, 1, 2005, '73', '73', '7', '1200-1800', 1200, 1800, 'MEDIUM', '4-5', 'INAHIMILI UKAME, MARADHI YA MAJANI KUGEUKA RANGI YA KIJIVU,INAHIMILI WADUDU WAHARIBIFU, KOVU  NA KUOZA GUNZI(COB)', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(217, 'SC SIMBA 65', 4, 3, 2, 3, 8, 2, 9, 2013, '73', '73', '7', '900-1400', 900, 1400, 'EARLY', '4', 'HUKUA KWA KIPIMO, INASIMAMA VIZURI, INAHIMILI MAGONJWA YA HEWA, MADOADOA YA RANGI YA JIVU,INAHIMILI UKAME NA KUTU, INAPUKUSIKA KWA URAHISI, INAHIMILI WADUDU WALA MAHINDI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(218, 'SC TEMBO 71', 4, 3, 2, 3, 8, 1, 1, 2006, '73', '73', '7', '1800-1900', 1800, 1900, 'MEDIUM', '5-5.5', 'INAHIMILI MADOADOA YA KIJIVU, VIRUSI VINAVYOOZESHA MAHINDI,INASIMAMA VIZURI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(219, 'SC TEMBO 727', 4, 3, 2, 3, 8, 2, 9, 2013, '73', '73', '7', '1200-1400', 1200, 1400, 'MEDIUM', '', 'INASIMAMA VIZURI, INAHILIMI VIRUSI VYA KUOZESHA MAHINDI NA INAPUKUSIKA VIZURI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(220, 'SC TEMBO 73', 4, 3, 2, 3, 8, 2, 3, 2013, '73', '73', '7', '1200-1600', 1200, 1600, 'MEDIUM', '5-6', 'INASIMAMA VIZRURI, INAHIMILI MADOADOA YA KIJIVU INAHIMILI VIRUSI VYA KUOZESHA MAHINDI?', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(221, 'SC05C8480', 4, 3, 2, 3, 8, 1, 1, 2012, '73', '73', '7', '900-1400', 900, 1400, 'EARLY', '', 'INASIMAMA VIZURI,HAIINAMI SANA, INAFUNIKA KILELE VIZURI,INATOA GUNZI KATIKATI ,INAHIMILI MADOA YA KIJIVU, INAHIMILI JOTO NA KUTU YA MAJANI,INAPUKUSIKA VIZURI,INAHIMILI UKAME,INAHIMILI MAGONJWA YA MAGUNZI- DIPLODIA & FUSARIUM, MAZAO YA JUU ? WASTANI WA TAN', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(222, 'SC05C8575', 4, 3, 2, 3, 8, 1, 1, 2012, '73', '73', '7', '1200-1800', 1200, 1800, 'MEDIUM', '', 'INASIMAMA VIZURI,HAIINAMI SANA, INAFUNIKA KILELE VIZURI,INATOA GUNZI KATIKATI ,INAHIMILI MADOA YA KIJIVU, INAHIMILI JOTO NA KUTU YA MAJANI,INAPUKUSIKA VIZURI,INAHIMILI UKAME,INAHIMILI MAGONJWA YA MAGUNZI- DIPLODIA & FUSARIUM, MAZAO YA JUU ? WASTANI WA TAN', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(223, 'SIMBA 61', 4, 3, 2, 3, 8, 2, 3, 2003, '73', '73', '7', '1200-1800', 1200, 1800, 'MEDIUM', '4.5-6', 'INAHIMILI VIRUSI VINAVYOSABBISHAMAHINDI KUOZA,, KUOZA GUNZI(COB), MADOADOA YA KIJIVU', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(224, 'UA KAYONGO 1', 4, 3, 2, 3, 3, 3, 5, 2004, '27', '79', '79', '1200-1600', 1200, 1600, 'MEDIUM', '4-5', 'INAHIMILI UGONJWA WA STRIGA', '', '', '', '', '', '', '', '', '', ''),"+
				"(225, 'WH 101', 4, 3, 2, 2, 8, 1, 1, 2006, '79', '79', '79', '', 0, 0, 'EARLY', '3.5-4', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU INAHIMILI UKAME NA NITROGEN YA CHINI. NZURI KWA MSIMUWA PILI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(226, 'WH 105', 4, 3, 2, 3, 8, 2, 3, 2010, '79', '79', '79', '0-1500', 0, 1500, 'EARLY', '3.5-4', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU INAHIMILI UKAME NZURRI KWA UPANZI MSIMU WA PILI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(227, 'WH 401', 4, 3, 2, 2, 8, 1, 1, 2006, '79', '79', '79', '', 0, 0, 'MEDIUM', '4-5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU INAHIMILI UKAME NA NITROGEN YA CHINI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(228, 'WH 402', 4, 3, 2, 2, 8, 1, 1, 2006, '79', '79', '79', '1000-1800', 1000, 1800, 'MEDIUM', '4.5 -5.5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU, THABITI NA YA KIJANIWAKATIWOTE, MABUA THABITI WAKATI WA KUVUNA NZURI KWA CHAKULA CHA MIFUGO.', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(229, 'WH 502', 4, 3, 2, 3, 8, 2, 3, 2003, '79', '79', '79', '1000-1700', 1000, 1700, 'MEDIUM', '4 - 5', 'INAHIMILI WADUDU WALA MAHINDI, UGONJWA WA MADOADOA YA RANGI YA JIVU, KUVU/BLIGHT, STRIGA, UKAME NA VIWANGO VYA CHINI VYA NITROGEN MCHANGANI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(230, 'WH 504', 4, 3, 2, 3, 8, 2, 3, 2003, '79', '79', '79', '1000-1700', 1000, 1700, 'MEDIUM', '4.5-5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU , MABUA YA KIJANI WAKATI WA KUVUNA, NZURI KWA CHAKULACHA MIFUGO INAHIMILI UKAME NA MCHANGA ULIO NA VIWANGO VYA CHINI VYA NITROGEN', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(231, 'WH 505', 4, 3, 2, 3, 8, 2, 3, 2003, '79', '79', '79', '1200-1800', 1200, 1800, 'MEDIUM', '4.5-5.5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU ,MABUA YA KIJANI WAKATI WA KUVUNA, NZURI KWA CHAKULA CHA MIFUGO ,INAHIMILI MCHANGA WWNYE VIWANGO VYA CHINI VYA  NITROGEN', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(232, 'WH 507', 4, 3, 2, 2, 8, 1, 1, 2006, '79', '79', '79', '1000-1600', 1000, 1600, 'MEDIUM', '4-5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU INAHIMILI UKAME NA NITROGEN YA CHINI.', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(233, 'WH 508', 4, 3, 2, 2, 8, 2, 3, 2006, '79', '79', '79', '1000-1500', 1000, 1500, 'MEDIUM', '5-6', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU INAHIMILI UKAME NA NITROGEN YA CHINI, MABUA YA KIJANI WAKATI WA KUVUNA', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(234, 'WH 602', 4, 3, 2, 2, 8, 2, 3, 2006, '79', '79', '79', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(235, 'WH 699', 4, 3, 2, 4, 8, 2, 3, 2002, '79', '79', '79', '1700-2200', 1700, 2200, 'LATE', '6-8', 'INAHIMILI  EAR ROT', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(236, 'WH 904', 4, 3, 2, 3, 8, 2, 3, 2002, '79', '79', '79', '1000-1700', 1000, 1700, 'MEDIUM', '5-6', 'INAHIMILI VIRUSI VIOZESHAVYO MAHINDI', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(237, 'WH002', 4, 3, 2, 2, 8, 2, 3, 2008, '79', '79', '79', '', 0, 0, 'MEDIUM', '4.5-5.5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU INAHIMILI UKAME NA NITROGEN YA CHINI. NZURI KWA MSIMUWA PILI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(238, 'WH003', 4, 3, 2, 3, 8, 1, 1, 2010, '79', '79', '79', '0-1000', 0, 1000, 'EARLY', '3 - 4', 'INAHIMILI UGONJWA WA MADOADOA YA RANGI YA JIVU,INAHIMILI UKAME NA VIWANGO VYA CHINI VYA NITROGEN', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(239, 'WH202', 4, 3, 2, 3, 8, 2, 3, 2010, '79', '79', '79', '0-1500', 0, 1500, 'MEDIUM', '4.0-5.0', 'TOLERANT TO MAIZE STREAK VIRUS, GREY LEAF SPOT, DROUGHT AND LOW NITROGEN, GOOD 2ND SEASON CROP IN MEDIUM ALTITUDES.', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(240, 'WH301', 4, 3, 2, 3, 8, 1, 1, 2008, '79', '79', '79', '1200-1800', 1200, 1800, 'MEDIUM', '4-5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU INAHIMILI UKAME NA NITROGEN YA CHINI. NZURI KWA MAHINDI YA KUCHOMA', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(241, 'WH302', 4, 3, 2, 2, 8, 1, 1, 2008, '79', '79', '79', '', 0, 0, 'MEDIUM', '4-5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU INAHIMILI UKAME NA NITROGEN YA CHINI. NZURI KWA UPANZI MSIMU WA PILI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(242, 'WH404', 4, 3, 2, 2, 8, 3, 8, 2008, '79', '79', '79', '', 0, 0, 'MEDIUM', '5-6', 'INAHIMILI WADUDU WALA MAHINDI, UGONJWA WA MADOADOA YA RANGI YA JIVU NA KUVU, BUA THABITI LA RANGI  YA KIJANI WAKATI WA KUVUNA INAWEZA KUTUMIKA KWA CHAKULA CHA MIFUGO', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(243, 'WH405', 4, 3, 2, 2, 8, 1, 1, 2008, '79', '79', '79', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(244, 'WH406', 4, 3, 2, 3, 8, 1, 1, 2010, '79', '79', '79', '1000-1700', 1000, 1700, 'MEDIUM', '5 - 6', 'INAHIMILI WADUDU WALA MAHINDI, UGONJWA WA MADOADOA YA RANGI YA JIVU NA KUVU, BUA THABITI LA RANGI  YA KIJANI WAKATI WA KUVUNA INAWEZA KUTUMIKA KWA CHAKULA CHA MIFUGO', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(245, 'WH501', 4, 3, 2, 3, 8, 1, 1, 2003, '79', '79', '79', '1300-1700', 1300, 1700, 'MEDIUM', '5-6', 'NI NZURI KWA UZALISHAJI WA GHARAMA YA CHINI, INAHIMILI MADOADOA YA KIJIVU, VIRUSI VINAVYOOZESHA MAHINDI NA KUVU', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(246, 'WH601', 4, 3, 2, 4, 8, 1, 1, 2009, '79', '79', '79', '1500-2100', 1500, 2100, 'MEDIUM', '5 – 6', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU INAHIMILI KUVUNJIKA MABUA NA INAFUNIKA VIZURI GUNZI', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(247, 'WH605', 4, 3, 2, 2, 8, 2, 3, 2008, '79', '79', '79', '', 0, 0, 'MEDIUM', '5-6', 'INAHIMILI VIRUSI VYA KUOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU, MABUA THABITI YA RANGI YA KIJANI WAKATI WA KUVUNA,INATUMIKA KAMA CHAKULKA CHA MIFUGO', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(248, 'WS 103', 4, 3, 2, 2, 8, 2, 3, 2006, '79', '79', '79', '', 0, 0, 'EARLY', '3-4', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU INAHIMILI UKAME NA NITROGEN YA CHINI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(249, 'WS 202', 4, 3, 2, 3, 8, 2, 3, 2004, '79', '79', '79', '0-1500', 0, 1500, 'EARLY', '3-4', 'INAHIMILI VIRUSI VISABABISHAVYO MAHINDI KUOZA, MADOADOA YA KIJIVU, INAHIMILI UKAME, KIWANGO CHA CHINI CHA NITROGEN MCHANGANI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(250, 'WS 303', 4, 3, 2, 3, 8, 1, 1, 2010, '79', '79', '79', '0-1500', 0, 1500, 'MEDIUM', '4-5', 'INAHIMILI VIRUSI VINAVYOOZESHA MAHINDI, MADOADOA YA KIJIVU NA KUVU INAHIMILI UKAME NA NITROGEN YA CHINIINAHIMILI UGONJWA WA STRIGA', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', '', '', '', ''),"+
				"(251, 'WS 909', 4, 3, 2, 3, 8, 2, 3, 2002, '79', '79', '79', '0-1500', 0, 1500, 'MEDIUM', '4-5', 'INAHIMILI STRIGA', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(252, 'WS104', 4, 3, 2, 3, 8, 2, 3, 2010, '79', '79', '79', '0-1200', 0, 1200, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(253, 'KH500-39A', 4, 3, 2, 3, 4, 4, 2, 2008, '27', '32', '6', '1200-1800', 1200, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(254, 'KSTP 94', 4, 21, 3, 3, 3, 4, 9, 2000, '27', '30', '64', '1350-1800', 1350, 1800, 'EARLY', '4', 'INAHIMILI UGONJWA WA STRIGA', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(255, 'KK SYN-1', 4, 21, 3, 3, 3, 1, 9, 2004, '27', '39', '72', '1500-1800', 1500, 1800, 'EARLY', '3-4', 'INAFANYA VIZURI KATIKA MAZINGIRA TOFAUTI TOFAUTI, INAFANYA INAFAA KWA KILIMO CHA GHARAMA YA CHINI,  INAHIMILI VIRUSI VINAVYOZESHA MAHINDI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(256, 'KK SYN-2', 4, 21, 3, 3, 3, 4, 9, 2004, '27', '39', '72', '1500-1800', 1500, 1800, 'EARLY', '3-4', 'INAFAA KATIKA MAZINGIRA TOFAUTI TOFAUTI, INAFAA KWA KILIMO CHA GHARAMA YA CHINI, RESISTANT TO MAIZE STREAK VIRUS', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(257, 'CKIR04002', 4, 21, 3, 3, 7, 3, 5, 2006, '27', '40', '64', '0-900', 0, 900, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(258, 'CKIR04003', 4, 21, 3, 3, 7, 3, 5, 2006, '27', '40', '64', '0-900', 0, 900, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(259, 'KAT CB', 4, 21, 3, 3, 2, 2, 3, 1967, '27', '40', '33', '900-1350', 900, 1350, 'EARLY', '3-4', 'INAKOMAA MAPEMA', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(260, 'KDV1', 4, 21, 3, 3, 4, 4, 3, 2006, '27', '40', '13,19', '0-900', 0, 900, 'EXTRA EARLY', '2.5-3', 'INAKOMAA MAPEMA, INAHIMILI UKAME', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', '', '', '', ''),"+
				"(261, 'KDV2', 4, 21, 3, 3, 4, 4, 3, 2006, '27', '40', '13,19', '0-900', 0, 900, 'EXTRA EARLY', '2.5-3', 'INAKOMAA MAPEMA, INAHIMILI UKAME', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', '', '', '', ''),"+
				"(262, 'KDV3', 4, 21, 3, 3, 3, 4, 3, 2006, '27', '40', '13', '0-900', 0, 900, 'EXTRA EARLY', '2.5-3.5', 'INAHIMILI UKAME', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(263, 'KDV4', 4, 21, 3, 3, 3, 4, 3, 2006, '27', '40', '13', '0-900', 0, 900, 'EXTRA EARLY', '2.5-3', 'INAKOMAA MAPEMA, INAHIMILI UKAME', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', '', '', '', ''),"+
				"(264, 'KDV5', 4, 21, 3, 3, 3, 4, 3, 2006, '27', '40', '13', '0-900', 0, 900, 'EXTRA EARLY', '2.5-3.5', 'INAHIMILI UKAME', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(265, 'KDV6', 4, 21, 3, 3, 3, 4, 3, 2006, '27', '40', '13', '0-900', 0, 900, 'EXTRA EARLY', '2.5-3', 'INAKOMAA MAPEMA, INAHIMILI UKAME', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', '', '', '', ''),"+
				"(266, 'KDV7', 4, 21, 3, 3, 3, 4, 3, 2006, '27', '40', '13', '0-900', 0, 900, 'EXTRA EARLY', '2.5-3.5', 'INAHIMILI UKAME', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(267, 'GAF4', 4, 21, 3, 3, 7, 4, 2, 2007, '27', '41', '33', '1200-1600', 1200, 1600, 'EARLY', '3-4', 'INAHIMILI UGONJWA WA STRIGA', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(268, 'CHANIA DESI 1', 2, 8, 4, 3, 4, 2, 2, 2013, '15', '15', '19,56,66', '800-1200', 800, 1200, 'EARLY', '2.5-3', 'INAHIMILI WADUDU, INAONGEZA NITROGEN 20-40KG/HA, INAFUKUZA WADUDUKAMA VILE  RUSTS  KATIKA NGANO NA FUSARIU', 'YES', 'YES', 'YES', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(269, 'CHANIA DESI 2', 2, 8, 4, 3, 4, 2, 2, 2013, '15', '15', '19,56,66', '800-1200', 800, 1200, 'EARLY', '2.5-3', 'INAHIMILI KIANGAZI INAHIMILI JOTO, INANYOOKA NA KUWA KIVULI KIKUBWA . INAWEZA KUVUNWA VIZURI NA COMBINE HARVESTER, INAHIMILI MARADHI YA IG FUSARIUM WILT, DRY ROT & COLLAR ROT, TOUGH SEED COAT, RESISTANT TO STORAGE PESTS, BROWN SEEDED, SUITABLE FOR MAKING ', 'YES', 'YES', 'YES', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(270, 'CHANIA DESI 3', 2, 8, 4, 3, 4, 2, 2, 2013, '15', '15', '19,56,66', '800-1200', 800, 1200, 'EARLY', '2.5-3', 'INAHIMILI UKAME, INAHIMILI MARADHI YA FUSARIUM WILT, DRY ROT NA COLLAR ROT GANDA GUMU LA MBEGU, INAHIMILI WADUDU, MBEGU RANGI YA HUDHURUNGI, NZURI KWA KUPIKA GIDHERI  NA SUPU, NZURI KUWEKWA KWA MIKEBE', 'YES', 'YES', 'YES', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(271, 'NGARA LOCAL', 2, 8, 4, 3, 4, 4, 2, 2013, '15', '15', '19,56,66', '600-1200', 600, 1200, 'EARLY', '3', 'INAHIMILI MARADHI YA  FUSARIUM WILT, MBEGU NDOGO YA RANGI YA HUDHURUNGI.', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(272, 'LDT 0069', 2, 8, 4, 3, 8, 1, 1, 2010, '56', '24,56', '56', '500 - 2000', 500, 2000, 'EARLY', '3', 'INAHIMILI MARADHI YA  FUSARIUM WILT, UTAFITI HALISI(TRUE BREEDING), NDOGO YA RANGI YA HUDHURUNGI.', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(273, 'LDT 065', 2, 8, 4, 3, 8, 1, 1, 2010, '56', '24,56', '56', '500 - 2000', 500, 2000, 'MEDIUM', '3-4', 'INAHIMILI MARADHI YA FUSARIUM WILT, MBEGU YAKE NYEUPE YA KADRI.', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(274, 'SAINA-K1', 2, 8, 4, 3, 7, 4, 2, 2012, '27', '40', '19,56,66', '600-1200', 600, 1200, 'MEDIUM', '3-4', 'MBEGU KUBWA -  AINA YA KABULI, INAKUA VIZURI KATIKA MCHANGA USIO NA MAJI MENGI NA MCHANGA WA NGAMA, INAHIMILI UKAME, MAZAO YA JUU, INAONGEZA  NITROGEN 20-40KG/HA,BIOMASS, INAFUKUZA WADUDU KAMA VILE RUSTS, MBEGU NYEUPE, NZURI KWA SALADS', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(275, '27-1', 2, 11, 4, 3, 7, 4, 5, 1989, '27', '40', '33', '600-1200', 600, 1200, 'EARLY', '2.5 - 3', 'MATUMIZI YA AINA MBILI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', '', '', '', ''),"+
				"(276, 'HB 48/10E', 2, 11, 4, 3, 7, 4, 5, 1987, '27', '40', '33', '0-1200', 0, 1200, 'EARLY', '2 - 2.5', 'INAHIMILI MARADHI MENGI YA VIRUSI', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(277, 'K 80', 2, 11, 4, 3, 4, 2, 3, 2000, '27', '40', '13,14,56', '1200-1800', 1200, 1800, 'EARLY', '2.5-3', 'MATUMIZI YA AINA MBILI,INAHIMILI MBUNGO,SEHEMU YA KATIKATI NI RANGI YA FEDHA', 'YES', '', 'YES', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(278, 'KCP 022', 2, 11, 4, 3, 7, 4, 5, 2000, '27', '40', '33', '0-1200', 0, 1200, 'EARLY', '', '', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(279, 'KVU – 419 (KUNDE 419)', 2, 11, 4, 3, 7, 4, 5, 2000, '27', '40', '33', '0-1200', 0, 1200, 'EXTRA EARLY', '2 – 2.5', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(280, 'MACHAKOS 66 (M66)', 2, 11, 4, 3, 4, 4, 5, 1998, '27', '40', '13,33,56', '1200-1500', 1200, 1500, 'EARLY', '2.5-3', 'MATUMIZI YA AINA MBILI,SEHEMU YA KATIKATI NI RANGI YA KIJANI', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(281, 'KUNDE 1', 2, 11, 4, 3, 8, 4, 5, 0, '79', '79', '50,79', '0-2000', 0, 2000, 'EARLY', '2.5 - 3', 'MATUMIZI YA AINA MBILI', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(282, 'EGERTON MBAAZI M1', 2, 15, 4, 3, 4, 2, 2, 2012, '15', '15', '19,56,66', '800-1500', 800, 1500, 'MEDIUM', '4-5', 'INAHIMILI UKAME , KUNYAUKA MAJANI, INAHIMILI WADUDU WAHARIBIFU, MBEGU NGUMU RANGI YA CREAM', 'YES', '', 'YES', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(283, 'KAT 777', 2, 15, 4, 3, 7, 3, 8, 1981, '27', '40', '64', '600-1500', 600, 1500, 'MEDIUM', '5 - 6', 'INAHIMILI UKAME', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(284, 'KAT81/3/3', 2, 15, 4, 3, 7, 3, 8, 1981, '27', '40', '64', '900-1800', 900, 1800, 'MEDIUM', '5.5 -', 'MBEGU NGUMU YA RANGI NYEUSI', '', '', '', '', '', '', '', '', '', ''),"+
				"(285, 'KATUMANI 60/8', 2, 15, 4, 3, 4, 2, 3, 1998, '27', '40', '13,19', '0-1800', 0, 1800, 'MEDIUM', '4 - 5', 'INAKOMAA KWA MUDA MFUPI NA KUCHIPUKA TENA', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(286, 'MBAAZI 1', 2, 15, 4, 3, 4, 2, 3, 1998, '27', '40', '13,33', '600-900', 600, 900, 'EARLY', '3 - 4', 'INAKOMAA KWA MUDA MFUPI, MSIMU MMOJA', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', '', '', '', ''),"+
				"(287, 'MBAAZI 3', 2, 15, 4, 3, 7, 3, 8, 0, '27', '40', '64', '10-1500', 10, 1500, 'EXTRA EARLY', '3-3.5', 'MAFUTA 17.8%', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(288, 'CHELALANG', 2, 10, 4, 4, 4, 2, 3, 2008, '15', '15', '19,50,56,66', '1800-2200', 1800, 2200, 'MEDIUM', '2.5 - 3.5', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(289, 'CIANKU', 2, 10, 4, 4, 4, 2, 3, 2008, '15', '15', '19,50,56,66', '1500-2150', 1500, 2150, 'MEDIUM', '2.5 - 3.5', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(290, 'TASHA', 2, 10, 4, 3, 4, 2, 3, 2008, '15', '15', '19,50,56,66', '1500-2000', 1500, 2000, 'EARLY', '2.5 - 3.5', '', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(291, 'GLP-585 RED HARICOT', 2, 10, 4, 3, 7, 2, 3, 1982, '27', '27', '33', '1500-2000', 1500, 2000, 'EARLY', '2.5 - 3', 'NZURI KWA MAENEO YA MVUA NYINGI, INAHIMILI UGONJWA WA KUVU', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(292, 'MWEZI MOJA (GLP1004)', 2, 10, 4, 3, 4, 4, 5, 1982, '27,50', '27', '14,50', '1200-1600', 1200, 1600, 'EARLY', '2 - 3', 'INAFANYA VIZURI KATIKA SEHEMU KAME, INAKOMAA MAPEMA, INAHIMILI UKAME NA WADUDU AINA YA MBUNGO', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(293, 'MWITEMANIA(GLP 92)', 2, 10, 4, 3, 4, 2, 3, 1982, '27,50', '27', '14,50', '900-1600', 900, 1600, 'EARLY', '2-3', 'INAHIMILI UKAME', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(294, 'NEW MWEZI MOJA (GLP1127)', 2, 10, 4, 3, 4, 3, 8, 1982, '27', '27', '14', '1200-1600', 1200, 1600, '', '', 'RANGI YA MACHUNGWA INA KIWANGO CHA JUU CHA CAROTENE', 'YES', '', '', 'YES', '', '', '', '', '', ''),"+
				"(295, 'ROSECOCO (GLP 2)', 2, 10, 4, 3, 4, 2, 3, 1982, '27,50', '27', '14,50', '1500-2000', 1500, 2000, 'EARLY', '2 - 3', 'MAZAO YA JUU, INAKUBALIKA SEHEMU NYINGI, MBEGU YA RANGI YA KUPENDEZA, LADHA NZURI', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(296, 'KK 15 (MLB49/879)', 2, 10, 4, 3, 4, 4, 3, 1997, '27', '35', '10,16,33', '1500-1800', 1500, 1800, 'EARLY', '2.5 - 3', 'INAHIMILI UGONJWA WA KUOZA MIZIZI, INAIVA VIZURI', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(297, 'KK 22 (RWR719)', 2, 10, 4, 3, 7, 4, 9, 1996, '27', '35', '33', '1500-1800', 1500, 1800, 'EARLY', '2.5 - 3', 'HAIVUNJIKIVUJIKI, AINA YA SINDANO', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(298, 'KK 8 (SCAM-80/15)', 2, 10, 4, 3, 4, 4, 3, 1997, '27', '35', '9,10,16,21,33,56', '1500-1800', 1500, 1800, 'EARLY', '2.5 - 3', 'INAHIMILI UGONJWA WA KUOZA MIZIZI, INAIVA VIZURI', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(299, 'KAT B1(KATHEKA)', 2, 10, 4, 3, 7, 2, 3, 1987, '27', '36', '13,56', '1000-1800', 1000, 1800, 'EARLY', '2.5', 'INAKOMAA MAPEMA, LADHA NZURI, HAINA USHUZI, INAHIMILI JOTO, INAHIMILI KIANGAZI', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(300, 'KAT X 69', 2, 10, 4, 3, 7, 2, 3, 1995, '27', '36', '33', '1200-1800', 1200, 1800, 'EARLY', '2 - 3', 'MAZAO YA JUU, INAHIMILI KUVU, UGONJWA WA MOSSAIC VIRUS, ANGULAR LEAF SPOT, CHARCOAL ROT', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(301, 'KAT-BEAN 9', 2, 10, 4, 3, 7, 2, 3, 1998, '27', '36', '13', '900-1600', 900, 1600, 'EARLY', '2.5-3', 'INAHIMILI JOTO, NA UKAME, HAINA USHUTO', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(302, 'GLP-92 PINTO BEAN', 2, 10, 4, 3, 7, 4, 5, 1982, '27', '27', '50', '100-1500', 100, 1500, 'MEDIUM', '3 - 3.5', 'INAHIMILI UGINJWA WA KUNYAUKA MAJANI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(303, 'CANADIAN WONDER (GLP-24)', 2, 10, 4, 3, 7, 2, 3, 1982, '27,50', '27,50', '14,50', '1200-1800', 1200, 1800, 'MEDIUM', '3 - 3.5', 'INAHIMILI UGINJWA WA KUNYAUKA MAJANI', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(304, 'GLP-X 1127 NEW MWEZI MOJA', 2, 10, 4, 3, 7, 4, 5, 1982, '27,50', '27,50', '50', '1000-1500', 1000, 1500, 'EARLY', '2.5 - 3', 'INAWEZA KUKUZWA SEHEMU NYINGI, INAHIMILI KUVU,INAHIMILI KUTU.', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(305, 'MBIGO', 2, 10, 4, 3, 7, 4, 2, 2013, '27', '38', '64', '1,200-1,600', 1200, 1600, 'MEDIUM', '3-4', 'MAFUTA YAKE 22%', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(306, 'KAT X56', 2, 10, 4, 3, 7, 2, 3, 1995, '27', '40', '13,56', '900-1800', 900, 1800, 'EARLY', '2.5-3', 'MAZAO YA JUU, INAIVA VIZURI, LADHA NZURI', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(307, 'KAT/BEAN 2', 2, 10, 4, 3, 7, 1, 9, 1987, '27', '40', '33', '1200-1800', 1200, 1800, 'EARLY', '2 - 3', 'INAKOMAA KWA MUDA WAKADRI INAHIMILI UGONJWA WA KUNYAUKA MAJANI,, VIZURI VYA MOSAIC NA KUKAUKA MAJANI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(308, 'WAIRIMU DWARF', 2, 10, 4, 3, 8, 2, 3, 2008, '50', '74', '50,74', '500', 500, 1700, 'EARLY', '2.5 - 2.8', 'INAKOMAA MAPEMA,  INAHIMILI JOTO, NI NZURI KWA KUKUZA PAMOJA NA MAHINDI , NI NZURI KWA KUPIKA INAIVA HARAKA', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', '', '', '', ''),"+
				"(309, 'KABETE SUPER', 2, 10, 4, 3, 3, 1, 2, 2008, '75', '75', '16', '1300-2000', 1300, 2000, 'MEDIUM', '3 - 3.5', 'MBEGU KUBWA INAHIMILI  UGONJWA WA MADOADOA VIRUSI VYA MOSAIC NA KUKAUKA KWA MAJANI', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(310, 'KENYA ALUMASI', 2, 10, 4, 3, 2, 2, 1, 2013, '75', '75', '64', '1300-2000', 1300, 2000, '', '', 'INAHIMILI  UGONJWA WA KUNYAUKA MAJANI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(311, 'KENYA CHEUPE', 2, 10, 4, 3, 2, 2, 1, 2013, '75', '75', '64', '1300-2000', 1300, 2000, '', '', 'MIZIZI YA MVIRINGO,RANGI YA ZAMBARAU,KIMA CHA JUU CHA MACHO,NYAMA NYEUPE,INAHIMILI UGONJWA WA KUNYAUKA,INAHIFADHIKA VIZURI,INAHIMILI KUBADILIKA KIJANI', 'YES', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(312, 'KENYA EARLY', 2, 10, 4, 3, 3, 2, 2, 2008, '75', '75', '50', '1100-1900', 1100, 1900, 'EARLY', '2.5 - 3', 'MBEGU KUBWA INAHIMILI  UGONJWA WA MADOADOA VIRUSI VYA MOSAIC NA KUKAUKA KWA MAJANI', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(313, 'KENYA MAUA', 2, 10, 4, 3, 2, 2, 1, 2013, '75', '75', '64', '1300-2000', 1300, 2000, '', '', 'MBEGU YA KIJANI KIBICHI NA HAINA UGUMU', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(314, 'KENYA RED KIDNEY', 2, 10, 4, 4, 3, 2, 2, 2008, '75', '75', '50', '1000-2100', 1000, 2100, 'EARLY', '2.5 - 3', 'MBEGU KUBWA INAHIMILI  UGONJWA WA MADOADOA VIRUSI VYA MOSAIC NA KUKAUKA KWA MAJANI', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(315, 'KENYA SUGAR BEAN', 2, 10, 4, 3, 3, 2, 2, 2008, '75', '75', '50', '1000-1900', 1000, 1900, 'EARLY', '2.5 - 3', 'INAKOMAA MAPEMA, MBEGU KUBWA, INAHIMILI UGONJWA WA KUNYAUKA MAJANI, VIRUSI VYA MOSAIC BACTERIA AINA YA BLIGHT', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(316, 'KENYA WONDER', 2, 10, 4, 4, 3, 2, 2, 2008, '75', '75', '16', '1030-2000', 1030, 2000, 'MEDIUM', '3 - 3.5', 'MBEGU KUBWA INAHIMILI  UGONJWA WA MADOADOA VIRUSI VYA MOSAIC NA KUKAUKA KWA MAJANI', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(317, 'MIEZI MBILI', 2, 10, 4, 3, 3, 2, 2, 2008, '75', '75', '50', '1000-2000', 1000, 2000, 'EARLY', '2.5 - 3', 'MBEGU KUBWA INAHIMILI  UGONJWA WA MADOADOA VIRUSI VYA MOSAIC NA KUKAUKA KWA MAJANI', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(318, 'NEW ROSE COCO', 2, 10, 4, 3, 3, 2, 2, 2008, '75', '75', '50', '1100-2000', 1100, 2000, 'EARLY', '2.5 - 3', 'INAKUWA IKIWA WIMA, INAKOMAA MAPEMA, INAHIMILI KUTU, BACTERIA WANAOSABABISHA KUNYAUKA KWA MAJANI ,MADOADOA, KUKAUKA  MAJANI, KUVU & VIRUSI AINA YA NECROTIC,MBEGU KUBWA', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(319, 'SUPER ROSE COCO', 2, 10, 4, 4, 3, 2, 2, 2008, '75', '75', '16', '1000-2100', 1000, 2100, 'EARLY', '2.5 - 3', 'INAKOMAA KWA MUDA WAKADRI INAHIMILI UGONJWA WA KUNYAUKA MAJANI,, VIZURI VYA MOSAIC NA KUKAUKA MAJANI', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(320, 'KAT X 16', 2, 10, 4, 3, 7, 1, 9, 1994, '27', '40', '33', '900-1600', 900, 1600, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(321, 'ROSECOCO MADINI', 2, 10, 4, 3, 2, 2, 1, 2013, '75', '75', '64', '1300-2000', 1300, 2000, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(322, 'DPSB 19', 2, 16, 4, 3, 8, 1, 1, 2010, '27', '27', '56', '900-2400', 900, 2400, 'EARLY', '3-4', 'INAHIMILI  UGONJWA WA KUNYAUKA MAJANI, UTAFITI HALISI(TRUE BREEDING), NDOGO ZA HUDHURUNGI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(323, 'DPSB 8', 2, 16, 4, 3, 8, 1, 1, 2010, '27', '27', '56', '900-2400', 900, 2400, 'EARLY', '3-4', 'INAHIMILI UGONJWA WA KABULI NA UGONJWA WA KUNYAUKA, PUNJE YA KADRI RANGI NYEUPE', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(324, 'BLACK HAWK', 2, 16, 3, 3, 7, 3, 9, 2009, '27', '47', '64', '800-1700', 800, 1700, 'EARLY', '3-4', 'INAHIMILI MARADHI YA KUYAUKA MAJANI, INAHIMILI CBSD,MITI YAKE HUNYOOKA WIMA. NZURI KWA KUCHANGANYA NA MAZAO MENGINE', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(325, 'EAI 3600', 2, 16, 4, 3, 7, 3, 9, 2009, '27', '47', '64', '800-1700', 800, 1700, 'EARLY', '3-4', 'INA VIWANGO VYA JUU MADINI YA  IRON NA ZINC,PUNJE YA KADRI YA RANGI YA MANJANO', '', '', '', '', '', '', '', '', '', ''),"+
				"(326, 'GAZELLE', 2, 16, 4, 3, 7, 3, 9, 2009, '27', '47', '64', '1200-2400', 1200, 2400, 'EARLY', '3-4', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(327, 'HILL', 2, 16, 4, 3, 7, 3, 9, 2009, '27', '47', '64', '1200-2000', 1200, 2400, 'EARLY', '3-4', 'INAWEZA KUKUZWA SEHEMU NYINGI, INAHIMILI UGONJWA WA KU=NYAUKA MAJANI NA KUTU YA MAJANI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(328, 'KENSOY 009', 2, 16, 4, 3, 7, 3, 9, 2013, '27', '47', '64', '', 0, 0, 'EARLY', '3-4', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(329, 'NYALA', 2, 16, 4, 3, 7, 3, 9, 2009, '27', '47', '64', '1200-2400', 1200, 2400, 'EARLY', '3-4', 'INAKOMAA HARAKA', '', '', '', '', '', '', '', '', '', ''),"+
				"(330, 'MAC 13', 2, 9, 4, 3, 3, 2, 2, 2012, '27,75', '27,75', '50', '1400-2000', 1400, 2000, 'MEDIUM', '3-4', 'UTAFITI HALISI(TRUE BREEDING), MFANO WA SUKARI (NYEUPE  NA VITONE VYEKUNDU), MBEGU KUBWA, INAHIMILI ANTHRACNOSE', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(331, 'MAC 64', 2, 9, 4, 3, 3, 2, 2, 2012, '27,75', '27,75', '50', '1400-2000', 1400, 2000, 'LATE', '4-5', 'MADOADOA MEKUNDU, MBEGU YA KADRI, INAHIMILI  ANTHRACNOSE NA BACTERIA INAYOSABABISHA MADOADOA', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(332, 'MAC 34', 2, 9, 4, 3, 3, 2, 2, 2012, '27,75', '38,75', '50', '1400-2000', 1400, 2000, 'MEDIUM', '3-4', 'MADOADOA MEKUNDU, MBEGU KUBWA MUUNDO WA UPANGA, INAHIMILI  BAWASI NA BACTERIA WANAOSABABISHA MADOADOA.', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(333, 'FLORA', 2, 9, 4, 3, 7, 4, 5, 1996, '27', '39', '33', '1500-2200', 1500, 2200, 'LATE', '4 -5', 'MAGANDA YA RANGI YA ZAMBARAU', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(334, 'NGWINURARE', 2, 9, 4, 4, 7, 4, 5, 1996, '27', '39', '33', '1500-2200', 1500, 2200, 'LATE', '4-5', 'MBEGU KUBWA RANGI NYEKUNDU, INAHIMILI MARADHI YA ANTHRACNOSE, BAWASI, HALO BLIGHT, NAVIRUSI VYA NECROTIC', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(335, 'UNUMBANO', 2, 9, 4, 4, 7, 4, 5, 1996, '27', '39', '33', '1500-2200', 1500, 2200, 'LATE', '4 - 5', 'MBEGU KUBWA RANGI NEKUNDU, INAHIMILI MARADHI YA ANTHRACNOSE, BAWASI, HALO BLIGHT, NAVIRUSI VYA NECROTIC', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(336, 'KENYA AFYA', 2, 9, 4, 3, 7, 2, 9, 2012, '75', '75', '64', '1300-2000', 1300, 2000, 'MEDIUM', '3 - 4', 'RANGI YA CREAM', 'YES', '', '', 'YES', '', '', '', '', '', ''),"+
				"(337, 'KENYA MADINI', 2, 9, 4, 3, 7, 2, 9, 2010, '75', '75', '64', '1300-2000', 1300, 2000, 'MEDIUM', '3 - 4', 'NZURI KWA KUCHONGA CHIPS, KUCHEMSHA NA KUPONDAPONDA , INAHIMILI BACTERIA WANAOSABABISHA MADOADOA', 'YES', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(338, 'KENYA MAJANO', 2, 9, 4, 3, 7, 2, 9, 2011, '75', '75', '64', '1300-2000', 1300, 2000, 'MEDIUM', '3-4', 'MBEGU YA MANJANO, HAINA UGUMU', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(339, 'KAT/DL-1', 2, 12, 4, 3, 7, 4, 5, 1978, '27', '40', '33', '0-2000', 10, 2000, 'MEDIUM', '3 - 3.5', 'UKUAJI KWA KIPIMO,MBEGU NYEUSI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(340, 'KAT/DL-2', 2, 12, 4, 3, 7, 4, 5, 1987, '27', '40', '33', '0-2000', 10, 2000, 'MEDIUM', '3.5 - 4', 'UKUAJI KWA KIPIMO,MBEGU RANGI YA CREAM', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(341, 'KAT/DL-3', 2, 12, 4, 3, 7, 4, 5, 1995, '27', '40', '33', '0-200', 0, 2000, 'MEDIUM', '3.5 - 4', 'HAIJAFAHAMIKAVIZURI MATUMIZI MARA MBILI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(342, 'N 22', 2, 20, 4, 3, 7, 3, 5, 1998, '27', '40', '33', '10-1600', 10, 1600, 'EARLY', '2.5 - 3', 'MBEGU ZA MANJANO, HAZINA UGUMU', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(343, 'N 26', 2, 20, 4, 3, 4, 2, 3, 1998, '27', '40', '13,14,19,33,56', '10-1600', 10, 1600, 'EARLY', '2.5 - 3', 'MBEGU KUBWA ZA KIJANI HAZINA UGUMU', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(344, 'GADAM', 4, 6, 3, 3, 7, 2, 3, 1994, '27', '27', '13,19,33,50,56', '0-1500', 0, 1500, 'EARLY', '3', 'INAFANYA VYEMA KATIKA MAENEO YA PWANI NA MIINUKO YTA KADRI', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(345, 'IS 8193', 4, 6, 3, 3, 7, 3, 5, 1996, '27', '27', '33', '500-1600', 500, 1600, 'MEDIUM', '4', 'HAIHARIBIWI NA NDEGE', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(346, 'KABURU', 4, 6, 3, 3, 7, 1, 9, 2008, '27', '27', '33', '500-1500', 500, 1500, 'MEDIUM', '3.5', 'INAKOMAA MAPEMA PUNJE KUBWA, INAHIMILI KUVU KWA KIASI, INAHIMILI VIRUSI SABABISHA KUNYAUKA KWA MAJANI  &  BAKTERIA WANAOSABABISHA KUKAUKA KWA MAJANI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(347, 'KARI 16.MTAMA 2', 4, 6, 3, 3, 7, 1, 9, 2008, '27', '27', '33', '500-1200', 500, 1500, 'MEDIUM', '3.5', 'INAHIMILI KUOZA MIZIZI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(348, 'KARIA-SH2', 4, 6, 3, 3, 7, 1, 9, 2008, '27', '27', '33', '1500-2000', 1500, 2000, 'MEDIUM', '5.5', 'UTAFITI HALISI(TRUE BREEDING), ZAKE KUBWA, INAHIMILI MADOADOA, KUVU,  UGONJWA WA ANTHRACNOSE, VIRUSI VINAVYOSABABISHA MAJANI KUYAUKA  & NA BACTERIA WANAOSABABISHA KUVU', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(349, 'LEGIO', 4, 6, 1, 3, 7, 1, 9, 2008, '27', '27', '33', '1000-2000', 1000, 2000, 'EARLY', '4', 'INATOA MAZAO MENGI', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(350, 'IS8595', 4, 6, 3, 3, 7, 3, 8, 1982, '27', '34', '33', '0-1800', 0, 1800, 'EARLY', '3', 'INAHIMILI JOTO, INAHIMILI UKAME', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(351, 'IKINYALUKA', 4, 6, 3, 3, 7, 3, 5, 1996, '27', '30', '33,56', '1750-2300', 1750, 2300, 'LATE', '7', 'NI YA KIWANGO CHA JUU INATUMIKA KAMA CHAKULA CHA MIFUGO', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(352, 'KARI MTAMA-1', 4, 6, 3, 3, 4, 4, 5, 2000, '27', '36', '13', '0-1800', 0, 1800, 'MEDIUM', '3-3.5', 'HAILIWI NA VIWAVI', '', '', 'YES', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(353, 'KSBH01', 4, 6, 3, 3, 4, 3, 9, 2013, '27', '36', '21', '0-1500', 0, 1500, '', '', 'HUU NI MTAMA WA HALI YAJUU, MBEGU YAKE KUBWA RANGI YA HUDHURUNGI, MABUA YAKE NI TAMU (15+%  BRIX  AMBAYO HUONGEZEKA BAADA YA KUVUNWA PUNJE, INA STACHI NYINGI, INAFIKA 77.4% INAHIMILI UKAME, INAKOMAA MAPEMA', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(354, 'IS76', 4, 6, 3, 3, 3, 3, 8, 1981, '27', '27', '50', '0-1500', 0, 1500, 'EARLY', '3', 'INAHIMILI KUPUKUSIKA', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(355, '2K X 17', 4, 6, 3, 3, 3, 3, 5, 1981, '27,50', '27,50', '33,50', '0-1500', 0, 1500, 'EARLY', '3', 'GANDA GUMU LA JUU, HUTOLEWA NA KUKAA KAMA MPUNGA', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(356, 'KAT/PRO I', 4, 6, 3, 3, 3, 1, 5, 1998, '27,50', '27,50', '50', '1000-1700', 1000, 1700, '', '', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(357, 'SEREDO', 4, 6, 3, 3, 7, 2, 3, 1970, '27,50', '27,50', '13,50', '0-1750', 0, 1750, 'EARLY', '4', 'INAWEZA KUKUZWA SEHEMU NYINGI', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(358, 'SERENA', 4, 6, 3, 3, 7, 2, 3, 1970, '27,50', '27,50', '50', '0-1750', 0, 1750, 'EARLY', '3', 'INAWEZA KUKUZWA SEHEMU NYINGI', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(359, 'Hybrid Mtama-1(KSBH-01)', 4, 6, 2, 3, 7, 1, 9, 2012, '27', '40', '33', '900-1800', 900, 1800, 'EARLY', '3-3.5', 'EARLY MATURING,HEAT TOLERANT,SWEET GRAIN', 'YES', '', '', 'YES', '', '', '', '', '', ''),"+
				"(360, 'E 6518', 4, 6, 3, 3, 7, 3, 2, 2000, '27', '43', '56', '1750-2300', 1750, 2300, 'LATE', '8', 'NI YA KIWANGO CHA JUU', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(361, 'E1291', 4, 6, 3, 3, 7, 3, 5, 2000, '27', '43', '50,56', '1750-2300', 1750, 2300, 'LATE', '7', 'MATUMIZI MARA MBILI, NZURI KWA KINJWAJI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(362, 'KS-SORG1', 4, 6, 2, 3, 8, 3, 9, 2013, '50', '50', '50', '0-1750', 0, 1750, 'EARLY', '2.5-3', 'MATUMIZI MARA MBILI, INAHIMILI KUTU NA BARIDI', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(363, 'KS-SORG2', 4, 6, 2, 3, 8, 3, 9, 2013, '50', '50', '50', '0-1800', 0, 1800, 'EARLY', '2.5-3', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(364, 'KIBUYU', 4, 6, 1, 3, 8, 3, 9, 2011, '56', '56', '56', '1500-1800', 1500, 1800, 'MEDIUM', '4-5', 'INAWEZA KUKUZWA SEHEMU NYINGI, INATUMIKA MARA MBILI, MBEGU NYEKUNDU, HAILIWI NA NDEGE', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(365, 'SILA', 4, 6, 3, 3, 8, 2, 5, 2006, '73', '73', '7', '0-1800', 0, 1800, 'EARLY', '3-3.5', 'MATUMIZI MARA MBILI', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(366, 'LDT090', 4, 6, 1, 3, 8, 3, 9, 2011, '56', '56', '56', '1500-1800', 1500, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(367, 'P9518A XICSR92074', 4, 6, 2, 3, 7, 1, 9, 2012, '27', '40', '33', '900-1800', 900, 1800, '', '', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(368, 'NAKURU/FMI', 4, 1, 3, 4, 4, 4, 9, 1996, '27', '37', '33', '1750-2300', 1750, 2300, 'MEDIUM', '5-7', 'NDANI NI KAVU ,NYAMA NYEUPE,INAKUBALIKA KILA MAHALI.', '', '', '', '', '', '', '', '', '', ''),"+
				"(369, 'HOKHALE-1', 4, 1, 3, 3, 7, 4, 5, 2013, '27', '39', '33', '0-2000', 0, 2000, '', '', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(370, 'I.E4115', 4, 1, 3, 3, 7, 4, 9, 2013, '27', '39', '33', '0-2000', 0, 2000, 'MEDIUM', '4', 'MAZAO YA JUU,INAHIMILI KUTU', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(371, 'KACIMI42', 4, 1, 3, 3, 7, 4, 9, 2013, '27', '39', '64', '0-2000', 0, 2000, 'MEDIUM', '4', 'MBEGU KUBWA, INAHIMILI UGONJWA WA KUNYAUKA MAJANI, MADOADOA, KUKAUKA MAJANI, KUVU & KUNYAUKA MAJANI', '', 'YES', '', '', '', '', '', '', '', ''),"+
				"(372, 'P-224', 4, 1, 3, 3, 4, 4, 5, 1981, '27', '39', '33,50', '1150-1750', 1150, 1750, 'EARLY', '3-4', 'HAIVUNJIKIVUNJIKI', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(373, 'U15', 4, 1, 3, 3, 7, 4, 5, 2013, '27', '39', '33', '0-2000', 0, 2000, '', '', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(374, 'KAT/FM I', 4, 1, 3, 3, 4, 3, 5, 2000, '27', '40', '33,50', '250-1150', 250, 1150, 'EARLY', '3', 'INAHIMILI UKAME', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(375, 'KAT/FOX-1', 4, 2, 3, 3, 7, 4, 5, 1981, '27', '40', '33', '250-1500', 250, 1500, 'EARLY', '3-4', 'MBEGU RANGI YA CREAM', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(376, 'KAT/PM - 3', 4, 14, 3, 3, 4, 4, 5, 2001, '27', '40', '33,56', '250-1150', 250, 1150, 'EARLY', '2', 'INA MBEGU KUBWA', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(377, 'KAT/PM 1', 4, 14, 3, 3, 7, 4, 5, 2000, '27', '40', '33', '250-1150', 250, 1150, 'EARLY', '2-3', 'UGUMU 80% HAITATIZWI NA NDEGE', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(378, 'KAT/PM 2', 4, 14, 3, 3, 7, 4, 5, 2000, '27', '40', '33', '250-1150', 250, 1150, 'EARLY', '2', 'INATUMIKA KATIKA AWAMU YA KUKANDA', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(379, 'DOURADO PRECOSE', 4, 4, 4, 3, 7, 2, 5, 2009, '27', '28', '50', '0-1700', 0, 1700, 'MEDIUM', '2.3-5.5', 'HAITOI NDEVU', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(380, 'NERICA 10', 4, 4, 4, 3, 4, 4, 5, 2009, '27', '46', '50', '1400-1800', 1400, 1800, 'LATE', '3.5-6.7', 'PUNJE NDEVU, HAIVUNJIKI VUNJIKI KWA URAHISI', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(381, 'NERICA 11', 4, 4, 4, 3, 4, 4, 5, 2009, '27', '46', '50', '1400-1800', 1400, 1800, 'MEDIUM', '3-5', 'INA UWEZO WA KUCHIPUKA TENA BAADA YA KUVUNA , PUNJE NDEFU, HAIVUNJIKI VUNJIKI KWA URAHISI, INAHIMILI KIANGAZI', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(382, 'NERICA 4', 4, 4, 4, 3, 4, 4, 5, 2009, '27', '46', '50', '1400-1800', 1400, 1800, 'LATE', '3.2-6.5', 'HAIPASUKI, PUNJE NDEFU', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(383, 'NIBAM 10', 4, 4, 4, 3, 4, 4, 5, 2010, '27', '46', '50', '0-1700', 0, 1700, 'LATE', '3.5 - 6', 'HARUFU NZURI YA KUVUTIA, INAHIMILI VIRUSI VYA MPUNGA AINA YA YELLOW MOTTLE, PUNJE NYEMBAMBA NDEFU,HAINA CHEMBECHEMBE ZA ANTHOCYANIN, INA UWEZO WA KUCHIPUKA TENA BAADA YA KUVUNA', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(384, 'NIBAM 11', 4, 4, 4, 3, 7, 2, 3, 2010, '63', '63', '50', '0-1700', 0, 1700, 'MEDIUM', '3.2 - 6.5', 'HARUFU NZURI YA KUVUTIA, INAHIMILI VIRUSI VYA MPUNGA AINA YA YELLOW MOTTLE, PUNJE NYEMBAMBA NDEFU,HAINA CHEMBECHEMBE ZA ANTHOCYANIN, INA UWEZO WA KUCHIPUKA TENA BAADA YA KUVUNA', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(385, 'BW-196', 4, 5, 4, 3, 7, 2, 3, 1986, '63', '46', '63', '1400-1800', 1400, 1800, 'LATE', '4-5', 'HUOTA MICHE MINGI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(386, 'KOMBOKO', 4, 5, 4, 3, 7, 3, 5, 2013, '27', '46', '64', '1400-1800', 1400, 1800, 'MEDIUM', '3-3.5', 'HARUFU NZURI YA KUVUTIA , PUNJE NDEVU, HAIVUNJIKI INAPIKIKA KWA URAHISI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(387, 'NERICA 1', 4, 5, 4, 3, 4, 3, 5, 2009, '27', '46', '33,50', '1400-1800', 1400, 1800, 'MEDIUM', '2.5-5.5', 'HARUFU NZURI YA KUVUTIA , PUNJE NDEVU, HAIVUNJIKI VUNJIKI KWA URAHISI', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(388, 'SARO-5', 4, 5, 4, 3, 7, 3, 5, 2013, '27', '46', '70', '1400-1800', 1400, 1800, 'MEDIUM', '3-3.5', 'INAHIMILI UGONJWA WA KUNYAUKA KWA MAJANI NA BACTERIA WANAOKAUSHA MAJANI', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(389, 'KENYA CHIRIKU', 4, 7, 4, 3, 7, 1, 1, 1989, '27', '27', '50', '1800-2400', 1800, 2400, 'EARLY', '3-4', 'INAHIFADHIKA VIZURI', '', '', 'YES', 'YES', '', '', '', '', '', ''),"+
				"(390, 'KENYA FAHARI', 4, 7, 4, 3, 8, 4, 3, 1977, '27', '27', '50', '1800-2400', 1800, 2400, 'EARLY', '3-4', 'MIZIZI YA MVIRINGO, INAKOMAA HARAKA, NGOZI NYEUPE YA CREAM YENYE MADOA YA ZAMBARAU, INASHIKA KATIKA KINA CHA JUU, NDANI NI NYEUPE RANGI YA CREAM,INAHIMILI KUVU, INAHIFADHIKA VIZURI, HAIKAI MUDA MREFU, NZURI KWA VIBANZI NA KUPONDAPONDA, INATUMIKA KWINGI', 'YES', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(391, 'KENYA POPO', 4, 7, 4, 3, 3, 3, 5, 1989, '27', '27', '50', '1800-2400', 1800, 2400, '', '', 'INATUMIKA KWA UNGA WA KUOKA', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(392, 'KENYA TEMBO', 4, 7, 4, 3, 3, 3, 5, 1975, '27', '27', '50', '1800-2100', 1800, 2100, 'MEDIUM', '4-5', 'NI YA MUDA MUDA MFUPI(MSIMU MMOJA)', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(393, 'KENYA KONGONI', 4, 7, 4, 3, 3, 3, 5, 1975, '27,50', '27,50', '50', '1800-2700', 1800, 2700, 'MEDIUM', '4-5', 'INAHIMILI MCHANGA WENYE VIWANGO VYA JUU VYA ACID', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(394, 'KENYA MBUNI', 4, 7, 4, 3, 3, 3, 5, 1987, '27,50', '27,50', '50', '1800-2400', 1800, 2400, 'EARLY', '3-4', 'INA MAZAO YA JUU', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(395, 'EAGLE10', 4, 7, 4, 3, 7, 2, 2, 2010, '27', '47', '6,33,50', '1800-2700', 1800, 2700, 'EARLY', '3.5', 'INAHIMILI KUTU YA SHINA LA MTI', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(396, 'KENYA CHOZI', 4, 7, 4, 3, 7, 4, 3, 1999, '27', '47', '50', '1500-1800', 1500, 1800, 'EARLY', '3-4', 'INAHIMILI UKAME', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(397, 'KENYA DUMA', 4, 7, 4, 3, 7, 4, 3, 1994, '27', '47', '50', '0-1800', 0, 1800, 'EARLY', '2-3', 'INAHIMILI UKAME, INAKOMAA MAPEMA', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(398, 'KENYA HAWK 12', 4, 7, 4, 3, 7, 2, 2, 2012, '27', '47', '6,33,50', '2100-2400', 2100, 2400, 'MEDIUM', '4-5', 'MBEGU NGUMU NYEKUNDU , INAHIMILI KUVUNJIKA AU KUCHIPIKA, NZURI KWA KUOKA(BAKING), INAHIMILI KUTU YA NJANO NA SHINA', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(399, 'KENYA HEROE', 4, 7, 4, 3, 7, 4, 3, 1999, '27', '47', '50', '2100-2400', 2100, 2400, 'EARLY', '3-4', 'INA MAZAO YA JUU', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(400, 'KENYA IBIS', 4, 7, 4, 3, 7, 4, 5, 2007, '27', '47', '33', '1500-1800', 1500, 1800, 'EARLY', '3.5 - 4', 'DROUGHT TOLERANT, TOLERANT TO STEM RUST, GOOD BAKING QUALITIES ', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(401, 'KENYA KINGBIRD', 4, 7, 4, 3, 7, 2, 2, 2012, '27', '47', '6,33,50', '1800-2700', 1800, 2700, 'EARLY', '3-4', 'INAHIMILI KUTU YA NJANO NA SHINA, INA WINGI WA KIJANI(BIOMAS), INA KIWANGO CHA JUU CHA PROTEIN, NZURI KWA KUPIKIA CHAPATI YA BROWN NA MIKATE', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(402, 'KENYA KORONGO', 4, 7, 4, 3, 7, 2, 2, 2012, '27', '47', '6,33,50', '2100-2400', 2100, 2400, 'EARLY', '3-4', 'MBEGU NYEUPE NGUMU, INASAGIGA UNGA VIZURI NA KUTUMIKA KWA KUOKA MIKATE, INAPENDEKEZWA  KWA MAENEO KAME KAMA RONGAI NA NAIVASHA  INATUMIKA KWINGI NA INA MAZAO YA JUU', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(403, 'KENYA KWALE', 4, 7, 4, 3, 7, 4, 3, 1987, '27', '47', '50', '2100-2400', 2100, 2400, 'EARLY', '4', 'INA MAZAO YA JUU NA HAICHIPUZI HARAKA', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(404, 'KENYA SUNBIRD', 4, 7, 4, 3, 7, 3, 2, 2012, '27', '47', '6,33,50', '2100-2400', 2100, 2400, 'EARLY', '3-4', 'INAHIMILI KUTU YA NJANO NA SHINA, INA WINGI WA KIJANI(BIOMAS), INA KIWANGO CHA JUU CHA PROTEIN, NZURI KWA CHAPATI YA BROWN NA MIKATE', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(405, 'KENYA TAE', 4, 7, 4, 3, 7, 2, 2, 2011, '27', '47', '6,33,50', '2100-2400', 2100, 2400, 'EARLY', '3-4', 'INAHIMILI KUTU YA NJANO NA SHINA, INA WINGI WA KIJANI(BIOMAS ), MBEGU NYEKUNDU, NGUMU YENYE WINGI WA KIJANI(BIOMASS), INAPENDWA NA WAKULIMA WANAOTUMIA MABUA YAKE KWA CHAKULA CHA MIFUGO', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(406, 'KENYA WREN', 4, 7, 4, 3, 7, 2, 2, 2011, '27', '47', '6,33,50', '2100-2400', 2100, 2400, 'EARLY', '3-4', 'INAHIMILI VIRUSI VINAVYOSABABISHA MAGONJWA, MBEGU KUBWA NA NGUMU, RANGI YAKE NI YA  KIJIVU, INASAGIGA UNGA KWA URAHISI, INA KIWANGO CHA JUU CHA PROTEIN', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(407, 'NJORO 2', 4, 7, 4, 3, 7, 2, 3, 2001, '27', '47', '50', '1800-2400', 1800, 2400, 'EARLY', '3-4', 'INAHIMILI MCHANGA WENYE VIWANGO VYA JUU VYA ACID', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(408, 'ROBIN', 4, 7, 4, 3, 7, 4, 3, 2010, '27', '47', '33,50', '2100-2400', 2100, 2400, 'EARLY', '3.5', 'INAHIMILI KUOZA KWA MMEA (UG99 STRAIN), INAKOMAA MAPEMA NA INAKUBALIKA KWINGI,  MBEGU KUBWA YENYE UZANI WA HADI GRAMU 48G/MBEGU 1000 , INA KIWANGO CHA JUU CHA PROTEIN  (12.5), INASAGIKA VIZURI', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', '', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(409, 'FARASI', 4, 7, 4, 3, 8, 1, 1, 2007, '50', '50', '50', '1800-2400', 1800, 2400, 'EARLY', '3-4', 'MBEGU NYEUPE NGUMU MFANO WA SUKARI, INASAGIGA UNGA VIZURI NA KUTUMIKA KWA KUOKA MIKATE, HAIHARIBIWI NA NDEGE', '', 'YES', '', 'YES', '', '', '', '', '', ''),"+
				"(410, 'KS MWAMBA', 4, 7, 4, 3, 8, 2, 3, 2001, '50', '50', '50', '1500-2400', 1500, 2400, 'MEDIUM', '4-4.5', 'INAKUBALIKA KWINGI, MAZAO YAKE NI YA JUU', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(411, 'KS SIMBA', 4, 7, 4, 3, 8, 2, 2, 2007, '50', '50', '50', '1500-2400', 1500, 2400, 'EARLY', '3-4', 'INAPENDEKEZWA  KWA MAENEO KAME KAMA RONGAI NA NAIVASHA', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(412, 'KS-CHUI', 4, 7, 4, 3, 8, 1, 1, 2008, '50', '50', '50', '1800-2400', 1800, 2400, 'EARLY', '4', 'INATUMIKA KAMA CHAKULA CHA MIFUGO', '', '', '', '', '', '', '', '', '', ''),"+
				"(413, 'KS-KANGA', 4, 7, 4, 3, 8, 1, 1, 2013, '50', '50', '50', '1800-2401', 1800, 2400, '', '', 'HAIHARIBIWI NA NDEGE', '', '', '', '', '', '', '', '', '', ''),"+
				"(414, 'NZALAUKA', 3, 17, 5, 3, 7, 1, 1, 2008, '27', '27', '33', '15-1200', 15, 1200, 'EXTRA EARLY', '6-8', 'KAVU KIASI, NDANI NI RANGI YA MANJANO,INAKUBALIKA KIASI', '', '', '', '', '', '', '', '', '', ''),"+
				"(415, 'SIRI', 3, 17, 5, 3, 7, 1, 1, 2008, '27', '27', '33', '15-1200', 15, 1200, 'EARLY', '8-12', 'INAHIMILI VIRUSI VYA MOSAIC, INAHIMILI UGONJWA WA BROWN STREAK, NIFUPI NA HAINA MATAWI', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(416, 'KAREMBO', 3, 17, 5, 3, 7, 4, 3, 2008, '27', '40', '33', '15-1200', 15, 1200, 'EXTRA EARLY', '8', 'FUPI NA PANA', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(417, 'KME 1', 3, 17, 5, 3, 7, 4, 3, 2000, '27', '40', '33', '250-1500', 250, 1500, 'MEDIUM', '12-14', 'CYANIDE YA CHINI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(418, 'KME 61', 3, 17, 5, 3, 7, 1, 3, 2000, '27', '40', '33', '250-1500', 250, 1500, 'MEDIUM', '14', 'CYANIDE YA CHINI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(419, 'KME2', 3, 17, 5, 3, 7, 1, 3, 2010, '27', '40', '33', '200 - 2000', 200, 2000, 'EARLY', '8-10', 'INAHIMILI UGONJWA WA  MOSAIC, INAKOMAA HARAKA INA CYANIDE YA CHINI, NI TAMU, INAHIMILI VIRUSI VYA UGONJWA WA MOSAIC, INATWANGIKA', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(420, 'KME3', 3, 17, 5, 3, 7, 1, 3, 2010, '27', '40', '33', '200 - 2000', 200, 2000, 'EARLY', '8-10', 'INAHIMILI UGONJWA WA  MOSAIC, INAKOMAA HARAKA INA CYANIDE YA CHINI, NI TAMU, INATWANGIKA', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(421, 'KME4', 3, 17, 5, 3, 7, 1, 3, 2010, '27', '40', '33', '200 - 2000', 200, 2000, 'EARLY', '8-10', 'INAHIMILI UGONJWA WA CASSAVA MOSAIC, INAKOMAA HARAKA, CYANIDE YA CHINI, NI TAMU, INAHIMILI VIRUSI VYA UGONJWA WA MOSAIC, INATWANGIKA', 'YES', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(422, 'MUCERICERI', 3, 17, 5, 3, 7, 1, 1, 2000, '27', '40', '33', '250-1750', 250, 1750, 'MEDIUM', '12-14', 'KIWANGO CHA MAFUTA 17%', 'YES', '', '', '', '', '', '', '', '', ''),"+
				"(423, '5543/156', 3, 17, 5, 3, 7, 4, 3, 1969, '27', '44', '33', '0-500', 0, 500, 'MEDIUM', '12-15', 'CYANIDE YA JUU', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', '', '', '', ''),"+
				"(424, 'GUZO', 3, 17, 5, 3, 7, 1, 1, 1969, '27', '44', '33', '0-700', 0, 700, 'MEDIUM', '12-15', '', '', '', '', '', '', '', '', '', '', ''),"+
				"(425, 'KALESO', 3, 17, 5, 3, 7, 1, 1, 1969, '27', '44', '33', '0-1500', 0, 1500, 'LATE', '12-18', 'INAHIMILI UGONJWA WA KUOZESHA MIZIZI', 'YES', 'YES', '', '', '', '', '', '', '', ''),"+
				"(426, 'KARIBUNI', 3, 17, 5, 3, 7, 4, 3, 2008, '27', '44', '33', '15-1200', 15, 1200, 'EARLY', '8-12', 'INATOA MATAWI IKIWA JUU, NZURI YA KUCHANGANYIA MAZAO', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(427, 'SHIBE', 3, 17, 5, 3, 7, 4, 3, 2008, '27', '44', '33', '15-1200', 15, 1200, 'EARLY', '8-12', 'INAHIMILI VIRUSI VYA MOSAIC, INAHIMILI UGONJWA WA BROWN STREAK, MITIYAKE IMENYOOKA.NI NZURI KWA KUCHANGANYA MAZAO.', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(428, 'TAJIRIKA', 3, 17, 5, 3, 7, 4, 3, 2008, '27', '44', '33', '15-1200', 15, 1200, 'EARLY', '8', 'INAHIMILI VIRUSI VYA MOSAIC, INAHIMILI UGONJWA WA BROWN STREAK, MITIYAKE IMENYOOKA.NI NZURI KWA KUCHANGANYA MAZAO.', 'YES', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(429, '22/77', 3, 19, 5, 3, 4, 4, 5, 1998, '27', '27', '33', '0-800', 0, 800, 'EARLY', '3.5', 'NI NZURI KWA KUVUNA KWA ZAMU', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', '', '', '', ''),"+
				"(430, 'HARAKA', 3, 19, 5, 3, 4, 4, 5, 2011, '27', '35', '33', '1300-1600', 1300, 1600, 'MEDIUM', '4-5', 'NDANI KAVU, INA RANGI YA CHUNGWA', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(431, 'JAYALO', 3, 19, 5, 3, 4, 4, 5, 1998, '27', '35', '33', '0-200', 0, 200, 'EARLY', '4', 'NI NZURI KWA KUVUNA KWA ZAMU', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(432, 'K117', 3, 19, 5, 3, 4, 4, 5, 2011, '27', '35', '33', '1200-1600', 1200, 1600, 'LATE', '5-6', 'NDANI NI NGUMU NA INARANGI YA MANJANO', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(433, 'LIMARA', 3, 19, 5, 3, 4, 4, 5, 0, '27', '35', '33', '1200-1700', 1200, 1700, 'MEDIUM', '4-5', '', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(434, 'RACHAR', 3, 19, 5, 3, 4, 4, 5, 2011, '27', '35', '33', '1200-1680', 1200, 1680, 'MEDIUM', '4-5', 'INAHIMILI VIRUSI VYA MAGONJWA', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(435, 'KABODE', 3, 19, 5, 3, 4, 4, 2, 2013, '27', '39', '33', '1200', 1200, 1400, 'MEDIUM', '4-5', 'INA KIWANGO CHA JUU CHA CAROTENE,INAHIMILI UGONJWA WA VIAZI TAMU ,INAKUBALIKA KIASI', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(436, 'KEMB 10', 3, 19, 5, 3, 4, 4, 5, 2001, '27', '39', '33', '1300-2000', 1300, 2000, 'EARLY', '3-4', 'INATOA MAZAO YA JUU', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(437, 'KSP 20 (WANJUGU)', 3, 19, 5, 3, 4, 4, 5, 2002, '27', '39', '33', '250-1750', 250, 1750, 'EARLY', '3-4', 'INA KIWANGO CHA JUU CHA CAROTENE, NGOZI YAKE NYEKUNDU', 'YES', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(438, 'MUGANDE', 3, 19, 5, 3, 4, 4, 5, 2001, '27', '39', '33', '1300-2000', 1300, 2000, 'MEDIUM', '4-5', 'INAKOMAA KWA MUDA WA KADRI,', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(439, 'MWAVULI', 3, 19, 5, 3, 4, 4, 5, 0, '27', '39', '33', '1200-1800', 1200, 1800, 'MEDIUM', '4-5', 'INATOA MAZAO MAZURI,NIKAVU,INATUMIKA MARA MBILI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(440, 'SPK 004', 3, 19, 5, 3, 4, 4, 5, 2001, '27', '39', '33', '1300-2000', 1300, 2000, 'EARLY', '3-4', 'INASTAWI VIZURI CHINI YA MCHANGA', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(441, 'SPK 013', 3, 19, 5, 3, 4, 4, 5, 2001, '27', '39', '33', '1200-1400', 1200, 1400, 'MEDIUM', '4-5', 'INASTAWI VIZURI CHINI YA MCHANGA', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(442, 'VITAMU', 3, 19, 5, 3, 4, 4, 2, 2013, '27', '39', '33', '1200-1400', 1200, 1400, 'MEDIUM', '4-5', 'INA KIWANGO CHA JUU CHA CAROTENE, NDANI NI KAVU', '', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(443, 'KSP0047', 3, 19, 5, 3, 4, 4, 5, 0, '27', '40', '33', '800-1000', 800, 1000, 'EARLY', '3-4', 'NDANI RANGI YA MACHUNGWA, INA KIWANGO CHA JUU CHA CAROTENE', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(444, 'KSP0072', 3, 19, 5, 3, 4, 4, 5, 2010, '27', '40', '33', '800-1000', 600, 1800, 'EARLY', '3-4', 'NDANI RANGI YA MACHUNGWA, INA KIWANGO CHA JUU CHA CAROTENE', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(445, 'KSP0084', 3, 19, 5, 3, 4, 4, 5, 2010, '27', '40', '33', '800-1000', 600, 1800, 'EARLY', '3-4', 'INAKOMAA KWA MUDA WA KADRI,', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(446, 'KSP0154', 3, 19, 5, 3, 4, 4, 5, 2010, '27', '40', '33', '800-1000', 600, 1800, 'EARLY', '3-4', 'NDANI RANGI YA MACHUNGWA, INA KIWANGO CHA JUU CHA CAROTENE', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', '', '', ''),"+
				"(447, 'MTWAPA 8', 3, 19, 5, 3, 4, 4, 5, 1998, '27', '44', '33', '0-1500', 0, 1500, 'EARLY', '3.5', 'INA KIWANGO CHA CHINI CHA FIBRE, INA KIWANGO CHA JUU CHA  BETA CAROTENE', 'YES', '', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,BUSIA,HOMABAY,KISUMU,GARISSA,MANDERA,MARSABIT,ISIOLO,KITUI,TURKANA,KAJIADO,WAJIR', 'TAITA TAVETA,ISIOLO,MARSABIT,MERU,THARAKA NITHI,BUSIA,EMBU,ELGEYO MARAKWET,GARISSA,HOMABAY,KILIFI,KISUMU,KWALE,LAMU,MAKUENI,MANDERA,MIGORI,SIAYA,TANA RIVER,KITUI,MACHAKOS,TURKANA,WEST POKOT,SAMBURU,BARINGO,KAJIADO,WAJIR', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', ''),"+
				"(448, 'KENSPOT-2', 3, 19, 5, 3, 7, 4, 2, 2013, '27', '47', '18,33', '1300-2000', 1300, 2000, 'LATE', '6-7', 'KAVU KIASI, NDANI NI NYEUPE, INAKUBALIKA ZAIDI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(449, 'KENSPOT-3', 3, 19, 5, 3, 7, 2, 2, 2013, '27', '47', '18,33', '1300-2000', 1300, 2000, 'LATE', '6-7', 'NI KAVU, NDANI RANGI YA MACHUNGWA, INA KIWANGO CHA WASTANI CHA CAROTENE, INAKUBALKIKA KIASI', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(450, 'KENSPOT-4', 3, 19, 5, 3, 7, 2, 2, 2013, '27', '47', '18,33', '1300-2000', 1300, 2000, 'LATE', '6-7', 'NI KAVU, RANGI YA MACHUNGWA, KIWANGO CHA JUU CHA CAROTENE, INAKUBALIKA KIASI NI KAVU, .', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(451, 'KENSPOT-5', 3, 19, 5, 3, 7, 2, 2, 2013, '27', '47', '18,33', '1300-2000', 1300, 2000, 'LATE', '6-7', 'INA UKAVU KIASI, NDANI RANGI YA MACHUNGWA, INA KIWANGO CHA JUU CHA CAROTENE,INAHIMILI UGONJWA WA VIAZI TAMU ,INAKUBALIKA KIASI', '', 'YES', '', 'YES', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,'),"+
				"(452, 'NYAWO', 3, 19, 5, 3, 7, 4, 2, 2013, '27', '47', '18,33', '1300-2000', 1300, 2000, 'LATE', '6-7', 'NJE NI KAVU NA NYEUPE, NDANI NI MANJANO,INAKUBALIKA SEHEMU KADHAA', '', '', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', 'MERU,KITUI,BOMET,EMBU,KAKAMEGA,KERICHO,NAKURU,KIRINYAGA,KISII,LAIKIPIA,NAKURU,NANDI,NYAMIRA,NYANDARUA,ELGEYO MARAKWET,MACHAKOS,MAKUENI,KIAMBU,WEST POKOT,SAMBURU,BARINGO,LAIKIPIA,NAROK,NAIROBI,KAJIADO,BUNGOMA,HOMA BAY,KISII,NYAMIRA,TAITA TAVETA,NYERI,VIHIGA', ''),"+
				"(453, 'KK8', 2, 10, 4, 3, 4, 2, 2, 2014, '27', '36', '9,56,10,33', '1200-1800', 1200, 1800, 'EARLY', '3-4', 'INAWEZA KUKUZWA SEHEMU NYINGI, INAHIMILI UGONJWA WA KUNYAUKA MAJANI NA KUTU YA MAJANI.', '', 'YES', '', '', 'MOMBASA,KWALE,KILIFI,TANA RIVER,LAMU,TAITA TAVETA,GARISSA,WAJIR,MANDERA,MARSABIT,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,TURKANA,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,KAKAMEGA,VIHIGA,BUNGOMA,BUSIA,SIAYA,KISUMU,HOMA BAY,MIGORI,KISII,NYAMIRA,NAIROBI', '', '', 'TAITA TAVETA,WAJIR,MANDERA,NAKURU,MARSABIT,BOMET,KIRINYAGA,KWALE,TANA RIVER,ISIOLO,MERU,THARAKA NITHI,EMBU,KITUI,MACHAKOS,MAKUENI,NYERI,MURANGA,TURKANA,WEST POKOT,SAMBURU,BARINGO,NAROK,KAJIADO,KERICHO,KAKAMEGA,VIHIGA,SIAYA,KISUMU,HOMA BAY,MIGORI,NAIROBI,BUSIA,NANDI', '', 'ISIOLO,THARAKA NITHI,EMBU,MERU,EMBU,NYANDARUA,NYERI,KIRINYAGA,MURANGA,KIAMBU,WEST POKOT,SAMBURU,TRANS NZOIA,UASIN GISHU,ELGEYO MARAKWET,NANDI,BARINGO,LAIKIPIA,NAKURU,NAROK,KAJIADO,KERICHO,BOMET,BUNGOMA,KISII,NYAMIRA,KAKAMEGA,NAIROBI,VIHIGA,');";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function variety_institutions_joins_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_variety_institutions_join ( "+
					"id INTEGER PRIMARY KEY AUTOINCREMENT, "+
					"sw_id INTEGER(11), "+
					"instution_id INTEGER(11), "+
					"instutiontype_id INTEGER(11) "+
				");";
			tx.executeSql(creattablesql);

			var populatetablesql = "INSERT OR IGNORE INTO default_sid_variety_institutions_join (id, sw_id, instution_id, instutiontype_id) VALUES "+
				"(1, 2, 5, 1),"+
				"(2, 2, 5, 2),"+
				"(3, 2, 5, 3),"+
				"(4, 3, 5, 1),"+
				"(5, 3, 5, 2),"+
				"(6, 3, 5, 3),"+
				"(7, 4, 5, 1),"+
				"(8, 4, 5, 2),"+
				"(9, 4, 5, 3),"+
				"(10, 5, 27, 1),"+
				"(11, 5, 48, 2),"+
				"(12, 5, 33, 3),"+
				"(13, 7, 27, 1),"+
				"(14, 7, 48, 2),"+
				"(15, 7, 33, 3),"+
				"(16, 8, 27, 1),"+
				"(17, 8, 48, 2),"+
				"(18, 8, 33, 3),"+
				"(19, 9, 27, 1),"+
				"(20, 9, 48, 2),"+
				"(21, 9, 33, 3),"+
				"(22, 10, 27, 1),"+
				"(23, 10, 48, 2),"+
				"(24, 10, 33, 3),"+
				"(25, 11, 27, 1),"+
				"(26, 11, 48, 2),"+
				"(27, 11, 33, 3),"+
				"(28, 13, 27, 1),"+
				"(29, 13, 48, 2),"+
				"(30, 13, 33, 3),"+
				"(31, 15, 27, 1),"+
				"(32, 15, 48, 2),"+
				"(33, 15, 33, 3),"+
				"(34, 16, 27, 1),"+
				"(35, 16, 48, 2),"+
				"(36, 16, 33, 3),"+
				"(37, 17, 27, 1),"+
				"(38, 17, 48, 2),"+
				"(39, 17, 33, 3),"+
				"(40, 18, 27, 1),"+
				"(41, 18, 48, 2),"+
				"(42, 18, 33, 3),"+
				"(43, 20, 27, 1),"+
				"(44, 20, 13, 2),"+
				"(45, 20, 13, 3),"+
				"(46, 21, 14, 1),"+
				"(47, 21, 14, 2),"+
				"(48, 21, 14, 3),"+
				"(49, 22, 27, 1),"+
				"(50, 22, 27, 2),"+
				"(51, 22, 64, 3),"+
				"(52, 23, 27, 1),"+
				"(53, 23, 27, 2),"+
				"(54, 23, 64, 3),"+
				"(55, 24, 27, 1),"+
				"(56, 24, 27, 2),"+
				"(57, 24, 13, 3),"+
				"(58, 25, 27, 1),"+
				"(59, 25, 27, 2),"+
				"(60, 25, 64, 3),"+
				"(61, 26, 27, 1),"+
				"(62, 26, 27, 2),"+
				"(63, 26, 64, 3),"+
				"(64, 27, 27, 1),"+
				"(65, 27, 27, 2),"+
				"(66, 27, 64, 3),"+
				"(67, 28, 27, 1),"+
				"(68, 28, 27, 2),"+
				"(69, 28, 64, 3),"+
				"(70, 29, 27, 1),"+
				"(71, 29, 27, 2),"+
				"(72, 29, 64, 3),"+
				"(73, 30, 27, 1),"+
				"(74, 30, 27, 2),"+
				"(75, 30, 64, 3),"+
				"(76, 31, 27, 1),"+
				"(77, 31, 27, 2),"+
				"(78, 31, 64, 3),"+
				"(79, 32, 27, 1),"+
				"(80, 32, 27, 2),"+
				"(81, 32, 67, 3),"+
				"(82, 33, 27, 1),"+
				"(83, 33, 27, 2),"+
				"(84, 33, 72, 3),"+
				"(85, 34, 27, 1),"+
				"(86, 34, 27, 2),"+
				"(87, 34, 14, 3),"+
				"(88, 35, 27, 1),"+
				"(89, 35, 27, 2),"+
				"(90, 35, 77, 3),"+
				"(91, 36, 27, 1),"+
				"(92, 36, 27, 2),"+
				"(93, 36, 77, 3),"+
				"(94, 37, 27, 1),"+
				"(95, 37, 27, 2),"+
				"(96, 37, 67, 3),"+
				"(97, 38, 27, 1),"+
				"(98, 38, 27, 2),"+
				"(99, 38, 19, 3),"+
				"(100, 39, 27, 1),"+
				"(101, 39, 27, 2),"+
				"(102, 39, 6, 3),"+
				"(103, 40, 27, 1),"+
				"(104, 40, 27, 2),"+
				"(105, 40, 62, 3),"+
				"(106, 41, 27, 1),"+
				"(107, 41, 29, 2),"+
				"(108, 41, 64, 3),"+
				"(109, 42, 27, 1),"+
				"(110, 42, 29, 2),"+
				"(111, 42, 64, 3),"+
				"(112, 43, 27, 1),"+
				"(113, 43, 30, 2),"+
				"(114, 43, 64, 3),"+
				"(115, 44, 27, 1),"+
				"(116, 44, 30, 2),"+
				"(117, 44, 64, 3),"+
				"(118, 45, 27, 1),"+
				"(119, 45, 31, 2),"+
				"(120, 45, 7, 3),"+
				"(121, 46, 27, 1),"+
				"(122, 46, 31, 2),"+
				"(123, 46, 7, 3),"+
				"(124, 47, 27, 1),"+
				"(125, 47, 31, 2),"+
				"(126, 47, 11, 3),"+
				"(127, 52, 27, 1),"+
				"(128, 52, 32, 2),"+
				"(129, 52, 56, 3),"+
				"(130, 53, 27, 1),"+
				"(131, 53, 32, 2),"+
				"(132, 53, 64, 3),"+
				"(133, 54, 27, 1),"+
				"(134, 54, 32, 2),"+
				"(135, 54, 64, 3),"+
				"(136, 55, 27, 1),"+
				"(137, 55, 32, 2),"+
				"(138, 55, 64, 3),"+
				"(139, 56, 50, 1),"+
				"(140, 56, 27, 2),"+
				"(141, 56, 66, 3),"+
				"(142, 57, 50, 1),"+
				"(143, 57, 27, 2),"+
				"(144, 57, 50, 3),"+
				"(145, 58, 50, 1),"+
				"(146, 58, 27, 2),"+
				"(147, 58, 50, 3),"+
				"(148, 59, 27, 1),"+
				"(149, 59, 27, 2),"+
				"(150, 59, 50, 3),"+
				"(151, 63, 27, 1),"+
				"(152, 63, 29, 2),"+
				"(153, 63, 64, 3),"+
				"(154, 64, 27, 1),"+
				"(155, 64, 29, 2),"+
				"(156, 64, 64, 3),"+
				"(157, 65, 27, 1),"+
				"(158, 65, 29, 2),"+
				"(159, 65, 64, 3),"+
				"(160, 66, 27, 1),"+
				"(161, 66, 29, 2),"+
				"(162, 66, 8, 3),"+
				"(163, 67, 27, 1),"+
				"(164, 67, 29, 2),"+
				"(165, 67, 8, 3),"+
				"(166, 68, 27, 1),"+
				"(167, 68, 30, 2),"+
				"(168, 68, 19, 3),"+
				"(169, 69, 27, 1),"+
				"(170, 69, 30, 2),"+
				"(171, 69, 64, 3),"+
				"(172, 70, 27, 1),"+
				"(173, 70, 30, 2),"+
				"(174, 70, 64, 3),"+
				"(175, 71, 27, 1),"+
				"(176, 71, 30, 2),"+
				"(177, 71, 64, 3),"+
				"(178, 72, 27, 1),"+
				"(179, 72, 30, 2),"+
				"(180, 72, 64, 3),"+
				"(181, 73, 27, 1),"+
				"(182, 73, 36, 2),"+
				"(183, 73, 64, 3),"+
				"(184, 74, 27, 1),"+
				"(185, 74, 36, 2),"+
				"(186, 74, 64, 3),"+
				"(187, 75, 27, 1),"+
				"(188, 75, 36, 2),"+
				"(189, 75, 16, 3),"+
				"(190, 76, 27, 1),"+
				"(191, 76, 36, 2),"+
				"(192, 76, 21, 3),"+
				"(193, 77, 27, 1),"+
				"(194, 77, 36, 2),"+
				"(195, 77, 16, 3),"+
				"(196, 78, 27, 1),"+
				"(197, 78, 36, 2),"+
				"(198, 78, 59, 3),"+
				"(199, 79, 27, 1),"+
				"(200, 79, 36, 2),"+
				"(201, 79, 64, 3),"+
				"(202, 80, 27, 1),"+
				"(203, 80, 36, 2),"+
				"(204, 80, 64, 3),"+
				"(205, 81, 27, 1),"+
				"(206, 81, 36, 2),"+
				"(207, 81, 64, 3),"+
				"(208, 82, 27, 1),"+
				"(209, 82, 36, 2),"+
				"(210, 82, 64, 3),"+
				"(211, 83, 27, 1),"+
				"(212, 83, 36, 2),"+
				"(213, 83, 64, 3),"+
				"(214, 84, 27, 1),"+
				"(215, 84, 36, 2),"+
				"(216, 84, 64, 3),"+
				"(217, 85, 27, 1),"+
				"(218, 85, 36, 2),"+
				"(219, 85, 64, 3),"+
				"(220, 86, 27, 1),"+
				"(221, 86, 36, 2),"+
				"(222, 86, 64, 3),"+
				"(223, 87, 27, 1),"+
				"(224, 87, 36, 2),"+
				"(225, 87, 64, 3),"+
				"(226, 89, 27, 1),"+
				"(227, 89, 31, 2),"+
				"(228, 89, 19, 3),"+
				"(229, 90, 27, 1),"+
				"(230, 90, 31, 2),"+
				"(231, 90, 14, 3),"+
				"(232, 92, 27, 1),"+
				"(233, 92, 31, 2),"+
				"(234, 92, 19, 3),"+
				"(235, 93, 27, 1),"+
				"(236, 93, 31, 2),"+
				"(237, 93, 66, 3),"+
				"(238, 94, 27, 1),"+
				"(239, 94, 31, 2),"+
				"(240, 94, 7, 3),"+
				"(241, 95, 27, 1),"+
				"(242, 95, 31, 2),"+
				"(243, 95, 64, 3),"+
				"(244, 96, 27, 1),"+
				"(245, 96, 31, 2),"+
				"(246, 96, 64, 3),"+
				"(247, 97, 27, 1),"+
				"(248, 97, 31, 2),"+
				"(249, 97, 64, 3),"+
				"(250, 98, 27, 1),"+
				"(251, 98, 44, 2),"+
				"(252, 98, 33, 3),"+
				"(253, 99, 27, 1),"+
				"(254, 99, 44, 2),"+
				"(255, 99, 33, 3),"+
				"(256, 100, 27, 1),"+
				"(257, 100, 44, 2),"+
				"(258, 100, 33, 3),"+
				"(259, 101, 27, 1),"+
				"(260, 101, 32, 2),"+
				"(261, 101, 64, 3),"+
				"(262, 102, 27, 1),"+
				"(263, 102, 32, 2),"+
				"(264, 102, 33, 3),"+
				"(265, 103, 27, 1),"+
				"(266, 103, 32, 2),"+
				"(267, 103, 56, 3),"+
				"(268, 104, 27, 1),"+
				"(269, 104, 32, 2),"+
				"(270, 104, 20, 3),"+
				"(271, 105, 27, 1),"+
				"(272, 105, 32, 2),"+
				"(273, 105, 20, 3),"+
				"(274, 106, 27, 1),"+
				"(275, 106, 32, 2),"+
				"(276, 106, 64, 3),"+
				"(277, 107, 50, 1),"+
				"(278, 107, 50, 2),"+
				"(279, 107, 50, 3),"+
				"(280, 108, 50, 1),"+
				"(281, 108, 50, 2),"+
				"(282, 108, 50, 3),"+
				"(283, 109, 50, 1),"+
				"(284, 109, 50, 2),"+
				"(285, 109, 50, 3),"+
				"(286, 110, 50, 1),"+
				"(287, 110, 50, 2),"+
				"(288, 110, 50, 3),"+
				"(289, 111, 50, 1),"+
				"(290, 111, 50, 2),"+
				"(291, 111, 50, 3),"+
				"(292, 112, 50, 1),"+
				"(293, 112, 50, 2),"+
				"(294, 112, 50, 3),"+
				"(295, 113, 50, 1),"+
				"(296, 113, 50, 2),"+
				"(297, 113, 50, 3),"+
				"(298, 114, 50, 1),"+
				"(299, 114, 50, 2),"+
				"(300, 114, 50, 3),"+
				"(301, 115, 50, 1),"+
				"(302, 115, 50, 2),"+
				"(303, 115, 50, 3),"+
				"(304, 116, 50, 1),"+
				"(305, 116, 50, 2),"+
				"(306, 116, 50, 3),"+
				"(307, 117, 50, 1),"+
				"(308, 117, 50, 2),"+
				"(309, 117, 50, 3),"+
				"(310, 118, 50, 1),"+
				"(311, 118, 50, 2),"+
				"(312, 118, 50, 3),"+
				"(313, 119, 50, 1),"+
				"(314, 119, 50, 2),"+
				"(315, 119, 50, 3),"+
				"(316, 120, 50, 1),"+
				"(317, 120, 50, 2),"+
				"(318, 120, 50, 3),"+
				"(319, 121, 50, 1),"+
				"(320, 121, 50, 2),"+
				"(321, 121, 50, 3),"+
				"(322, 122, 50, 1),"+
				"(323, 122, 50, 2),"+
				"(324, 122, 50, 3),"+
				"(325, 123, 50, 1),"+
				"(326, 123, 50, 2),"+
				"(327, 123, 50, 3),"+
				"(328, 124, 50, 1),"+
				"(329, 124, 50, 2),"+
				"(330, 124, 50, 3),"+
				"(331, 125, 50, 1),"+
				"(332, 125, 50, 2),"+
				"(333, 125, 50, 3),"+
				"(334, 126, 50, 1),"+
				"(335, 126, 50, 2),"+
				"(336, 126, 50, 3),"+
				"(337, 127, 50, 1),"+
				"(338, 127, 50, 2),"+
				"(339, 127, 50, 3),"+
				"(340, 128, 50, 1),"+
				"(341, 128, 50, 2),"+
				"(342, 128, 50, 3),"+
				"(343, 129, 50, 1),"+
				"(344, 129, 50, 2),"+
				"(345, 129, 50, 3),"+
				"(346, 130, 50, 1),"+
				"(347, 130, 50, 2),"+
				"(348, 130, 50, 3),"+
				"(349, 131, 50, 1),"+
				"(350, 131, 50, 2),"+
				"(351, 131, 50, 3),"+
				"(352, 132, 50, 1),"+
				"(353, 132, 50, 2),"+
				"(354, 132, 50, 3),"+
				"(355, 133, 50, 1),"+
				"(356, 133, 50, 2),"+
				"(357, 133, 50, 3),"+
				"(358, 134, 50, 1),"+
				"(359, 134, 50, 2),"+
				"(360, 134, 50, 3),"+
				"(361, 135, 50, 1),"+
				"(362, 135, 50, 2),"+
				"(363, 135, 50, 3),"+
				"(364, 136, 50, 1),"+
				"(365, 136, 50, 2),"+
				"(366, 136, 50, 3),"+
				"(367, 137, 50, 1),"+
				"(368, 137, 50, 2),"+
				"(369, 137, 50, 3),"+
				"(370, 138, 50, 1),"+
				"(371, 138, 50, 2),"+
				"(372, 138, 50, 3),"+
				"(373, 139, 50, 1),"+
				"(374, 139, 50, 2),"+
				"(375, 139, 50, 3),"+
				"(376, 140, 50, 1),"+
				"(377, 140, 50, 2),"+
				"(378, 140, 50, 3),"+
				"(379, 141, 50, 1),"+
				"(380, 141, 50, 2),"+
				"(381, 141, 50, 3),"+
				"(382, 142, 50, 1),"+
				"(383, 142, 50, 2),"+
				"(384, 142, 50, 3),"+
				"(385, 143, 50, 1),"+
				"(386, 143, 50, 2),"+
				"(387, 143, 50, 3),"+
				"(388, 144, 50, 1),"+
				"(389, 144, 50, 2),"+
				"(390, 144, 50, 3),"+
				"(391, 145, 50, 1),"+
				"(392, 145, 50, 2),"+
				"(393, 145, 50, 3),"+
				"(394, 146, 50, 1),"+
				"(395, 146, 50, 2),"+
				"(396, 146, 50, 3),"+
				"(397, 147, 50, 1),"+
				"(398, 147, 50, 2),"+
				"(399, 147, 50, 3),"+
				"(400, 148, 50, 1);";
				tx.executeSql(populatetablesql);

				var populatetablesql = "INSERT OR IGNORE INTO default_sid_variety_institutions_join (id, sw_id, instution_id, instutiontype_id) VALUES "+
				"(401, 148, 50, 2),"+
				"(402, 148, 50, 3),"+
				"(403, 149, 50, 1),"+
				"(404, 149, 50, 2),"+
				"(405, 149, 50, 3),"+
				"(406, 150, 50, 1),"+
				"(407, 150, 50, 2),"+
				"(408, 150, 50, 3),"+
				"(409, 151, 50, 1),"+
				"(410, 151, 50, 2),"+
				"(411, 151, 50, 3),"+
				"(412, 152, 50, 1),"+
				"(413, 152, 50, 2),"+
				"(414, 152, 50, 3),"+
				"(415, 153, 50, 1),"+
				"(416, 153, 50, 2),"+
				"(417, 153, 50, 3),"+
				"(418, 154, 50, 1),"+
				"(419, 154, 50, 2),"+
				"(420, 154, 50, 3),"+
				"(421, 155, 50, 1),"+
				"(422, 155, 50, 2),"+
				"(423, 155, 50, 3),"+
				"(424, 156, 50, 1),"+
				"(425, 156, 50, 2),"+
				"(426, 156, 50, 3),"+
				"(427, 157, 50, 1),"+
				"(428, 157, 50, 2),"+
				"(429, 157, 50, 3),"+
				"(430, 158, 50, 1),"+
				"(431, 158, 50, 2),"+
				"(432, 158, 50, 3),"+
				"(433, 159, 55, 1),"+
				"(434, 159, 55, 2),"+
				"(435, 159, 55, 3),"+
				"(436, 160, 55, 1),"+
				"(437, 160, 55, 2),"+
				"(438, 160, 64, 3),"+
				"(439, 161, 59, 1),"+
				"(440, 161, 59, 2),"+
				"(441, 161, 11, 3),"+
				"(442, 162, 59, 1),"+
				"(443, 162, 59, 2),"+
				"(444, 162, 11, 3),"+
				"(445, 163, 59, 1),"+
				"(446, 163, 59, 2),"+
				"(447, 163, 11, 3),"+
				"(448, 164, 59, 1),"+
				"(449, 164, 59, 2),"+
				"(450, 164, 11, 3),"+
				"(451, 165, 59, 1),"+
				"(452, 165, 59, 2),"+
				"(453, 165, 11, 3),"+
				"(454, 166, 59, 1),"+
				"(455, 166, 59, 2),"+
				"(456, 166, 11, 3),"+
				"(457, 167, 59, 1),"+
				"(458, 167, 59, 2),"+
				"(459, 167, 11, 3),"+
				"(460, 168, 59, 1),"+
				"(461, 168, 59, 2),"+
				"(462, 168, 11, 3),"+
				"(463, 169, 66, 1),"+
				"(464, 169, 66, 2),"+
				"(465, 169, 66, 3),"+
				"(466, 170, 70, 1),"+
				"(467, 170, 70, 2),"+
				"(468, 170, 70, 3),"+
				"(469, 171, 70, 1),"+
				"(470, 171, 70, 2),"+
				"(471, 171, 70, 3),"+
				"(472, 172, 70, 1),"+
				"(473, 172, 70, 2),"+
				"(474, 172, 70, 3),"+
				"(475, 173, 70, 1),"+
				"(476, 173, 70, 2),"+
				"(477, 173, 70, 3),"+
				"(478, 174, 70, 1),"+
				"(479, 174, 70, 2),"+
				"(480, 174, 70, 3),"+
				"(481, 175, 70, 1),"+
				"(482, 175, 70, 2),"+
				"(483, 175, 70, 3),"+
				"(484, 176, 70, 1),"+
				"(485, 176, 70, 2),"+
				"(486, 176, 70, 3),"+
				"(487, 177, 70, 1),"+
				"(488, 177, 70, 2),"+
				"(489, 177, 70, 3),"+
				"(490, 178, 70, 1),"+
				"(491, 178, 70, 2),"+
				"(492, 178, 70, 3),"+
				"(493, 179, 70, 1),"+
				"(494, 179, 70, 2),"+
				"(495, 179, 70, 3),"+
				"(496, 180, 70, 1),"+
				"(497, 180, 70, 2),"+
				"(498, 180, 70, 3),"+
				"(499, 181, 70, 1),"+
				"(500, 181, 70, 2),"+
				"(501, 181, 70, 3),"+
				"(502, 182, 70, 1),"+
				"(503, 182, 70, 2),"+
				"(504, 182, 70, 3),"+
				"(505, 183, 70, 1),"+
				"(506, 183, 70, 2),"+
				"(507, 183, 70, 3),"+
				"(508, 184, 70, 1),"+
				"(509, 184, 70, 2),"+
				"(510, 184, 70, 3),"+
				"(511, 185, 70, 1),"+
				"(512, 185, 70, 2),"+
				"(513, 185, 70, 3),"+
				"(514, 186, 70, 1),"+
				"(515, 186, 70, 2),"+
				"(516, 186, 70, 3),"+
				"(517, 187, 70, 1),"+
				"(518, 187, 70, 2),"+
				"(519, 187, 70, 3),"+
				"(520, 188, 70, 1),"+
				"(521, 188, 70, 2),"+
				"(522, 188, 70, 3),"+
				"(523, 189, 70, 1),"+
				"(524, 189, 70, 2),"+
				"(525, 189, 70, 3),"+
				"(526, 190, 70, 1),"+
				"(527, 190, 70, 2),"+
				"(528, 190, 70, 3),"+
				"(529, 191, 70, 1),"+
				"(530, 191, 70, 2),"+
				"(531, 191, 70, 3),"+
				"(532, 192, 70, 1),"+
				"(533, 192, 70, 2),"+
				"(534, 192, 70, 3),"+
				"(535, 193, 70, 1),"+
				"(536, 193, 70, 2),"+
				"(537, 193, 70, 3),"+
				"(538, 194, 70, 1),"+
				"(539, 194, 70, 2),"+
				"(540, 194, 70, 3),"+
				"(541, 195, 70, 1),"+
				"(542, 195, 70, 2),"+
				"(543, 195, 70, 3),"+
				"(544, 196, 71, 1),"+
				"(545, 196, 71, 2),"+
				"(546, 196, 71, 3),"+
				"(547, 197, 71, 1),"+
				"(548, 197, 71, 2),"+
				"(549, 197, 71, 3),"+
				"(550, 198, 71, 1),"+
				"(551, 198, 71, 2),"+
				"(552, 198, 71, 3),"+
				"(553, 199, 71, 1),"+
				"(554, 199, 71, 2),"+
				"(555, 199, 71, 3),"+
				"(556, 200, 71, 1),"+
				"(557, 200, 71, 2),"+
				"(558, 200, 71, 3),"+
				"(559, 201, 71, 1),"+
				"(560, 201, 71, 2),"+
				"(561, 201, 71, 3),"+
				"(562, 202, 71, 1),"+
				"(563, 202, 71, 2),"+
				"(564, 202, 71, 3),"+
				"(565, 203, 71, 1),"+
				"(566, 203, 71, 2),"+
				"(567, 203, 71, 3),"+
				"(568, 204, 71, 1),"+
				"(569, 204, 71, 2),"+
				"(570, 204, 71, 3),"+
				"(571, 205, 71, 1),"+
				"(572, 205, 71, 2),"+
				"(573, 205, 71, 3),"+
				"(574, 206, 71, 1),"+
				"(575, 206, 71, 2),"+
				"(576, 206, 71, 3),"+
				"(577, 207, 71, 1),"+
				"(578, 207, 71, 2),"+
				"(579, 207, 71, 3),"+
				"(580, 208, 71, 1),"+
				"(581, 208, 71, 2),"+
				"(582, 208, 71, 3),"+
				"(583, 209, 73, 1),"+
				"(584, 209, 73, 2),"+
				"(585, 209, 7, 3),"+
				"(586, 210, 73, 1),"+
				"(587, 210, 73, 2),"+
				"(588, 210, 7, 3),"+
				"(589, 211, 73, 1),"+
				"(590, 211, 73, 2),"+
				"(591, 211, 7, 3),"+
				"(592, 212, 73, 1),"+
				"(593, 212, 73, 2),"+
				"(594, 212, 7, 3),"+
				"(595, 213, 73, 1),"+
				"(596, 213, 73, 2),"+
				"(597, 213, 7, 3),"+
				"(598, 214, 73, 1),"+
				"(599, 214, 73, 2),"+
				"(600, 214, 7, 3),"+
				"(601, 215, 73, 1),"+
				"(602, 215, 73, 2),"+
				"(603, 215, 7, 3),"+
				"(604, 216, 73, 1),"+
				"(605, 216, 73, 2),"+
				"(606, 216, 7, 3),"+
				"(607, 217, 73, 1),"+
				"(608, 217, 73, 2),"+
				"(609, 217, 7, 3),"+
				"(610, 218, 73, 1),"+
				"(611, 218, 73, 2),"+
				"(612, 218, 7, 3),"+
				"(613, 219, 73, 1),"+
				"(614, 219, 73, 2),"+
				"(615, 219, 7, 3),"+
				"(616, 220, 73, 1),"+
				"(617, 220, 73, 2),"+
				"(618, 220, 7, 3),"+
				"(619, 221, 73, 1),"+
				"(620, 221, 73, 2),"+
				"(621, 221, 7, 3),"+
				"(622, 222, 73, 1),"+
				"(623, 222, 73, 2),"+
				"(624, 222, 7, 3),"+
				"(625, 223, 73, 1),"+
				"(626, 223, 73, 2),"+
				"(627, 223, 7, 3),"+
				"(628, 224, 27, 1),"+
				"(629, 224, 79, 2),"+
				"(630, 224, 79, 3),"+
				"(631, 225, 79, 1),"+
				"(632, 225, 79, 2),"+
				"(633, 225, 79, 3),"+
				"(634, 226, 79, 1),"+
				"(635, 226, 79, 2),"+
				"(636, 226, 79, 3),"+
				"(637, 227, 79, 1),"+
				"(638, 227, 79, 2),"+
				"(639, 227, 79, 3),"+
				"(640, 228, 79, 1),"+
				"(641, 228, 79, 2),"+
				"(642, 228, 79, 3),"+
				"(643, 229, 79, 1),"+
				"(644, 229, 79, 2),"+
				"(645, 229, 79, 3),"+
				"(646, 230, 79, 1),"+
				"(647, 230, 79, 2),"+
				"(648, 230, 79, 3),"+
				"(649, 231, 79, 1),"+
				"(650, 231, 79, 2),"+
				"(651, 231, 79, 3),"+
				"(652, 232, 79, 1),"+
				"(653, 232, 79, 2),"+
				"(654, 232, 79, 3),"+
				"(655, 233, 79, 1),"+
				"(656, 233, 79, 2),"+
				"(657, 233, 79, 3),"+
				"(658, 234, 79, 1),"+
				"(659, 234, 79, 2),"+
				"(660, 234, 79, 3),"+
				"(661, 235, 79, 1),"+
				"(662, 235, 79, 2),"+
				"(663, 235, 79, 3),"+
				"(664, 236, 79, 1),"+
				"(665, 236, 79, 2),"+
				"(666, 236, 79, 3),"+
				"(667, 237, 79, 1),"+
				"(668, 237, 79, 2),"+
				"(669, 237, 79, 3),"+
				"(670, 238, 79, 1),"+
				"(671, 238, 79, 2),"+
				"(672, 238, 79, 3),"+
				"(673, 239, 79, 1),"+
				"(674, 239, 79, 2),"+
				"(675, 239, 79, 3),"+
				"(676, 240, 79, 1),"+
				"(677, 240, 79, 2),"+
				"(678, 240, 79, 3),"+
				"(679, 241, 79, 1),"+
				"(680, 241, 79, 2),"+
				"(681, 241, 79, 3),"+
				"(682, 242, 79, 1),"+
				"(683, 242, 79, 2),"+
				"(684, 242, 79, 3),"+
				"(685, 243, 79, 1),"+
				"(686, 243, 79, 2),"+
				"(687, 243, 79, 3),"+
				"(688, 244, 79, 1),"+
				"(689, 244, 79, 2),"+
				"(690, 244, 79, 3),"+
				"(691, 245, 79, 1),"+
				"(692, 245, 79, 2),"+
				"(693, 245, 79, 3),"+
				"(694, 246, 79, 1),"+
				"(695, 246, 79, 2),"+
				"(696, 246, 79, 3),"+
				"(697, 247, 79, 1),"+
				"(698, 247, 79, 2),"+
				"(699, 247, 79, 3),"+
				"(700, 248, 79, 1),"+
				"(701, 248, 79, 2),"+
				"(702, 248, 79, 3),"+
				"(703, 249, 79, 1),"+
				"(704, 249, 79, 2),"+
				"(705, 249, 79, 3),"+
				"(706, 250, 79, 1),"+
				"(707, 250, 79, 2),"+
				"(708, 250, 79, 3),"+
				"(709, 251, 79, 1),"+
				"(710, 251, 79, 2),"+
				"(711, 251, 79, 3),"+
				"(712, 252, 79, 1),"+
				"(713, 252, 79, 2),"+
				"(714, 252, 79, 3),"+
				"(715, 253, 27, 1),"+
				"(716, 253, 32, 2),"+
				"(717, 253, 6, 3),"+
				"(718, 254, 27, 1),"+
				"(719, 254, 30, 2),"+
				"(720, 254, 64, 3),"+
				"(721, 255, 27, 1),"+
				"(722, 255, 30, 2),"+
				"(723, 255, 72, 3),"+
				"(724, 256, 27, 1),"+
				"(725, 256, 30, 2),"+
				"(726, 256, 72, 3),"+
				"(727, 257, 27, 1),"+
				"(728, 257, 36, 2),"+
				"(729, 257, 64, 3),"+
				"(730, 258, 27, 1),"+
				"(731, 258, 36, 2),"+
				"(732, 258, 64, 3),"+
				"(733, 259, 27, 1),"+
				"(734, 259, 36, 2),"+
				"(735, 259, 33, 3),"+
				"(736, 262, 27, 1),"+
				"(737, 262, 36, 2),"+
				"(738, 262, 13, 3),"+
				"(739, 263, 27, 1),"+
				"(740, 263, 36, 2),"+
				"(741, 263, 13, 3),"+
				"(742, 264, 27, 1),"+
				"(743, 264, 36, 2),"+
				"(744, 264, 13, 3),"+
				"(745, 265, 27, 1),"+
				"(746, 265, 36, 2),"+
				"(747, 265, 13, 3),"+
				"(748, 266, 27, 1),"+
				"(749, 266, 36, 2),"+
				"(750, 266, 13, 3),"+
				"(751, 267, 27, 1),"+
				"(752, 267, 41, 2),"+
				"(753, 267, 33, 3),"+
				"(754, 275, 27, 1),"+
				"(755, 275, 36, 2),"+
				"(756, 275, 33, 3),"+
				"(757, 276, 27, 1),"+
				"(758, 276, 36, 2),"+
				"(759, 276, 33, 3),"+
				"(760, 278, 27, 1),"+
				"(761, 278, 36, 2),"+
				"(762, 278, 33, 3),"+
				"(763, 279, 27, 1),"+
				"(764, 279, 36, 2),"+
				"(765, 279, 33, 3),"+
				"(766, 283, 27, 1),"+
				"(767, 283, 36, 2),"+
				"(768, 283, 64, 3),"+
				"(769, 284, 27, 1),"+
				"(770, 284, 36, 2),"+
				"(771, 284, 64, 3),"+
				"(772, 287, 27, 1),"+
				"(773, 287, 36, 2),"+
				"(774, 287, 64, 3),"+
				"(775, 291, 27, 1),"+
				"(776, 291, 27, 2),"+
				"(777, 291, 33, 3),"+
				"(778, 294, 27, 1),"+
				"(779, 294, 27, 2),"+
				"(780, 294, 14, 3),"+
				"(781, 297, 27, 1),"+
				"(782, 297, 30, 2),"+
				"(783, 297, 33, 3),"+
				"(784, 300, 27, 1),"+
				"(785, 300, 36, 2),"+
				"(786, 300, 33, 3),"+
				"(787, 301, 27, 1),"+
				"(788, 301, 36, 2),"+
				"(789, 301, 13, 3),"+
				"(790, 302, 27, 1),"+
				"(791, 302, 27, 2),"+
				"(792, 302, 50, 3),"+
				"(793, 305, 27, 1),"+
				"(794, 305, 29, 2),"+
				"(795, 305, 64, 3),"+
				"(796, 307, 27, 1),"+
				"(797, 307, 36, 2),"+
				"(798, 307, 33, 3),"+
				"(799, 309, 75, 1),"+
				"(800, 309, 75, 2);";
				tx.executeSql(populatetablesql);

				var populatetablesql = "INSERT OR IGNORE INTO default_sid_variety_institutions_join (id, sw_id, instution_id, instutiontype_id) VALUES "+
				"(801, 309, 16, 3),"+
				"(802, 310, 75, 1),"+
				"(803, 310, 75, 2),"+
				"(804, 310, 64, 3),"+
				"(805, 311, 75, 1),"+
				"(806, 311, 75, 2),"+
				"(807, 311, 64, 3),"+
				"(808, 312, 75, 1),"+
				"(809, 312, 75, 2),"+
				"(810, 312, 50, 3),"+
				"(811, 313, 75, 1),"+
				"(812, 313, 75, 2),"+
				"(813, 313, 64, 3),"+
				"(814, 314, 75, 1),"+
				"(815, 314, 75, 2),"+
				"(816, 314, 50, 3),"+
				"(817, 315, 75, 1),"+
				"(818, 315, 75, 2),"+
				"(819, 315, 50, 3),"+
				"(820, 316, 75, 1),"+
				"(821, 316, 75, 2),"+
				"(822, 316, 16, 3),"+
				"(823, 317, 75, 1),"+
				"(824, 317, 75, 2),"+
				"(825, 317, 50, 3),"+
				"(826, 318, 75, 1),"+
				"(827, 318, 75, 2),"+
				"(828, 318, 50, 3),"+
				"(829, 319, 75, 1),"+
				"(830, 319, 75, 2),"+
				"(831, 319, 16, 3),"+
				"(832, 320, 27, 1),"+
				"(833, 320, 36, 2),"+
				"(834, 320, 33, 3),"+
				"(835, 321, 75, 1),"+
				"(836, 321, 75, 2),"+
				"(837, 321, 64, 3),"+
				"(838, 322, 27, 1),"+
				"(839, 322, 27, 2),"+
				"(840, 322, 56, 3),"+
				"(841, 323, 27, 1),"+
				"(842, 323, 27, 2),"+
				"(843, 323, 56, 3),"+
				"(844, 324, 27, 1),"+
				"(845, 324, 47, 2),"+
				"(846, 324, 64, 3),"+
				"(847, 325, 27, 1),"+
				"(848, 325, 47, 2),"+
				"(849, 325, 64, 3),"+
				"(850, 326, 27, 1),"+
				"(851, 326, 47, 2),"+
				"(852, 326, 64, 3),"+
				"(853, 327, 27, 1),"+
				"(854, 327, 47, 2),"+
				"(855, 327, 64, 3),"+
				"(856, 328, 27, 1),"+
				"(857, 328, 47, 2),"+
				"(858, 328, 64, 3),"+
				"(859, 329, 27, 1),"+
				"(860, 329, 47, 2),"+
				"(861, 329, 64, 3),"+
				"(862, 333, 27, 1),"+
				"(863, 333, 30, 2),"+
				"(864, 333, 33, 3),"+
				"(865, 334, 27, 1),"+
				"(866, 334, 30, 2),"+
				"(867, 334, 33, 3),"+
				"(868, 335, 27, 1),"+
				"(869, 335, 30, 2),"+
				"(870, 335, 33, 3),"+
				"(871, 336, 75, 1),"+
				"(872, 336, 75, 2),"+
				"(873, 336, 64, 3),"+
				"(874, 337, 75, 1),"+
				"(875, 337, 75, 2),"+
				"(876, 337, 64, 3),"+
				"(877, 338, 75, 1),"+
				"(878, 338, 75, 2),"+
				"(879, 338, 64, 3),"+
				"(880, 339, 27, 1),"+
				"(881, 339, 36, 2),"+
				"(882, 339, 33, 3),"+
				"(883, 340, 27, 1),"+
				"(884, 340, 36, 2),"+
				"(885, 340, 33, 3),"+
				"(886, 341, 27, 1),"+
				"(887, 341, 36, 2),"+
				"(888, 341, 33, 3),"+
				"(889, 342, 27, 1),"+
				"(890, 342, 36, 2),"+
				"(891, 342, 33, 3),"+
				"(892, 345, 27, 1),"+
				"(893, 345, 27, 2),"+
				"(894, 345, 33, 3),"+
				"(895, 346, 27, 1),"+
				"(896, 346, 27, 2),"+
				"(897, 346, 33, 3),"+
				"(898, 347, 27, 1),"+
				"(899, 347, 27, 2),"+
				"(900, 347, 33, 3),"+
				"(901, 348, 27, 1),"+
				"(902, 348, 27, 2),"+
				"(903, 348, 33, 3),"+
				"(904, 349, 27, 1),"+
				"(905, 349, 27, 2),"+
				"(906, 349, 33, 3),"+
				"(907, 350, 27, 1),"+
				"(908, 350, 27, 2),"+
				"(909, 350, 33, 3),"+
				"(910, 352, 27, 1),"+
				"(911, 352, 36, 2),"+
				"(912, 352, 13, 3),"+
				"(913, 353, 27, 1),"+
				"(914, 353, 36, 2),"+
				"(915, 353, 21, 3),"+
				"(916, 354, 27, 1),"+
				"(917, 354, 27, 2),"+
				"(918, 354, 50, 3),"+
				"(919, 359, 27, 1),"+
				"(920, 359, 36, 2),"+
				"(921, 359, 33, 3),"+
				"(922, 360, 27, 1),"+
				"(923, 360, 37, 2),"+
				"(924, 360, 56, 3),"+
				"(925, 362, 50, 1),"+
				"(926, 362, 50, 2),"+
				"(927, 362, 50, 3),"+
				"(928, 363, 50, 1),"+
				"(929, 363, 50, 2),"+
				"(930, 363, 50, 3),"+
				"(931, 364, 56, 1),"+
				"(932, 364, 56, 2),"+
				"(933, 364, 56, 3),"+
				"(934, 365, 73, 1),"+
				"(935, 365, 73, 2),"+
				"(936, 365, 7, 3),"+
				"(937, 366, 56, 1),"+
				"(938, 366, 56, 2),"+
				"(939, 366, 56, 3),"+
				"(940, 367, 27, 1),"+
				"(941, 367, 36, 2),"+
				"(942, 367, 33, 3),"+
				"(943, 368, 27, 1),"+
				"(944, 368, 37, 2),"+
				"(945, 368, 33, 3),"+
				"(946, 369, 27, 1),"+
				"(947, 369, 30, 2),"+
				"(948, 369, 33, 3),"+
				"(949, 370, 27, 1),"+
				"(950, 370, 30, 2),"+
				"(951, 370, 33, 3),"+
				"(952, 371, 27, 1),"+
				"(953, 371, 30, 2),"+
				"(954, 371, 64, 3),"+
				"(955, 373, 27, 1),"+
				"(956, 373, 30, 2),"+
				"(957, 373, 33, 3),"+
				"(958, 375, 27, 1),"+
				"(959, 375, 36, 2),"+
				"(960, 375, 33, 3),"+
				"(961, 377, 27, 1),"+
				"(962, 377, 36, 2),"+
				"(963, 377, 33, 3),"+
				"(964, 378, 27, 1),"+
				"(965, 378, 36, 2),"+
				"(966, 378, 33, 3),"+
				"(967, 379, 27, 1),"+
				"(968, 379, 28, 2),"+
				"(969, 379, 50, 3),"+
				"(970, 380, 27, 1),"+
				"(971, 380, 46, 2),"+
				"(972, 380, 50, 3),"+
				"(973, 381, 27, 1),"+
				"(974, 381, 46, 2),"+
				"(975, 381, 50, 3),"+
				"(976, 382, 27, 1),"+
				"(977, 382, 46, 2),"+
				"(978, 382, 50, 3),"+
				"(979, 383, 27, 1),"+
				"(980, 383, 46, 2),"+
				"(981, 383, 50, 3),"+
				"(982, 384, 63, 1),"+
				"(983, 384, 63, 2),"+
				"(984, 384, 50, 3),"+
				"(985, 385, 63, 1),"+
				"(986, 385, 46, 2),"+
				"(987, 385, 63, 3),"+
				"(988, 386, 27, 1),"+
				"(989, 386, 46, 2),"+
				"(990, 386, 64, 3),"+
				"(991, 388, 27, 1),"+
				"(992, 388, 46, 2),"+
				"(993, 388, 70, 3),"+
				"(994, 389, 27, 1),"+
				"(995, 389, 27, 2),"+
				"(996, 389, 50, 3),"+
				"(997, 390, 27, 1),"+
				"(998, 390, 27, 2),"+
				"(999, 390, 50, 3),"+
				"(1000, 391, 27, 1),"+
				"(1001, 391, 27, 2),"+
				"(1002, 391, 50, 3),"+
				"(1003, 392, 27, 1),"+
				"(1004, 392, 27, 2),"+
				"(1005, 392, 50, 3),"+
				"(1006, 396, 27, 1),"+
				"(1007, 396, 47, 2),"+
				"(1008, 396, 50, 3),"+
				"(1009, 397, 27, 1),"+
				"(1010, 397, 47, 2),"+
				"(1011, 397, 50, 3),"+
				"(1012, 399, 27, 1),"+
				"(1013, 399, 47, 2),"+
				"(1014, 399, 50, 3),"+
				"(1015, 400, 27, 1),"+
				"(1016, 400, 47, 2),"+
				"(1017, 400, 33, 3),"+
				"(1018, 403, 27, 1),"+
				"(1019, 403, 47, 2),"+
				"(1020, 403, 50, 3),"+
				"(1021, 407, 27, 1),"+
				"(1022, 407, 47, 2),"+
				"(1023, 407, 50, 3),"+
				"(1024, 409, 50, 1),"+
				"(1025, 409, 50, 2),"+
				"(1026, 409, 50, 3),"+
				"(1027, 410, 50, 1),"+
				"(1028, 410, 50, 2),"+
				"(1029, 410, 50, 3),"+
				"(1030, 411, 50, 1),"+
				"(1031, 411, 50, 2),"+
				"(1032, 411, 50, 3),"+
				"(1033, 412, 50, 1),"+
				"(1034, 412, 50, 2),"+
				"(1035, 412, 50, 3),"+
				"(1036, 413, 50, 1),"+
				"(1037, 413, 50, 2),"+
				"(1038, 413, 50, 3),"+
				"(1039, 414, 27, 1),"+
				"(1040, 414, 27, 2),"+
				"(1041, 414, 33, 3),"+
				"(1042, 415, 27, 1),"+
				"(1043, 415, 27, 2),"+
				"(1044, 415, 33, 3),"+
				"(1045, 416, 27, 1),"+
				"(1046, 416, 36, 2),"+
				"(1047, 416, 33, 3),"+
				"(1048, 417, 27, 1),"+
				"(1049, 417, 36, 2),"+
				"(1050, 417, 33, 3),"+
				"(1051, 418, 27, 1),"+
				"(1052, 418, 36, 2),"+
				"(1053, 418, 33, 3),"+
				"(1054, 419, 27, 1),"+
				"(1055, 419, 36, 2),"+
				"(1056, 419, 33, 3),"+
				"(1057, 420, 27, 1),"+
				"(1058, 420, 36, 2),"+
				"(1059, 420, 33, 3),"+
				"(1060, 421, 27, 1),"+
				"(1061, 421, 36, 2),"+
				"(1062, 421, 33, 3),"+
				"(1063, 422, 27, 1),"+
				"(1064, 422, 36, 2),"+
				"(1065, 422, 33, 3),"+
				"(1066, 423, 27, 1),"+
				"(1067, 423, 44, 2),"+
				"(1068, 423, 33, 3),"+
				"(1069, 424, 27, 1),"+
				"(1070, 424, 44, 2),"+
				"(1071, 424, 33, 3),"+
				"(1072, 425, 27, 1),"+
				"(1073, 425, 44, 2),"+
				"(1074, 425, 33, 3),"+
				"(1075, 426, 27, 1),"+
				"(1076, 426, 44, 2),"+
				"(1077, 426, 33, 3),"+
				"(1078, 427, 27, 1),"+
				"(1079, 427, 44, 2),"+
				"(1080, 427, 33, 3),"+
				"(1081, 428, 27, 1),"+
				"(1082, 428, 44, 2),"+
				"(1083, 428, 33, 3),"+
				"(1084, 429, 27, 1),"+
				"(1085, 429, 27, 2),"+
				"(1086, 429, 33, 3),"+
				"(1087, 430, 27, 1),"+
				"(1088, 430, 30, 2),"+
				"(1089, 430, 33, 3),"+
				"(1090, 431, 27, 1),"+
				"(1091, 431, 30, 2),"+
				"(1092, 431, 33, 3),"+
				"(1093, 432, 27, 1),"+
				"(1094, 432, 30, 2),"+
				"(1095, 432, 33, 3),"+
				"(1096, 433, 27, 1),"+
				"(1097, 433, 30, 2),"+
				"(1098, 433, 33, 3),"+
				"(1099, 434, 27, 1),"+
				"(1100, 434, 30, 2),"+
				"(1101, 434, 33, 3),"+
				"(1102, 435, 27, 1),"+
				"(1103, 435, 30, 2),"+
				"(1104, 435, 33, 3),"+
				"(1105, 436, 27, 1),"+
				"(1106, 436, 30, 2),"+
				"(1107, 436, 33, 3),"+
				"(1108, 437, 27, 1),"+
				"(1109, 437, 30, 2),"+
				"(1110, 437, 33, 3),"+
				"(1111, 438, 27, 1),"+
				"(1112, 438, 30, 2),"+
				"(1113, 438, 33, 3),"+
				"(1114, 439, 27, 1),"+
				"(1115, 439, 30, 2),"+
				"(1116, 439, 33, 3),"+
				"(1117, 440, 27, 1),"+
				"(1118, 440, 30, 2),"+
				"(1119, 440, 33, 3),"+
				"(1120, 441, 27, 1),"+
				"(1121, 441, 30, 2),"+
				"(1122, 441, 33, 3),"+
				"(1123, 442, 27, 1),"+
				"(1124, 442, 30, 2),"+
				"(1125, 442, 33, 3),"+
				"(1126, 443, 27, 1),"+
				"(1127, 443, 36, 2),"+
				"(1128, 443, 33, 3),"+
				"(1129, 444, 27, 1),"+
				"(1130, 444, 36, 2),"+
				"(1131, 444, 33, 3),"+
				"(1132, 445, 27, 1),"+
				"(1133, 445, 36, 2),"+
				"(1134, 445, 33, 3),"+
				"(1135, 446, 27, 1),"+
				"(1136, 446, 36, 2),"+
				"(1137, 446, 33, 3),"+
				"(1138, 447, 27, 1),"+
				"(1139, 447, 44, 2),"+
				"(1140, 447, 33, 3),"+
				"(1141, 6, 27, 1),"+
				"(1142, 6, 48, 2),"+
				"(1143, 6, 6, 3),"+
				"(1144, 6, 33, 3),"+
				"(1145, 12, 27, 1),"+
				"(1146, 12, 48, 2),"+
				"(1147, 12, 26, 3),"+
				"(1148, 12, 27, 3),"+
				"(1149, 14, 26, 1),"+
				"(1150, 14, 27, 1),"+
				"(1151, 14, 48, 2),"+
				"(1152, 14, 26, 3),"+
				"(1153, 14, 27, 3),"+
				"(1154, 19, 27, 1),"+
				"(1155, 19, 48, 2),"+
				"(1156, 19, 6, 3),"+
				"(1157, 19, 33, 3),"+
				"(1158, 48, 27, 1),"+
				"(1159, 48, 32, 2),"+
				"(1160, 48, 10, 3),"+
				"(1161, 48, 13, 3),"+
				"(1162, 48, 19, 3),"+
				"(1163, 48, 69, 3),"+
				"(1164, 49, 27, 1),"+
				"(1165, 49, 32, 2),"+
				"(1166, 49, 19, 3),"+
				"(1167, 49, 56, 3),"+
				"(1168, 49, 66, 3),"+
				"(1169, 49, 69, 3),"+
				"(1170, 49, 72, 3),"+
				"(1171, 50, 27, 1),"+
				"(1172, 50, 32, 2),"+
				"(1173, 50, 10, 3),"+
				"(1174, 50, 19, 3),"+
				"(1175, 50, 56, 3),"+
				"(1176, 50, 69, 3),"+
				"(1177, 51, 27, 1),"+
				"(1178, 51, 32, 2),"+
				"(1179, 51, 14, 3),"+
				"(1180, 51, 19, 3),"+
				"(1181, 51, 69, 3),"+
				"(1182, 60, 50, 1),"+
				"(1183, 60, 27, 2),"+
				"(1184, 60, 50, 2),"+
				"(1185, 60, 50, 3),"+
				"(1186, 61, 27, 1),"+
				"(1187, 61, 50, 1),"+
				"(1188, 61, 27, 2),"+
				"(1189, 61, 50, 2),"+
				"(1190, 61, 50, 3),"+
				"(1191, 62, 27, 1),"+
				"(1192, 62, 50, 1),"+
				"(1193, 62, 27, 2),"+
				"(1194, 62, 50, 2),"+
				"(1195, 62, 50, 3),"+
				"(1196, 88, 27, 1),"+
				"(1197, 88, 36, 2),"+
				"(1198, 88, 13, 3),"+
				"(1199, 88, 16, 3),"+
				"(1200, 88, 19, 3);";
				tx.executeSql(populatetablesql);

				var populatetablesql = "INSERT OR IGNORE INTO default_sid_variety_institutions_join (id, sw_id, instution_id, instutiontype_id) VALUES "+
				"(1201, 88, 67, 3),"+
				"(1202, 88, 76, 3),"+
				"(1203, 91, 27, 1),"+
				"(1204, 91, 31, 2),"+
				"(1205, 91, 14, 3),"+
				"(1206, 91, 19, 3),"+
				"(1207, 260, 27, 1),"+
				"(1208, 260, 36, 2),"+
				"(1209, 260, 13, 3),"+
				"(1210, 260, 19, 3),"+
				"(1211, 261, 27, 1),"+
				"(1212, 261, 36, 2),"+
				"(1213, 261, 13, 3),"+
				"(1214, 261, 19, 3),"+
				"(1215, 268, 15, 1),"+
				"(1216, 268, 15, 2),"+
				"(1217, 268, 19, 3),"+
				"(1218, 268, 56, 3),"+
				"(1219, 268, 66, 3),"+
				"(1220, 269, 15, 1),"+
				"(1221, 269, 15, 2),"+
				"(1222, 269, 19, 3),"+
				"(1223, 269, 56, 3),"+
				"(1224, 269, 66, 3),"+
				"(1225, 270, 15, 1),"+
				"(1226, 270, 15, 2),"+
				"(1227, 270, 19, 3),"+
				"(1228, 270, 56, 3),"+
				"(1229, 270, 66, 3),"+
				"(1230, 271, 15, 1),"+
				"(1231, 271, 15, 2),"+
				"(1232, 271, 19, 3),"+
				"(1233, 271, 56, 3),"+
				"(1234, 271, 66, 3),"+
				"(1235, 272, 56, 1),"+
				"(1236, 272, 24, 2),"+
				"(1237, 272, 56, 2),"+
				"(1238, 272, 56, 3),"+
				"(1239, 273, 56, 1),"+
				"(1240, 273, 24, 2),"+
				"(1241, 273, 56, 2),"+
				"(1242, 273, 56, 3),"+
				"(1243, 274, 27, 1),"+
				"(1244, 274, 36, 2),"+
				"(1245, 274, 19, 3),"+
				"(1246, 274, 56, 3),"+
				"(1247, 274, 66, 3),"+
				"(1248, 277, 27, 1),"+
				"(1249, 277, 36, 2),"+
				"(1250, 277, 13, 3),"+
				"(1251, 277, 14, 3),"+
				"(1252, 277, 56, 3),"+
				"(1253, 280, 27, 1),"+
				"(1254, 280, 36, 2),"+
				"(1255, 280, 13, 3),"+
				"(1256, 280, 33, 3),"+
				"(1257, 280, 56, 3),"+
				"(1258, 281, 79, 1),"+
				"(1259, 281, 79, 2),"+
				"(1260, 281, 50, 3),"+
				"(1261, 281, 79, 3),"+
				"(1262, 282, 15, 1),"+
				"(1263, 282, 15, 2),"+
				"(1264, 282, 19, 3),"+
				"(1265, 282, 56, 3),"+
				"(1266, 282, 66, 3),"+
				"(1267, 285, 27, 1),"+
				"(1268, 285, 36, 2),"+
				"(1269, 285, 13, 3),"+
				"(1270, 285, 19, 3),"+
				"(1271, 286, 27, 1),"+
				"(1272, 286, 36, 2),"+
				"(1273, 286, 13, 3),"+
				"(1274, 286, 33, 3),"+
				"(1275, 288, 15, 1),"+
				"(1276, 288, 15, 2),"+
				"(1277, 288, 19, 3),"+
				"(1278, 288, 50, 3),"+
				"(1279, 288, 56, 3),"+
				"(1280, 288, 66, 3),"+
				"(1281, 289, 15, 1),"+
				"(1282, 289, 15, 2),"+
				"(1283, 289, 19, 3),"+
				"(1284, 289, 50, 3),"+
				"(1285, 289, 56, 3),"+
				"(1286, 289, 66, 3),"+
				"(1287, 290, 15, 1),"+
				"(1288, 290, 15, 2),"+
				"(1289, 290, 19, 3),"+
				"(1290, 290, 50, 3),"+
				"(1291, 290, 56, 3),"+
				"(1292, 290, 66, 3),"+
				"(1293, 292, 27, 1),"+
				"(1294, 292, 50, 1),"+
				"(1295, 292, 27, 2),"+
				"(1296, 292, 14, 3),"+
				"(1297, 292, 50, 3),"+
				"(1298, 293, 27, 1),"+
				"(1299, 293, 50, 1),"+
				"(1300, 293, 27, 2),"+
				"(1301, 293, 14, 3),"+
				"(1302, 293, 50, 3),"+
				"(1303, 295, 27, 1),"+
				"(1304, 295, 50, 1),"+
				"(1305, 295, 27, 2),"+
				"(1306, 295, 14, 3),"+
				"(1307, 295, 50, 3),"+
				"(1308, 296, 27, 1),"+
				"(1309, 296, 30, 2),"+
				"(1310, 296, 10, 3),"+
				"(1311, 296, 16, 3),"+
				"(1312, 296, 33, 3),"+
				"(1313, 298, 27, 1),"+
				"(1314, 298, 30, 2),"+
				"(1315, 298, 9, 3),"+
				"(1316, 298, 10, 3),"+
				"(1317, 298, 16, 3),"+
				"(1318, 298, 21, 3),"+
				"(1319, 298, 33, 3),"+
				"(1320, 298, 56, 3),"+
				"(1321, 299, 27, 1),"+
				"(1322, 299, 36, 2),"+
				"(1323, 299, 13, 3),"+
				"(1324, 299, 56, 3),"+
				"(1325, 303, 27, 1),"+
				"(1326, 303, 50, 1),"+
				"(1327, 303, 27, 2),"+
				"(1328, 303, 50, 2),"+
				"(1329, 303, 14, 3),"+
				"(1330, 303, 50, 3),"+
				"(1331, 304, 27, 1),"+
				"(1332, 304, 50, 1),"+
				"(1333, 304, 27, 2),"+
				"(1334, 304, 50, 2),"+
				"(1335, 304, 50, 3),"+
				"(1336, 306, 27, 1),"+
				"(1337, 306, 36, 2),"+
				"(1338, 306, 13, 3),"+
				"(1339, 306, 56, 3),"+
				"(1340, 308, 50, 1),"+
				"(1341, 308, 74, 2),"+
				"(1342, 308, 50, 3),"+
				"(1343, 308, 74, 3),"+
				"(1344, 330, 27, 1),"+
				"(1345, 330, 75, 1),"+
				"(1346, 330, 27, 2),"+
				"(1347, 330, 75, 2),"+
				"(1348, 330, 50, 3),"+
				"(1349, 331, 27, 1),"+
				"(1350, 331, 75, 1),"+
				"(1351, 331, 27, 2),"+
				"(1352, 331, 75, 2),"+
				"(1353, 331, 50, 3),"+
				"(1354, 332, 27, 1),"+
				"(1355, 332, 75, 1),"+
				"(1356, 332, 29, 2),"+
				"(1357, 332, 75, 2),"+
				"(1358, 332, 50, 3),"+
				"(1359, 343, 27, 1),"+
				"(1360, 343, 36, 2),"+
				"(1361, 343, 13, 3),"+
				"(1362, 343, 14, 3),"+
				"(1363, 343, 19, 3),"+
				"(1364, 343, 33, 3),"+
				"(1365, 343, 56, 3),"+
				"(1366, 344, 27, 1),"+
				"(1367, 344, 27, 2),"+
				"(1368, 344, 13, 3),"+
				"(1369, 344, 19, 3),"+
				"(1370, 344, 33, 3),"+
				"(1371, 344, 50, 3),"+
				"(1372, 344, 56, 3),"+
				"(1373, 351, 27, 1),"+
				"(1374, 351, 30, 2),"+
				"(1375, 351, 33, 3),"+
				"(1376, 351, 56, 3),"+
				"(1377, 355, 27, 1),"+
				"(1378, 355, 50, 1),"+
				"(1379, 355, 27, 2),"+
				"(1380, 355, 50, 2),"+
				"(1381, 355, 33, 3),"+
				"(1382, 355, 50, 3),"+
				"(1383, 356, 27, 1),"+
				"(1384, 356, 50, 1),"+
				"(1385, 356, 27, 2),"+
				"(1386, 356, 50, 2),"+
				"(1387, 356, 50, 3),"+
				"(1388, 357, 27, 1),"+
				"(1389, 357, 50, 1),"+
				"(1390, 357, 27, 2),"+
				"(1391, 357, 50, 2),"+
				"(1392, 357, 13, 3),"+
				"(1393, 357, 50, 3),"+
				"(1394, 358, 27, 1),"+
				"(1395, 358, 50, 1),"+
				"(1396, 358, 27, 2),"+
				"(1397, 358, 50, 2),"+
				"(1398, 358, 50, 3),"+
				"(1399, 361, 27, 1),"+
				"(1400, 361, 37, 2),"+
				"(1401, 361, 50, 3),"+
				"(1402, 361, 56, 3),"+
				"(1403, 372, 27, 1),"+
				"(1404, 372, 30, 2),"+
				"(1405, 372, 33, 3),"+
				"(1406, 372, 50, 3),"+
				"(1407, 374, 27, 1),"+
				"(1408, 374, 36, 2),"+
				"(1409, 374, 33, 3),"+
				"(1410, 374, 50, 3),"+
				"(1411, 376, 27, 1),"+
				"(1412, 376, 36, 2),"+
				"(1413, 376, 33, 3),"+
				"(1414, 376, 56, 3),"+
				"(1415, 387, 27, 1),"+
				"(1416, 387, 46, 2),"+
				"(1417, 387, 33, 3),"+
				"(1418, 387, 50, 3),"+
				"(1419, 393, 27, 1),"+
				"(1420, 393, 50, 1),"+
				"(1421, 393, 27, 2),"+
				"(1422, 393, 50, 2),"+
				"(1423, 393, 50, 3),"+
				"(1424, 394, 27, 1),"+
				"(1425, 394, 50, 1),"+
				"(1426, 394, 27, 2),"+
				"(1427, 394, 50, 2),"+
				"(1428, 394, 50, 3),"+
				"(1429, 395, 27, 1),"+
				"(1430, 395, 47, 2),"+
				"(1431, 395, 6, 3),"+
				"(1432, 395, 33, 3),"+
				"(1433, 395, 50, 3),"+
				"(1434, 398, 27, 1),"+
				"(1435, 398, 47, 2),"+
				"(1436, 398, 6, 3),"+
				"(1437, 398, 33, 3),"+
				"(1438, 398, 50, 3),"+
				"(1439, 401, 27, 1),"+
				"(1440, 401, 47, 2),"+
				"(1441, 401, 6, 3),"+
				"(1442, 401, 33, 3),"+
				"(1443, 401, 50, 3),"+
				"(1444, 402, 27, 1),"+
				"(1445, 402, 47, 2),"+
				"(1446, 402, 6, 3),"+
				"(1447, 402, 33, 3),"+
				"(1448, 402, 50, 3),"+
				"(1449, 404, 27, 1),"+
				"(1450, 404, 47, 2),"+
				"(1451, 404, 6, 3),"+
				"(1452, 404, 33, 3),"+
				"(1453, 404, 50, 3),"+
				"(1454, 405, 27, 1),"+
				"(1455, 405, 47, 2),"+
				"(1456, 405, 6, 3),"+
				"(1457, 405, 33, 3),"+
				"(1458, 405, 50, 3),"+
				"(1459, 406, 27, 1),"+
				"(1460, 406, 47, 2),"+
				"(1461, 406, 6, 3),"+
				"(1462, 406, 33, 3),"+
				"(1463, 406, 50, 3),"+
				"(1464, 408, 27, 1),"+
				"(1465, 408, 47, 2),"+
				"(1466, 408, 33, 3),"+
				"(1467, 408, 50, 3),"+
				"(1468, 448, 27, 1),"+
				"(1469, 448, 47, 2),"+
				"(1470, 448, 18, 3),"+
				"(1471, 448, 33, 3),"+
				"(1472, 449, 27, 1),"+
				"(1473, 449, 47, 2),"+
				"(1474, 449, 18, 3),"+
				"(1475, 449, 33, 3),"+
				"(1476, 450, 27, 1),"+
				"(1477, 450, 47, 2),"+
				"(1478, 450, 18, 3),"+
				"(1479, 450, 33, 3),"+
				"(1480, 451, 27, 1),"+
				"(1481, 451, 47, 2),"+
				"(1482, 451, 18, 3),"+
				"(1483, 451, 33, 3),"+
				"(1484, 452, 27, 1),"+
				"(1485, 452, 47, 2),"+
				"(1486, 452, 18, 3),"+
				"(1487, 452, 33, 3),"+
				"(1488, 453, 27, 1),"+
				"(1489, 453, 36, 2),"+
				"(1490, 453, 9, 3),"+
				"(1491, 453, 56, 3),"+
				"(1492, 453, 10, 3),"+
				"(1493, 453, 33, 3),"+
				"(1494, 454, 27, 1),"+
				"(1495, 454, 36, 2),"+
				"(1496, 454, 9, 3),"+
				"(1497, 454, 56, 3),"+
				"(1498, 454, 10, 3),"+
				"(1499, 454, 33, 3),"+
				"(1500, 455, 27, 1),"+
				"(1501, 455, 36, 2),"+
				"(1502, 455, 9, 3),"+
				"(1503, 455, 56, 3),"+
				"(1504, 455, 10, 3),"+
				"(1505, 455, 33, 3);";
			
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function seedtypes_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_seedtype ( "+
					"seedtype_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"seedtype_name varchar(255) " + 
				");";

			var populatetablesql = "INSERT OR IGNORE INTO default_sid_seedtype (seedtype_id, seedtype_name) VALUES "+ 
				"(1, ''),"+
				"(2, 'HYBRID'),"+
				"(3, 'OPV'),"+
				"(4, 'TRUE BREEDING'),"+
				"(5, 'VEG PROP');";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function swa_seedtypes_tbl(){

	//Create Table
	db.transaction(
		function(tx) {
			var creattablesql = "CREATE TABLE IF NOT EXISTS default_sid_seedtype_swa ( "+
					"seedtype_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"seedtype_name varchar(255) " + 
				");";

			var populatetablesql = "INSERT OR IGNORE INTO default_sid_seedtype_swa (seedtype_id, seedtype_name) VALUES "+ 
				"(1, ''),"+
				"(2, 'MSETO'),"+
				"(3, 'OPV'),"+
				"(4, 'UTAFITI HALISI (TRUE BREEDING)'),"+
				"(5, 'MZIZI'),"+
				"(6, 'MTI');";

			tx.executeSql(creattablesql);
			tx.executeSql(populatetablesql);

		},
		function(error){console.dir(error);}
	);
}

function populate_counties_dropdown () {
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM default_sid_counties', [], function (tx, results) {
		  	var length = results.rows.length, i;
		  	for (i = 0; i < length; i++) {
		    	// console.dir(results.rows.item(i));
		    	$('.county').append('<option value="'+results.rows.item(i).county_name+'">'+results.rows.item(i).county_name+'</option>')
		  	}
		});
	});
}

//get altitude regions by county selected
function get_alt_regions(county) {

	$("#altitude_regions_english").html('<option value="0">Select ecological zone using drop down</option>'); //reset ecological zones select
	// $('#seed_choice_crop').val( $('#seed_choice_crop').prop('defaultSelected') ); //reset the crop select box

	db.transaction(function(tx){
		var alt_regions_sql = "SELECT county_regions.* FROM ("+
			"SELECT "+
				"CASE "+
				  "WHEN lowland LIKE '%"+county+"%' THEN 'Lowland' "+
				  "ELSE NULL "+
				"END AS lowland, "+
				"CASE "+
				  "WHEN lowland_transitional LIKE '%"+county+"%' THEN 'Lowland Transitional' "+
				  "ELSE NULL "+
				"END AS lowland_transitional, "+
				"CASE "+
				  "WHEN mid_altitude LIKE '%"+county+"%' THEN 'Mid Altitude' "+
				  "ELSE NULL "+
				"END AS mid_altitude, "+
				"CASE "+
				  "WHEN highland_transitional LIKE '%"+county+"%' THEN 'Highland Transitional' "+
				  "ELSE NULL "+
				"END AS highland_transitional, "+
				"CASE "+
				  "WHEN highland LIKE '%"+county+"%' THEN 'Highland' "+
				  "ELSE NULL "+
				"END AS highland "+
				"FROM default_sid_seedchoice_seedworks_combined  "+
			") county_regions "+
		"WHERE county_regions.lowland IS NOT NULL OR county_regions.lowland_transitional IS NOT NULL OR county_regions.mid_altitude IS NOT NULL OR county_regions.highland_transitional IS NOT NULL OR county_regions.highland IS NOT NULL;";
		tx.executeSql(alt_regions_sql, [], function (tx, results) {
		  	var length = results.rows.length, i;

		  	var altitude_regions=[];
		  	for (i = 0; i < length; i++) {
		  		//console.log(results.rows.item(i));
		    	
		  		if (results.rows.item(i).lowland !== null) {
		  			altitude_regions[1] = [];
					altitude_regions[1].push({ecozone_key:'lowland',name:'Coastal or Dryland'});
					
				}else if (results.rows.item(i).lowland_transitional !== null) {
					altitude_regions[2] = [];
					altitude_regions[2].push({ecozone_key:'lowland_transitional',name:'Dryland to Mid Altitude Transitional'});
					
				}else if (results.rows.item(i).mid_altitude !== null) {
					altitude_regions[3] = [];
					altitude_regions[3].push({ecozone_key:'mid_altitude',name:'Mid Altitude'});
					
				}else if (results.rows.item(i).highland_transitional !== null) {
					altitude_regions[4] = [];
					altitude_regions[4].push({ecozone_key:'highland_transitional',name:'Mid Altitude to Highland Transitional'});
					
				}else if (results.rows.item(i).highland !== null) {
					altitude_regions[5] = [];
					altitude_regions[5].push({ecozone_key:'highland',name:'Highland'});
				}
		  	}
		  	
			for ( var key in altitude_regions ){
				$("#altitude_regions_english").append('<option value="'+altitude_regions[key][0].ecozone_key+'">'+altitude_regions[key][0].name+'</option>');
			}

		});
	}, function(error){console.dir(error);});

}

//get altitude regions by county selected
function get_alt_regions_swa(county) {

	$("#altitude_regions_swahili").html('<option value="0">Chagua eneo (ekolojia)</option>'); //reset ecological zones select
	// $('#seed_choice_crop').val( $('#seed_choice_crop').prop('defaultSelected') ); //reset the crop select box

	db.transaction(function(tx){
		var alt_regions_sql = "SELECT county_regions.* FROM ("+
			"SELECT "+
				"CASE "+
				  "WHEN lowland LIKE '%"+county+"%' THEN 'Lowland' "+
				  "ELSE NULL "+
				"END AS lowland, "+
				"CASE "+
				  "WHEN lowland_transitional LIKE '%"+county+"%' THEN 'Lowland Transitional' "+
				  "ELSE NULL "+
				"END AS lowland_transitional, "+
				"CASE "+
				  "WHEN mid_altitude LIKE '%"+county+"%' THEN 'Mid Altitude' "+
				  "ELSE NULL "+
				"END AS mid_altitude, "+
				"CASE "+
				  "WHEN highland_transitional LIKE '%"+county+"%' THEN 'Highland Transitional' "+
				  "ELSE NULL "+
				"END AS highland_transitional, "+
				"CASE "+
				  "WHEN highland LIKE '%"+county+"%' THEN 'Highland' "+
				  "ELSE NULL "+
				"END AS highland "+
				"FROM default_sid_seedchoice_seedworks_combined  "+
			") county_regions "+
		"WHERE county_regions.lowland IS NOT NULL OR county_regions.lowland_transitional IS NOT NULL OR county_regions.mid_altitude IS NOT NULL OR county_regions.highland_transitional IS NOT NULL OR county_regions.highland IS NOT NULL;";
		tx.executeSql(alt_regions_sql, [], function (tx, results) {
		  	var length = results.rows.length, i;
		  	

		  	var altitude_regions=[];
		  	for (i = 0; i < length; i++) {
		  		//console.log(results.rows.item(i));
		    	
		  		if (results.rows.item(i).lowland !== null) {
		  			altitude_regions[1] = [];
					altitude_regions[1].push({ecozone_key:'lowland',name:'Nyanda ya Chini'});
					
				}else if (results.rows.item(i).lowland_transitional !== null) {
					altitude_regions[2] = [];
					altitude_regions[2].push({ecozone_key:'lowland_transitional',name:'Nyanda ya Chini Kiasi'});
					
				}else if (results.rows.item(i).mid_altitude !== null) {
					altitude_regions[3] = [];
					altitude_regions[3].push({ecozone_key:'mid_altitude',name:'Muinuko Kiasi'});
					
				}else if (results.rows.item(i).highland_transitional !== null) {
					altitude_regions[4] = [];
					altitude_regions[4].push({ecozone_key:'highland_transitional',name:'Nyanda ya Juu Kiasi'});
					
				}else if (results.rows.item(i).highland !== null) {
					altitude_regions[5] = [];
					altitude_regions[5].push({ecozone_key:'highland',name:'Nyanda ya Juu'});
				}
		  	}
			for ( var key in altitude_regions ){
				$("#altitude_regions_swahili").append('<option value="'+altitude_regions[key][0].ecozone_key+'">'+altitude_regions[key][0].name+'</option>');
			}

		});
	}, function(error){console.dir(error);});

}


function populate_crops_dropdown() {

	if($('#language_selected').val() == 'swahili'){
		$('#questions-swahili #seed_choice_crop').html('<option value="0">Chagua mmea</option>');
		db.transaction(function(tx){
			tx.executeSql('SELECT * FROM default_sid_crop_swa order by crop_name asc', [], function (tx, results) {
			  	var length = results.rows.length, i;
			  	for (i = 0; i < length; i++) {
			    	$('#questions-swahili #seed_choice_crop').append('<option value="'+results.rows.item(i).crop_id+'">'+results.rows.item(i).crop_name+'</option>')
			  	}
			});
		});
	}else{
		$('#questions-english #seed_choice_crop').html('<option value="0">Select crop using drop down.</option>');
		db.transaction(function(tx){
			tx.executeSql('SELECT * FROM default_sid_crop order by crop_name asc', [], function (tx, results) {
			  	var length = results.rows.length, i;
			  	for (i = 0; i < length; i++) {
			    	$('#questions-english #seed_choice_crop').append('<option value="'+results.rows.item(i).crop_id+'">'+results.rows.item(i).crop_name+'</option>')
			  	}
			});
		});
	}
}


function populate_maturity_filter () {
	var maturities = ["'EXTRA EARLY'","'EARLY'","'MEDIUM'","'LATE'"];
	$.each(maturities, function( index, maturity ) {
		var maturity_name = maturity.replace("'","");
		$('.maturity-filter-container').append('<div class="col-xs-6" style=""><label><input data-role="none" name="sw_maturity" type="checkbox" value="'+maturity+'" class="sw_seasons" > '+maturity_name.replace("'","")+'</label></div>');
	});
		
}

function populate_specialxtics_filter () {
	if($('#language_selected').val() == 'english'){
		$('#results-page-english .specialxtics-filter-container').html('<h1>Which special characteristics of the crop are you interested in?</h1>');

		var drought_tolerant = {name:"DROUGHT TOLERANT", value:'drought_tolerant'};
		var disease_tolerant = {name:"DISEASE TOLERANT / RESISTANT", value:'disease_tolerant'};
		var storage_pest_resistant = {name:"STORAGE AND FIELD PEST RESISTANT", value:'storage_pest_resistant'};
		var consumer_preferences = {name:"CONSUMER PREFERENCES", value:'consumer_preferences'};

		var specialxtics = [drought_tolerant,disease_tolerant,storage_pest_resistant,consumer_preferences];

		$.each(specialxtics, function( index, specialxtic ) {
			$('#results-page-english .specialxtics-filter-container').append('<div class="col-xs-12" style=""><label><input data-role="none" name="'+specialxtic.value+'" id="'+specialxtic.value+'" type="checkbox" class="sw_special_attr" value="1" class="sw_seasons" > '+specialxtic.name+'</label></div>');
		});

	}else if($('#language_selected').val() == 'swahili'){
		$('#results-page-swahili .specialxtics-filter-container').html('<h1>Ni maumbile gani mmea yanayokuvutia?</h1>');
		var drought_tolerant = {name:"INAYOHIMILI KIANGAZI", value:'drought_tolerant'};
		var disease_tolerant = {name:"INAYOHIMILI MAGONJWA", value:'disease_tolerant'};
		var storage_pest_resistant = {name:"INAYOHIMILI MUDA WA KUHIFADHI/WADUDU", value:'storage_pest_resistant'};
		var consumer_preferences = {name:"INAYOPENDELEWA NA WENYE KUITUMIA", value:'consumer_preferences'};

		var specialxtics = [drought_tolerant,disease_tolerant,storage_pest_resistant,consumer_preferences];

		$.each(specialxtics, function( index, specialxtic ) {
			$('#results-page-swahili .specialxtics-filter-container').append('<div class="col-xs-12" style=""><label><input data-role="none" name="'+specialxtic.value+'" id="'+specialxtic.value+'" type="checkbox" class="sw_special_attr" value="1" class="sw_seasons" > '+specialxtic.name+'</label></div>');
		});
	}
	
		
}

function populate_seasons_filter () {
	if($('#language_selected').val() == 'english'){
		$('#results-page-english .seasons-filter-container').html('<h1>Are you looking for a variety for long or short rains?</h1>');
		db.transaction(function(tx){
			tx.executeSql('SELECT * FROM default_sid_season where season_name !="NULL" order by season_name desc', [], function (tx, results) {
			  	var length = results.rows.length, i;
			  	for (i = 0; i < length; i++) {
			  		$('#results-page-english .seasons-filter-container').append('<div class="col-xs-4" style=""><label><input data-role="none" type="radio" name="sw_season" id="season_'+results.rows.item(i).season_id+'" value="'+results.rows.item(i).season_id+'" class="sw_seasons" > '+results.rows.item(i).season_name+'</label></div>');
			  	}
			});
		});
	}else if($('#language_selected').val() == 'swahili'){
		$('#results-page-swahili .seasons-filter-container').html('<h1>Je unatafuta aina ya mbegu kwa msimu wa mvua nyingi au chache?</h1>');
		db.transaction(function(tx){
			tx.executeSql('SELECT * FROM default_sid_season_swa where season_name !="NULL" order by season_name desc', [], function (tx, results) {
			  	var length = results.rows.length, i;
			  	for (i = 0; i < length; i++) {
			  		$('#results-page-swahili .seasons-filter-container').append('<div class="col-xs-4" style=""><label><input data-role="none" type="radio" name="sw_season" id="season_'+results.rows.item(i).season_id+'" value="'+results.rows.item(i).season_id+'" class="sw_seasons" > '+results.rows.item(i).season_name+'</label></div>');
			  	}
			});
		});
	}
}


function get_results (pageNum) {

	var selected_county = $( "#selected_county" ).val();
	var selected_altitude_region = $( "#selected_altitude_region" ).val();
	var selected_crop_id = $( "#selected_crop_id" ).val();

	var sql_where = '';
		
	if(selected_county != ''){ //
		sql_where += " AND (county LIKE '%"+selected_county+"%') ";
	}

	if(selected_altitude_region != ''){ //
		sql_where += " AND ("+selected_altitude_region+" LIKE '%"+selected_county+"%') ";
	}

	var sw_maturity = $( "input[name=sw_maturity]:checkbox:checked" ).serializeArray();
	var maturities = [];
  	$.each(sw_maturity, function( index, maturity ) {
		maturities.push(maturity.value);
	});
	
	if($( "input[name=sw_maturity]:checkbox:checked" ).length > 0){
		sql_where += " AND `sw_maturity` IN ("+maturities.join()+") ";
		$('.results_container').html('');
	}
	
	if($( "input[name=drought_tolerant]:checkbox:checked" ).length > 0){
		sql_where += " AND `sw_drought_tolerant` = 'YES' ";
		$('.results_container').html('');
	}

	if($( "input[name=disease_tolerant]:checkbox:checked" ).length > 0){
		sql_where += " AND `sw_disease_tolerant` = 'YES' ";
		$('.results_container').html('');
	}

	if($( "input[name=storage_pest_resistant]:checkbox:checked" ).length > 0){
		sql_where += " AND `sw_storage_pest_resistant` = 'YES' ";
		$('.results_container').html('');
	}

	if($( "input[name=consumer_preferences]:checkbox:checked" ).length > 0){
		sql_where += " AND `sw_consumer_preferences` = 'YES' ";
		$('.results_container').html('');
	}

	var sw_season = $( "input[type=radio][name=sw_season]:checked" ).val();
	if($( "input[type=radio][name=sw_season]:checked" ).length > 0){
		// sql_where += " AND `season_id` IN ("+sw_season+") ";
		sql_where += " AND sssc.season_id = "+sw_season+" ";
		$('.results_container').html('');
	}

	sql_where.replace('AND ( AND', 'AND ( ');

	if(pageNum){
		var pageNum = parseInt( pageNum );
	}else{
		var pageNum = 1;
	}

	var results_per_page = 10;
	var query_start = (pageNum-1)*results_per_page;
	
	if($('#language_selected').val() == 'english'){
		$( "#results-page-english #selected-crop-name" ).html($( "#selected_crop_name" ).val());
		$( "#results-page-english #selected-eco-zone" ).html($( "#selected_eco_zone" ).val());
		$( "#results-page-english #selected-county" ).html($( "#selected_county" ).val());

		var all_crops_details_sql_v1 = "SELECT sssc.*,crops.crop_name,cropcategory.category_name,seedtype.seedtype_name,licensetype.license_type,comm_level.comm_level_name,comm_potential.comm_potential_name,season.season_name FROM default_sid_seedchoice_seedworks_combined as sssc INNER JOIN default_sid_crop as crops on crops.crop_id = sssc.crop_id INNER JOIN default_sid_cropcategory as cropcategory on cropcategory.category_id = sssc.category_id INNER JOIN default_sid_seedtype as seedtype on seedtype.seedtype_id = sssc.seedtype_id INNER JOIN default_sid_license_type as licensetype on licensetype.license_type_id = sssc.license_type_id INNER JOIN default_sid_comm_level as comm_level on comm_level.comm_level_id = sssc.comm_level_id INNER JOIN default_sid_comm_potential as comm_potential on comm_potential.comm_potential_id = sssc.comm_potential_id INNER JOIN default_sid_season as season on season.season_id = sssc.season_id WHERE sssc.crop_id = '"+selected_crop_id+"' "+sql_where+" GROUP BY sssc.sw_id ORDER BY sw_releaseyr DESC LIMIT "+query_start+","+results_per_page+";"; //omitting the commercializing agents in this query.
		var all_crops_details_sql = "SELECT sssc.*,crops.crop_name,cropcategory.category_name,seedtype.seedtype_name,licensetype.license_type,comm_level.comm_level_name,comm_potential.comm_potential_name,season.season_name,institution.institution_name FROM default_sid_seedchoice_seedworks_combined as sssc INNER JOIN default_sid_crop as crops on crops.crop_id = sssc.crop_id INNER JOIN default_sid_cropcategory as cropcategory on cropcategory.category_id = sssc.category_id INNER JOIN default_sid_seedtype as seedtype on seedtype.seedtype_id = sssc.seedtype_id INNER JOIN default_sid_license_type as licensetype on licensetype.license_type_id = sssc.license_type_id INNER JOIN default_sid_comm_level as comm_level on comm_level.comm_level_id = sssc.comm_level_id INNER JOIN default_sid_comm_potential as comm_potential on comm_potential.comm_potential_id = sssc.comm_potential_id INNER JOIN default_sid_season as season on season.season_id = sssc.season_id INNER JOIN `default_sid_variety_institutions_join` as vij on vij.sw_id = sssc.sw_id INNER JOIN `default_sid_institution` as institution on institution.institution_id = vij.instution_id WHERE sssc.crop_id = '"+selected_crop_id+"' AND vij.instutiontype_id=3 "+sql_where+" ORDER BY sw_releaseyr DESC LIMIT "+query_start+","+results_per_page+";";
		var all_crops_details_sql_with_no_limit = "SELECT sssc.*,crops.crop_name,cropcategory.category_name,seedtype.seedtype_name,licensetype.license_type,comm_level.comm_level_name,comm_potential.comm_potential_name,season.season_name,institution.institution_name FROM default_sid_seedchoice_seedworks_combined as sssc INNER JOIN default_sid_crop as crops on crops.crop_id = sssc.crop_id INNER JOIN default_sid_cropcategory as cropcategory on cropcategory.category_id = sssc.category_id INNER JOIN default_sid_seedtype as seedtype on seedtype.seedtype_id = sssc.seedtype_id INNER JOIN default_sid_license_type as licensetype on licensetype.license_type_id = sssc.license_type_id INNER JOIN default_sid_comm_level as comm_level on comm_level.comm_level_id = sssc.comm_level_id INNER JOIN default_sid_comm_potential as comm_potential on comm_potential.comm_potential_id = sssc.comm_potential_id INNER JOIN default_sid_season as season on season.season_id = sssc.season_id INNER JOIN `default_sid_variety_institutions_join` as vij on vij.sw_id = sssc.sw_id INNER JOIN `default_sid_institution` as institution on institution.institution_id = vij.instution_id WHERE sssc.crop_id = '"+selected_crop_id+"' AND vij.instutiontype_id=3 "+sql_where+" GROUP BY sssc.sw_id ORDER BY sw_releaseyr DESC;";//GROUP BY to remove duplicate varieties
		
		$('#current_page_num_english').val(pageNum);
		$('#results-page-english #displayed_results').val(results_per_page*pageNum);
		
		//get total results
		db.transaction(function(tx){
			tx.executeSql(all_crops_details_sql_with_no_limit, [], function (tx, results) {
			  	var total_results = results.rows.length;
			  	var pages = Math.ceil(total_results/results_per_page);
			  	if(total_results < (results_per_page*pageNum)) { var results_displayed=total_results; }else{ var results_displayed=results_per_page*pageNum }
			  	
			  	$('#results-page-english #results_found').html(total_results);
			  	$('#results-page-english #results_displayed').html(results_displayed);
			  
			});
		}, function(error){console.log(error);});

		var fetched_crops = [];
		db.transaction(function(tx){
			tx.executeSql(all_crops_details_sql, [], function (tx, results) {
			  	var length = results.rows.length, i;
			  	if(length >= 1){
			  		var sw_ids = [];
			  		var comm_agents_names = [];
			  		var agents = [];
				  	for (i = 0; i < length; i++) {
				  		
				  		var crop_data = {};

				  		var sw_id = results.rows.item(i).sw_id;

				    	//get crop name
						var crop_name = results.rows.item(i).crop_name;
						//crop_data.crop_name = crop_data;

						//get category
						var category_name = results.rows.item(i).category_name;

						//get sw_variety
						var sw_variety = results.rows.item(i).sw_variety;

						//get seed type
						var seed_type_name = results.rows.item(i).seedtype_name;

						//get sw_releaseyr
						var sw_releaseyr = results.rows.item(i).sw_releaseyr;

						//get commercializing agents
						if($.inArray(results.rows.item(i).sw_id, sw_ids) === -1){
							agents = [results.rows.item(i).institution_name];
							comm_agents_names[sw_id] = [];
						}else{
							// console.log('repeated sw_id but with another commercializing agent for the variety');
							agents.push(results.rows.item(i).institution_name);
						}
						comm_agents_names[sw_id]=agents;
						var sw_comm_agents_names = comm_agents_names[sw_id].join(',');
						
						//get Type of Licence
						var sw_license_type_name = results.rows.item(i).license_type;

						//get Maturity
						var sw_maturity_age = results.rows.item(i).sw_maturity_age;

						//get Special Attributes
						var sw_special_attrib = results.rows.item(i).sw_special_attrib;

						//get Commercialized Level
						var comm_level_name = results.rows.item(i).comm_level_name;

						//get Commercial Potential
						var comm_potential_name = results.rows.item(i).comm_potential_name;

						//get Production Altitude
						var sw_alt_optimal = results.rows.item(i).sw_alt_optimal;

						//get season
						var season_name = results.rows.item(i).season_name;

						crop_data = {
							'crop_name': crop_name, 
							'category_name': category_name, 
							'sw_variety': sw_variety, 
							'seed_type_name': seed_type_name, 
							'sw_releaseyr': sw_releaseyr, 
							'sw_comm_agents_names': sw_comm_agents_names,
							'sw_license_type_name': sw_license_type_name, 
							'sw_maturity_age': sw_maturity_age,
							'sw_special_attrib': sw_special_attrib,
							'comm_level_name': comm_level_name,
							'comm_potential_name': comm_potential_name,
							'sw_alt_optimal': sw_alt_optimal,
							'season_name': season_name
						};

						if($.inArray(results.rows.item(i).sw_id, sw_ids) > -1){
							fetched_crops.pop();
							fetched_crops.push(crop_data);
						}else{
							fetched_crops.push(crop_data);
						}
						
						sw_ids.push(sw_id);

				  	}
				 
				 	$.each(fetched_crops, function( index, crop_data ) {
					  	var resultsitems = '<table class="resultitemcontainer" cellpadding="0" cellspacing="0">';
				
						if ((typeof(crop_data.crop_name) 		!== 'undefined') && (crop_data.crop_name 		!== null) && (crop_data.crop_name 	 !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Crop</p></td><td class="resultitemdesc"><p>'+crop_data.crop_name+'</p></td></tr>';};
						if ((typeof(crop_data.sw_variety) 	!== 'undefined') && (crop_data.sw_variety 	!== null) && (crop_data.sw_variety 	 !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Variety</p></td><td class="resultitemdesc"><p>'+crop_data.sw_variety+'</p></td></tr>'; };
						if ((typeof(crop_data.seed_type_name) !== 'undefined') && (crop_data.seed_type_name !== null) && (crop_data.seed_type_name !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Type</p></td><td class="resultitemdesc"><p>'+crop_data.seed_type_name+'</p></td></tr>'; };
						if ((typeof(crop_data.sw_releaseyr) 	!== 'undefined') && (crop_data.sw_releaseyr 	!== null) && (crop_data.sw_releaseyr 	 !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Year of Release</p></td><td class="resultitemdesc"><p>'+crop_data.sw_releaseyr+'</p></td></tr>'; };
						
						if ((typeof(crop_data.sw_comm_agents_names) 	!== 'undefined') && (crop_data.sw_comm_agents_names 	!== null) && (crop_data.sw_comm_agents_names  !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Commercializing Agents</p></td><td class="resultitemdesc"><p>'+crop_data.sw_comm_agents_names+'</p></td></tr>' };
						
						if ((typeof(crop_data.sw_alt_optimal) !== 'undefined') && (crop_data.sw_alt_optimal !== null) && (crop_data.sw_alt_optimal !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Production Altitude(Masl)</p></td><td class="resultitemdesc"><p>'+crop_data.sw_alt_optimal+'</p></td></tr>'; };
						if ((typeof(crop_data.season_name) 	!== 'undefined') && (crop_data.season_name 	!== null) && (crop_data.season_name !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Seasons/Rains</p></td><td class="resultitemdesc"><p>'+crop_data.season_name+'</p></td></tr>'; };
						if ((typeof(crop_data.sw_maturity_age) !== 'undefined') && (crop_data.sw_maturity_age !== null) && (crop_data.sw_maturity_age !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Maturity(months)</p></td><td class="resultitemdesc"><p>'+crop_data.sw_maturity_age+'</p></td></tr>'; };
						if ((typeof(crop_data.sw_special_attrib) !== 'undefined') && (crop_data.sw_special_attrib !== null) && (crop_data.sw_special_attrib !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Special Attribute(s)</p></td><td class="resultitemdesc"><p>'+crop_data.sw_special_attrib+'</p></td></tr>'; };
						
						resultsitems += '</table>';
						
						$('#results_container_english').append(resultsitems);
						
					});
				  	
				}else if(length != 1 && pageNum > 1){
					$('#results-page-english #errors').html('<p class="no_results_found">No more results to show.</p>');
					
				}else{
					$('#results_container_english').html('<p class="no_results_found">There are no results that match your search criteria. Please try changing your search criteria.</p>');
					
				}
			});

		}, function(error){$('#results_container_english').append('<p class="no_results_found">Error 2 '+error+'</p>');});
	}else if($('#language_selected').val() == 'swahili'){
		$( "#results-page-swahili #selected-crop-name" ).html($( "#selected_crop_name" ).val());
		$( "#results-page-swahili #selected-eco-zone" ).html($( "#selected_eco_zone" ).val());
		$( "#results-page-swahili #selected-county" ).html($( "#selected_county" ).val());
		
		var all_crops_details_sql_v1 = "SELECT sssc.*,crops.crop_name,cropcategory.category_name,seedtype.seedtype_name,licensetype.license_type,comm_level.comm_level_name,comm_potential.comm_potential_name,season.season_name,GROUP_CONCAT(institution.institution_name) commercializing_agents FROM default_sid_seedchoice_seedworks_combined_swa as sssc INNER JOIN default_sid_crop_swa as crops on crops.crop_id = sssc.crop_id INNER JOIN default_sid_cropcategory_swa as cropcategory on cropcategory.category_id = sssc.category_id INNER JOIN default_sid_seedtype as seedtype on seedtype.seedtype_id = sssc.seedtype_id INNER JOIN default_sid_license_type as licensetype on licensetype.license_type_id = sssc.license_type_id INNER JOIN default_sid_comm_level as comm_level on comm_level.comm_level_id = sssc.comm_level_id INNER JOIN default_sid_comm_potential as comm_potential on comm_potential.comm_potential_id = sssc.comm_potential_id INNER JOIN default_sid_season as season on season.season_id = sssc.season_id INNER JOIN default_sid_institution as institution ON FIND_IN_SET(institution.institution_id, sssc.sw_comm_agent) > 0 WHERE sssc.crop_id = '"+selected_crop_id+"' "+sql_where+" GROUP BY sssc.sw_id ORDER BY sw_releaseyr DESC";
		var all_crops_details_sql = "SELECT sssc.*,crops.crop_name,cropcategory.category_name,seedtype.seedtype_name,licensetype.license_type,comm_level.comm_level_name,comm_potential.comm_potential_name,season.season_name FROM default_sid_seedchoice_seedworks_combined_swa as sssc INNER JOIN default_sid_crop_swa as crops on crops.crop_id = sssc.crop_id INNER JOIN default_sid_cropcategory_swa as cropcategory on cropcategory.category_id = sssc.category_id INNER JOIN default_sid_seedtype_swa as seedtype on seedtype.seedtype_id = sssc.seedtype_id INNER JOIN default_sid_license_type_swa as licensetype on licensetype.license_type_id = sssc.license_type_id INNER JOIN default_sid_comm_level as comm_level on comm_level.comm_level_id = sssc.comm_level_id INNER JOIN default_sid_comm_potential_swa as comm_potential on comm_potential.comm_potential_id = sssc.comm_potential_id INNER JOIN default_sid_season_swa as season on season.season_id = sssc.season_id WHERE sssc.crop_id = '"+selected_crop_id+"' "+sql_where+" GROUP BY sssc.sw_id ORDER BY sw_releaseyr DESC LIMIT "+query_start+","+results_per_page+";";
		var all_crops_details_sql_with_no_limit = "SELECT sssc.*,crops.crop_name,cropcategory.category_name,seedtype.seedtype_name,licensetype.license_type,comm_level.comm_level_name,comm_potential.comm_potential_name,season.season_name FROM default_sid_seedchoice_seedworks_combined_swa as sssc INNER JOIN default_sid_crop_swa as crops on crops.crop_id = sssc.crop_id INNER JOIN default_sid_cropcategory_swa as cropcategory on cropcategory.category_id = sssc.category_id INNER JOIN default_sid_seedtype_swa as seedtype on seedtype.seedtype_id = sssc.seedtype_id INNER JOIN default_sid_license_type_swa as licensetype on licensetype.license_type_id = sssc.license_type_id INNER JOIN default_sid_comm_level as comm_level on comm_level.comm_level_id = sssc.comm_level_id INNER JOIN default_sid_comm_potential_swa as comm_potential on comm_potential.comm_potential_id = sssc.comm_potential_id INNER JOIN default_sid_season_swa as season on season.season_id = sssc.season_id WHERE sssc.crop_id = '"+selected_crop_id+"' "+sql_where+" GROUP BY sssc.sw_id ORDER BY sw_releaseyr DESC;";		
		
		$('#current_page_num_swahili').val(pageNum);
		$('#results-page-swahili #displayed_results').val(results_per_page*pageNum);
		//get total results
		db.transaction(function(tx){
			tx.executeSql(all_crops_details_sql_with_no_limit, [], function (tx, results) {
			  	var total_results = results.rows.length;
			  	var pages = Math.ceil(total_results/results_per_page);
			  	if(total_results < (results_per_page*pageNum)) { var results_displayed=total_results; }else{ var results_displayed=results_per_page*pageNum }
			  	
			  	$('#results-page-swahili #results_found').html(total_results);
			  	$('#results-page-swahili #results_displayed').html(results_displayed);
			  
			});
		});

		var fetched_crops = [];
		db.transaction(function(tx){
			tx.executeSql(all_crops_details_sql, [], function (tx, results) {
			  	var length = results.rows.length, i;
			  	if(length >= 1){
				  	for (i = 0; i < length; i++) {
				  		var crop_data = {};
				    	//get crop name
						var crop_name = results.rows.item(i).crop_name;
						//crop_data.crop_name = crop_data;

						//get category
						var category_name = results.rows.item(i).category_name;

						//get sw_variety
						var sw_variety = results.rows.item(i).sw_variety;

						//get seed type
						var seed_type_name = results.rows.item(i).seedtype_name;

						//get sw_releaseyr
						var sw_releaseyr = results.rows.item(i).sw_releaseyr;

						//get commercializing agents
						var sw_comm_agents_ids = results.rows.item(i).sw_comm_agent;
						// var comm_agents = get_comm_agents_names(sw_comm_agents_ids);
						// console.dir(comm_agents);

						//get Type of Licence
						var sw_license_type_name = results.rows.item(i).license_type;

						//get Maturity
						var sw_maturity_age = results.rows.item(i).sw_maturity_age;

						//get Special Attributes
						var sw_special_attrib = results.rows.item(i).sw_special_attrib;

						//get Commercialized Level
						var comm_level_name = results.rows.item(i).comm_level_name;

						//get Commercial Potential
						var comm_potential_name = results.rows.item(i).comm_potential_name;

						//get Production Altitude
						var sw_alt_optimal = results.rows.item(i).sw_alt_optimal;

						//get season
						var season_name = results.rows.item(i).season_name;

						crop_data = {
							'crop_name': crop_name, 
							'category_name': category_name, 
							'sw_variety': sw_variety, 
							'seed_type_name': seed_type_name, 
							'sw_releaseyr': sw_releaseyr, 
							'sw_comm_agents_ids': sw_comm_agents_ids,
							'sw_license_type_name': sw_license_type_name, 
							'sw_maturity_age': sw_maturity_age,
							'sw_special_attrib': sw_special_attrib,
							'comm_level_name': comm_level_name,
							'comm_potential_name': comm_potential_name,
							'sw_alt_optimal': sw_alt_optimal,
							'season_name': season_name
						};

						fetched_crops.push(crop_data);

				  	}

				  	$.each(fetched_crops, function( index, crop_data ) {
						
						// db.transaction(function(tx){
							
						// 	tx.executeSql('SELECT institution_name FROM default_sid_institution where institution_id IN('+crop_data.sw_comm_agents_ids+') order by institution_name asc', [], function (tx, results) {
						// 	  	var length = results.rows.length, i;
						// 	  	for (i = 0; i < length; i++) {
						// 	  		var comm_agents_names = joinObj(results.rows,'institution_name');
						// 	  		// console.dir(comm_agents_names);
						// 	  		crop_data.comm_agents_names = comm_agents_names;
									
						// 	  	}

							  	var resultsitems = '<table class="resultitemcontainer" cellpadding="0" cellspacing="0">';
						
								if ((typeof(crop_data.crop_name) 		!== 'undefined') && (crop_data.crop_name 		!== null) && (crop_data.crop_name 	 !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Jina la mmea</p></td><td class="resultitemdesc"><p>'+crop_data.crop_name+'</p></td></tr>';};
								if ((typeof(crop_data.sw_variety) 	!== 'undefined') && (crop_data.sw_variety 	!== null) && (crop_data.sw_variety 	 !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Tabaka(Variety)</p></td><td class="resultitemdesc"><p>'+crop_data.sw_variety+'</p></td></tr>'; };
								if ((typeof(crop_data.seed_type_name) !== 'undefined') && (crop_data.seed_type_name !== null) && (crop_data.seed_type_name !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Aina ya mbegu</p></td><td class="resultitemdesc"><p>'+crop_data.seed_type_name+'</p></td></tr>'; };
								if ((typeof(crop_data.sw_releaseyr) 	!== 'undefined') && (crop_data.sw_releaseyr 	!== null) && (crop_data.sw_releaseyr 	 !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Mwaka iliotolewa</p></td><td class="resultitemdesc"><p>'+crop_data.sw_releaseyr+'</p></td></tr>'; };
								
								// if ((typeof(crop_data.sw_comm_agents_ids) 	!== 'undefined') && (crop_data.sw_comm_agents_ids 	!== null) && (crop_data.sw_comm_agents_ids  !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Commercializing Agents</p></td><td class="resultitemdesc"><p>'+crop_data.comm_agents_names+'</p></td></tr>' };
								
								if ((typeof(crop_data.sw_alt_optimal) !== 'undefined') && (crop_data.sw_alt_optimal !== null) && (crop_data.sw_alt_optimal !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Kiwango cha muinuko(Mita)</p></td><td class="resultitemdesc"><p>'+crop_data.sw_alt_optimal+'</p></td></tr>'; };
								if ((typeof(crop_data.season_name) 	!== 'undefined') && (crop_data.season_name 	!== null) && (crop_data.season_name !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Msimu(mvua)</p></td><td class="resultitemdesc"><p>'+crop_data.season_name+'</p></td></tr>'; };
								if ((typeof(crop_data.sw_maturity_age) !== 'undefined') && (crop_data.sw_maturity_age !== null) && (crop_data.sw_maturity_age !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Umri wa kukomaa</p></td><td class="resultitemdesc"><p>Miezi '+crop_data.sw_maturity_age+'</p></td></tr>'; };
								if ((typeof(crop_data.sw_special_attrib) !== 'undefined') && (crop_data.sw_special_attrib !== null) && (crop_data.sw_special_attrib !='')) { resultsitems += '<tr class="resultitemdiv"><td class="resultitemlabel"><p>Maelezo maalum</p></td><td class="resultitemdesc"><p>'+crop_data.sw_special_attrib+'</p></td></tr>'; };
								
								resultsitems += '</table>';
								
								// $('.results_container').prepend(resultsitems);
								$('#results_container_swahili').append(resultsitems);
						// 	});
						// });
						
					});
				}else if(length != 1 && pageNum > 1){
					$('#results-page-swahili #errors').html('<p class="no_results_found">Umefikia mwisho wa matokeo.</p>');
					
				}else{
					$('#results_container_swahili').html('<p class="no_results_found">Hakuna matokeo yamepatikana. Tafadhali jaribu kubadilisha vigezo.</p>');
				}
			});

		});
	}

}

function joinObj(a, attr) {
  var out = [];
  for (var i=0; i<a.length; i++) {  
    out.push(a[i][attr]); 
  } 
 return out.join(", ");
}

function generateResultsPDF() {
	var doc = new jsPDF();
	if($('#language_selected').val() == 'english'){
		doc.fromHTML($('#results_container_english').get(0), 15, 15, {
			'width': 170
		});
	}else if($('#language_selected').val() == 'swahili'){
		doc.fromHTML($('#results_container_swahili').get(0), 15, 15, {
			'width': 170
		});
	}
	
	// doc.save('Test.pdf'); //uncomment to test on development browser(chrome with the Ripple emulator extension)
	var pdfOutput = doc.output();

	// // NEXT SAVE IT TO THE DEVICE'S LOCAL FILE SYSTEM
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
		
		fileSystem.root.getDirectory('/Download/MbeguChoice_Results', {create: true}, function(dirEntry) {
			
			var filename = 'MbeguChoice_Results_'+$( "#selected_crop_name" ).val()+'_'+$( "#selected_eco_zone" ).val()+'_'+$( "#selected_county" ).val()+'.pdf';
			fileSystem.root.getFile("/Download/MbeguChoice_Results/"+filename, {create: true}, function(entry) {
				var fileEntry = entry;
				entry.createWriter(function(writer) {
					writer.onwrite = function(evt) {

					};

					writer.write( pdfOutput );
					var filename = 'MbeguChoice_Results_'+$( "#selected_crop_name" ).val()+'_'+$( "#selected_eco_zone" ).val()+'_'+$( "#selected_county" ).val()+'.pdf';
					console.dir("Results downloaded to your device's memory successfully.");
					
					//window.plugins.fileOpener.open("/storage/sdcard0/Download/MbeguChoice_Results/"+filename);
					window.plugins.fileOpener.open("file:///sdcard/Download/MbeguChoice_Results/"+filename);
					// window.plugins.fileOpener.open("cdvfile://localhost/persistent/Download/MbeguChoice_Results/"+filename);
					
				}, function(error) {
					console.dir( "Error: : "+error );
				});

			}, function(error){
				console.dir( "Error: "+error );
			});
		});
		
	},
	function(event){
		console.dir( "Error: : "+event.target.error.code );
	});

}

function sync_with_live_db () {

	$(document).ajaxStart(function(){
		$("#sync a").addClass("blink");
    });
    
	$.ajax({
		async: true,
	    type: "GET",
	    url: "http://mbeguchoice.com/mbegu_choice/get_mobile_app_sync_data",
	    dataType: "json"
	}).done(function( sync_data, textStatus, jqXHR ) {
		
		var crops 			= $.parseJSON(sync_data.crops);
        var cropcategories 	= $.parseJSON(sync_data.cropcategories);
        var institutions 	= $.parseJSON(sync_data.institutions);
        var cropvarieties 	= $.parseJSON(sync_data.cropvarieties);

        var appdb_crop_ids = [];
        db.transaction(
			function(tx) {		
				tx.executeSql('SELECT crop_id FROM default_sid_crop order by crop_id asc', [], function (tx, results) {
				  	var length = results.rows.length, i;
				  	for (i = 0; i < length; i++) {
				    	appdb_crop_ids.push(results.rows.item(i).crop_id);
				  	}
				});
			},
			function(error){console.dir(error);}
		);
		
        //update/insert into crops table
        db.transaction(
			function(tx) {
				var truncate_cropstable_sql = "DROP TABLE IF EXISTS default_sid_crop;";
				tx.executeSql(truncate_cropstable_sql);

				var create_cropstable_sql = "CREATE TABLE IF NOT EXISTS default_sid_crop ( "+
					"crop_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					"crop_name varchar(255), " + 
					"category_id INTEGER(11) " + 
				");";
        		tx.executeSql(create_cropstable_sql);
			},
			function(error){console.dir(error);}
		);

		$.each( crops, function( i, crop ) {
	        db.transaction(
				function(tx) {
					var crop_name = crop.crop_name;
										
					var insert_crops_sql = 'INSERT OR IGNORE INTO default_sid_crop (crop_id, crop_name, category_id) VALUES '+
					'("'+crop.crop_id+'", "'+crop_name+'", '+crop.category_id+');';
					tx.executeSql(insert_crops_sql);
				},
				function(error){console.dir(error);}
			);

     	 });

		var appdb_cropcategories_ids = [];
        db.transaction(
			function(tx) {		
				tx.executeSql('SELECT category_id FROM default_sid_cropcategory order by category_id asc', [], function (tx, results) {
				  	var length = results.rows.length, i;
				  	for (i = 0; i < length; i++) {
				    	appdb_cropcategories_ids.push(results.rows.item(i).category_id);
				  	}
				});
			},
			function(error){console.dir(error);}
		);

		//update/insert into cropcategories table
		$.each( cropcategories, function( i, cropcategory ) {
	        db.transaction(
				function(tx) {
					var category_name = cropcategory.category_name;
					
					if(cropcategory.category_id == appdb_cropcategories_ids[i]){
						var update_cropcategories_sql = 'UPDATE default_sid_cropcategory SET category_name ="'+category_name+'"'+' WHERE category_id ='+cropcategory.category_id+';';
						tx.executeSql(update_cropcategories_sql);
						
					}else{
						var insert_cropcategories_sql = 'INSERT OR IGNORE INTO default_sid_cropcategory (category_id, category_name) VALUES '+
						'(NULL, "'+category_name+'"'+');';
						tx.executeSql(insert_cropcategories_sql);
					}
				},
				function(error){console.dir(error);}
			);
     	 });

		
		//update/insert into cropvarieties table
		db.transaction(
			function(tx) {
				var truncate_cropsvarietiestable_sql = "DROP TABLE IF EXISTS default_sid_seedchoice_seedworks_combined;";
				tx.executeSql(truncate_cropsvarietiestable_sql);

				var create_cropsvarietiestable_sql = "CREATE TABLE IF NOT EXISTS default_sid_seedchoice_seedworks_combined ( "+
					"sw_id INTEGER PRIMARY KEY AUTOINCREMENT,"+
					"sw_variety varchar(255),"+
					"category_id INTEGER(11),"+
					"crop_id INTEGER(11),"+
					"seedtype_id INTEGER(11),"+
					"season_id INTEGER(11),"+
					"license_type_id INTEGER(11),"+
					"comm_potential_id INTEGER(11),"+
					"comm_level_id INTEGER(11),"+
					"sw_releaseyr INTEGER(11),"+
					"sw_breed_institution varchar(255),"+
					"sw_maintainer varchar(255),"+
					"sw_comm_agent varchar(255),"+
					"sw_alt_optimal varchar(255),"+
					"sw_alt_min INTEGER(11),"+
					"sw_alt_max INTEGER(11),"+
					"sw_maturity varchar(255),"+
					"sw_maturity_age varchar(50),"+
					"sw_special_attrib varchar(255),"+
					"sw_drought_tolerant varchar(10),"+
					"sw_disease_tolerant varchar(10),"+
					"sw_storage_pest_resistant varchar(10),"+
					"sw_consumer_preferences varchar(10),"+
					"county TEXT,"+
					"lowland TEXT,"+
					"lowland_transitional TEXT,"+
					"mid_altitude TEXT,"+
					"highland_transitional TEXT,"+
					"highland TEXT "+ 
				");";
        		tx.executeSql(create_cropsvarietiestable_sql);
			},
			function(error){console.dir(error);}
		);

		$.each( cropvarieties, function( i, cropvariety ) {
	        db.transaction(
				function(tx) {

					var insert_cropvarieties_sql = 'INSERT OR IGNORE INTO default_sid_seedchoice_seedworks_combined (sw_id, sw_variety, category_id, crop_id, seedtype_id, season_id, license_type_id, comm_potential_id, comm_level_id, sw_releaseyr, sw_breed_institution, sw_maintainer, sw_comm_agent, sw_alt_optimal, sw_alt_min, sw_alt_max, sw_maturity, sw_maturity_age, sw_special_attrib, sw_drought_tolerant, sw_disease_tolerant, sw_storage_pest_resistant, sw_consumer_preferences, county, lowland, lowland_transitional, mid_altitude, highland_transitional, highland) VALUES '+
					'('+cropvariety.sw_id+', "'+cropvariety.sw_variety+'", '+cropvariety.category_id+', '+cropvariety.crop_id+', '+cropvariety.seedtype_id+', '+cropvariety.season_id+', '+cropvariety.license_type_id+', '+cropvariety.comm_potential_id+', '+cropvariety.comm_level_id+', "'+cropvariety.sw_releaseyr+'", "'+cropvariety.sw_breed_institution+'", "'+cropvariety.sw_maintainer+'", "'+cropvariety.sw_comm_agent+'", "'+cropvariety.sw_alt_optimal+'", "'+cropvariety.sw_alt_min+'", "'+cropvariety.sw_alt_max+'", "'+cropvariety.sw_maturity+'", "'+cropvariety.sw_maturity_age+'", "'+cropvariety.sw_special_attrib+'", "'+cropvariety.sw_drought_tolerant+'", "'+cropvariety.sw_disease_tolerant+'", "'+cropvariety.sw_storage_pest_resistant+'", "'+cropvariety.sw_consumer_preferences+'", "'+cropvariety.county+'", "'+cropvariety.lowland+'", "'+cropvariety.lowland_transitional+'", "'+cropvariety.mid_altitude+'", "'+cropvariety.highland_transitional+'", "'+cropvariety.highland+'"'+');';
					// console.dir(insert_cropvarieties_sql);
					tx.executeSql(insert_cropvarieties_sql);
				},
				function(error){console.dir(error);}
			);
     	});
		
		$('#language-menu-link').trigger('click');
		
	}).fail(function(jqxhr, textStatus, error) {
	    var err = textStatus + ", " + error;
		console.dir( "Request Failed: " + err );
	});

	$(document).ajaxComplete(function(event, request, settings){
  		$("#sync a").removeClass("blink");
    });
	
}

$(document).ready(function(e) {

	$('.menu-section-list a, .memberprofile,.toggle-button fa').click(function(e) {
	    $('.toggle-button').click();
	});

	// $('#data-sync').click(function(e) {

	// });

	$('#home-menu-link').click(function(e) {
		populate_crops_dropdown();
	    populate_specialxtics_filter();
	    populate_seasons_filter();
	});

	$('.english').click(function(e) {
	    $('.lnkenglish').trigger('click');
	    $( "#language_selected" ).val('english');
	   
	    $( ".menu-section-list #language-menu-link a span" ).html("Choose Language");
	    $( ".menu-section-list #home-menu-link a" ).attr("href", "#questions-english");
	    $( ".menu-section-list #about-menu-link a span" ).html("About");
	    $( ".menu-section-list #about-menu-link a" ).attr("href", "#about");
	    $( ".menu-section-list #help-menu-link a span" ).html("Help");
	    $( ".menu-section-list #help-menu-link a" ).attr("href", "#help");
	    
	    $( "#selected_county" ).val('');
	    $( "#selected_altitude_region" ).val('');
	    $( "#selected_eco_zone" ).val('');
	    $( "#selected_crop_id" ).val('');
	    $( "#selected_crop_name" ).val('');
	    
	    populate_crops_dropdown();
	    populate_specialxtics_filter();
	    populate_seasons_filter();

	    //refresh and force rebuild
	    $("#county-swahili").val('0');
		$('#county-swahili').selectmenu().selectmenu('refresh', true);
		$("#altitude_regions_swahili").val('0');
		$('#altitude_regions_swahili').selectmenu().selectmenu('refresh', true);
		$(".seed_choice_crop").val('0');
		$('.seed_choice_crop').selectmenu().selectmenu('refresh', true);
	});

	$('.kiswahili').click(function(e) {
	    $('.lnkkiswahili').trigger('click');
	    $( "#language_selected" ).val('swahili');
	    
	    $( ".menu-section-list #language-menu-link a span" ).html("Chagua Lugha");
	    $( ".menu-section-list #home-menu-link a" ).attr("href", "#questions-swahili");
	    $( ".menu-section-list #about-menu-link a span" ).html("Kutuhusu");
	    $( ".menu-section-list #about-menu-link a" ).attr("href", "#about-swahili");
	    $( ".menu-section-list #contact-menu-link a span" ).html("Wasiliana Nasi");
	    $( ".menu-section-list #help-menu-link a span" ).html("Pata Usaidizi");
	    $( ".menu-section-list #help-menu-link a" ).attr("href", "#help-swahili");
	    
	    $( "#selected_county" ).val('');
	    $( "#selected_altitude_region" ).val('');
	    $( "#selected_eco_zone" ).val('');
	    $( "#selected_crop_id" ).val('');
	    $( "#selected_crop_name" ).val('');

	    populate_crops_dropdown();
	    populate_specialxtics_filter();
	    populate_seasons_filter();

	    //refresh and force rebuild
	    $("#county-english").val('0');
		$('#county-english').selectmenu().selectmenu('refresh', true);
		$("#altitude_regions_english").val('0');
		$('#altitude_regions_english').selectmenu().selectmenu('refresh', true);
		$(".seed_choice_crop").val('0');
		$('.seed_choice_crop').selectmenu().selectmenu('refresh', true);
	});

	$('#landing-english .lets').click(function(e) {
	    $('.lnkhome').trigger('click');
	});
	$('#landing-swahili .lets').click(function(e) {
	    $('.questsions-page-swahili').trigger('click');
	});

	$('#landing-english .results').click(function(e) {
	    $('.lnkgetresults-english').trigger('click');
	});

	$( "#county-english" ).change(function(e) {
    	$( "#selected_county" ).val( $(this).val() );

    	$( "#altitude_regions_english" ).val('0');
    	//refresh and force rebuild
		$('#altitude_regions_english').selectmenu().selectmenu('refresh', true);
    	$( "#selected_altitude_region" ).val('');

    	$('.results_container').html('');
    	get_alt_regions($(this).val()); //get ecological zones of the county
    });
    $( "#county-swahili" ).change(function(e) {
    	$( "#selected_county" ).val( $(this).val() );

    	$( "#altitude_regions_swahili" ).val('0');
    	//refresh and force rebuild
		$('#altitude_regions_swahili').selectmenu().selectmenu('refresh', true);
    	$( "#selected_altitude_region" ).val('');

    	$('.results_container').html('');
    	get_alt_regions_swa($(this).val()); //get ecological zones of the county
    });

    $( "#altitude_regions_english" ).change(function(e) {
    	$( "#selected_altitude_region" ).val( $(this).val() );
    	// $( "#selected_eco_zone" ).val( $("#altitude_regions option[value='"+$(this).val()+"']").text() );
    	// $( "#selected_eco_zone" ).val( $("#altitude_regions option:selected").text() );
    	// $( "#selected_eco_zone" ).val( $(this).find(":selected").text() );
    	//$( "#selected_eco_zone" ).val( $("#altitude_regions").children("option").filter(":selected").text() ); // 49% slower
    	$( "#selected_eco_zone" ).val( $("#altitude_regions_english").children(":selected").text() ); // fastest and more optimized

    	$('.results_container').html('');
    	
    });
    $( "#altitude_regions_swahili" ).change(function(e) {
    	$( "#selected_altitude_region" ).val( $(this).val() );
    	// $( "#selected_eco_zone" ).val( $("#altitude_regions option[value='"+$(this).val()+"']").text() );
    	// $( "#selected_eco_zone" ).val( $("#altitude_regions option:selected").text() );
    	// $( "#selected_eco_zone" ).val( $(this).find(":selected").text() );
    	//$( "#selected_eco_zone" ).val( $("#altitude_regions").children("option").filter(":selected").text() ); // 49% slower
    	$( "#selected_eco_zone" ).val( $("#altitude_regions_swahili").children(":selected").text() ); // fastest and more optimized

    	$('.results_container').html('');
    	
    });

    $( ".seed_choice_crop" ).change(function(e) {
    	$( "#selected_crop_id" ).val( $(this).val() );
    	$( "#selected_crop_name" ).val( $(this).children(":selected").text() );

    	$('.results_container').html('');
    });

	$('a,button,input[type=text],input[type=password],textarea').attr('data-role','none'); // remove default formating
	$('.toSchedule').click();

	// Toggle the panel
    $("#bar, .filter-results").click(function(){
        $(".selectoptions").slideToggle("fast");
    });
    $("#more-filters").click(function(){
        $(".selectoptions").slideToggle("fast");
    });
    
    
    $(".selectoptions input").attr("data-role", "none");

    $('.load-more').click(function(e) {
    	if($('#language_selected').val() == 'swahili'){
    		var pageNumber = parseInt($('#current_page_num_swahili').val());
    	}else if($('#language_selected').val() == 'english'){
    		var pageNumber = parseInt($('#current_page_num_english').val());
    	}
	    get_results(pageNumber+1);
	});

	$('#exit-menu-link').click(function(e) {
    	if (navigator && navigator.app) {
			navigator.app.exitApp();
		} else if (navigator && navigator.device) {
		navigator.device.exitApp();
		}
	});

	// $('#sync').click(function(e) {
    	
		
	// });

}); // document.ready