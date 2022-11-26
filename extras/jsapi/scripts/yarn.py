import sys
import os
import subprocess
from shutil import which

__dir__ = os.path.dirname(os.path.dirname(__file__))  # dirname/..
os.chdir(__dir__)
sys.exit(subprocess.call([which("yarn"), *sys.argv[1:]]))
