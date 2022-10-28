const Modal = {
  toggle() {
    const modal = document.querySelector(".modal");
    modal.classList.toggle("modal-hide");
  },
};

const transactions = [
  // {
  //   id: 0,
  //   description: "Desenvolvimento de site",
  //   amount: 12000,
  //   date: "13/04/2020",
  // },
  // {
  //   id: 1,
  //   description: "Hamburguer",
  //   amount: -59.5,
  //   date: "10/04/2020",
  // },
  // {
  //   id: 2,
  //   description: "Aluguel do apartamento",
  //   amount: -1200,
  //   date: "27/03/2020	",
  // },
  // {
  //   id: 3,
  //   description: "Computador",
  //   amount: 5400,
  //   date: "13/04/2020",
  // },
];

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
    return outflow > 0 ? outflow * -1 : outflow;
  },

  balance() {
    return Number(Transaction.incomes() - Transaction.outflow());
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
    tr.innerHTML = insertHTML.innerHTMLtransaction(transaction);
    insertHTML.transactionsContainer.appendChild(tr);
  },

  innerHTMLtransaction(transaction) {
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
      <th><i class="fas fa-minus-circle"></i></th>
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
    transactions.forEach(function (transaction) {
      insertHTML.addTransaction(transaction);
    });

    insertHTML.displayBalance();
  },

  reload() {
    insertHTML.cleartransaction();
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
    date = new Date(date);
    date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
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
