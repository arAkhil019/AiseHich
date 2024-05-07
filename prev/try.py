import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from time import sleep
from selenium.webdriver.common.keys import Keys
from time import sleep

# Read the Excel file
df = pd.read_csv('trail.csv')

# Initialize the WebDriver
driver = webdriver.Chrome(options=webdriver.ChromeOptions())
driver.get('https://web.whatsapp.com')
sleep(10)  # Wait for the user to scan the QR code

# Iterate through the mobile numbers and send messages
for index, row in df.iterrows():
    mobile_number = str(row['Phone'])
    message = "HI, this is test."

    # Search for the contact
    search_box = driver.find_element_by_xpath('//div[contains(@class, "copyable-text selectable-text")]')
    search_box.clear()
    search_box.send_keys(mobile_number)
    search_box.send_keys(Keys.ENTER)
    sleep(2)

    # Type and send the message
    message_box = driver.find_element_by_xpath('//div[contains(@class, "copyable-text selectable-text")]')
    message_box.send_keys(message)
    message_box.send_keys(Keys.ENTER)
    sleep(2)

# Close the WebDriver
driver.quit()
