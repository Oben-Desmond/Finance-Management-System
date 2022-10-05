document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");

  function formatMoney(price) {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(price);
  }

  // ############# GET ALL STUDENTS CODE ###################################################################
  let students = await window.api.getStudents();
  let tableData = document.getElementById("students");

  let studentString = students
    .map((stud, index) => {
      return `<tr id="${stud.id}">
        <td>${index + 1}</td>
        <td>${stud.student_number}</td>
        <td>${stud.registration_number}</td>
        <td>${stud.student_name}</td>
        <td>${stud.student_level}</td>
        <td>${stud.student_section}</td>
        <td>${formatMoney(stud.amount)}</td>
        <td>${formatMoney(stud.balance)}</td>
        <td>${stud.Timestamp}</td>
        <td>
        <button onclick="payFee(${stud.id})" id="editBtn">Pay Fees</button>
          <button onclick="editStudent(${stud.id})" id="editBtn">Edit</button>
          <button onclick="deleteStudent(${
            stud.id
          })" id="deleteBtn">Delete</button>
        </td>
        </tr>`;
    })
    .join("<br/>");

  tableData.innerHTML = studentString;

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

  const payFeeModalFunction = () => {
    var modal = document.getElementById("feeModal");
    var span = document.getElementsByClassName("closeFeeModal")[0];
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
  editStudent = async (id) => {
    await window.api.findStudentById(id);
    let oneStudent = await window.api.getStudentById();

    oneStudent.map((data) => {
      document.getElementById("studentNumber").value = data.student_number;
      document.getElementById("registrationNumber").value =
        data.registration_number;
      document.getElementById("studentName").value = data.student_name;
      document.getElementById("studentLevel").value = data.student_level;
      document.getElementById("section").value = data.student_section;
    });
    modalFunction();

    const form = document.querySelector("#updateForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const student = {
        id,
        student_number: document.querySelector("#studentNumber").value,
        registration_number: document.querySelector("#registrationNumber")
          .value,
        student_name: document.querySelector("#studentName").value,
        student_level: document.querySelector("#studentLevel").value,
        section: document.querySelector("#section").value,
      };

      // UPDATING A STUDENT
      let newStudent = window.api.updateStudent(
        id,
        (student_number = student.student_number),
        (registration_number = student.registration_number),
        (student_name = student.student_name),
        (student_level = student.student_level),
        (student_section = student.section)
      );

      oneStudent.map((data) => {
        document.getElementById("studentNumber").value = "";
        document.getElementById("registrationNumber").value = "";
        document.getElementById("studentName").value = "";
        document.getElementById("studentLevel").value = "";
        document.getElementById("section").value = "";
      });
    });
  };

  // ############# DELETE FUNCTION ###################################################################
  deleteHandler = async function (id) {
    await window.api.deleteStudent(id);
    window.href = document.URL;
  };

  deleteStudent = function (id) {
    deleteModalFunction();
    let question = document.getElementById("question");
    let deleteBtn = `<div>
    <p>Are you sure you want to delete this student?</p>
    <button onclick="deleteHandler(${id})" class="deleteBtn">DELETE</button>
    </div>`;
    question.innerHTML = deleteBtn;
  };

  // ################# FEE FUNCTION #####################################################################
  payFee = async function (id) {
    await window.api.findStudentById(id);
    let oneStudent = await window.api.getStudentById();
    // let amount, balance;

    oneStudent.map((data) => {
      student_number = data.student_number;
      reg_number = data.registration_number;
      department = data.student_section;
      student_name = data.student_name;
      amountPaid = data.amount;
      balance = data.balance;
    });
    payFeeModalFunction();
    let data = document.getElementById("dataDiv");
    let studentInfo = `<div class="amount-and-balance">
        <div class="feePaid"> PAID: <span>${amountPaid}</span> </div>
        <div class="feeBalance"> BALANCE: <span>${balance}</span> </div>
      </div>`;
    data.innerHTML = studentInfo;

    const form = document.querySelector("#payFee");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const amount = document.querySelector("#fee_amount").value;

      // PAY FEE
      let fee = window.api.payFee(
        id,
        student_number,
        reg_number,
        student_name,
        amount
      );
    });
  };
});
