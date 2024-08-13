import sys
import io

code ="""
val = [i*2 for i in range(10)]
print(val)
"""

def test_code(code):
  buffer = io.StringIO()
  sys.stdout = buffer

  try:
      exec(code)
  except Exception as e:
      output = str(e)
  else:
      output = buffer.getvalue()
  finally:
      output=output.replace("\n"," ")
      sys.stdout = sys.__stdout__ # obnova výstupu
      buffer.close()

  return output.strip()