var cars={
    'Toyota':['Yaris','Vios','Wish','Innova','Sienta','Sienna','RAV4','Prius c','Prius PHV','Prius Alpha','Prius','Previa','Land Cruiser','Altis','Camry','C-HR','Alphard','86'],
    'Ford':['Focus','Focus Active','Focus Wagon','Kuga','Mustang','Ranger','Tourneo Custom','Mondeo','Mondeo Wagon','Escort','Fiesta','EcoSport'],
    'Nissan':['370Z','Altima','GT-R','Juke','Kicks','Leaf','Sentra','Tiida','X-Trail','Teana','Livina','March','Murano','Rogue'],
    'Mercedes-Benz':['A-Class','A-Class Sedan','AMG GT','AMG GT 4-Door Coupe','B-Class','C-Class Cabriolet','C-Class Coupe','C-Class Estate','C-Class Sedan','CLA','CLA Shooting Brake','CLS','E-Class Coupe','E-Class Estate','E-Class Sedan','EQC','G-Class','GLA','GLB','GLC','GLC Coupe','GLE','GLE Coupe','GLS','S-Class','V-Class','Vito Tourer'],
    'BMW':['1-Series','2-Series Active Tourer','2-Series Gran Coupe','2-Series Gran Tourer','3-Series Sedan','3-Series Touring','4-Series','4-Series Convertible','5-Series Sedan','5-Series Touring','6-Series Gran Turismo','7-Series','8-Series','8-Series Gran Coupe','X1','X2','X3','X4','X5','X6','X7','Z4']
}

var carBrand = document.getElementById('car_brand_id');
var carModel = document.getElementById('car_model_id');
console.log(10)

carBrand.addEventListener('change', function(){

var selected_option = cars[this.value];
console.log(this.value)

while(carModel.options.length >0 ){
    carModel.options.remove(0);
}

Array.from(selected_option).forEach(function(el){
    let option = new Option(el,el);
    carModel.appendChild(option);
    console.log(carModel.appendChild(option))
})

})



