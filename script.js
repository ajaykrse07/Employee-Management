// Define constants
const baseURL = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees';
let currentPage = 1;
let currentLimit = 10;
let currentFilterBy = '';
let currentFilterValue = '';
let currentSort = '';
let currentOrder = '';

// Define HTML elements
const employeeTable = document.getElementById('employee-data');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const departmentFilter = document.getElementById('department');
const genderFilter = document.getElementById('gender');
const sortDropdown = document.getElementById('sort');

// Function to fetch employee data from API
async function fetchEmployees() {
    const url = `${baseURL}?page=${currentPage}&limit=${currentLimit}&filterBy=${currentFilterBy}&filterValue=${currentFilterValue}&sort=${currentSort}&order=${currentOrder}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Function to populate table with data
function populateTable(data) {
    employeeTable.innerHTML = '';
    data.forEach((employee, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${employee.name}</td>
                <td>${employee.gender}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
            </tr>
        `;
        employeeTable.innerHTML += row;
    });
}

// Event listener for pagination buttons
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchDataAndPopulateTable();
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    fetchDataAndPopulateTable();
});

// Event listeners for filters and sort
departmentFilter.addEventListener('change', (event) => {
    currentFilterBy = 'department';
    currentFilterValue = event.target.value;
    fetchDataAndPopulateTable();
});

genderFilter.addEventListener('change', (event) => {
    currentFilterBy = 'gender';
    currentFilterValue = event.target.value;
    fetchDataAndPopulateTable();
});

sortDropdown.addEventListener('change', (event) => {
    currentSort = 'salary';
    currentOrder = event.target.value;
    fetchDataAndPopulateTable();
});

// Function to fetch data based on current settings and populate the table
async function fetchDataAndPopulateTable() {
    const data = await fetchEmployees();
    populateTable(data);
}

// Initial fetch and populate
fetchDataAndPopulateTable();
