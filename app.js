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
        getItems: function () {
            return data.items;
        },
        logData: function(){
            return data;
        }
    }
})();


//UI Controller
const UICtrl = (function () { //Set variable to iffy(immediate invoked function)
    //Object with the id of the list items
    const UISelectors = {
        itemList: '#item-list'
    }
    //Public methods
    return {
        showItemList: function(items){
            let html = '';

            items.forEach(item => {
                html += `<li id="item-${item.id}" class="collection-item">
                            <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>
                         </li>`
            });
            //Insert list items in the ul
            document.querySelector(UISelectors.itemList).innerHTML= html;
        }
    }
    
})();


//App Controller
const App = (function (ItemCtrl, UICtrl) { //Set variable to iffy(immediate invoked function)
    //Public methods
    return {
        init: function(){
            console.log('Initializing app');
            //Fetch items from data structure
            const items = ItemCtrl.getItems();

            //Populate list with items
            UICtrl.showItemList(items);
        }
    }
})(ItemCtrl, UICtrl);

//Initialize app
App.init();