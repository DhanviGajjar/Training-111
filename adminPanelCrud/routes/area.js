var express = require('express');
var router = express.Router();

//Call User Database Model
var AreaModel = require('../schema/area');
var CityModel = require('../schema/city');
var StateModel = require('../schema/state');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

//area add page
// router.get('/add', function (req, res, next) {

// 	CityModel.find(function (err, db_city_array) {
// 		if (err) {
// 			console.log("Error in Fetch Data " + err);
// 		} else {
// 			//Print Data in Console
// 			console.log(db_city_array);
// 			StateModel.find(function (err, db_state_array) {
// 				if (err) {
// 					console.log(err)
// 				} else {
// 					//Render User Array in HTML Table
// 					res.render('admin/area/add-area', { city_array: db_city_array, state_array: db_state_array });
// 				}
// 			}).lean();
// 		}
// 	}).lean();
// });

//area add page
router.get('/add', async function (req, res, next) {
	try {
		//find data from citymodel
		let db_city_array = await CityModel.find().lean();
		//find data from state model
		let db_state_array = await StateModel.find().lean();
		//response to data
		res.render('admin/area/add-area', { city_array: db_city_array, state_array: db_state_array });
	} catch (err) {
		//err
		console.log("Error in Fetch Data " + err);
	}
});

//Add Form Processing using Post Method 
router.post('/add', function (req, res, next) {
	console.log(req.body);
	//Create an Array 
	const mybodydata = {
		area_name: req.body.area_name,
		_city: req.body._city,
		_state: req.body._state

	}
	console.log("Name is " + req.body.area_name);
	console.log("ID is " + req.body._city);
	console.log("ID is " + req.body._state);

	//get data from area model
	var data = AreaModel(mybodydata);
	//save data
	data.save(function (err) {
		//if err
		if (err) {
			console.log("Error in Insert Record");
			//redirect to add page
		} else {
			res.redirect('add');
		}
	})

});

//edit myprofile page
router.post("/edit_myprofile/:myid", async function (req, res) {
	console.log("Edit ID is" + req.params.myid);
	//get users data 
	var id = req.params.myid;
	//Create an Array 
	const mybodydata = {
		email: req.body.email,
	};
	try {
		//find data from admin model & update
		let editdata = await adminModel.findByIdAndUpdate(req.params.myid)
		res.send("profile updated successfully...");
	}
	//err
	catch (err) {
		console.log("Error in Record Update");
		res.send("profile updated Failed... TRY AGAIN");
		// res.redirect('/admin/account/category');
	}

});

//display  page
router.get('/display', function (req, res, next) {
	//find data from admin model
	AreaModel.find(function (err, db_area_array) {
		console.log("area model : ", db_area_array);
		//err
		if (err) res.json({ message: 'There are no posts here.' });
		//find data from area model
		AreaModel.find({})
			//populate city & state 
			.populate('_city', '_state')
			//get the data & execute 
			.exec(function (err, db_areas_array) {
				console.log("After population : ", db_areas_array[0]);
				//Create an Array 
				var area_array = db_areas_array[1];
				console.log(JSON.stringify(db_areas_array));
				//var area_array_store = (JSON.stringify(db_areas_array));
				// console.log("string area array", area_array_store);

				//response to display page
				res.render("admin/area/display-area", { mydata: db_area_array, area_store: area_array });
			})
	}).lean();
});

//Get Single User By ID
router.get('/show/:id', function (req, res) {
	console.log(req.params.id);
	//find data from SubCategoryModel
	SubCategoryModel.findById(req.params.id, function (err, db_sucategory_array) {
		//err
		if (err) {
			console.log("Error in Single Record Fetch" + err);
			//response to subcategory page
		} else {
			console.log(db_sucategory_array);
			res.render('admin/subcategory/single-subcategory-record', { subcategory_array: db_sucategory_array });
		}
	});
});



//Delete User By ID
router.get('/delete/:id', function (req, res) {
	//find data from areaModel
	AreaModel.findByIdAndDelete(req.params.id, function (err, project) {
		//err
		if (err) {
			console.log("Error in Record Delete " + err);
			//redirect to display page
			res.redirect('/display');
			//else record delete
		} else {
			console.log("Record Deleted ");
			//redirect to display page
			res.redirect('/admin/area/display');
		}
	});
});

//Get Single User for Edit Record
router.get('/edit/:id', function (req, res) {
	console.log(req.params.id);
	//find data from areaModel
	AreaModel.findById(req.params.id, function (err, db_area_array) {
	//err
		if (err) {
			console.log("Edit Fetch Error " + err);
		} else {
			console.log(db_area_array);
			//find data from stateModel
			StateModel.find(function (err, db_state_array) {
				//err
				if (err) {
					console.log(err)
				} else {
					//Render User Array in HTML Table
					console.log("state_array is : ", db_state_array);
						//find data from cityModel
					CityModel.find(function (err, db_city_array) {
						if (err) {
							console.log(err)
						} else {
							//Render User Array in HTML Table
							console.log("db_city_array is : ", db_city_array);
							//response to  Edit Record
							res.render('admin/area/edit-area', { mydata: db_area_array, state_array: db_state_array, city_array: db_city_array });
						}
					}).lean();
					// res.render('area/edit-area', { mydata : db_area_array, state_array : db_state_array });
				}
			}).lean();
		}
	}).lean();
});

//Update Record Using Post Method
router.post('/edit/:id', function (req, res) {

	console.log("Edit/Update ID is" + req.params.id);
	//Create an Array 
	const mybodydata = {
		area_name: req.body.area_name,
		_city: req.body._city,
		_state: req.body._state

	}
	//find data from area Model & update
	AreaModel.findByIdAndUpdate(req.params.id, mybodydata, function (err) {
		//err
		if (err) {
			console.log("Error in Record Update");
			//redirect to display page
			res.redirect('/area/display');
			//if not an err
		} else {
			console.log("mybodydata is : ", mybodydata);
			//redirect to display apge
			res.redirect('/admin/area/display');
		}
	});
});

module.exports = router;