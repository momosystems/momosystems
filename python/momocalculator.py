from tkinter import *
from turtle import width


def botton_press(num):

    global equation_text

    equation_text = equation_text + str(num)
    equation_label.set(equation_text)

def equals():

    global equation_text

    try:
        total = str(eval(equation_text))

        equation_label.set(total)

        equation_text = total

    except ZeroDivisionError:
        equation_label.set('arithmetic error')

        equation_text = ''
    except SyntaxError:
        equation_label.set('invalid syntax')

        equation_text = ''

def clear():

    global equation_text

    equation_label.set('')

    equation_text = ''

window = Tk()
window.title('Calculator')
window.geometry('500x500')

equation_text = ''

equation_label = StringVar()

label = Label(window, textvariable=equation_label, font=('consolas',20), bg='white', width=24, height=2)
label.pack()

frame = Frame(window)
frame.pack()

botton1 = Button(frame, text=1, height=4, width=9, font=35,
                 command= lambda: botton_press(1))
botton1.grid(row=0,column=0)

botton2 = Button(frame, text=2, height=4, width=9, font=35,
                 command= lambda: botton_press(2))
botton2.grid(row=0,column=1)

botton3 = Button(frame, text=3, height=4, width=9, font=35,
                 command= lambda: botton_press(3))
botton3.grid(row=0,column=2)

botton4 = Button(frame, text=4, height=4, width=9, font=35,
                 command= lambda: botton_press(4))
botton4.grid(row=1,column=0)

botton5 = Button(frame, text=5, height=4, width=9, font=35,
                 command= lambda: botton_press(5))
botton5.grid(row=1,column=1)

botton6 = Button(frame, text=6, height=4, width=9, font=35,
                 command= lambda: botton_press(6))
botton6.grid(row=1,column=2)

botton7 = Button(frame, text=7, height=4, width=9, font=35,
                 command= lambda: botton_press(7))
botton7.grid(row=2,column=0)

botton8 = Button(frame, text=8, height=4, width=9, font=35,
                 command= lambda: botton_press(8))
botton8.grid(row=2,column=1)

botton9 = Button(frame, text=9, height=4, width=9, font=35,
                 command= lambda: botton_press(9))
botton9.grid(row=2,column=2)

botton0 = Button(frame, text=0, height=4, width=9, font=35,
                 command= lambda: botton_press(0))
botton0.grid(row=3,column=0)

plus = Button(frame, text='+', height=4, width=9, font=35,
                 command= lambda: botton_press('+'))
plus.grid(row=0,column=3)

minus = Button(frame, text='-', height=4, width=9, font=35,
                 command= lambda: botton_press('-'))
minus.grid(row=1,column=3)

multiply = Button(frame, text='*', height=4, width=9, font=35,
                 command= lambda: botton_press('*'))
multiply.grid(row=2,column=3)

divide = Button(frame, text='/', height=4, width=9, font=35,
                 command= lambda: botton_press('/'))
divide.grid(row=3,column=3)

equal = Button(frame, text='=', height=4, width=9, font=35,
                 command= equals)
equal.grid(row=3,column=2)

decimal = Button(frame, text='.', height=4, width=9, font=35,
                 command= lambda: botton_press('.'))
decimal.grid(row=3,column=1)

clear = Button(window, text='CLEAR', height=4, width=12, font=35,
                 command=clear)
clear.pack()

window.mainloop()