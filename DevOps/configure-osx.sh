#!/bin/bash

<<COMMENT
✨ Simple Installation of the latest Brew, Cask, Git, Node.js, and visual-studio-code for OSX!
@Author: Minhyeok Jung
@License: MIT

[Example Usage]
Download this file, and from the directory, run in terminal
chmod +x configure.sh
sudo ./configure.sh
COMMENT

# Apple Download CLI Tools
xcode-select --install

# Install Brew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# Make sure Brew has permissions
brew doctor

# Update Brew
brew update

# Install Brew Cask, for terminal app installs
brew install caskroom/cask/brew-cask

# Install nvm, Node.js
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
command -v nvm
nvm install 6
nvm install 8
nvm alias default 8
node --version

# Updates npm packages
npm update npm -g
npm install -g yarn
yarn --version
yarn global add gulp pm2
gulp --version
pm2 --version

# Install MongoDB and start mongod
brew install mongodb
brew services start mongod

# Install Git, print version
brew upgrade git
git --version

# Install Visual Studio Code
brew cask install visual-studio-code

# Install JDK, jenv
brew install java
git clone https://github.com/gcuisinier/jenv.git ~/.jenv
echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(jenv init -)"' >> ~/.bash_profile
jenv add /Library/Java/JavaVirtualMachines/jdk-9.0.1.jdk/Contents/Home/
jenv global system
java --version

# Install Docker
brew install docker
docker --version

# Apply sources
source .bash_profile
