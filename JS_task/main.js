// Имеется массив объектов [{
//     name: 'Саша',
//     age: 15
//    },{
//     name: 'Артем',
//     age: 27
//    },{
//     name: 'Андрей',
//     age: 18
//    }, {
//     name: 'Ира',
//     age: 15
//    },{
//     name: 'Алексей',
//     age: 27
//    },{
//     name: 'Андрей',
//     age: 18
//    }]

//    Вывести массив в таблицу.

//    Имя | Возраст | Количество людей с этим именем

//    Под таблицей выводить средний возраст всех людей.

//    Так же, сделать возможным добавлять (и удалять) людей и автоматически перестраивать таблицу под новые данные

var array = [{
        name: "Саша",
        age: 15
    },
    {
        name: "Артем",
        age: 27
    },
    {
        name: "Андрей",
        age: 18
    },
    {
        name: "Ира",
        age: 15
    },
    {
        name: "Алексей",
        age: 27
    },
    {
        name: "Андрей",
        age: 18
    }
];

var table = document.getElementById("myTable");

for (let i = 0; i < array.length; i++) {
    insertCell(array[i].name, array[i].age);
}
updAverage();

function updAverage() {
    var avg = document.getElementById("average");
    avg.innerHTML = array.reduce((a, b) => a + b.age, 0) / array.length;
    document.getElementById("container").appendChild(avg);
}

function deleteLastRow() {
    document.getElementById("myTable").deleteRow(-1);
    array.pop();
    updAverage();
    updAmounts();
}

function addNewRow() {
    var newName = document.getElementById("newName").value;
    var newAge = document.getElementById("newAge").value;
    console.log(newName, newAge);
    if (name !== null && age !== null) {
        array.push({ name: newName, age: newAge });
        insertCell();
        updAmounts();
    }
}

function insertCell(newName, newAge) {
    var row = table.insertRow(-1);
    var name = row.insertCell(0);
    var age = row.insertCell(1);
    var amount = row.insertCell(2);
    name.innerHTML = newName;
    age.innerHTML = newAge;
    amount.innerHTML = array.filter(f => f.name === newName).length.toString();
}
updAmounts();

function updAmounts() {
    console.log(table.rows.length);

    for (let i = 1; i < table.rows.length; i++) {
        table.rows.item(i).cells.item(2).innerHTML = array
            .filter(f => f.name === table.rows.item(i).cells.item(0).innerHTML)
            .length.toString();
    }
}