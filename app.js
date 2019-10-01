//Storage Controller

//Item Controller
const ItemCtrl = (function () { //Set variable to iffy(immediate invoked function)
   //Item Constructor
   const Item = function(id, name, calories){
       this.id = id;
       this.name = name;
       this.calories = calories;
   } 

   //Data structure / State
   const data = {
       items: [
           {id: 0, name: 'Steak Dinner', calories: 1200},
           {id: 1, name: 'Eggs', calories: 600},
           {id: 2, name: 'Fish', calories: 800}
        ], 
       currentItem: null, //Variable que se utilizara cuando un item quiere ser updated
       totalCalories: 0
    }
    //return para poder ver la data desde el browser (Public methods)
    return{
        logData: function(){
            return data;
        }
    }
})();


//UI Controller
const UICtrl = (function () { //Set variable to iffy(immediate invoked function)

    //Public methods
    return {

    }
    
})();


//App Controller
const App = (function (ItemCtrl, UICtrl) { //Set variable to iffy(immediate invoked function)
    //Public methods
    return {
        init: function(){
            console.log('Initializing app');
        }
    }
})(ItemCtrl, UICtrl);

//Initialize app
App.init();