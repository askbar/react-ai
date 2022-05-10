import java.text.SimpleDateFormat

def name = "ai-workshop"
def version

def groupArtifactPath = "dk/topdanmark/ask"
def groupId = "dk.topdanmark.ask"	 
def artifactoryBaseUrl = "http://artifactory.topdanmark.local/artifactory"
def artifactoryReleaseLib = "libs-release-local"
def artifactorySnapshotLib = "libs-snapshot-local"
def artifactFile
def deploySkipMessage = "Only commits to the master branch is deployed. You can manually deploy the snapshot artifact through Laurel."

node('ecs2') {

    ansiColor('xterm') {		   

		stage ('git'){
			checkout scm
		}

        withEnv(['CI=true']) {
            try {
                stage('build') {
                    sh """
                    npm install
                    npm run prettier:check
                    npm run test:ci -- --ci --coverage --reporters=default --reporters=jest-junit
                    npm run build
                    """
                }
            } finally {
                junit 'junit.xml'
            }
        }

		stage ('package') {
            // Create version
            def date = new Date()
            sdf = new SimpleDateFormat("yyyyMMdd'T'HHmmss")
            def gitHash = sh (script: "git rev-parse --short HEAD", returnStdout: true)
            gitHash = gitHash.trim()
            version = sdf.format(date) + "H" + gitHash

            // prepare url to artifact
            if("${env.BRANCH_NAME}" == 'master') {
                version = version
                artifactFile = artifactoryBaseUrl + '/' + artifactoryReleaseLib + '/' + groupArtifactPath + '/' + name + '/' + version + '/' + name + '-' + version + '.zip'
            } else {
                version = version + '-SNAPSHOT'
                artifactFile = artifactoryBaseUrl + '/' + artifactorySnapshotLib + '/' + groupArtifactPath + '/' + name + '/' + version + '/' + name + '-' + version + '.zip'
            }

            // Pack dist
		    sh('echo "VERSION=' + version + '" > build/version.conf')
			sh('zip -r dist.zip build')
			sh('zip -ur dist.zip etc')

            println "version " + version
            println "artifactFile: " + artifactFile
		}

		stage ('artifactory') {
            String[] artifacts = ["dist.zip"]
            topComplianceAWS(groupId, version, artifacts)
		}

        stage('deploy dev-01') {
            if('master'=="${env.BRANCH_NAME}" && "${currentBuild.currentResult}"=="SUCCESS") {
                topDeployAWS('topdanmark-dev-01', artifactFile)
            } else {
                println "Deploy skipped: " + deploySkipMessage
            }
        }

        stage('deploy dev-02') {
            if('master'=="${env.BRANCH_NAME}" && "${currentBuild.currentResult}"=="SUCCESS") {
                topDeployAWS('topdanmark-dev-02', artifactFile)
            } else {
                println "Deploy skipped: " + deploySkipMessage
            }
        }

        stage('deploy test-01') {
            if('master'=="${env.BRANCH_NAME}" && "${currentBuild.currentResult}"=="SUCCESS") {
                topDeployAWS('topdanmark-test-01', artifactFile)
            } else {
                println "Deploy skipped: " + deploySkipMessage
            }
        }

        stage('deploy webplatform-hybridapps-staging-01') {
            if('master'=="${env.BRANCH_NAME}" && "${currentBuild.currentResult}"=="SUCCESS") {
                topDeployAWS('topdanmark-webplatform-hybridapps-staging-01', artifactFile)
            } else {
                println "Deploy skipped: " + deploySkipMessage
            }
        }

        stage('deploy webplatform-cloudfront-prod-01') {
            if('master'=="${env.BRANCH_NAME}" && "${currentBuild.currentResult}"=="SUCCESS") {
                topDeployAWS('topdanmark-webplatform-cloudfront-prod-01', artifactFile)
            } else {
                println "Deploy skipped: " + deploySkipMessage
            }
        }

        stage('deploy webplatform-hippo-staging-01') {
            if('master'=="${env.BRANCH_NAME}" && "${currentBuild.currentResult}"=="SUCCESS") {
                topDeployAWS('topdanmark-webplatform-hippo-staging-01', artifactFile)
            } else {
                println "Deploy skipped: " + deploySkipMessage
            }
        }

    }
}
