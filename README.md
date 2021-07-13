# MLAPP

Deep Learning application for PCB defect finder

## Pre-requisites:
Download Python 3.x.x version from

```
https://www.python.org/downloads/
```

Download and install Node.js from
```
https://nodejs.org/en/download/
```
_(Optional) If you want to install Git, you can download and install Git from_
```
https://git-scm.com/downloads
```
Clone this repo using the following command
```
git clone https://github.com/techfm2021/MLAPP.git
``` 
>You can also `Download as Zip` and extract it in your local in case you do not want to use `git clone` command above<br/>

We use the following sample dataset downloaded from 
```
https://github.com/tangsanli5201/DeepPCB/tree/master/PCBData
```
> Attribute to Tangsanli

## Instructions to configure for first time:
<!-- Extract the following zip files
- mlweb.zip
- mlapp.zip
- pcbdata.zip -->
Once this repo is cloned or downloaded, navigate to the base directory

Open terminal/cmd and enter:

```
pip install -r requirements.txt
```

Navigate to the `mlweb` folder

Open terminal/cmd and enter:

```
npm install react-scripts
```

<!-- Rename the `PCBData` folder to `data` -->

## Instructions to run:

Navigate to the `mlweb` folder open terminal/cmd and enter:
```
npm start
```
Navigate to the `mlapp` folder open terminal/cmd and enter: 
```
python mlapp_flask.py
```
