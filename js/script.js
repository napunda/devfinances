const Modal = {
  toggle() {
    const modal = document.querySelector(".modal");
    modal.classList.toggle("modal-hide");
  },
};

const transactions = [
  {
    id: 0,
    description: "Desenvolvimento de site",
    amount: 12000,
    date: "13/04/2020",
  },
  {
    id: 1,
    description: "Hamburguer",
    amount: -59,
    date: "10/04/2020",
  },
  {
    id: 2,
    description: "Aluguel do apartamento",
    amount: -1200,
    date: "27/03/2020	",
  },
  {
    id: 3,
    description: "Computador",
    amount: 5400,
    date: "13/04/2020",
  },
];

function pushTransaction(transaction) {
  const trigger = document.querySelector("#trigger");
}

const Transaction = {
  incomes() {},
  outflow() {},
  balance() {},
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
      <td class="transactions-incomes">${transaction.amount.toLocaleString(
        "pt-br",
        {
          style: "currency",
          currency: "BRL",
        }
      )}</td>
      <td>${transaction.date}</td>
      <th><i class="fas fa-minus-circle"></i></th>
    </tr>`;
    return html;
  },
};

transactions.forEach(function (transaction) {
  insertHTML.addTransaction(transaction);
});
