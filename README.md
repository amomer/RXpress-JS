# **RXpress**

RXpress is a comprehensive pharmaceutical mobile application that will allow users to conveniently track information related to recurring prescriptions and potential medications for themselves and their family. The application is designed to make medication use simpler, easier, and safer for users through the use of various design functionalities (further detailed here: https://github.com/SCCapstone/RXpress/wiki/Design).  
Due to advancements in the field of pharmacology, the variety of medications available can be too intricate and numerous for consumers to safely and effectively utilize all the medicine they need. There is a rising need for a user-friendly application to cater to information regarding drug interactions, dosage frequency, drug usage, and other general knowledge.

## External Requirements

There are various ways to build the project. We recommend using the Expo Go app. It only requires:

- [Node.js] (https://nodejs.org/en/download/)
- [npm] (nodes default package manager that typically comes with installing node.)
- [ExpoGo] - An app that can be downloaded on Android or iOS devices (https://expo.dev/client)

### To download from Windows Command Prompt:

This method uses Chocolatey (https://chocolatey.org/install)  
More detailed installation instructions can be found here: (https://vocon-it.com/2019/11/19/install-npm-using-chocolatey-on-windows/)

1. Open Command Prompt as an Administrator (right click the icon and "Run as Administrator"). Type the following command:

```
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

2. Now run the following command to install our recommended version of Node (anything past v14.x. In this case we are doing v16.17.1)

```
choco install -y --force nodejs@v16.17.1
```

Earlier versions may work as well, and can be installed by changing the content after the @. 3. Once the installation is finished, you can check the versions with these commands to ensure they were installed properly:

```
node -v
```

```
npm i -g npm
```

### To download using Ubuntu 20.04

More detailed instructions can be found here: (https://linuxize.com/post/how-to-install-node-js-on-ubuntu-20-04/)  
We will be downloading Node.js and npm from NodeSource to ensure a more recent version is installed, in this case v14.x.

1. Run these commands with sudo privileges, first installing NodeSource:

```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
```

To change the version being downloaded, alter the number after "setup\_". 2. Now run the following line:

```
sudo apt install nodejs
```

3. We can now verify proper installation by checking the versions with the following lines:

```
node --version
```

```
npm --version
```

4. (Optional) It is also suggested to have further development tools installed as a safety to reduce the odds of issues with compiling. Simply run the following line if desired:

```
sudo apt install build-essential
```

## Downloading Android Studio Linux:
1. In order to download android studio visit this site here https://developer.android.com/studio/?gclid=CjwKCAjwzNOaBhAcEiwAD7Tb6M0YFFxHoxSksK9TvKzpjvj7BLae3METQdU2saXCccq9tC-Xako3CxoCttoQAvD_BwE&gclsrc=aw.ds click the button that says Download Andriod Studio    
2. When download is complete you will click next  
3. Then you will click standard installation or custom optional  
4. check the Download components such as 'Android Emulator' 'Android SDK Build-Tools' 'Android SDK Platform' 'Android SDK Platform-Tools' 'Emulator Accelerator' 'SDK Patch Applier' and 'Sources for Android' , then click finish.
5. If on linux or windows you will edit your
``` 
vim ~./bash_profile
```
6. add the line 
```
export ANDROID_SDK=/Users/myuser/Library/Android/sdk
```
To get the path in the instruction above open the SDK Manager and the path is at the top of the window. Copy this path and paste it in the ./~bash_profile
7. Also you will need to add platform-tools to the 
```
vim ./~bash_profile
```
```
PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH
```
note: the path is the same as your SDK in step 6.
8. run in terminal the command below. if there is an error the path was put in incorrectly  
``` 
adb
```  

## Setup

To run the app on a physical mobile device using Expo Go, users will need to simply:

1. Download the Expo Go app.
2. Follow the steps to create an Expo account.
3. Ensure the physical mobile device is connected to the same local network as the computer building the app.

To run the app on the android studio emulator you will open up android studio and:  

1. Open Up SDK Manager  
2. SDK Platform should have the most up to date version of android i.e. Tiramisu.
3. SDK Tools 'Android Emulator' 'Android SDK Platform-Tools' and the Emulator Accelorator should all be selected. If not selected select them and android studio will download them for you 
4. Go to ADV Manager in android studio
5. Click Create Virtual Device  
6. Select the Hardware that you want to emulate
7. click next
8. Select the latest stable operating system.
9. Click next.
10. You Can now give it a name and click finish
## Running

Once the repo is cloned, the app can be easily run with Expo Go.

1. While in the app folder in a command prompt, run either one of the following two commands:

```
npm start
```

```
npx expo start
```

2. Once the build is complete, a QR code should appear in the terminal to allow use of the Expo Go app.

3. Optionally, the app can be run on a virtual android device as well. To run on Android Studios, the following command can be used:

```
npm run android
```

# Deployment

### Deploying in Expo Go

With Expo Go setup properly and the app built in the terminal, deployment on Expo Go is convenient. (https://reactnative.dev/docs/environment-setup)

1. On an android device, the QR code in the terminal can be scanned within Expo Go to run the app automatically.
2. On ios devices, the QR code in the terminal can be scanned through the default camera app. The code will link to the Expo app. Tap the link and our project should run automatically

# Testing

## Testing Technology

## Running Tests

# Authors

Alexis Anderson aka4@email.sc.edu  
Amjad Omer - amomer@email.sc.edu  
Abhinav Myadala - myadala@email.sc.edu  
Brendan Reeder - br17@email.sc.edu
