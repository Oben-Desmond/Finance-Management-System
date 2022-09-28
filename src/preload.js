const Controller = require("../models/controller");
const Department = require("../models/departmentController");
const Expenditure = require("../models/expenditureController");
const Expense = require("../models/expenseController");
const Dashboard = require("../models/dashboardController");

const departmetCtl = new Department();
const studentCtl = new Controller();
const expenditureCtl = new Expenditure();
const dashboardCtl = new Dashboard();
const expenseCtrl = new Expense();

const { contextBridge, ipcRenderer } = require("electron");

// GET TOTAL INCOME
module.exports = totalIncome = () => {
  const income = dashboardCtl.totalIncome();

  return income;
};



const tlIncome = totalIncome();

// GET RUNNING COST
module.exports = runningCost = () => {
  const Rcost = dashboardCtl.runningCost();

  return Rcost;
};
const runxcost = runningCost();

// GET RUNNING COST BALANCE
module.exports = runningCostBalance = () => {
  const RcostBalance = dashboardCtl.runningCostBalance();

  return RcostBalance;
};
const runxcostBalance = runningCostBalance();

// ####################### STUDENT FUNCTIONS ###################################################

// GET ALL STUDENTS
module.exports = getStudents = () => {
  const allStudents = studentCtl.getStudents();

  return allStudents;
};
const students = getStudents();

// GET ALL STUDENT BY ID
let returnedStudent;
module.exports = getStudentById = async (id) => {
  const student = await studentCtl.getStudentById(id);
  returnedStudent = student;

  return student;
};

// ADD A STUDENT
module.exports = addStudent = (
  studentNumber,
  registrationNumber,
  studentName,
  studentLevel,
  section,
  amount,
  balance
) => {
  const addStud = studentCtl.addStudent(
    studentNumber,
    registrationNumber,
    studentName,
    studentLevel,
    section,
    amount,
    balance
  );

  return addStud;
};

// UPDATE A STUDENT
module.exports = updateStudent = (
  id,
  studentNumber,
  registrationNumber,
  studentName,
  studentLevel,
  section,
  amount,
  balance
) => {
  const updateStud = studentCtl.updateStudent(
    id,
    studentNumber,
    registrationNumber,
    studentName,
    studentLevel,
    section,
    amount,
    balance
  );

  return updateStud;
};

// DELETE STUDENT
module.exports = deleteStudent = (id) => {
  const deletedStudent = studentCtl.deleteStudent(id);

  return deletedStudent;
};


module.exports = totalExpenses = () => {
  const expenses = studentCtl.totalExpenses();

  return expenses;
};


module.exports = totalIncomeExpenses = () => {
  const expenses = expenseCtrl.totalIncomeExpenses();

  return expenses;
};

module.exports = addIncomeExpense = (income) => {
  expenseCtrl.addIncomeExpense(income);

};


module.exports = addBudgetHeadIncome = (budget) => {
  expenseCtrl.addBudgetHeadIncome(budget);

};

module.exports = getBudgetData = () => {
  const bh = expenseCtrl.getBudgetData();

  return bh;
}

module.exports = getBudgetHeadById = (id) => {
  return expenseCtrl.getBudgetHeadById(id)
}

module.exports = updateBudgetHead = (id,
  name,
  description,
  amount) => {
  return expenseCtrl.updateBudgetHead(id,
    name,
    description,
    amount)
}

module.exports = deleteBudgetHead = (id) => {
  return expenseCtrl.deleteBudgetHead(id);


};

// ####################### DEPARTMENT FUNCTIONS ###################################################

// GET ALL DEPARTMENTS
module.exports = allDepartments = () => {
  const departments = departmetCtl.allDepartments();

  return departments;
};
const departments = allDepartments();

// GET DEPT BY ID
let returnedDepartment;
module.exports = getDepartmentById = (id) => {
  const department = departmetCtl.getDepartmentById(id);
  returnedDepartment = department;

  return department;
};

// ADD A DEPARTMENT
module.exports = addDepartment = (
  departmentName,
  departmentDescription,
  runningCost,
  balance
) => {
  const addDept = departmetCtl.addDepartment(
    departmentName,
    departmentDescription,
    runningCost,
    balance
  );

  return addDept;
};

// UPDATE A DEPARTMENT
module.exports = updateDepartment = (
  id,
  departmentName,
  departmentDescription,
  runningCost,
  balance
) => {
  const updateDept = departmetCtl.updateDepartment(
    id,
    departmentName,
    departmentDescription,
    runningCost,
    balance
  );

  return updateDept;
};

// DELETE DEPARTMENT
module.exports = deleteDepartment = (id) => {
  const deletedDepartment = departmetCtl.deleteDepartment(id);

  return deletedDepartment;
};

// ####################### EXPENDITURE FUNCTIONS ###################################################

// GET ALL EXPENDITURES
module.exports = allExpenditures = () => {
  const expenditures = expenditureCtl.allExpenditures();

  return expenditures;
};
const expenditures = allExpenditures();

// ADD EXPENDITURE
module.exports = addExpenditure = (
  departmentName,
  category,
  amount,
  issuedTo
) => {
  const addExpns = expenditureCtl.addExpenditure(
    departmentName,
    category,
    amount,
    issuedTo
  );

  return addExpns;
};

// ####################### CONTEXT BRIDGE ###################################################

contextBridge.exposeInMainWorld("api", {
  // total income ################
  totalIncome: function () {
    return tlIncome;
  },


  // total running cost ################
  runningCost: function () {
    return runxcost;
  },
  // total running cost balance ################
  runningCostBalance: function () {
    return runxcostBalance;
  },

  // Students ##########################
  getStudents: function () {
    return students;
  },
  getStudentById: function () {
    return returnedStudent;
  },
  findStudentById: getStudentById,
  addStudent: addStudent,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent,

  // Departments #######################
  getDepartments: function () {
    return departments;
  },
  getDepartmentById: function () {
    return returnedDepartment;
  },
  totalIncomeExpenses: totalIncomeExpenses,
  addIncomeExpense: addIncomeExpense,
  addBudgetHeadIncome: addBudgetHeadIncome,
  getBudgetData: getBudgetData,
  findDepartmentById: getDepartmentById,
  addDepartment: addDepartment,
  updateDepartment: updateDepartment,
  deleteDepartment: deleteDepartment,
  totalExpenses: totalExpenses,
  getBudgetHeadById: getBudgetHeadById,
  updateBudgetHead: updateBudgetHead,
  deleteBudgetHead: deleteBudgetHead,

  // Expenditure ########################
  getExpenditures: function () {
    return expenditures;
  },
  addExpenditure: addExpenditure,
});
