//Storage Controller

//Item Controller
const ItemCtrl = (function () { //Set variable to iffy(immediate invoked function)
    //Item Constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data structure / State
    const data = {
        items: [
            { id: 0, name: 'Steak Dinner', calories: 1200 },
            { id: 1, name: 'Eggs', calories: 600 },
            { id: 2, name: 'Fish', calories: 800 }
        ],
        currentItem: null, //Variable que se utilizara cuando un item quiere ser updated (editado)
        totalCalories: 0
    }
    //return para poder ver la data desde el browser (Public methods)
    return {
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;
            //Create ID for the new item added
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            //Parse calories to number
            calories = parseInt(calories);

            //Create new item
            newItem = new Item(ID, name, calories);

            //Push item to the object data.items
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id) {
            let found = null;
            //Recorrer los items
            data.items.forEach(item => {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        getCurrentItem: function() {
            return data.currentItem;
        },
        setCurrenItem: function(item) {
            data.currentItem = item;
        },
        getTotalCalories: function () {
            let total = 0;
            data.items.forEach(item => {
                total += item.calories;
            });
            //Set total calories in the data
            data.totalCalories = total;

            return data.totalCalories;
        },
        logData: function () {
            return data;
        }
    }
})();


//UI Controller
const UICtrl = (function () { //Set variable to iffy(immediate invoked function)
    //Object with the id of the list items
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCaloriesInput: '.total-calories'
    }
    //Public methods
    return {
        showItemList: function (items) {
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
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        //Get content of inputs of item(meal)
        getItemInput: function() {
           return{
             name: document.querySelector(UISelectors.itemNameInput).value,
             calories: document.querySelector(UISelectors.itemCaloriesInput).value
           } 
        },
        //Clear Fields of the input
        clearInputs: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        //Hide itemList when there is no items(meals)
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        //Show Total Calories in the UI
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCaloriesInput).innerHTML = totalCalories;
        },
        //Clear Edit State (Add state)
        clearEditState: function() {
            UICtrl.clearInputs();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        //Show Edit State
        showEditState: function() {
            UICtrl.clearInputs();
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        //Add item in the inputs to edit
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        //Add list item to the UI
        addListItem: function (item) {
            //Show list element (ul)
            document.querySelector(UISelectors.itemList).style.display = 'block';
            //Create li element
            const li = document.createElement('li');
            //Add class
            li.className = 'collection-item';
            //Add id
            li.id = `item-${item.id}`;
            //Add HTML
            li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>`;
            //Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        //Make public the UISelectors to other controllers
        getSelectors: function () {
            return UISelectors;
        }
    }

})();


//App Controller
const App = (function (ItemCtrl, UICtrl) { //Set variable to iffy(immediate invoked function)
    //Load event listeners
    const loadEventListeners = function () {
        //Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        //Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //Edit icon event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);

    }

    //Add item submit
    const itemAddSubmit = function(e) {
        //Get form input from UI Controller
        const input = UICtrl.getItemInput();
        
        //Check for name and calorie input
        if (input.name !== '' && input.calories !== '' ) {
            //Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            //Add item to UI list
            UICtrl.addListItem(newItem);

            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            //Clear fields input
            UICtrl.clearInputs();
        } else {
            
        }

        e.preventDefault();
    }

    //Update item submit
    const itemUpdateSubmit = function(e) {
        if (e.target.classList.contains('edit-item')) {
            //Get list item id (item-0, item-1...)
            const listId = e.target.parentNode.parentNode.id;
            
            // Break into an array
            const listIdArr = listId.split('-');

            //Get the actual id (like a number)
            const id = parseInt(listIdArr[1]);

            //Get item
            const itemToEdit = ItemCtrl.getItemById(id);

            //Set current item
            ItemCtrl.setCurrenItem(itemToEdit);

            // Add item to edit in the form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    //Public methods
    return {
        init: function () {
            console.log('Initializing app');
            //Clear edit state
            UICtrl.clearEditState();

            //Fetch items from data structure
            const items = ItemCtrl.getItems();

            //Check if any items
            if (items.length === 0) {
                //No items in the list
                UICtrl.hideList();
            } else {
                //Populate list with items
                UICtrl.showItemList(items);
            }

            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            //Load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl);

//Initialize app
App.init();