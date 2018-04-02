## Board 

The purpose of this is to gamify the board selection and management process

## Installation

cd generator/

curl https://www.ssa.gov/oact/babynames/names.zip --output names.zip

need to unzip this as names

mkdir ../server/model/

conda create -n BoardGame python=3.6 anaconda
source activate BoardGame
python generator.py

#### Install front end
cd ../frontend/
npm install

when prompted 
Set semantic ui

set out put


? Where should we output Semantic UI? (dist/) ../src/styles

install gulp

npm install --global gulp-cli
