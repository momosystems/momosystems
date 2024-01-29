from tkinter import *
from time import *

def update():
    time_string = strftime("%H:%M:%S")
    time_label.config(text=time_string)

    day_string = strftime("%A")
    day_label.config(text=day_string)

    date_string = strftime("%d %B %Y")
    date_label.config(text=date_string)

    windows.after(1000,update)

windows = Tk()
windows.title("Momo Clock")

time_label = Label(windows,font=("Arial",50),fg="#00FF00",bg="black")
time_label.pack()

day_label = Label(windows,font=("Ink Free",25))
day_label.pack()

date_label = Label(windows,font=("Arial",30))
date_label.pack()

update()

windows.mainloop()