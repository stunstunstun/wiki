## Jenkins with Github private repository webhook

```
$ sudo service jenkins start
```

`Download and install GitHub plugin`

- Manage Jenkins > Manage Plugins > Available > GitHub plugin

## Set ssh key up for deployment on Jenkins with Github.

- Create ssh key.

    ```
    $ cd $HOME/.ssh
    $ ssh-keygen -t rsa -b 4096 -C "deploy_key_for_myproject"
    Enter a file in which to save the key (/path/myhome/.ssh/id_rsa): /path/myhome/.ssh/deploy_key_for_myproject
    Enter passphrase (empty for no passphrase): [Type enter]
    Enter same passphrase again: [Type enter]
    ```

    + Each project needs different deploy keys. If you want to deploy two or more projects, you have to create ssh keys for each projects.

- Copy ssh configuration and key for Jenkins

    ```
    $ sudo cp config deploy_key_for_myproject deploy_key_for_myproject.pub /var/lib/jenkins/.ssh/
    $ sudo chown -R jenkins:jenkins /var/lib/jenkins/.ssh/
    ```

- Add ssh key to your github project setting > Deploy keys.
    + Copy public key and paste it on github project setting > Deploy keys menu.

    ```
    $ cat deploy_key_for_myproject.pub
    ```

- Add Webhook URL to your github project setting > Webhooks & services > Add Webhook
    + Fill in each fields with your infomation.
        * Fill in Payload URL with ```http://ci.mydomain.com:8080/github-webhook/```
        * Content type: application/json
        * Empty Secret field.
        * Which events would you like to trigger this webhook?: Just the push event.
        * Check 'Active'
        * Click 'Add webhook' button.
    + To use webhook, you have to open port that used for jenkins as public. It's very dangerous way. Check up on this [What IP addresses does GitHub use that I should whitelist?](https://help.github.com/articles/what-ip-addresses-does-github-use-that-i-should-whitelist/) page and open port for github's IP range only.

- Add github RSA key to known host list.

    ```
    $ ssh-agent bash -c 'ssh-add /path/myhome/.ssh/deploy_key_for_myproject; git -c core.askpass=true ls-remote -h git@github.com:myuser/myproject'
    The authenticity of host 'github.com (...)' can't be established.
    RSA key fingerprint is ...
    Are you sure you want to continue connecting (yes/no)? [Type yes]
    ```

    - Or you can run ssh-agent automatically and connect to github.com through it.
    
        - Add ssh configuration.
    
            ```
            $ vi ~/.ssh/config
            Host github.com
              ForwardAgent yes
            ```
            
            - If you want to use multiple accounts or keys, set host as alias you want. And set git remote url to that.
            
                ```
                $ vi ~/.ssh/config
                Host a.github.com
                  HostName github.com
                  PreferredAuthentications publickey
                  IdentityFile /path/to/.ssh/deploy_key_a
                
                Host b.github.com
                  HostName github.com
                  PreferredAuthenticatoins publickey
                  IdentityFile /path/to/.ssh/deploy_key_b
                ```
                
                ```
                $ cd /path/to/project_a
                $ ssh -T git@a.github.com
                Hi username! You've successfully authenticated, but GitHub does not provide shell access.
                $ git remote set-url origin git@a.github.com:username/project-a.git
                $ cd /path/to/project_b
                $ ssh -T git@b.github.com
                Hi username! You've successfully authenticated, but GitHub does not provide shell access.
                $ git remote set-url origin git@a.github.com:username/project-b.git
                ```

        - Run ssh-agent automatically when you logged in.

            ```
            $ vi ~/.bash_profile
            ...
            if [ -z "$SSH_AUTH_SOCK" ] ; then
              echo '\nRunning ssh-agent and add keys.'
              eval `ssh-agent -s`
              ssh-add '/path/to/ssh_key'
              echo ''
            fi
            ...
            ```

- Clone project to deployment target location.
    
    ```
    $ cd $HOME
    $ mkdir dist
    $ cd dist
    $ ssh-agent bash -c 'ssh-add /path/myhome/.ssh/deploy_key_for_myproject; git clone git@github.com:myuser/myproject.git'
    $ sudo chown -R jenkins:jenkins myproject
    ```

- Log on as jenkins account and add github RSA key to known host list for jenkins account.

    ```
    $ sudo su - jenkins
    $ cd $HOME/.ssh
    $ git -c core.askpass=true ls-remote -h git@github.com:myuser/myproject
    The authenticity of host 'github.com (...)' can't be established.
    RSA key fingerprint is ...
    Are you sure you want to continue connecting (yes/no)? [Type yes]
    ```

## Create Jenkins job for Github Webhooks.
- Create new job
- Check 'GitHub project' and fill in 'Project url' field with ```https://github.com/myuser/myproject/```
- Check 'Git' in Source code section and fill in 'Repository URL' field with ```git@github.com:myuser/myproject.git```.
    - Click 'Add' button in 'Credentials' field.
        - Kind: SSH Username with private key
        - Scope: Global
        - Username: git
        - Private Key: 'From a file on Jenkins master' and fill in the 'File' field with ```/var/lib/jenkins/.ssh/deploy_key_for_myproject```.
    - Select one added just now.
- Check 'Build when a change is pushed to GitHub'
- Click 'Add build step' and choose 'Execute shell'
    - Fill in with ```ssh-agent bash -c 'ssh-add /var/lib/jenkins/.ssh/deploy_key_for_myproject; git -C "/path/to/myproject" pull >> /var/log/jenkins/jenkins.log'```


## Set Jenkins up behind Nginx with SSL.
- Nginx conf file. (recommended location: /etc/nginx/sites-available/jenkins.conf and link it to /etc/nginx/sites-enabled/jenkins.conf)

    ```
    upstream jenkins {
        server localhost:8080 fail_timeout=0;
    }

    server {
        listen      8443;
        server_name ci.mydomain.com;
        charset     utf-8;

        ssl on;
        ssl_certificate      /path/to/fullchain.pem;
        ssl_certificate_key  /path/to/privatekey.pem;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
        ssl_prefer_server_ciphers on;

        access_log /var/log/nginx/access-jenkins.log;
        error_log /var/log/nginx/error-jenkins.log;

        location / {
            sendfile off;
            add_header Pragma "no-cache";

            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Forwarded-Port 8443;
            proxy_set_header X-Forwarded-Ssl on;

            proxy_pass http://localhost:8080;
            proxy_redirect http://localhost:8080 https://ci.mydomain.com:8443;

            client_max_body_size 10m;
            client_body_buffer_size 128k;

            proxy_connect_timeout 90;
            proxy_send_timeout 90;
            proxy_read_timeout 90;

            proxy_buffer_size 4k;
            proxy_buffers 4 32k;
            proxy_busy_buffers_size 64k;
            proxy_temp_file_write_size 64k;
        }
    }
    ```

- Jenkins conf file(default location: /etc/default/jenkins)

    ```
    NAME=jenkins
    JAVA=/usr/bin/java
    JAVA_ARGS="-Djava.awt.headless=true"
    PIDFILE=/var/run/$NAME/$NAME.pid
    JENKINS_USER=$NAME
    JENKINS_GROUP=$NAME
    JENKINS_WAR=/usr/share/$NAME/$NAME.war
    JENKINS_HOME=/var/lib/$NAME
    RUN_STANDALONE=true
    JENKINS_LOG=/var/log/$NAME/$NAME.log
    MAXOPENFILES=8192
    HTTP_PORT=8080
    HTTPS_PORT=-1
    AJP_PORT=-1
    PREFIX=/$NAME

    JENKINS_ARGS="--webroot=/var/cache/$NAME/war --ajp13Port=$AJP_PORT --httpPort=$HTTP_PORT --httpsPort=$HTTPS_PORT"
    ```


## Misc.
- Configure for ssh.
    
    ```
    $ vi config
    ForwardAgent yes
    UserKnownHostsFile ~/.ssh/known_hosts

    Host myproject_deploy_key
        HostName       github.com
        User           git
        IdentityFile   /path/myhome/.ssh/myproject_deploy_key
        IdentitiesOnly yes
    ```
    
- Fix java.security.InvalidAlgorithmParameterException
    - If some test connection to other server failed, try below solution.

    ```
    $ sudo update-ca-certificates -f
    $ sudo /var/lib/dpkg/info/ca-certificates-java.postinst configure
    ```
    
    - Refer to [Error - trustAnchors parameter must be non-empty](http://stackoverflow.com/questions/6784463/error-trustanchors-parameter-must-be-non-empty/25188331#25188331)


## References
- [Installing Jenkins on Ubuntu](https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Ubuntu)
- [Generating an ssh key](https://help.github.com/articles/generating-an-ssh-key/)
- [What IP addresses does GitHub use that I should whitelist?](https://help.github.com/articles/what-ip-addresses-does-github-use-that-i-should-whitelist/)
- [Jenkins behind an NGinX reverse proxy](https://wiki.jenkins-ci.org/display/JENKINS/Jenkins+behind+an+NGinX+reverse+proxy)
- [Trying to run Jenkins behind SSL reverse proxy](http://serverfault.com/questions/743110/trying-to-run-jenkins-behind-ssl-reverse-proxy-404-http-localhost-jenkins-ma)
- [About GitHub Authentication Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Github+OAuth+Plugin)
- [Using ssh-agent forwarding](https://developer.github.com/guides/using-ssh-agent-forwarding/)

