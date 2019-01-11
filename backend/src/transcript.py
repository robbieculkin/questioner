import time

class transcript():
    def __init__(self):
        #create a file with a timestamp name
        time_str = time.strftime("%Y%m%d-%H%M%S")
        self.filename = "transcripts/transcript_" + time_str + ".txt"
        file = open(self.filename, "w+")
        file.close()

    def print(self, text):
        #write to self.file
        file = open(self.filename, "a")
        file.write("SYSTEM: " + text + "\n")
        file.close()

        print("SYSTEM: " + text)

    def read(self):
        #read
        text = input("USER: ")

        #write to self.file
        file = open(self.filename, "a")
        file.write("USER: " + text + "\n")
        file.close()