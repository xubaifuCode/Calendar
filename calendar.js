var record_year, record_month, curr_year, curr_month, curr_day;
var max_days = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);



function $(elemId) {
	return document.getElementById(elemId);
}

function initCalendar() {
	var t_date = new Date();
	var t_year = t_date.getFullYear();
	var t_month = t_date.getMonth() + 1;//because the month start with zero,  it have to plus one.
	curr_year = t_year;
	curr_month = t_month;
	curr_day = t_date.getDate();
	setInputYear(t_year);
	setInputMonth(t_month);
	refreshCalendar(t_year, t_month);
}

function refreshCalendar(t_year, t_month) {
	record_year = t_year;
	record_month = t_month;
	
	var start_day = getFirstWeek(t_year, t_month);
	var max_day = max_days[t_month - 1];
	var elem_days = $("days");
	var tr_elem = document.createElement("tr");
	var td_elem = document.createElement("td");

	elem_days.innerHTML = "";
	
	//如果第一天不是星期天，那么需要隐藏前start_day列
	if(start_day != 0) {
		td_elem.setAttribute("colspan", start_day);
		td_elem.style.visibility = "hidden";
		tr_elem.setAttribute("class", "day");
		tr_elem.appendChild(td_elem);
	}
	
	var t_day = start_day;
	
	//动态添加节点
	for(var i = 1; i <= max_day; i++) {
		td_elem = document.createElement("td");
		td_elem.innerHTML = i;
		tr_elem.appendChild(td_elem);
			
		if(++t_day % 7 == 0 || i == max_day) {
			elem_days.appendChild(tr_elem);
			tr_elem = document.createElement("tr");
			tr_elem.setAttribute("class", "day");
		}
	}
	
	if(record_year == curr_year && curr_month == record_month) {
		var target = document.getElementById("days").getElementsByTagName("td")[curr_day];
		target.style.backgroundColor = "#FF5722";
		target.style.color = "#FFF";
	}
}

/*年份被改变时，此函数激活，令输入框失去焦点，根据年份修改2月的天数，再重绘阅日历*/
function yearChange() {
	var year_obj = $("in_year");
	var in_year = year_obj.value;
	year_obj.blur();
	if (!isYearValid(in_year)) {
		initCalendar();
		alert("Cannot change to be this year.");
		return;
	}  else {
		max_days[1] = isLeap(in_year) ? 29 : 28;
		refreshCalendar(in_year, record_month);
	}
}

/*月份被更改时此函数激活，令失去焦点又重绘表格*/
function monthChange() {
	var month_obj = $("in_month");
	var in_month = month_obj.value;
	month_obj.blur();
	if (!isMonthValid(in_month)) {
		initCalendar();
		alert("Cannot change to be this month.");
		return;
	}  else {
		refreshCalendar(record_year, in_month);
	}
}

function setInputYear(in_year) {
	$("in_year").value = in_year;
}

function setInputMonth(in_month) {
	$("in_month").value = in_month;
}

function isMonthValid(in_month) {
	var month_reg = /\d{1,2}/;
	return in_month >= 1 && in_month <= 12 && month_reg.test(in_month);
}

function isYearValid(in_year) {
	var year_reg = /\d{4}/;
	return year_reg.test(in_year);
}

function getFirstWeek(t_year, t_month) {
	var t_date = new Date(t_year, t_month - 1);
	return t_date.getDay();
}

function isLeap(t_year) {
	return (t_year % 4 == 0 && t_year % 100 != 0) || t_year % 400 == 0;
}