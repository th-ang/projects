const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const operator = document.getElementById('operator');
const submit = document.getElementById('submit');
const reset = document.getElementById('reset');
const startDate = document.getElementById('startDate');
const result = document.getElementById('result');
const subtract1 = document.getElementById('subtract1');
const errorArr = {
    formatError: 'Sai định dạng',
    unrealError: 'Ngày không có thực'
}
// reset mọi form về mặc định
reset.addEventListener('click', () => {
    resetForm();
});
// tính toán
submit.addEventListener('click', () => {
    main();
});
// xử lý startDate về định dạng dd/mm/yyyy và check lỗi
startDate.addEventListener('focusout', () => {
    convertStartDate();
    checkStartDate();
});

// xử lý day month year
day.addEventListener('focusout', () => {
    if (day.value < 0) day.value = 0;
    day.value = Math.floor(parseInt(day.value));
})
month.addEventListener('focusout', () => {
    if (month.value < 0) month.value = 0;
    month.value = Math.floor(parseInt(month.value));
})
year.addEventListener('focusout', () => {
    if (year.value < 0) year.value = 0;
    year.value = Math.floor(parseInt(year.value));
})


// F chạy chương trình
function main() {
    let startValue = handleInput(dateFormat()[0], dateFormat()[1], dateFormat()[2]);
    let rs = calculate(startValue);
    let day = rs.getDate();
    let month = rs.getMonth()+1;
    let year = rs.getFullYear();
    result.innerHTML = `${day}/${month}/${year}`;
    document.querySelector('div.card.none').style.display = 'block';

}

// kiểm tra ngày tháng có thực
function validDate(year, month, day) {
    let d = new Date(year, month - 1, day);
    return d && (month === (d.getMonth() + 1));
}

// F lấy giá trị trước khi tính toán
function getTempValue() {
    day.value = Math.floor(parseInt(day.value));
    month.value = Math.floor(parseInt(month.value));
    year.value = Math.floor(parseInt(year.value));
    return (Math.floor(parseInt(day.value)) + Math.floor(parseInt(month.value)) * 30 + Math.floor(parseInt(year.value)) * 365) * 24 * 60 * 60 * 1000;
}
// F xử lý định dạng ngày tháng năm
function dateFormat() {
    // xử lý định dạng ddmmyyyy
    if (startDate.value === '') {
        let d = new Date();
        startDate.value = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
    }
    let arr = startDate.value.split('/');
    return arr.reverse();
}
// F xử lý đầu vào input về dạng valueDate
function handleInput(year, month, day) {
    let d = new Date(year, month - 1, day);
    return d.valueOf();
}
// F tính toán ngày tháng dạng valueDate
function calculate(input) {
    let rs = 0;
    if (operator.value === 'plus') {
        rs = input + getTempValue();
    } else rs = input - getTempValue();
    if (subtract1.checked) rs = rs - (1* 24 * 60 * 60 * 1000);
    return new Date(rs);
}




// F xử lý định dạng dd/mm/yyyy 
function convertStartDate() {
    let temp = startDate.value.match(/\d/g);
    if (temp === null) temp = '';
    else temp = temp.join('');
    if (!isNaN(temp) && temp.length === 8) {
        let day = temp.slice(0, 2);
        let month = temp.slice(2, 4);
        let year = temp.slice(4);
        if (month > 2 && month < 10) month = month.slice(1, 2);
        temp = day.concat('/', month, '/', year);
    }
    return startDate.value = temp;
}

// F check lỗi startDate
function checkStartDate() {
    let day = parseInt(startDate.value.split('/')[0]);
    let month = parseInt(startDate.value.split('/')[1]);
    let year = parseInt(startDate.value.split('/')[2]);
    if (validDate(year, month, day) === false) {
        startDate.classList.add('is-danger');
        document.querySelector('i.material-icons.button').classList.add('is-danger');

    } else {
        startDate.classList.remove('is-danger');
        document.querySelector('i.material-icons.button').classList.remove('is-danger');

    }

}

// F reset mọi thứ về mặc định
function resetForm() {
    day.value = 0;
    month.value = 0;
    year.value = 0;
    operator.value = 'plus';
    startDate.value = '';
    result.innerHTML = '';
    document.querySelector('div.card.none').style.display = 'none';
    startDate.classList.remove('is-danger');
    document.querySelector('i.material-icons.button').classList.remove('is-danger');
    subtract1.checked = true;
}