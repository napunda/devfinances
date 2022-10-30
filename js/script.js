const Modal = {
  toggle() {
    const modal = document.querySelector(".modal");
    modal.classList.toggle("modal-hide");
  },
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  },
  set(transactions) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  },
};
const transactions = Storage.get();

const Transaction = {
  incomes() {
    let incomes = 0;
    transactions.forEach((transaction) => {
      if (transaction.amount > 0) {
        incomes += transaction.amount;
      }
    });
    return incomes;
  },

  outflow() {
    let outflow = 0;
    transactions.forEach((transaction) => {
      if (transaction.amount < 0) {
        outflow += transaction.amount;
      }
    });
    return outflow;
  },

  balance() {
    return Number(Transaction.incomes() + Transaction.outflow());
  },

  add(transaction) {
    transactions.push(transaction);
    App.reload();
  },

  remove(index) {
    transactions.splice(index, 1);
    App.reload();
  },
};

const insertHTML = {
  transactionsContainer: document.querySelector(".table-values tbody"),
  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = insertHTML.innerHTMLtransaction(transaction, index);
    insertHTML.transactionsContainer.appendChild(tr);
    tr.dataset.index = index;
  },

  innerHTMLtransaction(transaction, index) {
    const html = `
    <tr>
      <th>${transaction.description}</th>
      <td class="${
        transaction.amount > 0
          ? `transactions-incomes`
          : `transactions-outflow `
      }">${transaction.amount.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })}</td>
      <td>${transaction.date}</td>
      <th onclick="Transaction.remove(${index})"><i class="fas fa-minus-circle"></i></th>
    </tr>`;
    return html;
  },

  displayBalance() {
    const balance = Transaction.balance().toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    const incomes = Transaction.incomes().toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    const outflow = Transaction.outflow().toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    document.getElementById("displayBalance").innerHTML = balance;
    document.getElementById("displayincomes").innerHTML = incomes;
    document.getElementById("displayOutflow").innerHTML = outflow;
  },
  cleartransaction() {
    insertHTML.transactionsContainer.innerHTML = "";
  },
};

const App = {
  init() {
    transactions.forEach(insertHTML.addTransaction);
    insertHTML.displayBalance();
  },

  reload() {
    insertHTML.cleartransaction();
    Storage.set(transactions);
    Storage.get();
    App.init();
  },
};

const Form = {
  description: document.getElementById("modalDescription"),
  amount: document.getElementById("modalValue"),
  date: document.getElementById("modalDate"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  validatFields() {
    const { description, amount, date } = Form.getValues();

    if (description.trim() === "" || amount.trim() == "" || date.trim() == "") {
      throw new Error("Preencha todos os campos.");
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();
    description = String(description.trim());
    amount = Number(amount.trim());
    dateSplit = date.split("-");
    date = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
    return {
      description,
      amount,
      date,
    };
  },

  clearValues() {
    Form.description.value = "";
    Form.date.value = "";
    Form.amount.value = "";
  },
  submit() {
    try {
      Form.validatFields();
      Transaction.add(Form.formatValues());
      Modal.toggle();
      Form.clearValues();
    } catch (error) {
      alert(error.message);
    }
  },
};

App.init();
