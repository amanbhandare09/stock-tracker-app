import datetime

#--------> Static date setting
# month="June"
# month_three = "Jun"
# year="2024"
# date="30"
# month_number=6
# last_month_day="30.06.2024"
# datehypen="30-06-2024"

# #--------> Dynamic date setting
today = datetime.date.today()
first_day_of_current_month = today.replace(day=1)
last_day_of_previous_month = first_day_of_current_month - datetime.timedelta(days=1)

month = last_day_of_previous_month.strftime("%B")
month_three = last_day_of_previous_month.strftime("%b")
year = last_day_of_previous_month.strftime("%Y")
date = last_day_of_previous_month.strftime("%d")
month_number = last_day_of_previous_month.month
last_month_day = last_day_of_previous_month.strftime("%d.%m.%Y")
datehypen = last_day_of_previous_month.strftime("%d-%m-%Y")
specific_date = f"{last_day_of_previous_month.day}{'th' if 10 <= last_day_of_previous_month.day % 100 <= 20 else {1: 'st', 2: 'nd', 3: 'rd'}.get(last_day_of_previous_month.day % 10, 'th')}-{last_day_of_previous_month.strftime('%B')}-{last_day_of_previous_month.strftime('%Y')}"
current_month_number = datetime.date.today().strftime("%m")

print("month:", month)
print("month_three:", month_three)
print("year:", year)
print("date:", date)
print("month_number:", month_number)
print("last_month_day:", last_month_day)
print("datehypen:", datehypen)
print("specific_date:", specific_date)
