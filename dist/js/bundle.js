"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transaction = function Transaction(amount, description, date, id) {
  _classCallCheck(this, Transaction);

  this.amount = amount;
  this.description = description;
  this.date = date;
  this.transactionId = id;
};

var TransactionList = /*#__PURE__*/function () {
  function TransactionList() {
    _classCallCheck(this, TransactionList);

    this.transaction = document.querySelector(".add__description");
    this.incomeBudgetList = document.querySelector(".income__list");
    this.expenseBudgetList = document.querySelector(".expenses__list");
    this.transactionAmount = document.querySelector(".add__value");
    this.totalBudgetValue = document.querySelector(".budget__value");
    this.totalIncome = document.querySelector(".budget__income--value");
    this.totalExpenses = document.querySelector(".budget__expenses--value");
    this.totalExpensesPct = document.querySelector(".budget__expenses--percentage");
    this.budgetDate = document.querySelector(".budget__title--month");
    this.itemValue = document.querySelector(".item__value");
    this.itemList = document.querySelectorAll(".item");
    this.incomeList = [];
    this.expenseList = [];
    this.id = 1;
  }

  _createClass(TransactionList, [{
    key: "findIncomeById",
    value: function findIncomeById(incomeList, incomeId) {
      return incomeList.find(function (currentIncome) {
        return currentIncome.transactionId === parseInt(incomeId);
      });
    }
  }, {
    key: "findExpensesById",
    value: function findExpensesById(expenseList, expenseId) {
      return expenseList.find(function (currentExpense) {
        return currentExpense.transactionId === parseInt(expenseId);
      });
    }
  }, {
    key: "removeTransactionFromList",
    value: function removeTransactionFromList(transactionList, transaction) {
      var index = transactionList.indexOf(transaction);
      transactionList.splice(index, 1);
    }
  }, {
    key: "getCurrentDate",
    value: function getCurrentDate() {
      var currentDate = new Date();
      var month = currentDate.toLocaleString('default', {
        month: 'short'
      });
      var year = currentDate.getFullYear();
      var day = currentDate.getDate();
      var finalDate = "".concat(month, " ").concat(day, ", ").concat(year);
      return finalDate;
    }
  }, {
    key: "getSumOfIncome",
    value: function getSumOfIncome() {
      var incomeSum = 0;
      this.incomeList.forEach(function (income) {
        incomeSum = incomeSum + parseFloat(income.amount);
      });
      return incomeSum;
    }
  }, {
    key: "getSumOfExpenses",
    value: function getSumOfExpenses() {
      var expenseSum = 0;
      this.expenseList.forEach(function (income) {
        expenseSum = expenseSum + parseFloat(income.amount);
      });
      return expenseSum;
    }
  }, {
    key: "updateBudgetDate",
    value: function updateBudgetDate() {
      var currentDate = new Date();
      var month = currentDate.toLocaleString('default', {
        month: 'long'
      });
      var year = currentDate.getFullYear();
      var finalBudgetDate = "".concat(month, " ").concat(year);
      this.budgetDate.innerText = finalBudgetDate;
    }
  }, {
    key: "updatePercentageOfExpenses",
    value: function updatePercentageOfExpenses() {
      var totalBudget = this.getSumOfIncome();
      this.expenseList.forEach(function (expense) {
        var expenseHtmlDocument = document.querySelector("[data-transaction-id=\"".concat(expense.transactionId, "\"]"));
        var expensePctHtml = expenseHtmlDocument.children[1].children[1];
        var expensePct = Math.abs(Math.round(parseFloat(expense.amount) / parseFloat(totalBudget) * 100, 2));
        expensePctHtml.innerText = "".concat(expensePct, " %");
      });
    }
  }, {
    key: "resetInputValue",
    value: function resetInputValue() {
      this.transaction.value = "";
      this.transactionAmount.value = 0;
    }
  }, {
    key: "totalBudgetCalculator",
    value: function totalBudgetCalculator() {
      var incomeSum = this.getSumOfIncome();
      var expenseSum = this.getSumOfExpenses();
      var totalBudget = 0;
      var totalExpensePct = 0;
      totalBudget = incomeSum + expenseSum;
      totalExpensePct = Math.abs(Math.round(expenseSum / incomeSum * 100, 2));

      if (totalBudget > 0) {
        totalBudget = "+ $".concat(totalBudget);
      } else {
        totalBudget = "- $".concat(Math.abs(totalBudget));
      }

      this.totalIncome.innerText = "+ $".concat(incomeSum);
      this.totalExpenses.innerText = "- $".concat(Math.abs(expenseSum));
      this.totalBudgetValue.innerText = totalBudget;
      this.totalExpensesPct.innerText = "".concat(totalExpensePct, " %");
    }
  }, {
    key: "addNewTransaction",
    value: function addNewTransaction() {
      var descriptionOfTransaction = this.transaction.value;
      var valueOfExpense = this.transactionAmount.value;
      var percentageOfExpense = Math.abs(Math.round(parseFloat(valueOfExpense) / parseFloat(this.getSumOfIncome()) * 100, 2));

      if (!descriptionOfTransaction.trim().length || parseFloat(valueOfExpense) === 0 || !parseFloat(valueOfExpense)) {
        alert("Your input is empty, please enter a transaction name and/or value.");
        return;
      }

      var transaction = new Transaction(valueOfExpense, descriptionOfTransaction, this.getCurrentDate(), this.id);

      if (this.transactionAmount.value < 0) {
        var newExpense = "<div class=\"item\" data-transaction-id= \"".concat(transaction.transactionId, "\">\n        <div class=\"item__description\">").concat(transaction.description, " </div>\n        <div class=\"right\">\n          <div class=\"item__value\">- $").concat(Math.abs(transaction.amount), "</div>\n          <div class=\"item__percentage\">").concat(percentageOfExpense, "%</div>\n          <div class=\"item__delete\">\n            <button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button>\n          </div>\n        </div>\n        <div class=\"item__date\">").concat(transaction.date, "</div>");
        this.expenseBudgetList.insertAdjacentHTML("afterbegin", newExpense);
        this.expenseList.push(transaction);
      } else {
        var newIncome = "<div class=\"item\" data-transaction-id=\"".concat(transaction.transactionId, "\">\n        <div class=\"item__description\">").concat(transaction.description, "</div>            \n        <div class=\"right\">\n          <div class=\"item__value\">+ $").concat(transaction.amount, "</div>\n          <div class=\"item__delete\">\n            <button class=\"item__delete--btn\">\n              <i class=\"ion-ios-close-outline\"></i>\n            </button>\n          </div>\n        </div>\n        <div class=\"item__date\">").concat(transaction.date, "</div>");
        this.incomeBudgetList.insertAdjacentHTML("afterbegin", newIncome);
        this.incomeList.push(transaction);
        this.updatePercentageOfExpenses();
      }

      this.id++;
      transactionList.resetInputValue();
      transactionList.totalBudgetCalculator();
    }
  }, {
    key: "removeTransaction",
    value: function removeTransaction(transactionId) {
      if (this.findExpensesById(this.expenseList, transactionId)) {
        var expenseToDelete = this.findExpensesById(this.expenseList, transactionId);
        this.removeTransactionFromList(this.expenseList, expenseToDelete);
      } else {
        var incomeToDelete = this.findIncomeById(this.incomeList, transactionId);
        this.removeTransactionFromList(this.incomeList, incomeToDelete);
        this.updatePercentageOfExpenses();
      }

      transactionList.totalBudgetCalculator();
    }
  }]);

  return TransactionList;
}();

var transactionList = new TransactionList(); //Event Listeners

document.querySelector('.add__btn').addEventListener("click", function (event) {
  transactionList.addNewTransaction();
});
document.addEventListener("click", function (event) {
  if (event.target.className === "ion-ios-close-outline") {
    var transactionId = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-transaction-id");
    transactionList.removeTransaction(transactionId);
    document.querySelector("[data-transaction-id=\"".concat(transactionId, "\"]")).remove();
  }
});

window.onload = function () {
  transactionList.updateBudgetDate();
  transactionList.resetInputValue();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGN1bGF0b3IuanMiXSwibmFtZXMiOlsiVHJhbnNhY3Rpb24iLCJhbW91bnQiLCJkZXNjcmlwdGlvbiIsImRhdGUiLCJpZCIsInRyYW5zYWN0aW9uSWQiLCJUcmFuc2FjdGlvbkxpc3QiLCJ0cmFuc2FjdGlvbiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImluY29tZUJ1ZGdldExpc3QiLCJleHBlbnNlQnVkZ2V0TGlzdCIsInRyYW5zYWN0aW9uQW1vdW50IiwidG90YWxCdWRnZXRWYWx1ZSIsInRvdGFsSW5jb21lIiwidG90YWxFeHBlbnNlcyIsInRvdGFsRXhwZW5zZXNQY3QiLCJidWRnZXREYXRlIiwiaXRlbVZhbHVlIiwiaXRlbUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5jb21lTGlzdCIsImV4cGVuc2VMaXN0IiwiaW5jb21lSWQiLCJmaW5kIiwiY3VycmVudEluY29tZSIsInBhcnNlSW50IiwiZXhwZW5zZUlkIiwiY3VycmVudEV4cGVuc2UiLCJ0cmFuc2FjdGlvbkxpc3QiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJjdXJyZW50RGF0ZSIsIkRhdGUiLCJtb250aCIsInRvTG9jYWxlU3RyaW5nIiwieWVhciIsImdldEZ1bGxZZWFyIiwiZGF5IiwiZ2V0RGF0ZSIsImZpbmFsRGF0ZSIsImluY29tZVN1bSIsImZvckVhY2giLCJpbmNvbWUiLCJwYXJzZUZsb2F0IiwiZXhwZW5zZVN1bSIsImZpbmFsQnVkZ2V0RGF0ZSIsImlubmVyVGV4dCIsInRvdGFsQnVkZ2V0IiwiZ2V0U3VtT2ZJbmNvbWUiLCJleHBlbnNlIiwiZXhwZW5zZUh0bWxEb2N1bWVudCIsImV4cGVuc2VQY3RIdG1sIiwiY2hpbGRyZW4iLCJleHBlbnNlUGN0IiwiTWF0aCIsImFicyIsInJvdW5kIiwidmFsdWUiLCJnZXRTdW1PZkV4cGVuc2VzIiwidG90YWxFeHBlbnNlUGN0IiwiZGVzY3JpcHRpb25PZlRyYW5zYWN0aW9uIiwidmFsdWVPZkV4cGVuc2UiLCJwZXJjZW50YWdlT2ZFeHBlbnNlIiwidHJpbSIsImxlbmd0aCIsImFsZXJ0IiwiZ2V0Q3VycmVudERhdGUiLCJuZXdFeHBlbnNlIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwicHVzaCIsIm5ld0luY29tZSIsInVwZGF0ZVBlcmNlbnRhZ2VPZkV4cGVuc2VzIiwicmVzZXRJbnB1dFZhbHVlIiwidG90YWxCdWRnZXRDYWxjdWxhdG9yIiwiZmluZEV4cGVuc2VzQnlJZCIsImV4cGVuc2VUb0RlbGV0ZSIsInJlbW92ZVRyYW5zYWN0aW9uRnJvbUxpc3QiLCJpbmNvbWVUb0RlbGV0ZSIsImZpbmRJbmNvbWVCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiYWRkTmV3VHJhbnNhY3Rpb24iLCJ0YXJnZXQiLCJjbGFzc05hbWUiLCJwYXJlbnRFbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwicmVtb3ZlVHJhbnNhY3Rpb24iLCJyZW1vdmUiLCJ3aW5kb3ciLCJvbmxvYWQiLCJ1cGRhdGVCdWRnZXREYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztJQUFBQSxXLEdBQ0EscUJBQUFDLE1BQUEsRUFBQUMsV0FBQSxFQUFBQyxJQUFBLEVBQUFDLEVBQUEsRUFBQTtBQUFBOztBQUNBLE9BQUFILE1BQUEsR0FBQUEsTUFBQTtBQUNBLE9BQUFDLFdBQUEsR0FBQUEsV0FBQTtBQUNBLE9BQUFDLElBQUEsR0FBQUEsSUFBQTtBQUNBLE9BQUFFLGFBQUEsR0FBQUQsRUFBQTtBQUNBLEM7O0lBR0FFLGU7QUFDQSw2QkFBQTtBQUFBOztBQUNBLFNBQUFDLFdBQUEsR0FBQUMsUUFBQSxDQUFBQyxhQUFBLENBQUEsbUJBQUEsQ0FBQTtBQUNBLFNBQUFDLGdCQUFBLEdBQUFGLFFBQUEsQ0FBQUMsYUFBQSxDQUFBLGVBQUEsQ0FBQTtBQUNBLFNBQUFFLGlCQUFBLEdBQUFILFFBQUEsQ0FBQUMsYUFBQSxDQUFBLGlCQUFBLENBQUE7QUFDQSxTQUFBRyxpQkFBQSxHQUFBSixRQUFBLENBQUFDLGFBQUEsQ0FBQSxhQUFBLENBQUE7QUFD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QTVDLE1BQUFBLGVBQUEsQ0FBQThDLHFCQUFBO0FBQ0E7Ozs7OztBQUdBLElBQUE5QyxlQUFBLEdBQUEsSUFBQXZCLGVBQUEsRUFBQSxDLENBRUE7O0FBQ0FFLFFBQUEsQ0FBQUMsYUFBQSxDQUFBLFdBQUEsRUFBQXdFLGdCQUFBLENBQUEsT0FBQSxFQUFBLFVBQUFDLEtBQUEsRUFBQTtBQUNBckQsRUFBQUEsZUFBQSxDQUFBc0QsaUJBQUE7QUFDQSxDQUZBO0FBSUEzRSxRQUFBLENBQUF5RSxnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBQyxLQUFBLEVBQUE7QUFDQSxNQUFBQSxLQUFBLENBQUFFLE1BQUEsQ0FBQUMsU0FBQSxLQUFBLHVCQUFBLEVBQUE7QUFDQSxRQUFBaEYsYUFBQSxHQUFBNkUsS0FBQSxDQUFBRSxNQUFBLENBQUFFLGFBQUEsQ0FBQUEsYUFBQSxDQUFBQSxhQUFBLENBQUFBLGFBQUEsQ0FBQUMsWUFBQSxDQUFBLHFCQUFBLENBQUE7QUFDQTFELElBQUFBLGVBQUEsQ0FBQTJELGlCQUFBLENBQUFuRixhQUFBO0FBRUFHLElBQUFBLFFBQUEsQ0FBQUMsYUFBQSxrQ0FBQUosYUFBQSxVQUFBb0YsTUFBQTtBQUNBO0FBQ0EsQ0FQQTs7QUFTQUMsTUFBQSxDQUFBQyxNQUFBLEdBQUEsWUFBQTtBQUNBOUQsRUFBQUEsZUFBQSxDQUFBK0QsZ0JBQUE7QUFDQS9ELEVBQUFBLGVBQUEsQ0FBQTZDLGVBQUE7QUFDQSxDQUhBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRyYW5zYWN0aW9uIHtcbiAgY29uc3RydWN0b3IoYW1vdW50LCBkZXNjcmlwdGlvbiwgZGF0ZSwgaWQpe1xuICAgIHRoaXMuYW1vdW50ID0gYW1vdW50O1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmRhdGUgPSBkYXRlO1xuICAgIHRoaXMudHJhbnNhY3Rpb25JZCA9IGlkO1xuICB9XG59XG5cbmNsYXNzIFRyYW5zYWN0aW9uTGlzdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudHJhbnNhY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZF9fZGVzY3JpcHRpb25cIik7XG4gICAgdGhpcy5pbmNvbWVCdWRnZXRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmNvbWVfX2xpc3RcIik7XG4gICAgdGhpcy5leHBlbnNlQnVkZ2V0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXhwZW5zZXNfX2xpc3RcIik7XG4gICAgdGhpcy50cmFuc2FjdGlvbkFtb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkX192YWx1ZVwiKTtcbiAgICB0aGlzLnRvdGFsQnVkZ2V0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1ZGdldF9fdmFsdWVcIik7XG4gICAgdGhpcy50b3RhbEluY29tZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnVkZ2V0X19pbmNvbWUtLXZhbHVlXCIpO1xuICAgIHRoaXMudG90YWxFeHBlbnNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnVkZ2V0X19leHBlbnNlcy0tdmFsdWVcIik7XG4gICAgdGhpcy50b3RhbEV4cGVuc2VzUGN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idWRnZXRfX2V4cGVuc2VzLS1wZXJjZW50YWdlXCIpO1xuICAgIHRoaXMuYnVkZ2V0RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnVkZ2V0X190aXRsZS0tbW9udGhcIik7XG4gICAgdGhpcy5pdGVtVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLml0ZW1fX3ZhbHVlXCIpO1xuICAgIHRoaXMuaXRlbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLml0ZW1cIik7XG4gICAgdGhpcy5pbmNvbWVMaXN0ID0gW107XG4gICAgdGhpcy5leHBlbnNlTGlzdCA9IFtdO1xuICAgIHRoaXMuaWQgPSAxO1xuICB9XG5cbiAgZmluZEluY29tZUJ5SWQoaW5jb21lTGlzdCwgaW5jb21lSWQpIHtcbiAgICByZXR1cm4gaW5jb21lTGlzdC5maW5kKChjdXJyZW50SW5jb21lKSA9PiB7XG4gICAgICByZXR1cm4gY3VycmVudEluY29tZS50cmFuc2FjdGlvbklkID09PSBwYXJzZUludChpbmNvbWVJZCk7XG4gICAgfSk7XG4gIH1cblxuICBmaW5kRXhwZW5zZXNCeUlkKGV4cGVuc2VMaXN0LCBleHBlbnNlSWQpIHtcbiAgICByZXR1cm4gZXhwZW5zZUxpc3QuZmluZCgoY3VycmVudEV4cGVuc2UpID0+IHtcbiAgICAgIHJldHVybiBjdXJyZW50RXhwZW5zZS50cmFuc2FjdGlvbklkID09PSBwYXJzZUludChleHBlbnNlSWQpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlVHJhbnNhY3Rpb25Gcm9tTGlzdCh0cmFuc2FjdGlvbkxpc3QsIHRyYW5zYWN0aW9uKSB7XG4gICAgY29uc3QgaW5kZXggPSB0cmFuc2FjdGlvbkxpc3QuaW5kZXhPZih0cmFuc2FjdGlvbik7XG4gICAgdHJhbnNhY3Rpb25MaXN0LnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICBnZXRDdXJyZW50RGF0ZSgpIHtcbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbW9udGggPSBjdXJyZW50RGF0ZS50b0xvY2FsZVN0cmluZygnZGVmYXVsdCcsIHsgbW9udGg6ICdzaG9ydCcgfSk7XG4gICAgY29uc3QgeWVhciA9IGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgZGF5ID0gY3VycmVudERhdGUuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IGZpbmFsRGF0ZSA9IGAke21vbnRofSAke2RheX0sICR7eWVhcn1gO1xuICAgIFxuICAgIHJldHVybiBmaW5hbERhdGU7XG4gIH1cblxuICBnZXRTdW1PZkluY29tZSgpe1xuICAgIGxldCBpbmNvbWVTdW0gPSAwO1xuXG4gICAgdGhpcy5pbmNvbWVMaXN0LmZvckVhY2goIGluY29tZSA9PiB7XG4gICAgICBpbmNvbWVTdW0gPSBpbmNvbWVTdW0gKyBwYXJzZUZsb2F0KGluY29tZS5hbW91bnQpO1xuICAgIH0pXG5cbiAgICByZXR1cm4gaW5jb21lU3VtO1xuICB9XG5cbiAgZ2V0U3VtT2ZFeHBlbnNlcygpe1xuICAgIGxldCBleHBlbnNlU3VtID0gMDtcblxuICAgIHRoaXMuZXhwZW5zZUxpc3QuZm9yRWFjaCggaW5jb21lID0+IHtcbiAgICAgIGV4cGVuc2VTdW0gPSBleHBlbnNlU3VtICsgcGFyc2VGbG9hdChpbmNvbWUuYW1vdW50KTtcbiAgICB9KVxuXG4gICAgcmV0dXJuIGV4cGVuc2VTdW07XG4gIH1cblxuXG4gIHVwZGF0ZUJ1ZGdldERhdGUoKSB7XG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IG1vbnRoID0gY3VycmVudERhdGUudG9Mb2NhbGVTdHJpbmcoJ2RlZmF1bHQnLCB7IG1vbnRoOiAnbG9uZycgfSk7XG4gICAgY29uc3QgeWVhciA9IGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgZmluYWxCdWRnZXREYXRlID0gYCR7bW9udGh9ICR7eWVhcn1gO1xuXG4gICAgdGhpcy5idWRnZXREYXRlLmlubmVyVGV4dCA9IGZpbmFsQnVkZ2V0RGF0ZTtcbiAgfVxuXG4gIHVwZGF0ZVBlcmNlbnRhZ2VPZkV4cGVuc2VzKCkge1xuICAgIGxldCB0b3RhbEJ1ZGdldCA9ICB0aGlzLmdldFN1bU9mSW5jb21lKCk7XG5cbiAgICB0aGlzLmV4cGVuc2VMaXN0LmZvckVhY2goZXhwZW5zZSA9PiB7XG4gICAgICBjb25zdCBleHBlbnNlSHRtbERvY3VtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtdHJhbnNhY3Rpb24taWQ9XCIke2V4cGVuc2UudHJhbnNhY3Rpb25JZH1cIl1gKTtcbiAgICAgIGNvbnN0IGV4cGVuc2VQY3RIdG1sID0gZXhwZW5zZUh0bWxEb2N1bWVudC5jaGlsZHJlblsxXS5jaGlsZHJlblsxXTtcbiAgICAgIGNvbnN0IGV4cGVuc2VQY3QgPSBNYXRoLmFicyhNYXRoLnJvdW5kKChwYXJzZUZsb2F0KGV4cGVuc2UuYW1vdW50KSAvIHBhcnNlRmxvYXQodG90YWxCdWRnZXQpKSAqIDEwMCwgMikpO1xuXG4gICAgICBleHBlbnNlUGN0SHRtbC5pbm5lclRleHQgPSBgJHtleHBlbnNlUGN0fSAlYDtcbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0SW5wdXRWYWx1ZSgpIHtcbiAgICB0aGlzLnRyYW5zYWN0aW9uLnZhbHVlID0gXCJcIlxuICAgIHRoaXMudHJhbnNhY3Rpb25BbW91bnQudmFsdWUgPSAwXG4gIH1cblxuICB0b3RhbEJ1ZGdldENhbGN1bGF0b3IoKSB7XG4gICAgbGV0IGluY29tZVN1bSA9IHRoaXMuZ2V0U3VtT2ZJbmNvbWUoKTtcbiAgICBsZXQgZXhwZW5zZVN1bSA9IHRoaXMuZ2V0U3VtT2ZFeHBlbnNlcygpO1xuICAgIGxldCB0b3RhbEJ1ZGdldCA9IDA7XG4gICAgbGV0IHRvdGFsRXhwZW5zZVBjdCA9IDA7XG5cbiAgICB0b3RhbEJ1ZGdldCA9IGluY29tZVN1bSArIGV4cGVuc2VTdW07XG4gICAgdG90YWxFeHBlbnNlUGN0ICA9IE1hdGguYWJzKE1hdGgucm91bmQoKGV4cGVuc2VTdW0gLyBpbmNvbWVTdW0pICogMTAwLCAyKSk7XG5cbiAgICBpZih0b3RhbEJ1ZGdldCA+IDApIHtcbiAgICAgIHRvdGFsQnVkZ2V0ID0gYCsgJCR7dG90YWxCdWRnZXR9YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0b3RhbEJ1ZGdldCA9IGAtICQke01hdGguYWJzKHRvdGFsQnVkZ2V0KX1gO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLnRvdGFsSW5jb21lLmlubmVyVGV4dCA9IGArICQke2luY29tZVN1bX1gO1xuICAgIHRoaXMudG90YWxFeHBlbnNlcy5pbm5lclRleHQgPSBgLSAkJHtNYXRoLmFicyhleHBlbnNlU3VtKX1gO1xuICAgIHRoaXMudG90YWxCdWRnZXRWYWx1ZS5pbm5lclRleHQgPSB0b3RhbEJ1ZGdldDtcbiAgICB0aGlzLnRvdGFsRXhwZW5zZXNQY3QuaW5uZXJUZXh0ID0gYCR7dG90YWxFeHBlbnNlUGN0fSAlYDtcbiAgfVxuXG4gIGFkZE5ld1RyYW5zYWN0aW9uKCkge1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uT2ZUcmFuc2FjdGlvbiA9IHRoaXMudHJhbnNhY3Rpb24udmFsdWU7XG4gICAgY29uc3QgdmFsdWVPZkV4cGVuc2UgPSB0aGlzLnRyYW5zYWN0aW9uQW1vdW50LnZhbHVlO1xuICAgIGNvbnN0IHBlcmNlbnRhZ2VPZkV4cGVuc2UgPSBNYXRoLmFicyhNYXRoLnJvdW5kKChwYXJzZUZsb2F0KHZhbHVlT2ZFeHBlbnNlKSAvIHBhcnNlRmxvYXQodGhpcy5nZXRTdW1PZkluY29tZSgpKSkgKiAxMDAsIDIpKTtcblxuICAgIGlmICghZGVzY3JpcHRpb25PZlRyYW5zYWN0aW9uLnRyaW0oKS5sZW5ndGggfHwgcGFyc2VGbG9hdCh2YWx1ZU9mRXhwZW5zZSkgPT09IDAgfHwgIXBhcnNlRmxvYXQodmFsdWVPZkV4cGVuc2UpKSB7XG4gICAgICBhbGVydChcIllvdXIgaW5wdXQgaXMgZW1wdHksIHBsZWFzZSBlbnRlciBhIHRyYW5zYWN0aW9uIG5hbWUgYW5kL29yIHZhbHVlLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbih2YWx1ZU9mRXhwZW5zZSwgZGVzY3JpcHRpb25PZlRyYW5zYWN0aW9uLCB0aGlzLmdldEN1cnJlbnREYXRlKCksIHRoaXMuaWQpO1xuXG4gICAgaWYgKHRoaXMudHJhbnNhY3Rpb25BbW91bnQudmFsdWUgPCAwKSB7XG4gICAgICBjb25zdCBuZXdFeHBlbnNlID0gXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiaXRlbVwiIGRhdGEtdHJhbnNhY3Rpb24taWQ9IFwiJHt0cmFuc2FjdGlvbi50cmFuc2FjdGlvbklkfVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbV9fZGVzY3JpcHRpb25cIj4ke3RyYW5zYWN0aW9uLmRlc2NyaXB0aW9ufSA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJpZ2h0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1fX3ZhbHVlXCI+LSAkJHsoTWF0aC5hYnModHJhbnNhY3Rpb24uYW1vdW50KSl9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1fX3BlcmNlbnRhZ2VcIj4ke3BlcmNlbnRhZ2VPZkV4cGVuc2V9JTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtX19kZWxldGVcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJpdGVtX19kZWxldGUtLWJ0blwiPjxpIGNsYXNzPVwiaW9uLWlvcy1jbG9zZS1vdXRsaW5lXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1fX2RhdGVcIj4ke3RyYW5zYWN0aW9uLmRhdGV9PC9kaXY+YDtcbiAgICAgIFxuICAgICAgdGhpcy5leHBlbnNlQnVkZ2V0TGlzdC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIG5ld0V4cGVuc2UpO1xuICAgICAgdGhpcy5leHBlbnNlTGlzdC5wdXNoKHRyYW5zYWN0aW9uKTtcbiAgICB9IFxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgbmV3SW5jb21lID0gXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiaXRlbVwiIGRhdGEtdHJhbnNhY3Rpb24taWQ9XCIke3RyYW5zYWN0aW9uLnRyYW5zYWN0aW9uSWR9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtX19kZXNjcmlwdGlvblwiPiR7dHJhbnNhY3Rpb24uZGVzY3JpcHRpb259PC9kaXY+ICAgICAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtX192YWx1ZVwiPisgJCR7dHJhbnNhY3Rpb24uYW1vdW50fTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtX19kZWxldGVcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJpdGVtX19kZWxldGUtLWJ0blwiPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImlvbi1pb3MtY2xvc2Utb3V0bGluZVwiPjwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1fX2RhdGVcIj4ke3RyYW5zYWN0aW9uLmRhdGV9PC9kaXY+YDtcblxuICAgICAgICB0aGlzLmluY29tZUJ1ZGdldExpc3QuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBuZXdJbmNvbWUpO1xuICAgICAgICB0aGlzLmluY29tZUxpc3QucHVzaCh0cmFuc2FjdGlvbik7XG4gICAgICAgIHRoaXMudXBkYXRlUGVyY2VudGFnZU9mRXhwZW5zZXMoKTtcbiAgICB9XG5cbiAgICB0aGlzLmlkKys7XG4gICAgdHJhbnNhY3Rpb25MaXN0LnJlc2V0SW5wdXRWYWx1ZSgpO1xuICAgIHRyYW5zYWN0aW9uTGlzdC50b3RhbEJ1ZGdldENhbGN1bGF0b3IoKTtcbiAgfVxuXG4gIHJlbW92ZVRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uSWQpIHtcbiAgICBpZiAodGhpcy5maW5kRXhwZW5zZXNCeUlkKHRoaXMuZXhwZW5zZUxpc3QsIHRyYW5zYWN0aW9uSWQpKSB7XG4gICAgICBjb25zdCBleHBlbnNlVG9EZWxldGUgPSB0aGlzLmZpbmRFeHBlbnNlc0J5SWQodGhpcy5leHBlbnNlTGlzdCwgdHJhbnNhY3Rpb25JZCk7ICAgICAgXG4gICAgICB0aGlzLnJlbW92ZVRyYW5zYWN0aW9uRnJvbUxpc3QodGhpcy5leHBlbnNlTGlzdCwgZXhwZW5zZVRvRGVsZXRlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBpbmNvbWVUb0RlbGV0ZSA9IHRoaXMuZmluZEluY29tZUJ5SWQodGhpcy5pbmNvbWVMaXN0LCB0cmFuc2FjdGlvbklkKTtcbiAgICAgIHRoaXMucmVtb3ZlVHJhbnNhY3Rpb25Gcm9tTGlzdCh0aGlzLmluY29tZUxpc3QsIGluY29tZVRvRGVsZXRlKTtcbiAgICAgIHRoaXMudXBkYXRlUGVyY2VudGFnZU9mRXhwZW5zZXMoKTtcbiAgICB9XG5cbiAgICB0cmFuc2FjdGlvbkxpc3QudG90YWxCdWRnZXRDYWxjdWxhdG9yKCk7XG4gIH1cbn1cblxuY29uc3QgdHJhbnNhY3Rpb25MaXN0ID0gbmV3IFRyYW5zYWN0aW9uTGlzdCgpO1xuXG4vL0V2ZW50IExpc3RlbmVyc1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZF9fYnRuJykuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgdHJhbnNhY3Rpb25MaXN0LmFkZE5ld1RyYW5zYWN0aW9uKCk7XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgaWYoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJpb24taW9zLWNsb3NlLW91dGxpbmVcIikge1xuICAgIGNvbnN0IHRyYW5zYWN0aW9uSWQgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zYWN0aW9uLWlkXCIpO1xuICAgIHRyYW5zYWN0aW9uTGlzdC5yZW1vdmVUcmFuc2FjdGlvbih0cmFuc2FjdGlvbklkKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRyYW5zYWN0aW9uLWlkPVwiJHt0cmFuc2FjdGlvbklkfVwiXWApLnJlbW92ZSgpO1xuICB9XG59KTtcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0cmFuc2FjdGlvbkxpc3QudXBkYXRlQnVkZ2V0RGF0ZSgpO1xuICB0cmFuc2FjdGlvbkxpc3QucmVzZXRJbnB1dFZhbHVlKCk7XG59Il19
