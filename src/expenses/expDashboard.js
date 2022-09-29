var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.height = "0px";
            setTimeout(() => {
                panel.style.display = "none";
            }, 500);
        } else {
            panel.style.display = "block";
            panel.style.height = "auto";
        }
        // for (j = 0; j < acc.length; j++) {
        //     if (j != i) {
        //         acc[j].classList.remove("active");
        //         const panel = acc[j].nextElementSibling;
        //         panel.style.display = "none";
        //     }
        // }
    });
}

document
    .getElementById("budget-head-form")
    .addEventListener("submit", submitBudgetHead);

function submitBudgetHead(e) {
    e.preventDefault();

    const name = document.getElementById("create-bh-name");
    const description = document.getElementById("create-bh-desc");
    const amount = document.getElementById("create-bh-amount");
    const error = document.getElementById("create-bh-expense-error");

    error.innerHTML = "";

    try {
        addBudgetHead({
            name: name.value,
            description: description.value,
            amount: amount.value,
        });
        updateBudgetHeadView();

        name.value = "";
        description.value = "";
        amount.value = "";
        error.innerHTML = "";
    } catch (err) {
        error.innerHTML = "" + err;
    }
}

document
    .getElementById("expense-form")
    .addEventListener("submit", submitExpense);

async function submitExpense(e) {
    e.preventDefault();

    const name = document.getElementById("select-bh");
    const description = document.getElementById("bh-description");
    const amount = document.getElementById("bh-amount");
    const person = document.getElementById("bh-person");
    const error = document.getElementById("bh-expense-error");

    error.innerHTML = "";

    let currentBH = undefined;

    if (budgetHeadState) {
        currentBH = budgetHeadState.find((bh) => bh.id == name.value);
        if (currentBH) {
            if (currentBH.amount < +amount.value) {
                error.innerHTML = "Maximum allocatable amount is " + currentBH.amount;
                return;
            }
        } else {
            error.innerHTML = "unable to validate selected Budjet head";
            return;
        }
    } else {
        error.innerHTML = "unable to validate selected Budjet head";
        return;
    }

    try {
        await window.api.updateBudgetHead(
            currentBH.id,
            currentBH.name,
            currentBH.description,
            currentBH.amount - +amount.value,
        );
        addExpense({
            name: currentBH.name,
            description: description.value,
            amount: amount.value,
            person: person.value,
            budget_head: currentBH.id
        });
        updateExpensesView();
        updateBudgetHeadView();
        name.value = "";
        description.value = "";
        person.value = "";
        amount.value = "";
        error.innerHTML = "";
    } catch (err) {
        error.innerHTML = "" + err;
    }
}

// ############# MODAL FUNCTION ###################################################################
const modalFunction = () => {
    var modal = document.getElementById("editModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};

const deleteModalFunction = () => {
    var modal = document.getElementById("deleteModal");
    var span = document.getElementsByClassName("closeDelete")[0];
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};

// ############# EDIT FUNCTION ###################################################################
editBudgetHead = async (id) => {
    budget_heads = await window.api.getBudgetHeadById(id);

    budget_heads.map((data) => {
        document.getElementById("edit-bh-name").value = data.name;
        document.getElementById("edit-bh-desc").value = data.description;
        document.getElementById("edit-bh-amount").value = data.amount;
    });
    modalFunction();

    const form = document.querySelector("#updateForm");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const budget_head = {
            id,
            name: document.querySelector("#edit-bh-name").value,
            description: document.querySelector("#edit-bh-desc").value,
            amount: document.querySelector("#edit-bh-amount").value,
        };

        // UPDATING A DEPARTMENT
        let new_budget_head = await window.api.updateBudgetHead(
            budget_head.id,
            budget_head.name,
            budget_head.description,
            budget_head.amount
        );

        var modal = document.getElementById("editModal");
        var modaldel = document.getElementById("deleteModal");
        modal.style.display = "none";
        modaldel.style.display = "none";
        document.getElementById("edit-bh-name").value = "";
        document.getElementById("edit-bh-desc").value = "";
        document.getElementById("edit-bh-amount").value = "";
        updateBudgetHeadView();
    });
};

// ############# DELETE FUNCTION ###################################################################
deleteHandler = async function (id) {
    await window.api.deleteBudgetHead(id);
    updateBudgetHeadView();
};

deleteBudgetHead = function (id) {
    if (!id) {
        alert(id);
        return;
    }
    deleteModalFunction();
    let question = document.getElementById("question");
    let deleteBtn = `<div>
    <p>Are you sure you want to delete this Budget Head?</p>
    <button onclick="deleteHandler(${id})" class="deleteBtn">DELETE</button>
    </div>`;
    question.innerHTML = deleteBtn;
};
