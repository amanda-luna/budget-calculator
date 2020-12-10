class Transaction {
  constructor(amount, description, date, id){
    this.amount = amount;
    this.description = description;
    this.date = date;
    this.transactionId = id;
  }
}

class TransactionList {
  constructor() {
    this.transaction = document.querySelector(".add__description");
    this.incomeBudgetList = document.querySelector(".income__list");
    this.expenseBudgetList = document.querySelector(".expenses__list");
    this.transactionAmount = document.querySelector(".add__value");
    this.totalBudgetValue = document.querySelector(".budget__value");
    this.totalIncome = document.querySelector(".budget__income--value");
    this.totalExpenses = document.querySelector(".budget__expenses--value");
    this.totalExpensesPct = document.querySelector(".budget__expenses--percentage");
    this.alertExpensesDiv = document.querySelector(".alert__expenses");
    this.budgetDate = document.querySelector(".budget__title--month");
    this.itemValue = document.querySelector(".item__value");
    this.itemList = document.querySelectorAll(".item");
    this.incomeList = [];
    this.expenseList = [];
    this.id = 1;
  }

  findIncomeById(incomeList, incomeId) {
    return incomeList.find((currentIncome) => {
      return currentIncome.transactionId === parseInt(incomeId);
    });
  }

  findExpensesById(expenseList, expenseId) {
    return expenseList.find((currentExpense) => {
      return currentExpense.transactionId === parseInt(expenseId);
    });
  }

  removeTransactionFromList(transactionList, transaction) {
    const index = transactionList.indexOf(transaction);
    transactionList.splice(index, 1);
  }

  getCurrentDate() {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'short' });
    const year = currentDate.getFullYear();
    const day = currentDate.getDate();
    const finalDate = `${month} ${day}, ${year}`;
    
    return finalDate;
  }

  getSumOfIncome(){
    let incomeSum = 0;

    this.incomeList.forEach( income => {
      incomeSum = incomeSum + parseFloat(income.amount);
    })

    return incomeSum;
  }

  getSumOfExpenses(){
    let expenseSum = 0;

    this.expenseList.forEach( income => {
      expenseSum = expenseSum + parseFloat(income.amount);
    })

    return expenseSum;
  }


  updateBudgetDate() {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const finalBudgetDate = `${month} ${year}`;

    this.budgetDate.innerText = finalBudgetDate;
  }

  updatePercentageOfExpenses() {
    let totalBudget =  this.getSumOfIncome();

    this.expenseList.forEach(expense => {
      const expenseHtmlDocument = document.querySelector(`[data-transaction-id="${expense.transactionId}"]`);
      const expensePctHtml = expenseHtmlDocument.children[1].children[1];
      const expensePct = Math.abs(Math.round((parseFloat(expense.amount) / parseFloat(totalBudget)) * 100, 2));

      expensePctHtml.innerText = `${expensePct} %`;
    });
  }

  resetInputValue() {
    this.transaction.value = ""
    this.transactionAmount.value = 0
  }

  alertExpenseTrigger() {
    let expensesPct = this.totalExpensesPct.innerText.replace("%", "");
    if(parseInt(expensesPct) > 80 || expensesPct.trim() === "INFINITY") {
      this.alertExpensesDiv.style.display = "block";
    } else {
      this.alertExpensesDiv.style.display = "none";
    }
  }

  totalBudgetCalculator() {
    let incomeSum = this.getSumOfIncome();
    let expenseSum = this.getSumOfExpenses();
    let totalBudget = 0;
    let totalExpensePct = 0;

    totalBudget = incomeSum + expenseSum;
    totalExpensePct  = Math.abs(Math.round((expenseSum / incomeSum) * 100, 2));

    if(totalBudget > 0) {
      totalBudget = `+ $${totalBudget.toFixed(2)}`;
    }
    else {
      totalBudget = `- $${Math.abs(totalBudget.toFixed(2))}`;
    }
    
    this.totalIncome.innerText = `+ $${incomeSum.toFixed(2)}`;
    this.totalExpenses.innerText = `- $${Math.abs(expenseSum).toFixed(2)}`;
    this.totalBudgetValue.innerText = totalBudget;
    this.totalExpensesPct.innerText = `${totalExpensePct} %`;
    this.alertExpenseTrigger();
  }

  addNewTransaction() {
    const descriptionOfTransaction = this.transaction.value;
    const valueOfExpense = this.transactionAmount.value;
    const percentageOfExpense = Math.abs(Math.round((parseFloat(valueOfExpense) / parseFloat(this.getSumOfIncome())) * 100, 2));

    if (!descriptionOfTransaction.trim().length || parseFloat(valueOfExpense) === 0 || !parseFloat(valueOfExpense)) {
      alert("Your input is empty, please enter a transaction name and/or value.");
      return;
    }

    const transaction = new Transaction(valueOfExpense, descriptionOfTransaction, this.getCurrentDate(), this.id);

    if (this.transactionAmount.value < 0) {
      const newExpense = 
        `<div class="item" data-transaction-id= "${transaction.transactionId}">
        <div class="item__description">${transaction.description} </div>
        <div class="right">
          <div class="item__value">- $${(Math.abs(transaction.amount)).toFixed(2)}</div>
          <div class="item__percentage">${percentageOfExpense}%</div>
          <div class="item__delete">
            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
          </div>
          <div class="item__delete">
            <button class="item__delete--btn">
              <i class="ion-ios-compose-outline"></i>
            </button>
          </div>
        </div>
        <div class="item__date">${transaction.date}</div>`;
      
      this.expenseBudgetList.insertAdjacentHTML("afterbegin", newExpense);
      this.expenseList.push(transaction);
    } 
    else {
      const newIncome = 
        `<div class="item" data-transaction-id="${transaction.transactionId}">
        <div class="item__description">${transaction.description}</div>            
        <div class="right">
          <div class="item__value">+ $${Math.abs(transaction.amount).toFixed(2)}</div>
          <div class="item__delete">
            <button class="item__delete--btn">
              <i class="ion-ios-close-outline"></i>
            </button>
          </div>
          <div class="item__delete">
            <button class="item__delete--btn">
              <i class="ion-ios-compose-outline"></i>
            </button>
          </div>
        </div>
        <div class="item__date">${transaction.date}</div>`;

        this.incomeBudgetList.insertAdjacentHTML("afterbegin", newIncome);
        this.incomeList.push(transaction);
        this.updatePercentageOfExpenses();
    }

    this.id++;
    transactionList.resetInputValue();
    transactionList.totalBudgetCalculator();
  }

  removeTransaction(transactionId) {
    if (this.findExpensesById(this.expenseList, transactionId)) {
      const expenseToDelete = this.findExpensesById(this.expenseList, transactionId);      
      this.removeTransactionFromList(this.expenseList, expenseToDelete);
    }
    else {
      const incomeToDelete = this.findIncomeById(this.incomeList, transactionId);
      this.removeTransactionFromList(this.incomeList, incomeToDelete);
      this.updatePercentageOfExpenses();
    }

    transactionList.totalBudgetCalculator();
  }

  editTransaction(transactionId, transactionDescription) {
    let newDescription = prompt("Add Description");

    if (!newDescription.trim().length) {
      alert("Your input is empty, please enter a transaction name!");
      return;
    }

    transactionDescription.innerText = newDescription;

    if (this.findExpensesById(this.expenseList, transactionId)) {
      const expenseToEdit = this.findExpensesById(this.expenseList, transactionId);
      expenseToEdit.description = newDescription;
    }
    else {
      const incomeToEdit = this.findIncomeById(this.incomeList, transactionId);
      incomeToEdit.description = newDescription;
    }
  }
}

const transactionList = new TransactionList();

//Event Listeners
document.querySelector('.add__btn').addEventListener("click", function(event){
  transactionList.addNewTransaction();
});

document.addEventListener("click", function(event){
  if(event.target.className === "ion-ios-close-outline") {
    const transactionId = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-transaction-id");
    transactionList.removeTransaction(transactionId);

    document.querySelector(`[data-transaction-id="${transactionId}"]`).remove();
  }

  if(event.target.className === "ion-ios-compose-outline") {
    const transactionId = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-transaction-id");
    const transactionDescription = document.querySelector(`[data-transaction-id="${transactionId}"]`).querySelector(".item__description")
    transactionList.editTransaction(transactionId, transactionDescription);
  }
});

window.onload = function() {
  transactionList.updateBudgetDate();
  transactionList.resetInputValue();
}