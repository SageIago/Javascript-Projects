// Storage Controller
const StorageCtrl = (function(){
    // Private Variables

    // Public Methods
    return {
        storeItem: (NEWITEM)=> {
            let items; // Put it later
            // Check if there are any items in Local Storage
            if(localStorage.getItem("items") === null) {
                items = []
                // Push new item
                items.push(NEWITEM)

                // Set new item to local storage
                localStorage.setItem("items", JSON.stringify(items))
            }else {

                // If it inside the Local Storage then we access it. (Get what is already inside)
                items = JSON.parse(localStorage.getItem("items"))

                // Push new item
                items.push(NEWITEM)

                // Reset Local Storage
                localStorage.setItem("items", JSON.stringify(items))
            }
        },
        getItemsFromLocalStorage : ()=> {
            let items;
            if(localStorage.getItem("items") === null) {
                items = []
            } else {
                items = JSON.parse(localStorage.getItem("items"))
            }

            return items
        }, 
        updateIteminLocalStorage : (UpdatedItem)=> {
            let items = JSON.parse(localStorage.getItem("items"))

            // Loop through the objects array
            items.forEach((item, index)=> {
                if(UpdatedItem.id === item.id) {
                    // Spilice it out of the array
                    items.splice(index, 1, UpdatedItem)
                }
            })

            // Reset local storage
            localStorage.setItem("items", JSON.stringify(items))
        }, 
        deleteItemfromLocalStorage : (id)=> {
            let items = JSON.parse(localStorage.getItem("items"))

            // Loop through the objects array
            items.forEach((item, index)=> {
                if(id === item.id) {
                    // Spilice it out of the array
                    items.splice(index, 1)
                }
            })
        },
        clearAllItemfromLocalStorage: ()=> {
            // This clears it all out..
            localStorage.removeItem("items")
        }
    }
})()

// Meal Controller
const itemCtrl = (function(){
    // Private Variables

    // Form an Item Constructor
    const item = function(id, name, calories) {
        this.id = id
        this.name = name
        this.calories = calories
    }

    // Form a Data Structure]
    const DS = {
        items : StorageCtrl.getItemsFromLocalStorage(),
            // Manually set the ids.. This is for the items
            // {id: 0, name: "Rice and Stew", totalCalories: "1300"},
            // {id: 1, name: "Bacon", totalCalories: "600"},
            // {id: 2, name: "Yam with Sauce", totalCalories: "800"},
            // {id: 3, name: "Chicken", totalCalories: "1200"},
            // {id: 4, name: "Pork", totalCalories: "1800"}
        currentItem: null,
        totalCalories : 0
    } // This is a modular pattern i can't access this data from anywhere only if i return it

    return {
        getItems: function(){
            return  DS.items
        },
        addItem: (name, calories)=> {
            let ID
            // Create the IDS
            if(DS.items.length > 0) {
             ID = DS.items[DS.items.length - 1].id + 1

            } else {
                ID = 0
            }

            // Turn Calories to an Integer
            calories = parseInt(calories)

            // Use the item Constructor
            newItem = new item(ID, name, calories)

            // Add the newItem to the array

            DS.items.push(newItem)

            return newItem
        },
        getItemByID: (id)=> {
            let found = null

            // Loop through the item array
            DS.items.forEach((item)=> {
                if(item.id === id) {
                    found = item
                }
            })

            return found
        },
        updateItem: (name, calories)=> {
            // Calories to number
            calories = parseInt(calories)

            let found  = null
            DS.items.forEach((item)=> {
                if(item.id === DS.currentItem.id) {
                    item.name = name
                    item.calories = calories
                    found = item
                }
            })

            return found
        },
        deleteItem: (idpassed)=>{
            // Get IDS
             const ids = DS.items.map(()=> {
                return item.id
            })

            // Get Index
            const index = ids.indexOf(idpassed)

            // Splice / Remove from the array
            DS.items.splice(index, 1)
        },
        clearallItems : ()=> {
            // Clear all items from the array
            DS.items = []
        }, 
        setCurrentItem: (item)=> {
            DS.currentItem = item
        },
        getCurrentItem : ()=> {
            return DS.currentItem
        },
        getTotalCalories : ()=> {
            let total = 0

            // Loop through

            DS.items.forEach((item)=> {
                total += item.calories
            })


            // Set Total Calories...
            DS.totalCalories = total

            // Return total
            return DS.totalCalories
        },
        
        // Create a function called logData
        logData: function() {
            // Return the element data
            return DS // DATA
        } 
    }
})()

// UI Controller
const UICtrl = (function(){
    // Private Variables
    const UISelectors = {
        itemList: "#item-list",
        listItems: "#item-list li",
        addMealBtn: ".add-btn",
        updateMealBtn: ".update-btn",
        deleteMealBtn: ".delete-btn",
        backBtn: ".back-btn",
        clearBtn: ".clear-btn",
        ItemNameInput : "#item-name",
        ItemCaloriesInput : '#item-calories',
        SUMCAL: ".total-calories"
    }

    // Public Methods

    return {
        populateItemList : function(items) {

            let output = ''

            items.forEach((item)=> {
                output += `
                <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em> ${item.totalCalories} Calories</em>
                <a href="#" class="secondary-content">
                <i class=" edit-item fa fa-pencil"></i>
                </a>
             </li>
                `
            })

            // Append it to the UICtrl
            document.querySelector(UISelectors.itemList).innerHTML = output

        },
        getItemInput : ()=> {
            return {
                name : document.querySelector(UISelectors.ItemNameInput).value,
                calories : document.querySelector(UISelectors.ItemCaloriesInput).value
            }
        },
        addListItem: (item)=> {

            // Show list item 
            document.querySelector(UISelectors.itemList).style.display = "block"
            // Create li element
            const li = document.createElement("li")

            // Add the class name
            li.className = "collection-item"

            // Create an ID
            li.id = `item-${item.id}`

            // Add Inner HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em> ${item.calories} Calories</em>
            <a href="#" class="secondary-content">
            <i class=" edit-item fa fa-pencil"></i>
            </a>`

            // Insert item to the UI
            const cardli = document.querySelector(UISelectors.itemList)

            // Add adjacent element
            cardli.insertAdjacentElement("beforeend", li)
        },
        updateListItem: (updatedItem)=> {
            // Turns the list item to a NodeList
            let listItems = document.querySelectorAll(UISelectors.listItems)


            // Turns the NodeList to an Array
            listItems = Array.from(listItems)

            // Loop through the turned Array
            listItems.forEach((listItem)=> {
                // Create an Item ID
                const itemID = listItem.getAttribute("id")


                if(itemID === `item-${updatedItem.id}`) {
                    document.querySelector(itemID).innerHTML = `<strong>${updatedItem.name}: </strong> <em> ${updatedItem.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class=" edit-item fa fa-pencil"></i>
                    </a>`
                }

            })
        }, 
        deleteItemfromUI: (id)=> {
            // This is the Item ID
            const itemID = `#item-${id}`
            // This is the item we append it to the itemID 
            const item = document.querySelector(itemID)
            // Then we remove it from the UI
            item.remove()
        },
        clearInputFields: ()=> {
             document.querySelector(UISelectors.ItemNameInput).value = ""
             document.querySelector(UISelectors.ItemCaloriesInput).value = ""
        },
        editIteminForm : ()=> {
            document.querySelector(UISelectors.ItemNameInput).value = itemCtrl.getCurrentItem().name
            document.querySelector(UISelectors.ItemCaloriesInput).value = itemCtrl.getCurrentItem().calories
            UICtrl.showEditState()

        },
        removeItem: ()=> {
            let listItems = document.querySelectorAll(UISelectors.listItems)

            // Turns Node List to an Array
            listItems = Array.from(listItems)

            // Remove it by clearing the array
            listItems.forEach((item)=> {
                item.remove()
            })
        },
        hideList: ()=> {
            document.querySelector(UISelectors.itemList).style.display = "none"
        },
        showTotalCaloriesinUI: (totalCal)=> {
            document.querySelector(UISelectors.SUMCAL).textContent = totalCal

        },
        clearEditState: ()=> {
            // Clear the input fields
            UICtrl.clearInputFields()

            // Set display to none
            document.querySelector(UISelectors.updateMealBtn).style.display = "none"
            document.querySelector(UISelectors.backBtn).style.display = "none"
            document.querySelector(UISelectors.deleteMealBtn).style.display = "none"
            document.querySelector(UISelectors.addMealBtn).style.display = "inline"

            

        },
        showEditState: ()=> {
            // Clear the input fields
            UICtrl.clearInputFields()

            // Set display to none
            document.querySelector(UISelectors.updateMealBtn).style.display = "inline"
            document.querySelector(UISelectors.backBtn).style.display = "inline"
            document.querySelector(UISelectors.deleteMealBtn).style.display = "inline"
            document.querySelector(UISelectors.addMealBtn).style.display = "none"

            

        },
        // Return the UISelectors as a Public Method
        getSelectors: ()=> {
            return UISelectors
        }
    }
})()

// App Controller
const AppCtrl = (function(itemCtrl, StorageCtrl ,UICtrl ){

    // Create a function that contains all our event listeners
     const loadallEventListeners = ()=> {
        // Get from the UI Controller

        const UISelectors = UICtrl.getSelectors()

        // Add an Item Event
        const Addbtn = document.querySelector(UISelectors.addMealBtn)
         // Add Event Listener to the AddButton
        Addbtn.addEventListener("click", itemAddSubmit)

        // Listen for keypress and disable it(disable keys..)
        document.addEventListener("keypress", (e)=> {
            if(e.keyCode === 13){
                e.preventDefault()
                return false
            }
        })

        // Add a click event to the edit icon
        const editBtn = document.querySelector(UISelectors.itemList)
        editBtn.addEventListener("click", itemEditClick)


        // Update Item Event
        const updateBtn = document.querySelector(UISelectors.updateMealBtn)
        updateBtn.addEventListener("click", itemUpdateSubmit)


        // Back Button event 
        const backBtn = document.querySelector(UISelectors.backBtn)
        backBtn.addEventListener("click", UICtrl.clearEditState)

        // Delete event icon
        const deleteBtn = document.querySelector(UISelectors.deleteMealBtn)
        deleteBtn.addEventListener("click", itemDeleteSubmit)

        // Clear All Btn
        const clearBtn = document.querySelector(UISelectors.clearBtn)
        clearBtn.addEventListener("click", clicktoclearAllItems)
    }



    

    // item Edit Click function
    const itemEditClick = (e)=>{
        // We need to target the event button
        if(e.target.classList.contains("edit-item")){
            // Get Item Id-0, 1, 2...
            const listID = e.target.parentNode.parentNode.id

            // We have to spilt it to an array
            const listIDArr = listID.spilt("-")
            
            // Get the ID in form of an integer
            const getID = parseInt(listIDArr[1])

            // We get the specific item to edit
            const itemToEdit = itemCtrl.getItemByID(getID)

            // Set current item
            itemCtrl.setCurrentItem(itemToEdit)

            // Edit Selected item in form
            UICtrl.editIteminForm()
            
        }

        // Prevent the default form submission
        e.preventDefault()
    }


    // Add Item Submit Function
    const itemAddSubmit = (e)=> {
        

        // Get Form Input from UI Controller
        const input = UICtrl.getItemInput()
        
        // Check if name and input has put successfully

        if(input.name === "" || input.calories === "") {
            alert("Please put in the name and calories...")
        } else {
            
            // Add a new List Item
            const newItem = itemCtrl.addItem(input.name, input.calories)

            // Alert that the item has been added.
            alert("Added Item Successfully....")

            // Add Item to UI
            UICtrl.addListItem(newItem) 

            // Get the total calories..
            const totalCalories = itemCtrl.getTotalCalories()

            // Show Total Calories in UI
            UICtrl.showTotalCaloriesinUI(totalCalories)

            // Store in Locas Storage
            StorageCtrl.storeItem(newItem)

            // Clear the Input
            UICtrl.clearInputFields()
        }

        
       

        // This is to prevent the default behaviour
        e.preventDefault()
    }


    // Item Update Submit
    const itemUpdateSubmit = (e)=> {

        // Get Item Input
        const input = UICtrl.getItemInput()

        // Update item
        const updatedItem = itemCtrl.updateItem(input.name, input.calories)

        // Update the UI
        UICtrl.updateListItem(updatedItem)

          // Get the total calories..
          const totalCalories = itemCtrl.getTotalCalories()

          // Show Total Calories in UI
          UICtrl.showTotalCaloriesinUI(totalCalories)

        
        // Update from Local Storage
        StorageCtrl.updateIteminLocalStorage(updatedItem)
        //   Clear the Edit State
        UICtrl.clearEditState()

        // Prevent the default form from submitting.
        e.preventDefault()
    }

    
    // Item Delete Submit

    const itemDeleteSubmit = (event)=> {
        // Get the ID We need from the current Item

        const CurrentItemID = itemCtrl.getCurrentItem()


        // We want to delete this from the data structure
        itemCtrl.deleteItem(CurrentItemID.id)


        // Delete it from the actual UI
        UICtrl.deleteItemfromUI(CurrentItemID.id)

         // Get the total calories..
         const totalCalories = itemCtrl.getTotalCalories()

        //  Delete from Local Storage
        StorageCtrl.deleteItemfromLocalStorage(CurrentItemID.id)

         // Show Total Calories in UI
         UICtrl.showTotalCaloriesinUI(totalCalories)


       // Clear the Edit State
       UICtrl.clearEditState()


        // Prevent default submission
        event.preventDefault()
    }


    const clicktoclearAllItems = ()=> {

        // Delete all items from data structure
        itemCtrl.clearallItems()
        

         // Get the total calories..
         const totalCalories = itemCtrl.getTotalCalories()

         // Show Total Calories in UI
         UICtrl.showTotalCaloriesinUI(totalCalories)


        //  Click to clear from Local Storage
        StorageCtrl.clearAllItemfromLocalStorage()
        //Remove from the UI
        UICtrl.removeItem()

        // Hide UI
        UICtrl.hideList()

        
        
    }

    // Public Methods
    return {
       init : function(){

        // Set Initial State
        UICtrl.clearEditState()

        console.log("Starting App...")

        // Fetch items from Data Structure
        const items = itemCtrl.getItems()



        // Check if there are items in the UI
        if(items.length === 0){
            UICtrl.hideList()
        }
        else{
            // Set a function to the UIController 
            UICtrl.populateItemList(items)
        }
            
         // Get the total calories..
         const totalCalories = itemCtrl.getTotalCalories()

         // Show Total Calories in UI
         UICtrl.showTotalCaloriesinUI(totalCalories)
        

        // The event listener is called in our Init..
        loadallEventListeners()
        
        }
    }
    
})(itemCtrl, StorageCtrl,UICtrl)

AppCtrl.init()