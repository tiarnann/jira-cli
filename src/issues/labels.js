// Packages
import inquirer from 'inquirer';
import color from 'chalk';
import Table from 'cli-table2';
import moment from 'moment';
import opn from 'opn';

// Local
import jira from '../jira';
import Issues from '../issues'

export default class JiraLabels {
    constructor(){
        this.issues = new Issues
    }

	createUpdateObject(action, name){
		switch (action) {
			case "add":
			case "remove":
			case "set": break
			default:
				throw new Error(`Unknown action: ${action}`)
		}
		let obj =  {
			"update" : { 
				"labels" : [
				]
			}
        }
        let op = {}
        op[action] = name
        obj.update.labels.push(op)
        return obj
	}

    askForLabelAction(args, label){
        var question = [
            {
             type: 'list',
             name: 'action',
             message: 'Action: ',
             choices: ["Add", "Set", "Remove"]
            }
        ];
        let _this = this
        inquirer.prompt(question).then(function( res ) {
            let action = res.action.toLowerCase()
            _this.performLabelAction(action, args, label)
        });
    }

    performLabelAction(action, issueId, label){
        let updateObject = this.createUpdateObject(action, label)
        this.updateIssueWithObject(issueId, updateObject)
    }

    updateIssueWithObject(issueId, updateObject){
        let _this = this
        return jira.api.updateIssue(issueId, updateObject).then(function(result){
            _this.issues.findIssue(issueId)       
		}).catch(function( res ){
			jira.showErrors( res );
			process.exit();
		});
    }
}