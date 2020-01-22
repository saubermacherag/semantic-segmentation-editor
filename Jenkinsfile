pipeline {
    agent {
        node {
            label 'amazon-base'
        }
    }

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    environment {
        ANSIBLE_HOST_KEY_CHECKING = "False"
        ANSIBLE_STDOUT_CALLBACK = "debug"
        ANSIBLE_FORCE_COLOR = "true"
    }

    stages {
        stage('Preparation') {
            steps {
                notifyStarted()
            }
        }
        stage('NPM Install') {
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
                not {
                  changelog '.*\\[CD_ONLY\\].*'
                }
            }
            steps {
                sh 'npm ci'
            }
        }
        stage('build docker image') {
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
                not {
                  changelog '.*\\[CD_ONLY\\].*'
                }
            }
            steps {
                script {
                    docker.build('pinkrobin/apps/labeltool-ui', '--build-arg NODE_ENV=production .')
                    docker.withRegistry('https://023186136873.dkr.ecr.eu-central-1.amazonaws.com', 'ecr:eu-central-1:dockerman') {
                        docker.image('pinkrobin/apps/labeltool-ui').push(env.BRANCH_NAME + '-latest')
                    }
                }
            }
        }
        stage('Deploy') {
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                script {
                    if(env.BRANCH_NAME == 'master'){
                        env.KEYFILE = 'labeltool-production'
                        env.INVENTORY = 'production'
                        echo 'using keyfile labeltool-production'
                    } else {
                        env.KEYFILE = 'labeltool-test'
                        env.INVENTORY = env.BRANCH_NAME
                        echo 'using keyfile labeltool-test'
                    }
                    env.APPLICATION = 'labeltool'
                }
                withCredentials([
                     sshUserPrivateKey(keyFileVariable: 'KEY_FILE', credentialsId: env.KEYFILE),
                     string(variable: 'SLACK_TOKEN', credentialsId: 'slack_token'),
                     usernamePassword(usernameVariable: 'ATLAS_USER', passwordVariable: 'ATLAS_PASSWORD', credentialsId: 'atlas-credentials')
                ]) {
                    sh """
                    rm -rf inventory && git clone git@github.com:saubermacherag/inventory.git
                    ansible-galaxy install --force --roles-path ./inventory/${env.APPLICATION}/${env.INVENTORY}/playbooks/roles -r inventory/${env.APPLICATION}/${env.INVENTORY}/requirements.yml -vv
                    ansible-playbook inventory/${env.APPLICATION}/${env.INVENTORY}/playbooks/deploy.yml \
                    -i inventory/${env.APPLICATION}/${env.INVENTORY}/inventory.yml \
                    -e " \
                    env_path=${WORKSPACE}/inventory/${env.APPLICATION}/${env.INVENTORY}/env/ \
                    hostnames=ui \
                    atlas_api_user=${ATLAS_USER} \
                    atlas_api_token=${ATLAS_PASSWORD} \
                    slack_token=${SLACK_TOKEN} \
                    " \
                    --key-file "${KEY_FILE}" \
                    --extra-vars "@inventory/${env.APPLICATION}/extra.yml" \
                    -vv
                   """
                }
            }
        }
        stage('Create LATEST_STABLE Tag') {
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
                not {
                  changelog '.*\\[CD_ONLY\\].*'
                }
            }
            steps {
                withCredentials([
                    usernamePassword(usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASSWORD', credentialsId: 'saubermacherag-at-github')
                ]) {
                    sh '''
                    export GIT_REPO=$(basename -s .git `git config --get remote.origin.url`)
                    git push https://${GIT_USER}:${GIT_PASSWORD}@github.com/saubermacherag/${GIT_REPO}.git :refs/tags/${BRANCH_NAME}_LATEST_STABLE
                    git tag -f -a ${BRANCH_NAME}_LATEST_STABLE -m "[CI] marker for latest stable commit"
                    git push https://${GIT_USER}:${GIT_PASSWORD}@github.com/saubermacherag/${GIT_REPO}.git ${BRANCH_NAME}_LATEST_STABLE
                    '''
                }
            }
        }
    }
    post {
      success {
        notifySuccess()
      }
      unstable {
        notifyUnstable()
      }
      failure {
        notifyFailed()
      }
    }
}

def notifyBuild(String buildStatus = 'STARTED', String colorCode = '#5492f7', String notify = '') {

  def project = 'semantic-segmentation-editor'
  def channel = "jenkins"
  def base = "https://github.com/saubermacherag/${project}/commit/"

  def commit = sh(returnStdout: true, script: 'git log -n 1 --format="%H"').trim()
  def link = "${base}${commit}"
  def shortCommit = commit.take(6)
  def title = sh(returnStdout: true, script: 'git log -n 1 --format="%s"').trim()
  def subject = "<${link}|${shortCommit}> ${title}"

  def summary = "${buildStatus}: Job <${env.RUN_DISPLAY_URL}|${env.JOB_NAME} [${env.BUILD_NUMBER}]>\n${subject} ${notify}"
  slackSend (
      message: summary,
      baseUrl: "https://saubermacher.slack.com/services/hooks/jenkins-ci/",
      teamDomain: "",
      channel: "${channel}",
      color: colorCode,
      tokenCredentialId: "slack_jenkins_notifier"
  )
}

def author() {
  return sh(returnStdout: true, script: 'git log -n 1 --format="%an" | awk \'{print tolower($1);}\'').trim()
}

def notifyStarted() {
  notifyBuild()
}

def notifySuccess() {
  notifyBuild('SUCCESS', 'good')
}

def notifyUnstable() {
  notifyBuild('UNSTABLE', 'warning', "\nAuthor: @${author()} <${RUN_CHANGES_DISPLAY_URL}|Changelog>")
}

def notifyFailed() {
  notifyBuild('FAILED', 'danger', "\nAuthor: @${author()} <${RUN_CHANGES_DISPLAY_URL}|Changelog>")
}
