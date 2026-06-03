#!/usr/bin/python3

import os,sys

#####################################
# function to convert numbers to Roman numerals
#####################################
def intToRoman(num):
    # storing Roman values of digits from 0-9 when placed at different places
    m = ["", "M", "MM", "MMM"]
    c = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"]
    x = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"]
    i = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
 
    # converting to Roman
    thousands = m[num // 1000]
    hundreds = c[(num % 1000) // 100]
    tens = x[(num % 100) // 10]
    ones = i[num % 10]
    ans = (thousands + hundreds + tens + ones)
 
    return ans

#####################################
# change to directory of the script
#####################################
pathOfTheScript = os.path.dirname(sys.argv[0])
if pathOfTheScript != "": os.chdir(pathOfTheScript)


#####################################
# settings/setup
#####################################
latexOutputFile = "numbersFromScript.tex"
latexOutputString = ""


#####################################
# main part of the script
#####################################

# ... compute keyMetric
keyMetric1 = 42
latexOutputString += "\\newcommand{\\KeyMetricOne}{" + str(keyMetric1) + "}\n"

# ... another keyMetric
keyMetric2 = 314
latexOutputString += "\\newcommand{\\KeyMetricTwo}{" + str(keyMetric2) + "}\n"

# ... a string metric
myString = 'hello world'
latexOutputString += "\\newcommand{\\KeyMetricString}{" + str(myString) + "}\n"

# ... macro with number in name
year = 2026
keyMetric3 = 3.14159265358979323846
latexOutputString += "\\newcommand{\\KeyMetricIn" + intToRoman(year) + "}{" + str(keyMetric3) + "}\n"

with open(latexOutputFile, "w") as text_file:
    text_file.write(latexOutputString)
