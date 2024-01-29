import tkinter
import tkinter.messagebox
import pickle
from turtle import width

windows = tkinter.Tk()
windows.title("Momo ToDo")

def add_task():
    task = entry_task.get()
    if task != "":
        listbox_tasks.insert(tkinter.END, task)
        entry_task.delete(0, tkinter.END)
    else:
        tkinter.messagebox.showerror(title="Warning!", message="You must enter a task")

def delete_task():
    try:
        task_index = listbox_tasks.curselection() [0]
        listbox_tasks.delete(task_index)
    except:
        tkinter.messagebox.showwarning(title="Warning!", message="You must select a task.")

def load_task():
    tasks = pickle.load(open("tasks.dat", "rb"))
    listbox_tasks.delete(0, tkinter.END)
    for task in tasks:
        listbox_tasks.insert(tkinter.END, task)

def save_task():
    tasks = listbox_tasks.get(0, listbox_tasks.size())
    pickle.dump(tasks, open("tasks.dat", "wb"))

def delete_all():
    listbox_tasks.delete(0, tkinter.END)

#Create GUI
frame_tasks = tkinter.Frame(windows)
frame_tasks.pack()

listbox_tasks = tkinter.Listbox(frame_tasks, height=10, width=50)
listbox_tasks.pack(side=tkinter.LEFT)

scrollbar_tasks = tkinter.Scrollbar(frame_tasks)
scrollbar_tasks.pack(side=tkinter.RIGHT, fill=tkinter.Y)

listbox_tasks.config(yscrollcommand=scrollbar_tasks.set)
scrollbar_tasks.config(command=listbox_tasks.yview)

entry_task = tkinter.Entry(windows, width=50)
entry_task.pack()

button_add_task = tkinter.Button(windows, text="Add task", width=48, command=add_task)
button_add_task.pack()

button_delete_task = tkinter.Button(windows, text="Delete task", width=48, command=delete_task)
button_delete_task.pack()

button_load_task = tkinter.Button(windows, text="Load tasks", width=48, command=load_task)
button_load_task.pack()

button_save_task = tkinter.Button(windows, text="Save tasks", width=48, command=save_task)
button_save_task.pack()

button_delete_all = tkinter.Button(windows, text="Delete All", width=48, command=delete_all)
button_delete_all.pack()


windows.mainloop()