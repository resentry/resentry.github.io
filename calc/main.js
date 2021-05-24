let date = document.getElementById('date').valueAsDate = new Date();
let button = document.getElementById('button');
tdate = new Date();
button.onclick = function () {
	location.reload();
}
function calc() {
	if (document.getElementById('date').valueAsDate.getMonth() != tdate.getMonth()) {
		document.getElementById('out').innerHTML = 'Поставьте текущий месяц!';
		return;
	}
	let lastMonth = document.getElementById('last-Month').value;
	let thisMonth = document.getElementById('this-Month').value;
	var today = document.getElementById('date').valueAsDate.getDate() - 1;
	today = Number(today);
	Date.prototype.daysInMonth = function () {
		return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
	};
	var dayInMonth = new Date().daysInMonth();
	dayInMonth = Number(dayInMonth);
	let result = (((parseFloat(thisMonth) - parseFloat(lastMonth)) / today) * dayInMonth) + parseFloat(lastMonth);
	console.log(document.getElementById('date').valueAsDate.getMonth());
	if (!isNaN(result)) {
		document.getElementById('out').innerHTML = 'Расчетные показания счетчика в конце этого месяца будут - ' + "<br \/>" + result.toFixed(2);
	}
}

