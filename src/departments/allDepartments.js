document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");

  // GETTING ALL DEPARTMENTS
  let departments = await window.api.getDepartments();
  let tableData = document.getElementById("departments");
  let departmentString = departments
    .map((dept) => {
      return `<tr>
        <td>${dept.Did}</td>
        <td>${dept.department_name}</td>
        <td>${dept.description}</td>
        <td>${dept.running_cost}</td>
        <td>${dept.balance}</td>
        <td>
          <button onclick="editDepartment(${dept.Did})" id="editBtn">Edit</button>
          <button onclick="deleteDepartment(${dept.Did})" id="deleteBtn">Delete</button>
        </td>
        </tr>`;
    })
    .join("<br/>");

  tableData.innerHTML = departmentString;

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
  editDepartment = async (id) => {
    await window.api.findDepartmentById(id);
    let department = await window.api.getDepartmentById();

    department.map((data) => {
      document.getElementById("departmentName").value = data.department_name;
      document.getElementById("departmentDescription").value = data.description;
      document.getElementById("runningCost").value = data.running_cost;
    });
    modalFunction();

    const form = document.querySelector("#updateForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const department = {
        id,
        department_name: document.querySelector("#departmentName").value,
        description: document.querySelector("#departmentDescription").value,
        running_cost: document.querySelector("#runningCost").value,
        balance: document.querySelector("#runningCost").value,
      };

      // UPDATING A DEPARTMENT
      let newDepartment = window.api.updateDepartment(
        id,
        (department_name = department.department_name),
        (description = department.description),
        (running_cost = department.running_cost),
        (balance = department.balance)
      );

      department.map((data) => {
        document.getElementById("departmentName").value = "";
        document.getElementById("departmentDescription").value = "";
        document.getElementById("runningCost").value = "";
      });
    });
  };

  // ############# DELETE FUNCTION ###################################################################
  deleteHandler = async function (id) {
    await window.api.deleteDepartment(id);
  };


  deleteDepartment = function (id) {
    deleteModalFunction();
    let question = document.getElementById("question");
    let deleteBtn = `<div>
    <p>Are you sure you want to delete this Department?</p>
    <button onclick="deleteHandler(${id})" class="deleteBtn">DELETE</button>
    </div>`;
    question.innerHTML = deleteBtn;
  };
});
