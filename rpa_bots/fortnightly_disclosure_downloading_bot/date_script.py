import datetime

#--------> Static date setting
# month="July"
# month_three = "Jul"
# year="2024"
# date="31"
# month_number=7
# last_month_day="31.07.2024"
# datehypen="31-07-2024"
# date_suffix="31st"


# #--------> Dynamic date setting
# Get today's date
today = datetime.date.today()

# Determine the latest fortnightly date
if today.day >= 15:
    latest_fortnight_date = today.replace(day=15)
else:
    first_day_of_current_month = today.replace(day=1)
    latest_fortnight_date = first_day_of_current_month - datetime.timedelta(days=1)

# Extracting the required details from the latest fortnightly date
month = latest_fortnight_date.strftime("%B")
month_three = latest_fortnight_date.strftime("%b")
year = latest_fortnight_date.strftime("%Y")
date = latest_fortnight_date.strftime("%d")
month_number = latest_fortnight_date.month
month_number_with_zero = f"{latest_fortnight_date.month:02}"
fortnight_day_dot_format = latest_fortnight_date.strftime("%d.%m.%Y")
fortnight_day_hyphen_format = latest_fortnight_date.strftime("%d-%m-%Y")

# Generate specific date formats with suffix
date_suffix = f"{latest_fortnight_date.day}{'th' if 10 <= latest_fortnight_date.day % 100 <= 20 else {1: 'st', 2: 'nd', 3: 'rd'}.get(latest_fortnight_date.day % 10, 'th')}"
specific_date = f"{date_suffix}-{latest_fortnight_date.strftime('%B')}-{latest_fortnight_date.strftime('%Y')}"
specific_date_without_hyphen = f"{date_suffix} {latest_fortnight_date.strftime('%B')} {latest_fortnight_date.strftime('%Y')}"

# Print the results
print("Month (full name):", month)
print("Month (abbreviation):", month_three)
print("Year:", year)
print("Date:", date)
print("Month number:", month_number)
print("Month number with zero:", month_number_with_zero)
print("Fortnightly Day (dd.mm.yyyy):", fortnight_day_dot_format)
print("Fortnightly Day (dd-mm-yyyy):", fortnight_day_hyphen_format)
print("Specific date (with suffix and hyphen):", specific_date)
print("Specific date (with suffix, no hyphen):", specific_date_without_hyphen)
print("Date suffix:", date_suffix)

current_month_number = today.strftime("%m")
print("Current month number:", current_month_number)
