var taskForm = document.querySelector("#addForm");

var taskInput = document.querySelector("#newItemText");

var itemsList = document.querySelector("#items");

var filter = document.querySelector("#filter");

taskForm.addEventListener("submit", addItem);
itemsList.addEventListener("click", removeItem);
filter.addEventListener("keyup", filterItems);

// Массив с элементами списка
var itemsArray = [];

// Получение элементов из localStorage
if (localStorage.getItem("itemsArray")) {
	var receivedItemsArray = JSON.parse(localStorage.getItem("itemsArray"));
	receivedItemsArray.forEach(function (item) {
		itemsArray.push(item);
	});
	itemsArray.forEach(function (item) {
		insertHtml(item);
	});
}

// Функция для добавления пункта в список itemsList
function insertHtml(value) {
	itemsList.insertAdjacentHTML(
		"afterbegin",
		`<li class="list-group-item"> ${value}
    <button data-action="delete" type="button" 
    class="btn btn-light btn-sm float-right">
    Удалить</button> </li>`
	);
}

// Добавление элемента
function addItem(e) {
	e.preventDefault();
	if (taskInput.value != "") {
		itemsArray.push(taskInput.value);
		insertHtml(taskInput.value);
		localStorage.setItem("itemsArray", JSON.stringify(itemsArray));
		taskInput.value = "";
	}
}

// Удаление элемента
function removeItem(e) {
	if (e.target.dataset.action == "delete") {
		if (confirm("Вы уверены?") == true) {
			var itemText = e.target.closest("li").firstChild.textContent;
			var trimmedItemText = itemText.replace(/ +/g, " ").trim();
			var itemIndex = itemsArray.indexOf(trimmedItemText);
			itemsArray.splice(itemIndex, 1);
			e.target.parentNode.remove();
			localStorage.setItem("itemsArray", JSON.stringify(itemsArray));
		}
	}
}

// Поиск элементов
function filterItems(e) {
	var searchedText = e.target.value.toLowerCase();
	var items = itemsList.querySelectorAll("li");
	items.forEach(function (item) {
		var itemText = item.firstChild.textContent.toLowerCase();

		if (itemText.indexOf(searchedText) != -1) {
			item.style.display = "block";
		} else {
			item.style.display = "none";
		}
	});
}