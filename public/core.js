angular.module('Pokedex', [])
.controller('MainController',function($scope, $http, $sce) {
    $scope.formData = {};
	$scope.pokemons = [];
	$scope.selected_pokemon;
	$scope.types = [];
	var urlPokemons = "/data/pokedex.json";
	var urlTypes = "/data/types.json";

	$scope.fieldName = 'ename';
	$scope.asc = true;
	$scope.filterValue = '';
	$scope.filterFieldName = 'ename';

	$scope.sortBy = function(fieldName) {
		$scope.asc = ($scope.fieldName === fieldName) ? !$scope.asc : false;
		$scope.fieldName = fieldName;
	};
  
  //Filters pokemons by the ename, id or type
  $scope.filterBy = function(pokemon) {
	  if($scope.filterValue != ''){
		  var filterUpperValue = $scope.filterValue.toUpperCase();
		if($scope.filterFieldName == 'ename'){
		  var pokemonEnameUpper = pokemon.ename.toUpperCase();
			return (pokemonEnameUpper.indexOf(filterUpperValue) >= 0)
		}else if($scope.filterFieldName == 'id'){
			return (pokemon.id.indexOf(filterUpperValue) >= 0)
		}else {
			return  (pokemon.type.indexOf(filterUpperValue) >= 0)
		}	
	  }
	  return true;
  };
  
	//Get the english version of the type
	$scope.getTypeName = function (symbol){
		angular.forEach($scope.types, function (type){
			if(encodeURIComponent(symbol) ==  encodeURIComponent(type.cname)){
				return type.ename;
			}
		});
		return "";
	};
	
	//Assign the selected pokemon to the controller variable
	//And loads the types and images of the pokemon
   $scope.selectPokemon = function(pokemon){
	   $scope.selected_pokemon = pokemon;
	   $scope.selected_pokemon.image_spr =  $sce.trustAsResourceUrl('/images/spr/' + pokemon.id +'MS.png');
	   if($scope.selected_pokemon.type){
		   var selectedTypeArray = new Array($scope.selected_pokemon.type.length);
		   
		   var i = 0;
		  for (var i = 0; i < $scope.selected_pokemon.type.length; i++){
			  
			   selectedTypeArray[i] = $scope.getTypeName($scope.selected_pokemon.type[i]);
			   i++;
		   }
		   $scope.selected_pokemon.type_name = selectedTypeArray;
	   }
   };
   
   //Loads all pokemons
   $http.get(urlPokemons).success( function(response) {
	  angular.forEach(response,function (pokemon) {
		  pokemon.image =  $sce.trustAsResourceUrl('/images/thm/' + pokemon.id + pokemon.ename + '.png');
	  });
	  $scope.pokemons = Array.from(response);
   });
   
   
   //Loads all types
   $http.get(urlTypes).success( function(response) {
	    $scope.types = response;
   });
  
 

});
