import string

source = """#!/usr/bin/env python3 
# We would like to extend our sincere apologies due to the fiasco
# displayed below. As we all know, when we write python, we should
# closely follow the zen of python. Just to refresh your mind, I'll
# share the most important lines with you again:
\"\"\"
Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
\"\"\"

# Extra safety, make sure no code is run:
quit()

def wish_printer():
    # 
    wish = 'Kalmar says' + ' cheers!!'
    print(wish)
"""

lines = source.split('\n')

ALLOWED_CHARACTERS = string.ascii_letters + string.digits + string.punctuation + ' '

# Loop over lines and let user edit comments:
for i, line in enumerate(lines):
    if i == 0: # We ignore the shebang line of course
        continue
    if not line.lstrip().startswith('#'):
        continue
    print(f'Line {i} is a comment. Currently it is `{line}`. What would you like to append?')
    user_input = input('> ')
    if not all(c in ALLOWED_CHARACTERS for c in user_input):
        print('Make sure to not use any funky characters! We want readable comments!')
        continue
    new_line = line + user_input
    if len(new_line) > 72:
        print('Comment too long! Make sure to follow PEP-8!')
        continue
    lines[i] = new_line

# Write new file
new_python_file = '\n'.join(lines)
with open('commented_code.py', 'w') as wf:
    wf.write(new_python_file)

print(f"\nCommented code succesfully written to file. Here's the code:\n```\n{new_python_file}\n```\n")

# Let's make sure the file is not broken:
try:
    __import__('commented_code')
except SyntaxError as e:
    print('SyntaxError:', str(e))
    quit()

print('Yay, no errors! Thanks for commenting our code!')