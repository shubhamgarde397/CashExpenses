import sys
# print("First name: " + sys.argv[1])
# print("Last name: " + sys.argv[2]

filepath = "FILES_SERVER/light.txt"
response = []
with open(filepath) as fp:
    line = fp.readline()
    cnt = 1
    flag = False
    while line:
        try:
            if (int(line[0:2]) and int(line[3:5]) and int(line[6:8])):
                try:
                    if int(line[11]):
                        flag = True
                except ValueError:
                    flag = False

                if flag:
                    response.append(
                        {"Date": line[0:8], "Time": line[10:18], "Message": line[21:].split(":")})
                    line = fp.readline()
                else:
                    response.append(
                        {"Date": line[0:8], "Time": line[10:17], "Message": line[20:].split(":")})
                    line = fp.readline()
        except ValueError:
            response[-1]['Message'][1] += line[0:]
            line = fp.readline()
    print(response)
